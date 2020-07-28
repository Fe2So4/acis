let api
if (process.env.NODE_ENV === 'production') {
  /// 生产环境api接口地址
  api = {
    baseURL: 'http://106.15.197.99'
  }
} else {
  // 本地测试用这个
  api = {
    baseURL: 'http://106.15.197.99:8090'
  }
}

const config = {
  api: api
}
export default config
