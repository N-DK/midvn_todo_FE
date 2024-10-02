import {
  Dispatch,
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react"
// import { UserList } from "./components/DeviceList"
import { getDeviceService } from "../../../services/manage_deviceServices"
import { CustomerTree } from "../../tree/CustomerTree"
import { ComponentTitle } from "../../TitleC/ComponentTitle"
import {
  IAction,
  IInitialPageState,
  devicePageReducer,
  initialDevicePageState,
} from "./_reducer"
import { userPageAction } from "./_actions"
import { Key } from "antd/es/table/interface"
import { store } from "../../../app/store"
import {
  getTeamListById,
  getUserChildOwnerListService,
  getUserChildService,
  getUserChildServiceById,
  getUserListService,
} from "../../../services/userServices"
import { UserList } from "./components/UserList"

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

export const TeamBox: React.FC<IProps> = ({ userId }) => {
  const [state, dispatch] = useReducer(
    devicePageReducer,
    initialDevicePageState(userId),
  )

  const userState = state?.user
  const customer_id =
    store?.getState?.()?.user?.child?.object?.[state?.userId]?.customer_id

  const getData = () => {
    dispatch(userPageAction?.setIsLoadingUser(true))

    const param = state?.user?.param

    const getUserChildPromise = getTeamListById(
      param.offset,
      param?.limit,
      param?.q,
      userId,
    )

    Promise.all([getUserChildPromise])
      .then(([userList]: any) => {
        dispatch(
          userPageAction?.setUserData({
            list: userList?.data,
            totalPage: userList?.totalPage,
          }),
        )
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        dispatch(userPageAction?.setIsLoadingUser(false))
      })
  }

  useEffect(() => {
    dispatch(userPageAction?.setUserId?.(userId))
  }, [userId])

  useEffect(() => {
    getData()
  }, [
    userState?.reloadKey,
    userState?.param?.limit,
    userState?.param?.offset,
    userState?.param?.q,
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
        <UserList />
      </div>
      {/* </div>
      </div> */}
    </ServerPageContext.Provider>
  )
}
