import React, { ReactNode } from "react"
import { IconType } from "react-icons"
import { GoQuestion } from "react-icons/go"
import { PiMonitorFill } from "react-icons/pi"
import { ICON_M } from "./ICON_M"

interface IProps {
  name: string
  size?: number
}

export const IconC: React.FC<IProps> = ({ name, ...props }) => {
  const Icon = ICON_M?.[name] || GoQuestion

  return <Icon {...props} />
}
