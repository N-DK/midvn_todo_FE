const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN
const ADDRESS_DOMAIN = import.meta.env.VITE_ADDRESS_DOMAIN
const SERVER_DOMAIN_REMIND = import.meta.env.VITE_HOST_REMIND_SERVER_DOMAIN
const SERVER_DOMAIN_FIREBASE = import.meta.env.VITE_HOST_FIREBASE_SERVER_DOMAIN

import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { _const } from "../_constant"
import storage from "../utils/storage"
import { getTokenParam } from "../utils/_param"

const getTokenAuthHeader = (token: string) => `${token}`

const createNoAuthInstance = (API: string) => {
  const serverInstanceNoAuth = axios.create({
    baseURL: API,
    headers: { "Content-Type": "application/json" },
  })

  const interceptorsRq = (config: InternalAxiosRequestConfig<any>) => {
    let accessToken = storage.getAccessToken()

    // console.log("accessToken", accessToken)

    config.headers["x-mobicam-token"] = getTokenAuthHeader(accessToken)

    config.timeout = 60000 * 5 || _const?.axios?.timeout

    return config
  }
  const interceptorsRqError = (error: any) => {
    return Promise.reject(error)
  }

  const interceptorsRs = (response: AxiosResponse<any, any>) => {
    return response?.data
  }
  const interceptorsRsError = (error: any) => {
    return Promise.reject(error?.response?.data)
  }

  serverInstanceNoAuth.interceptors.request.use(
    interceptorsRq,
    interceptorsRqError,
  )
  serverInstanceNoAuth.interceptors.response.use(
    interceptorsRs,
    interceptorsRsError,
  )

  return serverInstanceNoAuth
}

export const serverInstanceNoAuth = createNoAuthInstance(SERVER_DOMAIN)
export const addressInstance = createNoAuthInstance(ADDRESS_DOMAIN)

export const axiosFireBaseInstance = createNoAuthInstance(
  SERVER_DOMAIN_FIREBASE,
)

export const axiosInstance = createNoAuthInstance(SERVER_DOMAIN_REMIND)
