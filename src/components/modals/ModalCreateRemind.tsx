import { FC, useEffect, useRef, useState } from "react"
import { ModalCView } from "../ModalC/ModalC"
import { Button } from "antd"
import FormAddRemind from "../../pages/manager/Remind/components/Form/FormAddRemind"
import { useContext } from "react"
import {
  vehiclesContext,
  VehicleProviderContextProps,
} from "../../pages/manager/Remind/providers/VehicleProvider"
import { api } from "../../_helper"
import { MaskLoader } from "../Loader"
import {
  addRemind,
  addRemindGPS,
  deleteRemind,
  finishRemind,
  updateRemind,
} from "../../apis/remindAPI"
import { createCategory } from "../../apis/categoryAPI"
import storage from "../../utils/storage"
import { _const } from "../../_constant"
interface ModalCreateRemindProps {
  remindId?: number
  remindData?: any
  button: React.ReactNode
  isShow?: boolean
  onReload?: () => void
  type?: string
  isUpdateCycleForm?: boolean
}

const Form: FC<{
  action: any
  onReload?: () => void
  remindData?: any
  type?: string
  isUpdateCycleForm?: boolean
}> = ({ action, onReload, remindData = {}, type, isUpdateCycleForm }) => {
  const [loading, setLoading] = useState(false)

  const { vehiclesStore, dispatch } = useContext(
    vehiclesContext,
  ) as VehicleProviderContextProps
  const vehicleSelected = vehiclesStore.vehiclesStore

  const handleSubmit = async (formData: any, callback: any, images?: any) => {
    try {
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
      try {
        await (vehiclesStore?.type === 1
          ? addRemindGPS(images)
          : addRemind(images))
        setTimeout(() => {
          onReload?.()
          action?.closeModal?.()
        }, 100)
        api.message?.success(_const?.string?.remind?.addSuccess)
        dispatch?.freshKey?.()
      } catch (error) {
        api.message?.error(_const?.string?.remind?.addFailed)
      } finally {
        setLoading(false)
      }
    } catch (error) {
      api.message?.error(_const?.string?.remind?.addFailed)
      setLoading(false)
    }
  }

  const handleUpdate = async (formData: any, callback: any, images?: any) => {
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const value = formData[key]
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
    dispatch?.freshKey?.()

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

  const handleDelete = async () => {
    await deleteRemind(remindData?.remind_id)
    onReload?.()
    action?.closeModal?.()
    dispatch?.freshKey?.()
    api.message?.success(_const?.string?.remind?.deleteSuccess)
  }

  const getFunctionHandleAction = () => {
    switch (type) {
      case "add":
        return handleSubmit
      case "copy":
        return handleSubmit
      case "update":
        return handleUpdate
      case "update-cycle":
        return handleUpdateCycle
      default:
        return () => {}
    }
  }

  const handleFormData: any = getFunctionHandleAction()

  const buttonRef = useRef<HTMLButtonElement>(null)

  const getAction = ():
    | {
        title: string
        okButton: string
        okCallback: () => void
      }
    | undefined => {
    switch (type) {
      case "add":
        return {
          title: `Tạo lập lịch hẹn`,
          okButton: "Thêm",
          okCallback: onsubmit,
        }
      case "copy":
        return {
          title: `Tạo bản sao lịch hẹn  ${remindData?.note_repair}`,
          okButton: "Tạo bản sao",
          okCallback: onsubmit,
        }
      case "update":
        return {
          title: `Sửa lịch hẹn  ${remindData?.note_repair}`,
          okButton: "Lưu",
          okCallback: onsubmit,
        }
      case "update-cycle":
        return {
          title: `Sửa lịch hẹn  ${remindData?.note_repair}`,
          okButton: "Lưu",
          okCallback: onsubmit,
        }
      case "delete":
        return {
          title: `Xóa lịch hẹn  ${remindData?.note_repair}`,
          okButton: "Xóa",
          okCallback: handleDelete,
        }
    }
  }

  const onsubmit = () => {
    buttonRef.current?.click()
  }

  return (
    <div>
      {loading && <MaskLoader />}
      {type == "delete" ? (
        <p>Bạn có chắc chắn muốn xoá lịch hẹn này không?</p>
      ) : (
        <FormAddRemind
          isUpdateCycleForm={isUpdateCycleForm}
          initialValues={remindData}
          ref={buttonRef}
          vehicleSelected={vehicleSelected}
          onSubmit={handleFormData}
          isCopyForm={type == "copy"}
        />
      )}
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
  remindId,
  isShow = false,
  button,
  onReload,
  remindData,
  type = "add",
  isUpdateCycleForm = false,
}) => {
  const { vehiclesStore } = useContext(
    vehiclesContext,
  ) as VehicleProviderContextProps

  const getAction = () => {
    switch (type) {
      case "add":
        return {
          title: `Tạo lập lịch hẹn`,
        }
      case "update":
        return {
          title: `Sửa lịch hẹn  ${remindData?.note_repair}`,
        }
      case "update-cycle":
        return {
          title: `Sửa lịch hẹn  ${remindData?.note_repair}`,
        }
      case "delete":
        return {
          title: `Xóa lịch hẹn  ${remindData?.note_repair}`,
        }
      case "copy":
        return {
          title: `Tạo bản sao ${remindData?.note_repair}`,
        }
    }
  }

  return (
    <ModalCView
      isShow={isShow}
      isValidToOpen={
        (vehiclesStore?.vehiclesStore?.length > 0 || remindData) ?? false
      }
      button={button}
      title={getAction()?.title}
      children={(action) => (
        <Form
          isUpdateCycleForm={isUpdateCycleForm}
          type={type}
          remindData={remindData}
          onReload={onReload}
          action={action}
        />
      )}
    />
  )
}

export default ModalCreateRemind
