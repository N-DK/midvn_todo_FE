import { LatLngExpression } from "leaflet"
import { _const } from "../_constant"

export const _position = {
  getPositionLatLngExpression: (array: number[]): LatLngExpression => {
    return [array?.[0], array?.[1]]
  },
  getPositionLatLngExpressionMID: (): LatLngExpression => {
    const MID_POSITION = _const?.position?.MID_PISITION
    return [MID_POSITION?.[0], MID_POSITION?.[1]]
  },
}
