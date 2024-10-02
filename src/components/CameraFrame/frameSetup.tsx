import { ICamListActived } from "../../_types/deviceType"
import Cmsv6Player from "../../libs/player"
import { getGrid } from "../../libs/player"
import { _log } from "../../utils/_log"

export const frameSetup = {
  initPlayer(
    frameId: any,
    swfobject: any,
    winNum: number,
    save = true,
    isVodMode = false,
  ) {
    if (swfobject) {
      frameSetup?.resetAll(swfobject)
    }
    var options = {
      domId: frameId,
      isVodMode: isVodMode,
      width: "100%",
      height: "100%",
      lang: "en",
    }

    const TConstruct: any = Cmsv6Player

    swfobject = new TConstruct(options)
    frameSetup?.initFlash(swfobject)

    frameSetup?.setViewPlayer(frameId, swfobject, winNum, save)

    return {
      swfobject,
      resetAll: () => frameSetup?.resetAll(swfobject),
      // playVideo: (index: number, data: ICamListActived) =>
      //   frameSetup?.playVideo(index, swfobject, data),
    }
  },

  initFlash(swfobject: any) {
    if (
      typeof swfobject == "undefined" ||
      swfobject == null ||
      typeof swfobject.setWindowNum == "undefined"
    ) {
      setTimeout(() => frameSetup?.initFlash?.(swfobject), 50)
    } else {
      swfobject.setLanguage("assets/en.xml")
    }
  },

  setViewPlayer(frameId: string, swfobject: any, mode: any, save = true) {
    // if (save) {
    //   storage.setItem("winNum", mode)
    // }
    swfobject.setWindowNum(mode)
    let v2 = document.getElementById(frameId)
    let v = v2?.childNodes[0] as HTMLElement
    v2?.setAttribute?.("mode", `${mode}`)

    if (!v) return
    const vv = v.childNodes[0] as HTMLElement
    vv.style.gridArea = "unset"
    v.style.display = "grid"
    const grid = getGrid?.(mode)

    v.style.gridTemplateColumns = grid?.columns
    v.style.gridTemplateRows = grid?.rows
  },

  resetAll(swfobject: any) {
    for (let w = 0; w < 16; w++) {
      frameSetup?.resetPlayer(w, swfobject)
    }

    _log("Reset VideoFrame")
  },

  resetPlayer(index: any, swfobject: any) {
    let playerNo = swfobject
    playerNo.stopVideo(parseInt(index))
    playerNo.reSetVideo(parseInt(index))
  },

  playVideo(index: any, swfobject: any, data: ICamListActived) {
    let playerNo = swfobject

    let device = data
    playerNo.setServerInfo(device.hostname, device.port)
    playerNo.stopVideo(index)
    playerNo.reSetVideo(index)
    playerNo.setVideoInfo(
      index,
      `${device.licencePlate} - CH 0${Number(device.chn) + 1}`,
    )
    playerNo.startVideo(index, device.token, device.device, device.chn, 1, true)
  },
}
