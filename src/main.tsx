import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "leaflet/dist/leaflet.css"
import "./_css/main.css"
import "./_css/scrollbar.css"
import "./_css/loader.css"
import "./_css/antdOverride.css"
import "./_css/leaflet.css"
import "dayjs/locale/vi"
import { App } from "./App"
import i18nConfig from "./i18n"
import { ThemeConfigHoc } from "./hocs/ThemeConfigHoc"
import "react-toastify/dist/ReactToastify.css"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

i18nConfig()

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeConfigHoc>
      <App />
    </ThemeConfigHoc>
  </Provider>,
  // </React.StrictMode>,
)
