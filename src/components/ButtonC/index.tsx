import { Button, Tooltip } from "antd"
import { Fragment, MouseEventHandler, ReactNode } from "react"
import { TextEllipsis } from "../TextC"

interface IProps {
  icon: ReactNode
  onClick?: MouseEventHandler<HTMLElement> | undefined
  isActived?: boolean
  tooltip?: string
  disabled?: boolean
}

export const CirButtonC: React.FC<IProps> = ({
  icon,
  onClick,
  isActived,
  tooltip,
  disabled,
}) => {
  const Wrapper = tooltip ? Tooltip : Fragment
  return (
    <Wrapper
      {...(tooltip
        ? {
            arrow: false,
            title: tooltip,
          }
        : {})}
    >
      <Button
        disabled={disabled}
        onClick={onClick}
        type="default"
        className={`rounded-full text-root_white_text_color overflow-hidden`}
        style={{
          background: isActived ? "var(--theme)" : "var(--transparent)",
          color: isActived ? "var(--white)" : "",
        }}
        icon={icon}
      ></Button>
    </Wrapper>
  )
}

interface ICircleButtonText {
  icon: ReactNode
  text: ReactNode
  size?: number
  onClick?: () => void
}

export const CircleButtonText: React.FC<ICircleButtonText> = ({
  icon,
  text,
  size = 50,
  onClick,
}) => {
  return (
    <div onClick={onClick}>
      <div
        style={{
          width: size,
          height: size,
        }}
        className="transition-all rounded-full cursor-pointer flex flex-col items-center justify-center gap-[1px] hover:bg-root_hover_bg_dark hover:text-prim"
      >
        <div>{icon}</div>
        <div className="text-[10px] font-light">
          <TextEllipsis
            style={{
              fontSize: 10,
            }}
            text={`${text}`}
          ></TextEllipsis>
        </div>
      </div>
    </div>
  )
}

interface ICircleButton {
  icon: ReactNode
  size?: number
  onClick?: () => void
}
export const CircleButton: React.FC<ICircleButton> = ({
  icon,
  onClick,
  size = 50,
}) => {
  return (
    <div onClick={onClick}>
      <div
        style={{
          width: size,
          height: size,
        }}
        className="transition-all rounded-full cursor-pointer flex flex-col items-center justify-center gap-[1px] hover:bg-root_hover_bg_dark hover:text-prim"
      >
        <div>{icon}</div>
      </div>
    </div>
  )
}
