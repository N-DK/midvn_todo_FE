import { DatePicker } from "antd"
import { RangePickerProps } from "antd/es/date-picker"
import { TimeRangePickerProps } from "antd/lib"
import dayjs from "dayjs"

const { RangePicker } = DatePicker

const rangePresets: TimeRangePickerProps["presets"] = [
  {
    label: "1 ngày gần nhất",
    value: [dayjs().startOf("day"), dayjs().endOf("day")],
  },
  {
    label: "3 ngày gần nhất",
    value: [dayjs().add(-2, "d").startOf("day"), dayjs().endOf("day")],
  },
  {
    label: "7 ngày gần nhất",
    value: [dayjs().add(-7, "d").startOf("day"), dayjs().endOf("day")],
  },
  {
    label: "14 ngày gần nhất",
    value: [dayjs().add(-14, "d").startOf("day"), dayjs().endOf("day")],
  },
  {
    label: "30 ngày gần nhất",
    value: [dayjs().add(-30, "d").startOf("day"), dayjs().endOf("day")],
  },
]

interface IProps {
  props?: RangePickerProps
}

export const TimeRangePicker: React.FC<IProps> = ({ props }) => {
  return (
    <RangePicker
      allowClear={false}
      showTime
      // presets={rangePresets}
      format="YYYY/MM/DD HH:mm:ss"
      defaultValue={
        props?.defaultValue || [dayjs().startOf("day"), dayjs().endOf("day")]
      }
      {...props}
    />
  )
}
