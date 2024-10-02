import { FC } from "react"
import { Button } from "antd"
import { TableC } from "../../../../components/TableC"

import { VehicleType } from "../../../../interface/interface"
import getColumnVehicleNoGPS from "./columns"
import { useContext } from "react"
import ModalImportExcel from "../../../../components/modals/ModalImportExcel"
import { MaskLoader } from "../../../../components/Loader"
import {
  VehicleProviderContextProps,
  vehiclesContext,
} from "../providers/VehicleProvider"
import ModalAddVehicle from "../../../../components/modals/ModalAddVehicle"
import { UploadOutlined } from "@ant-design/icons"
interface VehicleNoGPSType {
  vehicles: VehicleType[]
}
const VehicleNoGPS: FC<VehicleNoGPSType> = ({ vehicles }) => {
  const { vehiclesStore, dispatch } = useContext(
    vehiclesContext,
  ) as VehicleProviderContextProps

  const onReload = () => {
    dispatch.freshKey()
  }

  const getVehicleChecked = (vehicle: VehicleType[]) => {
    dispatch?.setVehicle(vehicle)
  }

  return (
    <div className="mt-5">
      {vehiclesStore.loading && <MaskLoader />}

      <TableC
        checkBox
        setVehicleChecked={getVehicleChecked}
        hiddenTitle={true}
        title="123"
        onReload={onReload}
        search={{
          placeholder: "Tìm kiếm biển số,số điện thoại",
          width: 230,
          onSearch(q) {
            dispatch.setKeywordNoGPS(q)
          },
        }}
        right={
          <div className="flex items-center absolute right-[418px]">
            <ModalAddVehicle
              type="add"
              button={
                <Button className="mr-2" type="primary">
                  Thêm phương tiện
                </Button>
              }
            />
            <ModalImportExcel
              button={
                <Button icon={<UploadOutlined size={18} />} type="primary">
                  Tải lên exel
                </Button>
              }
            />
          </div>
        }
        props={{
          columns: getColumnVehicleNoGPS(
            dispatch?.setVehicle,
            vehiclesStore?.totalPageNoGPS || 0,
          ),
          dataSource: vehicles,
          size: "middle",
          pagination: {
            onChange: (page, pageSize) => {
              dispatch?.setTotalPageNoGPS(page)
            },
          },
        }}
      />
    </div>
  )
}

export default VehicleNoGPS
