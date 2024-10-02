import { FC, memo, useContext, useEffect, useState } from "react"
import React from "react"
import { Button, Switch, Popconfirm } from "antd"
import { Tabs } from "antd"
import type { TabsProps } from "antd"
import { TableColumnsType } from "antd"
import ModalCreateRemind from "../modals/ModalCreateRemindMobile"
import { PopconfirmProps } from "antd/lib"
import ModalCreateTire from "../modals/ModalCreateTireMobile"
import { TireProps, VehicleType } from "../../interface/interface"
import { getTire } from "../../apis/tireAPI"
import { api } from "../../_helper"
import {
  AutoFinishRemind,
  getRemindSearch,
  getRemindVehicleGPS,
  TurnOffRemind,
  TurnOnRemind,
} from "../../apis/remindAPI"
import { MaskLoader } from "../Loader"
import getTime from "../../utils/getTime"
import moment from "moment"
import DrawCM from "../DrawC/DrawCM"
import { TableCM } from "../TableCM/TableCM"
import {
  BarcodeOutlined,
  DeleteOutlined,
  EditFilled,
  ExpandOutlined,
  PlusOutlined,
  TrademarkCircleOutlined,
} from "@ant-design/icons"
import { PiBellRingingBold } from "react-icons/pi"
import {
  RiChatHistoryFill,
  RiCheckLine,
  RiFolderSettingsFill,
  RiMapPinTimeLine,
} from "react-icons/ri"
import { GiCarWheel, GiPathDistance } from "react-icons/gi"
import { FaCarSide, FaUniversalAccess } from "react-icons/fa6"
import { AiOutlineDisconnect } from "react-icons/ai"
import { TbListDetails } from "react-icons/tb"
import { GrDocumentUser } from "react-icons/gr"
import { MdOutlineToggleOn } from "react-icons/md"
import { FaCheckCircle } from "react-icons/fa"
import {
  VehicleProviderContextProps,
  vehiclesContext,
} from "../../pages/manager/RemindMobile/providers/VehicleProvider"
import { _const } from "../../_constant"

export interface RemindProps {
  id?: number
  vehicle_id?: number
  license_plate?: string
  user_id?: number
  license?: string
  vehicle_create_time?: number
  vehicle_update_time?: number | null
  remind_id?: number
  remind_img_url?: string | null
  note_repair?: string
  history_repair?: string | null
  current_kilometers?: number
  cumulative_kilometers?: number
  expiration_time?: number
  time_before?: number
  is_notified: number
  is_received: number
  remind_create_time?: number
  remind_update_time?: number | null
  category_id?: number
  category_name: string
  category_desc?: string | null
  category_icon?: string | null
  category_create_time?: number
  category_update_time?: number
  category_is_deleted?: number
}

interface filterProps {
  select: string
  keyword: string
}
interface DrawVehicleProps {
  button: React.ReactNode
  title: string
  data: any
  setSelectedItems?: any
}

interface DetailVehicleComponentsProps {
  closeModal: any
  data: any
}

