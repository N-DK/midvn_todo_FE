import { TabPaneProps, Tabs, TabsProps } from "antd"
import { memo, useEffect, useRef, useState } from "react"
import { IRoute, routes, routesObj } from "../../routes"
import { store } from "../../app/store"
import { IServerMenu } from "../../_types/interfaceType"
import { useAppSelector } from "../../app/hooks"
import { IconC } from "../../components/IconC"
import { history } from "../../_helper"
import { useLocation } from "react-router-dom"
import { routeConfig } from "../../configs/routeConfig"
import { _log } from "../../utils/_log"
import { Switch, Typography } from "antd"
import { ErrorCom } from "../../components/ErrorCom"
import { BiError } from "react-icons/bi"
import { TbError404 } from "react-icons/tb"

const { Paragraph, Text } = Typography

type TargetKey = React.MouseEvent | React.KeyboardEvent | string

const initialPageTabKey: string[] = []
const tabIconSize = 16

const TitleTab: React.FC<{ title: string }> = ({ title }) => (
  <Text ellipsis={true} style={{ maxWidth: 150 }}>
    {title}
  </Text>
)

const initialItems_ = () => {
  const menuPathObj = store?.getState?.()?.interface?.menuObj

  const menuRow: TabsProps["items"] = []

  routes.forEach?.((route) => {
    const r = menuPathObj?.[route?.path]

    const label = r?.name
    const Component = route?.component
    const key = r?.link
    const useTab = route?.useTab

    const isDefault = initialPageTabKey?.includes?.(key)

    if (key && Component && label && isDefault && useTab) {
      menuRow?.push({
        label: <TitleTab title={label} />,
        children: <Component />,
        key: key,
        icon: <IconC size={tabIconSize} name={r?.icon} />,
      })
    }
  })

  return menuRow
}

export const AppMainTab: React.FC = memo(() => {
  const { pathname } = useLocation()
  const [activeKey, setActiveKey] = useState(initialItems_()?.[0]?.key)
  const [items, setItems] = useState(initialItems_())
  const menuObj = useAppSelector?.((state) => state?.interface?.menuObj)

  const onChange = (newActiveKey: string) => {
    history.navigate(newActiveKey)
  }

  const add = (key: string) => {
    const menuItem = menuObj?.[key]
    const routeItem = routesObj?.[key]

    const useTab = routeItem?.useTab
    const Component = routeItem?.component

    if (menuItem && routeItem && useTab && Component) {
      const newTab = {
        label: <TitleTab title={menuItem?.name} />,
        children: <Component />,
        key: key,
        icon: <IconC size={tabIconSize} name={menuItem?.icon} />,
      }
      const newPanes = [...items]
      newPanes.push(newTab)

      setItems(newPanes)
      setActiveKey(key)
    }

    if (!menuItem || !routeItem) {
      const newTab = {
        label: <TitleTab title={"404"} />,
        children: (
          <div className="flex h-full items-center justify-center">
            <ErrorCom text="Opp! Trang không tồn tại hoặc bạn không có quyền truy cập!" />
          </div>
        ),
        key: `error-${Date.now()}`,
        icon: <TbError404 />,
      }
      const newPanes = [...items]
      newPanes.push(newTab)

      setItems(newPanes)
      setActiveKey("error")
    }
  }

  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey
    let lastIndex = -1
    items.forEach((item, i) => {
      if (item?.key === targetKey) {
        lastIndex = i
      }
    })
    const newPanes = items.filter((item) => item?.key !== targetKey)
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex]?.key || newPanes[lastIndex - 1]?.key
      } else {
        newActiveKey = newPanes[0]?.key
      }
    }
    setItems(newPanes)
    history.navigate(newActiveKey)
  }

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: "add" | "remove",
  ) => {
    if (action === "add") {
    } else {
      remove(targetKey)
    }
  }

  useEffect(() => {
    _log("INITIAL TAB")
    if (menuObj) {
      setItems([...initialItems_(), ...items])
    }
  }, [menuObj])

  useEffect(() => {
    setActiveKey(pathname)

    const keyList = items?.map?.((m) => m?.key)
    if (!keyList?.includes?.(pathname)) {
      add?.(pathname)
    }
  }, [pathname])

  return (
    <div className="bg-root_bg_lv1 h-full w-full overflow-auto root-card-tab___">
      <Tabs
        className="root-card-tab___child"
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        items={items?.map?.((tab, index) => {
          if (items?.length <= 1) {
            return { ...tab, closable: false }
          }
          return tab
        })}
        hideAdd
      />
    </div>
  )
})
