import React, { useEffect, useState } from "react"
import { PlusOutlined } from "@ant-design/icons"
import { Image, Upload, Button } from "antd"
import type { UploadFile, UploadProps } from "antd"
import { ModalCView } from "../ModalC/ModalC"

const SERVER_DOMAIN_REMIND = import.meta.env.VITE_HOST_REMIND_SERVER_DOMAIN_IMG

type FileType = Parameters<NonNullable<UploadProps["beforeUpload"]>>[0]

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

interface ModalShowImageProps {
  remindData: any
  button: React.ReactNode
  isShow?: boolean
  vehicleSelected: any
  type: number
}

const ModalShowImage: React.FC<ModalShowImageProps> = ({
  vehicleSelected,
  remindData,
  button,
  isShow,
  type,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState("")
  const [fileList, setFileList] = useState<UploadFile[]>([])

  useEffect(() => {
    if (remindData?.thumbnail_urls) {
      setFileList(
        remindData?.thumbnail_urls
          ?.split(",")
          ?.filter((url: string) =>
            url.includes(
              (type == 1
                ? vehicleSelected?.[0]?.imei
                : vehicleSelected?.[0]?.license_plate) as string,
            ),
          )
          .map((url: string, index: number) => ({
            uid: `image-${index}`,
            url: `${SERVER_DOMAIN_REMIND}${url.trim()}`,
            name: url.split("/").pop() || `image-${index}`,
            status: "done" as const,
          })),
      )
    }
  }, [remindData])

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }
    const file_url = `${SERVER_DOMAIN_REMIND}uploads/${
      type == 1
        ? vehicleSelected?.[0]?.imei
        : vehicleSelected?.[0]?.license_plate
    }/${file.name}`

    setPreviewImage(file_url || (file.preview as string))
    setPreviewOpen(true)
  }

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const uploadButton = (
    <Button style={{ border: 0, background: "none" }} icon={<PlusOutlined />} />
  )

  return (
    <ModalCView
      isShow={isShow}
      button={button}
      title="Xem hình ảnh"
      children={(action) => (
        <>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {/* {fileList.length >= 8 ? null : uploadButton} */}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{ display: "none" }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
          {remindData?.img_url === "" && <div>Không có hình ảnh</div>}
        </>
      )}
    />
  )
}

export default ModalShowImage
