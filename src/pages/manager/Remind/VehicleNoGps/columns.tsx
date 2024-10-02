import { Button, type TableColumnsType } from "antd"

import { VehicleType } from "../../../../interface/interface"
import { SettingOutlined } from "@ant-design/icons"
import ModalCreateRemind from "../../../../components/modals/ModalCreateRemind"
import DrawVehicle from "../../../../components/Draws/DrawVehicle"
import ModalAddVehicle from "../../../../components/modals/ModalAddVehicle"

const getColumnVehicleNoGPS = (
  setVehicleSelect: any,
  totalPageNoGPS: number,
): TableColumnsType<VehicleType> => {
  return [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      render: (text, record, index) => (totalPageNoGPS - 1) * 10 + index + 1,
    },
    {
      title: "Biển số phương tiện",
      dataIndex: "license_plate",
      key: "licenseNumber",
      sorter: (a, b) => a.license_plate.localeCompare(b.license_plate),
    },

    {
      title: "Họ tên",
      dataIndex: "user_name",
      key: "user_name",
      sorter: (a, b) => a.license.localeCompare(b.license),
    },
    {
      title: "Địa chỉ",
      dataIndex: "user_address",
      key: "user_address",
      sorter: (a, b) => a.license.localeCompare(b.license),
    },
    {
      title: "Số điện thoại",
      dataIndex: "license",
      key: "license",
      sorter: (a, b) => a.license.localeCompare(b.license),
    },
    {
      title: "Việc cần làm",
      dataIndex: "statusRemind",
      key: "statusRemind",
      render(value, record, index) {
        return {
          children: record?.icons?.map((icon: any, index: number) => (
            <ModalCreateRemind
              type="update"
              remindData={icon?.remind}
              button={
                <span
                  onClick={() => {
                    setVehicleSelect([record])
                  }}
                  className="cursor-pointer"
                  key={index}
                >
                  {" "}
                  {icon?.icon}
                </span>
              }
            />
          )),
        }
      },
    },
    {
      title: "Cài đặt",
      dataIndex: "setting",
      key: "setting",
      render(value, record, index) {
        return (
          <DrawVehicle
            data={record}
            title="Cài đặt nhắc nhở phương tiện"
            button={
              <Button
                icon={<SettingOutlined />}
                onClick={() => {
                  setVehicleSelect([record])
                }}
              ></Button>
            }
          />
        )
      },
    },
    {
      title: "Thao tác",
      dataIndex: "actions",
      key: "actions",
      render(value, record, index) {
        return (
          <div className="flex">
            <ModalAddVehicle
              data={record}
              type="update"
              button={<Button type="link">Cập nhật</Button>}
            />
            <ModalAddVehicle
              type="delete"
              data={record}
              button={<Button type="link">Xóa</Button>}
            />
          </div>
        )
      },
    },
  ]
}
export default getColumnVehicleNoGPS
