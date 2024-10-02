import type { TabsProps } from "antd"
import { VehicleType } from "../../../interface/interface"
import VehicleGPS from "../RemindMobile/VehicleGPS/Vehicle"
import VehicleNoGPS from "../RemindMobile/VehicleNoGps/VehicleNoGps"

export default function getTabItem(
  vehicles: VehicleType[],
  vehiclesNoGPS: VehicleType[],
): TabsProps["items"] {
  return [
    {
      key: "1",
      label: "Phương tiện sử dụng GPS",
      children: <VehicleGPS vehicles={vehicles} />,
    },
    {
      key: "0",
      label: "Phương tiện không sử dụng GPS",
      children: <VehicleNoGPS vehicles={vehiclesNoGPS} />,
    },
  ]
}
