import { useContext } from "react"
import { UserBoxContext } from ".."
import { PiUserCircleCheckLight, PiUserFocusLight } from "react-icons/pi"
import { SkeletonS } from "../../../SkeletonC"

export const UserTitle: React.FC = () => {
  const { user, isLoading } = useContext(UserBoxContext)
  return (
    <div className="flex items-center gap-4">
      {isLoading ? (
        SkeletonS
      ) : (
        <span className="font-semibold">
          {(user?.company || user?.customer_name)?.toLocaleUpperCase?.()}
        </span>
      )}
      <div className="flex items-center gap-1">
        <PiUserCircleCheckLight size={18} />
        {isLoading ? SkeletonS : <span>{user?.level_name}</span>}
      </div>
      <div className="flex items-center gap-1">
        <PiUserFocusLight size={18} />
        {isLoading ? SkeletonS : <span>{user?.role_name}</span>}
      </div>
    </div>
  )
}
