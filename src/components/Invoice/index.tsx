import { _const } from "../../_constant"
import { IOrderDetailInfo } from "../../_types/ordersType"
import getTime from "../../utils/getTime"
import { Coppy } from "../Coppy"
import { Logo } from "../Logo"

interface IProps {
  orderDetail: IOrderDetailInfo
}

export const OrderInvoice: React.FC<IProps> = ({ orderDetail }) => {
  return (
    <section className="overflow-hidden relative">
      <div className="container">
        <div className=" bg-white p-2 print:p-0 print:bg-black">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="w-[100px] -ml-3">
              <Logo />
            </div>
            <div className="flex flex-col items-end">
              <h4 className=" font-medium uppercase tracking-widest text-base">
                #{orderDetail?.code}
              </h4>
              <span>
                {getTime?.Unix2StringFormat(orderDetail?.created_at / 1000)}
              </span>
            </div>
          </div>

          <div className="mt-2">
            <h1 className=" font-semibold uppercase tracking-widest">
              ĐƠN HÀNG
            </h1>

            <h4 className="uppercase mt-2">
              NGƯỜI/TÀI KHOẢN TẠO:
              <span className="font-semibold">
                {" "}
                {orderDetail?.creator_customer}/{orderDetail?.creator_user}
              </span>
            </h4>
            <p className="">
              KHÁCH HÀNG NHẬN:{" "}
              <span className="font-semibold">{orderDetail?.reciver}</span>
            </p>
          </div>

          <div className="mt-4">
            <p className="font-semibold">DANH SÁCH THIẾT BỊ:</p>
          </div>

          <div className="overflow-x-auto">
            <table className="border-collapse table-auto w-full mb-4 mt-1 whitespace-pre border border-root_border_color">
              <thead>
                <tr className=" bg-dark_bg">
                  <th className="p-2 border-b uppercase tracking-widest  font-medium text-start text-white">
                    STT
                  </th>
                  <th className="p-2 border-b uppercase tracking-widest  font-medium text-start text-white">
                    IMEI
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {orderDetail?.devices?.map?.((device, index) => {
                  return (
                    <tr key={index}>
                      <td className="p-2  font-medium border-b border-root_border_color">
                        {index + 1}
                      </td>
                      <td className="p-2  font-medium border-b border-root_border_color">
                        <Coppy>{device?.imei}</Coppy>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="md:max-w-3xl flex gap-2 mt-2">
            <h1 className=" font-semibold uppercase tracking-widest">
              GHI CHÚ:
            </h1>
            <p className=" font-medium">
              "{orderDetail?.note || _const?.string?.message?.noNote}"
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
