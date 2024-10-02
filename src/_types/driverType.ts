export interface IDriver {
  activation_date: number
  address: string
  birthday: number
  creator: string
  citizen_identity_card: string
  created_at: number
  expired_on: number
  gender: number
  id: number
  is_actived: number
  is_check: number
  license_number: string
  license_type_name: string
  name: string
  phone: string
  updated_at: number
}

export interface IDriverDetail {
  activation_date: number
  address: null
  birthday: number
  citizen_identity_card: string
  customer_id: number
  expired_on: number
  gender: number
  id: number
  is_actived: number
  license_number: string
  license_type_id: number
  name: string
  phone: string
}

export interface ILicenseType {
  id: number
  title: string
}

export interface DriverType {
  id: number
  license_number: string
  name: string
  phone: string
}
