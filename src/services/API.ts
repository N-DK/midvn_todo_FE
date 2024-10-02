const VITE_SOCKET_SERVER_DOMAIN = import.meta.env.VITE_SOCKET_SERVER_DOMAIN

export const API_URL = {
  SOCKET_SERVER_DOMAIN: `${VITE_SOCKET_SERVER_DOMAIN}`,

  refeshToken: "/api/v1/users/refresh-token",

  //USER

  login: "/api/v1/users/login",
  logout: "/api/v1/users/logout",
  userInfo: "/api/v1/users/info",
  userDetailInfo: "/api/v1/users/detail",
  userChild: "/api/v1/users/children",
  teamList: "/api/v1/users/teams",
  userList: "/api/v1/users/rows",
  userMove: "/api/v1/users/move",
  userResetPass: "/api/v1/users/reset-pass",
  userUpdateActive: "/api/v1/users/update-actived",
  userDelete: "/api/v1/users/delete",
  userOwner: "/api/v1/users/owner",
  userRegister: "/api/v1/users/register",
  teamRegister: "/api/v1/users/register-team",
  userUpdate: "/api/v1/users/update",
  deviceAddList: "/api/v1/users/device-add",
  registerDeviceUser: "/api/v1/users/register-device",

  //INTERFACE
  menu: "/api/v1/module/tree",
  menuRows: "/api/v1/module/rows",
  menuUpdate: "/api/v1/module/update",
  menuDelete: "/api/v1/module/delete",
  menuAdd: "/api/v1/module/register",
  deleteImage: "/api/v1/interface/delete-image",

  uploadLogo: "/api/v1/interface/upload-logo",
  uploadBanner: "/api/v1/interface/upload-banner",
  uploadFavicon: "/api/v1/interface/upload-favicon",

  detailInterface: "/api/v1/interface/detail",
  pageInterface: "/api/v1/interface/rows",
  pageDetailInterface: "/api/v1/interface/detail",
  updateInterface: "/api/v1/interface/update",
  addInterface: "/api/v1/interface/register",
  deleteInterface: "/api/v1/interface/delete",

  // REALTIME
  realtimeInfo: "/api/v1/realtime/info",
  realtimeGps: "/api/v1/realtime/gps",
  realtimeAlarm: "/api/v1/realtime/alarm",

  //SERVER
  //connectionType
  connectionType: "/api/v1/connection-type/rows",
  connectionTypeDelete: "/api/v1/connection-type/delete",
  connectionTypeUpdate: "/api/v1/connection-type/update",
  connectionTypeAdd: "/api/v1/connection-type/register",

  //deviceStatus
  deviceStatus: "/api/v1/device-status/rows",
  deviceStatusDelete: "/api/v1/device-status/delete",
  deviceStatusUpdate: "/api/v1/device-status/update",
  deviceStatusAdd: "/api/v1/device-status/register",

  //devDisk
  diskStatus: "/api/v1/disk/rows",
  diskDelete: "/api/v1/disk/delete",
  diskUpdate: "/api/v1/disk/update",
  diskAdd: "/api/v1/disk/register",

  //devlevel
  levelList: "/api/v1/level/rows",
  levelDelete: "/api/v1/level/delete",
  levelUpdate: "/api/v1/level/update",
  levelSortUpdate: "/api/v1/level/update-sort",
  levelAdd: "/api/v1/level/register",

  levelPermissionList: "/api/v1/level/get-permission",
  levelAddPermission: "/api/v1/level/register-permission",
  levelRemovePermission: "/api/v1/level/delete-permission",

  levelModuleList: "/api/v1/level/get-module",
  levelAddModule: "/api/v1/level/register-module",
  levelRemoveModule: "/api/v1/level/delete-module",

  //devmodelType
  modelTypeList: "/api/v1/model-type/rows",
  modelTypeDelete: "/api/v1/model-type/delete",
  modelTypeUpdate: "/api/v1/model-type/update",
  modelTypeAdd: "/api/v1/model-type/register",

  //devcmcServer
  cmcServerList: "/api/v1/sv-cam/rows",
  cmcServerDelete: "/api/v1/sv-cam/delete",
  cmcServerUpdate: "/api/v1/sv-cam/update",
  cmcServerAdd: "/api/v1/sv-cam/register",

  //managemodelType
  modelList: "/api/v1/model/rows",
  modelDetail: "/api/v1/model/detail",
  modelDelete: "/api/v1/model/delete",
  modelUpdate: "/api/v1/model/update",
  modelAdd: "/api/v1/model/register",

  //manageStatistics
  integratedStatistics: "/api/v1/reports/integrated-statistics",
  activedRangeTime: "/api/v1/reports/statistics-device-active",

  //customer
  customerList: "/api/v1/customers/rows",
  customerInfo: "/api/v1/customers/detail",
  customerUpdate: "/api/v1/customers/update",
  customerRegister: "/api/v1/customers/register",

  //devOderStatus
  oderStatusList: "/api/v1/orders-status/rows",
  oderStatusDelete: "/api/v1/orders-status/delete",
  oderStatusUpdate: "/api/v1/orders-status/update",
  oderStatusAdd: "/api/v1/orders-status/register",

  //vehicleIcon
  vehicleIconList: "/api/v1/vehicle-icon/rows",
  vehicleIconDelete: "/api/v1/vehicle-icon/delete",
  vehicleIconUpdate: "/api/v1/vehicle-icon/update",
  vehicleIconRefresh: "/api/v1/vehicle-icon/register",

  //vehicleType
  vehicleTypeList: "/api/v1/vehicle-type/rows",
  vehicleTypeDelete: "/api/v1/vehicle-type/delete",
  vehicleTypeUpdate: "/api/v1/vehicle-type/update",
  vehicleTypeAdd: "/api/v1/vehicle-type/register",

  //role
  roleList: "/api/v1/role/rows",
  roleDelete: "/api/v1/role/delete",
  roleUpdate: "/api/v1/role/update",
  roleSortUpdate: "/api/v1/role/update-sort",
  roleAdd: "/api/v1/role/register",
  rolePermissionList: "/api/v1/role/get-permission",
  roleAddPermission: "/api/v1/role/register-permission",
  roleRemovePermission: "/api/v1/role/delete-permission",

  //permission
  permissionList: "/api/v1/permission/rows",
  permissionDelete: "/api/v1/permission/delete",
  permissionUpdate: "/api/v1/permission/update",
  permissionRefresh: "/api/v1/permission/register",

  //manageDevice
  deviceList: "/api/v1/device/rows",
  deviceDetail: "/api/v1/device/detail",
  deviceDelete: "/api/v1/device/delete",
  deviceUpdate: "/api/v1/device/update",
  deviceAdd: "/api/v1/device/register",
  deviceCheckInside: "/api/v1/device/check-inside",
  deviceActiveInside: "/api/v1/device/activation-inside",
  deviceReference: "/api/v1/device/reference",

  //manageOrder
  orderList: "/api/v1/orders/rows",
  orderDetail: "/api/v1/orders/detail",
  orderDelete: "/api/v1/orders/delete",
  orderUpdate: "/api/v1/orders/update",
  orderAdd: "/api/v1/orders/register",
  orderTreeAdd: "/api/v1/orders/register-tree",

  //package

  packageList: "/api/v1/service-package/rows",
  packageDelete: "/api/v1/service-package/delete",
  packageUpdate: "/api/v1/service-package/update",
  packageAdd: "/api/v1/service-package/register",
  packageDetail: "/api/v1/service-package/detail",

  //device
  route: "/api/v1/reports/playback",
  speed: "/api/v1/reports/speed",

  //report
  parkingReport: "/api/v1/reports/continuous",
  driveContinusReport: "/api/v1/reports/continuous",
  indayReport: "/api/v1/reports/inday",
  overSpeedReport: "/api/v1/reports/over-speed",

  sumaryIndayReport: "/api/v1/reports/inday",

  synByVehicle: "/api/v1/reports/statistic-speed",
  synByDriver: "/api/v1/reports/driver",
  offlineReport: "/api/v1/reports/status-gps",
  lostGPSReport: "/api/v1/reports/status-gps",
  detailedActivityReport: "/api/v1/reports/detail-activity",
  accumulatedDistanceReport: "/api/v1/reports/accumulated-distance",

  TT09THVPDVVT: "/api/v1/reports/statistic-speed",
  TT09VPTTDVVT: "/api/v1/reports/statistic-speed",
  TT09CTVPTDCX: "/api/v1/reports/over-speed",

  //address:
  address: "/nominatim/reverse.php",

  //driver
  driverList: "/api/v1/driver/rows",
  addDriver: "/api/v1/driver/register",
  updateDriver: "/api/v1/driver/update",
  deleteDriver: "/api/v1/driver/delete",
  detailDriver: "/api/v1/driver/detail",
  updateActivedDriver: "/api/v1/driver/update-actived",
  updateCheckDriver: "/api/v1/driver/update-check",
  licenseTypeList: "/api/v1/license-type/rows",
  driverTree: "/api/v1/driver/tree",
}
