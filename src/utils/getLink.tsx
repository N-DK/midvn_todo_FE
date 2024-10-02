import { routeConfig } from "../configs/routeConfig"

export const getLink = {
  businessUser: (userId: number) => {
    return `${routeConfig?.manager_u_business}?user_id=${userId}`
  },
}
