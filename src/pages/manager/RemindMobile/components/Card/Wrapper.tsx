import { FC } from "react"

interface WrapperCardProps {
  children: React.ReactNode
}

const WrapperCard: FC<WrapperCardProps> = ({ children }) => {
  return <div className="wp_card  rounded-md shadow-inner">{children}</div>
}

export default WrapperCard
