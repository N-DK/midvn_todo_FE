import { useAppSelector } from "../../app/hooks"

interface IProps {
  style?: React.CSSProperties
}

export const Logo: React.FC<IProps> = ({ style = {} }) => {
  const pageInterface = useAppSelector((state) => state?.interface?.page)

  const staticURL = pageInterface?.sv_static_file
  const logo = pageInterface?.logo
  const logoURL = `${staticURL}/${pageInterface?.logo}`

  return (
    <div className="h-full items-center flex">
      {logo ? (
        <img
          crossOrigin="anonymous"
          style={style}
          className="h-full"
          alt="logo"
          src={logoURL}
        />
      ) : null}
    </div>
  )
}

export const UserAvatar: React.FC<IProps> = ({ style = {} }) => {
  return (
    <div className="h-full items-center flex">
      <img
        style={style}
        className="h-full"
        alt="logo"
        src="/assets/images/user_avatar.png"
      />
    </div>
  )
}
