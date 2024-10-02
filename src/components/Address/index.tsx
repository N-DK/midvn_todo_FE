import axios from "axios"
import { ReactNode, memo, useEffect, useState } from "react"
import {
  addressService,
  addressServiceTest,
} from "../../services/interfaceServices"
import { useIsFirstRender } from "../../hooks/useIsFirstRender"

interface IProps {
  address?: string
  lat: number
  lng: number
  pendingNode?: ReactNode
  useReset?: boolean
}

export const addressCache: { [key: string]: string } = {}

export const AddressCallback: React.FC<IProps> = memo(
  ({ address, lat, lng, useReset = true, pendingNode = "---" }) => {
    const latLng = `${lat},${lng}`
    const _mAddress = address || addressCache[latLng]

    const [addressCallback, setAddressCallback] = useState<ReactNode>(_mAddress)

    address && (addressCache[latLng] = address)

    useEffect(() => {
      // return
      if (!_mAddress && lat && lng) {
        useReset && setAddressCallback(pendingNode)
        addressService(lat, lng)
          .then((fb: any) => {
            const address = fb

            if (address) {
              addressCache[latLng] = address
              setAddressCallback(address)
            }
          })
          .catch(() => {})
      }
    }, [lat, lng])

    const displayAddress = `${_mAddress || addressCallback || pendingNode}`

    return displayAddress
  },
)

export const AddressCallbackTest: React.FC<IProps> = memo(
  ({ address, lat, lng, useReset = true, pendingNode = "---" }) => {
    const latLng = `${lat},${lng}`
    const _mAddress = address || addressCache[latLng]

    const [addressCallback, setAddressCallback] = useState<ReactNode>(_mAddress)

    address && (addressCache[latLng] = address)

    useEffect(() => {
      if (!_mAddress && lat && lng) {
        useReset && setAddressCallback(pendingNode)
        addressServiceTest(lat, lng)
          .then((fb: any) => {
            const address = fb

            if (address) {
              // addressCache[latLng] = address
              setAddressCallback(address)
            }
          })
          .catch(() => {})
      }
    }, [lat, lng])

    const displayAddress = `${_mAddress || addressCallback || pendingNode}`

    return displayAddress
  },
)
