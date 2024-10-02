// import { useEffect, useRef, useState } from "react"
// import {
//   ICustomerInfo,
//   IUserChild,
//   IUserDetailInfo,
// } from "../../../_types/userType"
// import { store } from "../../../app/store"
// import {
//   addCustomerService,
//   getCustomerInfoService,
//   getUserChildService,
//   updateCustomerInfoService,
// } from "../../../services/userServices"
// import { getLevelService } from "../../../services/dev_levelServices"
// import { ILevelType, IRoleType } from "../../../_types/devServerType"
// import { MaskLoader } from "../../Loader"
// import { FormC } from "../../FormC"
// import { Alert, Button, QRCode, Tag } from "antd"
// import { SaveFilled } from "@ant-design/icons"
// import { FormInstance } from "antd/lib"
// import { api } from "../../../_helper"
// import { _const } from "../../../_constant"
// import { getString } from "../../../utils/getString"
// import { _app } from "../../../utils/_app"
// import { _array } from "../../../utils/_array"
// // import { getRoleService } from "../../../services/dev_roleServices"
// import { Coppy } from "../../Coppy"

// interface IProps {
//   userId?: number
//   customerId?: number
//   onSuccess?: () => void
// }

// export const AddCustomerBox: React.FC<IProps> = ({ userId, onSuccess }) => {
//   const [isLoading, setIsLoading] = useState<boolean>(true)

//   const [userList, setUserList] = useState<IUserChild[]>()
//   const [formKey, setFormKey] = useState<number>(Math.random())
//   const [levelList, setLevelList] = useState<ILevelType[]>()
//   const [roleList, setRoleList] = useState<IRoleType[]>()
//   const formRef = useRef<FormInstance<any>>(null)

//   // const [customerInfo, setUserInfo] = useState<IUserDetailInfo>()

//   const customer = store?.getState?.()?.user?.child?.object?.[userId || -1]

//   const setFormKey_ = () => setFormKey(Math.random())

//   const getCustomerInfo = (userId: number) => {
//     setIsLoading(true)
//     const getUserChildPromise = getUserChildService()
//     const levelListPromise = getLevelService?.()
//     const levelRolePromise = getRoleService?.()

//     Promise.all([getUserChildPromise, levelListPromise, levelRolePromise])
//       .then(([userListFb, levelListFb, roleListFb]: any) => {
//         const user: any = store?.getState()?.user?.access?.userInfo
//         const levelList = levelListFb?.data
//         const roleList = roleListFb?.data
//         const userList = _array.removeCustomerUser([user, ...userListFb?.data])

//         setUserList(userList)
//         setLevelList(levelList)
//         setRoleList(roleList)
//       })
//       .catch((error) => {
//         console.log(error)
//       })
//       .finally(() => {
//         setIsLoading(false)
//         setFormKey_()
//       })
//   }

//   useEffect(() => {
//     if (userId) {
//       getCustomerInfo(userId)
//     }
//   }, [userId])

//   const formField = [
//     {
//       name: "parent_id",
//       type: "select",
//       label: "Tài khoản cha",
//       placeholder: "Chọn tài khoản cha",
//       options: [...(userList || [])]?.map?.((user, index) => {
//         return {
//           value: `${user?.id}`,
//           title: `${user?.customer_name}  (${user?.username})`,
//         }
//       }),
//       rules: [
//         {
//           required: true,
//           message: "Không được để trống",
//         },
//       ],
//     },
//     null,
//     "hole",

