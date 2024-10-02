import { BrowserRouter, Route, Routes } from "react-router-dom"
import { routes } from "./routes"
import { NavigateProvider } from "./providers/NavigateProvider"
import { Modal, message, notification } from "antd"
import { useNotification } from "./hooks/useNodification"
import { useMessage } from "./hooks/useMessage"
import { useModal } from "./hooks/useModal"

import "leaflet"
import "leaflet.gridlayer.googlemutant"
import "leaflet-arrowheads"
import "animate.css"
import { useEffect } from "react"
import { requestFCMToken, onMessageListener } from "./utils/firebase"
import { addFirebaseToken } from "./apis/firebaseAPI"
import { ToastContainer, toast } from "react-toastify"

export const fetchFCM = async () => {
  try {
    const data: any = await requestFCMToken()

    if (data) {
      await addFirebaseToken(data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const App: React.FC = () => {
  useEffect(() => {
    const unsubscribe: any = onMessageListener((payload: any) => {
      toast(
        <div>
          <p>{payload.notification.title}</p>
          <p>{payload.notification.body}</p>
        </div>,
        { position: "top-right" },
      )
    })

    return () => {
      unsubscribe()
    }
  }, [])
  const [notifyAPI, contextHolder] = notification.useNotification()
  const [messageApi, contextMsgHolder] = message.useMessage()
  const [modal, contextModalHolder] = Modal.useModal()

  useNotification(notifyAPI)
  useMessage(messageApi)
  useModal(modal)

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          {routes.map((route, index) => {
            const Layout: any = route.layout
            const Page = route.component
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <NavigateProvider>
                    <Layout
                      useMenu={route?.useMenu}
                      useFullScreen={route?.useFullScreen}
                      useMonitor={route?.useMonitor}
                      useTab={route?.useTab}
                    >
                      {Page ? <Page /> : null}
                    </Layout>
                  </NavigateProvider>
                }
              />
            )
          })}
        </Routes>
      </BrowserRouter>

      {contextHolder}
      {contextMsgHolder}
      {contextModalHolder}
    </>
  )
}
