// const data = {
//   info: {
//     _postman_id: "7a8206d7-4711-46b1-b568-4054a095043f",
//     name: "New Collection Copy",
//     schema:
//       "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
//     _exporter_id: "21419747",
//     _collection_link:
//       "https://martian-spaceship-162237.postman.co/workspace/New-Team-Workspace~8d73da00-2da6-4369-bcce-1f5f03850d29/collection/21419747-7a8206d7-4711-46b1-b568-4054a095043f?action=share&source=collection_link&creator=21419747",
//   },
//   item: [
//     {
//       name: "system gps",
//       item: [
//         {
//           name: "module",
//           item: [
//             {
//               name: "tree",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [
//                   {
//                     key: "au",
//                     value: "",
//                     disabled: true,
//                   },
//                 ],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/module/tree",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "module", "tree"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "all rows",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [
//                   {
//                     key: "",
//                     value: "",
//                   },
//                 ],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/module/rows",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "module", "rows"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "detail",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/module/detail/41",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "module", "detail", "41"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "register",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "POST",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "parent_id":0, "name":"", "link":"/monitor", "component":"Monitor", "icon":"", "publish":1\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/module/register",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "module", "register"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PUT",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "parent_id":0, "name":"Giám sát", "link":"/monitor", "component":"Monitor", "icon":"", "publish":0\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/module/update/41",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "module", "update", "41"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update publish",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PATCH",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{"publish":0}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/module/update-publish/41",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "module", "update-publish", "41"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update sort",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PATCH",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{"sort":1}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/module/update-sort/41",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "module", "update-sort", "41"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "delete",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "DELETE",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/module/delete/42",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "module", "delete", "42"],
//                 },
//               },
//               response: [],
//             },
//           ],
//         },
//         {
//           name: "level",
//           item: [
//             {
//               name: "all rows",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [
//                   {
//                     key: "",
//                     value: "",
//                   },
//                 ],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/level/rows?keyword=&offset=0&limit=10",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "level", "rows"],
//                   query: [
//                     {
//                       key: "keyword",
//                       value: "",
//                     },
//                     {
//                       key: "offset",
//                       value: "0",
//                     },
//                     {
//                       key: "limit",
//                       value: "10",
//                     },
//                   ],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "detail",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/level/detail/2",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "level", "detail", "2"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "register",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "POST",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "name": "Khách hàng",\n    "des": "",\n    "publish": 1\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/level/register",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "level", "register"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "register permission",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "POST",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "name": "Khách hàng",\n    "des": "",\n    "publish": 1\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/level/register-permission",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "level", "register-permission"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PUT",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "name":"Nhà phân phối 1", "des":"", "publish":1\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/level/update/41",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "level", "update", "41"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update publish",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PATCH",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{"publish":0}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/level/update-publish/1",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "level", "update-publish", "1"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update sort",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PATCH",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{"sort":1}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/level/update-sort/1",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "level", "update-sort", "1"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "delete",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "DELETE",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: "",
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/level/delete/1",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "level", "delete", "1"],
//                 },
//               },
//               response: [],
//             },
//           ],
//         },
//         {
//           name: "role",
//           item: [
//             {
//               name: "all rows",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [
//                   {
//                     key: "",
//                     value: "",
//                   },
//                 ],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/role/rows?keyword=&offset=0&limit=1",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "role", "rows"],
//                   query: [
//                     {
//                       key: "keyword",
//                       value: "",
//                     },
//                     {
//                       key: "offset",
//                       value: "0",
//                     },
//                     {
//                       key: "limit",
//                       value: "1",
//                     },
//                   ],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "detail",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/role/detail/41",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "role", "detail", "41"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "register",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "POST",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "name": "Quản lý kĩ thuật",\n    "des": "",\n    "publish": 1\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/role/register",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "role", "register"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "register permission",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "POST",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "id": 1,\n    "permission": "[1,2,3,4,5,6]"\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/role/register-permission",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "role", "register-permission"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PUT",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "name": "Giám sát",\n    "des": "",\n    "publish": 0\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/role/update/41",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "role", "update", "41"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update publish",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PATCH",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{"publish":0}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/role/update-publish/41",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "role", "update-publish", "41"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update sort",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PATCH",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{"sort":1}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/role/update-sort/41",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "role", "update-sort", "41"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "delete",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "DELETE",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/role/delete/42",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "role", "delete", "42"],
//                 },
//               },
//               response: [],
//             },
//           ],
//         },
//         {
//           name: "connection type",
//           item: [
//             {
//               name: "all rows",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [
//                   {
//                     key: "",
//                     value: "",
//                   },
//                 ],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/connection-type/rows?keyword=4&offset=0&limit=10",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "connection-type", "rows"],
//                   query: [
//                     {
//                       key: "keyword",
//                       value: "4",
//                     },
//                     {
//                       key: "offset",
//                       value: "0",
//                     },
//                     {
//                       key: "limit",
//                       value: "10",
//                     },
//                   ],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "detail",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/connection-type/detail/1",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "connection-type", "detail", "1"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "register",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "POST",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "name": "3G",\n    "note": "",\n    "publish": 1\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/connection-type/register",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "connection-type", "register"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PUT",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "name": "4G",\n    "note": "",\n    "publish": 1\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/connection-type/update/1",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "connection-type", "update", "1"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update publish",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PATCH",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{"publish":0}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/connection-type/update-publish/41",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: [
//                     "api",
//                     "v1",
//                     "connection-type",
//                     "update-publish",
//                     "41",
//                   ],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "delete",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "DELETE",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/connection-type/delete/42",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "connection-type", "delete", "42"],
//                 },
//               },
//               response: [],
//             },
//           ],
//         },
//         {
//           name: "permission",
//           item: [
//             {
//               name: "all rows",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [
//                   {
//                     key: "",
//                     value: "",
//                   },
//                 ],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/permission/rows?keyword=&offset=0&limit=10",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "permission", "rows"],
//                   query: [
//                     {
//                       key: "keyword",
//                       value: "",
//                     },
//                     {
//                       key: "offset",
//                       value: "0",
//                     },
//                     {
//                       key: "limit",
//                       value: "10",
//                     },
//                   ],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "detail",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/permission/detail/1",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "permission", "detail", "1"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "register",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "POST",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "name": "thêm người dùng",\n    "method": "post",\n    "router": "api/v1/users/register",\n    "publish": 1\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/permission/register",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "permission", "register"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PUT",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "name": "thêm người dùng",\n    "method": "post",\n    "router": "api/v1/users/register",\n    "publish": 0\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/permission/update/1",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "permission", "update", "1"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update publish",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PATCH",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{"publish":0}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/permission/update-publish/41",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "permission", "update-publish", "41"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "delete",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "DELETE",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/permission/delete/42",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "permission", "delete", "42"],
//                 },
//               },
//               response: [],
//             },
//           ],
//         },
//         {
//           name: "firmware",
//           item: [
//             {
//               name: "all rows",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [
//                   {
//                     key: "",
//                     value: "",
//                   },
//                 ],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/firmware/rows?keyword=&offset=0&limit=10",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "firmware", "rows"],
//                   query: [
//                     {
//                       key: "keyword",
//                       value: "",
//                     },
//                     {
//                       key: "offset",
//                       value: "0",
//                     },
//                     {
//                       key: "limit",
//                       value: "10",
//                     },
//                   ],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "detail",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/firmware/detail/1",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "firmware", "detail", "1"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "register",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "POST",
//                 header: [],
//                 body: {
//                   mode: "formdata",
//                   formdata: [
//                     {
//                       key: "firmware",
//                       type: "file",
//                       src: "/Users/duykhuong/Desktop/bfh_ofw.t302.ofw.sandisk_itlc_3d_g4_2p_256gb.bin",
//                     },
//                     {
//                       key: "file_note",
//                       type: "file",
//                       src: "/Users/duykhuong/Desktop/v3.5.7.rst.txt",
//                     },
//                     {
//                       key: "name",
//                       value: "HV104-SV153",
//                       type: "text",
//                     },
//                     {
//                       key: "model_id",
//                       value: "2",
//                       type: "text",
//                     },
//                     {
//                       key: "version_hardware",
//                       value: "1.5.3",
//                       type: "text",
//                     },
//                     {
//                       key: "version_software",
//                       value: "1.0.4",
//                       type: "text",
//                     },
//                     {
//                       key: "checksum",
//                       value: "ff",
//                       type: "text",
//                     },
//                     {
//                       key: "note",
//                       value: "",
//                       type: "text",
//                     },
//                     {
//                       key: "publish",
//                       value: "1",
//                       type: "text",
//                     },
//                   ],
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/firmware/register",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "firmware", "register"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PUT",
//                 header: [],
//                 body: {
//                   mode: "formdata",
//                   formdata: [
//                     {
//                       key: "firmware",
//                       type: "file",
//                       src: "/Users/duykhuong/Desktop/bfh_ofw.t302.ofw.sandisk_itlc_3d_g4_2p_256gb_____1.bin",
//                     },
//                     {
//                       key: "file_note",
//                       type: "file",
//                       src: "/Users/duykhuong/Desktop/v3.5.7___1.rst.txt",
//                     },
//                     {
//                       key: "name",
//                       value: "HV104-SV153",
//                       type: "text",
//                     },
//                     {
//                       key: "model_id",
//                       value: "2",
//                       type: "text",
//                     },
//                     {
//                       key: "version_hardware",
//                       value: "1.5.3",
//                       type: "text",
//                     },
//                     {
//                       key: "version_software",
//                       value: "1.0.4",
//                       type: "text",
//                     },
//                     {
//                       key: "checksum",
//                       value: "ff",
//                       type: "text",
//                     },
//                     {
//                       key: "note",
//                       value: "222",
//                       type: "text",
//                     },
//                     {
//                       key: "publish",
//                       value: "1",
//                       type: "text",
//                     },
//                   ],
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/firmware/update/1",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "firmware", "update", "1"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update publish",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PATCH",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{"publish":0}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/firmware/update-publish/41",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "firmware", "update-publish", "41"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "delete",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "DELETE",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/firmware/delete/42",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "firmware", "delete", "42"],
//                 },
//               },
//               response: [],
//             },
//           ],
//         },
//         {
//           name: "device",
//           item: [
//             {
//               name: "all rows",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [
//                   {
//                     key: "",
//                     value: "",
//                   },
//                 ],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/device/rows?keyword=&offset=0&limit=10",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "device", "rows"],
//                   query: [
//                     {
//                       key: "keyword",
//                       value: "",
//                     },
//                     {
//                       key: "offset",
//                       value: "0",
//                     },
//                     {
//                       key: "limit",
//                       value: "10",
//                     },
//                   ],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "detail",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/device/detail/7",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "device", "detail", "7"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "check",
//               request: {
//                 auth: {
//                   type: "noauth",
//                 },
//                 method: "GET",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/device/check-outside/1220190046",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "device", "check-outside", "1220190046"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "checked",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/device/check-inside/000020100011",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "device", "check-inside", "000020100011"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "reference",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/device/reference/7",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "device", "reference", "7"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "register",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "POST",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "dev_id": "000020100011",\n    "imei": "000020100011",\n    "serial": "2024",\n    "model_id":"2"\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/device/register",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "device", "register"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PUT",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "dev_id": "08F2BA19ET",\n    "imei": "08F2BA19ET",\n    "serial": "",\n    "model_id":"2",\n    "device_status_id":1\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/device/update/1",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "device", "update", "1"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "delete",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "DELETE",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/device/delete/3",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "device", "delete", "3"],
//                 },
//               },
//               response: [],
//             },
//           ],
//         },
//         {
//           name: "orders",
//           item: [
//             {
//               name: "all rows",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [
//                   {
//                     key: "",
//                     value: "",
//                   },
//                 ],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/orders/rows?keyword=&offset=0&limit=10",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "orders", "rows"],
//                   query: [
//                     {
//                       key: "keyword",
//                       value: "",
//                     },
//                     {
//                       key: "offset",
//                       value: "0",
//                     },
//                     {
//                       key: "limit",
//                       value: "10",
//                     },
//                   ],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "detail",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/orders/detail/14",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "orders", "detail", "14"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "register",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "POST",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "code": "2024052901",\n    "reciver": "4",\n    "note": "Đơn hàng được lên cho KH",\n    "devices_id":"[4]"\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/orders/register",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "orders", "register"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "merge",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "POST",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "code": "2024052902",\n    "reciver": "4",\n    "note": "",\n    "orders_code":"[2024052902,2024052901]"\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/orders/merge",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "orders", "merge"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "add tree",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "POST",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "code": "2024052912",\n    "recivers": "[5,4,6]",\n    "devices_id": "[7]",\n    "note":"tạo cây đơn hàng"\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/orders/register-tree",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "orders", "register-tree"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PUT",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "code": "2024052902",\n    "reciver": "4",\n    "note": "Đơn hàng được lên cho MA",\n    "devices_id":""\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/orders/update/5",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "orders", "update", "5"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "delete",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "DELETE",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/orders/delete/42",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "orders", "delete", "42"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "delete device",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "DELETE",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "device_id":5\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/orders/delete-device/5",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "orders", "delete-device", "5"],
//                 },
//               },
//               response: [],
//             },
//           ],
//         },
//         {
//           name: "orders status",
//           item: [
//             {
//               name: "all rows",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [
//                   {
//                     key: "",
//                     value: "",
//                   },
//                 ],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/orders-status/rows?keyword=&offset=0&limit=10",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "orders-status", "rows"],
//                   query: [
//                     {
//                       key: "keyword",
//                       value: "",
//                     },
//                     {
//                       key: "offset",
//                       value: "0",
//                     },
//                     {
//                       key: "limit",
//                       value: "10",
//                     },
//                   ],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "detail",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/orders-status/detail/1",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "orders-status", "detail", "1"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "register",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "POST",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "title": "Đã xuất",\n    "des": "",\n    "publish": 1\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/orders-status/register",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "orders-status", "register"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PUT",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "title": "Thu hồi",\n    "note": "",\n    "publish": 1\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/orders-status/update/1",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "orders-status", "update", "1"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update publish",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PATCH",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{"publish":0}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/connection-type/update-publish/41",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: [
//                     "api",
//                     "v1",
//                     "connection-type",
//                     "update-publish",
//                     "41",
//                   ],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "delete",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "DELETE",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/connection-type/delete/42",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "connection-type", "delete", "42"],
//                 },
//               },
//               response: [],
//             },
//           ],
//         },
//         {
//           name: "service package",
//           item: [
//             {
//               name: "all rows",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [
//                   {
//                     key: "",
//                     value: "",
//                   },
//                 ],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/connection-type/rows?keyword=4&offset=0&limit=10",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "connection-type", "rows"],
//                   query: [
//                     {
//                       key: "keyword",
//                       value: "4",
//                     },
//                     {
//                       key: "offset",
//                       value: "0",
//                     },
//                     {
//                       key: "limit",
//                       value: "10",
//                     },
//                   ],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "detail",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/connection-type/detail/1",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "connection-type", "detail", "1"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "register",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "POST",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "name": "3G",\n    "note": "",\n    "publish": 1\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/service-package/register",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "service-package", "register"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PUT",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "name": "4G",\n    "note": "",\n    "publish": 1\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/connection-type/update/1",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "connection-type", "update", "1"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update publish",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PATCH",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{"publish":0}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/connection-type/update-publish/41",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: [
//                     "api",
//                     "v1",
//                     "connection-type",
//                     "update-publish",
//                     "41",
//                   ],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "delete",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "DELETE",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/connection-type/delete/42",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "connection-type", "delete", "42"],
//                 },
//               },
//               response: [],
//             },
//           ],
//         },
//         {
//           name: "model type",
//           item: [
//             {
//               name: "all rows",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [
//                   {
//                     key: "",
//                     value: "",
//                   },
//                 ],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/model-type/rows?keyword=&offset=0&limit=10",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "model-type", "rows"],
//                   query: [
//                     {
//                       key: "keyword",
//                       value: "",
//                     },
//                     {
//                       key: "offset",
//                       value: "0",
//                     },
//                     {
//                       key: "limit",
//                       value: "10",
//                     },
//                   ],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "detail",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/model-type/detail/1",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "model-type", "detail", "1"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "register",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "POST",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "name": "gps",\n    "des": "",\n    "publish": 1\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/model-type/register",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "model-type", "register"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PUT",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "name": "4G",\n    "des": "",\n    "publish": 1\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/model-type/update/1",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "model-type", "update", "1"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update publish",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PATCH",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{"publish":0}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/model-type/update-publish/41",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "model-type", "update-publish", "41"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "delete",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "DELETE",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/model-type/delete/42",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "model-type", "delete", "42"],
//                 },
//               },
//               response: [],
//             },
//           ],
//         },
//         {
//           name: "disk",
//           item: [
//             {
//               name: "all rows",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [
//                   {
//                     key: "",
//                     value: "",
//                   },
//                 ],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/disk/rows?keyword=&offset=0&limit=10",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "disk", "rows"],
//                   query: [
//                     {
//                       key: "keyword",
//                       value: "",
//                     },
//                     {
//                       key: "offset",
//                       value: "0",
//                     },
//                     {
//                       key: "limit",
//                       value: "10",
//                     },
//                   ],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "detail",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/disk/detail/1",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "disk", "detail", "1"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "register",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "POST",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "name": "HDD",\n    "publish": 1\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/disk/register",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "disk", "register"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PUT",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "name": "HDD",\n    "publish": 1\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/disk/update/2",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "disk", "update", "2"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update publish",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PATCH",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{"publish":0}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/role/update-publish/41",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "role", "update-publish", "41"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "delete",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "DELETE",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/role/delete/42",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "role", "delete", "42"],
//                 },
//               },
//               response: [],
//             },
//           ],
//         },
//         {
//           name: "vehicle icon",
//           item: [
//             {
//               name: "all rows",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [
//                   {
//                     key: "",
//                     value: "",
//                   },
//                 ],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/vehicle-icon/rows?keyword=&offset=0&limit=",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "vehicle-icon", "rows"],
//                   query: [
//                     {
//                       key: "keyword",
//                       value: "",
//                     },
//                     {
//                       key: "offset",
//                       value: "0",
//                     },
//                     {
//                       key: "limit",
//                       value: "",
//                     },
//                   ],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "detail",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/vehicle-icon/detail/2",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "vehicle-icon", "detail", "2"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "register",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "POST",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "name": "Xe Đầu kéo",\n    "note": "",\n    "publish": 1\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/vehicle-icon/register",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "vehicle-icon", "register"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PUT",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "name": "Xe đầu kéo",\n    "note": "mô tả",\n    "publish": 1\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/vehicle-icon/update/2",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "vehicle-icon", "update", "2"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update publish",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PATCH",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "publish": 1\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/vehicle-icon/update-publish/2",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "vehicle-icon", "update-publish", "2"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "delete",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "DELETE",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/vehicle-icon/delete/2",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "vehicle-icon", "delete", "2"],
//                 },
//               },
//               response: [],
//             },
//           ],
//         },
//         {
//           name: "vehicle type",
//           item: [
//             {
//               name: "all rows",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [
//                   {
//                     key: "",
//                     value: "",
//                   },
//                 ],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/vehicle-type/rows?keyword=a&offset=0&limit=",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "vehicle-type", "rows"],
//                   query: [
//                     {
//                       key: "keyword",
//                       value: "a",
//                     },
//                     {
//                       key: "offset",
//                       value: "0",
//                     },
//                     {
//                       key: "limit",
//                       value: "",
//                     },
//                   ],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "detail",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/vehicle-type/detail/1",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "vehicle-type", "detail", "1"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "register",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "POST",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "name": "",\n    "vehicle_icon_id":"1",\n    "max_speed":"80",\n    "rule":1,\n    "publish": 1\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/vehicle-type/register",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "vehicle-type", "register"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PUT",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "name": "xe buýt",\n    "vehicle_icon_id":"1",\n    "max_speed":"80",\n    "rule":0,\n    "publish": 0\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/vehicle-type/update/2",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "vehicle-type", "update", "2"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update publish",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PATCH",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "publish": 1\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/vehicle-type/update-publish/1",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "vehicle-type", "update-publish", "1"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "delete",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "DELETE",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/vehicle-type/delete/1",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "vehicle-type", "delete", "1"],
//                 },
//               },
//               response: [],
//             },
//           ],
//         },
//         {
//           name: "model",
//           item: [
//             {
//               name: "all rows",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [
//                   {
//                     key: "",
//                     value: "",
//                   },
//                 ],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/model/rows?keyword=&disk_id=&type=&connection_type_id=&offset=0&limit=",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "model", "rows"],
//                   query: [
//                     {
//                       key: "keyword",
//                       value: "",
//                     },
//                     {
//                       key: "disk_id",
//                       value: "",
//                     },
//                     {
//                       key: "type",
//                       value: "",
//                     },
//                     {
//                       key: "connection_type_id",
//                       value: "",
//                     },
//                     {
//                       key: "offset",
//                       value: "0",
//                     },
//                     {
//                       key: "limit",
//                       value: "",
//                     },
//                   ],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "detail",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/model/detail/2",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "model", "detail", "2"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "register",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "POST",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "name": "MC001",\n    "made_in":"MC001",\n    "type":"2",\n    "disk_id":1,\n    "connection_type_id":"[1,2]",\n    "quantity_channel":1,\n    "note":"ghi chú",\n    "publish": 1,\n    "is_gps":1\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/model/register",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "model", "register"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PUT",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "name": "MC001",\n    "made_in":"BW",\n    "type":"2",\n    "disk_id":1,\n    "connection_type_id":"[1,2]",\n    "quantity_channel":1,\n    "note":"ghi chú",\n    "publish": 1,\n    "is_gps":1\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/model/update/2",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "model", "update", "2"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update publish",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PATCH",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "publish": 1\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/vehicle-type/update-publish/1",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "vehicle-type", "update-publish", "1"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "delete",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "DELETE",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/vehicle-type/delete/1",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "vehicle-type", "delete", "1"],
//                 },
//               },
//               response: [],
//             },
//           ],
//         },
//         {
//           name: "device status",
//           item: [
//             {
//               name: "all rows",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [
//                   {
//                     key: "",
//                     value: "",
//                   },
//                 ],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/device-status/rows?keyword=a&offset=0&limit=1",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "device-status", "rows"],
//                   query: [
//                     {
//                       key: "keyword",
//                       value: "a",
//                     },
//                     {
//                       key: "offset",
//                       value: "0",
//                     },
//                     {
//                       key: "limit",
//                       value: "1",
//                     },
//                   ],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "detail",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/device-status/detail/1",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "device-status", "detail", "1"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "register",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "POST",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "title": "Khoá",\n    "des":"",\n    "publish": 1\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/device-status/register",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "device-status", "register"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PUT",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "title": "Khoá 1",\n    "des":"",\n    "publish": 0\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/device-status/update/2",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "device-status", "update", "2"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update publish",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PATCH",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "publish": 1\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/device-status/update-publish/2",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "device-status", "update-publish", "2"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "delete",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "DELETE",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/device-status/delete/1",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "device-status", "delete", "1"],
//                 },
//               },
//               response: [],
//             },
//           ],
//         },
//         {
//           name: "driver",
//           item: [
//             {
//               name: "all rows",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [
//                   {
//                     key: "",
//                     value: "",
//                   },
//                 ],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/driver/rows?keyword=&customer_id=&is_check=&offset=0&limit=1",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "driver", "rows"],
//                   query: [
//                     {
//                       key: "keyword",
//                       value: "",
//                     },
//                     {
//                       key: "customer_id",
//                       value: "",
//                     },
//                     {
//                       key: "is_check",
//                       value: "",
//                     },
//                     {
//                       key: "offset",
//                       value: "0",
//                     },
//                     {
//                       key: "limit",
//                       value: "1",
//                     },
//                   ],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "detail",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/driver/detail/l",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "driver", "detail", "l"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "register",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "POST",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "customer_id": "4",\n    "name": "ngôi sao \'1\'",\n    "license_number": "1234543214",\n    "birthday": "",\n    "citizen_identity_card": "",\n    "gender": "1",\n    "phone": "0986395111",\n    "address": "",\n    "license_type_id": "1",\n    "expired_on": "",\n    "activation_date": "",\n    "is_actived": 1\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/driver/register",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "driver", "register"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PUT",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "customer_id": "4",\n    "name": "test",\n    "license_number": "12345432",\n    "birthday": "",\n    "citizen_identity_card": "",\n    "gender": "1",\n    "phone": "0986395111",\n    "address": "",\n    "license_type_id": "2",\n    "expired_on": "",\n    "activation_date": "",\n    "is_actived": 1\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/driver/update/d",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "driver", "update", "d"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update actieve",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PATCH",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "is_actived": "1"\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/driver/update-active/1",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "driver", "update-active", "1"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update check",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PATCH",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{"is_check":1}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/driver/update-check/1",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "driver", "update-check", "1"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "delete",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "DELETE",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/driver/delete/1",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "driver", "delete", "1"],
//                 },
//               },
//               response: [],
//             },
//           ],
//         },
//         {
//           name: "customers",
//           item: [
//             {
//               name: "all rows",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [
//                   {
//                     key: "",
//                     value: "",
//                   },
//                 ],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/customers/rows?keyword=&level_id=&offset=0&limit=10",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "customers", "rows"],
//                   query: [
//                     {
//                       key: "keyword",
//                       value: "",
//                     },
//                     {
//                       key: "level_id",
//                       value: "",
//                     },
//                     {
//                       key: "offset",
//                       value: "0",
//                     },
//                     {
//                       key: "limit",
//                       value: "10",
//                     },
//                   ],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "detail",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/customers/detail/1?<script>",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "customers", "detail", "1"],
//                   query: [
//                     {
//                       key: "<script>",
//                       value: null,
//                     },
//                   ],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "register",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "POST",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "level_id":"1",\n    "name":"NPP Loca", \n    "company":"CTY LC",\n    "email":"",\n    "phone":"",\n    "address":"",\n    "tax_code":"",\n    "website":"",\n    "publish":1\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/customers/register",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "customers", "register"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PUT",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "level_id":"1",\n    "name":"Mai Anh", \n    "company":" CTY Mai Anh 2",\n    "email":"maianh@gmail.com",\n    "phone":"",\n    "address":"",\n    "tax_code":"",\n    "website":""\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/customers/update/3",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "customers", "update", "3"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update publish",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PATCH",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{"publish":0}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/connection-type/update-publish/41",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: [
//                     "api",
//                     "v1",
//                     "connection-type",
//                     "update-publish",
//                     "41",
//                   ],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "delete",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "DELETE",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/customers/delete/5",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "customers", "delete", "5"],
//                 },
//               },
//               response: [],
//             },
//           ],
//         },
//         {
//           name: "users",
//           item: [
//             {
//               name: "all rows",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [
//                   {
//                     key: "",
//                     value: "",
//                   },
//                 ],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/users/rows",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "users", "rows"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "detail",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/users/detail/2",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "users", "detail", "2"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "info",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/users/detail/2",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "users", "detail", "2"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "register",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "POST",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "parent_id":"1",\n    "customer_id":"9",\n    "username":"local", \n    "password":"Loca2024",\n    "role_id":"3",\n    "is_actived":1\n    \n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/users/register",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "users", "register"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "register team",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "POST",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "parent_id":"1",\n    "name":"Miền Bắc"\n    \n    \n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/users/register-team",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "users", "register-team"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "update",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PUT",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "parent_id":"0",\n    "role_id":"1",\n    "customer_id":"4",\n    "is_actived":1\n    \n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/users/update/2",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "users", "update", "2"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "delete",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/users/info",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "users", "info"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "logout",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "DELETE",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/users/logout",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "users", "logout"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "reset pass",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PATCH",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/users/reset-pass/3",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "users", "reset-pass", "3"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "change pass",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "PATCH",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "new_password":"Maianh2024",\n    "old_password":"GpsVn579"\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/users/change-pass/2",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "users", "change-pass", "2"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "login",
//               request: {
//                 method: "POST",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '// {\n//     "username":"mid",\n//     "password":"Midvn2024"\n// }\n\n// {\n//     "username":"maianh",\n//     "password":"Maianh2024"\n// }\n\n{\n    "username":"khdlmaianh",\n    "password":"Khdlmaianh2024"\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/users/login",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "users", "login"],
//                 },
//               },
//               response: [],
//             },
//             {
//               name: "refresh token",
//               request: {
//                 method: "POST",
//                 header: [],
//                 body: {
//                   mode: "raw",
//                   raw: '{\n    "refresh_token":"{{refreshToken}}"\n}',
//                   options: {
//                     raw: {
//                       language: "json",
//                     },
//                   },
//                 },
//                 url: {
//                   raw: "http://localhost:4000/api/v1/users/refresh-token",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "users", "refresh-token"],
//                 },
//               },
//               response: [],
//             },
//           ],
//         },
//         {
//           name: "license type",
//           item: [
//             {
//               name: "all rows",
//               request: {
//                 auth: {
//                   type: "bearer",
//                   bearer: [
//                     {
//                       key: "token",
//                       value: "{{token}}",
//                       type: "string",
//                     },
//                   ],
//                 },
//                 method: "GET",
//                 header: [],
//                 url: {
//                   raw: "http://localhost:4000/api/v1/license-type/rows",
//                   protocol: "http",
//                   host: ["localhost"],
//                   port: "4000",
//                   path: ["api", "v1", "license-type", "rows"],
//                 },
//               },
//               response: [],
//             },
//           ],
//         },
//       ],
//     },
//   ],
// }

// const p = () => {
//   const apis: any[] = []
//   data?.item?.[0]?.item?.forEach?.((api, index_) => {
//     api?.item?.forEach?.((api1, index) => {
//       let ls = ""
//       const path = api1?.request?.url?.path
//       const isUpdate: any = Number(path?.[path?.length - 1])
//       if (!Number?.isNaN(isUpdate)) {
//         ls = "/:id"
//         path?.splice(-1)
//       }
//       const group_ = path?.[2]

//       const d = {
//         name: `${path?.[path?.length - 1]}${index_}${index}`,
//         method: api1?.request?.method,
//         router: `/${path?.join("/")}${ls}`,
//         publish: 1,
//         group_,
//       }
//       apis?.push(d)
//     })
//   })

//   // apis?.forEach?.((api, index) => {
//   //   setTimeout(() => {
//   //     addPermissionService?.(api)
//   //       .then((fb) => {
//   //         console.log(fb)
//   //       })
//   //       .catch((error) => {
//   //         console.log(error)
//   //       })
//   //   }, index * 2000)
//   // })
// }

// setTimeout(() => {
//   p()
// }, 3000)
