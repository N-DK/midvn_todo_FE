import { Spin } from "antd"
import { Logo } from "../Logo"
import { useEffect, useState } from "react"

interface IProps {
  isFadeOut?: boolean
}

export const InitialScreen: React.FC<IProps> = ({ isFadeOut = false }) => {
  const [fadeOut, setFadeOut] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<boolean>(true)
  useEffect(() => {
    if (isFadeOut) {
      setTimeout(() => {
        setFadeOut(true)
      }, 500)

      setTimeout(() => {
        setIsShow(false)
      }, 1000)
    }
  }, [isFadeOut])

  if (!isShow) return null

  return (
    <div
      className={`${
        fadeOut ? `animate__animated animate__fadeOut animate__faster` : ""
      } w-full h-[100vh] flex justify-center items-center bg-white fixed top-0 left-0 right-0 bottom-0 z-[9999999]`}
    >
      <div className="flex justify-center items-center gap-2">
        <div className="flex flex-col justify-center items-center gap-3">
          <Spin size="default" />
          <div className="text-xs">Đang tải dữ liệu...</div>
        </div>

        <div className="h-14">{/* <Logo /> */}</div>
      </div>
    </div>
  )
}
