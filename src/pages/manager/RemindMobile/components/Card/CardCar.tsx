import { PhoneOutlined, UserOutlined } from "@ant-design/icons"
import { FC } from "react"
import { TbLocation } from "react-icons/tb"

interface CardCarProps {
  id?: number
  license_plate: string
  icons: any
  weight?: string
  isGPS?: boolean
  showCheckbox?: boolean // Hiển thị checkbox khi thả chuột
  checked?: boolean // Trạng thái checkbox
  onCheckChange?: (checked: boolean) => void // Hàm xử lý thay đổi checkbox
  user_name?: string
  address?: string
  license?: string
  user_address?: string
}

const CardCar: FC<CardCarProps> = ({
  license,
  address,
  user_name,
  license_plate,
  icons,
  user_address,
  isGPS,
  showCheckbox,
  checked,
  onCheckChange,
}) => {
  console.log("====================================")
  console.log("icons", icons)
  console.log("====================================")
  return (
    <div className="item relative flex items-center min-h-16 border rounded-md mx-2 my-2">
      {showCheckbox && (
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onCheckChange?.(e.target.checked)}
          className="absolute top-50 left-3"
        />
      )}
      {isGPS ? (
        <img
          src="https://github-production-user-asset-6210df.s3.amazonaws.com/109363404/365693590-2a89a2d4-db29-483f-9b54-3bfee4322816.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240909%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240909T143314Z&X-Amz-Expires=300&X-Amz-Signature=9b22f78ad2a7070fd53a4af2542b70c5f53edc5e285d222743aca3cfe3035ab3&X-Amz-SignedHeaders=host&actor_id=109363404&key_id=0&repo_id=854359927"
          alt=""
        />
      ) : (
        <img src="" alt="" />
      )}
      <div className="item-infor ml-10 w-full py-2">
        <div className="flex items-center">
          <div>
            <img
              width={"30%"}
              src={
                isGPS
                  ? "data:image/png;base64,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"
                  : "data:image/png;base64,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"
              }
            />
          </div>
          <div className="flex-1 mr-10">
            <b>{license_plate}</b>
            {icons?.length > 0 && icons[0] !== null && (
              <span> ({icons.map((icon: any) => icon?.icon).join(" - ")})</span>
            )}
            <div className=" ">
              <p className="mb-1 mt-1">
                <PhoneOutlined /> {license ?? "-"}
              </p>
              <p className="mb-1">
                <UserOutlined /> {user_name}
              </p>
              <p className="mb-1 flex items-start">
                <TbLocation className="mr-1 mt-1" /> {user_address ?? "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardCar
