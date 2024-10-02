import { FC, memo, useContext, useEffect, useState } from "react"
import React from "react"
import {
  Button,
  Form,
  Switch,
  Select,
  Checkbox,
  Popconfirm,
  message,
} from "antd"
import DrawC from "../DrawC/DrawC"
import { Tabs } from "antd"
import type { TabsProps } from "antd"
import { TableC } from "../TableC"
import { TableColumnsType } from "antd"
import ModalCreateRemind from "../modals/ModalCreateRemind"
import { PopconfirmProps } from "antd/lib"
import ModalCreateTire from "../modals/ModalCreateTire"
import { use } from "i18next"
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
import {
  VehicleProviderContextProps,
  vehiclesContext,
} from "../../pages/manager/Remind/providers/VehicleProvider"
import { MaskLoader } from "../Loader"
import getTime from "../../utils/getTime"
import moment from "moment"
import { _const } from "../../_constant"
import { PiPlusCircle } from "react-icons/pi"
import ModalShowImage from "../modals/ModalShowImage"

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
  thumbnail_urls?: string
}

interface filterProps {
  select: string
  keyword: string
}
interface DrawVehicleProps {
  button: React.ReactNode
  title: string
  data: any
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
  const { vehiclesStore, dispatch } = useContext(
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
      await AutoFinishRemind(remind?.remind_id, remind?.tire_seri)
      api.message?.success(_const?.string?.remind.extendSuccess)
      fetchRemind()
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
    setLoading(true)
    dispatch?.setLoading?.(true)
    const type = vehiclesStore?.type
    try {
      if (type == 0) {
        let res: any = []
        res = await getRemindSearch(keyword, data?.license_plate)
        const reminds = Array.isArray(res?.data)
          ? res?.data?.filter((item: any) => {
              return (
                item?.remind_id !== null &&
                item?.category_parent === vehiclesStore?.categoryParent
              )
            })
          : []

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
        const reminds = Array.isArray(res?.data)
          ? res?.data?.filter(
              (item: any) =>
                item?.remind_id !== null &&
                item?.category_parent === vehiclesStore?.categoryParent,
            )
          : []
        const remindsHandle = reminds.map((item: any) => ({
          ...item,
          expiration_timeStamp: moment(item?.expiration_time),
          expiration_time: getTime.formatDate(item?.expiration_time),
        }))
        setReminds(remindsHandle)
        setRemindsFilter(remindsHandle)
      }
      dispatch?.setLoading?.(false)
      setLoading(false)
    } catch (error) {
      api.message?.error(_const?.string?.remind?.fetchRemindFailed)
    }
  }

  useEffect(() => {
    const keyword = filter.keyword
    fetchRemind(keyword)
  }, [filter.keyword, filter.select, isReload])
  //   column

  const handleOnOf = async (checked: boolean, data: RemindProps) => {
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
      fetchRemind()
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
      title: "Bật/tắt",
      dataIndex: "isOn",
      key: "isOn",
      render: (text, record, index) => {
        return (
          <Switch
            key={record?.remind_id}
            loading={record?.remind_id === loadingButton}
            checked={record?.is_notified === 0 ? true : false}
            onChange={(e) => {
              handleOnOf(e, record)
            }}
          />
        )
      },
    },

    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      width: 150,
      render: (text, record, index) => (
        <div key={record?.remind_id} className="flex items-center ">
          <ModalCreateRemind
            type="update"
            onReload={fetchRemind}
            remindData={record}
            button={<Button type="link">Cập nhật</Button>}
          />
          <ModalCreateRemind
            type="delete"
            onReload={fetchRemind}
            remindData={record}
            button={<Button type="link">Hủy lịch hẹn</Button>}
          />
          <ModalCreateRemind
            type="copy"
            onReload={fetchRemind}
            remindData={record}
            button={<Button type="link">Copy lịch hẹn</Button>}
          />
          <ModalShowImage
            // type="image"
            // onReload={fetchRemind}
            type={vehiclesStore?.type}
            vehicleSelected={vehiclesStore?.vehiclesStore}
            remindData={record}
            button={<Button type="link">Xem hình ảnh</Button>}
          />
        </div>
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
              isUpdateCycleForm
              type="update-cycle"
              onReload={fetchRemind}
              remindData={record}
              button={<span>OK</span>}
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
      <TableC
        title="Danh sách nhắc nhở"
        hiddenTitle
        onReload={() => {
          fetchRemind()
        }}
        search={{
          placeholder: "Tìm kiếm nội dung, dịch vụ, kilômét",
          width: 280,
          onSearch(q) {
            onSearch(q)
          },
        }}
        right={<div className=""></div>}
        props={{
          columns: columns,
          dataSource: remindsFilter,
          size: "middle",
          pagination: {},
        }}
      />
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
            button={<Button type="link">Tạo bản sao</Button>}
            type="add"
            data={{
              ...record,
              seri: `${record.seri}-copy`,
              brand: `${record.brand}-copy`,
              size: `${record.size}-copy`,
            }}
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
  const [loading, setLoading] = useState<boolean>(false)
  const fetchTire = async (keyword: string = "") => {
    try {
      setLoading(true)
      const res = await getTire(
        data?.imei ? data?.imei : data?.license_plate || "",
        keyword,
      )
      setTires(res?.data)
      setLoading(false)
    } catch (error) {}
  }
  useEffect(() => {
    fetchTire(keyword)
  }, [isReload, keyword])

  return (
    <div>
      {loading && <MaskLoader />}
      <TableC
        hiddenTitle
        title="123"
        search={{
          placeholder: "Tìm kiếm seri, nhãn hiệu, kích thước",
          width: 280,
          onSearch(q) {
            setKeyword(q)
          },
        }}
        onReload={() => {
          fetchTire()
          onReFresh?.()
        }}
        right={
          <div className="ml-5 flex items-center absolute right-[470px]">
            {isAddTireButton && (
              <ModalCreateTire
                data={data}
                onRefresh={() => {
                  fetchTire()
                  onReFresh?.()
                }}
                button={<Button type="primary">Thêm lốp</Button>}
                type="add"
              />
            )}
          </div>
        }
        props={{
          columns: columns,
          dataSource: tires,
          size: "middle",
          pagination: {},
        }}
      />
    </div>
  )
}
const DetailVehicleComponents: FC<DetailVehicleComponentsProps> = ({
  closeModal,
  data,
}: any) => {
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
    <div className="relative">
      <div className="absolute z-50 left-[350px] top-[11px]">
        <ModalCreateRemind
          onReload={onReload}
          button={
            <Button
              style={{ display: "flex", alignItems: "center" }}
              icon={<PiPlusCircle size={18} />}
              type="primary"
            >
              Thêm
            </Button>
          }
        />
      </div>
      <div className="mt-10">
        <Tabs items={items(onReload)} />
      </div>
    </div>
  )
}

const DrawVehicle: FC<DrawVehicleProps> = ({ button, title, data }) => {
  return (
    <DrawC
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
