import { axiosInstance } from "../axios/serverInstanceNoAuth"

import { VehicleType } from "../interface/interface"
import { getTokenParam } from "../utils/_param"
import storage from "../utils/storage"

export const getVehicle = (keyword: string) => {
  return axiosInstance.get("/main/get-all?keyword=" + keyword)
}

// vehicle-no-gps/get-all
export const getVehicleNoGPS = async () => {
  const res = await axiosInstance.get("/vehicle-no-gps/get-all")

  return res?.data?.map((item: any) => {
    return {
      imei: item?.license_plate,
      vehicle_name: item?.license,
    }
  })
}

export const getVehicleGPS = async () => {
  const res = await axiosInstance.get(
    `https://sys01.midvietnam.net/api/v1/device/rows?keyword=&offset=0&limit=9999&type=1`,
    {
      headers: {
        Authorization: `Bearer ${storage.getAccessToken()}`,
      },
    },
  )

  return res?.data?.map((item: any) => {
    return {
      imei: item?.imei,
      vehicle_name: item?.vehicle_name,
    }
  })
}

export const addVehicle = (data: VehicleType) => {
  return axiosInstance.post("/vehicle-no-gps/add-vehicle", [data])
}
export const addVehicleExcel = (data: VehicleType[]) => {
  return axiosInstance.post("/vehicle-no-gps/add-vehicle", data)
}

export const addVehicles = (data: VehicleType[]) => {
  return axiosInstance.post("/vehicle-no-gps/get-all", data)
}

export const deleteVehicle = (id: number) => {
  return axiosInstance.put(`/vehicle-no-gps/delete-vehicle/${id}`)
}

export const updateVehicle = (id: number, data: VehicleType) => {
  return axiosInstance.put(`/vehicle-no-gps/update-vehicle/${id}`, data)
}
