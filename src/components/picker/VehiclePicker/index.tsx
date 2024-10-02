import { Select, TreeSelect, TreeSelectProps } from "antd"
import { SelectProps } from "antd/lib"
import { useAppSelector } from "../../../app/hooks"
import { Key, memo, useEffect, useState } from "react"
import { DefaultOptionType } from "antd/es/select"
import { filterOptions } from "../../../utils/filterOptions"
import { IVehicleRealTime } from "../../../_types/deviceType"

interface IProps {
  props?: SelectProps
  filter?: (vehicle: IVehicleRealTime) => boolean
}

export const VehiclePicker: React.FC<IProps> = ({ props = {}, filter }) => {
  const deviceList = useAppSelector?.(
    (state) => state?.device?.data?.online?.array,
  )

  const [options, setOption] = useState<DefaultOptionType[]>([])

  useEffect(() => {
    if ((!options?.length && deviceList?.length) || true) {
      const options_ = deviceList
        ?.filter?.((device, index) => {
          return filter ? filter(device) : true
        })
        ?.map?.((device) => {
          return {
            value: device?.imei,
            label: `${device?.vehicle_name} - ${device?.imei}`,
          }
        })

      setOption(options_)
    }
  }, [deviceList, filter])
  return (
    <Select
      placeholder="Chọn phương tiện"
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
  filter?: (vehicle: IVehicleRealTime) => boolean
}

export const VehicleTreeSelect: React.FC<IVehicleTreeSelect> = memo(
  ({ defaulVal, onChangeKey, props, filter }) => {
    const userRow = useAppSelector((state) => state?.user?.child?.row)

    const deviceList = useAppSelector?.(
      (state) => state?.device?.data?.online?.arrayStatic,
    )

    const vehicleTreeChild = deviceList
      ?.filter?.((device, index) => {
        return filter ? filter(device) : true
      })
      ?.map?.((v) => {
        return {
          title: `${v?.vehicle_name} - ${v?.imei}`,
          key: v?.imei,
          value: v?.imei,
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
          placeholder="Chọn TB/PT"
          {...tProps}
          {...props}
        />
      </div>
    )
  },
)
