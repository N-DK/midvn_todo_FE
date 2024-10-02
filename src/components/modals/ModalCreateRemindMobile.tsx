import { FC, useEffect, useRef, useState } from "react"
import { ModalCView } from "../ModalC/ModalC"
import { Button } from "antd"
import FormAddRemind from "../../pages/manager/RemindMobile/components/Form/FormAddRemind"
import { useContext } from "react"
import {
  vehiclesContext,
  VehicleProviderContextProps,
} from "../../pages/manager/RemindMobile/providers/VehicleProvider"
import { api } from "../../_helper"
import { MaskLoader } from "../Loader"
import { VehicleType } from "../../interface/interface"
import { addRemind, finishRemind, updateRemind } from "../../apis/remindAPI"
import { log } from "console"
import { createCategory } from "../../apis/categoryAPI"
import moment from "moment"
import { getTokenParam } from "../../utils/_param"
import storage from "../../utils/storage"
import { _const } from "../../_constant"
interface ModalCreateRemindProps {
  remindData?: any
  button: React.ReactNode
  isShow?: boolean
  onReload?: () => void
  type?: string
}

const Form: FC<{
  action: any
  onReload?: () => void
  remindData?: any
  type?: string
}> = ({ action, onReload, remindData = {}, type }) => {
  const [loading, setLoading] = useState(false)
  const { vehiclesStore, dispatch } = useContext(
    vehiclesContext,
  ) as VehicleProviderContextProps
  const vehicleSelected = vehiclesStore.vehiclesStore
  const handleSubmit = async (formData: any, callback: any, images?: any) => {
    const cate_name = formData["cat_name"]
    if (cate_name) {
      const cat = await createCategory(
        cate_name,
        "",
        "",
        Number(vehiclesStore.categoryParent),
      )
      formData["remind_category_id"] = cat.data
      callback()
    }

    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const value = formData[key]
        // Kiểm tra nếu là mảng hoặc object, chuyển thành JSON trước khi gửi
        if (Array.isArray(value) || typeof value === "object") {
          images.append(key, JSON.stringify(value))
        } else if (typeof value === "number") {
          images.append(key, value)
        } else {
          images.append(key, value)
        }
      }
    }

    images.append("token", storage.getAccessToken())

    // call api thêm nhắc nhở
    setLoading(true)
    await addRemind(images)
    action?.closeModal?.()
    api.message?.success(_const?.string?.remind?.addSuccess)
    setLoading(false)
    dispatch?.freshKey()
    onReload?.()
  }
  const handleUpdate = async (formData: any, callback: any, images?: any) => {
    // call api sửa nhắc nhở
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const value = formData[key]
        // Kiểm tra nếu là mảng hoặc object, chuyển thành JSON trước khi gửi
        if (Array.isArray(value) || typeof value === "object") {
          images.append(key, JSON.stringify(value))
        } else if (typeof value === "number") {
          images.append(key, value)
        } else {
          images.append(key, value)
        }
      }
    }
    images.append("token", storage.getAccessToken())
    setLoading(true)
    await updateRemind(remindData?.remind_id, images)
    action?.closeModal?.()
    api.message?.success(_const?.string?.remind?.updateSuccess)
    onReload?.()
  }

  const handleUpdateCycle = async (
    formData: any,
    callback: any,
    images?: any,
  ) => {
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const value = formData[key]
        // Kiểm tra nếu là mảng hoặc object, chuyển thành JSON trước khi gửi
        if (Array.isArray(value) || typeof value === "object") {
          images.append(key, JSON.stringify(value))
        } else if (typeof value === "number") {
          images.append(key, value)
        } else {
          images.append(key, value)
        }
      }
    }
    images.append("token", storage.getAccessToken())
    setLoading(true)
    await finishRemind(remindData?.remind_id, images)
    action?.closeModal?.()
    api.message?.success(_const?.string?.remind?.updateSuccess)
    onReload?.()
  }

  const getFunctionHandleAction = () => {
    if (type == "add") {
      return handleSubmit
    }
    if (type == "update") {
      return handleUpdate
    }
    if (type == "update-cycle") {
      return handleUpdateCycle
    }
  }
  const handleFormData: any = getFunctionHandleAction()

  const buttonRef = useRef<HTMLButtonElement>(null)

  const getAction = () => {
    if (type == "add") {
      return {
        title: "Thêm nhắc nhở",
        okButton: "Thêm",
        okCallback: onsubmit,
      }
    }

    if (type == "update") {
      return {
        title: "Chỉnh sửa nhắc nhở",
        okButton: "Lưu",
        okCallback: onsubmit,
      }
    }
    if (type == "update-cycle") {
      return {
        title: "Chỉnh sửa hạn nhắc nhở",
        okButton: "Lưu",
        okCallback: onsubmit,
      }
    }
  }

  // handle add remind
  const onsubmit = () => {
    buttonRef.current?.click()
  }

  return (
    <div>
      {loading && <MaskLoader />}
      <FormAddRemind
        initialValues={remindData}
        // initialValues={
        //   {
        //     // note_repair: "123",
        //     // current_kilometers: 10,
        //     // remind_category_id: 1,
        //     // cumulative_kilometers: 20,
        //   }
        // }
        ref={buttonRef}
        vehicleSelected={vehicleSelected}
        onSubmit={handleFormData}
      />
      <div className="actions flex justify-end">
        <Button
          className="mr-3"
          onClick={() => {
            action?.closeModal?.()
          }}
        >
          Hủy
        </Button>
        <Button type="primary" onClick={getAction()?.okCallback}>
          {getAction()?.okButton}
        </Button>
      </div>
    </div>
  )
}

const ModalCreateRemind: FC<ModalCreateRemindProps> = ({
  isShow = false,
  button,
  onReload,
  remindData,
  type = "add",
}) => {
  const { vehiclesStore } = useContext(
    vehiclesContext,
  ) as VehicleProviderContextProps

  const isTimestamp = (value: any) => {
    return typeof value === "number" && value > 1000000000
  }

  const convertTimestampsToMoment = (data: any) => {
    const convertedData = { ...data }

    Object.keys(convertedData).forEach((key) => {
      if (isTimestamp(convertedData[key])) {
        // Chỉ chuyển đổi nếu là timestamp
        convertedData[key] = moment(convertedData[key]).add(
          convertedData?.time_before,
          "months",
        )
      }
    })

    return convertedData
  }

  const getAction = () => {
    if (type === "add") {
      return {
        title: `Tạo lập lịch hẹn`,
      }
    }

    if (type === "update") {
      return {
        title: `Sửa nhắc nhở`,
      }
    }
  }

  return (
    <ModalCView
      isShow={isShow}
      isValidToOpen={vehiclesStore.vehiclesStore.length > 0}
      button={button}
      title={getAction()?.title}
      children={(action) => (
        <Form
          type={type}
          remindData={convertTimestampsToMoment(remindData)}
          onReload={onReload}
          action={action}
        />
      )}
    />
  )
}

export default ModalCreateRemind
