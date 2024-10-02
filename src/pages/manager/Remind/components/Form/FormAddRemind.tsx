import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  TreeSelect,
} from "antd"
import TextArea from "antd/es/input/TextArea"
import { useContext, useEffect, useState, forwardRef, useRef } from "react"
import {
  CategoryType,
  TireProps,
  VehicleType,
} from "../../../../../interface/interface"
import ModalCreateTire from "../../../../../components/modals/ModalCreateTire"
import { Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { getCategory } from "../../../../../apis/categoryAPI"
import { api } from "../../../../../_helper"
import { getTire } from "../../../../../apis/tireAPI"
import MultiDateTimePicker from "./MultiRangeDateWithTimePickerProps"
import { getTimeRemind, getVehicleById } from "../../../../../apis/remindAPI"
import { MaskLoader } from "../../../../../components/Loader"

import { FilePond, registerPlugin } from "react-filepond"
import "filepond/dist/filepond.min.css"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size"
registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
)
import { _log } from "../../../../../utils/_log"
import dayjs from "dayjs"
const SERVER_DOMAIN_REMIND = import.meta.env.VITE_HOST_REMIND_SERVER_DOMAIN_IMG
import "./filePond.css"
import {
  VehicleProviderContextProps,
  vehiclesContext,
} from "../../providers/VehicleProvider"
import { _const } from "../../../../../_constant"
import {
  getVehicle,
  getVehicleGPS,
  getVehicleNoGPS,
} from "../../../../../apis/vehicleAPI"

interface FormAddRemindProps {
  isUpdateCycleForm?: boolean
  vehicleSelected?: VehicleType[]
  initialValues?: any
  onSubmit: (formData: any, callback: any, images: any) => void
  isCopyForm?: boolean
}

const CATEGORY_PARENT: any = {
  0: {
    name: "Danh mục giấy tờ",
    expiration_time: "Hạn giấy tờ",
    schedules: "Lịch hẹn nhắc nhở",
    cycle: "Lịch hẹn gia hạn nhắc nhở",
  },
  1: {
    name: "Danh mục bảo dưỡng",
    cumulative_kilometers: "Định mức bảo dưỡng",
    km_before: "Cảnh báo trước",
    cycle: "Gia hạn lịch hẹn nhắc bảo dưỡng",
    expiration_time: "Định mức giờ bảo dưỡng",
    schedules: "Lịch hẹn nhắc bảo dưỡng",
  },
}

const TIRE_CATE_ID = 6
const { SHOW_CHILD } = TreeSelect

