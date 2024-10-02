import { Carousel } from "antd"
import { useAppSelector } from "../../app/hooks"
import { Logo } from "../../components/Logo"
import { _array } from "../../utils/_array"
import { LoginForm } from "./components/LoginForm"
import { LoginFormMobile } from "./components/LoginFormMobile"
export const LoginMobile: React.FC = () => {
  const pageInterfacee = useAppSelector((state) => state?.interface?.page)

  const bannerList = _array.getbannerList()

  return (
    <div className="flex-1 flex justify-center items-center bg-root_bg_lv1">
      <div className="w-[95vw] h-[95vh] flex bg-white justify-center">
        <div>
          <div className="w-[100%] h-full flex flex-col justify-center items-center">
            <div className="shadow w-[90%] flex flex-col gap-2 px-4 py-4">
              <div>
                <div className="h-14 flex justify-center items-center">
                  <Logo />
                </div>
              </div>
              <div className="py-4">
                <LoginFormMobile />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
