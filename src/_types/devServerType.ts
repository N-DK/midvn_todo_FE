export interface IConnectionType {
  created_at: number
  id: number
  name: string
  publish: number
  note: string
  updated_at: number
}

export interface IDeviceStatusType {
  created_at: number
  id: number
  publish: number
  title: string
  updated_at: number
  des: string
}

export interface IDiskType {
  created_at: number
  id: number
  name: string
  publish: number
  updated_at: number
}

export interface ILicenseType {
  created_at: number
  id: number
  title: string
  updated_at: number
}

export interface ILevelType {
  created_at: number
  id: number
  name: string
  publish: number
  sort: number
  updated_at: number
  des: string
}

export interface IModelTypeType {
  created_at: number
  id: number
  name: string
  publish: number
  updated_at: number
  des: string
}

export interface IOderStatusType {
  created_at: number
  id: number
  publish: number
  title: string
  updated_at: number
  des: string
}

export interface IVehicleIconType {
  created_at: number
  id: number
  name: string
  publish: number
  updated_at: number
  note: string
}

export interface IVehicleTypeType {
  created_at: number
  id: number
  max_speed: number
  name: string
  rule: number
  updated_at: number
  vehicle_icon_name: string
  vehicle_icon_id: number
  publish: number
}

export interface IRoleType {
  created_at: number
  id: number
  name: string
  publish: number
  sort: number
  updated_at: string
  des: string
}

export interface IPermission {
  created_at: number
  id: number
  method: string
  name: string
  publish: number
  router: string
  updated_at: number
  group_: string
}

export interface IModel {
  connection_type_name: string
  disk_name: string
  id: number
  is_gps: number
  made_in: string
  name: string
  note: string
  publish: number
  quantity_channel: number
  model_type_name: string
  model_type_id: number
}

export interface IModelDetail {
  connection_type_id: string
  disk_id: number
  id: number
  is_gps: number
  made_in: string
  model_type_id: number
  name: string
  note: string
  publish: number
  quantity_channel: number
}

export interface IPackage {
  created_at: number
  fees_to_agency: number
  fees_to_customer: number
  fees_to_distributor: number
  id: number
  name: string
  note: string
  one_month_fee_to_agency: number
  one_month_fee_to_customer: number
  one_month_fee_to_distributor: number
  publish: number
  times: number
  updated_at: number
}

export interface IPackageDetail {
  fees_to_agency: number
  fees_to_customer: number
  fees_to_distributor: number
  id: number
  name: string
  note: string
  one_month_fee_to_agency: number
  one_month_fee_to_customer: number
  one_month_fee_to_distributor: number
  publish: number
  times: number
}

export interface ICmcServer {
  created_at: number
  host: string
  id: number
  ip: string
  port: number
  publish: number
  updated_at: number
  token: string
}
