import { PlusOutlined } from "@ant-design/icons"
import { GetProp, Image, Upload, UploadFile } from "antd"
import ImgCrop, { ImgCropProps } from "antd-img-crop"
import { UploadProps } from "antd/lib"
import { Fragment, ReactNode, useMemo, useState } from "react"
import { FileType } from "../../_types/interfaceType"
import { handleData } from "../../utils/handleData"
import axios from "axios"
import { serverInstance } from "../../axios/serverInstance"
import {
  deleteImageService,
  upLoadImageService,
} from "../../services/interfaceServices"
import { api } from "../../_helper"
import { getString } from "../../utils/getString"

interface IUploadPromiseProps {
  api: string
  body: { [key: string]: string }
  fileKey: string
  successMessage?: string
  errorMessage?: string
  onSuccess?: () => void
}
interface IRemovePromiseProps {
  api: string
  body: (file: UploadFile<any>) => { [key: string]: string }
  successMessage?: string
  errorMessage?: string
  onSuccess?: () => void
}

interface IUploadC {
  defaultList?: UploadFile[]
  uploadPromiseProps?: IUploadPromiseProps
  removePromiseProps?: IRemovePromiseProps
  isImgCrop?: boolean
  fillColor?: string
  confirmText?: ReactNode
  lim?: number
}

export const UploadC: React.FC<IUploadC> = ({
  defaultList = [],
  uploadPromiseProps,
  removePromiseProps,
  isImgCrop = true,
  fillColor = "white",
  confirmText = "Xác nhận",
  lim = 1,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState("")
  const [fileList, setFileList] = useState<UploadFile[]>(defaultList)

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await handleData.getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList([...newFileList])
  }

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  const Wrapper = isImgCrop ? ImgCrop : Fragment
  const wrapperProps: any = isImgCrop
    ? {
        rotationSlider: true,
        aspectSlider: true,
        modalTitle: "Chỉnh sửa hình ảnh",
        modalOk: confirmText,
        fillColor: fillColor,
        minZoom: 1,
        modalProps: {
          styles: {
            footer: {
              padding: "8px 8px",
            },
            header: {
              marginBottom: 0,
            },
          },
        },
      }
    : {}

  return (
    <>
      <Wrapper {...wrapperProps}>
        <Upload
          customRequest={async (options) => {
            const { onSuccess, onError, file, onProgress } = options
            if (!uploadPromiseProps) return onSuccess?.("OK")

            const url = uploadPromiseProps?.api

            const fmData = new FormData()
            const config = {
              headers: { "content-type": "multipart/form-data" },
              onUploadProgress: (event: any) => {
                const percent = (event.loaded / event.total) * 100
                onProgress?.({ percent: percent })
              },
            }
            const pBody = uploadPromiseProps?.body
            const keyList = Object?.keys(pBody)
            fmData.append(uploadPromiseProps?.fileKey, file)
            keyList?.forEach?.((key) => {
              const val = pBody?.[key]
              fmData.append(key, val)
            })
            try {
              const res: any = await upLoadImageService(url, fmData, config)

              api.message?.success(
                uploadPromiseProps?.successMessage ||
                  res?.message ||
                  "Đã tải lên hình ảnh",
              )
              uploadPromiseProps?.onSuccess?.()
              return onSuccess?.("Ok")
            } catch (err) {
              api.message?.error(
                uploadPromiseProps?.errorMessage ||
                  getString.errorAxiosParams(err) ||
                  "Có lỗi khi tải lên hình ảnh",
              )

              const error = new Error("Có lỗi khi tải hình ảnh")
              return onError?.(error)
            }
          }}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          onRemove={async (file) => {
            if (!removePromiseProps) return true

            let cf = 0

            await api.modal?.confirm({
              title: "Xác nhận xoá hình ảnh?",
              okText: "Xoá",
              onOk(...args) {
                cf = 1
              },
            })

            if (cf == 0) return false

            const t = api.message?.loading("Đang xoá hình ảnh", 20)
            const url = removePromiseProps?.api
            const body = removePromiseProps?.body(file)

            try {
              const res: any = await deleteImageService(url, body)

              api.message?.success(
                removePromiseProps?.successMessage ||
                  res?.message ||
                  "Đã xoá hình ảnh",
              )
              removePromiseProps?.onSuccess?.()
              t?.()

              return true
            } catch (err) {
              api.message?.error(
                removePromiseProps?.errorMessage ||
                  getString.errorAxiosParams(err) ||
                  "Có lỗi khi xoá hình ảnh",
              )

              const error = new Error("Có lỗi khi xoá hình ảnh")
              t?.()

              return false
            }
          }}
          maxCount={lim}
        >
          {fileList.length >= lim ? null : uploadButton}
        </Upload>
      </Wrapper>

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
    </>
  )
}
