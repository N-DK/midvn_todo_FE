import { fetchFCM } from "../App"
import { _const } from "../_constant"
import { api, history } from "../_helper"
import { ICmcServer } from "../_types/devServerType"
import { IMRealTime, IVehicleRealTime } from "../_types/deviceType"
import { IDriver } from "../_types/driverType"
import { IServerMenu } from "../_types/interfaceType"
import { IUserInfo } from "../_types/userType"
import { removeFirebaseToken } from "../apis/firebaseAPI"
import { store } from "../app/store"
import { routeConfig } from "../configs/routeConfig"
import { Coppy } from "../components/Coppy"
import {
  IRouteModalProps,
  setMenu,
  setRouteModalState,
  // settingApp,
} from "../features/interface/interfaceSlice"
import {
  IUserAccess,
  setCmcServer,
  setDriver,
  setUserAccess,
  setUserChild,
} from "../features/user/userSlice"
// import { getCmcServerService } from "../services/dev_cmcServerServices"
import { getMenuService } from "../services/interfaceServices"
// import {
//   checkDriverService,
//   deleteDriverService,
//   disableDriverService,
//   getDriverListService,
//   getDriverTreeService,
// } from "../services/manage_driverServices"
// import {
//   getRealtimeAlarmService,
//   getRealtimeGpsService,
//   getRealtimeInfoService,
// } from "../services/realtimeService"
import {
  deleteUserService,
  disableService,
  getUserChildService,
  getUserInfoService,
  logoutService,
  resetPassService,
} from "../services/userServices"
import { _array } from "./_array"
// import { requestFCMToken } from "./firebase"
import { getString } from "./getString"
import storage from "./storage"

type REALTIME_PROMISE_DATA = "gps" | "info" | "alarm"

