import { Button, Divider } from "antd"
import { Statisical } from "../../../../pages/Statistical"
import { useState } from "react"
import { HiBarsArrowDown, HiBarsArrowUp } from "react-icons/hi2"

interface IProps {
  userId: number
}

export const StatisicalView: React.FC<IProps> = ({ userId }) => {
  const [isExpand, setIsExpand] = useState<boolean>(false)

  const toogleExpand = () => {
    setIsExpand((prestate) => !prestate)
  }

  if (userId == undefined) return null
  return (
    <>
      <div className="absolute bottom-0 left-0 right-2 h-0 flex justify-end items-center z-[99]">
        <div>
          <Button
            size="small"
            type="primary"
            className="text-[10px] h-[20px] px-2 py-0"
            onClick={toogleExpand}
            icon={
              !isExpand ? (
                <HiBarsArrowDown size={14} />
              ) : (
                <HiBarsArrowUp size={14} />
              )
            }
          >
            {isExpand ? `Thu gọn` : `Xem chi tiết`}
          </Button>
        </div>
      </div>
      {isExpand ? (
        <>
          <Divider className="my-0" />
          <div className="px-2 py-2">
            <Statisical
              userIdDefault={userId}
              ignore={["IntegratedStatistics"]}
            />
          </div>
        </>
      ) : null}
    </>
  )
}
