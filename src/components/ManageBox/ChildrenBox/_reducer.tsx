import { IChildOwner, IUserBox, IUserChild } from "../../../_types/userType"
import { store } from "../../../app/store"
import { userPageActionType } from "./_actions"

export interface IAction {
  type: string
  payload?: any
}

interface ISearchParam {
  offset: number
  limit: number
  q?: string
  type?: string
}

interface IUser {
  isLoading: boolean
  list: IChildOwner[]
  totalPage: number
  param: ISearchParam
  reloadKey: number
}

export interface IInitialPageState {
  user: IUser
  userId: number
}

export const initialDevicePageState = (
  userIdDefault?: number,
): IInitialPageState => {
  const userId =
    userIdDefault || store?.getState()?.user?.access?.userInfo?.id || 9999
  return {
    user: {
      isLoading: true,
      list: [],
      param: {
        offset: 0,
        limit: 50,
        q: "",
      },
      totalPage: 0,
      reloadKey: Math.random(),
    },
    userId: userId,
  }
}

export const devicePageReducer = (
  state: IInitialPageState,
  action: IAction,
): IInitialPageState => {
  switch (action?.type) {
    case userPageActionType?.SET_USER_LOADING: {
      return {
        ...state,
        user: {
          ...state?.user,
          isLoading: action?.payload,
        },
      }
    }
    case userPageActionType?.SET_USER_DATA: {
      return {
        ...state,
        user: {
          ...state?.user,
          list: action?.payload?.list,
          totalPage: action?.payload?.totalPage,
        },
      }
    }
    case userPageActionType?.RELOAD_USER_DATA: {
      return {
        ...state,
        user: {
          ...state?.user,
          reloadKey: Math?.random(),
        },
      }
    }
    case userPageActionType?.SET_USER_ID: {
      return {
        ...state,
        userId: action?.payload,
        user: {
          ...initialDevicePageState?.()?.user,
          reloadKey: state?.user?.reloadKey,
        },
      }
    }
    case userPageActionType?.SET_USER_OFFSET: {
      return {
        ...state,
        user: {
          ...state?.user,
          param: {
            ...state?.user?.param,
            offset: action?.payload,
          },
        },
      }
    }
    case userPageActionType?.SET_USER_LIMIT: {
      return {
        ...state,
        user: {
          ...state?.user,
          param: {
            ...state?.user?.param,
            limit: action?.payload,
          },
        },
      }
    }
    case userPageActionType?.SET_USER_Q_SEARCH: {
      return {
        ...state,
        user: {
          ...state?.user,
          param: {
            ...initialDevicePageState?.()?.user?.param,
            q: action?.payload,
          },
        },
      }
    }
    default: {
      return state
    }
  }
}
