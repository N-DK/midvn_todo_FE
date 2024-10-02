import { axiosInstance } from "../axios/serverInstanceNoAuth"

export const getCategory = () => {
  return axiosInstance.get("/category/get-all/by-user")
}

export const createCategory = (
  name: string,
  desc: string,
  icon: string,
  category_parent: number,
) => {
  return axiosInstance.post("/category/add", {
    name,
    desc,
    icon,
    category_parent,
  })
}
