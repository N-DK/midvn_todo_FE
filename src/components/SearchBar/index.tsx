import { useEffect, useRef, useState } from "react"
import useDebounce from "../../hooks/useDebounce"
import { Input, InputRef } from "antd"
import { CloseCircleFilled, SearchOutlined } from "@ant-design/icons"
import { _const } from "../../_constant"
import { api } from "../../_helper"

interface IProps {
  setQ?: (q: string) => void
  onSearch?: (q: string) => void
  isLoading?: boolean
  style?: React.CSSProperties
  placeholder?: string
  debounce?: number
  limitSearchLength?: number
}

export const SearchInput: React.FC<IProps> = ({
  setQ,
  onSearch,
  isLoading,
  placeholder,
  style,
  debounce,
  limitSearchLength,
}) => {
  const inputRef = useRef<InputRef>(null)
  const [input, setInput] = useState<string>("")

  const q = useDebounce(input, debounce || 500)

  useEffect(() => {
    setQ?.(q)
    if (limitSearchLength && limitSearchLength > q?.length && q) {
      api.message?.warning(
        _const?.string?.s?.notLenghtSearchError?.(limitSearchLength),
      )
    } else {
      onSearch?.(q)
    }
  }, [q])

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        onChange={(e) => {
          const value = e?.target?.value
          setInput(value)
        }}
        value={input}
        placeholder={placeholder || "Tìm kiếm"}
      />
      <div className="px-2 flex items-center absolute top-0 right-0 bottom-0">
        <SearchOutlined size={20} />
      </div>
      {q ? (
        <div
          onClick={() => {
            setInput("")
            setTimeout(() => {
              inputRef?.current?.focus?.()
            }, 200)
          }}
          className="px-2 flex items-center absolute top-0 right-5 bottom-0 text-root_text_gray_blue_color cursor-pointer hover:scale-110 transition-all hover:text-prim"
        >
          <CloseCircleFilled size={20} />
        </div>
      ) : null}
    </div>
  )
}
