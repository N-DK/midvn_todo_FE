import { ReactNode } from "react"
import { Button, type TableColumnsType } from "antd"
import DrawVehicle from "../../../../components/Draws/DrawVehicleMobile"
import { VehicleType } from "../../../../interface/interface"
import { SettingOutlined } from "@ant-design/icons"

const getColumnVehicleGPS = (
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
      dataIndex: "icons",
      key: "icons",
      render(value, record, index) {
        return {
          children: record?.reminds?.map((icon: any, index: number) => (
            <span key={index}> {icon?.icon}</span>
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
              >
                {/* Cài đặt */}
              </Button>
            }
          />
        )
      },
    },
  ]
}

export default getColumnVehicleGPS
