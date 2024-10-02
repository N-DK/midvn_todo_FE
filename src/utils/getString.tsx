import { _const } from "../_constant"
import { v4 as uuidv4 } from "uuid"

export const getString = {
  errorAxios: (error: any) => {
    let message = error?.response?.data?.message

    if (typeof message != "string" || !message) {
      message = _const.string?.message?.error
    }

    return message
  },
  uuidv4() {
    return uuidv4()
  },
  errorAxiosParams: (fb: any) => {
    let message =
      fb?.response?.data?.errors
        ?.reduce?.((t: any, f: any) => [...t, f?.msg], [])
        ?.join?.(", ") ||
      fb?.response?.data?.message ||
      _const.string?.message?.error

    if (typeof message != "string" || !message) {
      message = _const.string?.message?.error
    }

    return message
  },
  errorAxiosSuccess: (fb: any) => {
    let message = fb?.message

    if (typeof message != "string" || !message) {
      message = _const.string?.message?.success
    }

    return message
  },
  currency: {
    VND: (price: number) => {
      try {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(price)
      } catch (error) {
        return `${price}`
      }
    },
  },

  gender(gender: number) {
    if (gender == 1) {
      return "Nam"
    }
    if (gender == 2) {
      return "Nữ"
    }
    if (gender == 3) {
      return "Khác"
    }

    return "Khác"
  },
}
