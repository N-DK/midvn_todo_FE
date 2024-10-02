import { ReactNode } from "react"
import * as XLSX from "xlsx-js-style"
import { api } from "../../_helper"
import { _const } from "../../_constant"

export interface IColumnsName {
  width: number
  name: string
}

interface IExportExcelProps {
  fileName?: string
  columnsName: IColumnsName[]
  rowsData: (string | number | boolean)[]
  button?: ReactNode
  title?: string[]
}

const borderThinStyle = {
  top: { style: "thin", color: "#000000" },
  bottom: { style: "thin", color: "#000000" },
  left: { style: "thin", color: "#000000" },
  right: { style: "thin", color: "#000000" },
}

const alignmentCenterStyle = {
  // vertical: "center",
  horizontal: "center",
  wrapText: true,
}

export const ExportExcel: React.FC<IExportExcelProps> = ({
  fileName = "unknow_name_file",
  columnsName,
  rowsData,
  title,
  button = "export excel",
}) => {
  const exportExcel = () => {
    if (!rowsData?.length) {
      api.message?.warning(_const?.string?.remind?.exportExcelNoData)
      return
    }
    const wb = XLSX.utils.book_new()

    const ws = XLSX.utils.json_to_sheet([])

    const columnHeader = columnsName?.map?.((c) => c?.name)

    const wscols = columnsName?.map?.((c) => ({ wch: c?.width / 8 || 20 }))

    const headingLength = columnHeader.length

    const char = String.fromCharCode(97 + headingLength - 1).toLocaleUpperCase()

    const indexHeaderOrigin = (title?.length || 0) + 3
    const indexBodyOrigin = (title?.length || 0) + 4

    const headerOrigin = `A${indexHeaderOrigin}`
    const bodyOrigin = `A${indexBodyOrigin}`

    ws["!cols"] = wscols
    ws["!merges"] = []

    title?.forEach?.((t_, index) => {
      const orogin = `A${index + 1}`
      ws["!merges"]?.push(
        XLSX.utils.decode_range(`A${index + 1}:${char}${index + 1}`),
      )
      XLSX.utils.sheet_add_aoa(ws, [[t_]], {
        origin: orogin,
      })

      ws[orogin].s = { font: { bold: true }, alignment: alignmentCenterStyle }
    })

    XLSX.utils.sheet_add_aoa(ws, [columnHeader], {
      origin: headerOrigin,
    })

    columnHeader?.forEach?.((_, index) => {
      const char = String.fromCharCode(97 + index).toLocaleUpperCase()

      ws[`${char}${indexHeaderOrigin}`].s = {
        fill: {
          fgColor: { rgb: "b2d7fb" },
        },
        font: { bold: true },
        border: borderThinStyle,
        alignment: alignmentCenterStyle,
      }
    })

    const insertRowsData = rowsData?.map?.((r: any) =>
      r?.map?.((c: any) => ({
        v: c || "",
        t: "s",
        s: { border: borderThinStyle, alignment: alignmentCenterStyle },
      })),
    )

    XLSX.utils.sheet_add_json(ws, insertRowsData, {
      origin: bodyOrigin,
      skipHeader: true,
    })
    XLSX.utils.book_append_sheet(wb, ws, "Data")

    XLSX.writeFile(wb, `${fileName}.xlsx`)
  }

  return <div onClick={exportExcel}>{button}</div>
}
