import { ReactNode } from "react"

interface IPsops {
  stype?: React.CSSProperties
  text?: ReactNode
}

export const ErrorCom: React.FC<IPsops> = ({ text, stype = {} }) => {
  return (
    <div className="text-xl font-extralight" style={{ ...stype }}>
      {text || `OOP! Có lỗi...`}
    </div>
  )
}
