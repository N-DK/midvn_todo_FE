import { FC } from "react"
import React from "react"
import { VehicleType } from "../../../../interface/interface"

interface VehicleProviderProps {
  vehiclesStore: VehicleType[]
  freshKey?: number
  keyword?: string
  keywordNoGPS?: string

  type: number
  loading?: boolean
  vehicleGPS?: VehicleType[]
  limit?: number
  offset?: number
  totalPageGPS?: number
  totalPageNoGPS?: number
  categoryParent?: number
}

export interface VehicleProviderContextProps {
  vehiclesStore: VehicleProviderProps

  dispatch: {
    setTotalPageNoGPS: (totalPageGPS: number) => void
    setTypeVehicle: (type: number) => void
    freshKey: () => void
    setKeyword: (keyword: string) => void
    setKeywordNoGPS: (keyword: string) => void
    setVehicle: (vehicle: VehicleType[]) => void
    getIdVehicles: () => number[] // Assuming `id` is a string
    setLoading?: (loading: boolean) => void
    setVehicleGPS?: (vehicleGPS: VehicleType[]) => void
    setOffset: (offset: number) => void
    setLimit: (limit: number) => void
    setTotalPageGPS?: (totalPageGPS: number) => void
    setCategoryParent: (categoryParent: number) => void
  }
}

const initState: VehicleProviderProps = {
  vehiclesStore: [],
  vehicleGPS: [],
  freshKey: 0,
  keyword: "",
  type: 1,
  loading: false,
  limit: 10,
  offset: 0,
  totalPageGPS: 0,
  totalPageNoGPS: 1,
  categoryParent: 0,
}

export const vehiclesContext = React.createContext<
  VehicleProviderContextProps | undefined
>(undefined)

const VehicleProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vehiclesStore, setState] =
    React.useState<VehicleProviderProps>(initState)

  const dispatch = {
    setCategoryParent: (categoryParent: number) => {
      setState((prevState) => ({
        ...prevState,
        categoryParent: categoryParent,
      }))
    },
    setTotalPageNoGPS: (totalPageNoGPS: number) => {
      setState((prevState) => ({
        ...prevState,
        totalPageNoGPS: totalPageNoGPS,
      }))
    },

    setTotalPageGPS: (totalPageGPS: number) => {
      setState((prevState) => ({
        ...prevState,
        totalPageGPS: totalPageGPS,
      }))
    },
    setTypeVehicle: (type: number) => {
      setState((prevState) => ({
        ...prevState,
        type: type,
      }))
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
    setKeywordNoGPS: (keyword: string) => {
      setState({ ...vehiclesStore, keywordNoGPS: keyword })
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
    setOffset: (offset: number) => {
      setState((prevState) => ({
        ...prevState,
        offset: offset,
      }))
    },
    setLimit: (limit: number) => {
      setState((prevState) => ({
        ...prevState,
        limit: limit,
      }))
    },
  }

  return (
    <vehiclesContext.Provider value={{ vehiclesStore, dispatch }}>
      {children}
    </vehiclesContext.Provider>
  )
}

export default VehicleProvider
