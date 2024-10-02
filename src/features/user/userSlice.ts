import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../app/store"
import {
  IUserChild,
  IUserChildAntdFormat,
  IUserInfo,
} from "../../_types/userType"
import { DriverType, IDriver } from "../../_types/driverType"
import { ICmcServer } from "../../_types/devServerType"

export interface IState {
  access: IUserAccess
  child?: IUserChildState
  driver?: {
    list?: DriverType[]
    object?: { [key: string]: DriverType }
    objectLic?: { [key: string]: DriverType }
  }
  cmcServer: ICmcServerState
}

interface ICmcServerState {
  list?: ICmcServer[]
  object?: { [key: string]: ICmcServer }
}

interface IUserChildState {
  row: IUserChild[]
  child?: IUserChild
  childAntd?: IUserChildAntdFormat
  object?: { [key: number]: IUserChild }
}

export interface IUserAccess {
  isAuth?: boolean
  userInfo?: IUserInfo
}

const initialState: IState = {
  access: {
    isAuth: false,
    userInfo: undefined,
  },

  driver: {
    list: [],
    object: {},
  },

  cmcServer: {
    list: [],
    object: {},
  },
}

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
   
    setUserAccess: (state, actions: { payload: IUserAccess }) => {
      state.access = { ...state.access, ...actions.payload }
      const userInfo = state?.access?.userInfo

      if (!state?.child?.object && userInfo?.id) {
        state.child = {
          row: [],
          object: {},
        }
        state.child.object = {
          ...state.child?.object,
          [userInfo?.id]: {
            ...userInfo,
            children: [],
            parent_id: userInfo?.parent_id || 0,
          },
        }
      }
    },
    setUserChild: (state, actions: { payload: IUserChildState }) => {
      state.child = { ...state.child, ...actions.payload }
    },

    setDriver: (state, actions: { payload: IDriver[] }) => {
      const list = actions?.payload
      const object: { [key: string]: DriverType } = {}
      const objectLic: { [key: string]: DriverType } = {}
      list?.forEach?.((driver) => {
        object[driver?.id] = driver
        objectLic[driver?.license_number] = driver
      })

      state.driver = {
        list,
        object,
        objectLic,
      }
    },

    setCmcServer: (state, actions: { payload: ICmcServer[] }) => {
      const list = actions?.payload
      const object: { [key: string]: ICmcServer } = {}

      list?.forEach?.((server) => {
        object[server?.id] = server
      })

      state.cmcServer = {
        list,
        object,
      }
    },
  },
})

export const { setUserAccess, setUserChild, setDriver, setCmcServer } =
  counterSlice.actions

export default counterSlice.reducer
