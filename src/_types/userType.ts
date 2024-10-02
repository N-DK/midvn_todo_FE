import { ReactNode } from "react"

export interface IUserInfo {
  address: string
  company: string
  customer_name: string
  email: string
  id: number
  is_actived: number
  parent_id: null
  phone: string
  role_id: number
  tax_code: string
  username: string
  website: string
  customer_id: number
  token?: string
}

export interface IUserDetailInfo {
  address: string
  company: string
  customer_id: number
  customer_name: string
  email: string
  id: number
  is_actived: number
  parent_id: null
  phone: string
  role_id: number
  tax_code: string
  username: string
  website: string
  role_name: string
  level_id: number
  level_name: string
}

export interface ICustomerInfo {
  address: string
  company: string
  email: string
  level_id: number
  name: string
  phone: string
  tax_code: string
  user_name: string
  website: string
}

export interface IUserChild {
  customer_id: number
  customer_name: string
  id: number
  parent_id: number
  username: string
  is_team?: number
  children: IUserChild[]
  is_main?: number
}

export interface IUserChildAntdFormat {
  customer_id: number
  customer_name: string
  id: number
  parent_id: number
  username: string
  children: IUserChild[]
  key: number
  title: ReactNode
  icon: ReactNode
  value: string
}

//USERSBOX TYPE
export interface IUserBox {
  address: string
  company: string
  created_at: number
  email: string
  id: number
  level_name: string
  name: string
  phone: string
  tax_code: string
  updated_at: number
  website: string
  username: string
  user_id: number
  is_actived: number
}

export interface IChildOwner {
  created_at: number
  id: number
  is_actived: number
  role_name: string
  updated_at: number
  username: string
}

export interface ITeam {
  created_at: number
  customer_id: number
  id: number
  is_actived: number
  name: string
}

export interface IIntegratedStatistics {
  agency: number
  customers: number
  total_device: number
  total_device_actived: number
  warehouse_not_actived: number
  warehouse: number
}
