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
  key: number | string
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
    width: 50,
    className: "text-center",
    fixed: "left",
  },
  {
    title: "Biển số PT",
    dataIndex: "vehicle_name",
    key: "vehicle_name",
    width: 110,
    fixed: "left",
    render(value, record, index) {
      return <Coppy>{value}</Coppy>
    },
  },

  {
    title: "IMEI",
    dataIndex: "imei",
    key: "imei",
    width: 150,
    render(value, record, index) {
      return <Coppy>{value}</Coppy>
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
]
