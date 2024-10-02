import { useNavigate } from "react-router-dom"
import { api } from "../_helper"
import { NotificationInstance } from "antd/es/notification/interface"

export const useNotification = (notifyAPI: NotificationInstance) => {
  api.notification = notifyAPI

  return null
}
