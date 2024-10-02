import { Map } from "leaflet"
import L from "leaflet"
import { useAppSelector } from "../app/hooks"
import { MAP_TYPE_ITEMS } from "../items/MAP_TYPE_ITEMS"
import { useEffect, useRef } from "react"
const _L: any = L

export const useGGMAP = (map: Map | null) => {
  const mapTypeId = useAppSelector(
    (state) => state?.interface?.setting?.map_mapType,
  )
  const layerRef = useRef<any>()
  const mapType =
    MAP_TYPE_ITEMS?.find?.((map) => map?.value == mapTypeId) ||
    MAP_TYPE_ITEMS?.[0]

  useEffect(() => {
    if (map && false) {
      try {
        if (layerRef.current) {
          map?.removeLayer?.(layerRef.current)
        }
        if (mapType?.type) {
          setTimeout(() => {
            layerRef.current = _L.gridLayer
              .googleMutant({
                type: mapType?.type || "roadmap", // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
              })
              .addTo(map)
          }, 200)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }, [map, mapTypeId])

  return null
}
