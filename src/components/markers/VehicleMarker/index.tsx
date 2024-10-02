import { Marker, Popup } from "react-leaflet"
import makerIcon from "../../../_assets/markerIcon"
import { IVehicleRealTime } from "../../../_types/deviceType"
import { LatLngExpression } from "leaflet"
import { getStatus } from "../../../utils/getStatus"
import { _position } from "../../../utils/_position"
import { _const } from "../../../_constant"
import { memo } from "react"
import { useAppSelector } from "../../../app/hooks"

interface IProps {
  realtime: IVehicleRealTime
  onClick?: (device: number) => void
}

export const VehicleMarker: React.FC<IProps> = ({ realtime, onClick }) => {
  const MID_POSITION = _const?.position?.MID_PISITION
  const status = getStatus?.online?.(realtime)

  return (
    <MarkerMap
      vehicleName={realtime?.vehicle_name}
      color={status?.color}
      lat={realtime?.latitude || MID_POSITION?.[0]}
      lng={realtime?.longitude || MID_POSITION?.[1]}
      vehicle_icon_name={realtime?.vehicle_icon_name}
      rotation={realtime?.rotation}
      onClick={onClick}
      vehicleId={realtime?.vehicle_id}
      device={realtime?.imei}
    />
  )
}

interface IMarkerMap {
  vehicleName: string
  device: string
  color: string
  lat: number
  lng: number
  vehicle_icon_name: string
  rotation: number
  vehicleId: number
  onClick?: (device: number) => void
}

const MarkerMap: React.FC<IMarkerMap> = memo(
  ({
    vehicleName,
    color,
    lat,
    lng,
    vehicle_icon_name,
    rotation,
    onClick,
    vehicleId,
    device,
  }) => {
    const map_showLabel = useAppSelector?.(
      (state) => state?.interface?.setting?.map_showLabel,
    )
    const map_labelSize = useAppSelector?.(
      (state) => state?.interface?.setting?.map_labelSize,
    )
    const map_iconSize = useAppSelector?.(
      (state) => state?.interface?.setting?.map_iconSize,
    )

    const icon = makerIcon(vehicle_icon_name, "vehicle", {
      fillColor: color || "#000000",
      rotate: rotation,
      vehicleName: map_showLabel ? vehicleName : null,
      vehicleMapFont: map_labelSize,
      vehicleMapScalse: map_iconSize,
    })
    return (
      <Marker
        // title={vehicleName}
        eventHandlers={{ click: () => onClick?.(vehicleId) }}
        riseOnHover={true}
        // autoPan={false}
        icon={icon}
        position={[lat, lng]}
      >
        {/* <Popup>{vehicleName}</Popup> */}
      </Marker>
    )
  },
)
