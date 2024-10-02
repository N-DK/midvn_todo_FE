import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { _array } from "../../utils/_array"
import { getString } from "../../utils/getString"
import { frameSetup } from "./frameSetup"
import { _app } from "../../utils/_app"
import { ICamListActived } from "../../_types/deviceType"

interface IProps {
  initialCamnum?: number
}
export interface ICameraFrameAction {
  setWinNum: (winNum: number) => void
  playVideo: (index: number, data: ICamListActived) => void
  stopVideo: (index: number) => void
}

export const CamreraFrame = forwardRef<ICameraFrameAction, IProps>(
  ({ initialCamnum }, ref) => {
    const [frameId, setFrameId] = useState<string>(getString?.uuidv4?.())
    const [swfobject, setSwfobject] = useState<any>()

    const setWinNum = (winNum: number) => {
      const rs = frameSetup?.initPlayer(frameId, swfobject, winNum)
      setSwfobject(rs?.swfobject)
    }

    const playVideo = (index: number, data: ICamListActived) => {
      frameSetup?.playVideo(index, swfobject, data)
    }

    const stopVideo = (index: number) => {
      frameSetup?.resetPlayer(index, swfobject)
    }

    useEffect(() => {
      const camNum = _app.cameraFrame?.localStorage?.getCamNum()

      const rs = frameSetup?.initPlayer(frameId, swfobject, camNum)
      setSwfobject(rs?.swfobject)

      return () => {
        console.log("reset cameraFrame (useEffect Return)")
        rs?.resetAll?.()
      }
    }, [])

    useImperativeHandle(ref, () => ({
      setWinNum,
      playVideo,
      stopVideo,
    }))

    return <div className={`h-full w-full`} id={frameId}></div>
  },
)
