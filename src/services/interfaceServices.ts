import { addressInstance } from "../axios/serverInstanceNoAuth"
import { API_URL } from "./API"
import { _const } from "../_constant"
import { serverInstance } from "../axios/serverInstance"
import { AxiosRequestConfig } from "axios"
import { _array } from "../utils/_array"

export const getMenuService = async () => {
  const API = API_URL?.menu
  return serverInstance.get(API)
}

export const getMenuRowService = async () => {
  const API = API_URL?.menuRows
  return serverInstance.get(API)
}

export const updateMenuRowService = async (menuId: number, body: any) => {
  const API = `${API_URL?.menuUpdate}/${menuId}`
  return serverInstance.put(API, body)
}

export const addMenuRowService = async (body: any) => {
  const API = `${API_URL?.menuAdd}`
  return serverInstance.post(API, body)
}

export const deleteMenuRowService = async (menuId: number) => {
  const API = `${API_URL?.menuDelete}/${menuId}`
  return serverInstance.delete(API)
}

export const addressService = async (
  lat: number | string,
  lng: number | string,
) => {
  const API = `${API_URL.address}?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=vi`

  return addressInstance.get(API)?.then((fb: any) => {
    return fb?.display_name?.replace?.("Cầm đồ Ngọc Hà", "P. Thống Nhất")
  })
}

export const addressServiceTest = async (
  lat: number | string,
  lng: number | string,
) => {
  const API = `http://localhost:8088?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=vi`

  return addressInstance.get(API)?.then((fb: any) => {
    return fb?.display_name
  })
}

export const getInterfaceDetailService = async (keyword: string) => {
  const API = API_URL.detailInterface

  const params = {
    keyword: keyword,
  }

  return serverInstance?.get(API, {
    params,
  })
}

export const getInterfacePageService = async (keyword: string) => {
  const API = API_URL.pageInterface

  const params = {
    keyword: keyword,
    offset: 0,
    limit: 10,
  }

  return serverInstance?.get(API, {
    params,
  })
}

export const getInterfaceListService = async () => {
  const API = API_URL.pageInterface

  const params = {
    offset: 0,
    limit: 9999,
    keyword: "",
  }

  return serverInstance?.get(API, {
    params,
  })
}

export const getInterfacePageDetailService = async (uiId: number) => {
  const API = `${API_URL.pageDetailInterface}/${uiId}`

  return serverInstance?.get(API)
}

export const upLoadImageService = async (
  API: string,
  formData: FormData,
  config: AxiosRequestConfig,
) => {
  return serverInstance?.post(API, formData, config)
}

export const deleteImageService = async (API: string, body: any) => {
  return serverInstance?.delete(API, {
    data: body,
  })
}

export const updateUIService = async (uiId: number, body: any) => {
  const API = `${API_URL.updateInterface}/${uiId}`

  return serverInstance?.put(API, body)
}

export const addUIService = async (body: any) => {
  const API = `${API_URL.addInterface}`

  return serverInstance?.post(API, body)
}

export const deleteUIService = async (uiId: any) => {
  const API = `${API_URL.deleteInterface}/${uiId}`

  return serverInstance?.delete(API)
}
