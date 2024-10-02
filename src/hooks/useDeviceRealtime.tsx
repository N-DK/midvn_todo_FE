import { ReactNode, useEffect } from "react"
import { IVehicleRealTime } from "../_types/deviceType"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { getStatus } from "../utils/getStatus"
import getTime from "../utils/getTime"
import { _const } from "../_constant"
import { CoorGooleMap } from "../components/CoorGoogleMap"
import {
  PiAlignCenterHorizontalDuotone,
  PiArrowClockwiseDuotone,
  PiBarcodeDuotone,
  PiCalendarCheckDuotone,
  PiCalendarSlashDuotone,
  PiCalendarXDuotone,
  PiCar,
  PiCarBatteryDuotone,
  PiCarSimpleDuotone,
  PiCarSimpleFill,
  PiCardsThreeDuotone,
  PiCellSignalFullDuotone,
  PiClockDuotone,
  PiDiamondDuotone,
  PiEngineDuotone,
  PiFlipHorizontalDuotone,
  PiIdentificationCardDuotone,
  PiMapPinDuotone,
  PiPhoneCallDuotone,
  PiQrCodeDuotone,
  PiRoadHorizonDuotone,
  PiSimCardDuotone,
  PiSpeedometerDuotone,
  PiTimerDuotone,
  PiUserCircleDashedDuotone,
  PiUserCircleGearDuotone,
  PiUserSoundDuotone,
} from "react-icons/pi"
import { TextEllipsis } from "../components/TextC"
import { Coppy } from "../components/Coppy"
import { getcolor } from "../utils/getColor"
import { GiStopSign } from "react-icons/gi"
import { FaShippingFast } from "react-icons/fa"
import { AddressCallback } from "../components/Address"
import { AiTwotoneIdcard } from "react-icons/ai"
import { getRouteService } from "../services/device_services"
import { setVehicleRouteLatLng } from "../features/device/deviceSlice"
import { _array } from "../utils/_array"

const iconSize = 15

export interface IRealtimeItem {
  title?: ReactNode
  value?: ReactNode
  icon?: ReactNode
  color?: string
  useColor?: boolean
  type?: string
}

