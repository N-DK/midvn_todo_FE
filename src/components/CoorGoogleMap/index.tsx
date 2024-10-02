import { Coppy } from "../Coppy"

interface IProps {
  coor: string
  copyable?: boolean
  style?: React.CSSProperties
}

export const CoorGooleMap: React.FC<IProps> = ({
  coor,
  style = {},
  copyable = false,
}) => {
  return (
    <a
      style={style}
      className="link-to"
      target="_blank"
      href={`https://www.google.com/maps?q=${coor}`}
    >
      {copyable ? <Coppy style={style}>{`${coor}`}</Coppy> : `${coor}`}
    </a>
  )
}
