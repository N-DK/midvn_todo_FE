import { useEffect, useRef, useState } from "react"
import { ICustomerInfo, IUserDetailInfo } from "../../../_types/userType"
import { store } from "../../../app/store"
import {
  getCustomerInfoService,
  getUserDetailInfoService,
  updateCustomerInfoService,
  updateUserService,
} from "../../../services/userServices"
import { getLevelService } from "../../../services/dev_levelServices"
import { ILevelType, IRoleType } from "../../../_types/devServerType"
import { MaskLoader } from "../../Loader"
import { FormC } from "../../FormC"
import { Button } from "antd"
import { SaveFilled } from "@ant-design/icons"
import { FormInstance } from "antd/lib"
import { api } from "../../../_helper"
import { _const } from "../../../_constant"
import { getString } from "../../../utils/getString"
import { _app } from "../../../utils/_app"
import { getRoleService } from "../../../services/dev_roleServices"

interface IProps {
  userId?: number
  onSuccess?: () => void
}

export const EditUserInfoBox: React.FC<IProps> = ({ userId, onSuccess }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [userInfo, setUserInfo] = useState<IUserDetailInfo>()
  const [formKey, setFormKey] = useState<number>(Math.random())
  const [roleList, setRoleList] = useState<IRoleType[]>()
  const formRef = useRef<FormInstance<any>>(null)

  // const [customerInfo, setUserInfo] = useState<IUserDetailInfo>()

  const customer = store?.getState?.()?.user?.child?.object?.[userId || -1]

  const setFormKey_ = () => setFormKey(Math.random())

  const getCustomerInfo = (userId: number) => {
    setIsLoading(true)
    const userInfoPromise = getUserDetailInfoService?.(userId)
    const roleListPromise = getRoleService?.()

    Promise.all([userInfoPromise, roleListPromise])
      .then(([userInfoFb, roleListFb]: any) => {
        const userInfo = userInfoFb?.data?.[0]
        const roleList = roleListFb?.data

        setUserInfo(userInfo)
        setRoleList(roleList)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
        setFormKey_()
      })
  }

  useEffect(() => {
    if (userId) {
      getCustomerInfo(userId)
    }
  }, [userId, userId])

  const formField = [
    {
      name: "role_id",
      type: "radio",
      label: "Chọn vai trò",
      placeholder: "Chọn vai trò",
      options: [...(roleList || [])]?.reverse?.()?.map?.((role, index) => {
        return {
          value: `${role?.id}`,
          title: role?.name,
        }
      }),
      rules: [
        {
          required: true,
          message: "Không được để trống",
        },
      ],
    },
    null,
    null,
  ]

  const defaultValues = {
    role_id: `${userInfo?.role_id}`,
  }

  const handleSubmit = (vals: any) => {
    const update = () => {
      if (
        userId &&
        userInfo?.parent_id != undefined &&
        userInfo?.is_actived != undefined &&
        userInfo?.customer_id != undefined
      ) {
        setIsLoading(true)
        updateUserService(userId, {
          ...vals,
          parent_id: userInfo?.parent_id,
          customer_id: userInfo?.customer_id,
          is_actived: userInfo?.is_actived,
        })
          ?.then((fb: any) => {
            if (fb?.result) {
              api.message?.success(
                fb?.message || _const?.string?.message?.success,
              )
              getCustomerInfo?.(userId)
              _app.getInitialData?.userChild?.()
              onSuccess?.()
            } else {
              api.message?.error(fb?.message || _const?.string?.message?.error)
            }
          })
          .catch((error) => {
            api.message?.error(
              getString.errorAxiosParams(error) ||
                _const?.string?.message?.error,
            )
          })
          .then((fb) => {
            setIsLoading(false)
          })
      } else {
        api.message?.error("Dữ liệu không hợp lệ!")
      }
    }

    api.modal?.confirm?.({
      title: "Xác nhận cập nhật thông tin?",
      content: "",
      onOk: update,
    })
  }

  const submit = () => {
    formRef?.current?.submit?.()
  }

  return (
    <div className="py-4 relative px-4">
      {isLoading ? <MaskLoader /> : null}

      <FormC
        key={`${formKey}`}
        ref={formRef}
        onFinish={handleSubmit}
        initialValues={defaultValues}
        fields={formField}
        chunk={3}
        chunkWidth={100}
      />
      <div>
        <Button type="primary" icon={<SaveFilled />} onClick={submit}>
          Lưu
        </Button>
      </div>
    </div>
  )
}
