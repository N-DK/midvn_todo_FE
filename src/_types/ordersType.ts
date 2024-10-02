export interface IOrderInfo {
  creator_user: string
  code: string
  created_at: number
  creator_customer: string
  id: number
  orders_status_id: number
  orders_status_name: number
  quantity: number
  reciver: string
  updated_at: null
  note: string
}

export interface IOrderDetailInfo {
  code: string
  devices: { id: number; imei: number }[]
  id: number
  note: string
  orders_status_id: number
  reciver: string
  creator_customer: string
  creator_user: string
  created_at: number
}
