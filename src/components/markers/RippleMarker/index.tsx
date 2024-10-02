import { Marker } from "react-leaflet"
import makerIcon from "../../../_assets/markerIcon"
import { memo } from "react"

interface IProps {
  lat: number
  lng: number
}

const icon = makerIcon("", "ripple", {
  fillColor: "#000000",
  rotate: 0,
  vehicleName: null,
  vehicleMapFont: 12,
  vehicleMapScalse: 1,
})

export const RippleMarker: React.FC<IProps> = memo(({ lat, lng }) => {
  return (
    <Marker
      zIndexOffset={-1}
      title={""}
      icon={icon}
      position={[lat, lng]}
    ></Marker>
  )
})
