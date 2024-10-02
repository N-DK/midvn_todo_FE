import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Upload,
  Modal,
  Row,
  Col,
  Button,
} from "antd"
import TextArea from "antd/es/input/TextArea"
import { FC, useEffect, useState, forwardRef } from "react"
import { PlusOutlined } from "@ant-design/icons"
import { VehicleType } from "../../../../../interface/interface"
import dayjs from "dayjs"

const SERVER_DOMAIN_REMIND = import.meta.env.VITE_HOST_REMIND_SERVER_DOMAIN_IMG

interface FormAddRemindProps {
  isUpdateCycleForm?: boolean
  vehicleSelected?: VehicleType[]
  initialValues?: any
  onSubmit: (formData: any, callback: any, images: any) => void
}

const FormAddRemind = forwardRef<HTMLButtonElement, FormAddRemindProps>(
  ({ onSubmit, initialValues, vehicleSelected, isUpdateCycleForm }, ref) => {
    const [form] = Form.useForm()
    const [imageFiles, setImageFiles] = useState<any[]>([])
    const [fileList, setFileList] = useState<any[]>([])
    const [previewImage, setPreviewImage] = useState<string | null>(null) // State for the preview image

    const initImageURL = initialValues?.remind_img_url || initialValues?.img_url

    // Handle filling images from server URLs
    // xử lí fill hình ảnh
    // Function to create a File object from a URL
    const createFileFromUrl = async (url: string, name: string) => {
      const response = await fetch(url)
      const blob = await response.blob()
      return new File([blob], name, { type: blob.type })
    }

    // Handle filling images from server URLs
    useEffect(() => {
      if (initImageURL) {
        // Get the URLs of the images
        const urls = initImageURL.split(",").map((url: string) => {
          const trimmedUrl = `${SERVER_DOMAIN_REMIND}${url.trim()}`
          const name = trimmedUrl.split("/").pop() || "image.jpg" // Default name if extraction fails

          return {
            uid: trimmedUrl, // unique id for each image
            name: name,
            status: "done",
            url: trimmedUrl,
          }
        })

        // Update fileList state
        setFileList(urls)

        // Create File objects and set imageFiles (append existing ones)
        Promise.all(
          urls.map(async ({ url, name }: { url: string; name: string }) => {
            const file = await createFileFromUrl(url, name)
            return file
          }),
        ).then((files) => {
          setImageFiles(files) // Initialize imageFiles with files from URLs
        })
      }
    }, [initImageURL]) // Run when initImageURL changes

    // Handle image upload and preview
    const handleChange = (info: any) => {
      alert("Change file")
      const newFileList = info.fileList
      setFileList(newFileList)

      // Filter out files that are deleted (not present in newFileList)
      const newFiles = newFileList
        .map((file: any) => file.originFileObj)
        .filter(Boolean)

      // Find the files that should remain in imageFiles (excluding deleted ones)
      const updatedImageFiles = imageFiles.filter((file: File) =>
        newFileList.some((listItem: any) => listItem.name === file.name),
      )

      // Append new files that are not already in imageFiles
      const filesToAdd = newFiles.filter(
        (file: any) =>
          !imageFiles.some((imgFile: any) => imgFile.name === file.name),
      )

      setImageFiles([...updatedImageFiles, ...filesToAdd]) // Update imageFiles
    }

    const beforeUpload = (file: any) => {
      const isImage = file.type.startsWith("image/")
      if (!isImage) {
        Modal.error({
          title: "You can only upload image files!",
        })
      }
      return isImage
    }

    return (
      <div>
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          disabled={false}
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="Images">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange}
              beforeUpload={beforeUpload}
              onPreview={(file: any) => {
                setPreviewImage(file.url) // Set the preview image
              }}
              onRemove={(file: any) => {
                // Remove the file from imageFiles
                alert("Remove file")
                const updatedImageFiles = imageFiles.filter(
                  (imgFile: any) => imgFile.name !== file.name,
                )
                setImageFiles(updatedImageFiles)
                return true
              }}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          {/* Preview modal */}
          {previewImage && (
            <Modal
              visible={!!previewImage}
              footer={null}
              onCancel={() => setPreviewImage(null)}
            >
              <img alt="preview" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          )}

          {/* Other form items can be added here */}
        </Form>
      </div>
    )
  },
)

export default FormAddRemind
