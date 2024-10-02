import { Tooltip } from "antd"
import { ReactNode } from "react"
import { PiQuestionLight, PiQuestionMarkBold } from "react-icons/pi"
import { RxQuestionMark } from "react-icons/rx"

interface IProps {
  content: ReactNode
  icon?: ReactNode
}

export const Question: React.FC<IProps> = ({ content, icon }) => {
  return (
    <Tooltip trigger={"click"} title={content}>
      <div className="bg-[#0000001a] rounded-full overflow-hidden h-[14px] w-[14px] flex items-center justify-center">
        {icon || <RxQuestionMark size={10} />}
      </div>
    </Tooltip>
  )
}
