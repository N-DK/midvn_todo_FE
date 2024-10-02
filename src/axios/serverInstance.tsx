const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN
const SERVER_REPORT_DOMAIN = import.meta.env.VITE_SERVER_REPORT_DOMAIN
const VITE_SOCKET_SERVER_DOMAIN = import.meta.env.VITE_SOCKET_SERVER_DOMAIN

import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios"
import storage from "../utils/storage"
import { getAccessTokenService } from "../services/userServices"
import { api } from "../_helper"
import { _const } from "../_constant"
import { _app } from "../utils/_app"

const getTokenAuthHeader = (token: string) => `Bearer ${token}`

function createInstance(API: string, timeout?: number) {
  const serverInstance = axios.create({
    baseURL: API,
    headers: { "Content-Type": "application/json" },
  })

  const interceptorsRq = async (config: InternalAxiosRequestConfig<any>) => {
    let accessToken = storage.getAccessToken()

    config.headers.Authorization = getTokenAuthHeader(accessToken)
    config.timeout = timeout || _const?.axios?.timeout

    return config
  }
  const interceptorsRqError = (error: any) => {
    return Promise.reject(error)
  }

  const interceptorsRs = (response: AxiosResponse<any, any>) => {
    return response?.data
  }
  const interceptorsRsError = async (error: any) => {
    const status = error?.response?.status
    if (status === 401 || status === 403) {
      try {
        const fb: any = await getAccessTokenService()
        if (fb?.result == 1) {
          const originalRequest = error.config
          return serverInstance(originalRequest)
        }
      } catch (error: any) {
        if (error?.result == 2) {
          storage.clearToken()
          storage?.remove?.("fcmToken")
          api.message?.error(_const?.string?.message?.network)
        }

        if (error?.result == 3) {
          _app?.logout?.()
        }
      }
    }

    return Promise.reject(error)
  }

  serverInstance.interceptors.request.use(interceptorsRq, interceptorsRqError)
  serverInstance.interceptors.response.use(interceptorsRs, interceptorsRsError)

  return serverInstance
}

export const serverInstance = createInstance(SERVER_DOMAIN, 60000)
export const reportServerInstance = createInstance(SERVER_REPORT_DOMAIN, 60000)
export const realtimeServerInstance = createInstance(
  VITE_SOCKET_SERVER_DOMAIN,
  30000,
)
