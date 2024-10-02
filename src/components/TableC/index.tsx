import {
  Button,
  CheckboxOptionType,
  Input,
  Popover,
  Table,
  Tooltip,
} from "antd"
import { AnyObject } from "antd/es/_util/type"
import { TableProps } from "antd/lib"
import {
  Dispatch,
  ReactNode,
  RefAttributes,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { ComponentTitle } from "../TitleC/ComponentTitle"
import {
  FileExcelOutlined,
  PrinterOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons"
import useDebounce from "../../hooks/useDebounce"
import { api } from "../../_helper"
import { _const } from "../../_constant"
import { ExportExcel, IColumnsName } from "../ExportExcel"
import {
  PiColumnsPlusRight,
  PiColumnsPlusRightLight,
  PiMicrosoftExcelLogoDuotone,
  PiPrinterDuotone,
} from "react-icons/pi"
import { GroupCheckboxC } from "../CheckBoxC"
import { log } from "console"
import {
  VehicleProviderContextProps,
  vehiclesContext,
} from "../../pages/manager/Remind/providers/VehicleProvider"
// import { TablePrintModal } from "../modals/TablePrintModal"

interface ITableExportExcel {
  fileName: string
  title: string[]
  position?: string
}

interface ISearchProps {
  width?: number
  key?: string[]
  onSearch?: (q: string) => void
  limitSearchLength?: number
  styles?: React.CSSProperties
  placeholder?: string
}

interface IScroll {
  useScroll?: boolean
  minusBon?: number
}

interface IProps {
  loading?: boolean
  hiddenTitle?: boolean
  props: TableProps<any>
  title?: ReactNode
  right?: ReactNode
  onReload?: () => void
  search?: ISearchProps
  scroll?: IScroll
  titleStyle?: React.CSSProperties
  showTotal?: boolean
  useIntervalResize?: boolean
  exportExcel?: ITableExportExcel
  hiddenColumnPicker?: boolean
  columnsSetting?: {
    isShow: boolean
    styles?: React.CSSProperties
  }
  checkBox?: boolean
  setVehicleChecked?: (data: any) => void
}

interface ISearch {
  setQ?: (q: string) => void
  search?: ISearchProps
  styles?: React.CSSProperties
}

const Search: React.FC<ISearch> = ({ search, setQ, styles = {} }) => {
  const [input, setInput] = useState<string>("")

  const q = useDebounce(input, 500)

  useEffect(() => {
    setQ?.(q)
  }, [q])

  return (
    <div className="relative">
      <Input
        onChange={(e) => {
          const value = e?.target?.value
          setInput(value)
        }}
        placeholder={search?.placeholder || "Tìm kiếm..."}
        style={{
          height: 24,
          width: search?.width,
          ...styles,
        }}
      />
      <div className="h-6 px-2 flex items-center absolute top-0 right-0">
        <SearchOutlined size={20} />
      </div>
    </div>
  )
}

export const TableC: React.FC<IProps> = ({
  loading,
  hiddenTitle,
  title,
  right,
  onReload,
  props,
  scroll,
  titleStyle = {},
  search = {
    width: 200,
  },
  columnsSetting = {
    isShow: true,
    styles: {},
  },
  showTotal,
  useIntervalResize = true,
  exportExcel,
  hiddenColumnPicker = false,
  checkBox = false,
  setVehicleChecked,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const { vehiclesStore, dispatch } = useContext(
    vehiclesContext,
  ) as VehicleProviderContextProps

  const rowSelection = {
    selectedRowKeys, // Dùng state để lưu trữ các hàng đang được chọn
    onChange: (newSelectedRowKeys: React.Key[], selectedRows: any) => {
      setSelectedRowKeys(newSelectedRowKeys)
      setVehicleChecked?.(selectedRows)
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === "Disabled User", // Vô hiệu hoá checkbox của hàng có điều kiện
      name: record.name,
    }),
  }

  useEffect(() => {
    // alert('chay vao')
    if (vehiclesStore?.vehiclesStore?.length == 0) {
      deselectAll()
    }
  }, [vehiclesStore?.type, vehiclesStore?.vehiclesStore])

  const deselectAll = () => {
    setSelectedRowKeys([]) // Đặt mảng rỗng để bỏ chọn tất cả các checkbox
  }

  const [q, setQ] = useState<string>("")
  const [selectionType, setSelectionType] = useState<"checkbox" | "radio">(
    "checkbox",
  )
  const tableWrapperRef = useRef<HTMLDivElement>(null)

  const [tableYScroll, setTableYScroll] = useState<number>(400)
  const [pickerColumn, setPickerColumn] = useState<string[]>(() => {
    return (
      props?.columns?.map((i) => {
        // console.log(i?.className, i?.className?.includes("auto-hide_"))
        if (i?.className?.includes("auto-hide_")) return ""
        return `${i?.key}`
      }) || []
    )
  })

  const timrOutGetHeightYScroll = useRef<NodeJS.Timeout>()
  const tableYScrollRef = useRef<number>(tableYScroll)

  tableYScrollRef.current = tableYScroll

  const getHeightYScroll = () => {
    try {
      const wrapperParentElement = tableWrapperRef?.current?.parentElement

      // const headerWrapper = wrapperParentElement?.querySelector(
      //   ".ant-table-container .ant-table-header",
      // ) as HTMLElement

      // const headerHeight = headerWrapper?.offsetHeight || 46
      const headerHeight = 46

      const height_ = wrapperParentElement?.offsetHeight || 500

      const h =
        height_ - headerHeight - 40 - 24 - 16 - (scroll?.minusBon || 0) || 400

      if (h != tableYScrollRef.current) {
        setTableYScroll(h)
      }
    } catch (error) {
      console.log("error when get report table height", error)
    }
  }

  const setSearchQ = (q: string) => {
    setQ(q)
    const limitSearchLength = search?.limitSearchLength
    if (limitSearchLength && limitSearchLength > q?.length && q) {
      api.message?.warning(
        _const?.string?.s?.notLenghtSearchError?.(limitSearchLength),
      )
    } else {
      search?.onSearch?.(q)
    }
  }

  useEffect(() => {
    if (!scroll?.useScroll) return
    getHeightYScroll()
    window.addEventListener("resize", getHeightYScroll, true)

    if (timrOutGetHeightYScroll.current) {
      clearInterval(timrOutGetHeightYScroll.current)
    }

    if (useIntervalResize && scroll?.useScroll) {
      timrOutGetHeightYScroll.current = setInterval(getHeightYScroll, 1000)
    }

    return () => {
      window.removeEventListener("resize", getHeightYScroll)
      if (timrOutGetHeightYScroll.current) {
        clearInterval(timrOutGetHeightYScroll.current)
      }
    }
  }, [])

  const COLUMS_OPTION: CheckboxOptionType[] = props?.columns
    ? props?.columns?.map((item) => {
        return {
          label: `${item?.title}`,
          value: `${item?.key}`,
        }
      })
    : []
  const optionRowTable = (
    <div className="max-h-[50vh] overflow-auto min-w-[250px] px-2 py-2">
      <div className="font-semibold mb-2">Cột hiển thị</div>
      <GroupCheckboxC
        allText="Cột hiển thị"
        defaultCheckedList={pickerColumn}
        plainOptions={COLUMS_OPTION}
        onChange={(values) => {
          setPickerColumn(values)
        }}
        key={props?.columns?.length}
      />
    </div>
  )

  const filterColums = props?.columns?.filter((item) =>
    pickerColumn?.includes(`${item?.key}`),
  )
  //EXEL

  const headers: IColumnsName[] = []
  const headersKey: string[] = []
  const bodys: any[] = []

  if (exportExcel) {
    props?.columns?.forEach?.((c) => {
      headers?.push({ name: `${c?.title}`, width: Number(c?.width) })
      headersKey?.push(`${c?.key}`)
    })

    props?.dataSource?.forEach?.((data, index) => {
      return bodys.push(
        headersKey?.map?.((key) => {
          return data?.[key]
        }),
      )
    }) || []
  }

  const exportExcelBtn = (style?: React.CSSProperties) =>
    exportExcel ? (
      <>
        <ExportExcel
          title={exportExcel?.title}
          fileName={exportExcel.fileName}
          rowsData={bodys}
          columnsName={headers}
          button={
            <Button
              style={style || {}}
              size="small"
              type="default"
              icon={<FileExcelOutlined />}
            >
              Xuất Excel
            </Button>
          }
        />
      </>
    ) : null

  return (
    <div ref={tableWrapperRef} className="h-full bg-white">
      {title ? (
        <ComponentTitle
          hiddenTitle={hiddenTitle}
          style={titleStyle}
          title={title}
          right={
            <div className="flex items-center gap-2">
              {search?.key?.length || search?.onSearch ? (
                <Search
                  setQ={setSearchQ}
                  search={search}
                  styles={search?.styles}
                />
              ) : null}
              {right}
              {exportExcelBtn()}
              {onReload ? (
                <Button
                  size="small"
                  type="default"
                  icon={<ReloadOutlined />}
                  onClick={onReload}
                >
                  Làm mới
                </Button>
              ) : null}

              {hiddenColumnPicker ? null : (
                <Popover
                  placement="bottomRight"
                  title={"Cột hiển thị"}
                  content={optionRowTable}
                  trigger="click"
                  arrow={false}
                >
                  <Tooltip placement="topRight" title="Cột hiển thị">
                    <Button
                      size="small"
                      type="default"
                      icon={<PiColumnsPlusRight size={18} />}
                      style={{
                        ...columnsSetting?.styles,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      Cột
                    </Button>
                  </Tooltip>
                </Popover>
              )}
            </div>
          }
        />
      ) : null}
      {exportExcel?.position == "bottom" ? (
        <div className="absolute bottom-0 r-0 px-2 py-2 z-[99] bg-white text-[12px]">
          <div className="flex items-center gap-2">
            {exportExcelBtn({
              fontSize: 12,
              backgroundColor: "var(--green)",
              color: "var(--white)",
            })}{" "}
          </div>
        </div>
      ) : null}
      <Table
        loading={loading}
        rowSelection={
          checkBox
            ? {
                type: selectionType,
                ...rowSelection,
              }
            : undefined
        }
        pagination={{
          defaultPageSize: 10,

          showTotal(total, range) {
            if (!showTotal) return undefined

            return `Tổng cộng ${total} dữ diệu`
          },
        }}
        scroll={
          scroll?.useScroll
            ? {
                x: 0,
                y: tableYScroll,
              }
            : { x: 0 }
        }
        {...props}
        columns={filterColums}
        dataSource={props?.dataSource?.filter?.((d) => {
          if (!q || !search?.key?.length) return true
          const qString = q?.toLocaleLowerCase?.() || ""

          const r =
            search?.key
              ?.reduce?.((t, key, index) => {
                return `${t}${d?.[key] || ""}`
              }, "")
              ?.toLocaleLowerCase?.() || ""

          return r?.includes?.(qString)
        })}
      />
    </div>
  )
}
