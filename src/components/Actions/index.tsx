import { Divider } from "antd"
import { ReactNode } from "react"
import { IconType } from "react-icons"

interface IActionModal {
  modal: any
  modalProps?: any
}

export interface IActions {
  icon?: IconType
  iconSize?: number
  title: ReactNode
  onClick?: () => void
  active?: boolean
  modal?: IActionModal
  type?: string
}

interface IProps {
  actions: (IActions | null)[]
}

const iconSizeDefault = 16

interface IBtnAction {
  action: IActions
}
const BtnAction: React.FC<IBtnAction> = ({ action }) => {
  const Icon = action?.icon
  const iconSize = action?.iconSize

  return (
    <div
      onClick={action?.onClick}
      className="px-4 h-[35px] gap-2 flex items-center cursor-pointer hover:bg-root_hover_bg_dark hover:text-theme"
    >
      {Icon ? (
        <div>
          <Icon size={iconSize || iconSizeDefault} />
        </div>
      ) : null}
      <div>{action?.title}</div>
    </div>
  )
}

export const Action: React.FC<IProps> = ({ actions }) => {
  return (
    <div className="py-2">
      {actions?.map?.((action, index) => {
        if (!action) return null
        if (action?.type == "divider") {
          return <Divider key={index} className="my-1" />
        }
        if (action?.type == "title") {
          return (
            <div key={index} className="px-4 py-1 opacity-70">
              {action?.title}
            </div>
          )
        }
        const Modal = action?.modal?.modal
        if (Modal) {
          return (
            <Modal
              {...action?.modal?.modalProps}
              key={index}
              button={<BtnAction action={action} />}
            />
          )
        }
        return <BtnAction key={index} action={action} />
      })}
    </div>
  )
}
