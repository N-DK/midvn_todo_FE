import { useEffect, useRef, useState } from "react"
import {
  ICustomerInfo,
  IUserBox,
  IUserChild,
  IUserDetailInfo,
} from "../../../_types/userType"
import { store } from "../../../app/store"
import {
  addCustomerService,
  getCustomerInfoService,
  getUserChildService,
  getUserListService,
  updateCustomerInfoService,
} from "../../../services/userServices"
import { getLevelService } from "../../../services/dev_levelServices"
import {
  ILevelType,
  ILicenseType,
  IRoleType,
} from "../../../_types/devServerType"
import { MaskLoader } from "../../Loader"
import { FormC } from "../../FormC"
import { Alert, Button, QRCode, Tag } from "antd"
import { SaveFilled } from "@ant-design/icons"
import { FormInstance } from "antd/lib"
import { api } from "../../../_helper"
import { _const } from "../../../_constant"
import { getString } from "../../../utils/getString"
import { _app } from "../../../utils/_app"
import { _array } from "../../../utils/_array"
import { getRoleService } from "../../../services/dev_roleServices"
import { Coppy } from "../../Coppy"
import {
  addDriverService,
  getDriverDetailService,
  getLicenseTypeService,
  updateDriverService,
} from "../../../services/manage_driverServices"
import { GENDER_LIST } from "../../../items/FORM_ITEMS"
import getTime from "../../../utils/getTime"
import dayjs from "dayjs"
import { IDriver, IDriverDetail } from "../../../_types/driverType"

interface IProps {
  driverId?: number
  onSuccess?: () => void
}

