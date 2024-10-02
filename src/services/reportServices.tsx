import { message } from "antd"
import { serverInstanceNoAuth } from "../axios/serverInstanceNoAuth"
import { API_URL } from "./API"
import { _const } from "../_constant"
import storage from "../utils/storage"
import { reportServerInstance, serverInstance } from "../axios/serverInstance"
import getTime from "../utils/getTime"
import axios from "axios"

const getContinusData = (data: any) => {
  data?.forEach?.((record: any, index: number) => {
    if (record) {
      const start = record?.start_location?.split?.(",")
      const end = record?.end_location?.split?.(",")

      let latitude: number = 0
      let longitude: number = 0

      const latitudeS = Number(start?.[0])
      const longitudeS = Number(start?.[1])

      const latitudeE = Number(end?.[0])
      const longitudeE = Number(end?.[1])

      if (latitudeS && longitudeS) {
        latitude = latitudeS
        longitude = longitudeS
      } else {
        latitude = latitudeE
        longitude = longitudeE
      }

      data[index] = {
        address: record?.start_address || record?.end_address,
        duration_seconds:
          Number(record?.end_time || 0) - Number(record?.start_time || 0),
        first_time: record?.start_time,
        imei: record?.imei,
        last_time: record?.end_time,
        latitude,
        longitude,
        vehicle_name: record?.vehicle_name,
        vehicle_type_name: record?.vehicle_type_name,
        start_time: record?.start_time,
        end_time: record?.end_time,
        license_number: record?.license_number,
      }
    }
  })
}

export const getParkingRpService = (data: any) => {
  const API = `${API_URL.parkingReport}`

  const params = {
    type: 2,
    imei: data?.imei,
    start_date: data?.startTime,
    end_date: data?.endTime,
    user_id: data?.userId,
    minutes: data?.minutes || 0.001,
    limit: 99999,
  }

  return reportServerInstance
    ?.get(API, {
      params,
    })
    .then((fb) => {
      getContinusData(fb?.data)
      return fb
    })
}

export const getDriveContinusRpService = (data: any) => {
  const API = `${API_URL.driveContinusReport}`

  const params = {
    type: 3,
    imei: data?.imei,
    start_date: data?.startTime,
    end_date: data?.endTime,
    user_id: data?.userId,
    minutes: data?.minutes || 0.001,
    limit: 99999,
  }

  return reportServerInstance
    ?.get(API, {
      params,
    })
    .then((fb) => {
      // getContinusData(fb?.data)
      return fb
    })
}

export const getRouteIndayReport = (data: any) => {
  const API = `${API_URL.indayReport}`

  const params = {
    type: data?.type || "",
    imei: data?.imei,
    start_date: data?.startTime,
    end_date: data?.endTime,
    user_id: data?.userId,
    limit: 99999,
    // is_check_qcvn: 1,
  }

  return reportServerInstance?.get(API, { params }).then((fb) => {
    return fb
  })
}

export const getSumaryIndayReport = (data: any) => {
  const API = `${API_URL.sumaryIndayReport}`

  const params = {
    type: data?.type || "",
    imei: data?.imei,
    start_date: data?.startTime,
    end_date: data?.endTime,
    user_id: data?.userId,
    limit: 99999,
    // is_check_qcvn: 1,
  }

  return reportServerInstance?.get(API, { params }).then((fb) => {
    return fb
  })
}

export const overSpeedReportReport = (data: any) => {
  const API = `${API_URL.overSpeedReport}`

  const params = {
    type: 4,
    imei: data?.imei,
    start_date: data?.startTime,
    end_date: data?.endTime,
    user_id: data?.userId,
    minutes: data?.minutes,
    limit: 99999,
  }

  return reportServerInstance?.get(API, { params }).then((fb) => {
    return fb
  })
}

export const getSpeedReportService = async (
  imei: string,
  start_date: number,
  end_date: number,
  userId?: number,
) => {
  const API = `${API_URL?.speed}/${imei}`

  const params = {
    start_date: start_date,
    end_date: end_date,
    user_id: userId,
    offset: 0,
    limit: 999999999,
  }

  return reportServerInstance.get(API, { params }).then((fb) => {
    return fb
  })
}

