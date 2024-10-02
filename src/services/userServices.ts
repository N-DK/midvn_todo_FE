import { message } from "antd"
import { serverInstanceNoAuth } from "../axios/serverInstanceNoAuth"
import { API_URL } from "./API"
import { _const } from "../_constant"
import storage from "../utils/storage"
import { serverInstance } from "../axios/serverInstance"
// import "./transfer"
// import { USER_DATA } from "../data/old/user"

export const loginService = async (body: any) => {
  const API = API_URL.login
  return new Promise(async (resolve, reject) => {
    try {
      const fb: any = await serverInstanceNoAuth.post(API, body)
      const refeshToken = fb?.data?.[0]?.refreshToken
      const accessToken = fb?.data?.[0]?.token

      storage.setToken(accessToken, refeshToken)

      resolve({
        message: fb?.message || "Đăng nhập thành công",
      })
    } catch (error: any) {
      const errArray = error?.errors?.map((err: any) => err?.msg)
      reject({
        message: errArray?.length
          ? errArray?.join?.(",")
          : _const.string?.message?.network,
      })
    }
  })
}

export const getAccessTokenService = async () => {
  const API = API_URL?.refeshToken
  const refeshToken = storage.getRefreshToken()

  return new Promise(async (resolve, reject) => {
    try {
      const fb = await serverInstanceNoAuth.post(API, {
        refresh_token: refeshToken,
      })

      const newAccessToken = fb?.data?.[0]?.token

      if (!newAccessToken) {
        reject({
          result: 3,
        })
      }

      storage.setAccessToken(newAccessToken)

      resolve({
        result: 1,
      })
    } catch (error: any) {
      const status = error?.result

      reject({
        result: status == undefined ? 2 : 3,
      })
    }
  })
}

export const getUserInfoService = async () => {
  const API = API_URL?.userInfo
  return serverInstance.get(API)
}

export const getUserInfoByIdService = async (userId: number) => {
  const API = `${API_URL?.userInfo}`

  const params = {
    user_id: userId,
  }

  return serverInstance.get(API, { params })
}

export const getUserListService = async (
  offset: number,
  limit: number,
  q?: string,
  customerId?: number,
) => {
  const API = `${API_URL?.customerList}`
  const params = {
    offset: offset * limit,
    limit: limit,
    customer_id: customerId,
    keyword: q || "",
  }
  return serverInstance.get(API, { params })
}

export const getUserChildOwnerListService = async (
  offset: number,
  limit: number,
  q?: string,
  customer_id?: number,
  isTeam?: 1 | 0,
  roleId?: number,
) => {
  const API = `${API_URL?.userOwner}`
  const params = {
    offset: offset * limit,
    limit: limit,
    keyword: q || "",
    customer_id: customer_id,
    is_team: isTeam,
    role_id: roleId || "",
  }
  return serverInstance.get(API, { params })
}

export const getCustomerInfoService = async (customerId: number) => {
  const API = `${API_URL?.customerInfo}/${customerId}`
  return serverInstance.get(API)
}

export const updateCustomerInfoService = async (
  customerId: number,
  body: any,
) => {
  const API = `${API_URL?.customerUpdate}/${customerId}`
  return serverInstance.put(API, body)
}

export const addCustomerService = async (body: any) => {
  const API = `${API_URL?.customerRegister}`
  return serverInstance.post(API, body)
}

export const addUserService = async (body: any) => {
  const API = `${API_URL?.userRegister}`
  return serverInstance.post(API, body)
}

export const moveUserService = async (body: any) => {
  const API = `${API_URL?.userMove}`
  return serverInstance.post(API, body)
}

export const getUserDetailInfoService = async (userId: number) => {
  const API = `${API_URL?.userDetailInfo}/${userId}`
  return serverInstance.get(API)
}

export const getUserChildService = async () => {
  const API = API_URL?.userChild
  return serverInstance.get(API)
}
export const getUserChildServiceById = async (
  offset: number,
  limit: number,
  q?: string,
  userId?: number,
) => {
  const API = `${API_URL?.userChild}`

  const params = {
    offset: offset * limit,
    limit: limit,
    user_id: userId,
    keyword: q || "",
    type: 1,
  }
  return serverInstance.get(API, {
    params,
  })
}

export const logoutService = async () => {
  const API = API_URL?.logout
  return serverInstance.delete(API)
}

export const resetPassService = async (userId: number) => {
  const API = `${API_URL?.userResetPass}/${userId}`
  return serverInstance.patch(API)
}

export const disableService = async (userId: number, isActived: number) => {
  const API = `${API_URL?.userUpdateActive}/${userId}`
  return serverInstance.patch(API, {
    is_actived: isActived,
  })
}

export const deleteUserService = async (userId: number) => {
  const API = `${API_URL?.userDelete}/${userId}`
  return serverInstance.delete(API)
}

export const updateUserService = async (userId: number, body: any) => {
  const API = `${API_URL?.userUpdate}/${userId}`
  return serverInstance.put(API, body)
}

export const getTeamListById = async (
  offset: number,
  limit: number,
  q?: string,
  userId?: number,
) => {
  const API = `${API_URL?.teamList}`

  const params = {
    offset: offset * limit,
    limit: limit,
    user_id: userId,
    keyword: q || "",
  }
  return serverInstance.get(API, {
    params,
  })
}

export const addTeamService = async (body: any) => {
  const API = `${API_URL?.teamRegister}`
  return serverInstance.post(API, body)
}

export const getUserDeviceAddService = async (userId: number) => {
  const API = `${API_URL?.deviceAddList}`

  const params = {
    user_id: userId,
  }

  return serverInstance.get(API, { params })
}

export const registerDeviceUser = async (userId: number, body: any) => {
  const API = `${API_URL?.registerDeviceUser}/${userId}`
  return serverInstance.post(API, body)
}
