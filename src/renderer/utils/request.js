import axios from 'axios'
// import { Message } from 'element-ui'
import { getUserToken, removeUserToken } from '../utils/storage'
import router from '../router'

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: 'http://icu.service.oc-dev.yun.fosun.com/icu', // url = base url + request url
  // baseURL: 'http://47.103.105.200:8080/icu', // url = base url + request url
  // baseURL: 'http://47.103.105.200:8081/aims', // url = base url + request url
  baseURL: 'http://192.168.1.149:8081/aims', // url = base url + request url 'liyanfei--api'
  // baseURL: 'http://192.168.1.157:8081/aims', // url = base url + request url  'xiejiacheng--api'
  // baseURL: 'http://icu.service.healthcloud.link/icu', // url = base url + request url
  // baseURL: 'http://10.170.119.97:8080/icu', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    config.headers.Authorization = getUserToken() || ''
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  /**
     * If you want to get http information such as headers or status
     * Please return  response => response
    */

  /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (response.headers['content-type'] === 'application/x-msdownload') {
      return response
    } else if (res.code !== '0') {
      // Message({
      //   message: res.message || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })

      // Token expired;
      if (res.code === '100012') {
        // to re-login
        removeUserToken()
        router.push('/login')
      }
      return Promise.reject(res)
    } else {
      return res.data
    }
  },
  error => {
    console.dir(error.response.data) // for debug
    // Message({
    //   message: error.response.data.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
