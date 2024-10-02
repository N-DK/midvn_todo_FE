import { FC, useEffect } from "react"
import { Tabs } from "antd"
import getTabItem from "../items/TabItemMobile"
import { useState } from "react"
import { VehicleType } from "../../../interface/interface"
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
interface RemindProps {}

const Remind: FC<RemindProps> = () => {
  const [vehicles, setVehicles] = useState<VehicleType[]>([])
  const [vehiclesNoGPS, setVehiclesNoGPS] = useState<VehicleType[]>([])

  const [tab, setTab] = useState<string>("1")
  const { vehiclesStore, dispatch } = useContext(
    vehiclesContext,
  ) as VehicleProviderContextProps

  // console.log("vehicle mới nhât >>", vehiclesStore)

  const fetchVehicle = async (keyword: string = "") => {
    setVehicles([])
    dispatch?.setLoading?.(true)
    if (tab === "1") {
      try {
        const res = await axios.get(
          `https://sys01.midvietnam.net/api/v1/device/rows?keyword=${keyword}&offset=0&limit=100000&type=1`,
          {
            headers: {
              Authorization: `Bearer ${storage.getAccessToken()}`,
            },
          },
        )
        const remind_vehicles_gps = await getIconRemindVehicleGPS()

        const vehicleGPS = res?.data?.data?.map((item: any) => {
          return {
            key: item.id,
            id: item.id,
            license: item.imei,
            license_plate: item.vehicle_name,
            user_name: item.customer_name,
            imei: item.imei,
            icons: remind_vehicles_gps?.data[item.imei],
          }
        })

        dispatch?.setLoading?.(false)
        setVehicles(vehicleGPS)
      } catch (error) {
        console.log("error  >>", error)
      }
    } else {
      try {
        const res = await getVehicle(keyword)
        const data = getData(res?.data)
        const remind_vehicles_NoGPS = await getIconRemindVehicleGPS()

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
      fetchVehicle(keyword)
    } else {
      fetchVehicle(keywordNoGPS)
    }
  }, [
    tab,
    vehiclesStore.freshKey,
    vehiclesStore.keyword,
    vehiclesStore.keywordNoGPS,
  ])

  useEffect(() => {
    dispatch?.setVehicle([])
  }, [tab])

  const onChangeTab = (key: string) => {
    setTab(key)
    dispatch?.setTypeVehicle(key === "1" ? 1 : 0)
    dispatch?.setDrawIndex?.(0)
  }

  return (
    <div className="relative remind_mobile">
      <div className="action_create_remind "></div>
      <Tabs
        type="card"
        defaultActiveKey="1"
        items={getTabItem(vehicles, vehiclesNoGPS)}
        onChange={onChangeTab}
      />
    </div>
  )
}
const RemindMeMo: FC = () => (
  <VehicleProvider>
    <Remind />
  </VehicleProvider>
)
export default RemindMeMo