export const useDeviceRealtime = (device: number) => {
  const dispatch = useAppDispatch()
  const realtime_ = useAppSelector?.(
    (state) => state?.device?.data?.online?.mObject?.[device],
  )

  const realtime = _array?.select?.gpsData(realtime_)

  const status = getStatus?.online(realtime)
  const speedColor = getcolor?.speedColor(realtime?.speed)
  const latLng = `${realtime?.latitude},${realtime?.longitude}`

  useEffect(() => {
    if (realtime?._routes?.length || !realtime_) return
    const startTime = getTime.startDateUnix()
    const endTime = getTime.endDateUnix()
    getRouteService(realtime?.imei, startTime, endTime)
      ?.then((fb) => {
        const _route = fb?.data?.route || []
        dispatch(
          setVehicleRouteLatLng({
            devive: realtime?.imei,
            routes: _route,
          }),
        )
      })
      .catch((error) => {})
      .finally(() => {})
  }, [device, realtime?.time])

  const __DIVIDER__ = {
    type: "divider",
  }

  const KMDAY = {
    title: "KM/ngày",
    value: `${Number((realtime?.distance / 1000)?.toFixed?.(2)) ?? "-"} km`,
    icon: <PiRoadHorizonDuotone size={iconSize} />,
  }

  const TOTAL_COUNT_PARKING = {
    title: "Tổng số lần dừng đỗ",
    value: realtime?.total_number_stop,
    icon: <PiTimerDuotone size={iconSize} />,
  }

  const TOTAL_TIME_PARKING = {
    title: "Tổng thời gian dừng đỗ",
    value: getTime?.caculateTime(realtime?.total_stop_time),
    icon: <GiStopSign size={iconSize} />,
  }

  const TOTAL_TIME_RUNNING = {
    title: "Tổng thời gian phương tiện chạy",
    value: getTime?.caculateTime(realtime?.total_run_time),
    icon: <FaShippingFast size={iconSize} />,
  }

  const CONTINUS_PARKING = {
    title: "Thời gian dừng/đỗ liên tục",
    value: getTime?.caculateTime(realtime?.stopping_time),
    icon: <PiTimerDuotone size={iconSize} />,
  }

  const CONTINUS_DRIVE = {
    title: "Thời gian lái phương tiện liên tục",
    value: getTime?.caculateTime(realtime?.running_time),
    icon: <PiCarSimpleDuotone size={iconSize} />,
  }

  const IMEI = {
    title: "IMEI",
    value: realtime?.imei,
    icon: <PiQrCodeDuotone size={iconSize} />,
  }

  const SERIAL_SIM = {
    title: "Serial SIM",
    value: "-",
    icon: <PiSimCardDuotone size={iconSize} />,
  }

  const MODEL = {
    title: "Model",
    value: realtime?.model_name,
    icon: <PiDiamondDuotone size={iconSize} />,
  }

  const ACTIVATION_DATE = {
    title: "Ngày kích hoạt",
    value: getTime?.Unix2StringFormat(realtime?.activation_date / 1000),
    icon: <PiCalendarCheckDuotone size={iconSize} />,
  }

  const WARRANTY_EXPIRED_DATE = {
    title: "Ngày hết hạn bảo hành",
    value: getTime?.Unix2StringFormat(realtime?.warranty_expired_on / 1000),
    icon: <PiCalendarXDuotone size={iconSize} />,
  }

  const EXPORED_DATE = {
    title: "Ngày hết hạn DVMC",
    value: getTime?.Unix2StringFormat(realtime?.expired_on / 1000),
    icon: <PiCalendarSlashDuotone size={iconSize} />,
  }

  const OWNER = {
    title: "Sở hữu",
    value: realtime?.customer_name,
    icon: <PiUserCircleDashedDuotone size={iconSize} />,
  }

  const AGENCY_NAME = {
    title: "Đại lý/NPP",
    value: realtime?.agency_name,
    icon: <PiUserCircleGearDuotone size={iconSize} />,
  }

  const AGENCY_PHONE = {
    title: "Số điện thoại Đại lý/NPP",
    value: realtime?.agency_phone,
    icon: <PiPhoneCallDuotone size={iconSize} />,
  }

  const VEHICLE_NAME = {
    title: "Biển kiểm soát",
    value: <Coppy>{realtime?.vehicle_name}</Coppy>,
    icon: <PiCarSimpleDuotone size={iconSize} />,
  }

  const VEHICLE_TYPE = {
    title: "Loại phương tiện",
    value: realtime?.vehicle_type_name,
    icon: <PiFlipHorizontalDuotone size={iconSize} />,
  }

  const GPS_TIME = {
    title: "Thời gian GPS",
    value: getTime?.Unix2StringFormat?.(realtime?.time),
    icon: <PiClockDuotone size={iconSize} />,
  }

  const STATUS = {
    title: "Trạng thái",
    value: (
      <div>
        <div>{status?.status}</div>
        {status?.detail?.length ? (
          <div>
            {status?.detail?.map?.((str, index) => {
              return <div key={index}>{str}</div>
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    ),
    icon: <PiArrowClockwiseDuotone size={iconSize} />,
    color: status?.color,
    useColor: true,
  }

  const SPEED = {
    title: "Tốc độ",
    value: `${realtime?.speed} km/h`,
    icon: <PiSpeedometerDuotone size={iconSize} />,
    color: speedColor,
    useColor: true,
  }

  const POSITION = {
    title: "Toạ độ",
    value: (
      <CoorGooleMap
        copyable
        coor={`${realtime?.latitude},${realtime?.longitude}`}
      />
    ),
    icon: <PiMapPinDuotone size={iconSize} />,
  }

  const ADDRESS = {
    title: "Địa chỉ",
    value: realtime?.address || (
      <AddressCallback
        lat={realtime?.latitude}
        lng={realtime?.longitude}
        address={realtime?.address}
        useReset={false}
      />
    ),
    icon: <PiAlignCenterHorizontalDuotone size={iconSize} />,
  }

  const MAXSPEED = {
    title: "Tốc độ giới hạn",
    value:
      `${realtime?.max_speed} km/h` || _const?.string?.status?.vehicle?.unknow,
    icon: <PiSpeedometerDuotone size={iconSize} />,
  }

  const DRIVER_NAME = {
    title: "Tài xế",
    value: `${realtime?.name_driver || "-"}`,
    icon: <PiUserSoundDuotone size={iconSize} />,
  }

  const LISENSE_NUMBER = {
    title: "Số bằng lái",
    value: `${
      realtime?.license_number || _const?.string?.status?.vehicle?.logout
    }`,
    icon: <PiIdentificationCardDuotone size={iconSize} />,
  }

  const DRIVER_PHONE = {
    title: "SĐT Tài xế",
    value: `${realtime?.phone_driver || "-"}`,
    icon: <PiPhoneCallDuotone size={iconSize} />,
  }

  const SIGNAL = {
    title: "Tín hiệu sóng",
    value: `${realtime?.signal_quality}%`,
    icon: <PiCellSignalFullDuotone size={iconSize} />,
  }

  const ACC = {
    title: "ACC",
    value: getStatus.getAcc(realtime),
    icon: <PiEngineDuotone size={iconSize} />,
  }

  const VOL = {
    title: "Điện áp",
    value: `${realtime?.vol || "-"} V`,
    icon: <PiCarBatteryDuotone size={iconSize} />,
  }

  const REALTIME_ITEM_INDAY: IRealtimeItem[] = [
    KMDAY,
    TOTAL_COUNT_PARKING,
    __DIVIDER__,
    TOTAL_TIME_PARKING,
    TOTAL_TIME_RUNNING,
    __DIVIDER__,
    CONTINUS_PARKING,
    CONTINUS_DRIVE,
  ]

  const DEVICE_AND_SERVICE: IRealtimeItem[] = [
    IMEI,
    SERIAL_SIM,
    MODEL,
    ACTIVATION_DATE,
    WARRANTY_EXPIRED_DATE,
    EXPORED_DATE,
    __DIVIDER__,
    OWNER,
    AGENCY_NAME,
    AGENCY_PHONE,
  ]

  const REALTIME_ITEM: IRealtimeItem[] = [
    VEHICLE_NAME,
    IMEI,
    VEHICLE_TYPE,
    MODEL,
    GPS_TIME,
    STATUS,
    SPEED,
    POSITION,
    ADDRESS,
    MAXSPEED,
    __DIVIDER__,
    DRIVER_NAME,
    LISENSE_NUMBER,
    DRIVER_PHONE,
    __DIVIDER__,
    SIGNAL,
    ACC,
    VOL,
    KMDAY,
  ]

  return {
    tab: {
      REALTIME_ITEM,
      REALTIME_ITEM_INDAY,
      DEVICE_AND_SERVICE,
    },
  }
}
