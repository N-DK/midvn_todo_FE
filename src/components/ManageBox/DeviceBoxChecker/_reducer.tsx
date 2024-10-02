import { IDeviceInfo, IDeviceInfoVehicle } from "../../../_types/deviceType"
import { store } from "../../../app/store"
import { devicePageActionType } from "./_actions"

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

interface IDevice {
  isLoading: boolean
  list: IDeviceInfoVehicle[]
  totalPage: number
  param: ISearchParam
  reloadKey: number
}

export interface IInitialPageState {
  device: IDevice
  userId: number
}

export const initialDevicePageState = (
  userIdDefault?: number,
): IInitialPageState => {
  const userId =
    userIdDefault || store?.getState()?.user?.access?.userInfo?.id || 9999
  return {
    device: {
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
    case devicePageActionType?.SET_DEVICE_LOADING: {
      return {
        ...state,
        device: {
          ...state?.device,
          isLoading: action?.payload,
        },
      }
    }
    case devicePageActionType?.SET_DEVICE_DATA: {
      return {
        ...state,
        device: {
          ...state?.device,
          list: action?.payload?.list,
          totalPage: action?.payload?.totalPage,
        },
      }
    }
    case devicePageActionType?.RELOAD_DEVICE_DATA: {
      return {
        ...state,
        device: {
          ...state?.device,
          reloadKey: Math?.random(),
        },
      }
    }
    case devicePageActionType?.SET_USER_ID: {
      return {
        ...state,
        userId: action?.payload,
        device: {
          ...initialDevicePageState?.()?.device,
          reloadKey: state?.device?.reloadKey,
        },
      }
    }
    case devicePageActionType?.SET_DEVICE_OFFSET: {
      return {
        ...state,
        device: {
          ...state?.device,
          param: {
            ...state?.device?.param,
            offset: action?.payload,
          },
        },
      }
    }
    case devicePageActionType?.SET_DEVICE_LIMIT: {
      return {
        ...state,
        device: {
          ...state?.device,
          param: {
            ...state?.device?.param,
            limit: action?.payload,
          },
        },
      }
    }
    case devicePageActionType?.SET_DEVICE_Q_SEARCH: {
      return {
        ...state,
        device: {
          ...state?.device,
          param: {
            ...initialDevicePageState?.()?.device?.param,
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
