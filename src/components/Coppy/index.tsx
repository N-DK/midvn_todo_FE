import { Typography } from "antd"
import { ReactNode, useState } from "react"
import { api } from "../../_helper"

const { Paragraph, Text } = Typography

interface IProps {
  children?: ReactNode
  style?: React.CSSProperties
}

export const Coppy: React.FC<IProps> = ({ children, style = {} }) => {
  return (
    <Paragraph
      copyable={{
        tooltips: false,
        onCopy(event) {
          api.message?.success("Đã sao chép")
        },
      }}
      style={style}
    >
      {children}
    </Paragraph>
  )
}
