import { useNavigate } from "react-router-dom"
import { history } from "../_helper"

export const useHistory = () => {
  const navigate = useNavigate()
  history.navigate = navigate

  return null
}
