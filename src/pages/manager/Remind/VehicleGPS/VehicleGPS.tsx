import { FC } from "react"
import { TableC } from "../../../../components/TableC"
import getColumnVehicleGPS from "./columns"
import { VehicleType } from "../../../../interface/interface"
import { useContext } from "react"
import {
  VehicleProviderContextProps,
  vehiclesContext,
} from "../providers/VehicleProvider"

interface VehicleGPSType {
  vehicles: VehicleType[]
}

const VehicleGPS: FC<VehicleGPSType> = ({ vehicles }) => {
  const { vehiclesStore, dispatch } = useContext(
    vehiclesContext,
  ) as VehicleProviderContextProps

  //handle logig reload
  const onReload = () => {
    dispatch.freshKey()
  }

  //get vehicle checked
  const setVehicleChecked = (vehicle: VehicleType[]) => {
    dispatch?.setVehicle(vehicle)
  }

  return (
    <div className="mt-5">
      <TableC
        loading={vehiclesStore.loading}
        setVehicleChecked={setVehicleChecked}
        checkBox
        title="Danh sách phương tiện có GPS"
        hiddenTitle={true}
        onReload={onReload}
        search={{
          placeholder: "Tìm kiếm biển số",
          width: 200,
          onSearch(q) {
            dispatch?.setKeyword(q)
          },
          limitSearchLength: 0,
        }}
        right={<></>}
        props={{
          columns: getColumnVehicleGPS(dispatch?.setVehicle, {
            limit: vehiclesStore?.limit,
            offset: vehiclesStore?.offset,
          }),
          dataSource: vehicles,
          size: "middle",
          pagination: {
            pageSize: vehiclesStore?.limit,
            total:
              (vehiclesStore?.totalPageGPS ?? 0) * (vehiclesStore?.limit ?? 50),
            current: (vehiclesStore?.offset ?? 0) + 1,
            onChange(page, pageSize) {
              dispatch?.setOffset(page - 1)
              dispatch?.setLimit(pageSize)
            },
          },
        }}
      />
    </div>
  )
}

export default VehicleGPS
