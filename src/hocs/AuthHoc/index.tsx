import { ReactNode, useEffect } from "react"
import storage from "../../utils/storage"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { history } from "../../_helper"
import { routeConfig } from "../../configs/routeConfig"
import { InitialScreen } from "../../components/InitialScreen"
import { _app } from "../../utils/_app"
import { _log } from "../../utils/_log"
import { setUserAccess } from "../../features/user/userSlice"
import { MaskLoader } from "../../components/Loader"

interface IProps {
  children: ReactNode
}

export const AuthHoc: React.FC<IProps> = ({ children }) => {
  const { isAuth, userInfo } = useAppSelector((state) => state?.user?.access)
  const dispatch = useAppDispatch()

  const initData = async () => {
    // _app.setUserAuthed(true)

    _app.getInitialData
      ?.all()
      .then((fb) => {
        _app.setUserAuthed(true)
      })
      .catch((error) => {
        _log("APP INITIAL ERROR", error)
      })
      .finally(() => {})
  }

  useEffect(() => {
    const refeshToken = storage.getAccessToken() // storage.getRefreshToken()
    // alert(refeshToken)

    if (!refeshToken) {
      history?.navigate?.(routeConfig?.login)
    }

    initData()
  }, [])

  if (!isAuth) {
    return <InitialScreen />
  }

  return (
    <>
      <InitialScreen isFadeOut />
      {children}
    </>
  )
}
