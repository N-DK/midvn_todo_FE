export interface IDeviceInfo {
  activation_date: number //ngày KH
  created_at: number
  customer_name: string
  customer_id: number
  dev_id: string
  device_status_name: string
  expired_on: number //ngày hết hạn
  id: number
  imei: string
  model_name: string
  serial: string
  orders_code: string
  time_update_version: number
  updated_at: number
  version_hardware: string
  version_software: string
  agency_name: string
  warranty_expired_on: number //ngày hết hạn BH
  sv_cam_id?: number
  host: string
}

export interface IDeviceInfoVehicle {
  activation_date: number
  customer_name: string
  dev_id: string
  expired_on: number
  id: number
  imei: string
  is_checked: number
  is_transmission_gps: number
  is_transmission_image: number
  model_name: string
  quantity_channel: number
  serial: string
  service_package_name: string
  vehicle_name: string
  vehicle_type_name: string
  warranty_expired_on: number
}

export interface IDeviceDetailInfo {
  dev_id: string
  device_status_id: number
  id: number
  imei: string
  model_id: number
  note: string
  serial: string
  version_hardware: string
  version_software: string
  sv_cam_id: number
}

export interface IVehicleRealTime {
  acc: string
  activation_date: number
  address: string
  agency_name: string
  agency_phone: string
  alr: number
  continuous_time: number
  customer_name: string
  device_status_name: string
  expired_on: number
  imei: string
  latitude: number
  license_number: string
  longitude: number
  model_name: string
  vol: string
  rotation: number
  signal_quality: number
  speed: number
  status: number
  syn: number
  time: number
  name_driver: string
  phone_driver: string
  distance: number
  vehicle_icon_id: number
  vehicle_icon_name: string
  vehicle_name: string
  vehicle_type_name: string
  warranty_expired_on: number
  agency_id: number
  customer_id: number
  device_id: number
  end_of_move: number
  idx: number
  is_add_total_stop_time: number
  number_stop: number
  running_time: number
  running_time_no_report: number
  status_device: number
  stopping_time: number
  stopping_time_no_report: number
  total_number_stop: number
  total_run_time: number
  total_stop_time: number
  lost_gps_time: number
  max_speed: number
  vehicle_id: number
  model_type_id: number
  quantity_channel: number
  sv_cam_id: number
  _routes: IRouteData[]
}

export interface IMRealTime {
  vehicleName: string
  vehicleId: number
  realtime: {
    [key: string]: IVehicleRealTime
  }
}

export interface IRouteData {
  acc: number
  address: string
  imei: string
  latitude: number
  license_number: string
  longitude: number
  rotation: number
  signal_quality: number
  speed: number
  status: number
  time: number
  km: number
  km_accumulate: number
  syn: number
  idx: number
  distance: number
  // bonus
  stopping_time_no_report: number
  running_time_no_report: number
  lost_gps_time: number
  index?: number
  running_time: number
  stopping_time: number
}

export interface IRouteDetail {
  startTime: number
  endTime: number
  km: number
  startCoor: number[]
  endCoor: number[]
  startAddress: string
  endAdrress: string
  route: IRouteData[]
  type: number
  parkingIndex?: number
  routeIndex?: number
}

export interface ISpeedRecord {
  idx: number
  imei: string
  speed: string
  time: number
}

export interface IOfflineRecord {
  end_address: string
  end_latitude: number
  end_longitude: number
  end_time: number
  start_address: string
  start_longitude: number
  start_latitude: number
  start_time: number
  type: number
  vehicle_name: string
}

export interface ILostGPSRecord {
  end_address: string
  end_latitude: number
  end_longitude: number
  end_time: number
  start_address: string
  start_longitude: number
  start_latitude: number
  start_time: number
  type: number
  vehicle_name: string
}

export interface ICamListActived {
  device: string
  hostname: string
  licencePlate: string
  channel: number
  port: number
  token: string
  streamMode: number
  chn: number
  startTime: number
}
