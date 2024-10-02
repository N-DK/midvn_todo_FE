export interface TireProps {
  id?: number
  brand?: string
  size?: string
  seri?: string
  license_plate?: string
  imei?: string
}

export interface VehicleType {
  id?: number
  license_plate: string
  license: string
  user_id?: number
  is_deleted?: boolean
  reminds?: any
  key?: number
  icons?: any
  user_name?: string
  user_address?: string
  imei?: string
}

export interface CategoryType {
  id?: number
  name: string
  desc?: string
  icon?: string
  user_id?: number
  category_parent?: number
  create_time?: number
  update_time?: number
}

export interface RemindType {
  cat_id?: number
  img?: string
  is_notify?: number
  note_repair?: string
  time_before?: number
  time_expire?: number
  tire?: number
  vehicles?: any
}
