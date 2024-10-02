import { memo, useEffect, useRef, useState } from "react"
import { _app } from "../../../utils/_app"
import storage from "../../../utils/storage"
import { API_URL } from "../../../services/API"
import { Socket, io } from "socket.io-client"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { _log } from "../../../utils/_log"
import { store } from "../../../app/store"
import {
  setDeviceOnlineHasInfo,
  setDeviceOnlineLoading,
  setDeviceOnlineState,
} from "../../../features/device/deviceSlice"
import { IVehicleRealTime } from "../../../_types/deviceType"
import { _const } from "../../../_constant"
import {
  reduceDeviceOnlineCountDown,
  setDeviceOnlineCountDown,
} from "../../../features/interface/interfaceSlice"
import { Buffer } from "buffer"
import lzString from "lz-string"

export const RealtimeListener = memo(() => {
  return <HTTPRealtimeListener />
})

export const HTTPRealtimeListener = memo(() => {
  // return null
  const dispatch = useAppDispatch()

  const refreshKey = useAppSelector?.(
    (state) => state?.device?.data?.online?.refreshKey,
  )
  const isLoading = useAppSelector?.(
    (state) => state?.device?.data?.online?.isLoading,
  )
  const isHasInfo = useAppSelector?.(
    (state) => state?.device?.data?.online?.isHasInfo,
  )

  const [isCalling, setIsCalling] = useState<boolean>(false)

  const getDataIntervalRef = useRef<NodeJS.Timeout>()
  const getDataIntervalRefCountDown = useRef<NodeJS.Timeout>()

  const getOnlineDevice = () => {
    setIsCalling(true)

    _app.realtime
      ?.getData(isHasInfo ? ["gps", "alarm"] : ["gps", "alarm", "info"])
      .then((fb) => {
        dispatch(setDeviceOnlineState(fb?.data))
        dispatch(setDeviceOnlineLoading(false))
        dispatch?.(setDeviceOnlineCountDown(9))

        if (fb?.info) {
          dispatch(setDeviceOnlineHasInfo(true))
        }
      })
      .catch((error) => {
        _log("ERROR WHEN CALL REALTIME DATA", error)
      })
      .finally(() => {
        setIsCalling(false)
      })
  }

  const intervalGetData = () => {
    if (getDataIntervalRef.current) {
      clearInterval(getDataIntervalRef.current)
    }

    getDataIntervalRef.current = setInterval(() => {
      getOnlineDevice()
    }, _const?.socket?.timeout?.req)
  }

  useEffect(() => {
    getDataIntervalRefCountDown.current = setInterval(() => {
      dispatch?.(reduceDeviceOnlineCountDown())
    }, 1000)

    return () => {
      clearInterval(getDataIntervalRefCountDown.current)
    }
  }, [])

  useEffect(() => {
    if (!refreshKey) return
    dispatch?.(setDeviceOnlineCountDown(-1))

    getOnlineDevice()
    intervalGetData()
  }, [refreshKey])

  useEffect(() => {
    if (isHasInfo) {
      intervalGetData()
    }
  }, [isHasInfo])

  useEffect(() => {
    getOnlineDevice()
    intervalGetData()

    return () => {
      clearInterval(getDataIntervalRef.current)
    }
  }, [])

  return null
})

// export const SocketListener = memo(() => {
//   // return null
//   const dispatch = useAppDispatch()
//   const refreshKey = useAppSelector?.(
//     (state) => state?.device?.data?.online?.refreshKey,
//   )

//   const socketVehicleRef = useRef<Socket<any>>()

//   const getDataIntervalRef = useRef<NodeJS.Timeout>()
//   const getDataIntervalRefCountDown = useRef<NodeJS.Timeout>()

//   const getOnlineDevice = () => {
//     if (!socketVehicleRef.current) return

//     socketVehicleRef.current.emit(_const?.socket?.chanel?.reqRealtime, {
//       userId: store?.getState?.()?.user?.access?.userInfo?.id,
//     })
//   }

//   useEffect(() => {
//     const socket_ = io(API_URL.SOCKET_SERVER_DOMAIN, {
//       transports: ["websocket", "polling"],
//       query: {
//         token: `${storage.getAccessTokenBearer()}`,
//       },

//       // extraHeaders: {
//       //   Authorization: `${storage.getAccessTokenBearer()}`,
//       // },
//     })
//     socketVehicleRef.current = socket_

//     _log("socket connecting...")
//     if (socket_) {
//       socket_.on("connect", () => {
//         _log("socket vehicle realtime server connected")
//       })
//       socket_.on(_const?.socket?.chanel?.resRealtime, (msg: any) => {
//         const data = lzString.decompressFromBase64(msg)
//         console.log(data)

//         // const b = new Uint8Array(msg)
//         // const d = b.slice(0).toString()
//         // const arr = d?.split?.(",")
//         // const bf = Buffer.from(arr?.map?.((a) => Number(a)))
//         // console.log(bf?.toString())
//         if (getDataIntervalRefCountDown.current) {
//           clearInterval(getDataIntervalRefCountDown.current)
//         }

//         // dispatch(setDeviceOnlineState(data))
//         // dispatch(setDeviceOnlineLoading(false))
//         // dispatch?.(setDeviceOnlineCountDown(9))

//         getDataIntervalRefCountDown.current = setInterval(() => {
//           dispatch?.(reduceDeviceOnlineCountDown())
//         }, 1000)
//       })

//       socket_.on("disconnect", () => {
//         _log("Socket server disconnected")
//       })
//     }

//     return () => {
//       if (socket_) {
//         socket_?.disconnect?.()
//       }
//     }
//   }, [])

//   useEffect(() => {
//     dispatch?.(setDeviceOnlineCountDown(-1))

//     setTimeout(() => {
//       getOnlineDevice()
//     }, 200)

//     if (getDataIntervalRef.current) {
//       clearInterval(getDataIntervalRef.current)
//     }

//     getDataIntervalRef.current = setInterval(() => {
//       getOnlineDevice()
//     }, _const?.socket?.timeout?.req)
//   }, [refreshKey])

//   return null
// })
