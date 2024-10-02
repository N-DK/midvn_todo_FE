import { Button, type TableColumnsType } from "antd"

import { VehicleType } from "../../../../interface/interface"
import { SettingOutlined } from "@ant-design/icons"
import DrawVehicle from "../../../../components/Draws/DrawVehicleMobile"
import ModalAddVehicleMobile from "../../../../components/modals/ModalAddVehicleMobile"

const getColumnVehicleNoGPS = (
  setVehicleSelect: any,
): TableColumnsType<VehicleType> => {
  return [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Biển số phương tiện",
      dataIndex: "license_plate",
      key: "licenseNumber",
      sorter: (a, b) => a.license_plate.localeCompare(b.license_plate),
    },
    {
      title: "Giấy phép",
      dataIndex: "license",
      key: "license",
      sorter: (a, b) => a.license.localeCompare(b.license),
    },
    {
      title: "Đang có nhắc nhở",
      dataIndex: "statusRemind",
      key: "statusRemind",
      render(value, record, index) {
        return {
          children: record?.icons?.map((icon: any) => (
            <span> {icon?.icon}</span>
          )),
        }
      },
    },
    {
      title: "Cài đặt",
      dataIndex: "setting",
      key: "setting",
      render(value, record, index) {
        return {
          children: (
            <DrawVehicle
              data={record}
              title="Cài đặt nhắc nhở phương tiện"
              button={
                <Button
                  icon={<SettingOutlined />}
                  onClick={() => {
                    setVehicleSelect([record])
                  }}
                >
                  {/* Cài đặt */}
                </Button>
              }
            />
          ),
        }
      },
    },
    {
      title: "Thao tác",
      dataIndex: "actions",
      key: "actions",
      render(value, record, index) {
        return {
          children: (
            <div className="flex">
              <ModalAddVehicleMobile
                data={record}
                type="update"
                button={<Button type="link">Cập nhật</Button>}
              />
              <ModalAddVehicleMobile
                type="delete"
                data={record}
                button={<Button type="link">Xóa</Button>}
              />
            </div>
          ),
        }
      },
    },
  ]
}
export default getColumnVehicleNoGPS
