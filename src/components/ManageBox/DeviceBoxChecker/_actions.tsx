import { IDeviceInfo } from "../../../_types/deviceType"

export const devicePageAction = {
  setIsLoadingDevice(payload: boolean) {
    return {
      type: devicePageActionType?.SET_DEVICE_LOADING,
      payload,
    }
  },
  setDeviceData(payload: { list: IDeviceInfo[]; totalPage: number }) {
    return {
      type: devicePageActionType?.SET_DEVICE_DATA,
      payload,
    }
  },
  reloadDeviceData() {
    return {
      type: devicePageActionType?.RELOAD_DEVICE_DATA,
    }
  },
  setUserId(userId: number) {
    return {
      type: devicePageActionType?.SET_USER_ID,
      payload: userId,
    }
  },
  setDeviceOffset(offset: number) {
    return {
      type: devicePageActionType?.SET_DEVICE_OFFSET,
      payload: offset,
    }
  },
  setDeviceLimit(limit: number) {
    return {
      type: devicePageActionType?.SET_DEVICE_LIMIT,
      payload: limit,
    }
  },

  setDeviceQSearch(q: string) {
    return {
      type: devicePageActionType?.SET_DEVICE_Q_SEARCH,
      payload: q,
    }
  },
}

export const devicePageActionType = {
  SET_DEVICE_LOADING: "SET_DEVICE_LOADING",
  SET_DEVICE_DATA: "SET_DEVICE_DATA",
  RELOAD_DEVICE_DATA: "RELOAD_DEVICE_DATA",
  SET_DEVICE_LIMIT: "SET_DEVICE_LIMIT",
  SET_DEVICE_OFFSET: "SET_DEVICE_OFFSET",
  SET_DEVICE_Q_SEARCH: "SET_DEVICE_Q_SEARCH",

  SET_USER_ID: "SET_USER_ID",
}
