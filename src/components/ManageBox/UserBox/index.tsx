import { createContext, useEffect, useState } from "react"
import { getUserDetailInfoService } from "../../../services/userServices"
import { IUserDetailInfo } from "../../../_types/userType"
import { ComponentTitle } from "../../TitleC/ComponentTitle"
import { UserCardInfo } from "./components/UserCardInfo"
import { GoChevronDown, GoChevronRight, GoChevronUp } from "react-icons/go"
import { Button, Divider } from "antd"
import { UserTitle } from "./components/UserTitle"
import { IntegratedStatistics } from "../../../pages/Statistical/parts/IntegratedStatistics"
import { IntegratedStatisticsSmall } from "../../../pages/Statistical/parts/IntegratedStatisticsSmall"
import { Statisical } from "../../../pages/Statistical"
import { StatisicalView } from "./components/StatisicalView"

interface IProps {
  userId: number
}

interface IUserBoxContext {
  user?: IUserDetailInfo
  isLoading?: boolean
  getData?: () => void
}

export const UserBoxContext = createContext<IUserBoxContext>({})

export const UserBox: React.FC<IProps> = ({ userId }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [userIdActive, setUserIdActive] = useState<number>(userId)
  const [isExpand, setIsExpand] = useState<boolean>(true)

  const toggleShow = () => setIsExpand((preState) => !preState)

  const [userInfo, setUserInfo] = useState<IUserDetailInfo>()

  const getData = () => {
    if (!userId) return
    setIsLoading(true)
    const userDetailPromise = getUserDetailInfoService?.(userIdActive)

    Promise.all([userDetailPromise])
      ?.then((fb: any) => {
        setUserInfo?.(fb?.[0]?.data?.[0])
      })
      .catch((error) => {
        console.log("ERROR WHEN CALL USERDETAI", error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (userIdActive == undefined) return
    getData()
  }, [userIdActive])

  useEffect(() => {
    setUserIdActive(userId)
  }, [userId])

  const contextValue = {
    user: userInfo,
    isLoading,
    getData,
  }

  return (
    <UserBoxContext.Provider value={contextValue}>
      <div className="bg-white relative">
        <div>
          <ComponentTitle
            right={
              <Button type="link" onClick={toggleShow} className="text-lg">
                {isExpand ? (
                  <GoChevronDown color="var(--root-text-color)" />
                ) : (
                  <GoChevronRight color="var(--root-text-color)" />
                )}
              </Button>
            }
            title={<UserTitle />}
          />
        </div>
        {isExpand ? (
          <>
            <div className="px-4">
              <div className="flex">
                <div className="w-[300px] border-r-[0.5px] border-r-root_border_color pr-2 py-2">
                  <UserCardInfo />
                </div>
                <div className="flex-1 flex overflow-auto">
                  <div className="">
                    <IntegratedStatisticsSmall userId={userId} />
                  </div>
                </div>
              </div>
            </div>
            <StatisicalView userId={userId} />
          </>
        ) : null}
      </div>
    </UserBoxContext.Provider>
  )
}
