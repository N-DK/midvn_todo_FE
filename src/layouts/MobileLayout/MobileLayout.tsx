import { FC } from "react"
import { AuthHocMobile } from "../../hocs/AuthHoc/AuthHocMobile"

interface MobileLayoutProps {
  children?: React.ReactNode
}

const MobileLayout: FC<MobileLayoutProps> = ({ children }) => {
  return (
    <AuthHocMobile>
      <div className="overflow-hidden pt-2 ">{children}</div>
    </AuthHocMobile>
  )
}

export default MobileLayout
