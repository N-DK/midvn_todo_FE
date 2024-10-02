import React, { useState } from "react"
import { UploadOutlined } from "@ant-design/icons"
import { Button, message, Upload, Modal, Table } from "antd"
import type { RcFile, UploadProps } from "antd/es/upload/interface"
import * as XLSX from "xlsx"
import { number } from "react-i18next/icu.macro"

interface UploadExelProps {
  setIsUpload: any
  setExcelData: any
  setExcelDefaultTime: any
}

const UploadExel: React.FC<UploadExelProps> = ({
  setIsUpload,
  setExcelData,
  setExcelDefaultTime,
}) => {
  const [tableColumns, setTableColumns] = useState<any[]>([])
  const [tableData, setTableData] = useState<any[]>([])

  const handlePreview = (file: RcFile) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = e.target?.result
      if (typeof data === "string") {
        const workbook = XLSX.read(data, { type: "binary" })
        const worksheet = workbook.Sheets["Sheet1"]
        const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
        })

        const header = jsonData[0] // Hàng đầu tiên là tiêu đề cột

        const indexBienSoXe = header.indexOf("Biển số xe")
        const indexLoaiCanhBao = header.indexOf("Loại cảnh báo")
        const indexPhoneNumber = header.indexOf("Số điện thoại")
        const indexName = header.indexOf("Họ và tên")
        const indexAddress = header.indexOf("Địa chỉ")
        const indexExp = header.indexOf("Hạn nhắc nhở")
        const indexCycle = header.indexOf("Chu kì( Tháng)")
        const indexDes = header.indexOf("Nội dung")

        // Tìm tất cả các cột "Thời gian nhắc nhở"
        const indicesDate = header.reduce((acc, col, index) => {
          if (col === "Thời gian nhắc nhở") acc.push(index)
          return acc
        }, [])

        // Kiểm tra xem bên cạnh "Thời gian nhắc nhở" có cột "Thời gian" không
        const indicesTime = indicesDate.map((index: any) => {
          if (header[index + 1] === "Thời gian") {
            return index + 1 // Lấy cột kế bên nếu là "Thời gian"
          }
          return null // Nếu không có cột "Thời gian"
        })
        const indicesSeri = header.reduce((acc, col, index) => {
          if (col === "Lốp(Seri,size,brand)") acc.push(index)
          return acc
        }, [])
        const indexDefaultTime = header.indexOf("Thời gian mặc định")
        const indexExcelType: any = header.indexOf("Tùy chọn cập nhật")
        if (indexExcelType === "" || indexExcelType === undefined) {
          throw new Error(
            "Invalid Excel type: Type cannot be empty or undefined",
          )
        }

        const defaultTime = jsonData[1][indexDefaultTime] || "08:00"
        setExcelDefaultTime(defaultTime)
        const result = jsonData
          .slice(1)
          .filter(
            (row) =>
              row[indexBienSoXe] !== null &&
              row[indexBienSoXe] !== undefined &&
              row[indexBienSoXe] !== "",
          )
          .map((row) => ({
            license_plate: row[indexBienSoXe].toString().trim(),
            type: row[indexLoaiCanhBao],
            phoneNumber: row[indexPhoneNumber],
            name: row[indexName],
            address: row[indexAddress],
            exp: row[indexExp],
            cycle: row[indexCycle],
            indexDesc: row[indexDes],
            // Xử lý remindDate với logic mới
            remindDate: indicesDate.map((dateIndex: any, i: any) => {
              const timeIndex = indicesTime[i]
              let dateValue = row[dateIndex] || "" // Lấy giá trị từ cột "Thời gian nhắc nhở"
              let timeValue = defaultTime // Mặc định là 08:00 nếu không có cột "Thời gian"

              // Nếu có cột "Thời gian" và giá trị không trống
              if (timeIndex !== null) {
                timeValue = row[timeIndex] || defaultTime
              }

              // Chỉ ghép thời gian nếu "Thời gian nhắc nhở" có giá trị hợp lệ
              if (dateValue && dateValue.trim() !== "") {
                return `${dateValue.trim()} ${timeValue}`
              } else {
                // Trả về chuỗi rỗng nếu "Thời gian nhắc nhở" bị thiếu
                return ""
              }
            }),
            remindTire: indicesSeri.map((index: number) => row[index]),
            typeExcel: row[indexExcelType]?.trim() === "Thêm mới" ? "add" : row[indexExcelType]?.trim() === "Thay thế" ? "replace" : ""
          }))
        setExcelData(result)

        // Generate columns for the Ant Design table
        const columns = jsonData[0].map((col: string, index: number) => ({
          title: col,
          dataIndex: `col${index}`,
          key: `col${index}`,
          width: 200,
        }))

        // Generate data for the Ant Design table
        const dataSource = jsonData
          .slice(1)
          .map((row: any[], rowIndex: number) => {
            const rowData: { [key: string]: any } = { key: rowIndex }
            row.forEach((cell, cellIndex) => {
              rowData[`col${cellIndex}`] = cell
            })
            return rowData
          })

        setTableColumns(columns)
        setTableData(dataSource)

        // Set the upload state to true after successful preview
        setIsUpload(true)

        Modal.info({
          title: `Preview of ${file.name}`,
          content: (
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={false}
              scroll={{ x: 1000, y: 400 }} // Thêm thanh trượt ngang và dọc
            />
          ),
          width: "100%",
        })
      }
    }
    reader.readAsBinaryString(file)
  }

  const props: UploadProps = {
    beforeUpload: (file: RcFile) => {
      const isExcel =
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel"
      if (!isExcel) {
        message.error("You can only upload Excel files!")
        return Upload.LIST_IGNORE
      }
      handlePreview(file) // Preview the file directly after selection
      return false // Prevent automatic upload
    },
  }

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Tải file Excel lên</Button>
    </Upload>
  )
}

export default UploadExel
