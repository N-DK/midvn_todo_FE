import { Carousel } from "antd"
import { useAppSelector } from "../../app/hooks"
import { Logo } from "../../components/Logo"
import { _array } from "../../utils/_array"
import { LoginForm } from "./components/LoginForm"

export const Login: React.FC = () => {
  const pageInterfacee = useAppSelector((state) => state?.interface?.page)

  const bannerList = _array.getbannerList()

  return (
    <div className="flex-1 flex justify-center items-center bg-root_bg_lv1">
      <div className="w-[95vw] h-[95vh] flex bg-white">
        <div className="flex-1 h-full flex">
          <div className="h-full w-10 flex-1 __app_banner">
            <Carousel
              swipe={true}
              autoplay
              autoplaySpeed={3000}
              style={{
                height: "100%",
              }}
            >
              {bannerList?.map?.((banner, index) => {
                return (
                  <div
                    key={index}
                    className="h-[80vh] flex items-center justify-center"
                  >
                    <div
                      className="object-cover bg-center h-full"
                      // crossOrigin="anonymous"

                      style={{
                        backgroundImage: `url('${banner}')`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                      }}
                    ></div>
                  </div>
                )
              })}
            </Carousel>
            <div className="h-[15vh]"></div>
          </div>
        </div>
        <div>
          <div className="w-[400px] h-full flex flex-col justify-center items-center">
            <div className="shadow w-[90%] flex flex-col gap-2 px-4 py-4">
              <div>
                <div className="h-14 flex justify-center items-center">
                  <Logo />
                </div>
              </div>
              <div className="py-4">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
