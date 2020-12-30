import { ipcRenderer } from 'electron'
const prodIp = ipcRenderer.sendSync('get-prod-ip')

let api
if (process.env.NODE_ENV === 'production') {
  /// 生产环境api接口地址
  api = {
    // baseURL: `${prodIp}:8090`
    // baseURL: 'http://47.103.105.200:8090'
    baseURL: 'http://128.0.18.38:8090'
    // baseURL: 'http://192.168.8.170:8090' // 冬雷
    // baseURL: 'http://192.168.1.106:8090' // 谢佳辰公司ip
    // baseURL: 'http://localhost:8090'
    // baseURL: 'http://192.168.1.58:8090'
    // baseURL: 'http://192.168.1.175:8090'
    // baseURL: 'http://47.103.105.200:8090'
  }
} else {
  // 本地测试用这个
  api = {
    baseURL: 'http://128.0.18.38:8090'
    // baseURL: 'http://192.168.8.170:8090'
    // baseURL: 'http://192.168.1.106:8090' // 谢佳辰公司ip
    // baseURL: 'http://192.168.1.58:8090'
    // baseURL: 'http://47.103.105.200:8090'
    // baseURL: 'http://192.168.1.106:7090'
    // baseURL: 'http://192.168.1.191:8090'
  }
}

const config = {
  api: api
}
export default config