export const EditDriverBox: React.FC<IProps> = ({ driverId, onSuccess }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [formKey, setFormKey] = useState<number>(Math.random())
  const [licenseTypeList, setLicenseTypeList] = useState<ILicenseType[]>()
  const [userBoxList, setUserBoxList] = useState<IUserBox[]>()
  const [driverDetail, setDriverDetail] = useState<IDriverDetail>()
  const formRef = useRef<FormInstance<any>>(null)

  // const [customerInfo, setUserInfo] = useState<IUserDetailInfo>()

  const setFormKey_ = () => setFormKey(Math.random())

  const getInfo = () => {
    if (!driverId)
      return api.message?.warning("Không tìm thấy thông tin tài xế")

    const user = store?.getState()?.user?.access?.userInfo
    setIsLoading(true)
    const getLicenseTypePromise = getLicenseTypeService()
    const getDriverDetailPromise = getDriverDetailService(driverId)
    const getUserListPromise = getUserListService(
      0,
      99999,
      "",
      user?.customer_id,
    )

    Promise.all([
      getLicenseTypePromise,
      getUserListPromise,
      getDriverDetailPromise,
    ])
      .then(([licenseTypeFb, userListFb, driverInfoFb]: any) => {
        setLicenseTypeList(licenseTypeFb?.data)
        setDriverDetail(driverInfoFb?.data?.[0])
        setUserBoxList([
          { ...user, id: user?.customer_id, name: user?.customer_name },
          ...userListFb?.data,
        ])
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
    getInfo()
  }, [])

  const formField = [
    {
      name: "customer_id",
      type: "select",
      label: "Thêm vào tài khoản",
      placeholder: "Chọn tài khoản",
      options: [...(userBoxList || [])]?.map?.((user, index) => {
        return {
          value: `${user?.id}`,
          title: `${user?.name}  (${user?.username})`,
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
    {
      name: "is_actived",
      type: "select",
      label: "Trạng thái",
      placeholder: "Chọn trạng thái",
      options: [
        {
          value: "0",
          title: "Vô hiệu hoá",
        },
        {
          value: "1",
          title: "Hoạt động",
        },
      ],
      rules: [
        {
          required: true,
          message: "Không được để trống",
        },
      ],
    },

    {
      name: "name",
      type: "input",
      label: "Họ tên tài xế",
      placeholder: "Nhập họ tên",
      rules: [
        {
          required: true,
          message: "Không được để trống",
        },
      ],
    },
    {
      name: "phone",
      type: "input",
      label: "Số điện thoại",
      placeholder: "Nhập số điện thoại",
    },
    {
      name: "gender",
      type: "select",
      label: "Giới tính",
      placeholder: "Chọn giới tính",
      options: [...(GENDER_LIST || [])]?.map?.((user, index) => {
        return {
          value: `${user?.id}`,
          title: `${user?.title}`,
        }
      }),
      rules: [
        {
          required: true,
          message: "Không được để trống",
        },
      ],
    },

    {
      name: "birthday",
      type: "dateOnly",
      label: "Ngày sinh",
      placeholder: "Chọn ngày sinh",
    },
    {
      name: "citizen_identity_card",
      type: "input",
      label: "CMND/CCCD",
      placeholder: "Nhập CMND/CCCD",
    },

    {
      name: "license_number",
      type: "input",
      label: "Số bằng lái",
      placeholder: "Nhập số bằng lái",
      rules: [
        {
          required: true,
          message: "Không được để trống",
        },
      ],
    },
    {
      name: "license_type_id",
      type: "select",
      label: "Loại bằng lái",
      placeholder: "Chọn loại bằng lái",
      options: [...(licenseTypeList || [])]?.map?.((user, index) => {
        return {
          value: `${user?.id}`,
          title: `${user?.title}`,
        }
      }),
      rules: [
        {
          required: true,
          message: "Không được để trống",
        },
      ],
    },

    {
      name: "activation_date",
      type: "dateOnly",
      label: "Ngày cấp bằng lái",
      placeholder: "Chọn ngày cấp bằng lái",
    },
    {
      name: "expired_on",
      type: "dateOnly",
      label: "Ngày hết hạn bằng lái",
      placeholder: "Chọn ngày hết hạn bằng lái",
      rules: [
        {
          required: true,
          message: "Không được để trống",
        },
      ],
    },
    // "hole",

    {
      name: "address",
      type: "textarea",
      label: "Địa chỉ",
      placeholder: "Nhập địa chỉ",
    },
  ]

  const defaultValues = {
    ...(driverDetail || {}),
    is_actived: `${driverDetail?.is_actived || ""}`,
    gender: `${driverDetail?.gender || ""}`,
    license_type_id: `${driverDetail?.license_type_id || ""}`,
    customer_id: `${driverDetail?.customer_id || ""}`,
    activation_date: driverDetail?.activation_date
      ? dayjs(getTime.Unix2String(driverDetail?.activation_date))
      : undefined,
    expired_on: driverDetail?.expired_on
      ? dayjs(getTime.Unix2String(driverDetail?.expired_on))
      : undefined,
    birthday: driverDetail?.birthday
      ? dayjs(getTime.Unix2String(driverDetail?.birthday))
      : undefined,
  }

  const handleSubmit = (vals_: any) => {
    if (!driverId)
      return api.message?.warning("Không tìm thấy thông tin tài xế")

    const vals = { ...(vals_ || {}) }
    const update = () => {
      if (vals?.activation_date) {
        vals.activation_date = getTime?.String2Unit(
          dayjs(vals.activation_date)?.toISOString(),
        )
      }
      if (vals?.expired_on) {
        vals.expired_on = getTime?.String2Unit(
          dayjs(vals.expired_on)?.toISOString(),
        )
      }
      if (vals?.birthday) {
        vals.birthday = getTime?.String2Unit(
          dayjs(vals.birthday)?.toISOString(),
        )
      }

      setIsLoading(true)
      updateDriverService(driverId, {
        ...vals,
      })
        ?.then((fb: any) => {
          if (fb?.result) {
            api.message?.success(
              fb?.message || _const?.string?.message?.success,
            )
            onSuccess?.()
          } else {
            api.message?.error(fb?.message || _const?.string?.message?.error)
          }
        })
        .catch((error) => {
          api.message?.error(
            getString.errorAxiosParams(error) || _const?.string?.message?.error,
          )
        })
        .then((fb) => {
          setIsLoading(false)
        })
    }

    api.modal?.confirm?.({
      title: "Xác nhận chỉnh sửa thông tin tài xế?",
      content: (
        <div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Alert
                message={"Vui lòng kiểm tra kỹ thông tin trước khi lưu"}
                type="info"
              />
            </div>
          </div>
        </div>
      ),
      onOk: update,
    })
  }

  const submit = () => {
    formRef?.current?.submit?.()
  }

  return (
    <div className="py-2 relative px-4">
      {isLoading ? <MaskLoader /> : null}
      <div className="flex flex-col gap-4">
        <Alert
          message={
            "Vui lòng nhập chính xác thông tin tài xế để tránh các sự cố không mong muốn"
          }
          type="info"
        />

        <FormC
          key={`${formKey}`}
          ref={formRef}
          onFinish={handleSubmit}
          initialValues={defaultValues}
          fields={formField}
          chunk={3}
          chunkWidth={100}
        />
      </div>
      <div>
        <Button type="primary" icon={<SaveFilled />} onClick={submit}>
          Lưu
        </Button>
      </div>
    </div>
  )
}
