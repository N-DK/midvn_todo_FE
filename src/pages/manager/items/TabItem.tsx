import type { TabsProps } from "antd"
import VehicleGPS from "../Remind/VehicleGPS/VehicleGPS"
import { VehicleType } from "../../../interface/interface"
import VehicleNoGPS from "../Remind/VehicleNoGps/VehicleNoGps"

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
