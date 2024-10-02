import { FC } from "react"
import { ModalCView } from "../ModalC/ModalC"
import React from "react"
import type { FormProps } from "antd"
import { Button, Input, Form } from "antd"
import { MaskLoader } from "../Loader"
import { addVehicle, deleteVehicle, updateVehicle } from "../../apis/vehicleAPI"
import { api } from "../../_helper"
import {
  VehicleProviderContextProps,
  vehiclesContext,
} from "../../pages/manager/Remind/providers/VehicleProvider"
import { VehicleType } from "../../interface/interface"
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
                    "Biển số Phương tiện trùng với Danh sách phương tiện GPS!!!",
                  )
                  setLoading(false)
                  return
                }
                // trim values
                values.license_plate = values.license_plate.trim()
                values.user_name = values.user_name.trim()
                values.user_address = values.user_address.trim()
                values.license = values.license.trim()

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
              setLoading(true)
              values.license_plate = values.license_plate.trim()
              values.user_name = values.user_name.trim()
              values.user_address = values.user_address.trim()
              values.license = values.license.trim()
              await updateVehicle(id, values)
              api.message?.success(_const?.string?.remind?.updateSuccess)
              dispatch.freshKey()
              setLoading(false)
              action?.closeModal()
            })
            .catch((errorInfo) => {
              setLoading(false)
              api.message?.error(_const?.string?.remind?.invalidVehicle)
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
              {
                pattern: /^[0-9A-Z]{5,10}$/,
                message: "Biển số phương tiện không hợp lệ!",
              },
              {
                validator: (_, value) => {
                  if (value && value.trim() !== value) {
                    return Promise.reject(
                      "Biển số không được chứa khoảng trắng ở đầu hoặc cuối!",
                    )
                  }
                  return Promise.resolve()
                },
              },
            ]}
          >
            <Input maxLength={10} />
          </Form.Item>
          <Form.Item
            label="SĐT"
            name="license"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Số điện thoại phải có 10 chữ số!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Họ và tên"
            name="user_name"
            rules={[
              { required: true, message: "Vui lòng nhập họ và tên!" },
              {
                pattern: /^[a-zA-ZÀ-ỹ\s]+$/,
                message: "Họ và tên chỉ được chứa chữ cái và khoảng trắng!",
              },
              {
                min: 2,
                message: "Họ và tên phải có ít nhất 2 ký tự!",
              },
              {
                max: 50,
                message: "Họ và tên không được vượt quá 50 ký tự!",
              },
              {
                validator: (_, value) => {
                  if (value && (value.startsWith(" ") || value.endsWith(" "))) {
                    return Promise.reject(
                      "Họ và tên không được bắt đầu hoặc kết thúc bằng khoảng trắng!",
                    )
                  }
                  return Promise.resolve()
                },
              },
            ]}
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

const ModalAddVehicle: FC<ModalAddVehicleProps> = ({ data, button, type }) => {
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

export default ModalAddVehicle
