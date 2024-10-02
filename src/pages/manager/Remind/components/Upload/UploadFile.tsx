import React, { useState } from "react"
import { UploadOutlined } from "@ant-design/icons"
import { Button, message, Upload, Modal, Table } from "antd"
import type { RcFile, UploadProps } from "antd/es/upload/interface"
import * as XLSX from "xlsx"
import { UploadFile } from "antd/lib"

interface UploadExcelProps {
  setIsUpload: any
  setExcelData: any
  setExcelDefaultTime: any
}

const UploadExcel: React.FC<UploadExcelProps> = ({
  setIsUpload,
  setExcelData,
  setExcelDefaultTime,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const handlePreview = (file: RcFile) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = e.target?.result
        if (typeof data === "string") {
          const workbook = XLSX.read(data, { type: "binary" })
          const worksheet = workbook.Sheets["Sheet1"]
          const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
          })

          const header = jsonData[0]

          const indexLicensePlate = header.indexOf("Biển số xe")
          const indexRemindCategory = header.indexOf("Loại cảnh báo")
          const indexPhoneNumber = header.indexOf("Số điện thoại")
          const indexName = header.indexOf("Họ và tên")
          const indexAddress = header.indexOf("Địa chỉ")
          const indexExp = header.indexOf("Hạn nhắc nhở")
          const indexCycle = header.indexOf("Chu kì( Tháng)")
          const indexDes = header.indexOf("Nội dung")

          const indicesDate = header.reduce((acc, col, index) => {
            if (col === "Thời gian nhắc nhở") acc.push(index)
            return acc
          }, [])

          const indicesTime = indicesDate.map((index: any) => {
            if (header[index + 1] === "Thời gian") {
              return index + 1
            }
            return null
          })
          const indicesSeri = header.reduce((acc, col, index) => {
            if (col === "Lốp(Seri,size,brand)") acc.push(index)
            return acc
          }, [])
          const indexDefaultTime = header.indexOf("Thời gian mặc định")
          const indexExcelType: any = header.indexOf("Tùy chọn cập nhật")
          if (
            indexExcelType === -1 ||
            indexDefaultTime === -1 ||
            indexRemindCategory === -1 ||
            indexLicensePlate === -1 ||
            indexPhoneNumber === -1 ||
            indexName === -1 ||
            indexAddress === -1 ||
            indexExp === -1 ||
            indexCycle === -1 ||
            indexDes === -1 ||
            indicesDate === -1 ||
            indicesTime === -1 ||
            indicesSeri === -1
          ) {
            throw new Error("File không đúng định dạng")
          }

          const defaultTime = jsonData[1][indexDefaultTime] || "08:00"
          setExcelDefaultTime(defaultTime)
          const result = jsonData
            .slice(1)
            .filter(
              (row) =>
                row[indexLicensePlate] !== null &&
                row[indexLicensePlate] !== undefined &&
                row[indexLicensePlate] !== "",
            )
            .map((row) => ({
              license_plate: row[indexLicensePlate].toString().trim(),
              type: row[indexRemindCategory],
              phoneNumber: row[indexPhoneNumber],
              name: row[indexName],
              address: row[indexAddress],
              exp: row[indexExp],
              cycle: row[indexCycle],
              indexDesc: row[indexDes],
              remindDate: indicesDate.map((dateIndex: any, i: any) => {
                const timeIndex = indicesTime[i]
                let dateValue = row[dateIndex] || ""
                let timeValue = defaultTime

                if (timeIndex !== null) {
                  timeValue = row[timeIndex] || defaultTime
                }

                if (dateValue && dateValue.trim() !== "") {
                  return `${dateValue.trim()} ${timeValue}`
                } else {
                  return ""
                }
              }),
              remindTire: indicesSeri.map((index: number) => row[index]),
              typeExcel:
                row[indexExcelType]?.trim() === "Thêm mới"
                  ? "add"
                  : row[indexExcelType]?.trim() === "Thay thế"
                  ? "replace"
                  : "",
            }))
          setExcelData(result)

          const columns = jsonData[0].map((col: string, index: number) => ({
            title: col,
            dataIndex: `col${index}`,
            key: `col${index}`,
            width: 200,
          }))

          const dataSource = jsonData
            .slice(1)
            .map((row: any[], rowIndex: number) => {
              const rowData: { [key: string]: any } = { key: rowIndex }
              row.forEach((cell, cellIndex) => {
                rowData[`col${cellIndex}`] = cell
              })
              return rowData
            })

          setIsUpload(true)

          Modal.info({
            title: `Preview of ${file.name}`,
            content: (
              <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                scroll={{ x: 1000, y: 400 }}
              />
            ),
            width: "100%",
          })

          setFileList([...fileList, file])
        }
      } catch (error: any) {
        message.error(error.message)
      }
    }

    reader.readAsBinaryString(file)
  }

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file: RcFile) => {
      const isExcel =
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel"
      if (!isExcel) {
        message.error("Bạn chỉ có thể tải lên file Excel!")
        return Upload.LIST_IGNORE
      }
      handlePreview(file)
      return false
    },
    fileList,
  }

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Tải file Excel lên</Button>
    </Upload>
  )
}

export default UploadExcel
