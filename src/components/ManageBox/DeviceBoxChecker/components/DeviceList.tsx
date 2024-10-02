import { ReactNode, useContext, useEffect, useState } from "react"
import { ServerPageContext } from ".."
import { TableC } from "../../../TableC"
import { _const } from "../../../../_constant"
import getTime from "../../../../utils/getTime"
import { devicePageAction } from "../_actions"

import { IColumns, columns } from "./COLUMS"
import { Key } from "antd/es/table/interface"
import { _array } from "../../../../utils/_array"
import { Button } from "antd"

interface IProps {
  onSubmit: (vals: string[]) => void
  button: {
    text: ReactNode
    icon: ReactNode
    onClick: (vals: string[]) => void
  }
  getKey: string
}

export const DeviceList: React.FC<IProps> = ({ button, onSubmit, getKey }) => {
  const { state, dispatch } = useContext(ServerPageContext)

  const reload = () => dispatch?.(devicePageAction?.reloadDeviceData())
  const params = state?.device?.param

  const [dataSource, setDataSource] = useState<IColumns[]>()
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])

  useEffect(() => {
    const dataSource_: IColumns[] =
      state?.device?.list?.map?.((lv, index) => {
        const _lv: any = lv
        return {
          key: _lv?.[getKey] || lv?.id,
          stt: index + 1 + params?.limit * params?.offset,
          dev_id: lv?.dev_id,
          serial: lv?.serial,
          imei: lv?.imei,
          vehicle_name: lv?.vehicle_name,
          model_name: lv?.model_name,
          customer_name: lv?.customer_name,
          data: lv,
          vehicle_type_name: lv?.vehicle_type_name,
          service_package_name: lv?.service_package_name,
          activation_date: lv?.activation_date
            ? getTime?.Unix2StringFormat(lv?.activation_date / 1000)
            : "-",
          warranty_expired_on: lv?.warranty_expired_on
            ? getTime?.Unix2StringFormat(lv?.warranty_expired_on / 1000)
            : "-",
          expired_on: lv?.expired_on
            ? getTime?.Unix2StringFormat(lv?.expired_on / 1000)
            : "-",
          updateAction: () => {
            reload?.()
          },
          actions: "-",
        }
      }) || []

    setDataSource(dataSource_)
  }, [state?.device?.list])

  if (!dataSource) return null

  const handeChangeSelectedRowKeys = (row: any) => {
    const selectedKey = _array.toggleItemStringArray(
      [...selectedRowKeys],
      row?.key,
    )
    setSelectedRowKeys(selectedKey)
  }

  return (
    <div className="h-full">
      <div className="h-full main-rp-table">
        <TableC
          title={`Danh sách Phương tiện`}
          // onReload={reload}
          scroll={{
            useScroll: true,
          }}
          hiddenColumnPicker
          search={{
            width: 200,
            onSearch(q) {
              dispatch?.(devicePageAction?.setDeviceQSearch?.(q))
            },
            limitSearchLength: 3,
          }}
          right={
            <div onClick={() => onSubmit(selectedRowKeys)}>
              <Button
                type="primary"
                size="small"
                className="font-bold"
                icon={button?.icon}
                onClick={() => button?.onClick(selectedRowKeys)}
              >
                {`${button?.text} (${selectedRowKeys?.length})`}
              </Button>
            </div>
          }
          props={{
            rowSelection: {
              selectedRowKeys: selectedRowKeys,
              // onChange: handeChangeSelectedRowKeys,
              onSelect: handeChangeSelectedRowKeys,
              hideSelectAll: true,
            },
            onRow: (row) => ({
              onClick: () => {
                handeChangeSelectedRowKeys(row)
              },
            }),
            rowClassName: () => {
              return "cursor-pointer"
            },
            loading: state?.device?.isLoading,
            columns: columns,
            dataSource: dataSource,
            size: "small",
            pagination: {
              pageSize: state?.device?.param?.limit,
              total: state?.device?.totalPage * state?.device?.param?.limit,
              current: state?.device?.param?.offset + 1,
              onChange(page, pageSize) {
                dispatch?.(devicePageAction?.setDeviceOffset(page - 1))
                dispatch?.(devicePageAction?.setDeviceLimit(pageSize))
              },
            },
          }}
        />
      </div>
    </div>
  )
}