export const _app = {
  logout: async () => {
    removeFirebaseToken()
      .then((res) => {
        storage?.remove?.("fcmToken")
        logoutService().then(() => {
          storage.clearToken?.()
          window.location.href = routeConfig?.login
        })
      })
      .catch((e) => {
        console.log("====================================")
        console.log("error", e)
        console.log("====================================")
      })
  },

  cameraFrame: {
    localStorage: {
      setCamNum(num: number) {
        storage.setItem("onlineCamnum", `${num}`)
      },
      getCamNum() {
        const camNum = storage.getItem("onlineCamnum")

        return Number(camNum || 4) || 4
      },
    },
  },

  monitorVehicle: {
    bar: {
      setWidth(width: number) {
        _app?.settingM?.set?.(
          "_monitor_bar_width",
          width || _const?.interface?.map_vehicleFrameWidth,
        )
      },
      getWidth() {
        return (
          _app?.settingM?.get?.("_monitor_bar_width") ||
          _const?.interface?.map_vehicleFrameWidth
        )
      },
    },
  },

  settingM: {
    set(key: string, value: any) {
      const data = storage?.getItem?.(_const?.storeKey?.settingM)
      storage?.setItem(_const?.storeKey?.settingM, { ...data, [key]: value })
    },
    get(key: string) {
      return storage?.getItem?.(_const?.storeKey?.settingM)?.[key]
    },
  },
  setting: (key: string, value: any) => {
    // store.dispatch?.(
    //   settingApp?.({
    //     key: key,
    //     value: value,
    //   }),
    // )
  },
  getSetting: () => {
    return storage.getItem?.(_const?.storeKey?.setting)
  },

  setUserAuthed: (isAuth: boolean) => {
    const dispatch = store.dispatch
    dispatch(
      setUserAccess({
        isAuth,
      }),
    )
  },

  getInitialData: {
    userInfo: async () => {
      return new Promise(async (resolve, reject) => {
        try {
          const fb = await getUserInfoService()
          const data: IUserInfo = fb?.data?.[0]
          const currentUrl = window.location.href

          // Tạo đối tượng URL để dễ xử lý
          const url = new URL(currentUrl)

          // Lấy token từ URL
          const token: string = url.searchParams.get("token")!
          const dispatch = store.dispatch
          dispatch(
            setUserAccess({
              userInfo: { ...data, token },
            }),
          )
          resolve(data)
        } catch (error) {
          reject(error)
        }
      })
    },

    userChild: async () => {
      return new Promise(async (resolve, reject) => {
        try {
          const fb = await getUserChildService()

          const userTree = _array.userChildTree(fb?.data)
          const userRows = fb?.data

          const dispatch = store.dispatch
          dispatch(
            setUserChild({
              child: userTree?.child,
              row: userRows,
              object: userTree?.objectUser,
            }),
          )

          resolve(true)
        } catch (error) {
          // resolve(error)
          reject(error)
        }
      })
    },

    menu: async () => {
      return new Promise(async (resolve, reject) => {
        try {
          const fb = await getMenuService()
          const data: IServerMenu[] = fb?.data
          const dispatch = store.dispatch

          dispatch(setMenu(data))

          resolve(data)
        } catch (error) {
          reject(error)
        }
      })
    },

    // driverTree: async () => {
    //   return new Promise(async (resolve, reject) => {
    //     try {
    //       const fb = await getDriverTreeService()

    //       const data: IDriver[] = fb?.data || []
    //       const dispatch = store.dispatch

    //       dispatch(setDriver(data))

    //       resolve(data)
    //     } catch (error) {
    //       // resolve(error)
    //       reject(error)
    //     }
    //   })
    // },

    // getCmcServer: async () => {
    //   return new Promise(async (resolve, reject) => {
    //     try {
    //       const fb = await getCmcServerService(1)

    //       const data: ICmcServer[] = fb?.data || []
    //       const dispatch = store.dispatch

    //       dispatch(setCmcServer(data))

    //       resolve(data)
    //     } catch (error) {
    //       // resolve(error)
    //       reject(error)
    //     }
    //   })
    // },

    all: async () => {
      const userInfoPromise = _app.getInitialData?.userInfo()
      const user: any = await userInfoPromise
      const userId = user?.id

      try {
        fetchFCM()
      } catch (error) {
        console.log("====================================")
        console.log("error", error)
        console.log("====================================")
      }

      const menuPromise = _app.getInitialData?.menu()
      const userChildPromise = _app?.getInitialData?.userChild()
      // const driverTreePromise = _app?.getInitialData?.driverTree()
      // const cmcServerPromise = _app?.getInitialData?.getCmcServer?.()
      return Promise.all([
        userInfoPromise,
        menuPromise,
        // userChildPromise,
        // driverTreePromise,
      ])
    },
  },

  routeModal: {
    showModalRoute: (data: {
      startTime: number
      endTime: number
      imei: string
    }) => {
      const dispatch = store?.dispatch
      dispatch?.(
        setRouteModalState?.({
          isOpen: true,
          imei: data?.imei,
          startTime: data?.startTime,
          endTime: data?.endTime,
        }),
      )
    },

    hideModalRoute: () => {
      const dispatch = store?.dispatch
      dispatch?.(
        setRouteModalState?.({
          isOpen: false,
        }),
      )
    },
  },
  // device: {
  //   addToFollowing(device: number) {
  //     const followingList = _app.device.getFollowingDeviceList() || []
  //     if (!followingList?.includes?.(device)) {
  //       followingList?.push?.(device)
  //       api.message?.success(`Đã thêm vào danh sách theo dõi`)
  //     }

  //     _app.device?.saveFollowingDeviceList(followingList)
  //   },
  //   removeToFollowing(device: number) {
  //     const followingList = _app.device.getFollowingDeviceList() || []
  //     if (followingList?.includes?.(device)) {
  //       const index = followingList.indexOf(device)
  //       followingList.splice(index, 1)
  //       api.message?.info("Đã xoá khỏi danh sách theo dõi")
  //     }

  //     _app.device?.saveFollowingDeviceList(followingList)
  //   },
  //   isFollowing(device: number) {
  //     const followingList = _app.device.getFollowingDeviceList() || []
  //     return followingList?.includes?.(device)
  //   },
  //   getFollowingDeviceList() {
  //     const obj = store?.getState()?.device?.data?.online?.mObject
  //     return (
  //       storage
  //         .getItem(_const.storeKey?.followingDeviceList)
  //         ?.filter?.((v: string) => obj?.[v]) || []
  //     )
  //   },
  //   saveFollowingDeviceList(list: string[]) {
  //     storage.setItem(_const.storeKey?.followingDeviceList, list)
  //   },
  // },
  user: {
    resetPass: (userId: number, userName: string, onSuccess?: () => void) => {
      api.modal?.confirm?.({
        title: (
          <div>
            Bạn có muốn reset mật khẩu tài khoản{" "}
            <span className="font-semibold">{userName}</span> về mặc định?
          </div>
        ),
        content: "",
        onOk: () => {
          const loadingApiClose = api.message?.loading(
            `Đang đặt lại mật khẩu cho tài khoản ${userName}`,
            20,
          )
          resetPassService(userId)
            .then((fb: any) => {
              onSuccess?.()

              api.modal?.info({
                title: "Đã đặt lại mật khẩu mới",
                content: (
                  <div>
                    <div>Tài khoản: {userName}</div>
                    <div className="flex items-center gap-2">
                      Mật khẩu mới:{" "}
                      <Coppy>
                        {fb?.data?.[0]?.new_password ||
                          _const?.string?.message?.unknow}
                      </Coppy>
                    </div>
                  </div>
                ),
              })
            })
            .catch((error) => {
              api.message?.error(getString?.errorAxiosParams(error))
            })
            .finally(() => {
              loadingApiClose?.()
            })
        },
      })
    },

    disabled: (userId: number, userName: string, onSuccess?: () => void) => {
      api.modal?.confirm?.({
        title: (
          <div>
            Bạn có muốn vô hiệu hoá tài khoản{" "}
            <span className="font-semibold">{userName}</span>?
          </div>
        ),
        content:
          "Người dùng sẽ không thể đăng nhập vào tài khoản khi bị vô hiệu hoá",
        onOk: () => {
          const loadingApiClose = api.message?.loading(
            `Đang vô hiệu hoá tài khoản ${userName}`,
            20,
          )
          disableService(userId, 0)
            .then((fb: any) => {
              onSuccess?.()

              api.message?.info(`Đã vô hiệu hoá tài khoản ${userName}`)
            })
            .catch((error) => {
              api.message?.error(getString?.errorAxiosParams(error))
            })
            .finally(() => {
              loadingApiClose?.()
            })
        },
      })
    },

    actived: (userId: number, userName: string, onSuccess?: () => void) => {
      api.modal?.confirm?.({
        title: (
          <div>
            Bạn có muốn bỏ vô hiệu hoá tài khoản{" "}
            <span className="font-semibold">{userName}</span>?
          </div>
        ),
        content: "Người dùng sẽ đăng nhập vào tài khoản",
        onOk: () => {
          const loadingApiClose = api.message?.loading(
            `Đang bỏ vô hiệu hoá tài khoản ${userName}`,
            20,
          )
          disableService(userId, 1)
            .then((fb: any) => {
              onSuccess?.()

              api.message?.info(`Đã bỏ vô hiệu hoá tài khoản ${userName}`)
            })
            .catch((error) => {
              api.message?.error(getString?.errorAxiosParams(error))
            })
            .finally(() => {
              loadingApiClose?.()
            })
        },
      })
    },

    delete: (userId: number, userName: string, onSuccess?: () => void) => {
      api.modal?.confirm?.({
        title: (
          <div>
            Bạn có muốn xoá tài khoản{" "}
            <span className="font-semibold">{userName}</span>?
          </div>
        ),
        content: "Người dùng sẽ không thể đăng nhập vào tài khoản khi bị xoá",
        onOk: () => {
          const loadingApiClose = api.message?.loading(
            `Đang xoá tài khoản ${userName}`,
            20,
          )
          deleteUserService(userId)
            .then((fb: any) => {
              onSuccess?.()
              api.message?.info(`Đã xoá tài khoản ${userName}`)
            })
            .catch((error: any) => {
              api.message?.error(getString?.errorAxiosParams(error))
            })
            .finally(() => {
              loadingApiClose?.()
            })
        },
      })
    },
  },

  // driver: {
  //   disabled: (driverId: number, name: string, onSuccess?: () => void) => {
  //     api.modal?.confirm?.({
  //       title: (
  //         <div>
  //           Bạn có muốn vô hiệu hoá tài xế{" "}
  //           <span className="font-semibold">{name}</span>?
  //         </div>
  //       ),
  //       content: "",
  //       onOk: () => {
  //         const loadingApiClose = api.message?.loading(
  //           `Đang vô hiệu hoá tài xế ${name}`,
  //           20,
  //         )
  //         disableDriverService(driverId, 0)
  //           .then((fb: any) => {
  //             onSuccess?.()

  //             api.message?.info(`Đã vô hiệu tài xế ${name}`)
  //           })
  //           .catch((error) => {
  //             api.message?.error(getString?.errorAxiosParams(error))
  //           })
  //           .finally(() => {
  //             loadingApiClose?.()
  //           })
  //       },
  //     })
  //   },

  //   actived: (driverId: number, name: string, onSuccess?: () => void) => {
  //     api.modal?.confirm?.({
  //       title: (
  //         <div>
  //           Bạn có muốn bỏ vô hiệu hoá tài xế{" "}
  //           <span className="font-semibold">{name}</span>?
  //         </div>
  //       ),
  //       content: "",
  //       onOk: () => {
  //         const loadingApiClose = api.message?.loading(
  //           `Đang bỏ vô hiệu hoá tài xế ${name}`,
  //           20,
  //         )
  //         disableDriverService(driverId, 1)
  //           .then((fb: any) => {
  //             onSuccess?.()

  //             api.message?.info(`Đã bỏ vô hiệu hoá tài xế ${name}`)
  //           })
  //           .catch((error) => {
  //             api.message?.error(getString?.errorAxiosParams(error))
  //           })
  //           .finally(() => {
  //             loadingApiClose?.()
  //           })
  //       },
  //     })
  //   },

  //   check: (
  //     driverId: number,
  //     name: string,
  //     isChecked: number,
  //     onSuccess?: () => void,
  //   ) => {
  //     const title = isChecked ? "xác thực" : "bỏ xác thực"
  //     api.modal?.confirm?.({
  //       title: (
  //         <div>
  //           Bạn có muốn {title} tài xế{" "}
  //           <span className="font-semibold">{name}</span>?
  //         </div>
  //       ),
  //       content: "",
  //       onOk: () => {
  //         const loadingApiClose = api.message?.loading(
  //           `Đang ${title} tài xế ${name}`,
  //           20,
  //         )
  //         checkDriverService(driverId, isChecked)
  //           .then((fb: any) => {
  //             onSuccess?.()

  //             api.message?.info(`Đã ${title} tài xế ${name}`)
  //           })
  //           .catch((error) => {
  //             api.message?.error(getString?.errorAxiosParams(error))
  //           })
  //           .finally(() => {
  //             loadingApiClose?.()
  //           })
  //       },
  //     })
  //   },

  //   delete: (driverId: number, name: string, onSuccess?: () => void) => {
  //     api.modal?.confirm?.({
  //       title: (
  //         <div>
  //           Bạn có muốn xoá tài xế <span className="font-semibold">{name}</span>
  //           ?
  //         </div>
  //       ),
  //       content: "",
  //       onOk: () => {
  //         const loadingApiClose = api.message?.loading(
  //           `Đang xoá tài xế ${name}`,
  //           20,
  //         )
  //         deleteDriverService(driverId)
  //           .then((fb: any) => {
  //             onSuccess?.()
  //             api.message?.info(`Đã xoá tài xế ${driverId}`)
  //           })
  //           .catch((error: any) => {
  //             api.message?.error(getString?.errorAxiosParams(error))
  //           })
  //           .finally(() => {
  //             loadingApiClose?.()
  //           })
  //       },
  //     })
  //   },
  // },

  // realtime: {
  //   service: {
  //     info() {
  //       return new Promise((resolve, reject) => {
  //         getRealtimeInfoService?.()
  //           .then((fb: any) => {
  //             if (fb?.result) {
  //               resolve(fb?.data)
  //             } else resolve(false)
  //           })
  //           .catch(() => {
  //             resolve(false)
  //           })
  //       })
  //     },

  //     gps() {
  //       return new Promise((resolve, reject) => {
  //         getRealtimeGpsService?.()
  //           .then((fb: any) => {
  //             if (fb?.result) {
  //               resolve(fb?.data)
  //             } else resolve(false)
  //           })
  //           .catch(() => {
  //             resolve(false)
  //           })
  //       })
  //     },

  //     alarm() {
  //       return new Promise((resolve, reject) => {
  //         getRealtimeAlarmService?.()
  //           .then((fb: any) => {
  //             if (fb?.result) {
  //               resolve(fb?.data)
  //             } else resolve(false)
  //           })
  //           .catch(() => {
  //             resolve(false)
  //           })
  //       })
  //     },
  //   },

  //   async getData(access: REALTIME_PROMISE_DATA[]) {
  //     const accessPromise = access?.map?.((acss) => {
  //       return _app?.realtime?.service?.[acss]?.()
  //     })

  //     return Promise.all(accessPromise).then((data) => {
  //       const returnData: { [key: string]: any } = {}

  //       const realtimeObject = store?.getState?.()?.device?.data?.online?.object
  //       access?.forEach?.((acss, index) => {
  //         returnData[acss] = data?.[index]
  //       })

  //       const data_: IVehicleRealTime[] = []

  //       const gpsData = returnData?.gps
  //       const alarmData = returnData?.alarm
  //       const infoData = returnData?.info

  //       const isCheckInfo = access?.includes?.("info")

  //       Object.values(gpsData || {})?.forEach?.((gps: any) => {
  //         const imei = gps?.imei

  //         const gpsD = gpsData?.[imei] || {}
  //         const infoD = infoData?.[imei] || {}
  //         const alarmD = alarmData?.[imei] || {}

  //         if (isCheckInfo) {
  //           if (!infoD?.imei) return
  //         } else {
  //           if (!realtimeObject?.[imei]) return
  //         }

  //         data_?.push?.({
  //           ...realtimeObject?.[imei],
  //           ...gpsD,
  //           ...infoD,
  //           ...alarmD,
  //         })
  //       })

  //       returnData.data = data_

  //       return returnData
  //     })
  //   },
  // },
}
