import { Divider } from "antd"
import { CheckboxChangeEvent } from "antd/es/checkbox"
import type { CheckboxOptionType } from "antd/es/checkbox/Group"
import { Checkbox } from "antd"
import { useState } from "react"
const CheckboxGroup = Checkbox.Group

interface IPropsC {
  plainOptions: CheckboxOptionType[]
  defaultCheckedList?: string[]
  onChange: (list: string[]) => void
  allText?: string
}

export const GroupCheckboxC: React.FC<IPropsC> = ({
  plainOptions,
  defaultCheckedList,
  allText = "Tất cả",
  onChange,
}) => {
  const [checkedList, setCheckedList] = useState<string[]>(
    defaultCheckedList || [],
  )

  const checkAll = plainOptions.length === checkedList.length
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length
  const onChangeAll = (list: string[]) => {
    setCheckedList(list)
    onChange(list)
  }

  const onChange_ = (list: string[]) => {
    onChangeAll(list)
  }

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    const list = e.target.checked ? plainOptions?.map((i) => i.value) : []
    onChangeAll(list)
  }

  return (
    <>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        {allText}
      </Checkbox>
      <Divider
        style={{
          margin: "4px 0px",
        }}
      />
      <CheckboxGroup
        options={plainOptions}
        value={checkedList}
        onChange={onChange_}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        className="checkbox-group-c"
      />
    </>
  )
}
