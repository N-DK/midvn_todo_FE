import { EditOutlined } from "@ant-design/icons"
import { Button, Form, Input, InputRef, Spin, Tooltip } from "antd"
import { InputProps } from "antd/lib"
import {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react"
import { BsFillQuestionCircleFill } from "react-icons/bs"

interface IProps {
  value?: string
  inputProps?: InputProps
  onSave?: (
    value: string,
    setState: () => void,
    setIsloading: Dispatch<SetStateAction<boolean>>,
  ) => void
}

export const EditInline: React.FC<IProps> = ({ value, inputProps, onSave }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const ref = useRef<InputRef>(null)

  const [inputValue, setInputValue] = useState<string>(value || "")
  const [isLoading, setIsloading] = useState<boolean>(false)
  const [inputValueDispath, setInputValueDispatch] = useState<string>(
    value || "",
  )

  const nEdit = () => setIsEdit(false)
  const sEdit = () => setIsEdit(true)

  const handleChangeInput = (v: ChangeEvent<HTMLInputElement>) => {
    const vl = v?.target?.value
    setInputValue(vl)
  }

  const isNotSave = inputValueDispath != inputValue

  useEffect(() => {
    if (isEdit) {
      ref?.current?.focus?.()
    }

    // if (!isEdit) {
    //   setInputValue(value || "")
    // }
  }, [isEdit])

  const setState = () => {
    setInputValueDispatch(inputValue)
  }

  return (
    <div
      onClick={sEdit}
      className={`${
        isEdit
          ? ""
          : "border border-transparent hover:border-dashed hover:border-theme hover:bg-white cursor-text"
      } relative`}
    >
      {isEdit ? (
        <Input
          onChange={handleChangeInput}
          ref={ref}
          onBlur={() => {
            setTimeout(() => {
              nEdit()
            }, 300)
          }}
          {...inputProps}
          value={inputValue}
        />
      ) : (
        <div
          className="flex items-center"
          style={{
            height: 30,
            padding: "11px",
          }}
        >
          {inputValue}
        </div>
      )}
      {isEdit ? (
        <div className="absolute right-0 top-0 bottom-0 overflow-hidden">
          <Button
            onClick={() => {
              onSave?.(inputValue, setState, setIsloading)
            }}
            className="px-1"
            type="primary"
          >
            Lưu
          </Button>
        </div>
      ) : null}

      {!isEdit ? (
        <div className="absolute right-1 top-0 bottom-0 overflow-hidden h-[30px] flex items-center px-2 cursor-pointer">
          {isLoading ? (
            <Spin size="small" />
          ) : isNotSave ? (
            <Tooltip title="Chưa lưu">
              <BsFillQuestionCircleFill size={15} className="text-red" />
            </Tooltip>
          ) : (
            <EditOutlined size={24} className="text-root_text_gray_color" />
          )}
        </div>
      ) : null}
    </div>
  )
}
