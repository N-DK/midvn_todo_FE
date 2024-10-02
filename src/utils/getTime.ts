import moment from "moment"
import { number } from "react-i18next/icu.macro"
import { store } from "../app/store"

const getTime = {
  currDate: function () {
    return moment(new Date()).format("YYYY-MM-DD")
  },
  currDay: function () {
    return moment(new Date()).format("DD")
  },

  currTime: function () {
    return moment(new Date()).format("HH:mm:ss")
  },
  currHour: function () {
    return moment(new Date()).format("HH")
  },
  currUnix: function () {
    const strDate = new Date()

    return Math.floor(strDate.getTime() / 1000)
  },

  current: function () {
    return moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
  },
  currentYearStringFormatC: function (format: string) {
    return moment(new Date()).format(format)
  },
  currentM: function () {
    return moment(new Date()).format("YYYY-MM-DD HH:mm")
  },
  date: function (date: string) {
    return moment(date).format("YYYY-MM-DD")
  },
  time: function (date: string) {
    return moment(date).format("HH:mm:ss")
  },
  StringFormatC: function (date: string, format: string) {
    return moment(date).format(format)
  },
  StringFormat: function (date: string) {
    return moment(date).format("YYYY/MM/DD HH:mm:ss")
  },

  StringFormatStringSearch: function (date: string) {
    return [moment(date).format("YYYY-MM-DD"), moment(date).format("HH:mm:ss")]
  },
  Unix2String: function (value: number) {
    return moment.unix(value).format("YYYY-MM-DD HH:mm:ss")
  },
  Second2Hms: (d: number) => {
    d = Number(d)
    const hours = Math.floor(d / 3600)
    const minutes = Math.floor((d - hours * 3600) / 60)
    const seconds = d - hours * 3600 - minutes * 60

    const timeString =
      hours.toString().padStart(2, "0") +
      ":" +
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0")

    return timeString
  },
  Unix2StringFormatC: function (value: number, format: string) {
    return moment.unix(value).format(format)
  },
  currentC: function (format: string) {
    return moment(new Date()).format(format)
  },
  Unix2StringFormat: function (value: number) {
    return moment.unix(value).format("YYYY/MM/DD HH:mm:ss")
  },
  Unix2StringFormatD: function (value: number) {
    return moment.unix(value).format("YYYY/MM/DD")
  },
  Unix2StringFormatDate: function (value: number) {
    return moment.unix(value).format("YYYY-MM-DD")
  },
  Unix2StringFormatT: function (value: number) {
    return moment.unix(value).format("HH:mm:ss")
  },
  Unix2StringFormatRange: function (
    start: number,
    end: number,
    midString?: string,
  ) {
    return `${moment.unix(start).format("HH:mm:ss")} ${
      midString ?? "-"
    } ${moment.unix(end).format("HH:mm:ss DD/MM")}`
  },
  Unix2StringFormatM: function (value: number) {
    if (!value) return ""
    return moment.unix(value).format("YYYY/MM/DD HH:mm:ss")
  },
  Unix2StringFormatYYYY: function (value: number) {
    if (!value) return "-"
    return moment.unix(value).format("HH:mm:ss DD/MM")
  },
  Unix2StringT: function (value: number) {
    return moment.unix(value).format("HH:mm:ss")
  },
  String2Unit: function (value: string) {
    const date = new Date(value)
    return Math.floor(date.getTime() / 1000)
  },
  StringFormatD: function (value: string) {
    return moment(value).format("YYYY-MM-DD")
  },
  StringFormatDate: function (value: string) {
    return moment(value).format("DD")
  },
  StringFormatDM: function (value: string) {
    return moment(value).format("DD/MM")
  },
  StringFormatMY: function (value: string) {
    return moment(value).format("MM/YYYY")
  },
  StringFormatMonth: function (value: string) {
    return moment(value).format("MM")
  },
  Date2DataSearch: function (value: string) {
    const date = new Date(value)
    return Math.floor(date.getTime() / 1000)
  },
  startDateUnix: function () {
    const strDate = new Date(`${this.currDate()} 00:00:00`)

    return Math.floor(strDate.getTime() / 1000)
  },
  endDateUnix: function () {
    const strDate = new Date(`${this.currDate()} 23:59:59`)

    return Math.floor(strDate.getTime() / 1000)
  },
  caculateTime: function (totalseconds: number) {
    const day = 86400
    const hour = 3600
    const minute = 60

    if (totalseconds < 0) return ""

    const daysout = Math.floor(totalseconds / day)
    const hoursout = Math.floor((totalseconds - daysout * day) / hour)
    const minutesout = Math.floor(
      (totalseconds - daysout * day - hoursout * hour) / minute,
    )
    const secondsout =
      totalseconds - daysout * day - hoursout * hour - minutesout * minute

    const dayString = daysout ? `${daysout} ngày` : ""
    const hourString = hoursout ? `${hoursout} giờ` : ""
    const minuteString = minutesout ? `${minutesout} phút` : ""
    const secondString = secondsout ? `${secondsout} giây` : ""

    return `${dayString} ${hourString} ${minuteString} ${secondString}`?.trimStart()
  },

  caculateTimeFMS: function (totalseconds: number) {
    const day = 86400
    const hour = 3600
    const minute = 60

    const daysout = Math.floor(totalseconds / day)
    const hoursout = Math.floor((totalseconds - daysout * day) / hour)
    const minutesout = Math.floor(
      (totalseconds - daysout * day - hoursout * hour) / minute,
    )
    const secondsout =
      totalseconds - daysout * day - hoursout * hour - minutesout * minute

    const dayString = daysout < 10 ? `0${daysout}` : daysout
    const hourString = hoursout < 10 ? `0${hoursout}` : hoursout
    const minuteString = minutesout < 10 ? `0${minutesout}` : minutesout
    const secondString = secondsout < 10 ? `0${secondsout}` : secondsout

    return `${hourString}:${minuteString}:${secondString}`
  },

  caculateTimeFM: function (totalseconds: number) {
    const day = 86400
    const hour = 3600
    const minute = 60

    const daysout = Math.floor(totalseconds / day)
    const hoursout = Math.floor((totalseconds - daysout * day) / hour)
    const minutesout = Math.floor(
      (totalseconds - daysout * day - hoursout * hour) / minute,
    )
    const secondsout =
      totalseconds - daysout * day - hoursout * hour - minutesout * minute

    const dayString = daysout ? `${daysout}:` : ""
    const hourString = hoursout ? `${hoursout}` : ""
    const minuteString = minutesout ? `${minutesout}` : ""
    const secondString = secondsout

    return `${dayString}${hourString}${
      Number(minuteString || 0) < 10 ? `0${minuteString}` : minuteString
    }:${Number(secondString) < 10 ? `0${secondString}` : secondString}`
  },
  formatDate(timestamp: number): string {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0") // Thêm 1 vì getMonth() trả về từ 0-11
    const day = String(date.getDate()).padStart(2, "0") // Đảm bảo ngày có 2 chữ số

    return `${year}-${month}-${day}`
  },
   parseDate (dateString: string): Date {
    return new Date(dateString);
  }
}

export default getTime
