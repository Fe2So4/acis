import axios from 'axios'
// import { Message } from 'element-ui'
// import { getUserToken, removeUserToken } from '../utils/storage'
import { getUserToken } from '../utils/storage'
// const request = (options) => {
//   return axios(options)
//     .then(res => {
//       console.log(res)
//       return res
//     })
//     .catch(err => {
//       Message({
//         type: 'error',
//         message: JSON.stringify(err, '', 2)
//       })
//     })
// }
const request = axios.create()
// 添加一个请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = getUserToken()
  if (token) {
    config.headers.Authorization = token // 将token放到请求头发送给服务器
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  if (process.env.NODE_ENV === 'development') {
    // Message({
    //   type: 'error',
    //   message: JSON.stringify(error, '', 2)
    // })
  }
  return Promise.reject(error)
})
export default request

// const showErrorMessage = (error) => {
//   if (process.env.NODE_ENV === 'development') {
//     Message({
//       type: 'error',
//       showClose: true,
//       message: JSON.stringify(error, null, 2)
//     })
//   }
// }

// const instance = axios.create()
// // 增加token
// const token = getUserToken()
// if (token) {
//   instance.defaults.headers.common.Authorization = token
// }

// export const _request = (options) => {
//   return instance(options)
//     .then(
//       res => {
//         if (res.data && res.data.success) {
//           return res.data.data
//         } else {
//           return Promise.reject(new Error('响应数据错误'))
//         }
//       }
//     )
//     .catch(function (error) {
//       console.log(error)
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         showErrorMessage(error.response, 'response')
//       } else if (error.request) {
//         // The request was made but no response was received
//         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//         // http.ClientRequest in node.js
//         showErrorMessage(error.request, 'request')
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         showErrorMessage(error.message, 'setting up')
//       }
//       showErrorMessage(error.config, 'config')
//     })
// }
