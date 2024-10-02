import { FC, useContext, useState } from "react"
import { ModalCView } from "../ModalC/ModalC"
import { Button } from "antd"
import UploadExcel from "../../pages/manager/Remind/components/Upload/UploadFile"
import {
  VehicleProviderContextProps,
  vehiclesContext,
} from "../../pages/manager/Remind/providers/VehicleProvider"

import { api } from "../../_helper"
import { addVehicleExcel } from "../../apis/vehicleAPI"
import { MaskLoader } from "../Loader"
import { addTire } from "../../apis/tireAPI"
import { createCategory, getCategory } from "../../apis/categoryAPI"
import { addRemind, deleMultiRemind } from "../../apis/remindAPI"
import { FileIcon, defaultStyles } from "react-file-icon"
import { _const } from "../../_constant"
interface ModalImportExcelProps {
  button: React.ReactNode
}

const ImportExcel: FC<{
  action: any
}> = ({ action }) => {
  const [isUpload, setIsUpload] = useState<Boolean>(false)
  const [excelData, setExcelData] = useState<any[]>([])
  const [excelDefaultTime, setExcelDefaultTime] = useState<any>()
  const [loading, setLoading] = useState(false)

  const { vehiclesStore, dispatch } = useContext(
    vehiclesContext,
  ) as VehicleProviderContextProps

  const handleImport = async () => {
    try {
      const objectConvert: any = {}

      excelData.forEach((item: any) => {
        const { typeExcel, ...other } = item
        if (!objectConvert[item.typeExcel]) objectConvert[item.typeExcel] = []
        objectConvert[item.typeExcel].push(other)
      })
      console.log("converted excel data: ", objectConvert)

      excelData.forEach((item, index) => {
        const remindDate = item.remindDate
        if (!Array.isArray(remindDate)) {
          console.log(
            `Item at index ${index} has invalid remindDate format: Not an array`,
          )
          return
        }

        remindDate.forEach((date, i) => {
          if (typeof date !== "string") {
            console.log(
              `Item at index ${index} has invalid remindDate format at index ${i}: Not a string`,
            )
          }
        })
      })

      const dataNewVehiclesAdd = objectConvert["add"]?.map((item: any) => ({
        license_plate: String(item.license_plate),
        user_name: String(item.name),
        license: String(item.phoneNumber),
        user_address: String(item.address),
      }))

      const dataNewVehiclesRep = objectConvert["replace"]?.map((item: any) => ({
        license_plate: String(item.license_plate),
        user_name: String(item.name),
        license: String(item.phoneNumber),
        user_address: String(item.address),
      }))

      if (dataNewVehiclesRep?.length > 0) {
        try {
          const vehicles = dataNewVehiclesRep.map(
            (item: any) => item.license_plate,
          )
          const res = await deleMultiRemind(
            vehicles,
            Number(vehiclesStore?.categoryParent),
          )
        } catch (error) {}
      }

      const vehicleGPS = vehiclesStore?.vehicleGPS

      const licensePlatesAdd = dataNewVehiclesAdd?.map(
        (item: any) => item.license_plate,
      )
      const licensePlatesRep = dataNewVehiclesRep?.map(
        (item: any) => item.license_plate,
      )

      const licensePlatesGPS = vehicleGPS?.map((item) => item.license_plate)

      const duplicateLicensePlates1 = licensePlatesAdd?.filter((item: any) =>
        licensePlatesGPS?.includes(item),
      )
      const duplicateLicensePlates2 = licensePlatesRep?.filter((item: any) =>
        licensePlatesGPS?.includes(item),
      )

      if (
        duplicateLicensePlates1?.length > 0 ||
        duplicateLicensePlates2?.length > 0
      ) {
        api.message?.error(
          `Biển số ${(duplicateLicensePlates1 || duplicateLicensePlates2).join(
            ", ",
          )} đã tồn tại trong danh sách phương tiện GPS`,
        )
        return
      }

      setLoading(true)
      if (dataNewVehiclesAdd?.length > 0) {
        await addVehicleExcel(dataNewVehiclesAdd)
      }
      if (dataNewVehiclesRep?.length > 0) {
        await addVehicleExcel(dataNewVehiclesRep)
      }

      const parsedRemindTireData = excelData.flatMap((item) =>
        item.remindTire
          .filter((tire: any) => tire)
          .map((tire: any) => {
            const [seri, size, brand] = tire.split(",")
            return {
              license_plate: item.license_plate?.toString() || "Unknown",
              seri,
              size,
              brand,
            }
          }),
      )
      for (let i = 0; i < parsedRemindTireData.length; i++) {
        try {
          await addTire(parsedRemindTireData[i])
        } catch (error) {
          api.message?.error(_const?.string?.remind?.tireSeriesDuplicate)
        }
      }
      const convertToUnix = (dateString: string): any => {
        try {
          if (
            dateString === null ||
            dateString === undefined ||
            dateString === ""
          ) {
            return ""
          }
          dateString = dateString.trim()
          if (!dateString.includes(" ")) {
            dateString += ` ${excelDefaultTime}`
          }
          const [datePart, timePart] = dateString.trim().split(" ")
          const [day, month, year] = datePart.split("/")
          const [hours, minutes] = timePart.split(":")

          const date = new Date(
            Number(year),
            Number(month) - 1,
            Number(day),
            Number(hours),
            Number(minutes),
          )

          return Math.floor(date.getTime())
        } catch (err) {
          throw err
        }
      }
      const res = await getCategory()
      const type = res?.data

      const formattedData = excelData.map(function (item, index) {
        return {
          category_parent: vehiclesStore?.categoryParent,
          tire_seri: parsedRemindTireData?.[index]?.seri,
          type: item.type,
          remind_category_id: "",
          expiration_time: convertToUnix(item.exp),
          cycle: item.cycle,
          note_repair: item.indexDesc,
          schedules: item.remindDate
            .filter((dateStr: any) => dateStr)
            .map((dateStr: any) => {
              const [startDate, endDateTime] = dateStr.split("-")
              const startDateTime = `${startDate.trim()} ${endDateTime
                .split(" ")[1]
                .trim()}`
              const endDateTimeFull = endDateTime.trim()
              const timeOnly = endDateTime.split(" ")[1].trim()
              return {
                start: convertToUnix(startDateTime),
                end: convertToUnix(endDateTimeFull),
                time: timeOnly,
              }
            }),
          is_notified: 0,
          vehicles: [item.license_plate?.toString()],
        }
      })

      for (let i = 0; i < formattedData.length; i++) {
        let cate_id = ""
        let typeFind = type.find(
          (itemType: any) =>
            itemType.name.trim() === formattedData[i].type.trim(),
        )

        if (typeFind?.id) {
          cate_id = typeFind?.id
        } else {
          const res = await createCategory(
            formattedData[i]?.type,
            "",
            "",
            Number(vehiclesStore?.categoryParent),
          )

          cate_id = res?.data
        }
        formattedData[i].remind_category_id = cate_id
      }

      for (let i = 0; i < formattedData.length; i++) {
        await addRemind(formattedData[i])
      }
      setLoading(false)
      dispatch?.freshKey()

      action?.closeModal?.()
    } catch (error) {
      console.log("error >>", error)
      api?.message?.error(
        "Import thất bại seri lốp bị trùng hoặc biển số phương tiện bị trùng trong hệ thống !!",
      )
      action?.closeModal?.()
    }
  }

  return (
    <div>
      {loading && <MaskLoader />}
      <p className="flex items-center">
        Nếu chưa có file exel mẫu, tải mẫu tại đây
        <Button
          icon={
            <div className="w-4">
              <FileIcon extension="xlsx" {...defaultStyles["xlsx"]} />
            </div>
          }
          type="link"
          href={`${
            vehiclesStore?.categoryParent === 0
              ? "/assets/files/Quản_lý_giấy_tờ_phương_tiện.xlsx"
              : "/assets/files/Bảo_dưỡng_phương_tiện.xlsx"
          }`}
          className="flex items-center"
        >
          template.xlsx
        </Button>
      </p>

      <div className="flex justify-center mt-5 mb-10">
        <UploadExcel
          setExcelData={setExcelData}
          setIsUpload={setIsUpload}
          setExcelDefaultTime={setExcelDefaultTime}
        />
      </div>
      <div className="actions flex justify-end">
        <Button
          className="mr-3"
          onClick={() => {
            action?.closeModal?.()
          }}
        >
          Hủy
        </Button>
        <Button onClick={handleImport} disabled={!isUpload} type="primary">
          {" "}
          import{" "}
        </Button>
      </div>
    </div>
  )
}

const ModalImportExcel: FC<ModalImportExcelProps> = ({ button }) => {
  return (
    <ModalCView
      modalProps={{ width: 500 }}
      button={button}
      title="Nhập file exel"
      children={(action) => <ImportExcel action={action} />}
    />
  )
}

export default ModalImportExcel
