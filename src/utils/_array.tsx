import { FaUserCircle } from "react-icons/fa"
import { _const } from "../_constant"
import { IUserChild, IUserChildAntdFormat } from "../_types/userType"
import { store } from "../app/store"
import { SearchOutlined, UserOutlined } from "@ant-design/icons"
import { GoPersonFill } from "react-icons/go"
import { BsPersonRolodex } from "react-icons/bs"
import { MdOutlineGroup } from "react-icons/md"
import { TiFlowChildren } from "react-icons/ti"
import { PiCrownSimpleDuotone, PiUsersFourFill } from "react-icons/pi"
import { Key } from "react"
import { AiTwotoneCrown } from "react-icons/ai"
import {
  IInterface,
  IInterfaceDetail,
  IPathList,
} from "../_types/interfaceType"
import { number } from "react-i18next/icu.macro"
import {
  ICamListActived,
  IMRealTime,
  IVehicleRealTime,
} from "../_types/deviceType"
import getTime from "./getTime"

const iconSize = 15

const gpsModal = _const?.type?.model?.gps
const mobicamModal = _const?.type?.model?.mobicam

export const _array = {
  chunkArray: function (array: any[], chunkSize: number) {
    var chunkArray = []
    for (var i = 0; i < array.length; i += chunkSize) {
      chunkArray.push(array.slice(i, i + chunkSize))
    }
    return chunkArray || []
  },
  createNull: (length: number) => {
    const arr = Array(Math.floor(length)).fill(0)
    return arr
  },
  toggleItemStringArray: (arr: string[], value: string) => {
    if (!arr.includes(value)) {
      arr.push(value)
    } else {
      arr.splice?.(arr.indexOf(value), 1)
    }
    return arr
  },

  getUserTreeArrBack: (userList: IUserChild[], activeId: number) => {
    const obj: { [id: string]: IUserChild } = {}
    const objId: { [id: string]: IUserChild } = {}
    userList?.forEach?.((user) => {
      obj[user?.customer_id] = user
      objId[user?.id] = user
    })
    const active = objId?.[activeId]?.customer_id

    let p: number = active
    const data: number[] = [active]
    const dataId: number[] = [activeId]

    const findParent = () => {
      const child = obj?.[p]
      if (!child) return

      const parent = objId?.[child?.parent_id]

      if (parent?.customer_id && parent?.customer_id != p) {
        data?.push(parent?.customer_id)
        dataId?.push(parent?.id)

        p = parent?.customer_id
        findParent()
      } else {
        return
      }
    }
    findParent()

    return {
      custormers: data,
      userId: dataId,
    }
  },

  getUserTreeArrBackByCustormerId: (
    userList: IUserChild[],
    activeId: number,
  ) => {
    const obj: { [id: string]: IUserChild } = {}
    const objId: { [id: string]: IUserChild } = {}
    userList?.forEach?.((user) => {
      obj[user?.customer_id] = user
      objId[user?.id] = user
    })
    const active = activeId

    let p: number = active
    const data: number[] = [active]
    const dataId: number[] = [obj[activeId]?.id]

    const findParent = () => {
      const child = obj?.[p]
      // console.log(child, p, obj)
      if (!child) return

      const parent = objId?.[child?.parent_id]

      if (parent?.customer_id && parent?.customer_id != p) {
        data?.push(parent?.customer_id)
        dataId?.push(parent?.id)

        p = parent?.customer_id
        findParent()
      } else {
        return
      }
    }
    findParent()

    return {
      custormers: data,
      userId: dataId,
    }
  },

  deviceList2VehicleList(deviceList?: string[]) {
    if (!deviceList?.length) return []
    const deviceObject = store?.getState?.()?.device?.data?.online?.object
    return (
      deviceList?.map?.((device) => {
        return deviceObject?.[device]?.vehicle_name
      }) || []
    )
  },

  getCmcServerById(id: number) {
    const serverObj = store?.getState?.()?.user?.cmcServer?.object

    return serverObj?.[id]
  },

  userChildTree: (
    list_: IUserChild[],
    disableChildC?: boolean,
  ): {
    child: IUserChild
    childAntd: IUserChildAntdFormat
    objectUser: { [key: number]: IUserChild }
  } => {
    let list: IUserChild[] = JSON.parse(JSON.stringify(list_))

    if (disableChildC) {
      list = list?.filter?.((user) => !user?.is_team)
    }

    let listObj: { [id: number]: IUserChild } = Object.create({})
    let listObjAntd: { [id: number]: IUserChildAntdFormat } = Object.create({})

    let listReturn: IUserChild[] = []
    let listAntdReturn: IUserChildAntdFormat[] = []

    list?.forEach?.((user, index) => {
      if (user?.id != undefined) {
        listObj[user.id] = user
        listObj[user.id].children = []

        listObjAntd[user.id] = {
          ...user,
          key: user?.id,
          value: `${user?.id}`,
          title: `${user?.customer_name}`,
          icon: (
            <div className="h-full flex justify-center items-center text-theme">
              {(() => {
                if (user?.is_team) {
                  return (
                    <PiUsersFourFill size={iconSize} color="var(--primColor)" />
                  )
                }
                return <GoPersonFill size={iconSize} color="" />
              })()}
            </div>
          ),
        }
        listObjAntd[user.id].children = []
      }
    })

    const objectUser = JSON.parse(JSON.stringify(listObj))

    const userM = store?.getState?.()?.user?.access?.userInfo

    list?.forEach?.((user, index) => {
      const parent_id = user?.parent_id
      const id = user?.id
      if (
        listObj?.[parent_id]?.customer_id == listObj?.[id]?.customer_id ||
        listObj?.[id]?.customer_id == userM?.customer_id
      ) {
        if (disableChildC) return

        if (!listObj?.[id]?.is_team) {
          if (listObjAntd?.[id]?.icon) {
            listObjAntd[id].icon = (
              <div className="h-full flex justify-center items-center text-theme">
                <PiCrownSimpleDuotone size={iconSize} color="" />
              </div>
            )
          }
          if (listObjAntd?.[id]?.customer_name) {
            listObjAntd[id].title = listObjAntd[id].username
          }
        }
      }

      if (listObj?.[parent_id]) {
        listObj?.[parent_id]?.children?.push(listObj?.[id])
        listObjAntd?.[parent_id]?.children?.push(listObjAntd?.[id])
      } else {
        listReturn?.push?.(listObj?.[id])
        listAntdReturn?.push?.(listObjAntd?.[id])
      }
    })
    const user = store?.getState?.()?.user?.access?.userInfo

    const userPa = {
      id: user?.id || 0,
      value: `${user?.id}`,
      parent_id: user?.parent_id || 0,
      username: user?.username || _const?.string?.s?.unknow,
      customer_id: user?.customer_id || 0,
      customer_name: user?.customer_name || _const?.string?.s?.unknow,
      is_main: 1,
    }

    return {
      child: {
        ...userPa,
        children: listReturn,
      },
      childAntd: {
        ...userPa,
        key: user?.id || 999999,
        title: user?.customer_name,
        icon: (
          <div className="h-full flex justify-center items-center text-theme">
            <BsPersonRolodex size={iconSize} />
          </div>
        ),
        children: listAntdReturn,
      },
      objectUser: { ...objectUser, [userPa.id]: userPa },
    }
  },

  removeTeamUser: (userList: IUserChild[]) => {
    const userInfo = store?.getState?.()?.user?.access?.userInfo

    return userList.filter?.(
      (user: IUserChild) =>
        userInfo?.id == user?.parent_id &&
        userInfo?.customer_id != user?.customer_id &&
        !user?.is_team,
    )
  },
  removeCustomerUser: (userList: IUserChild[]) => {
    const userInfo = store?.getState?.()?.user?.access?.userInfo

    return userList.filter?.((user: IUserChild) => !user?.is_team)
  },

  getCustomerListFromIdList: (selectedKeys: Key[]) => {
    const childObj = store?.getState?.()?.user?.child?.object
    const user = store?.getState?.()?.user?.access?.userInfo
    const userListCustomerId = selectedKeys?.map?.((userId) => {
      if (Number(userId) == user?.id) return `${user?.customer_id}`
      return `${childObj?.[Number(userId)]?.customer_id}`
    })

    return userListCustomerId
  },
  getStaticURL: () => {
    return store?.getState()?.interface?.page?.sv_static_file
  },

  getbannerList: () => {
    const pageInterfacee = store?.getState()?.interface?.page

    const staticURL = _array.getStaticURL()

    const props = pageInterfacee?.props || {}

    const keys = Object.keys(props)

    const bannerKeys = keys?.filter?.((key) => key?.includes("___banner_ss"))

    return bannerKeys?.map?.((key) => `${staticURL}/${props?.[key]}`)
  },

  getbannerListByUI: (
    ui: IInterface | IInterfaceDetail,
    staticURL: string,
  ): IPathList[] => {
    const props = JSON.parse(ui?.content || "{}")

    const keys = Object.keys(props)

    const bannerKeys = keys?.filter?.((key) => key?.includes("___banner_ss"))

    return bannerKeys?.map?.((key) => ({
      path: props?.[key],
      url: `${staticURL}/${props?.[key]}`,
      property: key,
    }))
  },

  getUserTreeByVal: (val: any, userList: any) => {
    const userObj = store?.getState?.()?.user?.child?.object
    const user = userObj?.[Number(val)]
    const userM = store?.getState?.()?.user?.access?.userInfo

    if (!user) return
    const ar = _array?.getUserTreeArrBack?.(userList || [], user?.id)
    const dataId = [userM?.id, ...(ar?.userId?.reverse?.() || [])]

    return dataId
  },

  getCustormerIdByUserId: (userId: number) => {
    const userObj = store?.getState()?.user?.child?.object
    const user = userObj?.[userId]
    return user?.customer_id
  },

  getVehicleNameFromImei(imei: string): string {
    const imeiObj = store?.getState?.()?.device?.data?.online?.object

    return imeiObj?.[imei]?.vehicle_name || _const?.string?.s?.unknow_
  },

  getDriverNameFromLic(lic: string): string {
    const driverOject = store?.getState?.()?.user?.driver?.objectLic

    return driverOject?.[lic]?.name || _const?.string?.s?.unknow_
  },
  select: {
    gpsData(vehicle: IMRealTime) {
      return (
        vehicle?.realtime?.[_const?.type?.model?.gps] ||
        vehicle?.realtime?.[_const?.type?.model?.mobicam]
      )
    },
    camData(vehicleId: number) {
      const vehicleRealtime =
        store?.getState()?.device?.data?.online?.mObject?.[vehicleId]
      return vehicleRealtime?.realtime?.[_const?.type?.model?.mobicam]
    },

    switchListToGps(vehicleList: IMRealTime[]) {
      return vehicleList?.map?.((vehicle) => _array?.select?.gpsData?.(vehicle))
    },
  },
  getImeiFromVehicleId(vehicleId: number) {
    const vehicle =
      store?.getState?.()?.device?.data?.online?.mObject?.[vehicleId]

    const realtime = vehicle?.realtime
    const imeiList = [
      realtime?.[gpsModal]?.imei,
      realtime?.[mobicamModal]?.imei,
    ]?.filter?.((imei) => imei)

    return {
      array: imeiList,
      string: imeiList?.join?.(", "),
    }
  },

  getCamData(vehicle: IVehicleRealTime): ICamListActived[] {
    const serverId = vehicle?.sv_cam_id
    const numChn = vehicle?.quantity_channel

    if (!serverId || !numChn) {
      return []
    }

    const server = _array.getCmcServerById(serverId)

    if (!server) return []
    else
      return _array.createNull(Number(numChn))?.map?.((_, index) => {
        return {
          device: vehicle?.imei,
          hostname: server?.host?.replace("https://", ""),
          licencePlate: vehicle?.vehicle_name,
          channel: index,
          port: _const?.port?.mobicam,
          token: server?.token,
          streamMode: 1,
          chn: index,
          startTime: getTime.currUnix(),
        }
      })
  },

  removeAllLastUndefined(arr: any[]) {
    const remove = (arr_: any[]) => {
      const arrLength = arr_?.length
      if (!arrLength) return []

      if (arr_?.[arrLength - 1] == undefined) {
        arr_?.pop()
        remove(arr_)
      }
    }

    remove(arr)

    return arr
  },

  getRealtimeDeviceList(deviceList: string[]) {
    const deviceObject = store?.getState?.()?.device?.data?.online?.object
    return deviceList?.map?.((d) => deviceObject?.[d]) || []
  },
}
