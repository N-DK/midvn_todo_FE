import { useNavigate } from "react-router-dom"
import { api } from "../_helper"
import { NotificationInstance } from "antd/es/notification/interface"
import { MessageInstance } from "antd/es/message/interface"
import { HookAPI } from "antd/es/modal/useModal"

export const useModal = (API: HookAPI) => {
  api.modal = API

  return null
}
