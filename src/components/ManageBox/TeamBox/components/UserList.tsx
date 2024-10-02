import { ReactNode, useContext, useEffect, useState } from "react"
import { ServerPageContext } from ".."
import { Button, Popover, Tag } from "antd"
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons"
import { TableC } from "../../../TableC"
import { _const } from "../../../../_constant"
import { userPageAction } from "../_actions"
import { CustomerAddModal } from "../../../modals/CustomerAddModal"
import { useAppSelector } from "../../../../app/hooks"
import { IColumns, columns } from "./COLUMS"
import getTime from "../../../../utils/getTime"
import { UserAddModal } from "../../../modals/UserAddModal"
import { TeamAddModal } from "../../../modals/TeamAddModal"

export const UserList = () => {
  const { state, dispatch } = useContext(ServerPageContext)
  const user = useAppSelector(
    (state_) => state_?.user?.child?.object?.[state?.userId],
  )

  const reload = () => dispatch?.(userPageAction?.reloadDeviceData())
  const params = state?.user?.param
  const userState = state?.user

  const [dataSource, setDataSource] = useState<IColumns[]>()

  useEffect(() => {
    const dataSource_: IColumns[] =
      userState?.list?.map?.((lv, index) => {
        const key = params?.limit * params?.offset + index + 1
        return {
          key: key,
          stt: key,
          name: lv?.name || "-",
          data: lv,
          is_actived: lv?.is_actived == 0 ? "Vô hiệu hoá" : "Hoạt động",
          created_at: getTime?.Unix2StringFormat(lv?.created_at / 1000),
          updateAction: reload,
          actions: "-",
        }
      }) || []

    setDataSource(dataSource_)
  }, [userState?.list])

  if (!dataSource) return null

  return (
    <div className="h-full">
      <div className="h-full">
        <TableC
          title="Danh sách đội phương tiện"
          onReload={reload}
          // scroll={{
          //   useScroll: true,
          // }}
          search={{
            width: 200,
            onSearch(q) {
              dispatch?.(userPageAction?.setUserQSearch?.(q))
            },
            limitSearchLength: 3,
          }}
          right={
            <>
              {user?.is_team ? null : (
                <TeamAddModal
                  onSccess={() => {
                    reload?.()
                  }}
                  title={"Tạo đội phương tiện"}
                  userId={state?.userId}
                  button={
                    <Button type="default" size="small" icon={<PlusOutlined />}>
                      Tạo đội phương tiện
                    </Button>
                  }
                />
              )}
            </>
          }
          props={{
            loading: userState?.isLoading,
            columns: columns,
            dataSource: dataSource,
            size: "middle",
            pagination: {
              pageSize: userState?.param?.limit,
              total: userState?.totalPage * userState?.param?.limit,
              current: userState?.param?.offset + 1,
              onChange(page, pageSize) {
                dispatch?.(userPageAction?.setUserOffset(page - 1))
                dispatch?.(userPageAction?.setUserLimit(pageSize))
              },
            },
          }}
        />
      </div>
    </div>
  )
}
