import { Select, TreeSelect, TreeSelectProps } from "antd"
import { SelectProps } from "antd/lib"
import { useAppSelector } from "../../../app/hooks"
import { Key, memo, useEffect, useState } from "react"
import { DefaultOptionType } from "antd/es/select"
import { filterOptions } from "../../../utils/filterOptions"

interface IProps {
  props?: SelectProps
}

export const TeamPicker: React.FC<IProps> = ({ props = {} }) => {
  const childList = useAppSelector?.((state) => state?.user?.child?.row)

  const [options, setOption] = useState<DefaultOptionType[]>([])

  useEffect(() => {
    if (!options?.length && childList?.length) {
      const options_ = childList?.map?.((child) => {
        return {
          value: child?.customer_id,
          label: `${child?.customer_name} (${child?.username})`,
        }
      })

      setOption(options_)
    }
  }, [childList])

  return (
    <Select
      placeholder="Chọn Tk/Đội PT"
      filterOption={filterOptions?.select}
      options={options}
      {...props}
    />
  )
}

interface ITeamTreeSelect {
  defaulVal?: string[]
  onChangeKey?: (selectedKeys: Key[]) => void
  props?: TreeSelectProps
}

export const TeamTreeSelect: React.FC<ITeamTreeSelect> = memo(
  ({ defaulVal, onChangeKey, props }) => {
    const childList = useAppSelector?.((state) => state?.user?.child?.row)

    const userTreeChild = childList?.map?.((child) => {
      return {
        title: `${child?.customer_name} (${child?.username})`,
        key: child?.id,
        value: child?.customer_id,
      }
    })

    const vehicleTree = {
      title: "Tất cả",
      value: 0,
      key: 0,
      children: userTreeChild,
    }

    const tProps: any = {
      treeData: [vehicleTree],
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
          showCheckedStrategy={"SHOW_CHILD"}
          placeholder="Chọn TK/Đội"
          {...tProps}
          {...props}
        />
      </div>
    )
  },
)
