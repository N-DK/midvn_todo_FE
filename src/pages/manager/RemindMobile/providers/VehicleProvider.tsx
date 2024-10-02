import { FC } from "react"
import React from "react"
import { VehicleType } from "../../../../interface/interface"

interface VehicleProviderProps {
  vehiclesStore: VehicleType[]
  freshKey?: number
  keyword?: string
  type: number
  loading?: boolean
  vehicleGPS?: VehicleType[]
  drawIndex?: any
  keywordNoGPS?: string
  categoryParent?: number
}

export interface VehicleProviderContextProps {
  vehiclesStore: VehicleProviderProps

  dispatch: {
    setDrawIndex: (index: any) => void
    setTypeVehicle: (type: number) => void
    freshKey: () => void
    setKeyword: (keyword: string) => void
    setVehicle: (vehicle: VehicleType[]) => void
    setKeywordNoGPS: (keyword: string) => void
    getIdVehicles: () => number[] // Assuming `id` is a string
    setLoading?: (loading: boolean) => void
    setVehicleGPS?: (vehicleGPS: VehicleType[]) => void
  }
}

const initState: VehicleProviderProps = {
  vehiclesStore: [],
  vehicleGPS: [],
  freshKey: 0,
  keyword: "",
  type: 1,
  loading: false,
  categoryParent: 0,
}

export const vehiclesContext = React.createContext<
  VehicleProviderContextProps | undefined
>(undefined)

const VehicleProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vehiclesStore, setState] =
    React.useState<VehicleProviderProps>(initState)

  const dispatch = {
    setDrawIndex: (index: any) => {
      setState((prevState) => ({
        ...prevState,
        drawIndex: index,
      }))
    },
    setTypeVehicle: (type: number) => {
      setState((prevState) => ({
        ...prevState,
        type: type,
      }))
    },
    setKeywordNoGPS: (keyword: string) => {
      setState({ ...vehiclesStore, keywordNoGPS: keyword })
    },
    setVehicleGPS: (vehicleGPS: VehicleType[]) => {
      setState((prevState) => ({
        ...prevState,
        vehicleGPS: vehicleGPS,
      }))
    },
    freshKey: () => {
      setState({ ...vehiclesStore, freshKey: Math.random() })
    },

    setLoading: (loading: boolean) => {
      setState((prevState) => ({
        ...prevState,
        loading: loading,
      }))
    },
    setKeyword: (keyword: string) => {
      setState({ ...vehiclesStore, keyword: keyword })
    },
    setVehicle: (vehicle: VehicleType[]) => {
      setState((prevState) => ({
        ...prevState,
        vehiclesStore: vehicle,
      }))
    },
    getIdVehicles: () => {
      return vehiclesStore.vehiclesStore
        .map((vehicle) => vehicle.id)
        .filter((id) => id !== undefined)
    },
  }

  return (
    <vehiclesContext.Provider value={{ vehiclesStore, dispatch }}>
      {children}
    </vehiclesContext.Provider>
  )
}

export default VehicleProvider
