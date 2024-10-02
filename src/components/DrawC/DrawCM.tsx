import { FC, useContext, useState, useEffect, useRef } from "react"
import React from "react"
import { Button, Drawer } from "antd"
import "./drawMobile.css"
import {
  VehicleProviderContextProps,
  vehiclesContext,
} from "../../pages/manager/RemindMobile/providers/VehicleProvider"

interface DrawProps {
  button: React.ReactNode
  children: (data: { closeModal: any; data: any }) => React.ReactNode
  title: React.ReactNode
  width?: string | number
  data: any
  setSelectedItems?: any
}

const DrawCM: FC<DrawProps> = ({
  button,
  children,
  title,
  width = "100%",
  data,
  setSelectedItems,
}) => {
  const [open, setOpen] = useState(true)
  const { vehiclesStore, dispatch } = useContext(
    vehiclesContext,
  ) as VehicleProviderContextProps

  const drawerRef = useRef<HTMLDivElement>(null)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
    setSelectedItems?.()
  }

  // Sử dụng touchstart với passive: false
  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      if (event.cancelable) {
        event.preventDefault()
      }
    }

    const currentDrawer = drawerRef.current
    currentDrawer?.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    })

    return () => {
      currentDrawer?.removeEventListener("touchstart", handleTouchStart)
    }
  }, [])

  return (
    <div ref={drawerRef}>
      <div className="drawMobile" onClick={showDrawer}>
        {button}
      </div>
      {open && (
        <Drawer
          height={650}
          style={{ width: "100% !important" }}
          title={title}
          placement="bottom"
          onClose={onClose}
          open={open}
        >
          {children({ closeModal: onClose, data: data })}
        </Drawer>
      )}
    </div>
  )
}

export default DrawCM
