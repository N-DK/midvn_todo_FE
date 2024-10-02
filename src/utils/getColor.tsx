export const statusOnlineColor = {
  offline: "var(--offline-color)",
  running: "var(--running-color)",
  lostgps: "var(--lostgps-color)",
  stopped: "var(--stopped-color)",
  stoppedR: "var(--stoppedR-color)",
}
const t3m = 15 * 60

export const getcolor = {
  speedColor: (speed: number) => {
    return speed ? statusOnlineColor?.running : "inherit"
  },
  parkingColor: function (total_time: number) {
    return total_time < t3m ? "#f6931c" : "#e74b3c"
  },
  agencyColor: (agencyName: string) => {
    let color = ""
    switch (agencyName) {
      case "Developer": {
        color = "gold"
        break
      }
      case "Nhà cung cấp": {
        color = "cyan"
        break
      }
      case "Nhà phân phối": {
        color = "geekblue"
        break
      }
      case "Hợp tác xã": {
        color = "lime"
        break
      }
      case "Doanh nghiệp": {
        color = "magenta"
        break
      }
      case "Đại lý": {
        color = "volcano"
        break
      }
      // case "Khách hàng": {
      //   color = ""
      //   break
      // }
    }

    return color
  },
}
