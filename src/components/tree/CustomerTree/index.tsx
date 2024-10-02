import { AutoComplete, Select, Spin, Tree, TreeSelect } from "antd"
import { useAppSelector } from "../../../app/hooks"
import ForwardDirectoryTree, { ExpandAction } from "antd/es/tree/DirectoryTree"
import { DownOutlined, UserAddOutlined } from "@ant-design/icons"
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai"
import { _array } from "../../../utils/_array"
import { memo, useEffect, useMemo, useState } from "react"
import { IUserChildAntdFormat } from "../../../_types/userType"
import { Key } from "antd/es/table/interface"
import { SearchInput } from "../../SearchBar"
import { checker } from "../../../utils/checker"
import { store } from "../../../app/store"
import { TreeSelectProps } from "antd/lib"
import { filterOptions } from "../../../utils/filterOptions"
const { SHOW_PARENT, SHOW_ALL } = TreeSelect

interface IProps {
  userIdSelected: number
  onChangeKey?: (selectedKeys: Key[]) => void
}

export const CustomerTree: React.FC<IProps> = memo(
  ({ userIdSelected, onChangeKey }) => {
    const userRow = useAppSelector((state) => state?.user?.child?.row)
    const userInfo = useAppSelector((state) => state?.user?.access?.userInfo)

    const [q, setQ] = useState<string>("")
    const [selectedKey, setSelectedKey] = useState<Key[]>()
    const [userTree, setUserTree] = useState<IUserChildAntdFormat>()

    const options = useMemo(() => {
      const returnArr = userRow?.map?.((user, index) => ({
        value: user?.id,
        label: `${user?.customer_name} (${user?.username})`,
      }))

      returnArr?.unshift?.({
        value: userInfo?.id || -1,
        label: `${userInfo?.customer_name} (${userInfo?.username})`,
      })
      return returnArr
    }, [userRow])

    const onSearch = (val: string) => {
      setQ(val)
    }

    useEffect(() => {
      const row = q
        ? [...(userRow || [])]?.filter?.((u) =>
            checker?.includeStringKey?.(`${u?.username}${u?.customer_name}`, q),
          )
        : [...(userRow || [])]
      const userTree_ = _array.userChildTree(row)
      setUserTree(userTree_?.childAntd)
    }, [q, userRow])

    useEffect(() => {
      if (selectedKey && selectedKey?.[0] != userIdSelected) {
        onChangeKey?.(selectedKey)
      }
    }, [selectedKey?.[0]])

    if (!userTree) return <Spin></Spin>
    return (
      <div className="h-full flex flex-col ">
        <div className="px-2 pt-2">
          {/* <SearchInput
            debounce={200}
            onSearch={onSearch}
            placeholder="Tài khoản/Tên"
          /> */}

          <Select
            placeholder="Tài khoản/Tên"
            filterOption={filterOptions?.select}
            showSearch
            options={options}
            onSelect={(val) => {
              setSelectedKey([val])
            }}
            style={{
              width: "100%",
            }}
          />
        </div>
        <div className="flex-1 overflow-auto px-2 py-2">
          <ForwardDirectoryTree
            showLine
            onSelect={(key) => {
              setSelectedKey(key)
            }}
            selectedKeys={[userIdSelected]}
            showIcon={true}
            defaultExpandedKeys={[
              store?.getState?.()?.user?.access?.userInfo?.id || 999999,
            ]}
            // expandedKeys={[userIdSelected]}
            expandAction={"doubleClick"}
            // defaultExpandAll
            treeData={[userTree || {}]}
            switcherIcon={(e: any) => {
              const expanded = e?.expanded
              return (
                <div className="text-root_text_gray_blue_color w-full h-full flex justify-center items-center">
                  {expanded ? <AiFillMinusSquare /> : <AiFillPlusSquare />}
                </div>
              )
            }}
          />
        </div>
      </div>
    )
  },
)

interface ICustomerTreeSelect {
  defaulVal?: string[]
  onChangeKey?: (selectedKeys: Key[]) => void
  props?: TreeSelectProps
}

export const CustomerTreeSelect: React.FC<ICustomerTreeSelect> = memo(
  ({ defaulVal, onChangeKey, props }) => {
    const userRow = useAppSelector((state) => state?.user?.child?.row)

    const [userTree, setUserTree] = useState<IUserChildAntdFormat>()

    useEffect(() => {
      const userTree_ = _array.userChildTree(userRow || [])
      setUserTree(userTree_?.childAntd)
    }, [userRow])

    if (!userTree) return <Spin></Spin>

    const tProps: any = {
      treeData: [userTree],
    }

    return (
      <div className="w-full flex flex-col ">
        <TreeSelect
          filterTreeNode={(input, option) => {
            return String(option?.title ?? "")
              ?.toLowerCase()
              .includes(input?.toLowerCase())
          }}
          onChange={onChangeKey}
          maxTagCount="responsive"
          listHeight={500}
          treeCheckable
          treeDefaultExpandAll
          showCheckedStrategy={"SHOW_ALL"}
          placeholder="Chọn Khách hàng / Tài khoản"
          {...tProps}
          {...props}
        />
      </div>
    )
  },
)
