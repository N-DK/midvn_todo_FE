import { FC, useEffect, useRef, useState } from "react"
import { Button } from "antd"
import { VehicleType } from "../../../../interface/interface"
import getColumnVehicleNoGPS from "./columns"
import { useContext } from "react"
import ModalImportExcelMobile from "../../../../components/modals/ModalImportExcelMobile"
import { TableCM } from "../../../../components/TableCM/TableCM"
import CardCar from "../components/Card/CardCar"
import ModalCreateRemindMobile from "../../../../components/modals/ModalCreateRemindMobile"
import { PlusCircleOutlined, UploadOutlined } from "@ant-design/icons"
import { MaskLoader } from "../../../../components/Loader"
import {
  VehicleProviderContextProps,
  vehiclesContext,
} from "../providers/VehicleProvider"
import ModalAddVehicleMobile from "../../../../components/modals/ModalAddVehicleMobile"
import DrawVehicle from "../../../../components/Draws/DrawVehicleMobile"
interface VehicleNoGPSType {
  vehicles: VehicleType[]
}
const VehicleNoGPS: FC<VehicleNoGPSType> = ({ vehicles }) => {
  const { vehiclesStore, dispatch } = useContext(
    vehiclesContext,
  ) as VehicleProviderContextProps

  //handle logig reload
  const onReload = () => {
    dispatch.freshKey()
  }

  //get vehicle checked
  const getVehicleChecked = (vehicle: VehicleType[]) => {
    dispatch?.setVehicle(vehicle)
  }

  const [selectedItems, setSelectedItems] = useState<any>([])
  const [showCheckbox, setShowCheckbox] = useState(false) // Hiển thị checkbox khi thả chuột
  const [isSelecting, setIsSelecting] = useState(false) // Trạng thái nhấn giữ chuột
  const [selectAll, setSelectAll] = useState(false) // Trạng thái chọn tất cả
  const [isPressing, setIsPressing] = useState(false)

  const isIndexDraw = vehiclesStore.drawIndex

  const pressTimer = useRef<any>()

  const containerRef = useRef<HTMLDivElement>(null)

  // Hàm handle khi check/uncheck checkbox
  const handleCheck = (item: VehicleType, checked: boolean) => {
    setSelectedItems(
      (prevSelected: any[]) =>
        checked
          ? [...prevSelected, item] // Lưu đối tượng vehicle
          : prevSelected.filter((selectedItem) => selectedItem.id !== item.id), // Lọc bỏ đối tượng đã bỏ chọn
    )
    dispatch.setVehicle(
      checked
        ? [...selectedItems, item]
        : selectedItems.filter(
            (selectedItem: { id: number | undefined }) =>
              selectedItem.id !== item.id,
          ),
    )
  }

  // Bắt đầu chọn khi nhấn giữ chuột
  const handleMouseDown = (id: number) => {
    setIsSelecting(true) // Bắt đầu quá trình chọn item
  }

  // Kết thúc chọn khi thả chuột
  const handleMouseUp = (item: VehicleType) => {
    if (isSelecting) {
      setShowCheckbox(true) // Hiển thị checkbox sau khi thả chuột
      handleCheck(item, true) // Chọn item ngay khi thả chuột
    }
    setIsSelecting(false) // Kết thúc quá trình chọn
  }

  // Xử lý click ra ngoài, ẩn checkbox và reset trạng thái
  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setShowCheckbox(false) // Ẩn checkbox khi click ra ngoài
      setSelectedItems([]) // Reset các item đã chọn
      setSelectAll(false) // Reset nút "Chọn tất cả"
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Xử lý khi bấm nút "Chọn tất cả"
  const handleSelectAll = () => {
    if (selectAll) {
      // Nếu đã chọn tất cả, bỏ chọn
      setSelectedItems([])
      dispatch.setVehicle([]) // Bỏ chọn tất cả
    } else {
      // Nếu chưa chọn tất cả, chọn tất cả item
      setSelectedItems(vehicles) // Lưu tất cả đối tượng vehicle
      dispatch.setVehicle(vehicles) // Dispatch với tất cả các đối tượng vehicle
    }
    setSelectAll(!selectAll) // Đảo trạng thái "Chọn tất cả"
    setShowCheckbox(true) // Hiển thị checkbox khi chọn tất cả
  }

  const handleTouchStart = (item: any) => {
    pressTimer.current = setTimeout(() => {
      dispatch.setDrawIndex(item.id)
      setIsPressing(true)
    }, 500) // Thay đổi thời gian giữ ở đây
  }

  const handleTouchEnd = () => {
    clearTimeout(pressTimer.current)
    if (isPressing) {
      // dispatch.setDrawIndex(0)
      setIsPressing(false)
    }
  }

  return (
    <div
      className="mt-7"
      onMouseUp={() => setIsSelecting(false)} // Kết thúc quá trình chọn nhiều item
      ref={containerRef} // Tham chiếu container để xử lý click ra ngoài
    >
      {vehiclesStore.loading && <MaskLoader />}

      {
        <div className="flex items-center justify-between">
          <div>
            <ModalCreateRemindMobile
              button={
                <Button
                  onClick={() => {
                    console.log("selectedItems", selectedItems)
                  }}
                  type="primary"
                  className="ml-2"
                  icon={<PlusCircleOutlined />}
                >
                  Thêm
                </Button>
              }
            />
          </div>
          <div className="flex ml-2">
            <ModalAddVehicleMobile
              type="add"
              button={
                <Button className="mr-2" type="primary">
                  Thêm phương tiện
                </Button>
              }
            />
            <ModalImportExcelMobile
              button={
                <Button icon={<UploadOutlined />} type="primary">
                  Tải Excel
                </Button>
              }
            />
          </div>
        </div>
      }
      {/* Nút Chọn Tất Cả */}
      {showCheckbox && ( // Chỉ hiển thị nút "Chọn tất cả" khi checkbox đang được hiển thị
        <Button
          className="ml-2 mt-2"
          onClick={handleSelectAll}
          style={{ marginBottom: 16 }}
        >
          {selectAll ? "Bỏ chọn tất cả" : "Chọn tất cả"}
        </Button>
      )}
      <TableCM
        checkBox
        setVehicleChecked={getVehicleChecked}
        hiddenColumnPicker={true}
        hiddenTitle={true}
        title="123"
        onReload={onReload}
        search={{
          placeholder: "Tìm kiếm biển số, số điện thoại",
          width: 277,
          onSearch(q) {
            dispatch.setKeywordNoGPS(q)
          },
          limitSearchLength: 3,
        }}
        props={{
          columns: getColumnVehicleNoGPS(dispatch?.setVehicle),
          dataSource: vehicles,
          size: "middle",
          pagination: {},
        }}
      >
        {vehicles.map((item: any, index: number) => {
          return (
            <div
              onClick={() => {
                if (showCheckbox) return
                dispatch.setDrawIndex(item.id)
              }}
              key={item.id}
              onMouseDown={() => handleMouseDown(item)} // Nhấn chuột để bắt đầu chọn
              onMouseUp={() => handleMouseUp(item)} // Thả chuột để hiển thị checkbox và chọn item
              className="item-container"
              onTouchStart={() => handleTouchStart(item)}
              onTouchEnd={handleTouchEnd}
            >
              <CardCar
                key={index}
                weight=""
                isGPS={false}
                {...item}
                showCheckbox={showCheckbox} // Hiển thị checkbox khi người dùng nhấn giữ và thả chuột
                checked={selectedItems.includes(item)} // Trạng thái checkbox
                onCheckChange={(checked) => handleCheck(item, checked)} // Xử lý thay đổi trạng thái checkbox
              />
              {isIndexDraw === item.id && (
                <DrawVehicle
                  setSelectedItems={() => {
                    dispatch.setDrawIndex(null)
                    dispatch.setVehicle([])
                    setSelectedItems([])
                  }}
                  button={<></>}
                  title="Chi tiết"
                  data={item}
                />
              )}
            </div>
          )
        })}
      </TableCM>
    </div>
  )
}

export default VehicleNoGPS