const TabTableRemind = memo(({ data, isReload }: any) => {
  const vehicleInfor = data
  const [reminds, setReminds] = useState<RemindProps[]>([])
  const [remindsFilter, setRemindsFilter] = useState<RemindProps[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { vehiclesStore } = useContext(
    vehiclesContext,
  ) as VehicleProviderContextProps
  const [filter, setFilter] = useState<filterProps>({
    select: "all",
    keyword: "",
  })

  const [loadingButton, setLoadingButton] = useState<number>(0)
  const [isShowModal, setIsShowModal] = useState(false)

  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    setIsShowModal(true)
  }

  const handleCancel = async (e: any, remind: any) => {
    try {
      setLoading(true)
      await AutoFinishRemind(remind?.remind_id, remind?.tire_seri)
      api.message?.success(_const?.string?.remind?.extendSuccess)
      fetchRemind()
      setLoading(false)
    } catch (error) {}
    cancel?.(e)
  }

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    setIsShowModal(false)
  }
  const onSearch = (q: string) => {
    setFilter({ ...filter, keyword: q })
  }

  const fetchRemind = async (keyword: string = "") => {
    // alert("re render remind")
    // call api get remind by vehicle id or license plate
    setLoading(true)
    const type = vehiclesStore?.type
    try {
      if (type == 0) {
        let res: any = []
        if (keyword) {
          res = await getRemindSearch(keyword, data?.license_plate)
        } else {
          res = await getRemindSearch(keyword, data?.license_plate)
        }
        const reminds = res?.data.filter(
          (item: any) => item?.remind_id !== null,
        )
        const remindsHandle = reminds.map((item: any) => ({
          ...item,
          expiration_timeStamp: moment(item?.expiration_time),
          expiration_time: getTime.formatDate(item?.expiration_time),
        }))
        setReminds(remindsHandle)
        setRemindsFilter(remindsHandle)
      } else {
        let res: any = []
        res = await getRemindVehicleGPS(data?.imei, keyword)
        const reminds = res?.data.filter(
          (item: any) => item?.remind_id !== null,
        )
        const remindsHandle = reminds.map((item: any) => ({
          ...item,
          expiration_timeStamp: moment(item?.expiration_time),

          expiration_time: getTime.formatDate(item?.expiration_time),
        }))
        setReminds(remindsHandle)
        setRemindsFilter(remindsHandle)
      }
      setLoading(false)
    } catch (error) {
      api.message?.error(_const?.string?.remind?.fetchRemindFailed)
    }
  }

  useEffect(() => {
    const selectType = filter.select
    const keyword = filter.keyword
    fetchRemind(keyword)
    // switch (selectType) {
    //   case "all":
    //     if (filter.keyword) {
    //       //
    //       setRemindsFilter(
    //         reminds.filter((item) => item.name.includes(filter.keyword)),
    //       )
    //       return
    //     }
    //     break
    //   case "finish":
    //     if (filter.keyword) {
    //       setRemindsFilter(
    //         reminds
    //           .filter((item) => item.name.includes(filter.keyword))
    //           .filter((item) => item.isFinish),
    //       )
    //       return
    //     }
    //     setRemindsFilter(reminds.filter((item) => item.isFinish))
    //     break
    //   case "noFinish":
    //     if (filter.keyword) {
    //       setRemindsFilter(
    //         reminds
    //           .filter((item) => item.name.includes(filter.keyword))
    //           .filter((item) => !item.isFinish),
    //       )
    //       return
    //     }
    //     setRemindsFilter(reminds.filter((item) => !item.isFinish))
    //     break
    //   default:
    //     break
    // }
  }, [filter.keyword, filter.select, isReload])
  //   column

  const handleOnOf = async (checked: boolean, data: RemindProps) => {
    //  call api bật tắt thông báo
    const remindId = data?.remind_id
    const notifyTitle = checked
      ? _const?.string?.remind?.turnOnNotifySuccess
      : _const?.string?.remind?.turnOffNotifySuccess
    try {
      setLoadingButton(remindId || 0)
      if (checked) {
        await TurnOnRemind(remindId || 0)
      } else {
        await TurnOffRemind(remindId || 0)
      }
      api.message?.success(notifyTitle)
      setLoadingButton(0)
    } catch (error) {
      console.log(error)
    }
  }

  const columns: TableColumnsType<RemindProps> = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Nội dung nhắc nhở",
      dataIndex: "note_repair",
      key: "note_repair",
      sorter: (a, b) =>
        (a.note_repair ?? "").length - (b.note_repair ?? "").length,
    },
    {
      title: "Dịch vụ",
      dataIndex: "category_name",
      key: "category_name",
      sorter: (a, b) => a.category_name.length - b.category_name.length,
    },
    {
      title: "Km",
      dataIndex: "cumulative_kilometers",
      key: "cumulative_kilometers",
    },
    {
      title: "Thời hạn",
      dataIndex: "expiration_time",
      key: "expiration_time",
    },
    {
      title: "Trạng thái",
      dataIndex: "is_notified",
      key: "is_notified",
    },

    {
      title: "Bật/tắt",
      dataIndex: "isOn",
      key: "isOn",
      render: (text, record, index) => (
        <Switch
          key={record?.remind_id}
          loading={record?.remind_id === loadingButton}
          checked={record?.is_notified === 0}
          onChange={(e) => {
            handleOnOf(e, record)
          }}
        />
      ),
    },
    {
      title: "Ngày hoàn thành",
      dataIndex: "dayFinish",
      key: "dayFinish",
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      render: (text, record, index) => (
        <ModalCreateRemind
          key={record?.remind_id}
          type="update"
          onReload={fetchRemind}
          remindData={record}
          button={<Button type="link">Cập nhật</Button>}
        />
      ),
    },
    {
      title: "Hoàn thành",
      dataIndex: "isFinish",
      key: "isFinish",
      render: (text, record, index) => (
        <Popconfirm
          key={record?.remind_id}
          title="Xác nhận hoàn thành nhắc nhở"
          description="Bạn có muốn cập nhật thông tin cho chu kì tiếp theo không?"
          onConfirm={confirm}
          onCancel={(e) => handleCancel(e, record)}
          okText={
            <ModalCreateRemind
              type="update-cycle"
              onReload={fetchRemind}
              remindData={record}
              button={<span>Đồng ý</span>}
            />
          }
          cancelText="No"
        >
          <Button>Hoàn thành</Button>
        </Popconfirm>
      ),
    },
  ]

  return (
    <>
      <p className="absolute top-[-120px]"> </p>
      {loading && <MaskLoader />}
      <TableCM
        title="Danh sách nhắc nhở"
        hiddenTitle
        onReload={() => {
          fetchRemind()
        }}
        hiddenColumnPicker
        search={{
          placeholder: "Tìm kiếm tên, dịch vụ,...",
          width: 200,
          onSearch(q) {
            onSearch(q)
          },
        }}
        props={{}}
      >
        <div style={{ overflow: "overlay" }} className="h-[400px]">
          {remindsFilter?.map((item: any, index) => {
            return (
              <div className="border rounded-md p-4 pt-5 pb-5 py-1 my-2">
                <div className="flex items-center">
                  <div className="max-w-max">
                    <p className="" style={{ fontSize: "30px" }}>
                      {item?.icon ?? item.category_icon}
                    </p>
                  </div>
                  <div className="flex-1 ml-4">
                    <div className="flex justify-between w-full">
                      <div className="mr-5">
                        <p className="flex items-center mb-2">
                          <PiBellRingingBold
                            className="flex-shrink-0"
                            size={18}
                          />
                          <span className="ml-2 truncate max-w-[75px]">
                            {item?.note_repair}
                          </span>
                        </p>
                        <p className="flex items-center mb-2">
                          <RiFolderSettingsFill size={18} />
                          <span className="ml-2 truncate max-w-[75px]">
                            {item?.name}
                          </span>
                        </p>
                        <p className="flex items-center mb-2">
                          <GiPathDistance size={18} />
                          <span className="ml-2">
                            {item?.cumulative_kilometers}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="flex items-center mb-2">
                          <FaUniversalAccess size={18} />
                          <span className="ml-2">{item?.is_notified}</span>
                        </p>
                        <p className="flex items-center mb-2">
                          <RiMapPinTimeLine size={18} />
                          <span className="ml-2">{item?.expiration_time}</span>
                        </p>
                        <p className="flex items-center mb-2">
                          <RiChatHistoryFill size={18} />
                          <span className="ml-2">
                            {item?.complete_date ?? "-"}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex">
                        <Popconfirm
                          title="Xác nhận hoàn thành nhắc nhở"
                          description="Bạn có muốn cập nhật thông tin cho chu kì tiếp theo không?"
                          onConfirm={confirm}
                          onCancel={(e) => handleCancel(e, item)}
                          okText={
                            <ModalCreateRemind
                              type="update"
                              onReload={fetchRemind}
                              remindData={item}
                              button={<span>OK</span>}
                            />
                          }
                          cancelText="No"
                        >
                          <Button className=" mr-2">
                            <RiCheckLine />
                          </Button>
                        </Popconfirm>

                        <ModalCreateRemind
                          type="update"
                          onReload={fetchRemind}
                          remindData={item}
                          button={
                            <Button className="">
                              <EditFilled />
                            </Button>
                          }
                        />
                      </div>
                      <Switch
                        loading={item?.remind_id === loadingButton}
                        checked={item?.is_notified === 0}
                        onChange={(e) => {
                          handleOnOf(e, item)
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </TableCM>
    </>
  )
})

export const TabTableTire: FC<{
  isAddTireButton?: boolean
  data: VehicleType | TireProps
  isReload?: number
  onReFresh?: () => void
}> = ({ data, isReload, isAddTireButton, onReFresh }) => {
  const columns: TableColumnsType<TireProps> = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Số seri",
      dataIndex: "seri",
      key: "seri",
    },
    {
      title: "Nhãn hiệu",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Kích thước",
      dataIndex: "size",
      key: "size",
    },

    {
      title: "Thao tác",
      dataIndex: "isOn",
      key: "isOn",
      render: (text, record, index) => (
        <div key={record?.seri} className="flex justify-start">
          <ModalCreateTire
            onRefresh={() => {
              fetchTire()
              onReFresh?.()
            }}
            button={<Button type="link">Cập nhật</Button>}
            type="update"
            data={record}
          />
          <ModalCreateTire
            onRefresh={() => {
              fetchTire()
              onReFresh?.()
            }}
            button={<Button type="link">Xóa</Button>}
            type="delete"
            data={record}
          />
        </div>
      ),
    },
  ]
  const [tires, setTires] = useState<TireProps[]>([])
  const [keyword, setKeyword] = useState<string>("")
  console.log("keyword", keyword)

  const fetchTire = async (keyword: string = "") => {
    try {
      const res = await getTire(
        data?.imei ? data?.imei : data?.license_plate || "",
        keyword,
      )
      setTires(res?.data)
    } catch (error) {}
  }
  useEffect(() => {
    fetchTire(keyword)
  }, [isReload, keyword])

  return (
    <div>
      <TableCM
        hiddenTitle
        title="123"
        hiddenColumnPicker
        search={{
          placeholder: "Tìm kiếm seri, nhãn hiệu",
          width: 200,
          onSearch(q) {
            setKeyword(q)
          },
          limitSearchLength: 3,
        }}
        onReload={() => {
          fetchTire()
        }}
        props={{}}
      >
        <div className="absolute -bottom-[38px] right-14">
          <ModalCreateTire
            data={data}
            onRefresh={() => {
              fetchTire()
            }}
            button={
              <Button
                type="primary"
                size="large"
                className="rounded-full"
                icon={<GiCarWheel size={18} />}
              />
            }
            type="add"
          />
        </div>
        <div style={{ overflow: "overlay" }} className="h-[400px]">
          {tires?.map((item, index) => (
            <div className="border rounded-md p-3 py-1 my-1">
              <div className="flex items-center">
                <div className="w-[40%]">
                  <img
                    width={"100%"}
                    src="https://thumbs.dreamstime.com/b/tire-icon-vector-design-template-white-background-can-use-web-business-card-etc-tire-icon-vector-design-template-white-264967256.jpg"
                  />
                </div>
                <div className="flex-1 ml-4">
                  <p className="mb-1">
                    <BarcodeOutlined size={18} />{" "}
                    <span className="ml-2">{item?.seri}</span>
                  </p>
                  <p className="mb-1">
                    <TrademarkCircleOutlined size={18} />{" "}
                    <span className="ml-2">{item?.brand}</span>
                  </p>
                  <p className="mb-1">
                    <ExpandOutlined size={18} />{" "}
                    <span className="ml-2">{item?.size}</span>
                  </p>
                  <div className="flex justify-end w-full">
                    <ModalCreateTire
                      onRefresh={() => {
                        fetchTire()
                      }}
                      button={
                        <Button className="float-right mr-2">
                          <DeleteOutlined />
                        </Button>
                      }
                      type="delete"
                      data={item}
                    />

                    <ModalCreateTire
                      onRefresh={() => {
                        fetchTire()
                      }}
                      button={
                        <Button className="float-right">
                          <EditFilled />
                        </Button>
                      }
                      type="update"
                      data={item}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </TableCM>
    </div>
  )
}
const DetailVehicleComponents: FC<DetailVehicleComponentsProps> = ({
  closeModal,
  data,
}: any) => {
  useEffect(() => {
    // alert('xin chao')
  }, [])
  const vehicleInfor = data

  const [isReload, setIsReload] = useState<number>(0)

  const onReload = () => {
    setIsReload(Math.random())
  }
  const items = (reload: () => void): TabsProps["items"] => [
    {
      key: "2",
      label: "Nhắc nhở của phương tiện",
      children: <TabTableRemind isReload={isReload} data={vehicleInfor} />,
    },
    {
      key: "3",
      label: "Lốp của phương tiện",
      children: <TabTableTire isAddTireButton data={vehicleInfor} />,
    },
  ]

  return (
    <div className="relative overflow-x-hidden h-full">
      <div className="absolute z-50 right-[10px] bottom-[0px]">
        <ModalCreateRemind
          onReload={onReload}
          button={
            <Button
              type="primary"
              size="large"
              className="rounded-full"
              icon={<PlusOutlined />}
            />
          }
        />
      </div>
      {/* NDK có sửa chỗ này */}
      <div className="">
        <Tabs items={items(onReload)} />
        {/* <Button onClick={closeModal}>Đóng</Button> */}
      </div>
    </div>
  )
}

const DrawVehicle: FC<DrawVehicleProps> = ({
  button,
  title,
  data,
  setSelectedItems,
}) => {
  return (
    <DrawCM
      setSelectedItems={setSelectedItems}
      title={
        <p>
          Cài đặt nhắc nhở phương tiện : <b>{data?.license_plate}</b>
        </p>
      }
      button={button}
      data={data}
      children={(action) => <DetailVehicleComponents {...action} />}
    />
  )
}

export default DrawVehicle
