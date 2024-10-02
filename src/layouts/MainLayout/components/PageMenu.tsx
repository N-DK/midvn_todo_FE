import { memo, useState } from "react"
import { useBreadcrumb } from "../../../hooks/useBreadcrumb"
import { Button, Collapse, Menu, Tooltip } from "antd"
import { CollapseProps } from "antd/lib"
import { SlArrowDown, SlArrowRight } from "react-icons/sl"
import { useTranslation } from "react-i18next"
import { HEADER_ITEMS } from "../../../items/HEADER_ITEMS"
import { ComponentTitle } from "../../../components/TitleC/ComponentTitle"
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai"

export const PageMenu: React.FC = memo(() => {
  const { t } = useTranslation()
  const [keyActive, route, his, hisArr] = useBreadcrumb()
  const [isShow, setIsShow] = useState(false)

  if (!his?.children) return null
  let openKey: string = ""

  his?.children?.forEach?.((m) => {
    if (!openKey) {
      m?.children?.forEach?.((n) => {
        if (n?.path == keyActive) {
          openKey = m?.path
        }
      })
    }
  })

  const toggleShowMenu = () => setIsShow((isShow) => !isShow)

  const menu = HEADER_ITEMS(t, his?.children || [], false)
  const key = his?.path

  return (
    <div className="h-full pr-0 overflow-auto">
      <div className="h-full bg-white shadow-sm">
        <div
          className={
            isShow
              ? "w-[250px] transition-all"
              : "w-[40px] items-center flex flex-col transition-all"
          }
        >
          <div className="bg-white __page-menu">
            {isShow ? (
              <ComponentTitle
                theme="dark"
                title="Menu"
                // style={{
                //   height: 35,
                // }}
                right={
                  <Tooltip title="Đóng lại" placement="right">
                    <Button
                      onClick={toggleShowMenu}
                      icon={<AiOutlineMenuFold color="white" size={18} />}
                      type="link"
                    />
                  </Tooltip>
                }
              />
            ) : (
              <div className="flex flex-col items-center gap-4">
                <Tooltip title="Mở ra" placement="right">
                  <Button
                    onClick={toggleShowMenu}
                    icon={
                      <AiOutlineMenuUnfold
                        size={18}
                        color="var(--root-text-color)"
                      />
                    }
                    type="link"
                  />
                </Tooltip>

                <div
                  style={{
                    writingMode: "vertical-lr",
                  }}
                  className="text-base font-light"
                >
                  Menu
                </div>
              </div>
            )}
            {isShow ? (
              <Menu
                key={key}
                defaultOpenKeys={[openKey]}
                selectedKeys={[keyActive]}
                expandIcon={(event) => {
                  const isOpen = event?.isOpen

                  if (isOpen) {
                    return <SlArrowDown size={10} />
                  }

                  return <SlArrowRight size={10} />
                }}
                theme="light"
                defaultSelectedKeys={["1"]}
                mode="inline"
                items={menu}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
})
