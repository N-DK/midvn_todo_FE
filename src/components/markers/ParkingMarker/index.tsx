import { Marker, Popup } from "react-leaflet"
import { IParking } from "../../../_types/reportType"
import L from "leaflet"
import icons from "../../../_assets/markerIcon/icons"
import { getcolor } from "../../../utils/getColor"
import { ItemInfoRow } from "../../../pages/Monitor/VehicleInfoBox/components/RealtimeInfo/ItemInfoRow"
import { IRealtimeItem } from "../../../hooks/useDeviceRealtime"
import getTime from "../../../utils/getTime"
import { CoorGooleMap } from "../../CoorGoogleMap"
import { Divider } from "antd"
import { AddressCallback } from "../../Address"

interface IPointMarker {
  time: number
  type: string
  lat: number
  lng: number
  address: string
}

export const PointMarker: React.FC<IPointMarker> = ({
  time,
  type,
  lat,
  lng,
  address,
}) => {
  const iconColor = type == "start" ? "var(--blue)" : "var(--red)"
  const index = type == "start" ? "S" : "F"
  const message = type == "start" ? "Bắt đầu" : "Kết thúc"

  const icon = L.divIcon({
    iconSize: [44, 32],
    iconAnchor: [22, 32],
    html: icons.markerDes(index, iconColor),
  })

  const items: IRealtimeItem[] = [
    {
      title: "Sự kiện",
      value: message,
    },
    {
      title: "Thời gian",
      value: getTime?.Unix2StringFormat(time),
    },
    {
      title: "Toạ độ",
      value: (
        <CoorGooleMap
          style={{
            fontSize: 12,
          }}
          copyable
          coor={`${lat},${lng}`}
        />
      ),
    },
    {
      title: "Địa chỉ",
      value: address || (
        <AddressCallback address={address} lat={lat} lng={lng} />
      ),
    },
  ]

  if (!lat || !lng) return null

  return (
    <Marker position={[Number(lat), Number(lng)]} icon={icon}>
      <Popup offset={[0, -35]}>
        <div className="text-[12px]">
          <div>
            {items?.map?.((info, index) => {
              return <ItemInfoRow key={index} info={info} />
            })}
          </div>
        </div>
      </Popup>
    </Marker>
  )
}

interface IParkingProp {
  parking: IParking
  index: number
}

export const ParkingMarker: React.FC<IParkingProp> = ({ parking, index }) => {
  const lat = parking?.latitude
  const lng = parking?.longitude

  const startTime = parking?.start_time
  const endTime = parking?.end_time

  const totaltime = Math.abs(Number(endTime - startTime) || 0)

  const iconColor = getcolor?.parkingColor(totaltime)

  const icon = L.divIcon({
    iconSize: [44, 32],
    iconAnchor: [22, 32],
    html: icons.markerDes(index, iconColor),
  })

  const items: IRealtimeItem[] = [
    {
      title: "Sự kiện",
      value: "Dừng đỗ",
    },
    {
      title: "Tổng thời gian",
      value: getTime?.caculateTime(totaltime),
    },
    {
      title: "Toạ độ",
      value: (
        <CoorGooleMap
          style={{
            fontSize: 12,
          }}
          copyable
          coor={`${lat},${lng}`}
        />
      ),
    },
    {
      title: "Địa chỉ",
      value: parking?.address,
    },
  ]

  return (
    <Marker position={[Number(lat), Number(lng)]} icon={icon}>
      <Popup offset={[0, -35]}>
        <div className="text-[12px]">
          <div className="font-semibold">
            {getTime?.Unix2StringFormatC(startTime, "HH:mm:ss")} đến{" "}
            {getTime?.Unix2StringFormatC(endTime, "HH:mm:ss DD/MM/YYYY")}
          </div>
          <Divider className="my-2" />
          <div>
            {items?.map?.((info, index) => {
              return <ItemInfoRow key={index} info={info} />
            })}
          </div>
        </div>
      </Popup>
    </Marker>
  )
}
