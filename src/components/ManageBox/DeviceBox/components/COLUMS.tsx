import { ReactNode } from "react"
import { IDeviceInfoVehicle } from "../../../../_types/deviceType"
import { ColumnsType } from "antd/es/table"
import { Coppy } from "../../../Coppy"
import { PopoverLink } from "../../../PopoverC"
import { Action } from "../../../Actions"
import {
  PiInfoLight,
  PiPencilSimpleLineLight,
  PiTreeStructureDuotone,
  PiUserPlusDuotone,
} from "react-icons/pi"
import { HiOutlineCommandLine } from "react-icons/hi2"
import { TextEllipsis } from "../../../TextC"
import { RegisterDeviceModal } from "../../../modals/RegisterDeviceModal"

export interface IColumns {
  key: number
  dev_id: string
  imei: string
  model_name: string
  actions: ReactNode
  data: IDeviceInfoVehicle
  activation_date: string
  warranty_expired_on: string
  expired_on: string
  serial: string
  vehicle_name: string
  customer_name: string
  service_package_name: string
  vehicle_type_name: string
  updateAction: () => void
}

export const columns: ColumnsType<IColumns> = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    width: 70,
    className: "text-center",
    fixed: "left",
  },
  {
    title: "Biển số PT",
    dataIndex: "vehicle_name",
    key: "vehicle_name",
    width: 130,
    fixed: "left",
    render(value, record, index) {
      return (
        <div className="text-theme italic">
          <Coppy>{value}</Coppy>
        </div>
      )
    },
  },

  {
    title: "IMEI",
    dataIndex: "imei",
    key: "imei",
    width: 150,
    render(value, record, index) {
      return (
        <div className="text-theme italic">
          <Coppy>{value}</Coppy>
        </div>
      )
    },
  },
  {
    title: "Mã đầu ghi",
    dataIndex: "dev_id",
    key: "dev_id",
    width: 150,
    render(value, record, index) {
      return <Coppy>{value}</Coppy>
    },
  },
  {
    title: "Model",
    dataIndex: "model_name",
    key: "model_name",
    width: 150,
  },
  {
    title: "Loại phương tiện",
    dataIndex: "vehicle_type_name",
    key: "vehicle_type_name",
    width: 200,
    render(value, record, index) {
      return <TextEllipsis tooltip text={value}></TextEllipsis>
    },
  },
  {
    title: "Sở hữu",
    dataIndex: "customer_name",
    key: "customer_name",
    width: 180,
    render(value, record, index) {
      return <TextEllipsis tooltip text={value}></TextEllipsis>
    },
  },
  {
    title: "Gói dịch vụ",
    dataIndex: "service_package_name",
    key: "service_package_name",
    width: 200,
  },
  {
    title: "Serial",
    dataIndex: "serial",
    key: "serial",
    width: 150,
  },
  {
    title: "Ngày kích hoạt",
    dataIndex: "activation_date",
    key: "activation_date",
    width: 150,
  },
  {
    title: "Hết hạn bảo hành",
    dataIndex: "warranty_expired_on",
    key: "warranty_expired_on",
    width: 170,
  },
  {
    title: "Ngày hết hạn",
    dataIndex: "expired_on",
    key: "expired_on",
    width: 150,
  },

  {
    title: "Thao tác",
    dataIndex: "actions",
    key: "actions",
    width: 80,
    fixed: "right",
    render(value, record, index) {
      return (
        <div>
          <PopoverLink
            buttonTitle="Thêm"
            content={
              <Action
                actions={[
                  {
                    type: "title",
                    title: record?.vehicle_name,
                  },
                  {
                    type: "divider",
                    title: "",
                  },
                  {
                    title: "Chỉnh sửa",
                    icon: PiPencilSimpleLineLight,
                    // modal: {
                    //   modal: DeviceModal,
                    //   modalProps: {
                    //     type: "update",
                    //     data: record?.data,
                    //     onSccess: record?.updateAction,
                    //   },
                    // },
                  },
                  // {
                  //   title: "Thông tin sở hữu",
                  //   icon: PiTreeStructureDuotone,
                  // },
                  {
                    type: "divider",
                    title: "",
                  },
                  {
                    title: "Gửi lệnh",
                    icon: HiOutlineCommandLine,
                  },
                  // {
                  //   title: "Gán phương tiện",
                  //   icon: PiUserPlusDuotone,
                  //   modal: {
                  //     modal: RegisterDeviceModal,
                  //     modalProps: {
                  //       type: "update",
                  //       data: record?.data,
                  //       onSccess: record?.updateAction,
                  //     },
                  //   },
                  // },
                ]}
              />
            }
          />
        </div>
      )
    },
  },
]
