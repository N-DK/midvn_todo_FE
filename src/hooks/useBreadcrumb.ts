import { useLocation } from "react-router-dom"
import { HEADER, IHEADER } from "../items/HEADER_ITEMS"

type IR = IHEADER | undefined

export const useBreadcrumb = (): [string, IR, IR, IHEADER[]] => {
  const { pathname } = useLocation()
  
  let keyActive: string = ""
  let route: IR = undefined
  let his: IR = undefined
  let hisArr: IHEADER[] = []

  const findKey = (headerItem: IHEADER[], useHis?: boolean, lv?: number) => {
    let lv_ = lv || 0
    headerItem?.forEach?.((header, index) => {
      if (keyActive) return
      hisArr = hisArr.slice(0, lv_)
      hisArr?.push(header)
      if (useHis) his = header
      if (header?.path == pathname) {
        keyActive = header?.key
        route = header
      }
      if (header?.children) {
        findKey(header?.children, false, lv_ + 1)
      }
    })
  }

  findKey(HEADER(), true)
  if (!keyActive) {
    his = undefined
  }

  return [keyActive, route, his, hisArr]
}
