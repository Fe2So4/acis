let api
if (process.env.NODE_ENV === 'production') {
  /// 生产环境api接口地址
  api = {
    baseURL: 'http://localhost/mock/'
  }
} else {
  // 本地测试用这个
  api = {
    baseURL: 'http://localhost:3334/mock'
  }
}

const config = {
  api: api
}
export default config
