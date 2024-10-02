import { Menu } from "antd"
import { memo } from "react"
import { SlArrowRight } from "react-icons/sl"
import {
  HEADER,
  HEADER_ITEMS,
  IHEADER,
  USER_HEADER_ITEMS,
} from "../../../items/HEADER_ITEMS"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"
import { useBreadcrumb } from "../../../hooks/useBreadcrumb"
import { useAppSelector } from "../../../app/hooks"

export const UserHead: React.FC = memo(() => {
  const { t } = useTranslation()

  // useAppSelector((state) => state?.user?.access?.userInfo)
  // const [keyActive] = useBreadcrumb()

  return (
    <Menu
      selectedKeys={[]}
      expandIcon={<SlArrowRight />}
      theme="dark"
      defaultSelectedKeys={["1"]}
      mode="vertical"
      items={USER_HEADER_ITEMS(t)}
    />
  )
})
