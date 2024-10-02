import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../app/store"
import { IUserInfo } from "../../_types/userType"
import { IServerMenu } from "../../_types/interfaceType"
import storage from "../../utils/storage"
import { _app } from "../../utils/_app"
import { _const } from "../../_constant"

const initialSetting = _app?.getSetting()

export interface IRouteModalProps {
  isOpen: boolean
  imei?: string
  startTime?: number
  endTime?: number
}

interface IPageInterface {
  logo: string
  favicon: string
  banner: string[]
  title: string
  props: {
    [key: string]: string
  }

  sv_static_file: string
}

export interface IState {
  menu: IServerMenu[]
  menuObj: { [key: string]: IServerMenu }



  page: IPageInterface

  routeModal: IRouteModalProps

  online: {
    countdown: number
  }
}

const initialState: IState = {
  menu: [],
  menuObj: {},



  page: {
    logo: "",
    favicon: "",
    banner: [],
    props: {},
    sv_static_file: "",
    title: "GIÁM SÁT HÀNH TRÌNH",
  },

  routeModal: {
    isOpen: false,
  },

  online: {
    countdown: -1,
  },
}

export const counterSlice = createSlice({
  name: "interface",
  initialState,
  reducers: {
    setMenu: (state, actions: { payload: IServerMenu[] }) => {
      state.menu = actions.payload

      const menu = [...actions.payload]

      const menuPathObj: { [key: string]: IServerMenu } = {}

      const setPathObj = (menu: IServerMenu) => {
        if (menu?.link && menu?.type != "title") {
          menuPathObj[menu?.link] = menu
        }

        if (menu?.child) {
          menu?.child?.forEach?.((m) => setPathObj(m))
        }
      }
      menu?.forEach?.((m) => setPathObj(m))

      state.menuObj = menuPathObj
    },

    // settingApp: (
    //   state,
    //   actions: {
    //     payload: {
    //       key: string
    //       value: any
    //     }
    //   },
    // ) => {
    //   const key = actions?.payload?.key
    //   const value = actions?.payload?.value

    //   if (!key) return
    //   state.setting = { ...state?.setting, [key]: value }

    //   storage.setItem(_const?.storeKey?.setting, state?.setting)
    // },

    setRouteModalState: (
      state,
      actions: {
        payload: IRouteModalProps
      },
    ) => {
      state.routeModal = { ...state?.routeModal, ...actions?.payload }
    },

    setPageInterface: (
      state,
      actions: {
        payload: IPageInterface
      },
    ) => {
      state.page = actions?.payload
    },

    setDeviceOnlineCountDown: (state, actions: { payload: number }) => {
      state.online.countdown = actions?.payload
    },
    reduceDeviceOnlineCountDown: (state) => {
      if (state.online.countdown < 0) {
        return
      }
      state.online.countdown = state.online.countdown - 1
    },
  },
})

export const {
  setMenu,
  // settingApp,
  setRouteModalState,
  setPageInterface,
  setDeviceOnlineCountDown,
  reduceDeviceOnlineCountDown,
} = counterSlice.actions

export default counterSlice.reducer
