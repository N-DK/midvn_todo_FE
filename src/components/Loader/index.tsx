import { Spin } from "antd"
import { SpinProps } from "antd/lib"
import { ReactNode } from "react"

interface IProps {
  content?: ReactNode
  size?: "small" | "default" | "large"
}

export const MaskLoader: React.FC<IProps> = ({
  content = "",
  size = "default",
}) => {
  return (
    <div className="flex justify-center items-center flex-col gap-2 absolute top-0 left-0 right-0 bottom-0 bg-root_mask_bg z-[999]">
      <Spin size={size} />
      {content ? <div>{content}</div> : null}
    </div>
  )
}
