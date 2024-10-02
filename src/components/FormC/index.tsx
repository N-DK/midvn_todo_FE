import {
  Button,
  Checkbox,
  Col,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  TreeSelect,
} from "antd"
import { Rule } from "antd/es/form"
import { FormInstance, FormProps, InputProps } from "antd/lib"
import { ReactNode, forwardRef, useState } from "react"
import getTime from "../../utils/getTime"
import dayjs from "dayjs"
import { _array } from "../../utils/_array"
import { DefaultOptionType } from "antd/es/select"
const { RangePicker } = DatePicker
const { SHOW_PARENT, SHOW_ALL, SHOW_CHILD } = TreeSelect

export interface IFieldC {
  useKey?: string
  name: string
  type: string
  label: string
  placeholder?: string
  options?: {
    title: string
    value: string
  }[]
  style?: React.CSSProperties
  rules?: Rule[]
  onChange?: (e: any, name: string) => {}
  autoFill?: string
}

interface IProps {
  props?: FormProps
  fields: (IFieldC | null | string)[]
  initialValues?: {
    [key: string]: any
  }
  chunkWidth?: number
  chunk?: number
  formItemStyle?: React.CSSProperties
  onFinish?: (value: any) => void
  noteCom?: ReactNode
  layout?: "vertical" | "horizontal" | "inline"
}

