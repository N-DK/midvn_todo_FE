import { IUserChild } from "../../../_types/userType"

export const userPageAction = {
  setIsLoadingUser(payload: boolean) {
    return {
      type: userPageActionType?.SET_USER_LOADING,
      payload,
    }
  },
  setUserData(payload: { list: IUserChild[]; totalPage: number }) {
    return {
      type: userPageActionType?.SET_USER_DATA,
      payload,
    }
  },
  reloadDeviceData() {
    return {
      type: userPageActionType?.RELOAD_USER_DATA,
    }
  },
  setUserId(userId: number) {
    return {
      type: userPageActionType?.SET_USER_ID,
      payload: userId,
    }
  },
  setUserOffset(offset: number) {
    return {
      type: userPageActionType?.SET_USER_OFFSET,
      payload: offset,
    }
  },
  setUserLimit(limit: number) {
    return {
      type: userPageActionType?.SET_USER_LIMIT,
      payload: limit,
    }
  },

  setUserQSearch(q: string) {
    return {
      type: userPageActionType?.SET_USER_Q_SEARCH,
      payload: q,
    }
  },
}

export const userPageActionType = {
  SET_USER_LOADING: "SET_USER_LOADING",
  SET_USER_DATA: "SET_USER_DATA",
  RELOAD_USER_DATA: "RELOAD_USER_DATA",
  SET_USER_LIMIT: "SET_USER_LIMIT",
  SET_USER_OFFSET: "SET_USER_OFFSET",
  SET_USER_Q_SEARCH: "SET_USER_Q_SEARCH",

  SET_USER_ID: "SET_USER_ID",
}
