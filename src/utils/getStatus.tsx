import {
  MdSignalCellular1Bar,
  MdSignalCellular2Bar,
  MdSignalCellular3Bar,
  MdSignalCellular4Bar,
  MdSignalCellularConnectedNoInternet1Bar,
} from "react-icons/md"
import { _const } from "../_constant"
import { IRouteData, IVehicleRealTime } from "../_types/deviceType"
import { statusOnlineColor } from "./getColor"
import getTime from "./getTime"
import {
  BiNoSignal,
  BiSignal2,
  BiSignal3,
  BiSignal4,
  BiSignal5,
} from "react-icons/bi"
import {
  PiCellSignalFullBold,
  PiCellSignalHighBold,
  PiCellSignalLowBold,
  PiCellSignalMediumBold,
  PiCellSignalNoneBold,
  PiCellSignalSlashBold,
} from "react-icons/pi"
import { _array } from "./_array"

export interface IOnlineStatus {
  color: string
  status: string
  detail?: string[]
}

const _time_4H = 4 * 60 * 60

export const getStatus = {
  signalIcon: (realtime: IVehicleRealTime) => {
    const size = 14
    const signal_quality = realtime?.signal_quality
    if (realtime?.status == 0)
      return {
        icon: <PiCellSignalSlashBold size={size} />,
        opacity: 0.2,
        color: "var(--gray)",
        text: "Không có tín hiệu",
      }

    if (signal_quality >= 80)
      return {
        icon: <PiCellSignalFullBold size={size} />,
        opacity: 1,
        color: "var(--green)",
        text: "Tín hiệu mạnh",
      }
    if (signal_quality >= 60)
      return {
        icon: <PiCellSignalHighBold size={size} />,
        opacity: 0.8,
        color: "var(--green)",
        text: "Tín hiệu tốt",
      }
    if (signal_quality >= 40)
      return {
        icon: <PiCellSignalMediumBold size={size} />,
        opacity: 0.8,
        color: "var(--warning)",
        text: "Tín hiệu trung bình",
      }
    if (signal_quality >= 20)
      return {
        icon: <PiCellSignalLowBold size={size} />,
        opacity: 0.7,
        color: "var(--warning)",
        text: "Tín hiệu yếu",
      }
    if (signal_quality >= 0)
      return {
        icon: <PiCellSignalSlashBold size={size} />,
        opacity: 0.7,
        color: "var(--gray)",
        text: "Không có tín hiệu",
      }

    return {
      icon: <PiCellSignalSlashBold size={size} />,
      opacity: 0.7,
      color: "var(--gray)",
      text: "Không có tín hiệu",
    }
  },
  route: (route: IRouteData): IOnlineStatus => {
    const acc = Number(route?.acc || 0)
    const status = route?.status

    let color = statusOnlineColor?.offline
    let statusString = _const.string?.status?.vehicle?.unknow
    let detail = []

    if (route?.syn) {
      detail?.push(_const.string?.status?.m?.syn)
    }

    if (status == 0 || status == 2 || status == 3) {
      if (route?.speed) {
        color = statusOnlineColor?.running
        statusString = _const.string?.status?.vehicle?.running
      } else {
        if (acc) {
          color = statusOnlineColor?.stoppedR
          statusString = _const.string?.status?.vehicle?.stoppedR
        } else {
          color = statusOnlineColor?.stopped
          statusString = _const.string?.status?.vehicle?.stopped
        }
      }
    }
    if (status == 1) {
      color = statusOnlineColor?.lostgps
      statusString = _const.string?.status?.vehicle?.lostgps
    }

    return {
      color,
      status: `${statusString} ${
        detail?.length ? `(${detail?.join?.(", ")})` : ""
      }`,
      detail,
    }
  },
  online: (realtime: IVehicleRealTime): IOnlineStatus => {
    const acc = Number(realtime?.acc || 0)
    const status = realtime?.status

    let color = statusOnlineColor?.offline
    let statusString = _const.string?.status?.vehicle?.unknow
    let detail = []

    if (status == 0) {
      color = statusOnlineColor?.offline
      statusString = _const.string?.status?.vehicle?.offline
      detail?.push(
        `${getTime?.caculateTime?.(getTime?.currUnix?.() - realtime?.time)}`,
      )
    }
    if (status == 1) {
      color = statusOnlineColor?.lostgps
      statusString = _const.string?.status?.vehicle?.lostgps

      realtime?.lost_gps_time &&
        detail?.push?.(
          `Mất GPS lúc ${getTime?.Unix2StringFormat(
            getTime?.currUnix() - realtime?.lost_gps_time,
          )}`,
          `Liên tục trong ${getTime?.caculateTime?.(realtime?.lost_gps_time)}`,
        )
    }
    if (status == 2 && acc == 1) {
      color = statusOnlineColor?.stoppedR
      statusString = _const.string?.status?.vehicle?.stoppedR
      realtime?.stopping_time &&
        detail?.push?.(
          `Liên tục trong ${getTime?.caculateTime?.(realtime?.stopping_time)}`,
        )
    }
    if (status == 2 && acc == 0) {
      color = statusOnlineColor?.stopped
      statusString = _const.string?.status?.vehicle?.stopped
      realtime?.stopping_time &&
        detail?.push?.(
          `Liên tục trong ${getTime?.caculateTime?.(realtime?.stopping_time)}`,
        )
    }
    if (status == 3) {
      color = statusOnlineColor?.running
      statusString = _const.string?.status?.vehicle?.running
      realtime?.running_time &&
        detail?.push?.(
          `Liên tục trong ${getTime?.caculateTime?.(realtime?.running_time)}`,
        )
    }

    return {
      color,
      detail,
      status: statusString,
    }
  },

  filterTabTypeStatus: (realtime: IVehicleRealTime): number[] => {
    const acc = Number(realtime?.acc || 0)
    const status = realtime?.status

    if (status == 2 && acc == 1) return [3, 2]
    if (status == 2 && acc == 0) return [2]
    if (status == 0) return [5]
    if (status == 1) return [4]
    if (status == 3) return [1]

    return [0]
  },
  filterOverSpeed: (realtime: IVehicleRealTime): number[] => {
    const isOverSpeed =
      realtime?.speed > realtime?.max_speed && realtime?.status != 0

    return isOverSpeed ? [9] : []
  },
  filterHasCam: (realtime: IVehicleRealTime): number[] => {
    const realtime_ = _array.select.camData(realtime?.vehicle_id)

    return realtime_?.quantity_channel ? [11] : []
  },
  filterOver4hDriver: (realtime: IVehicleRealTime): number[] => {
    const isOver4H = realtime?.running_time > _time_4H
    const isOnline = Number(realtime?.status)

    return isOver4H && isOnline ? [10] : []
  },
  filterTabType: (realtime: IVehicleRealTime): number[] => {
    const statusType = getStatus.filterTabTypeStatus(realtime)
    const statusOverSpeed = getStatus.filterOverSpeed(realtime)
    const statusOver4H = getStatus.filterOver4hDriver(realtime)
    const statusHasCam = getStatus.filterHasCam(realtime)

    return [...statusType, ...statusOverSpeed, ...statusOver4H, ...statusHasCam]
  },
  getType: (vehicle: IVehicleRealTime) => {},

  getAcc: (vehicle: IVehicleRealTime) => {
    return Number(vehicle?.acc)
      ? _const?.string?.status?.m?.accON
      : _const?.string?.status?.m?.accOFF
  },
}
