import React, { ReactNode } from "react"

interface IProps {
  children: ReactNode
}

export const LoginLayout: React.FC<IProps> = ({ children }) => {
  return (
    <div className="h-[100vh] flex flex-col">
      <div className="flex-1 overflow-auto flex flex-col">{children}</div>
    </div>
  )
}
