import axios from 'axios'
import { getUserToken } from './storage'
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
export default function exportExcel (options, fileName) {
  return request(Object.assign({
    responseType: 'blob'
  }, options)).then(
    res => {
      const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      const objectUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = objectUrl
      a.download = fileName
      // 下面这个写法兼容火狐
      a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))
      window.URL.revokeObjectURL(blob)
    }
  )
}
