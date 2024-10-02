import { ConfigProvider, Spin } from "antd"
import { ThemeConfig } from "antd/lib"
import viVN from "antd/locale/vi_VN"
import { ReactNode, useEffect, useState } from "react"
import { InitialScreen } from "../../components/InitialScreen"
import {
  getInterfaceDetailService,
  getInterfacePageService,
} from "../../services/interfaceServices"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setPageInterface } from "../../features/interface/interfaceSlice"

const setRootKey = (key: string, val: string) => {
  document.documentElement.style.setProperty(`--${key}`, `${val}`)
}

Spin.setDefaultIndicator(
  <div className="flex justify-center items-center flex-col">
    <div className="loader_____">
      <svg className="circular_____" viewBox="25 25 50 50">
        <circle
          className="path_____"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  </div>,
)

interface IProps {
  children: ReactNode
}

export const themeColor = {
  hoverActive: "#ffffff20",
  primColor: "#2a60dd",
  theme: "#1f1f1f",
  themeHover: "#d8d8d8",
  themeActiveBg: "#d9d9d9",
}

export const ThemeConfigHoc: React.FC<IProps> = ({ children }) => {
  const [isDone, setIsDone] = useState<boolean>(false)
  const pageInterface = useAppSelector((state) => state?.interface?.page)

  const dispatch = useAppDispatch()

  useEffect(() => {
    getInterfacePageService(window.location.hostname)
      .then((fb: any) => {
        if (fb?.result) {
          const i = fb?.data?.[0] || {}
          const data = {
            ...i,
            content: JSON.parse(i?.content || "{}"),
          }

          const content = data?.content

          dispatch(
            setPageInterface({
              logo: content?.logo,
              favicon: content?.favicon,
              banner: [],
              title: content?.title || "GIÁM SÁT HÀNH TRÌNH",
              props: {
                ...content,
              },
              sv_static_file: fb?.options?.sv_static_file,
            }),
          )
        }
      })
      .catch((error) => {
        console.log("loi khi lay theme >>", error)
      })
      .finally(() => {
        setIsDone(true)
      })
  }, [])

  useEffect(() => {
    const content = pageInterface?.props

    setRootKey("theme", content?.theme || themeColor?.theme)
    setRootKey("theme-hover", content?.theme_hover || themeColor?.themeHover)
    setRootKey(
      "theme-active-bg",
      content?.theme_active_bg || themeColor?.themeActiveBg,
    )
    setRootKey("primColor", content?.prim_color || themeColor?.primColor)

    const HEAD_ICON = `${pageInterface?.sv_static_file}/${pageInterface?.props?.favicon}`

    const favicon = document.querySelector(
      "link[rel~='icon']",
    ) as HTMLLinkElement

    favicon.href = HEAD_ICON

    document.title = pageInterface?.title
  }, [pageInterface])

  const content = pageInterface?.props

  // console.log(pageInterface)

  const rootTheme: ThemeConfig = {
    token: {
      colorPrimary: content?.theme || themeColor?.theme,
      colorSuccess: "#2cc76b",
      borderRadius: 0,
      // fontFamily: "Avenir, Helvetica, Arial, sans-serif",
      fontFamily: "Noto Sans, sans-serif",
      colorTextBase: "#000000",
      fontSize: 13,
      motionDurationMid: "100ms",
      motionDurationSlow: "100ms",
      motionDurationFast: "100ms",
      // colorText: "#2c3e50",
      colorText: "#3a4e61",
      fontWeightStrong: 500,
    },
    components: {
      Tree: {
        paddingContentHorizontal: 0,
        sizeUnit: 1000,
      },
      Layout: {
        triggerBg: "#000a14",
      },
      Modal: {},
      Table: {
        fontWeightStrong: 500,
      },
      Tooltip: {
        colorBgSpotlight: "#000000bb",
        motionDurationFast: "50ms",
        motionDurationSlow: "50ms",
      },

      Menu: {
        iconSize: 18,
        collapsedIconSize: 22,
        darkItemBg: "#001628",
        darkSubMenuItemBg: "#001628",
        darkItemSelectedBg: themeColor.hoverActive,
        darkItemHoverBg: themeColor.hoverActive,
        horizontalItemHoverColor: "#fff",
        darkItemColor: "#c7c7c7",
        darkItemSelectedColor: content?.prim_color || themeColor.primColor,

        itemMarginInline: 0,
        itemMarginBlock: 0,
        itemPaddingInline: 0,
        dropdownWidth: 200,

        motionDurationFast: "0ms",
        motionDurationMid: "0ms",
        motionDurationSlow: "0ms",
      },
    },
  }

  if (!isDone) return <InitialScreen />

  return (
    <ConfigProvider theme={rootTheme} locale={viVN}>
      {children}
    </ConfigProvider>
  )
}
