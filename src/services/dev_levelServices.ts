import { message } from "antd"
import { serverInstanceNoAuth } from "../axios/serverInstanceNoAuth"
import { API_URL } from "./API"
import { _const } from "../_constant"
import storage from "../utils/storage"
import { serverInstance } from "../axios/serverInstance"

export const getLevelService = () => {
  const API = `${API_URL.levelList}?keyword=&offset=0&limit=100`
  return serverInstance?.get(API)
}

export const updateLevelService = (id: number, body: any) => {
  const API = `${API_URL.levelUpdate}/${id}`
  return serverInstance?.put(API, body)
}

export const updateSortLevelService = (id: number, body: any) => {
  const API = `${API_URL.levelSortUpdate}/${id}`
  return serverInstance?.patch(API, body)
}

export const addLevelService = (body: any) => {
  const API = `${API_URL.levelAdd}`
  return serverInstance?.post(API, body)
}

export const deteleLevelService = (id: number) => {
  const API = `${API_URL.levelDelete}/${id}`
  return serverInstance?.delete(API)
}

export const getLevelPermissionService = (id: number) => {
  const API = `${API_URL.levelPermissionList}/${id}`
  return serverInstance?.get(API)
}

export const getLevelAddPermissionService = (body: any) => {
  const API = `${API_URL.levelAddPermission}`
  return serverInstance?.post(API, body)
}

export const getLevelRemovePermissionService = (body: any) => {
  const API = `${API_URL.levelRemovePermission}/${body?.id}`
  return serverInstance?.delete(API, {
    data: body,
  })
}

export const getLevelModuleService = (id: number) => {
  const API = `${API_URL.levelModuleList}/${id}`
  return serverInstance?.get(API)
}

export const getLevelAddModuleService = (body: any) => {
  const API = `${API_URL.levelAddModule}`
  return serverInstance?.post(API, body)
}

export const getLevelRemoveModuleService = (body: any) => {
  const API = `${API_URL.levelRemoveModule}/${body?.id}`
  return serverInstance?.delete(API, {
    data: body,
  })
}
