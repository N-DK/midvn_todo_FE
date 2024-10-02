import { useEffect, useRef, useState } from "react"
import { FormC } from "../../../components/FormC"
import { Button, FormInstance } from "antd"
import { LOGIN_FORM } from "../../../items/FORM_ITEMS"
import { useTranslation } from "react-i18next"
import { loginService } from "../../../services/userServices"
import { api, history } from "../../../_helper"
import { routeConfig } from "../../../configs/routeConfig"
import storage from "../../../utils/storage"

export const LoginForm: React.FC = () => {
  const { t } = useTranslation()
  const formRef = useRef<FormInstance<any>>(null)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const gotoApp = () => {
    history?.navigate?.(`${routeConfig?.manager_remind}/maintenance`)
  }

  const onFinish = async (vals: any) => {
    setIsLoading(true)
    try {
      const fb: any = await loginService(vals)
      api?.message?.success(fb?.message)
      gotoApp()
    } catch (error: any) {
      api?.message?.error(error?.message)
    }
    setIsLoading(false)
  }

  const submit = () => {
    formRef?.current?.submit?.()
  }

  useEffect(() => {
    const refeshToken = storage?.getRefreshToken()

    if (refeshToken) {
      gotoApp()
    }
  })

  return (
    <div>
      <FormC ref={formRef} onFinish={onFinish} fields={LOGIN_FORM(t)} />
      <Button
        loading={isLoading}
        onClick={submit}
        type="primary"
        className="w-full"
      >
        {t("btn_login")}
      </Button>
    </div>
  )
}
