import { FC } from "react"
import { ModalCView } from "../ModalC/ModalC"
import React from "react"
import type { FormProps } from "antd"
import { Button, Input, Form } from "antd"
import { MaskLoader } from "../Loader"
import { addVehicle, deleteVehicle, updateVehicle } from "../../apis/vehicleAPI"
import { api } from "../../_helper"
import { VehicleType } from "../../interface/interface"
import { vehiclesContext } from "../../pages/manager/RemindMobile/providers/VehicleProvider"
import { VehicleProviderContextProps } from "../../pages/manager/RemindMobile/providers/VehicleProvider"
import { _const } from "../../_constant"
interface ModalAddVehicleProps {
  button: React.ReactNode
  type?: string
  data?: any
}

const onFinish: FormProps<VehicleType>["onFinish"] = (values) => {
  console.log("Success:", values)
}

const onFinishFailed: FormProps<VehicleType>["onFinishFailed"] = (
  errorInfo,
) => {
  console.log("Failed:", errorInfo)
}

const FormAdd: FC<{
  action: any
  initialValues?: VehicleType
  data?: any
  type?: string
}> = ({ action, initialValues, data, type }) => {
  const [loading, setLoading] = React.useState(false)
  const { vehiclesStore, dispatch } = React.useContext(
    vehiclesContext,
  ) as VehicleProviderContextProps

  const [form] = Form.useForm()
  const id: number = initialValues?.id ?? 0

  const getAction = () => {
    if (type == "add") {
      return {
        title: "Thêm Phương tiện",
        okButton: "Thêm",
        okCallback: () => {
          // validate form
          form
            .validateFields()
            .then(async (values) => {
              //call api thêm phương tiện
              try {
                setLoading(true)
                const vehicleGPS = vehiclesStore?.vehicleGPS
                const isDouble = vehicleGPS?.some(
                  (item) => item.license_plate === values.license_plate,
                )
                if (isDouble) {
                  api.message?.error(
                    _const?.string?.remind?.licensePlateDuplicateGPS,
                  )
                  setLoading(false)

                  return
                }
                await addVehicle({
                  ...values,
                })
                api.message?.success(_const?.string?.remind?.addSuccess)
                dispatch.freshKey()
                setLoading(false)
                action?.closeModal()
              } catch (error) {
                api.message?.error(
                  _const?.string?.remind?.licensePlateDuplicate,
                )
                setLoading(false)
              }
            })
            .catch((errorInfo) => {
              console.log("Validation Failed:", errorInfo)
            })
        },
      }
    }
    if (type == "delete") {
      return {
        title: "Xoá Phương tiện",
        okButton: "Xoá",
        okCallback: async () => {
          //call api xóa phương tiện

          setLoading(true)
          await deleteVehicle(id)
          api.message?.success(_const?.string?.remind?.deleteSuccess)
          dispatch.freshKey()
          setLoading(false)
          action?.closeModal()
        },
      }
    }
    if (type == "update") {
      return {
        title: "Chỉnh sửa phương tiện",
        okButton: "Lưu",
        okCallback: () => {
          form
            .validateFields()
            .then(async (values) => {
              //call api chỉnh sửa phương tiện
              setLoading(true)
              await updateVehicle(id, values)
              api.message?.success(_const?.string?.remind?.updateSuccess)
              dispatch.freshKey()
              setLoading(false)

              action?.closeModal()
            })
            .catch((errorInfo) => {
              console.log("Validation Failed:", errorInfo)
            })
        },
      }
    }
  }

  return (
    <div>
      {type == "delete" ? (
        <p>Bạn có chắc chắn muốn xoá phương tiện này không?</p>
      ) : (
        <Form
          form={form}
          name="basic"
          initialValues={initialValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="horizontal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item
            label="Biển số"
            name="license_plate"
            rules={[
              { required: true, message: "Vui lòng nhập biển số phương tiện!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="SĐT"
            name="license"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Họ và tên"
            name="user_name"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="user_address"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      )}
      <div className="flex justify-end gap-2">
        <Button onClick={action?.closeModal}>Hủy</Button>
        <Button
          onClick={getAction()?.okCallback}
          type="primary"
          htmlType="submit"
        >
          {getAction()?.okButton}
        </Button>
      </div>

      {loading && <MaskLoader />}
    </div>
  )
}

const ModalAddVehicleMobile: FC<ModalAddVehicleProps> = ({
  data,
  button,
  type,
}) => {
  console.log("====================================")
  console.log("data", data)
  console.log("====================================")
  const getAction = () => {
    if (type === "add") {
      return {
        title: "Thêm phương tiện",
      }
    }
    if (type === "delete") {
      return {
        title: `Xoá phương tiện ${data?.license_plate}`,
      }
    }
    if (type === "update") {
      return {
        title: `Chỉnh sửa phương tiện ${data?.license_plate}`,
      }
    }
    return {}
  }

  return (
    <ModalCView
      modalProps={{
        width: 400,
      }}
      button={button}
      title={getAction()?.title}
      children={(action) => {
        return <FormAdd type={type} initialValues={data} action={action} />
      }}
    />
  )
}

export default ModalAddVehicleMobile
