import { _const } from "../_constant"
import { getTokenParam } from "./_param"

const storage = {
  getItem: function (key: string) {
    const items: string | null = localStorage.getItem(`${key}`)
    if (!items) return false
    return JSON.parse(items)
  },
  setItem: function (key: string, items: object | string) {
    localStorage.setItem(`${key}`, JSON.stringify(items))
  },
  remove: function (key: string) {
    localStorage.removeItem(`${key}`)
  },

  setAccessToken: function (t: string) {
    const { token, accessToken } = _const.storeKey
    const oldToken = storage?.getItem(token)

    const newToken = { ...(oldToken || {}), [accessToken]: t }

    storage.setItem(token, newToken)
  },
  setToken: function (a: string, f: string) {
    const { token, refreshToken, accessToken } = _const.storeKey

    storage.setItem(token, {
      [accessToken]: a,
      [refreshToken]: f,
    })
  },

  clearToken: function () {
    const { token } = _const.storeKey

    storage.remove(token)
  },

  getAccessToken: function () {
    const { token, accessToken } = _const.storeKey
    // alert(getTokenParam() ?? storage.getItem(token)?.[accessToken])
    return getTokenParam() ?? storage.getItem(token)?.[accessToken]
  },
  getAccessTokenBearer: function () {
    const { token, accessToken } = _const.storeKey
    return `Bearer ${storage.getItem(token)?.[accessToken]}`
  },
  getRefreshToken: function () {
    const { token, refreshToken } = _const.storeKey
    return storage.getItem(token)?.[refreshToken]
  },
  getDeviceToken: function () {
    return storage.getItem(_const.storeKey.deviceToken)
  },
}

export default storage
