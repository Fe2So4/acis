let api
if (process.env.NODE_ENV === 'production') {
  /// 生产环境api接口地址
  api = {
    baseURL: 'http://localhost:8090'
    // baseURL: 'http://192.168.1.198:8090'
    // baseURL: 'http://47.103.105.200:8090'
  }
} else {
  // 本地测试用这个
  api = {
    // baseURL: 'http://47.103.105.200:8090'
    baseURL: 'http://192.168.1.177:8090'
  }
}

const config = {
  api: api
}
export default config
