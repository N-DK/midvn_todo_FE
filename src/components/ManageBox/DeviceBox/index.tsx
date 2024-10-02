import {
  Dispatch,
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react"
import { DeviceList } from "./components/DeviceList"
import { getDeviceService } from "../../../services/manage_deviceServices"
import { CustomerTree } from "../../tree/CustomerTree"
import { ComponentTitle } from "../../TitleC/ComponentTitle"
import {
  IAction,
  IInitialPageState,
  devicePageReducer,
  initialDevicePageState,
} from "./_reducer"
import { devicePageAction } from "./_actions"
import { Key } from "antd/es/table/interface"
import { store } from "../../../app/store"

interface IServerPageContext {
  state: IInitialPageState
  dispatch?: Dispatch<IAction>
}

export const ServerPageContext = createContext<IServerPageContext>({
  state: initialDevicePageState(),
})

interface IProps {
  userId: number
}

export const DeviceBox: React.FC<IProps> = ({ userId }) => {
  const [state, dispatch] = useReducer(
    devicePageReducer,
    initialDevicePageState(userId),
  )

  const getData = () => {
    dispatch(devicePageAction?.setIsLoadingDevice(true))
    const customer_id =
      store?.getState?.()?.user?.child?.object?.[state?.userId]?.customer_id

    const getDevicePromise = getDeviceService(
      state?.device?.param?.offset,
      state?.device?.param?.limit,
      state?.device?.param?.q || undefined,
      customer_id || undefined,
      1,
    )

    Promise.all([getDevicePromise])
      .then((fb: any) => {
        dispatch(
          devicePageAction?.setDeviceData({
            list: fb?.[0]?.data,
            totalPage: fb?.[0]?.totalPage,
          }),
        )
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        dispatch(devicePageAction?.setIsLoadingDevice(false))
      })
  }

  useEffect(() => {
    dispatch(devicePageAction?.setUserId?.(userId))
  }, [userId])

  useEffect(() => {
    getData()
  }, [
    state?.device?.reloadKey,
    state?.device?.param?.limit,
    state?.device?.param?.offset,
    state?.device?.param?.q,
    state?.userId,
  ])

  const contextValue = {
    state,
    dispatch,
  }

  return (
    <ServerPageContext.Provider value={contextValue}>
      {/* <div className="h-full flex gap-4">
        <div className="flex-1 w-[400px]"> */}
      <div className="bg-white">
        <DeviceList />
      </div>
      {/* </div>
      </div> */}
    </ServerPageContext.Provider>
  )
}