export const FormC = forwardRef<FormInstance<any>, IProps>(
  (
    {
      props = {},
      fields = [],
      initialValues = {},
      formItemStyle = {},
      onFinish,
      noteCom,
      chunk = 2,
      chunkWidth = 250,
      layout = "vertical",
    },
    ref,
  ) => {
    const [valChange, setValChange] = useState<{ [key: string]: any }>({})

    const onFinish_ = (body: any) => {
      onFinish && onFinish(body)
    }

    const ITEMS = _array.chunkArray(fields, chunk)

    return (
      <div className="planform __app_form">
        <Form
          ref={ref}
          name={`${Math.random()}`}
          initialValues={initialValues}
          onFinish={onFinish_}
          layout={layout}
          autoComplete="off"
          onChange={(val) => {
            // console.log(val)
          }}
          {...props}
        >
          {ITEMS?.map((row, index) => {
            return (
              <Row className="gap-x-3" key={`row-${index}`}>
                {row?.map((item, index) => {
                  if (item == "hole") {
                    return <Col flex={`1 1 ${chunkWidth}px`} key={index}></Col>
                  }
                  if (item?.type == "title") {
                    return (
                      <div key={index} className="mb-4 font-semibold">
                        {item?.label}
                      </div>
                    )
                  }

                  if (!item) return null
                  const type = item?.type
                  const rules = item?.rules

                  return (
                    <Col flex={`1 1 ${chunkWidth}px`} key={index}>
                      <Form.Item
                        label={item?.label}
                        rules={rules || []}
                        name={item?.name}
                        style={formItemStyle}
                        getValueFromEvent={item?.getValueFromEvent}
                      >
                        {type == "colorPicker" && (
                          <ColorPicker className="w-10" style={item?.style} />
                        )}
                        {type == "input" && (
                          <Input
                            className={item?.className}
                            disabled={item?.disabled}
                            onChange={(e) => {
                              item?.onChange && item?.onChange(e, item?.name)
                            }}
                            addonAfter={item?.addonAfter}
                            placeholder={item?.placeholder}
                            autoComplete="off"
                          />
                        )}
                        {type == "inputPassword" && (
                          <Input.Password
                            onChange={(e) => {
                              item?.onChange && item?.onChange(e, item?.name)
                            }}
                            addonAfter={item?.addonAfter}
                            placeholder={item?.placeholder}
                            autoComplete="hidden"
                          />
                        )}
                        {type == "inputNumber" && (
                          <Input
                            id={item?.id}
                            className={item?.className}
                            disabled={item?.disabled}
                            onChange={(e) => {
                              item?.onChange && item?.onChange(e, item?.name)
                            }}
                            max={item?.max}
                            min={item?.min}
                            addonAfter={item?.addonAfter}
                            type="number"
                            placeholder={item?.placeholder}
                          />
                        )}
                        {type == "textarea" && (
                          <Input.TextArea
                            disabled={item?.disabled}
                            onChange={(e) => {
                              item?.onChange && item?.onChange(e, item?.name)
                            }}
                            placeholder={item?.placeholder}
                          />
                        )}
                        {type == "date" && (
                          <DatePicker
                            onChange={(
                              date: any,
                              dateStrings: string | string[],
                            ) => {
                              if (!date) return
                              const value = getTime?.String2Unit(
                                dayjs(date)?.toISOString(),
                              )

                              item?.onChange &&
                                item?.onChange(value, item?.name)
                            }}
                            style={{
                              width: "100%",
                            }}
                            format="YYYY/MM/DD HH:mm:ss"
                            showTime={{
                              defaultValue: dayjs(
                                getTime.currentC("HH:mm:ss"),
                                "HH:mm:ss",
                              ),
                            }}
                          />
                        )}
                        {type == "rangeTime" && (
                          <RangePicker
                            allowClear={false}
                            showTime
                            style={item?.style || {}}
                            format="YYYY/MM/DD HH:mm:ss"
                          />
                        )}
                        {type == "dateOnly" && (
                          <DatePicker
                            onChange={(
                              date: any,
                              dateStrings: string | string[],
                            ) => {
                              if (!date) return
                              const value = getTime?.String2Unit(
                                dayjs(date)?.toISOString(),
                              )

                              item?.onChange &&
                                item?.onChange(value, item?.name)
                            }}
                            style={{
                              width: "100%",
                            }}
                            placeholder={item?.placeholder || "Chọn ngày"}
                            format="YYYY/MM/DD"
                            showTime={false}
                          />
                        )}
                        {type == "treeSelectLevel" && (
                          <TreeSelect
                            filterTreeNode={(input, option) => {
                              return String(option?.title ?? "")
                                ?.toLowerCase()
                                .includes(input?.toLowerCase())
                            }}
                            showSearch
                            onSelect={(val) => {
                              setValChange((preVal) => ({
                                ...preVal,
                                [item?.name]: val,
                              }))
                            }}
                            maxTagCount="responsive"
                            // treeCheckable
                            treeDefaultExpandAll
                            showCheckedStrategy={"SHOW_CHILD"}
                            placeholder="Chọn Khách hàng / Tài khoản"
                            treeData={(() => {
                              return item?.treeData || []
                            })()}
                          />
                        )}
                        {type == "radio" && (
                          <Radio.Group disabled={item?.disabled}>
                            {item?.options?.map?.((option: any, index: any) => {
                              return (
                                <Radio key={index} value={option?.value}>
                                  {option?.title}
                                </Radio>
                              )
                            })}
                          </Radio.Group>
                        )}
                        {type == "checkbox" && (
                          <Form.Item>
                            <Checkbox>{item?.label}</Checkbox>
                          </Form.Item>
                        )}
                        {type == "select" && (
                          <Select
                            disabled={item?.disabled}
                            style={item?.style || {}}
                            onChange={item?.onChangeSelect}
                            showSearch
                            placeholder={item?.placeholder}
                            filterOption={(q, v) => {
                              const val = `${v?.children}`
                              return !!val
                                ?.toLocaleLowerCase?.()
                                ?.includes?.(q?.toLocaleLowerCase?.())
                            }}
                          >
                            {item?.options?.map?.(
                              (option: any, index: number) => {
                                return (
                                  <Select.Option
                                    key={index}
                                    value={option?.value}
                                  >
                                    {option?.title}
                                  </Select.Option>
                                )
                              },
                            )}
                          </Select>
                        )}

                        {type == "selectMultiple" && (
                          <>
                            <Select
                              style={item?.style || {}}
                              mode="multiple"
                              showSearch
                              placeholder={item?.placeholder}
                              filterOption={(q, v) => {
                                const val = `${v?.children}`
                                return !!val
                                  ?.toLocaleLowerCase?.()
                                  ?.includes?.(q?.toLocaleLowerCase?.())
                              }}
                            >
                              {item?.options?.map?.(
                                (option: any, index: number) => {
                                  return (
                                    <Select.Option
                                      key={index}
                                      value={option?.value}
                                    >
                                      {option?.title}
                                    </Select.Option>
                                  )
                                },
                              )}
                            </Select>
                          </>
                        )}
                      </Form.Item>
                      {item?.renderChange ? (
                        <div className="mb-4">
                          {item?.renderChange?.(valChange?.[item?.name])}
                        </div>
                      ) : null}
                    </Col>
                  )
                })}
              </Row>
            )
          })}
        </Form>
        <div>{noteCom || null}</div>
      </div>
    )
  },
)

interface ITreeSelectLevel {
  item: any
}

const TreeSelectLevel: React.FC<ITreeSelectLevel> = ({ item }) => {
  const [val, setVal] = useState()
  return (
    <>
      {item?.renderChange ? (
        <div className="mb-2">{item?.renderChange?.(val)}</div>
      ) : null}
      <TreeSelect
        filterTreeNode={(input, option) => {
          return String(option?.title ?? "")
            ?.toLowerCase()
            .includes(input?.toLowerCase())
        }}
        // onSelect={setVal}
        maxTagCount="responsive"
        // treeCheckable
        treeDefaultExpandAll
        showCheckedStrategy={"SHOW_CHILD"}
        placeholder="Chọn Khách hàng / Tài khoản"
        treeData={(() => {
          return item?.treeData || []
        })()}
      />
    </>
  )
}
