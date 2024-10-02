import { FC, useEffect } from "react"
import { Tabs } from "antd"
import getTabItem from "../items/TabItem"
import { useState } from "react"
import { VehicleType } from "../../../interface/interface"
import { Button } from "antd"
import { PlusCircleOutlined } from "@ant-design/icons"
import { useContext } from "react"
import axios from "axios"
import { getIconRemindVehicleGPS } from "../../../apis/remindAPI"
import storage from "../../../utils/storage"
import VehicleProvider, {
  VehicleProviderContextProps,
  vehiclesContext,
} from "./providers/VehicleProvider"
import { getVehicle } from "../../../apis/vehicleAPI"
import { getData } from "../../../utils/handleDataVehicle"
import ModalCreateRemind from "../../../components/modals/ModalCreateRemind"
import { IntegratedStatistics } from "../../../components/IntegratedStatistics"
import { useParams } from "react-router-dom"

interface RemindProps {}

const Remind: FC<RemindProps> = () => {
  const [vehicles, setVehicles] = useState<VehicleType[]>([])
  const [vehiclesNoGPS, setVehiclesNoGPS] = useState<VehicleType[]>([])
  const [tab, setTab] = useState<string>("1")
  const { type } = useParams()

  const { vehiclesStore, dispatch } = useContext(
    vehiclesContext,
  ) as VehicleProviderContextProps

  const fetchVehicle = async (
    keyword: string = "",
    limit: number = 10,
    offset: number = 0,
  ) => {
    dispatch?.setLoading?.(true)
    if (tab === "1") {
      try {
        const res = await axios.get(
          `https://sys01.midvietnam.net/api/v1/device/rows?keyword=${keyword}&offset=${
            offset * limit
          }&limit=${limit}&type=1`,
          {
            headers: {
              Authorization: `Bearer ${storage.getAccessToken()}`,
            },
          },
        )

        const totalPage = res?.data?.totalPage

        dispatch?.setTotalPageGPS?.(totalPage)

        let remind_vehicles_gps = await getIconRemindVehicleGPS()
        Object.keys(remind_vehicles_gps.data).map((key: any) => {
          remind_vehicles_gps.data[key] = remind_vehicles_gps.data[key].filter(
            (item: any) =>
              item.remind.category_parent === (type === "maintenance" ? 1 : 0),
          )
        })

        const vehicleGPS = res?.data?.data?.map((item: any, index: number) => {
          return {
            key: index,
            id: item.id,
            license: item.imei,
            license_plate: item.vehicle_name,
            user_name: item.customer_name,
            imei: item.imei,
            icons: remind_vehicles_gps?.data?.[item.imei],
          }
        })

        dispatch?.setVehicleGPS?.(vehicleGPS)

        dispatch?.setLoading?.(false)
        setVehicles(vehicleGPS)
      } catch (error) {
        console.log("error  >>", error)
      }
    } else {
      try {
        const res = await getVehicle(keyword)

        const data = getData(res?.data)

        let remind_vehicles_NoGPS = await getIconRemindVehicleGPS()
        Object.keys(remind_vehicles_NoGPS.data).map((key: any) => {
          remind_vehicles_NoGPS.data[key] = remind_vehicles_NoGPS.data[
            key
          ].filter(
            (item: any) =>
              item.remind.category_parent === (type === "maintenance" ? 1 : 0),
          )
        })

        data.map((item: any) => {
          item["icons"] = remind_vehicles_NoGPS.data[item.license_plate]
        })

        setVehiclesNoGPS(data)
        dispatch?.setLoading?.(false)
      } catch (error) {
        console.log("error", error)
      }
    }
  }

  useEffect(() => {
    const keyword = vehiclesStore.keyword
    const keywordNoGPS = vehiclesStore.keywordNoGPS
    if (tab === "1") {
      fetchVehicle(keyword, vehiclesStore.limit, vehiclesStore.offset)
    } else {
      fetchVehicle(keywordNoGPS)
    }
  }, [
    tab,
    vehiclesStore.freshKey,
    vehiclesStore.keyword,
    vehiclesStore.keywordNoGPS,
    vehiclesStore.offset,
    vehiclesStore.limit,
  ])

  useEffect(() => {
    dispatch?.setVehicle([])
  }, [tab])

  const onChangeTab = (key: string) => {
    setTab(key)
    dispatch?.setTypeVehicle(key === "1" ? 1 : 0)
  }

  useEffect(() => {
    dispatch?.setCategoryParent(type === "maintenance" ? 1 : 0)
    fetchVehicle()
  }, [type])

  return (
    <div className="relative">
      <IntegratedStatistics userId={1} size="30" />
      <div className="relative mt-4">
        <div className="action_create_remind flex justify-end absolute left-[420px] top-[8px] z-50 ">
          <ModalCreateRemind
            button={
              <Button type="primary" icon={<PlusCircleOutlined />}>
                Thêm
              </Button>
            }
          />
        </div>
        <Tabs
          defaultActiveKey="1"
          items={getTabItem(vehicles, vehiclesNoGPS)}
          onChange={onChangeTab}
        />
      </div>
    </div>
  )
}

const RemindMeMo: FC = () => (
  <VehicleProvider>
    <Remind />
  </VehicleProvider>
)
export default RemindMeMo
