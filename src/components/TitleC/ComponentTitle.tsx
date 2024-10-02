import { ReactNode } from "react"

interface IProps {
  title: ReactNode
  right?: ReactNode
  theme?: "light" | "dark"
  style?: React.CSSProperties
  hiddenTitle?: boolean
}

export const ComponentTitle: React.FC<IProps> = ({
  title = "Title",
  right = null,
  theme = "light",
  style = {},
  hiddenTitle = false,
}) => {
  let bgColor = "#ffffff"
  let color = "var(--root-text-color)"

  if (theme == "dark") {
    bgColor = "var(--dark-bg)"
    color = "var(--white)"
  }

  return (
    <div
      style={{
        backgroundColor: bgColor,
        color,
        ...style,
      }}
      className="h-10 border-b-[0.5px] border-b-root_border_color px-2 items-center flex justify-between"
    >
      <div className="flex-1 overflow-auto">{hiddenTitle ? "" : title}</div>
      <div>{right ? right : null}</div>
    </div>
  )
}

interface IBTitle {
  title: ReactNode
}

export const BTitle: React.FC<IBTitle> = ({ title }) => {
  return <div className="font-semibold">{title}</div>
}

interface ILTitle {
  title: ReactNode
}

export const LTitle: React.FC<ILTitle> = ({ title }) => {
  return <div className="text-[12px]">{title}</div>
}
