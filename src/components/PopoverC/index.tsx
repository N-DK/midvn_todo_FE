import { Button, Popover } from "antd"
import { PopoverProps } from "antd/lib"
import { ReactNode, useState } from "react"
import { IoCaretDownSharp } from "react-icons/io5"

interface IProps {
  content: ReactNode
  buttonTitle: ReactNode
  props?: PopoverProps
  btnStyle?: React.CSSProperties
}

export const PopoverLink: React.FC<IProps> = ({
  buttonTitle,
  content,
  props,
  btnStyle,
}) => {
  const [disabledOpen, setDisabledOpen] = useState<boolean>(false)

  const handleDisabledOpen = () => {
    setDisabledOpen(true)

    setTimeout(() => {
      setDisabledOpen(false)
    }, 10)
  }

  return (
    <div className="flex">
      <Popover
        open={disabledOpen ? false : undefined}
        content={
          <div onClick={handleDisabledOpen}>{content || "no content"}</div>
        }
        trigger={"click"}
        arrow={false}
        placement="topLeft"
        {...props}
      >
        <div
          style={btnStyle}
          className="flex items-center gap-1 px-1 cursor-pointer text-prim text-[12px]"
        >
          <div>{buttonTitle}</div>
          <div>
            <IoCaretDownSharp size={11} />
          </div>
        </div>
        {/* <Button
        size="small"
        style={{
          height: "unset",
        }}
        type="link"
        iconPosition="end"
        icon={<IoCaretDownSharp size={11} />}
      >
        {buttonTitle}
      </Button> */}
      </Popover>
    </div>
  )
}
