import { ReactNode, useContext, useEffect, useState } from "react"
import { ServerPageContext } from ".."
import { TableC } from "../../../TableC"
import { _const } from "../../../../_constant"
import getTime from "../../../../utils/getTime"
import { devicePageAction } from "../_actions"

import { IColumns, columns } from "./COLUMS"

export const DeviceList = () => {
  const { state, dispatch } = useContext(ServerPageContext)

  const reload = () => dispatch?.(devicePageAction?.reloadDeviceData())
  const params = state?.device?.param

  const [dataSource, setDataSource] = useState<IColumns[]>()

  useEffect(() => {
    const dataSource_: IColumns[] =
      state?.device?.list?.map?.((lv, index) => ({
        key: index + 1,
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
      })) || []

    setDataSource(dataSource_)
  }, [state?.device?.list])

  if (!dataSource) return null

  return (
    <div className="h-full">
      <div className="h-full">
        <TableC
          title={`Danh sách phương tiện (Đã kích hoạt)`}
          onReload={reload}
          // scroll={{
          //   useScroll: true,
          // }}
          search={{
            width: 200,
            onSearch(q) {
              dispatch?.(devicePageAction?.setDeviceQSearch?.(q))
            },
            limitSearchLength: 3,
          }}
          // right={
          //   <DeviceModal
          //     onSccess={() => {
          //       reload?.()
          //     }}
          //     type="add"
          //     button={
          //       <Button type="default" size="small" icon={<PlusOutlined />}>
          //         Thêm
          //       </Button>
          //     }
          //   />
          // }
          props={{
            loading: state?.device?.isLoading,
            columns: columns,
            dataSource: dataSource,
            size: "middle",
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