const FormAddRemind = forwardRef<HTMLButtonElement, FormAddRemindProps>(
  (
    {
      onSubmit,
      initialValues,
      vehicleSelected,
      isUpdateCycleForm,
      isCopyForm = false,
    },
    ref,
  ) => {
    const [isName, setIsName] = useState<boolean>(false)
    const [isTireSelect, setIsTireSelect] = useState<boolean>(false)
    const [tires, setTires] = useState<any[]>([])
    const [categories, setCategories] = useState<CategoryType[]>([])
    const { vehiclesStore } = useContext(
      vehiclesContext,
    ) as VehicleProviderContextProps
    const [vehicleTire, setVehicleTire] = useState<VehicleType | null>(null)
    const [timeSelect, setTimeSelect] = useState<any[]>([])
    const buttonDateRef = useRef<HTMLButtonElement>(null)
    const [randomKey, setRandomKey] = useState<number>(Math.random())
    const [imageFiles, setImageFiles] = useState<any[]>([])
    const [schedules, setSchedules] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [vehicleCopy, setVehicleCopy] = useState<any[]>([])
    const [imageFilesUrl, setImageFilesUrl] = useState<any[]>([])
    const [form] = Form.useForm()
    const initImageURL = initialValues?.remind_img_url || initialValues?.img_url

    const convertUrlsToFiles = async (urls: string[]) => {
      return Promise.all(
        urls.map(async (url) => {
          const response = await fetch(url)
          const blob = await response.blob()
          const file = new File([blob], url.split("/").pop() || "file", {
            type: blob.type,
          })
          return {
            source: url,
            options: {
              type: "local",
              file: file,
            },
          }
        }),
      )
    }

    useEffect(() => {
      if (initImageURL && !isCopyForm) {
        const loading = async () => {
          const urls = initImageURL
            .split(",")
            ?.filter((url: string) =>
              url.includes(
                (vehiclesStore?.type == 1
                  ? vehicleSelected?.[0]?.imei
                  : vehicleSelected?.[0]?.license_plate) as string,
              ),
            )
            ?.map((url: string) => `${SERVER_DOMAIN_REMIND}${url.trim()}`)
          const files = await convertUrlsToFiles(urls)
          setImageFilesUrl(files)
        }
        loading()
      }
    }, [initImageURL, isCopyForm])

    useEffect(() => {
      if (initialValues?.remind_category_id == TIRE_CATE_ID) {
        setIsTireSelect(true)
      }
    }, [initialValues?.remind_category_id])

    useEffect(() => {
      const fetchTime = async (id: number) => {
        try {
          const res = await getTimeRemind(id)
          if (res.data.length > 0) {
            setSchedules(res?.data)
          }
        } catch (error) {
          console.log("error time >>>", error)
        }
      }

      if (initialValues?.remind_id) {
        fetchTime(initialValues?.remind_id)
      }
    }, [initialValues?.remind_id])

    const fetchTire = async () => {
      try {
        const license_plate =
          vehiclesStore?.type == 1
            ? vehicleTire?.imei
            : vehicleTire?.license_plate
        const res = await getTire(license_plate ?? "", "")

        setTires(res?.data)
      } catch (error) {
        api.message?.error(_const?.string?.remind?.fetchTireFailed)
      }
    }

    const fetchCategory = async () => {
      try {
        setLoading(true)
        const res = await getCategory()
        setLoading(false)

        if ((vehicleSelected?.length ?? 0) > 1) {
          const newRes = res?.data
            .filter(
              (item: CategoryType) =>
                item.category_parent == vehiclesStore.categoryParent,
            )
            .filter((item: CategoryType) => item.id != TIRE_CATE_ID)
          setCategories(newRes)
        } else {
          setCategories(
            res?.data.filter(
              (item: CategoryType) =>
                item.category_parent == vehiclesStore.categoryParent,
            ),
          )
        }
      } catch (error) {
        setLoading(false)
        api.message?.error(_const?.string?.remind?.fetchRemindFailed)
      }
    }

    useEffect(() => {
      fetchCategory()
    }, [vehiclesStore.categoryParent])

    useEffect(() => {
      if (isCopyForm && initialValues?.remind_id) {
        const fetchVehicleCopy = async () => {
          try {
            const [res, resVehicleGPS] = await Promise.all([
              getVehicleById(initialValues?.remind_id),
              vehiclesStore?.type === 1 ? getVehicleGPS() : getVehicleNoGPS(),
            ])

            const vehicleCopy = resVehicleGPS?.filter(
              (item: any) => !res.data.includes(item?.imei),
            )

            setVehicleCopy(vehicleCopy)
          } catch (error) {
            console.log("error vehicle copy >>>", error)
          }
        }
        fetchVehicleCopy()
      }
    }, [isCopyForm, initialValues?.remind_id])

    useEffect(() => {
      if (categories?.length > 0) {
        if (Object.keys(initialValues).length === 0) {
          form.setFieldsValue({
            is_notified: true,
            note_repair: "Nội dung nhắc nhở !!!",
          })
        } else {
          initialValues.expiration_time = isUpdateCycleForm
            ? dayjs(Date.now()).add(initialValues?.cycle, "months")
            : initialValues?.expiration_time

          const tire = initialValues?.tire || initialValues?.tire_seri
          if (tire) {
            handleSelectVehicle(
              vehiclesStore.type === 1
                ? vehiclesStore?.vehiclesStore[0]?.imei ?? ""
                : vehiclesStore?.vehiclesStore[0]?.license_plate ?? "",
            )
          }
          form.setFieldsValue({
            ...initialValues,
            expiration_time: dayjs(initialValues?.expiration_time),
            remind_category_id: initialValues?.remind_category_id,
            cycle: initialValues?.cycle,
            note_repair: initialValues?.note_repair,
            vehicles:
              isCopyForm && !isTireSelect
                ? []
                : vehiclesStore?.vehiclesStore[0]?.license_plate,
            tire_seri: tire,
            is_notified: initialValues?.is_notified == 0 ? true : false,
          })
        }
      }
    }, [categories?.length, initialValues])

    useEffect(() => {
      if (imageFiles.length > 10 || imageFilesUrl.length > 10) {
        api?.message?.error("Tải lên không quá 10 ảnh")
      }
    }, [imageFiles.length, imageFilesUrl.length])

    useEffect(() => {
      if (timeSelect.length > 0) {
        form.setFieldValue("schedules", timeSelect)

        form
          ?.validateFields()
          .then((values) => {
            console.log("values.vehicles", vehicleSelected)

            const processedValuesForm = {
              category_parent: vehiclesStore?.categoryParent,
              ...values,
              expiration_time: values.expiration_time
                ? values.expiration_time.valueOf()
                : null,
              vehicles:
                isCopyForm && !isTireSelect
                  ? Array.isArray(values.vehicles) && values.vehicles.length > 0
                    ? values.vehicles
                    : vehiclesStore?.vehiclesStore.map((item: VehicleType) =>
                        vehiclesStore?.type === 1
                          ? item.imei
                          : item.license_plate,
                      )
                  : vehiclesStore?.vehiclesStore.map((item: VehicleType) =>
                      vehiclesStore?.type === 1
                        ? item.imei
                        : item.license_plate,
                    ),
              is_notified: values.is_notified ? 0 : 1,
            }

            const formData = new FormData()

            imageFiles.forEach((file) => {
              formData.append("images", file)
            })

            onSubmit(processedValuesForm, fetchCategory, formData)
          })
          .catch((error) => {
            console.log("Lỗi xác thực:", error)
          })
      }
    }, [timeSelect.length, randomKey])

    useEffect(() => {
      if (vehicleTire) {
        fetchTire()
      }
    }, [vehicleTire?.license_plate])

    const handleSelectVehicle = (value: string) => {
      const vehicle: any = vehicleSelected?.find((item: VehicleType) =>
        vehiclesStore?.type == 0
          ? item?.license_plate == value
          : item?.imei == value,
      )
      setVehicleTire(vehicle)
    }

    const handleSelectTypeRemind = (value: any) => {
      setIsName(value === "khác")
      setIsTireSelect(value === TIRE_CATE_ID)
      if (value === TIRE_CATE_ID && vehicleSelected?.length == 1) {
        setVehicleTire(vehiclesStore?.vehiclesStore[0])
        form.setFieldValue(
          "vehicles",
          vehiclesStore?.type == 1
            ? vehicleSelected[0]?.imei
            : vehicleSelected[0]?.license_plate,
        )
      }
    }

    const handleImageUpload = (file: any, action: string) => {
      if (action === "add") {
        setImageFiles((prev) => [...prev, file])
      } else if (action === "remove") {
        setImageFiles((prev) => prev.filter((item) => item.name !== file.name))
      }
    }

    const handleGetDataForm = () => {
      buttonDateRef.current?.click()
      setRandomKey(Math.random())
    }

    return (
      <div>
        {loading && <MaskLoader />}
        <Form
          form={form}
          labelCol={{ span: 9 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          disabled={false}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            name="remind_category_id"
            style={{ gap: 10 }}
            label={
              CATEGORY_PARENT?.[Number(vehiclesStore?.categoryParent)]?.name
            }
            rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
          >
            <Select
              className="select-type-remind"
              onChange={handleSelectTypeRemind}
            >
              {categories.map((item: any) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}

              <Select.Option value="khác" key={100}>
                Khác
              </Select.Option>
            </Select>
          </Form.Item>

          {isTireSelect && (
            <>
              <Form.Item
                name="vehicles"
                rules={[
                  { required: true, message: "Vui lòng chọn phương tiện" },
                ]}
                style={{ gap: 10 }}
                label="Chọn phương tiện"
              >
                <Select
                  className="select-vehicle"
                  onChange={(value: any) => {
                    handleSelectVehicle(value)
                    form.validateFields(["vehicles"])
                  }}
                >
                  {vehicleSelected?.map((item: VehicleType) => (
                    <Select.Option
                      key={item.license_plate}
                      value={
                        vehiclesStore?.type == 0
                          ? item.license_plate
                          : item.imei
                      }
                    >
                      {item?.license_plate}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <div className="relative">
                <Form.Item
                  className="flex-1"
                  name="tire_seri"
                  rules={[{ required: true, message: "Vui lòng chọn lốp" }]}
                  style={{ gap: 1 }}
                  label="Chọn Lốp"
                >
                  <Select
                    defaultValue={initialValues?.tire_seri}
                    onChange={(value: any) => {
                      form.setFieldValue("tire_seri", value)
                    }}
                    style={{ width: "65%" }}
                    className="select-vehicle"
                  >
                    {tires?.map((item: TireProps) => (
                      <Select.Option key={item.id} value={item.seri}>
                        {item?.seri}
                      </Select.Option>
                    ))}
                  </Select>
                  <ModalCreateTire
                    isAddTireButton={false}
                    data={vehicleTire}
                    isReload={Math.random()}
                    isInModalRemind
                    onRefresh={fetchTire}
                    type="add"
                    button={
                      <Button
                        disabled={!vehicleTire}
                        className="absolute right-[0px] top-0"
                        icon={<PlusOutlined />}
                      >
                        Thêm lốp
                      </Button>
                    }
                  />
                </Form.Item>
              </div>
            </>
          )}

          {isName && (
            <Form.Item
              name="cat_name"
              rules={[
                { required: true, message: "Vui lòng nhập tên loại nhắc nhở" },
              ]}
              style={{ gap: 10 }}
              label="Tên loại nhắc nhở"
            >
              <Input onChange={() => form.validateFields(["name"])} />
            </Form.Item>
          )}

          {vehiclesStore.type && vehiclesStore.categoryParent === 1 ? (
            <>
              <Form.Item
                name="cumulative_kilometers"
                label={
                  CATEGORY_PARENT?.[Number(vehiclesStore?.categoryParent)]
                    ?.cumulative_kilometers
                }
                rules={[
                  {
                    validator: (_, value) =>
                      value > 0
                        ? Promise.resolve()
                        : Promise.reject("Định mức km bảo dưỡng lớn hơn 0"),
                  },
                ]}
              >
                <InputNumber
                  onChange={(value) => {
                    form.setFieldsValue({ cumulative_kilometers: value })
                  }}
                  defaultValue={initialValues?.cumulative_kilometers}
                />
                <span style={{ marginLeft: 10, display: "inline-block" }}>
                  (KM)
                </span>
              </Form.Item>
              <Form.Item
                name="km_before"
                label={
                  CATEGORY_PARENT?.[Number(vehiclesStore?.categoryParent)]
                    ?.km_before
                }
                rules={[
                  {
                    validator: (_, value) => {
                      const cumulativeKm = form.getFieldValue(
                        "cumulative_kilometers",
                      )
                      if (value <= 0) {
                        return Promise.reject("Cảnh báo trước phải lớn hơn 0")
                      }
                      if (value >= cumulativeKm) {
                        return Promise.reject(
                          "Cảnh báo trước phải nhỏ hơn định mức bảo dưỡng",
                        )
                      }
                      return Promise.resolve()
                    },
                  },
                ]}
              >
                <InputNumber
                  onChange={(value) => {
                    form.setFieldsValue({ km_before: value })
                    form.validateFields(["km_before"])
                  }}
                  defaultValue={initialValues?.km_before}
                />
                <span style={{ marginLeft: 10, display: "inline-block" }}>
                  (KM)
                </span>
              </Form.Item>
            </>
          ) : null}

          <Form.Item
            name="expiration_time"
            label={
              CATEGORY_PARENT?.[Number(vehiclesStore?.categoryParent)]
                ?.expiration_time
            }
            rules={[
              {
                required: true,
                message: `Vui lòng chọn ${
                  CATEGORY_PARENT?.[Number(vehiclesStore?.categoryParent)]
                    ?.expiration_time
                }`,
              },
            ]}
          >
            <DatePicker
              disabledDate={(current) =>
                current && current < dayjs().endOf("day")
              }
              defaultValue={
                initialValues?.expiration_time
                  ? dayjs(initialValues.expiration_time)
                  : null
              }
              format="YYYY/MM/DD"
              onChange={() => form.validateFields(["remindDate"])}
            />
          </Form.Item>

          <Form.Item
            name="cycle"
            label={
              CATEGORY_PARENT?.[Number(vehiclesStore?.categoryParent)]?.cycle
            }
            rules={[
              { required: true },
              {
                validator: (_, value) =>
                  value > 0
                    ? Promise.resolve()
                    : Promise.reject(
                        `${
                          CATEGORY_PARENT?.[
                            Number(vehiclesStore?.categoryParent)
                          ]?.cycle
                        } lớn hơn 0`,
                      ),
              },
            ]}
          >
            <InputNumber
              defaultValue={initialValues?.cycle}
              onChange={(value) => {
                form.setFieldsValue({ cycle: value })
              }}
            />
            <span style={{ marginLeft: "10px", display: "inline-block" }}>
              Tháng
            </span>
          </Form.Item>

          <Form.Item
            name={"schedules"}
            label={
              CATEGORY_PARENT?.[Number(vehiclesStore?.categoryParent)]
                ?.schedules
            }
            rules={[{ required: true, message: "Vui lòng chọn lịch hẹn nhắc" }]}
          >
            <MultiDateTimePicker
              initialValues={schedules}
              ref={buttonDateRef}
              setValueTime={(value: any) => {
                setTimeSelect(value)
              }}
            />
            <Input
              className="!mt-[-30px]"
              value={timeSelect.length > 0 ? "ok" : ""}
              type="hidden"
            />
          </Form.Item>

          {isCopyForm && !isTireSelect && (
            <Form.Item name="vehicles" label="Phương tiện">
              <TreeSelect
                maxTagTextLength={30}
                maxTagCount={1}
                allowClear
                treeData={
                  vehicleCopy?.length > 0
                    ? [
                        {
                          title: "Tất cả",
                          value: "0-0",
                          key: "0-0",
                          children: vehicleCopy?.map((item: any) => {
                            return {
                              title: `${item?.imei} (${item?.vehicle_name})`,
                              value: item?.imei,
                              key: item?.imei,
                            }
                          }),
                        },
                      ]
                    : []
                }
                // value={initialValues?.vehicles}
                onChange={(value) => {
                  form.setFieldValue("vehicles", value)
                }}
                treeCheckable={true}
                showCheckedStrategy={SHOW_CHILD}
                placeholder="Chọn phương tiện"
              />
            </Form.Item>
          )}

          <Form.Item name="note_repair" label="Ghi chú">
            <TextArea spellCheck={false} />
          </Form.Item>

          <div style={{ gap: 10 }} className="pt-0 pb-0 pl-16">
            <FilePond
              maxFiles={10}
              maxFileSize="2MB"
              labelMaxFileSizeExceeded="ảnh quá 2mb"
              allowDrop={false}
              imagePreviewHeight={200}
              imagePreviewMaxHeight={200}
              files={imageFilesUrl?.length > 0 ? imageFilesUrl : imageFiles}
              allowMultiple={true}
              acceptedFileTypes={["image/*"]}
              name="images"
              labelIdle='<span class="filepond--label-action"> Chọn ảnh tải lên</span>'
              fileValidateTypeDetectType={(source, type) =>
                new Promise((resolve) => {
                  resolve(type)
                })
              }
              onupdatefiles={(fileItems) => {
                const validFiles = fileItems
                  .filter((fileItem: any) => {
                    const isValid = fileItem.file.type.startsWith("image/")
                    if (!isValid) {
                      setImageFiles((prev) =>
                        prev.filter((item) => item.name !== fileItem.file.name),
                      )
                    }
                    return isValid
                  })
                  .map((fileItem) => fileItem.file)

                setImageFiles(validFiles)
              }}
              onprocessfiles={() => {}}
              onaddfile={(error, fileItem) => {
                if (error) {
                  api?.message?.error(
                    "Mỗi ảnh không quá 2MB và tải lên không quá 10 ảnh",
                  )

                  setImageFiles((prev) =>
                    prev.filter((item) => item.name !== fileItem.file.name),
                  )
                  setImageFilesUrl((prev) =>
                    prev.filter((item) => item.name !== fileItem.file.name),
                  )

                  return
                }
                if (!fileItem.file.type.startsWith("image/")) {
                  setImageFiles((prev) =>
                    prev.filter((item) => item.name !== fileItem.file.name),
                  )
                } else {
                  handleImageUpload(fileItem.file, "add")
                }
              }}
              onremovefile={(error, fileItem) => {
                if (!error) {
                  handleImageUpload(fileItem.file, "remove")
                }
              }}
            />
          </div>

          <Form.Item
            className="hidden"
            name="is_notified"
            label="Bật thông báo"
            valuePropName="checked"
          >
            <Switch checked />
          </Form.Item>
        </Form>
        <button onClick={handleGetDataForm} ref={ref}></button>
      </div>
    )
  },
)

export default FormAddRemind
