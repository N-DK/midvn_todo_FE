import { ReactNode } from "react"
import { useHistory } from "../hooks"

interface IProps {
  children: ReactNode
}

export const NavigateProvider: React.FC<IProps> = ({ children }) => {
  useHistory()
  return children
}
