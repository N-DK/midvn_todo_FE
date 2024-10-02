import { useContext, useState } from "react"
import { UserAvatar } from "../../../Logo"
import { UserBoxContext } from ".."
import {
  PiPencilSimpleLineDuotone,
  PiPhoneCallLight,
  PiUserLight,
} from "react-icons/pi"
import { TfiEmail } from "react-icons/tfi"
import { Skeleton } from "antd"
import { SkeletonS } from "../../../SkeletonC"
import { Coppy } from "../../../Coppy"
import { CustomerEditModal } from "../../../modals/CustomerEditModal"
import { store } from "../../../../app/store"
import { CircleButtonText } from "../../../ButtonC"
import { IoSettingsOutline } from "react-icons/io5"
import { RiMessage3Line } from "react-icons/ri"

export const UserCardInfo: React.FC = () => {
  const { user, isLoading, getData } = useContext(UserBoxContext)

  const userInfoItems = [
    {
      icon: <div className="text-base">@</div>,
      value: isLoading
        ? SkeletonS
        : (
            <span className="">
              <Coppy>{user?.username}</Coppy>
            </span>
          ) || "-",
    },
    {
      icon: <PiPhoneCallLight fontSize={18} />,
      value: isLoading ? SkeletonS : user?.phone || "-",
    },
    {
      icon: <TfiEmail fontSize={14} />,
      value: isLoading ? SkeletonS : user?.email || "-",
    },
  ]

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex gap-2">
        <div className="h-[60px] w-[60px]">
          {isLoading ? (
            <Skeleton.Avatar active={true} size={60} />
          ) : (
            <UserAvatar />
          )}
        </div>
        <div className="flex flex-col gap-1">
          {userInfoItems?.map?.((itemInfo, index) => {
            const icon = itemInfo?.icon
            return (
              <div key={index} className="flex items-center">
                <div className="w-7 flex items-center justify-center">
                  {icon}
                </div>
                <div>{itemInfo?.value}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div>
        {user ? (
          <div className="flex items-center gap-2">
            <CustomerEditModal
              customerId={user?.customer_id}
              button={
                <CircleButtonText
                  size={44}
                  icon={<PiPencilSimpleLineDuotone size={16} />}
                  text="Sửa"
                />
              }
              onSccess={getData}
            />
            <CircleButtonText
              size={44}
              icon={<IoSettingsOutline size={16} />}
              text="Cài đặt"
            />
            <CircleButtonText
              size={44}
              icon={<RiMessage3Line size={16} />}
              text="Tin nhắn"
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}
