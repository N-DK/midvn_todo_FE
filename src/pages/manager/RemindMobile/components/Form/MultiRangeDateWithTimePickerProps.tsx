import { useState, useEffect, forwardRef } from "react"
import { DatePicker, TimePicker, Button, Space, Row, Col, message } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import moment from "moment"
import dayjs from "dayjs"

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
      const initialRanges = initialValues.map((item) => ({
        startDate: moment(item.start), // Chuyển timestamp thành moment
        endDate: moment(item.end), // Chuyển timestamp thành moment
        time: moment(item.time, "HH:mm:ss"), // Chuyển time thành moment
      }))
      setDateRanges(initialRanges)
      setErrors(
        initialRanges.map(() => ({
          startDateError: false,
          endDateError: false,
          timeError: false,
        })),
      )
    }
  }, [initialValues])

  const addRange = () => {
    setDateRanges([
      ...dateRanges,
      { startDate: null, endDate: null, time: null },
    ])
    setErrors([
      ...errors,
      { startDateError: false, endDateError: false, timeError: false },
    ])
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
      startDateError: !item.startDate,
      endDateError: !item.endDate,
      timeError: !item.time,
    }))
    setErrors(newErrors)

    return newErrors.every(
      (error) =>
        !error.startDateError && !error.endDateError && !error.timeError,
    )
  }

  const handleSubmit = () => {
    if (validateForm()) {
      const selectedRangesWithTime = dateRanges
        .map((item) => {
          if (item.startDate && item.endDate && item.time) {
            const startTimeStamp = dayjs(item.startDate).valueOf()
            const endTimeStamp = dayjs(item.endDate).valueOf()
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

  const handleStartDateChange = (index: number, date: any) => {
    const newRanges = [...dateRanges]
    newRanges[index].startDate = date
    setDateRanges(newRanges)

    const newErrors = [...errors]
    newErrors[index].startDateError = !date
    setErrors(newErrors)
  }

  const handleEndDateChange = (index: number, date: any) => {
    const newRanges = [...dateRanges]
    newRanges[index].endDate = date
    setDateRanges(newRanges)

    const newErrors = [...errors]
    newErrors[index].endDateError = !date
    setErrors(newErrors)
  }

  return (
    <Space direction="vertical" size={13} className="mb-0">
      {dateRanges.map((item, index) => (
        <Row key={index} gutter={[8, 8]} align="middle">
          <Col xs={10} sm={8} md={6}>
            <DatePicker
              disabledDate={(current) => {
                return current && current < moment().startOf("day")
              }}
              onChange={(date) => handleStartDateChange(index, date)}
              value={item.startDate ? dayjs(item.startDate) : null}
              placeholder="Ngày bắt đầu"
              style={
                errors[index]?.startDateError
                  ? { borderColor: "red", width: "100%" }
                  : { width: "100%" }
              }
            />
            {errors[index]?.startDateError && (
              <div style={{ color: "red" }}>Vui lòng chọn ngày bắt đầu</div>
            )}
          </Col>

          <Col xs={10} sm={8} md={6}>
            <DatePicker
              disabledDate={(current) => {
                return current && current < moment(item.startDate).endOf("day")
              }}
              onChange={(date) => handleEndDateChange(index, date)}
              value={item.endDate ? dayjs(item.endDate) : null}
              placeholder="Ngày kết thúc"
              style={
                errors[index]?.endDateError
                  ? { borderColor: "red", width: "100%" }
                  : { width: "100%" }
              }
            />
            {errors[index]?.endDateError && (
              <div style={{ color: "red" }}>Vui lòng chọn ngày kết thúc</div>
            )}
          </Col>

          <Col xs={6} sm={6} md={6}>
            <TimePicker
              onChange={(time) => handleTimeChange(index, time)}
              value={item.time}
              placeholder="Giờ"
              style={
                errors[index]?.timeError
                  ? { borderColor: "red", width: "100%" }
                  : { width: "100%" }
              }
              format="HH:mm:ss"
            />
            {errors[index]?.timeError && (
              <div style={{ color: "red" }}>Vui lòng chọn giờ</div>
            )}
          </Col>

          <Col xs={3} sm={2} md={2}>
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
        Thêm thời gian nhắc nhở
      </Button>
      <button onClick={handleSubmit} className="hidden" ref={ref}></button>
    </Space>
  )
})

export default MultiRangeDateWithTimePicker
