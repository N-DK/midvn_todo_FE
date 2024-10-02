import { TFunction } from "i18next"
import { _array } from "../utils/_array"
import { _const } from "../_constant"

export const LOGIN_FORM = (t: TFunction<"translation", undefined>) => [
  {
    name: "username",
    type: "input",
    label: t("form_login_username"),
    placeholder: t("form_login_username"),
    rules: [
      {
        required: true,
        message: t("form_warning_empty"),
      },
    ],
  },
  {
    name: "password",
    type: "inputPassword",
    label: t("form_login_password"),
    placeholder: t("form_login_password"),
    rules: [
      {
        required: true,
        message: t("form_warning_empty"),
      },
    ],
  },
]

export const GENDER_LIST = [
  {
    id: 1,
    title: "Nam",
  },
  {
    id: 2,
    title: "Nữ",
  },
  {
    id: 3,
    title: "Khác",
  },
]

export const CAMERA_NUM = _array?.createNull(17)?.map?.((_, index) => ({
  title: `${index} kênh`,
  value: `${index}`,
}))

export const CAMERA_NUM_REQUIRED = _array
  ?.createNull(16)
  ?.map?.((_, index) => ({
    title: `${index + 1} kênh`,
    value: `${index + 1}`,
  }))

export const PAGE_INTERFACE_INFO_FORM_ADD = [
  {
    name: "name",
    type: "input",
    label: "Tên",
    placeholder: "Nhập tên trang",
    rules: [
      {
        required: true,
        message: _const.string?.form?.alarmNotEmpty,
      },
    ],
  },
  {
    name: "keyword",
    type: "input",
    label: "Tên miền (hoặc sub)",
    placeholder: "Nhập tên miền (hoặc sub)",
    rules: [
      {
        required: true,
        message: _const.string?.form?.alarmNotEmpty,
      },
    ],
  },
]

export const PAGE_INTERFACE_INFO_FORM = [
  {
    name: "name",
    type: "input",
    label: "Tên",
    placeholder: "Nhập tên trang",
    rules: [
      {
        required: true,
        message: _const.string?.form?.alarmNotEmpty,
      },
    ],
  },
  {
    name: "title",
    type: "input",
    label: "Title trang",
    placeholder: "Nhập title trang",
    rules: [
      {
        required: true,
        message: _const.string?.form?.alarmNotEmpty,
      },
    ],
  },

  {
    name: "keyword",
    type: "input",
    label: "Tên miền (hoặc sub)",
    placeholder: "Nhập tên miền (hoặc sub)",
    rules: [
      {
        required: true,
        message: _const.string?.form?.alarmNotEmpty,
      },
    ],
  },

  {
    name: "null",
    type: "title",
    label: "Thông tin liên lạc",
  },
  null,
  null,
  {
    name: "phone",
    type: "input",
    label: "Số điện thoại",
    placeholder: "Nhập số điện thoại",
    rules: [
      {
        required: true,
        message: _const.string?.form?.alarmNotEmpty,
      },
    ],
  },
  {
    name: "email",
    type: "input",
    label: "Email",
    placeholder: "Nhập email",
    rules: [
      {
        required: true,
        message: _const.string?.form?.alarmNotEmpty,
      },
    ],
  },
  {
    name: "zalo",
    type: "input",
    label: "Zalo",
    placeholder: "Nhập số điện thoại Zalo",
  },

  {
    name: "address",
    type: "input",
    label: "Địa chỉ",
    placeholder: "Nhập địa chỉ",
    rules: [
      {
        required: true,
        message: _const.string?.form?.alarmNotEmpty,
      },
    ],
  },
  null,
  "hole",

  {
    name: "null",
    type: "title",
    label: "Đường dẫn",
  },
  null,
  null,
  {
    name: "ios_app_link",
    type: "input",
    label: "Đường dẫn tải app IOS",
    placeholder: "Nhập đường dẫn",
  },
  null,
  "hole",
  {
    name: "android_app_link",
    type: "input",
    label: "Đường dẫn tải app Android",
    placeholder: "Nhập đường dẫn",
  },
  null,
  "hole",

  {
    name: "null",
    type: "title",
    label: "Theme",
  },
  null,
  null,

  {
    name: "theme",
    type: "colorPicker",
    label: "Màu chủ đạo",
    placeholder: "Chọn màu",
    style: {
      width: 100,
    },
    getValueFromEvent(color: any) {
      return `#${color?.toHex?.()}`
    },
    rules: [
      {
        required: true,
        message: _const.string?.form?.alarmNotEmpty,
      },
    ],
  },
  {
    name: "prim_color",
    type: "colorPicker",
    label: "prim_color",
    placeholder: "Chọn màu",
    style: {
      width: 100,
    },
    getValueFromEvent(color: any) {
      return `#${color?.toHex?.()}`
    },
    rules: [
      {
        required: true,
        message: _const.string?.form?.alarmNotEmpty,
      },
    ],
  },
  {
    name: "theme_active_bg",
    type: "colorPicker",
    label: "theme_active_bg",
    placeholder: "Chọn màu",
    style: {
      width: 100,
    },
    getValueFromEvent(color: any) {
      return `#${color?.toHex?.()}`
    },
    rules: [
      {
        required: true,
        message: _const.string?.form?.alarmNotEmpty,
      },
    ],
  },
  {
    name: "theme_hover",
    type: "colorPicker",
    label: "theme_hover",
    placeholder: "Chọn màu",
    style: {
      width: 100,
    },
    getValueFromEvent(color: any) {
      return `#${color?.toHex?.()}`
    },
    rules: [
      {
        required: true,
        message: _const.string?.form?.alarmNotEmpty,
      },
    ],
  },
  "hole",
]
