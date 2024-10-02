import L, { DivIcon } from "leaflet"
import icons, { IIconProps } from "./icons"
import { IVehicleRealTime } from "../../_types/deviceType"
// import { IVehicle } from "../../_types"

const ripple = () => {
  return L.divIcon({
    iconSize: [18, 37],
    iconAnchor: [9, 18.5],
    html: icons.ripple(),
  })
}

const vIcons: {
  [key: string]: (style: IIconProps) => DivIcon
} = {
  _bus_icon: function (style: IIconProps) {
    return L.divIcon({
      iconSize: [18, 37],
      iconAnchor: [9, 18.5],
      html: icons.bus(style),
    })
  },
  _car_icon: function (style: IIconProps) {
    return L.divIcon({
      iconSize: [18, 37],
      iconAnchor: [9, 18.5],
      html: icons.car(style),
    })
  },
  _container_icon: function (style: IIconProps) {
    return L.divIcon({
      iconSize: [18, 37],
      iconAnchor: [9, 18.5],
      html: icons.container(style),
    })
  },
  _ship_icon: function (style: IIconProps) {
    return L.divIcon({
      iconSize: [18, 37],
      iconAnchor: [9, 18.5],
      html: icons.ship(style),
    })
  },
  _truck_icon: function (style: IIconProps) {
    return L.divIcon({
      iconSize: [18, 37],
      iconAnchor: [9, 18.5],
      html: icons.truck(style),
    })
  },
  _moto_icon: function (style: IIconProps) {
    return L.divIcon({
      iconSize: [18, 37],
      iconAnchor: [9, 18.5],
      html: icons.moto(style),
    })
  },
}

const vIconsSVG: {
  [key: string]: (style: IIconProps) => TrustedHTML
} = {
  _bus_icon: function (style: IIconProps) {
    return icons.bus(style)
  },
  _car_icon: function (style: IIconProps) {
    return icons.car(style)
  },
  _container_icon: function (style: IIconProps) {
    return icons.container(style)
  },
  _ship_icon: function (style: IIconProps) {
    return icons.ship(style)
  },
  _truck_icon: function (style: IIconProps) {
    return icons.truck(style)
  },
  _moto_icon: function (style: IIconProps) {
    return icons.moto(style)
  },
}

const interfaceIcon = {
  dot: function (distance: number) {
    return L.divIcon({
      iconSize: [18, 18],
      iconAnchor: [9, 9],
      html: icons.dot(distance),
    })
  },
}

const makerIcon = (
  vehicle_icon_name: string,
  type: string,
  style: IIconProps,
) => {
  if (type == "ripple") return ripple()
  if (!vehicle_icon_name && type == "vehicle") return vIcons["_car_icon"](style)
  if (vehicle_icon_name && type == "vehicle")
    return (
      vIcons[`${vehicle_icon_name}`]?.(style) || vIcons["_car_icon"]?.(style)
    )
}

const divIconSVG = (
  vehicle_icon_name: string,
  type: string,
  style: IIconProps,
) => {
  if (!vehicle_icon_name && type == "vehicle")
    return vIconsSVG["_car_icon"](style)
  if (vehicle_icon_name && type == "vehicle") {
    return (
      vIconsSVG[`${vehicle_icon_name}`]?.(style) ||
      vIconsSVG["_car_icon"]?.(style)
    )
  }
}

const markerCIcon = (content: number | string, color: string) => {
  return L.divIcon({
    iconSize: [44, 32],
    iconAnchor: [22, 32],
    html: icons.markerDes(content, color),
  })
}

export default makerIcon
export { interfaceIcon, divIconSVG, markerCIcon }

export const myLocationIcon = L.divIcon({
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  html: `
    <div class='h-5 w-5 border-2 border-white	border-solid	 bg-theme rounded-full z-[999999]'>

    </div>
    `,
})
