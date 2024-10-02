import { ReactNode } from "react"
import { IChildOwner, ITeam, IUserBox } from "../../../../_types/userType"
import { ColumnsType } from "antd/es/table"
import { Coppy } from "../../../Coppy"
import { TextEllipsis } from "../../../TextC"
import { getcolor } from "../../../../utils/getColor"
import { Tag } from "antd"
import { PopoverLink } from "../../../PopoverC"
import { Action } from "../../../Actions"
import {
  PiArrowsSplitDuotone,
  PiKeyDuotone,
  PiPasswordDuotone,
  PiPencilSimpleLineDuotone,
  PiShieldDuotone,
  PiShieldSlashDuotone,
  PiTrashDuotone,
  PiUserSwitchDuotone,
} from "react-icons/pi"
import { CustomerMoveModal } from "../../../modals/CustomerMoveModal"
import { _app } from "../../../../utils/_app"
import { UserEditModal } from "../../../modals/UserEditModal"
import { CustomerEditModal } from "../../../modals/CustomerEditModal"

export interface IColumns {
  key: number
  stt: number
  actions: ReactNode
  data: ITeam
  is_actived: string
  created_at: string
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
    render(value, record, index) {
      return (
        <div className="text-theme italic">
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

  {
    title: "Ngày tạo",
    dataIndex: "created_at",
    key: "created_at",
    width: 150,
  },

  {
    title: "Thao tác",
    dataIndex: "actions",
    key: "actions",
    width: 90,
    fixed: "right",
    render(value, record, index) {
      const data = record?.data
      const user_id = data?.id
      const is_actived = data?.is_actived
      const customer_id = data?.customer_id

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

                  { title: "divider", type: "divider" },
                  !(is_actived == 0)
                    ? {
                        title: "Vô hiệu hoá",
                        icon: PiShieldSlashDuotone,
                        onClick() {
                          _app?.user?.disabled?.(user_id, data?.name, () => {
                            setTimeout(() => {
                              _app.getInitialData?.userChild?.()
                              reload?.()
                            }, 200)
                          })
                        },
                      }
                    : {
                        title: "Bỏ vô hiệu hoá",
                        icon: PiShieldDuotone,
                        onClick() {
                          _app?.user?.actived?.(user_id, data?.name, () => {
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
                      _app?.user?.delete?.(user_id, data?.name, () => {
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
