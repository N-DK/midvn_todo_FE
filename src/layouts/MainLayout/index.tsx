import React, { Fragment, ReactNode, useState } from "react"
import { ConfigProvider, Layout, Menu } from "antd"
import { HEADER_ITEMS } from "../../items/HEADER_ITEMS"
import { useTranslation } from "react-i18next"
import { AuthHoc } from "../../hocs/AuthHoc"
import { Logo } from "../../components/Logo"
import { SlArrowRight } from "react-icons/sl"
import { useLocation } from "react-router-dom"
import { MenuHead } from "./components/MenuHead"
import { useBreadcrumb } from "../../hooks/useBreadcrumb"
import { TabHead } from "./components/TabHead"
import { BreadcrumbHead } from "./components/BreadcrumbHead"
import { PageMenu } from "./components/PageMenu"
import { UserHead } from "./components/UserHead"
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai"
import Remind from "../../pages/manager/Remind/Remind"
import { AppMainTab } from "../../pages/AppMainTab"
import { LayoutSideBar } from "./components/SideBar"
import { getParam } from "../../utils/_param"

const { Header, Content, Footer, Sider } = Layout

interface IProps {
  children?: ReactNode
  useMenu?: boolean
  useFullScreen?: boolean
  useMonitor?: boolean
  useTab?: boolean
}

export const MainLayout: React.FC<IProps> = ({
  children,
  useMenu,
  useFullScreen,
  useMonitor,
  useTab,
}) => {
  const { t } = useTranslation()

  // {getParam("isShowMenu") && <LayoutSideBar />}
  // {getParam("isShowMenu") && (
  //   <div className="px-3 py-2 bg-white border-b border-b-root_bg_lv1">
  //     <BreadcrumbHead />
  //   </div>
  // )}
  return (
    <AuthHoc>
      <Layout className="h-[100vh]">
        {getParam("isShowMenu") && <LayoutSideBar />}
        <Layout>
          <Content>
            <div className="h-[100vh] relative">
              <div className="h-full z-[9] relative">
                <Remind />
              </div>
              <div
                style={{
                  zIndex: useMonitor ? 0 : 10,
                }}
                className="h-full absolute top-0 right-0 left-0"
              >
                <AppMainTab />
              </div>
              {!useMonitor && !useTab ? (
                <div className="h-full bg-root_bg_lv1 flex flex-col absolute z-[999] top-0 right-0 left-0">
                  {useFullScreen ? (
                    children
                  ) : (
                    <Fragment>
                      <div>
                        <div className="bg-white">
                          <TabHead />
                        </div>
                        {getParam("isShowMenu") && (
                          <div className="px-3 py-2 bg-white border-b border-b-root_bg_lv1">
                            <BreadcrumbHead />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 overflow-auto flex">
                        {useMenu ? (
                          <div>
                            <PageMenu />
                          </div>
                        ) : null}
                        <div className="flex-1 overflow-auto px-3 py-3">
                          {children}
                        </div>
                      </div>
                    </Fragment>
                  )}
                </div>
              ) : null}
            </div>
          </Content>
        </Layout>
      </Layout>
    </AuthHoc>
  )
}
