import { Menu } from "antd"
import { memo } from "react"
import { SlArrowRight } from "react-icons/sl"
import { HEADER, HEADER_ITEMS, IHEADER } from "../../../items/HEADER_ITEMS"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"
import { useBreadcrumb } from "../../../hooks/useBreadcrumb"

export const MenuHead: React.FC = memo(() => {
  const { t } = useTranslation()
  const [keyActive] = useBreadcrumb()

  return (
    <Menu
      selectedKeys={[keyActive]}
      expandIcon={<SlArrowRight />}
      theme="dark"
      defaultSelectedKeys={["1"]}
      mode="vertical"
      items={HEADER_ITEMS(t)}
    />
  )
})
