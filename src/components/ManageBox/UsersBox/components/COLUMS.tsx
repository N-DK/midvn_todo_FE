import { ReactNode } from "react"
import { IUserBox } from "../../../../_types/userType"
import { ColumnsType } from "antd/es/table"
import { Coppy } from "../../../Coppy"
import { TextEllipsis } from "../../../TextC"
import { getcolor } from "../../../../utils/getColor"
import { Tag } from "antd"
import { PopoverLink } from "../../../PopoverC"
import { Action } from "../../../Actions"
import {
  PiArrowsSplitDuotone,
  PiCirclesThreePlusDuotone,
  PiKeyDuotone,
  PiPasswordDuotone,
  PiPencilSimpleLineDuotone,
  PiShieldDuotone,
  PiShieldSlashDuotone,
  PiTrashDuotone,
  PiUserPlusDuotone,
  PiUserSwitchDuotone,
} from "react-icons/pi"
import { CustomerEditModal } from "../../../modals/CustomerEditModal"
import { CustomerMoveModal } from "../../../modals/CustomerMoveModal"
import { _app } from "../../../../utils/_app"
import { UserEditModal } from "../../../modals/UserEditModal"
import { RegisterDeviceUserModal } from "../../../modals/RegisterDeviceToUserModal"
import { history } from "../../../../_helper"
import { getLink } from "../../../../utils/getLink"

export interface IColumns {
  key: number
  stt: number
  name: string
  company: string
  username: string
  level_name: string
  phone: string
  email: string
  tax_code: string
  website: string
  address: string
  actions: ReactNode
  data: IUserBox
  is_actived: string
  updateAction: () => void
}

export const columns: ColumnsType<IColumns> = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    width: 70,
    className: "text-center",
    fixed: "left",
  },
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
    width: 150,
  },
  {
    title: "Tài khoản",
    dataIndex: "username",
    key: "username",
    width: 150,
    render(value, record, index) {
      return (
        <div
          onClick={() =>
            history.navigate?.(getLink.businessUser(record?.data?.user_id))
          }
          className="text-theme italic hover:underline cursor-pointer"
        >
          <Coppy>{value}</Coppy>
        </div>
      )
    },
  },
  {
    title: "Trạng thái",
    dataIndex: "is_actived",
    key: "is_actived",
    width: 110,
    render(value, record, index) {
      const color = record?.data?.is_actived == 0 ? "red" : ""
      return <Tag color={color}>{value}</Tag>
    },
  },

  // {
  //   title: "Tài khoản cha",
  //   dataIndex: "parent",
  //   key: "parent",
  //   width: 200,
  //   render(value, record, index) {
  //     return <TextEllipsis tooltip text={value}></TextEllipsis>
  //   },
  // },
  {
    title: "Loại",
    dataIndex: "level_name",
    key: "level_name",
    width: 150,
    render(value, record, index) {
      return value
      let color = getcolor.agencyColor(value)

      return (
        <Tag
          style={{
            fontSize: 12,
          }}
          color={color}
        >
          {value}
        </Tag>
      )
    },
  },
  {
    title: "Công ty",
    dataIndex: "company",
    key: "company",
    width: 200,
    render(value, record, index) {
      return <TextEllipsis tooltip text={value}></TextEllipsis>
    },
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
    key: "phone",
    width: 150,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 200,
  },
  {
    title: "Mã số thuế",
    dataIndex: "tax_code",
    key: "tax_code",
    width: 150,
  },
  {
    title: "Trang web",
    dataIndex: "website",
    key: "website",
    width: 150,
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
    width: 350,
  },

  {
    title: "Thao tác",
    dataIndex: "actions",
    key: "actions",
    width: 90,
    fixed: "right",
    render(value, record, index) {
      const data = record?.data
      const customer_id = data?.id
      const user_id = data?.user_id
      const is_actived = data?.is_actived

      const reload = record?.updateAction
      return (
        <div className="flex items-center gap-2 text-[12px]">
          {/* <div className="px-1">Chi tiết</div> */}
          <PopoverLink
            buttonTitle="Chọn"
            content={
              <Action
                actions={[
                  {
                    type: "title",
                    title: record?.name,
                  },
                  {
                    type: "divider",
                    title: "",
                  },
                  {
                    title: "Chỉnh sửa thông tin",
                    icon: PiPencilSimpleLineDuotone,
                    modal: {
                      modal: CustomerEditModal,
                      modalProps: {
                        customerId: customer_id,
                        onSccess: reload,
                      },
                    },
                  },

                  {
                    title: "Chỉnh sửa vai trò",
                    icon: PiArrowsSplitDuotone,
                    modal: {
                      modal: UserEditModal,
                      modalProps: {
                        title: "Chỉnh sửa vai trò",
                        userId: user_id,
                        onSccess: reload,
                      },
                    },
                  },

                  {
                    title: "Chuyển",
                    icon: PiUserSwitchDuotone,
                    modal: {
                      modal: CustomerMoveModal,
                      modalProps: {
                        userId: user_id,
                        userName: record?.data?.username,
                        name: record?.data?.name || record?.data?.company,
                      },
                    },
                  },

                  {
                    title: "Reset mật khẩu",
                    icon: PiPasswordDuotone,
                    onClick() {
                      _app?.user?.resetPass?.(user_id, data?.username, () => {
                        // reload?.()
                      })
                    },
                  },

                  { title: "divider", type: "divider" },
                  {
                    title: "Gán phương tiện",
                    icon: PiCirclesThreePlusDuotone,
                    modal: {
                      modal: RegisterDeviceUserModal,
                      modalProps: {
                        type: "update",
                        userId: record?.data?.user_id,
                        onSccess: record?.updateAction,
                      },
                    },
                  },
                  { title: "divider", type: "divider" },

                  !(is_actived == 0)
                    ? {
                        title: "Vô hiệu hoá",
                        icon: PiShieldSlashDuotone,
                        onClick() {
                          _app?.user?.disabled?.(
                            user_id,
                            data?.username,
                            () => {
                              setTimeout(() => {
                                _app.getInitialData?.userChild?.()
                                reload?.()
                              }, 200)
                            },
                          )
                        },
                      }
                    : {
                        title: "Bỏ vô hiệu hoá",
                        icon: PiShieldDuotone,
                        onClick() {
                          _app?.user?.actived?.(user_id, data?.username, () => {
                            setTimeout(() => {
                              _app.getInitialData?.userChild?.()
                              reload?.()
                            }, 200)
                          })
                        },
                      },
                  {
                    title: "Xoá",
                    icon: PiTrashDuotone,
                    onClick() {
                      _app?.user?.delete?.(user_id, data?.username, () => {
                        setTimeout(() => {
                          _app.getInitialData?.userChild?.()
                          reload?.()
                        }, 200)
                      })
                    },
                  },
                ]}
              />
            }
          />
        </div>
      )
    },
  },
]
