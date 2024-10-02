import { ReactNode, memo, useContext, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { routeConfig } from "../../configs/routeConfig"
import { PiUserListFill, PiUserPlusFill } from "react-icons/pi"
import { CircleButton, CircleButtonText } from "../../components/ButtonC"
import { BsFillBoxSeamFill } from "react-icons/bs"
import { Spin } from "antd"
import { AiOutlineSync } from "react-icons/ai"
import { getRemindProcessed, getRemindUnprocessed } from "../../apis/remindAPI"
import { api } from "../../_helper"
import {
  VehicleProviderContextProps,
  vehiclesContext,
} from "../../pages/manager/Remind/providers/VehicleProvider"

interface IProps {
  userId: number
  size?: string
}

interface ICardSItem {
  iconBg: ReactNode
  title: ReactNode
  midContent: ReactNode
  bottomContent: ReactNode
  bgColor: string
  onReload?: () => void
}

interface ICardS {
  item: ICardSItem
}

const CardS: React.FC<ICardS> = ({ item }) => {
  return (
    <div
      className="bg- px-4 py-4 text-white flex flex-col min-w-[350px] h-[180px] relative"
      style={{
        backgroundImage: "url('/assets/images/bg_section_wave.png')",
        backgroundPosition: `0 100%, right 15px bottom 15px`,
        backgroundSize: `100%, 55px`,
        backgroundRepeat: "no-repeat",
        backgroundColor: item?.bgColor,
      }}
    >
      <div className="h-[150px] w-[150px] bg-[#fafafa3b] rounded-full flex items-center justify-center absolute opacity-40 -right-[30px] -top-[30px] pointer-events-none">
        {item?.iconBg}
      </div>
      <div className="h-[90px] flex flex-col justify-between">
        <div className="text">{`${item?.title}`?.toLocaleUpperCase?.()}</div>
        <div className="flex items-center justify-center">
          {item?.midContent}
        </div>
      </div>
      <div className="flex-1">{item?.bottomContent}</div>
      <div className="absolute top-0 right-0">
        <CircleButton
          onClick={item?.onReload}
          size={30}
          icon={<AiOutlineSync />}
        ></CircleButton>
      </div>
    </div>
  )
}

export const IntegratedStatistics: React.FC<IProps> = memo(
  ({ userId, size = "default" }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [dataUnprocessed, setDataUnprocessed] = useState<any>([])
    const [dataProcessed, setDataProcessed] = useState<any>([])
    const { vehiclesStore, dispatch } = useContext(
      vehiclesContext,
    ) as VehicleProviderContextProps

    const getData = async () => {
      try {
        const now = new Date()
        const startTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          1,
        ).getTime()
        const endTime = new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          0,
        ).getTime()

        setIsLoading(true)

        Promise.all([
          getRemindUnprocessed(startTime, endTime),
          getRemindProcessed(),
        ])
          .then(([unprocessed, processed]) => {
            setDataUnprocessed(unprocessed.totalRecord)
            setDataProcessed(processed.totalRecord)
          })
          .catch((error) => {
            api?.message?.error(error?.message)
          })
          .finally(() => {
            setIsLoading(false)
          })
      } catch (error) {}
    }

    useEffect(() => {
      if (!vehiclesStore.loading) {
        getData()
      }
    }, [vehiclesStore.loading])

    const dataRender: ICardSItem[] = [
      {
        title: `Việc chưa xử lý trong tháng ${new Date().getMonth() + 1}`,
        iconBg: <PiUserListFill size={40} />,
        bgColor: "var(--blue-bea-1)",
        onReload: getData,
        midContent: (
          <div>
            <div className="items-end gap-4 flex text-4xl">
              {isLoading || vehiclesStore.loading ? <Spin /> : dataUnprocessed}
            </div>
          </div>
        ),
        bottomContent: (
          <div className="h-full flex items-end">
            {/* <CustomerAddModal
              userId={userId}
              button={
                <CircleButtonText
                  icon={<PiUserPlusFill size={18} />}
                  text="+Thêm"
                />
              }
            /> */}
          </div>
        ),
      },
      {
        title: "Việc đã xử lý",
        iconBg: <PiUserListFill size={40} />,
        bgColor: "var(--blue-bea-2)",
        onReload: getData,
        midContent: (
          <div>
            <div className="items-end gap-4 flex text-4xl">
              {isLoading || vehiclesStore.loading ? <Spin /> : dataProcessed}
            </div>
          </div>
        ),
        bottomContent: (
          <div className="h-full flex items-end">
            {/* <CustomerAddModal
              userId={userId}
              button={
                <CircleButtonText
                  icon={<PiUserPlusFill size={18} />}
                  text="+Thêm"
                />
              }
            /> */}
          </div>
        ),
      },
    ]

    return (
      <div className="">
        <div className="flex gap-4">
          {dataRender?.map?.((item, index) => {
            return <CardS item={item} key={index} />
          })}
        </div>
      </div>
    )
  },
)