export const TT73SynByVehicleReportService = (data: any) => {
  const API = `${API_URL.synByVehicle}`

  const params = {
    type: 3,
    imei: data?.imei,
    start_date: data?.startTime,
    end_date: data?.endTime,
    user_id: data?.userId,
  }

  return reportServerInstance?.get(API, { params }).then((fb) => {
    return fb
  })
}

export const TT73SynByDriverReportService = (data: any) => {
  const API = `${API_URL.synByDriver}`

  const params = {
    type: 3,
    license_number: data?.licenseNumber,
    start_date: data?.startTime,
    end_date: data?.endTime,
    user_id: data?.userId,
  }

  return reportServerInstance?.get(API, { params }).then((fb) => {
    return fb
  })
}

export const TT09THVPDVVTService = (data: any) => {
  const API = `${API_URL.TT09THVPDVVT}`

  const params = {
    type: 2,
    imei: data?.imei,
    start_date: data?.startTime,
    end_date: data?.endTime,
    user_id: data?.userId,
  }

  return reportServerInstance?.get(API, { params }).then((fb) => {
    return fb
  })
}

export const TT09VPTTDVVTService = (data: any) => {
  const API = `${API_URL.TT09THVPDVVT}`

  const params = {
    type: 1,
    imei: data?.imei,
    start_date: data?.startTime,
    end_date: data?.endTime,
    user_id: data?.userId,
  }

  return reportServerInstance?.get(API, { params }).then((fb) => {
    return fb
  })
}

export const TT09CTVPTDCXService = (data: any) => {
  const API = `${API_URL.TT09CTVPTDCX}`

  const params = {
    type: 1,
    imei: data?.imei,
    start_date: data?.startTime,
    end_date: data?.endTime,
    user_id: data?.userId,
    minutes: data?.minutes,
  }

  return reportServerInstance?.get(API, { params }).then((fb) => {
    return fb
  })
}

export const offlineReportService = (data: any) => {
  const API = `${API_URL.offlineReport}`

  const params = {
    type: 0,
    imei: data?.imei,
    start_date: data?.startTime,
    end_date: data?.endTime,
    user_id: data?.userId,
    limit: 999999,
    offset: 0,
  }

  return reportServerInstance?.get(API, { params }).then((fb) => {
    return fb
  })
}

export const lostGPSReportService = (data: any) => {
  const API = `${API_URL.lostGPSReport}`

  const params = {
    type: 1,
    imei: data?.imei,
    start_date: data?.startTime,
    end_date: data?.endTime,
    user_id: data?.userId,
    limit: 999999,
    offset: 0,
  }

  return reportServerInstance?.get(API, { params }).then((fb) => {
    return fb
  })
}

export const detailedActivityReportService = (data: any) => {
  const API = `${API_URL.detailedActivityReport}`

  const params = {
    imei: data?.imei,
    start_date: data?.startTime,
    end_date: data?.endTime,
    user_id: data?.userId,
  }

  return reportServerInstance?.get(API, { params }).then((fb) => {
    return fb
  })
}

export const accumulatedDistanceReportService = (data: any) => {
  const API = `${API_URL.accumulatedDistanceReport}`

  const params = {
    imei: data?.imei,
    start_date: data?.startTime,
    end_date: data?.endTime,
    user_id: data?.userId,
  }

  return reportServerInstance?.get(API, { params }).then((fb) => {
    return fb
  })
}

export const chargingStationFeeReportService = (data: any) => {
  // const API = `${API_URL.accumulatedDistanceReport}`
  const API = "http://192.168.2.67:3005/api/v1/tollboths/report/fee"

  const params = {
    imei: data?.imei,
    start_date: data?.startTime,
    end_date: data?.endTime,
    user_id: data?.userId,
    offset: 0,
    limit: 999999,
  }

  return axios?.get(API, { params }).then((fb) => {
    return fb?.data
  })
}

export const chargingStationReportService = (data: any) => {
  // const API = `${API_URL.accumulatedDistanceReport}`
  const API = "http://192.168.2.67:3005/api/v1/tollboths/report"

  const params = {
    imei: data?.imei,
    start_date: data?.startTime,
    end_date: data?.endTime,
    user_id: data?.userId,
    offset: 0,
    limit: 999999,
  }

  return axios?.get(API, { params }).then((fb) => {
    return fb?.data
  })
}
