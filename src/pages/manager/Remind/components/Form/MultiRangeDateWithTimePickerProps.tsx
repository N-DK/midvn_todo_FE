import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react"
import { DatePicker, TimePicker, Button, Space, Row, Col, message } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import moment from "moment"
import dayjs from "dayjs"

const { RangePicker } = DatePicker

export interface DateTimeRange {
  start: number // timestamp
  end: number // timestamp
  time: string // time in HH:mm:ss
}

interface MultiRangeDateWithTimePickerProps {
  initialValues?: DateTimeRange[] // Giá trị ban đầu
  setValueTime?: any
  ref?: any
}

const MultiRangeDateWithTimePicker = forwardRef<
  HTMLButtonElement, // Bạn có thể định nghĩa kiểu dữ liệu cho ref nếu cần
  MultiRangeDateWithTimePickerProps
>(({ initialValues, setValueTime }, ref) => {
  const [dateRanges, setDateRanges] = useState<any[]>([])
  const [errors, setErrors] = useState<any[]>([])

  useEffect(() => {
    if (initialValues) {
      const initialRanges = initialValues?.map((item) => {
        return {
          range: [dayjs(item.start), dayjs(item.end)],
          time: dayjs(item.time, "HH:mm"),
        }
      })
      setDateRanges(initialRanges)
      setErrors(
        initialRanges.map(() => ({ rangeError: false, timeError: false })),
      )
    }
  }, [initialValues])

  const addRange = () => {
    setDateRanges([...dateRanges, { range: null, time: null }])
    setErrors([...errors, { rangeError: false, timeError: false }])
  }

  const handleRangeChange = (index: number, range: any) => {
    const newRanges = [...dateRanges]
    newRanges[index].range = range
    setDateRanges(newRanges)

    const newErrors = [...errors]
    setErrors(newErrors)
  }

  const handleTimeChange = (index: number, time: any) => {
    const newRanges = [...dateRanges]
    newRanges[index].time = time
    setDateRanges(newRanges)

    const newErrors = [...errors]
    setErrors(newErrors)
  }

  const removeRange = (index: number) => {
    const newRanges = dateRanges.filter((_, i) => i !== index)
    const newErrors = errors.filter((_, i) => i !== index)
    setDateRanges(newRanges)
    setErrors(newErrors)
  }

  const validateForm = () => {
    const newErrors = dateRanges.map((item) => ({
      rangeError: !item.range,
      timeError: !item.time,
    }))
    setErrors(newErrors)

    return newErrors.every((error) => !error.rangeError && !error.timeError)
  }

  const handleSubmit = () => {
    if (validateForm()) {
      const selectedRangesWithTime = dateRanges
        .map((item) => {
          if (item.range && item.time) {
            const startTimeStamp = dayjs(item.range[0]).valueOf()
            const endTimeStamp = dayjs(item.range[1]).valueOf()
            const formattedTime = item.time.format("HH:mm")

            return {
              start: startTimeStamp,
              end: endTimeStamp,
              time: formattedTime,
            }
          }
          return null
        })
        .filter(Boolean)

      setValueTime(selectedRangesWithTime)
    } else {
      setValueTime([])
      message.error("Vui lòng chọn đầy đủ ngày và giờ cho tất cả các trường!")
    }
  }

  // useImperativeHandle sẽ giúp expose các phương thức ra ngoài thông qua ref

  return (
    <Space direction="vertical" size={13} className="mb-10">
      {dateRanges.map((item, index) => (
        <Row key={index} gutter={1} align="middle" className="!mr-[-100px]">
          <Col>
            <RangePicker
              disabledDate={(current) =>
                current && current < dayjs().startOf("day")
              }
              value={
                item.range ? [dayjs(item.range[0]), dayjs(item.range[1])] : null
              }
              onChange={(range) => handleRangeChange(index, range)}
              placeholder={["Chọn ngày bắt đầu", "Chọn ngày kết thúc"]}
              style={errors[index]?.rangeError ? { borderColor: "red" } : {}}
            />
            {errors[index]?.rangeError && (
              <div style={{ color: "red" }}>Vui lòng chọn ngày</div>
            )}
          </Col>
          <Col>
            <TimePicker
              onChange={(time) => handleTimeChange(index, time)}
              value={item.time}
              placeholder="Chọn giờ"
              style={errors[index]?.timeError ? { borderColor: "red" } : {}}
              format="HH:mm"
            />
            {errors[index]?.timeError && (
              <div style={{ color: "red" }}>Vui lòng chọn giờ</div>
            )}
          </Col>
          <Col>
            <Button
              type="link"
              icon={<CloseOutlined />}
              onClick={() => removeRange(index)}
              danger
            />
          </Col>
        </Row>
      ))}

      <Button type="dashed" onClick={addRange}>
        Thêm lịch hẹn nhắc bảo dưỡng
      </Button>
      <button onClick={handleSubmit} className="hidden" ref={ref}></button>
    </Space>
  )
})

export default MultiRangeDateWithTimePicker
