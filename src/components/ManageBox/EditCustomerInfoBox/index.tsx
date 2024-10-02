import { useEffect, useRef, useState } from "react"
import { ICustomerInfo, IUserDetailInfo } from "../../../_types/userType"
import { store } from "../../../app/store"
import {
  getCustomerInfoService,
  updateCustomerInfoService,
} from "../../../services/userServices"
import { getLevelService } from "../../../services/dev_levelServices"
import { ILevelType } from "../../../_types/devServerType"
import { MaskLoader } from "../../Loader"
import { FormC } from "../../FormC"
import { Button } from "antd"
import { SaveFilled } from "@ant-design/icons"
import { FormInstance } from "antd/lib"
import { api } from "../../../_helper"
import { _const } from "../../../_constant"
import { getString } from "../../../utils/getString"
import { _app } from "../../../utils/_app"

interface IProps {
  userId?: number
  customerId?: number
  onSuccess?: () => void
}

export const EditUserInfoBox: React.FC<IProps> = ({
  userId,
  customerId,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [userInfo, setUserInfo] = useState<ICustomerInfo>()
  const [formKey, setFormKey] = useState<number>(Math.random())
  const [levelList, setLevelList] = useState<ILevelType[]>()
  const formRef = useRef<FormInstance<any>>(null)

  // const [customerInfo, setUserInfo] = useState<IUserDetailInfo>()

  const customer = store?.getState?.()?.user?.child?.object?.[userId || -1]

  const customerId_ = customerId || customer?.customer_id

  const setFormKey_ = () => setFormKey(Math.random())

  const getCustomerInfo = (customer_id: number) => {
    setIsLoading(true)
    const customerInfoPromise = getCustomerInfoService?.(customer_id)
    const levelListPromise = getLevelService?.()

    Promise.all([customerInfoPromise, levelListPromise])
      .then(([customerInfoFb, levelListFb]: any) => {
        const userInfo = customerInfoFb?.data?.[0]
        const levelList = levelListFb?.data

        setUserInfo(userInfo)
        setLevelList(levelList)
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
    const customer_id = customerId_
    if (customer_id) {
      getCustomerInfo(customer_id)
    }
  }, [userId, customerId])

  const formField = [
    // {
    //   name: "user_name",
    //   type: "input",
    //   label: "Tài khoản @",
    //   placeholder: "",
    //   disabled: true,
    // },
    // "hole",
    // "hole",

    {
      name: "name",
      type: "input",
      label: "Tên hiển thị",
      placeholder: "Nhập tên hiển thị",
      rules: [
        {
          required: true,
          message: "Không được để trống",
        },
      ],
    },
    {
      name: "company",
      type: "input",
      label: "Tên công ty",
      placeholder: "Nhập tên công ty",
    },
    "hole",
    {
      name: "level_id",
      type: "radio",
      label: "Loại",
      placeholder: "Chọn loại",
      options: [...(levelList || [])]?.reverse?.()?.map?.((level, index) => {
        return {
          value: `${level?.id}`,
          title: level?.name,
        }
      }),
      rules: [
        {
          required: true,
          message: "Không được để trống",
        },
      ],
      disabled:
        customerId_ ==
          store?.getState?.()?.user?.access?.userInfo?.customer_id || isLoading,
    },
    null,
    null,
    {
      name: "phone",
      type: "input",
      label: "Số điện thoại",
      placeholder: "Nhập số điện thoại",
    },
    {
      name: "email",
      type: "input",
      label: "Email",
      placeholder: "Nhập email",
    },
    "hole",
    {
      name: "tax_code",
      type: "input",
      label: "Mã số thuế (Tax)",
      placeholder: "Nhập mã số thuế",
    },
    {
      name: "website",
      type: "input",
      label: "Trang web (website)",
      placeholder: "Nhập trang web",
    },
    "hole",
    {
      name: "address",
      type: "textarea",
      label: "Địa chỉ",
      placeholder: "Nhập địa chỉ",
    },
    "hole",
  ]

  const defaultValues = {
    user_name: customer?.username,
    ...(userInfo || {}),
    level_id: `${userInfo?.level_id}`,
  }

  const handleSubmit = (vals: any) => {
    const update = () => {
      if (customerId_) {
        setIsLoading(true)
        updateCustomerInfoService(customerId_, {
          ...vals,
          publish: 1,
        })
          ?.then((fb: any) => {
            if (fb?.result) {
              api.message?.success(
                fb?.message || _const?.string?.message?.success,
              )
              getCustomerInfo?.(customerId_)
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
