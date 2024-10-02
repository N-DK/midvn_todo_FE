import { MessageInstance } from "antd/es/message/interface"
import { HookAPI } from "antd/es/modal/useModal"
import { NotificationInstance } from "antd/es/notification/interface"

interface Ihistory {
  navigate: any
}
interface IAPI {
  notification?: NotificationInstance
  message?: MessageInstance
  modal?: HookAPI
}

interface ILoginMethod {
  googleAuth: any
}

export const history: Ihistory = {
  navigate: null,
}
export const api: IAPI = {
  notification: undefined,
  message: undefined,
  modal: undefined,
}

export const loginMethod: ILoginMethod = {
  googleAuth: null,
}
