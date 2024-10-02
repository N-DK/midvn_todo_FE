import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import VI from "../locales/vi/vi.json"
import EN from "../locales/en/en.json"

const resources = {
  en: {
    trans: EN,
  },
  vi: {
    trans: VI,
  },
}
const defaultNS: string = "trans"
function i18nConfig() {
  i18n.use(initReactI18next).init({
    resources,
    lng: "vi",
    ns: ["trans"],
    defaultNS,
    fallbackLng: "vi",
    interpolation: {
      escapeValue: false,
    },
  })
}

export default i18nConfig
