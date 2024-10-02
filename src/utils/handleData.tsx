import { UploadFile } from "antd"
import { _const } from "../_constant"
import { IRouteData, IRouteDetail } from "../_types/deviceType"
import { FileType, IPathList } from "../_types/interfaceType"
import { IParking } from "../_types/reportType"

export const handleData = {
  getDistance: function (origin: number[], destination: number[]) {
    if (!origin[0] || !destination[0]) return 0

    var lon1 = this.toRadian(origin[1]),
      lat1 = this.toRadian(origin[0]),
      lon2 = this.toRadian(destination[1]),
      lat2 = this.toRadian(destination[0])

    if (!lon1 || !lon2 || !lat1 || !lat2) {
      return 0
    }
    var deltaLat = lat2 - lat1
    var deltaLon = lon2 - lon1

    var a =
      Math.pow(Math.sin(deltaLat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2)
    var c = 2 * Math.asin(Math.sqrt(a))
    var EARTH_RADIUS = 6371
    return c * EARTH_RADIUS * 1000
  },
  toRadian: function (degree: number) {
    return (degree * Math.PI) / 180
  },
  distanceRouteRecord: (routes: IRouteData[]) => {
    let totalKm = 0
    let synCount = 0
    let syningCount = 0
    routes?.forEach?.((route, index) => {
      const next = routes?.[index + 1]
      const pre = routes?.[index - 1]

      const dIdx = route?.idx - pre?.idx
      const dTime = route?.time - pre?.time

      if (
        route &&
        pre &&
        dIdx > _const.limit?.sync &&
        dTime >= _const.limit?.syncTime
      ) {
        syningCount = syningCount + (dIdx || 0)
      }

      if (route?.syn) {
        synCount = synCount + 1
      }

      const currTime = route?.time
      const nextTime = next?.time
      const preTime = pre?.time

      const currLat = Number(route?.latitude)
      const currLng = Number(route?.longitude)

      const nextLat = Number(next?.latitude)
      const nextLng = Number(next?.longitude)

      const preLat = Number(pre?.latitude)
      const preLng = Number(pre?.longitude)

      const currCoor = [currLat, currLng]
      const nextCoor = [nextLat, nextLng]
      const preCoor = [preLat, preLng]

      const distance = handleData.getDistance(currCoor, preCoor)
      const km = Number((distance || 0) / 1000) || 0
      let returnKm = km
      const rangeTime = preTime && currTime ? Math.abs(preTime - currTime) : 0

      const v = rangeTime ? km / (rangeTime / 60 / 60 || 1) : 9999

      if (v > 300) {
        returnKm = 0
      }

      if (route) {
        route.km = returnKm
        route.km_accumulate = Number(
          (pre?.km_accumulate || 0) + (returnKm || 0),
        )
        totalKm = totalKm + (returnKm || 0)
      }
    })

    return { totalKm, synCount, syningCount }
  },

  getRouteDetail: (
    routes_: IRouteData[],
    parkings: IParking[],
  ): IRouteDetail[] => {
    const routes = routes_?.map((route, index) => {
      return { ...route, index: index }
    })
    const routeLength = routes?.length
    const parkingLength = parkings?.length

    const firstRecord = routes?.[0]
    const lastRecord = routes?.[routeLength - 1]

    const returnArray: IRouteDetail[] = []

    const pushParking = (
      parking: IParking,
      arr: IRouteDetail[],
      index: number,
    ) => {
      arr?.push({
        startTime: parking?.start_time,
        endTime: parking?.end_time,
        startAddress: parking?.address,
        endAdrress: parking?.address,
        startCoor: [parking?.latitude, parking?.longitude],
        endCoor: [parking?.latitude, parking?.longitude],
        km: 0,
        route: [],
        type: 0,
        routeIndex: undefined,
        parkingIndex: index + 1,
      })
    }

    const pushJorney = (arr: IRouteData[], arrPush: IRouteDetail[]) => {
      if (arr?.length) {
        const arrLength = arr?.length
        const first = arr?.[0]
        const last = arr?.[arrLength - 1]

        const d = handleData.distanceRouteRecord?.(arr)

        arrPush?.push({
          startTime: first?.time,
          endTime: last?.time,
          startAddress: first?.address,
          endAdrress: last?.address,
          startCoor: [first?.latitude, first?.longitude],
          endCoor: [last?.latitude, last?.longitude],
          km: d?.totalKm,
          route: arr,
          type: 1,
          routeIndex: arr?.[0]?.index,
          parkingIndex: undefined,
        })
      }
    }

    if (!parkings?.length) {
      pushJorney(routes, returnArray)
    }

    parkings?.forEach?.((parking, index) => {
      if (!index) {
        if (parking?.start_time > firstRecord?.time) {
          const arr = routes?.filter?.(
            (route) => route?.time <= parking?.start_time,
          )
          pushJorney(arr, returnArray)
        }
      }

      pushParking(parking, returnArray, index)

      const currParking = parking
      const nextParking = parkings?.[index + 1]

      const startTime = currParking?.end_time
      const endTime = nextParking?.start_time

      const arr = routes?.filter?.(
        (route) => route?.time <= endTime && route?.time >= startTime,
      )

      pushJorney(arr, returnArray)

      if (index == parkingLength - 1) {
        if (parking?.end_time < lastRecord?.time) {
          const arr = routes?.filter?.(
            (route) => route?.time >= parking?.end_time,
          )
          pushJorney(arr, returnArray)
        }

        return
      }
    })

    return returnArray
  },

  getBase64: (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    }),

  getImgReviewList: (urlList: string[]): UploadFile<any>[] => {
    return urlList?.map?.((url, index) => {
      return {
        uid: `${index}`,
        name: `${index}.png`,
        status: "done",
        url: url,
      }
    })
  },
  getImgReviewListByPathList: (urlList: IPathList[]): UploadFile<any>[] => {
    return urlList?.map?.((url, index) => {
      return {
        uid: `${url?.path}`,
        name: `${url?.property || index}`,
        status: "done",
        url: url?.url,
      }
    })
  },
}
