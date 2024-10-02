import { MenuProps } from "rc-menu"
import { ReactNode, lazy } from "react"
import { NavLink } from "react-router-dom"
import { TFunction } from "i18next"
import {
  PiChartPieLight,
  PiLockKeyDuotone,
  PiUserCircleDuotone,
} from "react-icons/pi"

import { store } from "../app/store"
import { IconC } from "../components/IconC"
import { IServerMenu } from "../_types/interfaceType"
import { FcBusinessman } from "react-icons/fc"
import { FaPowerOff } from "react-icons/fa"
import { RiMessage3Fill } from "react-icons/ri"
import { IoSettingsSharp } from "react-icons/io5"
import { LiaPowerOffSolid } from "react-icons/lia"
import { TreeDataNode } from "antd"
import { api } from "../_helper"
import { _app } from "../utils/_app"
import { routeConfig } from "../configs/routeConfig"

const fakeMenu: IServerMenu[] = [
  {
    child: [
      {
        child: [],
        icon: "MdOutlineBuild",
        id: 102,
        link: `${routeConfig.manager_remind}/maintenance`,
        lv: 0,
        name: "Bảo dưỡng phương tiện",
        parent_id: 0,
        type: "null",
        component: "",
        created_at: 0,
        is_deleted: 0,
        publish: 0,
        sort: 0,
        updated_at: 0,
      },
      {
        child: [],
        icon: "AiOutlineFile",
        id: 103,
        link: `${routeConfig.manager_remind}/document`,
        lv: 0,
        name: "Quản lý giấy tờ phương tiện",
        parent_id: 0,
        type: "null",
        component: "",
        created_at: 0,
        is_deleted: 0,
        publish: 0,
        sort: 0,
        updated_at: 0,
      },
    ],
    icon: "RiAdminFill",
    id: 101,
    link: `/`,
    lv: 0,
    name: "Quản trị",
    parent_id: 0,
    type: "null",
    component: "",
    created_at: 0,
    is_deleted: 0,
    publish: 0,
    sort: 0,
    updated_at: 0,
  },
]
export const NLink: React.FC<{
  to: string
  label: ReactNode
}> = ({ to, label }) => {
  return (
    <NavLink to={to} className={({ isActive }) => `${isActive ? "" : ""}`}>
      {label}
    </NavLink>
  )
}

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  disabled?: boolean,
  children?: MenuItem[],
  onClick?: () => void,
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    onClick,
    disabled: disabled || false,
  } as MenuItem
}
type MenuItem = Required<MenuProps>["items"][number]

export interface IHEADER {
  path: string
  title: string
  icons: ReactNode
  key: string
  type?: string
  children?: IHEADER[]
  disabled?: boolean
  onClick?: () => void
}

export const HEADER = (): IHEADER[] => {
  const serverMenu = fakeMenu

  const getMenu = (menu: IServerMenu): IHEADER => {
    const Icon = <IconC name={menu?.icon} />

    return {
      path: menu?.link,
      title: menu?.name,
      type: menu?.type,
      icons: Icon,
      key: `${menu?.link}`,
      children: menu?.child?.length
        ? menu?.child?.map?.((m) => getMenu(m))
        : undefined,
    }
  }

  return serverMenu?.map?.((menu, index) => {
    return getMenu(menu)
  })
}

export const HEADER_ITEMS = (
  t: TFunction<"translation", undefined>,
  customHeader?: IHEADER[],
  useIcon = true,
): MenuItem[] => {
  return (customHeader || HEADER())?.map?.((header, index) => {
    const getHeader = (header: IHEADER): MenuItem => {
      const title =
        header?.type == "title" ? (
          t(header.title)
        ) : (
          <NLink to={header.path} label={t(header.title)} />
        )
      const icon = useIcon ? header?.icons : null
      return getItem(
        title,
        header?.key,
        icon,
        header?.disabled,
        header?.children?.map?.((child) => getHeader(child)),
      )
    }

    return getHeader(header)
  })
}

///USERHEADER
export const USER_HEADER_ITEMS = (
  t: TFunction<"translation", undefined>,
  customHeader?: IHEADER[],
  useIcon = true,
): MenuItem[] => {
  return USER_HEADER()?.map?.((header, index) => {
    const getHeader = (header: IHEADER): MenuItem => {
      const title =
        header?.type == "title" ? (
          t(header.title)
        ) : (
          <NLink to={header.path} label={t(header.title)} />
        )
      const icon = useIcon ? header?.icons : null
      return getItem(
        title,
        header?.key,
        icon,
        header?.disabled,
        header?.children?.map?.((child) => getHeader(child)),
        header?.onClick,
      )
    }

    return getHeader(header)
  })
}

export const USER_HEADER = (): IHEADER[] => {
  const userInfo = store?.getState?.()?.user?.access?.userInfo
  return [
    {
      path: routeConfig?.monitor,
      title: userInfo?.customer_name || "USER NONAME",
      icons: (
        <div className="bg-white rounded-full">
          <FcBusinessman />
        </div>
      ),
      type: "title",
      key: "1",
      children: [
        {
          path: routeConfig?.report_synthetic,
          title: "Tài khoản",
          icons: <PiUserCircleDuotone />,
          key: "1-1",
          type: "title",
          disabled: true,
        },
        {
          path: routeConfig?.report_synthetic,
          title: "Đổi mật khẩu",
          icons: <PiLockKeyDuotone />,
          key: "1-2",
          type: "title",
          disabled: true,
        },
        // {
        //   path: routeConfig?.report_synthetic,
        //   title: "Đỗi mật khẩu",
        //   icons: <PiChartPieLight />,
        //   key: "1-3",
        //   type: "title",
        // },
      ],
    },
    {
      path: routeConfig?.report_synthetic,
      title: "Tin nhắn",
      type: "title",
      icons: <RiMessage3Fill />,
      key: "2",
    },
    {
      path: routeConfig?.report_synthetic,
      title: "Cài đặt",
      type: "title",
      icons: <IoSettingsSharp />,
      key: "3",
    },
    {
      path: routeConfig?.report_synthetic,
      title: "Đăng xuất",
      type: "title",
      icons: <LiaPowerOffSolid />,
      key: "4",
      onClick: () => {
        api.modal?.confirm({
          title: "Xác nhận đăng xuất?",
          icon: null,
          content: "Đăng xuất khỏi tài khoản này",
          okText: "Đăng xuất",
          cancelText: "Huỷ",
          onOk: _app.logout,
          centered: true,
        })
      },
    },
  ]
}

export const HEADER_TREE_FOR_MODAL = (
  serverMenu: IServerMenu[],
): TreeDataNode[] => {
  const getMenu = (menu: IServerMenu): TreeDataNode => {
    const Icon = <IconC name={menu?.icon} />

    return {
      title: menu?.name,
      icon: Icon,
      key: menu?.id,
      children: menu?.child?.length
        ? menu?.child?.map?.((m) => getMenu(m))
        : undefined,
    }
  }

  return serverMenu?.map?.((menu, index) => {
    return getMenu(menu)
  })
}
