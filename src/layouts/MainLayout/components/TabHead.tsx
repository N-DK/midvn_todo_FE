import React, { useRef, useState } from "react"
import { Tabs } from "antd"
import storage from "../../../utils/storage"

type TargetKey = React.MouseEvent | React.KeyboardEvent | string

const initialItems = storage?.getItem("tabbar") || []

export const TabHead: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string>()
  const [items, setItems] = useState<any[]>(initialItems)
  const newTabIndex = useRef(0)

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey)
  }

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`
    const newPanes = [...items]
    newPanes.push({
      label: "New Tab",
      children: null,
      key: newActiveKey,
    })
    setItems(newPanes)
    setActiveKey(newActiveKey)
  }

  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey
    let lastIndex = -1
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1
      }
    })
    const newPanes = items.filter((item) => item.key !== targetKey)
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key
      } else {
        newActiveKey = newPanes[0].key
      }
    }
    setItems(newPanes)
    setActiveKey(newActiveKey)
  }

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: "add" | "remove",
  ) => {
    if (action === "add") {
      add()
    } else {
      remove(targetKey)
    }
  }

  return (
    <div className="top-head-tabs">
      <Tabs
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        items={items}
        hideAdd
      />
    </div>
  )
}
