import { number } from "react-i18next/icu.macro"

export interface IParking {
  address: string
  duration_seconds: number
  first_time: string
  imei: string
  last_time: string
  latitude: number
  longitude: number
  vehicle_name: string
  vehicle_type_name: string
  start_time: number
  end_time: number
  license_number: string

  // end_address: string
  // end_location: string
  // end_time: number
  // imei: string
  // lisence_number: string
  // start_address: string
  // start_location: string
  // start_time: number
  // vehicle_name: string
  // vehicle_type_name: string
}

export interface IDriverContinus {
  end_address: string
  end_location: string
  end_time: number
  imei: string
  license_number: string
  start_address: string
  start_location: string
  start_time: number
  vehicle_name: string
  vehicle_type_name: string
}

export interface IRouteDayReport {
  vehicle_name: string
  vehicle_type_name: string
  start: {
    latitude: number
    longitude: number
    time: number
    address: string
  }
  finish: {
    latitude: number
    longitude: number
    time: number
    address: string
  }
  total_distance: number
  run_time: number
  stop_time: number
  number_stop: number
  time: number
  avg_speed: number
}

export interface ISumaryDayReport {
  vehicle_name: string
  vehicle_type_name: string
  start: {
    latitude: number
    longitude: number
    time: number
    address: string
  }
  finish: {
    latitude: number
    longitude: number
    time: number
    address: string
  }
  total_distance: number
  run_time: number
  stop_time: number
  number_stop: number
  time: number
  avg_speed: number
  max_speed: number
  number_over_speed: number
}

export interface ISynByVehicleReport {
  vehicle_name: string
  vehicle_type_name: string
  max_speed: number
  count: {
    _5: number
    _5_10: number
    _10_20: number
    _20_35: number
    _35: number
  }
  km: {
    _5: number
    _5_10: number
    _10_20: number
    _20_35: number
    _35: number
  }
  total_distance: number
  total_number_stop: number
}

export interface ISynByDriverReport {
  vehicle_name: string
  vehicle_type_name: string
  license_number: string
  count: {
    _5: number
    _5_10: number
    _10_20: number
    _20_35: number
    _35: number
  }
  km: {
    _5: number
    _5_10: number
    _10_20: number
    _20_35: number
    _35: number
  }
  total_distance: number
  continuous_4: number
}

export interface IOverSpeedReport {
  vehicle_name: string
  vehicle_type_name: string
  max_speed: number
  start: {
    latitude: number
    longitude: number
    time: number
  }
  finish: {
    latitude: number
    longitude: number
    time: number
  }
  distance_over_speed: number
  avg_speed: number
}

export interface ITT09THVPDVVTReport {
  vehicle_name: string
  vehicle_type_name: string
  max_speed: number
  count: {
    _5: number
    _5_10: number
    _10_20: number
    _20_35: number
    _35: number
  }
  km: {
    _5: number
    _5_10: number
    _10_20: number
    _20_35: number
    _35: number
  }
  total_distance: number
  distance_over_speed: number
  total_time_over_speed: number
  total_time: number
  continuous_4: number
  continuous_10: number
}

export interface ITT09VPTTDVVTReport {
  vehicle_name: string
  vehicle_type_name: string
  max_speed: number
  count: {
    _5: number
    _5_10: number
    _10_20: number
    _20_35: number
    _35: number
  }
  total_distance: number
  distance_over_speed: number
  total_time_over_speed: number
  total_time: number
}

export interface ITT09CTVPTDCXReport {
  vehicle_name: string
  vehicle_type_name: string
  max_speed: number
  start: {
    latitude: number
    longitude: number
    time: number
  }
  finish: {
    latitude: number
    longitude: number
    time: number
  }
  distance_over_speed: number
  avg_speed: number
}

export interface IDetailActivityReport {
  vehicle_name: string
  vehicle_type_name: string
  start: {
    latitude: number
    longitude: number
    time: number
  }
  finish: {
    latitude: number
    longitude: number
    time: number
  }
  distance: number
  time: number
}

export interface IAccumulatedDistanceReport {
  vehicle_name: string
  vehicle_type_name: string
  start: {
    latitude: number
    longitude: number
    km: number
    time: number
  }
  finish: {
    latitude: number
    longitude: number
    km: number
    time: number
  }
  time: 1721235640
}

export interface IChargingStationFeeReport {
  fee: string
  imei: string
  lat: number
  lng: number
  name: string
  start_time: number
  dri: string
  address: string
}

export interface IChargingStationReport {
  imei: string
  lat: number
  lng: number
  name: string
  start_time: number
  address: string
  dri: string
}
