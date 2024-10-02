import { useNavigate } from "react-router-dom"
import { api } from "../_helper"
import { NotificationInstance } from "antd/es/notification/interface"
import { MessageInstance } from "antd/es/message/interface"

export const useMessage = (API: MessageInstance) => {
  api.message = API

  return null
}
