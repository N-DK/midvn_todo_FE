import { axiosFireBaseInstance } from "../axios/serverInstanceNoAuth"
import storage from "../utils/storage"

export const addFirebaseToken = (token: string) => {
  return axiosFireBaseInstance.post("/add", { token })
}

export const removeFirebaseToken = async () => {
  const token_firebase = storage?.getItem("fcmToken")
  return axiosFireBaseInstance.delete("/delete", {
    data: {
      token: token_firebase,
    },
  })
}