//     {
//       name: "username",
//       type: "input",
//       label: "Tài khoản đăng nhập",
//       placeholder: "Nhập tên tài khoản",
//       rules: [
//         {
//           required: true,
//           message: "Không được để trống",
//         },
//       ],
//     },
//     {
//       name: "password",
//       type: "inputPassword",
//       label: "Mật khẩu",
//       placeholder: "Nhập mật khẩu",
//       rules: [
//         {
//           required: true,
//           message: "Không được để trống",
//         },
//       ],
//     },
//     "hole",
//     {
//       name: "name",
//       type: "input",
//       label: "Tên hiển thị",
//       placeholder: "Nhập tên hiển thị",
//       rules: [
//         {
//           required: true,
//           message: "Không được để trống",
//         },
//       ],
//     },
//     {
//       name: "company",
//       type: "input",
//       label: "Tên công ty",
//       placeholder: "Nhập tên công ty",
//     },
//     "hole",
//     {
//       name: "level_id",
//       type: "radio",
//       label: "Loại",
//       placeholder: "Chọn loại",
//       options: [...(levelList || [])]?.reverse?.()?.map?.((level, index) => {
//         return {
//           value: `${level?.id}`,
//           title: level?.name,
//         }
//       }),
//       rules: [
//         {
//           required: true,
//           message: "Không được để trống",
//         },
//       ],
//     },
//     null,
//     null,
//     {
//       name: "role_id",
//       type: "radio",
//       label: "Vai trò",
//       placeholder: "Vai trò",
//       options: [...(roleList || [])]?.reverse?.()?.map?.((role, index) => {
//         return {
//           value: `${role?.id}`,
//           title: role?.name,
//         }
//       }),
//       rules: [
//         {
//           required: true,
//           message: "Không được để trống",
//         },
//       ],
//     },
//     null,
//     null,
//     {
//       name: "phone",
//       type: "input",
//       label: "Số điện thoại",
//       placeholder: "Nhập số điện thoại",
//     },
//     {
//       name: "email",
//       type: "input",
//       label: "Email",
//       placeholder: "Nhập email",
//     },
//     "hole",
//     {
//       name: "tax_code",
//       type: "input",
//       label: "Mã số thuế (Tax)",
//       placeholder: "Nhập mã số thuế",
//     },
//     {
//       name: "website",
//       type: "input",
//       label: "Trang web (website)",
//       placeholder: "Nhập trang web",
//     },
//     "hole",
//     {
//       name: "address",
//       type: "textarea",
//       label: "Địa chỉ",
//       placeholder: "Nhập địa chỉ",
//     },
//     "hole",
//   ]

//   const defaultValues = {
//     parent_id: `${userId}`,
//   }

//   const handleSubmit = (vals: any) => {
//     const update = () => {
//       if (userId) {
//         setIsLoading(true)
//         addCustomerService({
//           ...vals,
//           publish: 1,
//         })
//           ?.then((fb: any) => {
//             if (fb?.result) {
//               api.message?.success(
//                 fb?.message || _const?.string?.message?.success,
//               )
//               _app.getInitialData?.userChild?.()
//               onSuccess?.()
//             } else {
//               api.message?.error(fb?.message || _const?.string?.message?.error)
//             }
//           })
//           .catch((error) => {
//             api.message?.error(
//               getString.errorAxiosParams(error) ||
//                 _const?.string?.message?.error,
//             )
//           })
//           .then((fb) => {
//             setIsLoading(false)
//           })
//       }
//     }

//     api.modal?.confirm?.({
//       title: "Xác nhận đăng ký tài khoản khách hàng?",
//       content: (
//         <div>
//           <div className="flex flex-col gap-4">
//             <div>
//               <div>
//                 Bạn đang đăng ký khách hàng mới với tài khoản và mật khẩu:
//               </div>
//               <div className="italic">
//                 (Di chuột vào tài khoản hoặc quét mã QR để sao chép)
//               </div>
//             </div>
//             <div className="flex flex-col gap-2">
//               <Alert
//                 message={<Coppy>{`${vals?.username}/${vals?.password}`}</Coppy>}
//                 type="info"
//               />
//               <Alert
//                 message={
//                   <Coppy>
//                     {`Tài khoản: ${vals?.username}\nMật khẩu: ${vals?.password}`}
//                   </Coppy>
//                 }
//                 type="info"
//               />
//             </div>
//             <div className="w-full ">
//               <QRCode
//                 color="#000000"
//                 value={`${vals?.username}/${vals?.password}`}
//               />
//             </div>
//           </div>
//         </div>
//       ),
//       onOk: update,
//     })
//   }

//   const submit = () => {
//     formRef?.current?.submit?.()
//   }

//   return (
//     <div className="py-2 relative px-4">
//       {isLoading ? <MaskLoader /> : null}
//       <div className="flex flex-col gap-4">
//         <Alert
//           message={
//             "Chỉ nên thêm khách hàng tài khoản vào tài khoản cha, tránh tạo vào các tài khoản con"
//           }
//           type="info"
//         />

//         <FormC
//           key={`${userId}`}
//           ref={formRef}
//           onFinish={handleSubmit}
//           initialValues={defaultValues}
//           fields={formField}
//           chunk={3}
//           chunkWidth={100}
//         />
//       </div>
//       <div>
//         <Button type="primary" icon={<SaveFilled />} onClick={submit}>
//           Thêm tài khoản
//         </Button>
//       </div>
//     </div>
//   )
// }
