import { useEffect, useRef, useState } from "react"
import {
  ICustomerInfo,
  IUserChild,
  IUserDetailInfo,
} from "../../../_types/userType"
import { store } from "../../../app/store"
import {
  addCustomerService,
  getCustomerInfoService,
  getUserChildService,
  moveUserService,
  updateCustomerInfoService,
} from "../../../services/userServices"
import { getLevelService } from "../../../services/dev_levelServices"
import { ILevelType, IRoleType } from "../../../_types/devServerType"
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

interface IProps {
  userId?: number
  userName?: string
  name?: string
  customerId?: number
  onSuccess?: () => void
}

export const MoveCustomerBox: React.FC<IProps> = ({
  userId,
  onSuccess,
  userName,
  name,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [userList, setUserList] = useState<IUserChild[]>()
  const [formKey, setFormKey] = useState<number>(Math.random())
  const formRef = useRef<FormInstance<any>>(null)

  // const [customerInfo, setUserInfo] = useState<IUserDetailInfo>()

  const setFormKey_ = () => setFormKey(Math.random())

  const getCustomerInfo = (userId: number) => {
    setIsLoading(true)
    const getUserChildPromise = getUserChildService()

    Promise.all([getUserChildPromise])
      .then(([userListFb]: any) => {
        const user: any = store?.getState()?.user?.access?.userInfo
        const userList = _array
          .removeCustomerUser([user, ...userListFb?.data])
          ?.filter?.((u) => u?.id != userId)

        setUserList(userList)
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
  }, [userId])

  const formField = [
    {
      name: "parent_id",
      type: "select",
      label: "Tài khoản cha",
      placeholder: "Chọn tài khoản cha",
      options: [...(userList || [])]?.map?.((user, index) => {
        return {
          value: `${user?.id}`,
          title: `${user?.customer_name}  (${user?.username})`,
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
    "hole",
  ]

  const defaultValues = {
    // parent_id: `${userId}`,
  }

  const handleSubmit = (vals: any) => {
    const update = () => {
      if (userId) {
        setIsLoading(true)
        moveUserService({
          reciver: vals?.parent_id,
          user_is_moved: userId,
        })
          ?.then((fb: any) => {
            if (fb?.result) {
              api.message?.success(
                fb?.message || _const?.string?.message?.success,
              )
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

    const newParent = userList?.find?.((u) => u?.id == vals?.parent_id)
    api.modal?.confirm?.({
      title: "Xác nhận di chuyển tài khoản khách hàng?",
      content: (
        <div>
          <div className="flex flex-col gap-4">
            <div>
              <div>
                Bạn đang di chuyển khách hàng{" "}
                <span className="font-semibold">
                  {name} ({userName})
                </span>{" "}
                sang tài khoản cha là{" "}
                <span className="font-semibold">
                  {newParent?.customer_name} ({newParent?.username})
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Alert
                message={`Vui lòng kiểm tra kỹ thông tin trước khi di chuyển`}
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

  if (userId == undefined) {
    return "Không tìm thấy tài khoản"
  }

  return (
    <div className="py-2 relative px-4">
      {isLoading ? <MaskLoader /> : null}
      <div className="flex flex-col gap-4">
        <Alert
          message={
            <div className="flex flex-col gap-2">
              <div>
                Bạn đang di chuyển tài khoản{" "}
                <span className="font-semibold">
                  {name} ({userName})
                </span>
              </div>
              <div>
                Chỉ nên chuyển khách hàng tài khoản vào tài khoản cha, tránh
                chuyển vào các tài khoản con
              </div>
            </div>
          }
          type="info"
        />

        <FormC
          key={`${userId}`}
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
          Chuyển
        </Button>
      </div>
    </div>
  )
}
