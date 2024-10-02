import { Modal } from "antd"
import {
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import { SaveFilled } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { ModalProps } from "antd/lib"
import { TfiClose } from "react-icons/tfi"
import { api } from "../../_helper"
interface IProps {
  isValidToOpen?: boolean
  isShow?: boolean
  button: ReactNode
  children: (action: { closeModal: any }) => ReactNode
  className?: string
  title: ReactNode
  modalProps?: ModalProps
  onClose?: () => void
  disableKey?: boolean
}

export interface ModalCViewAction {
  closeModal: () => void
}

export const ModalCView = forwardRef<ModalCViewAction, IProps>(
  (
    {
      button,
      children,
      className,
      title,
      modalProps,
      onClose,
      disableKey,
      isValidToOpen = true,
      isShow = false,
    },
    ref,
  ) => {
    const { t } = useTranslation()

    const [open, setOpen] = useState<boolean>(isShow || false)
    const [modalKey, setModalKey] = useState<number>(Math.random())

    const handleSave = () => {
      setOpen(false)
    }
    const closeModal = () => setOpen(false)

    const action = {
      closeModal,
    }

    useEffect(() => {
      if (!open) {
        !disableKey && setModalKey(Math.random())
      }
    }, [open])

    useImperativeHandle(ref, () => ({
      closeModal,
    }))

    useEffect(() => {
      if (isShow) {
        setOpen(true)
      }
    }, [isShow])

    return (
      <>
        <div
          className="inline-block"
          onClick={() => {
            if (isValidToOpen) {
              setOpen(true)
            } else {
              api.message?.error(
                "Vui lòng chọn phương tiện trước khi tạo thông báo nhắc nhở !!",
              )
            }
          }}
        >
          {button}
        </div>
        <Modal
          title={title}
          centered
          open={open}
          onCancel={() => {
            setOpen(false)
            onClose?.()
          }}
          onOk={handleSave}
          width={700}
          okButtonProps={{ icon: <SaveFilled /> }}
          mousePosition={{
            x: screen.width / 2,
            y: screen.height / 2,
          }}
          footer={false}
          closeIcon={<TfiClose />}
          maskClosable={false}
          {...modalProps}
        >
          <div
            key={modalKey}
            className={`${
              className || ""
            } max-h-[85vh] overflow-auto px-6 py-3`}
          >
            {children(action)}
          </div>
        </Modal>
      </>
    )
  },
)
