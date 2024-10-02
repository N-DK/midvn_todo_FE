import { Select, TreeSelect, TreeSelectProps } from "antd"
import { SelectProps } from "antd/lib"
import { useAppSelector } from "../../../app/hooks"
import { Key, memo, useEffect, useState } from "react"
import { DefaultOptionType } from "antd/es/select"
import { filterOptions } from "../../../utils/filterOptions"
import { IVehicleRealTime } from "../../../_types/deviceType"
import { DriverType } from "../../../_types/driverType"

interface IProps {
  props?: SelectProps
  filter?: (vehicle: DriverType) => boolean
}

export const DriverPicker: React.FC<IProps> = ({ props = {}, filter }) => {
  const driverList = useAppSelector?.((state) => state?.user?.driver?.list)

  const [options, setOption] = useState<DefaultOptionType[]>([])

  useEffect(() => {
    if ((!options?.length && driverList?.length) || true) {
      const options_ =
        driverList
          ?.filter?.((driver, index) => {
            return filter ? filter(driver) : true
          })
          ?.map?.((driver) => {
            return {
              title: `${driver?.name} - ${driver?.license_number} - ${driver?.phone}`,
              value: driver?.license_number,
            }
          }) || []

      setOption(options_)
    }
  }, [driverList, filter])
  return (
    <Select
      placeholder="Chọn lái phương tiện"
      filterOption={filterOptions?.select}
      options={options}
      {...props}
    />
  )
}

interface IVehicleTreeSelect {
  defaulVal?: string[]
  onChangeKey?: (selectedKeys: Key[]) => void
  props?: TreeSelectProps
  filter?: (vehicle: DriverType) => boolean
}

export const DriverTreeSelect: React.FC<IVehicleTreeSelect> = memo(
  ({ defaulVal, onChangeKey, props, filter }) => {
    const userRow = useAppSelector((state) => state?.user?.child?.row)

    const driverList = useAppSelector?.((state) => state?.user?.driver?.list)

    const vehicleTreeChild = driverList
      ?.filter?.((device, index) => {
        return filter ? filter(device) : true
      })
      ?.map?.((v) => {
        return {
          title: `${v?.name} - ${v?.license_number}`,
          key: v?.license_number,
          value: v?.license_number,
        }
      })

    const vehicleTree = {
      title: "Tất cả",
      value: 0,
      key: 0,
      children: vehicleTreeChild,
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
          placeholder="Chọn lái phương tiện"
          {...tProps}
          {...props}
        />
      </div>
    )
  },
)
