const jsonServer = require('json-server') // 引入json-server服务
const { HOST, PORT, DB_FILE } = require('./config.js') // 引入配置信息
const rules = require('./routes') // 引入自定义路由匹配规则
const data = require(DB_FILE)() // 获取到mockJS模拟的数据
const path = require('path')
const middleWares = jsonServer.defaults({
  static: path.join(__dirname, '/public/build')
}) // 使用json-server默认的中间件
// 服务器搭建
const server = jsonServer.create() // 创建http服务
const router = jsonServer.router(data) // 将路由配置和生成的数据以对象的形式传递给jsonServer.router()方法
server.use(jsonServer.bodyParser) // 安装json-server自带的body-parser，用于获取非地址栏传递的数据
server.use(middleWares) // 安装中间件
// 响应/mock/req请求,进行注册操作
// 注意： 自定义路由响应需要在安装json-server的router之前
server.post('/mock/reg', ({ body: { username = '', password = '' } }, res) => {
  if (username !== 'admin' && password) {
    res.jsonp({
      err: 0,
      msg: '注册成功',
      auth: true,
      id: Math.round(Math.random() * 9 + 1)
    })
  } else {
    res.jsonp({
      auth: false,
      err: 1,
      msg: '注册失败'
    })
  }
})
// 响应/mock/login,进行登录验证操作
server.post('/mock/login', ({ body: { username = '', password = '' } }, res) => {
  if (username === 'admin' && password === 'admin123') {
    res.jsonp({
      err: 0,
      auth: true,
      id: Math.round(Math.random() * 9 + 1)
    })
  } else {
    res.jsonp({
      err: 1,
      auth: false,
      msg: '登录失败'
    })
  }
})
// 自定义返回内容
router.render = (req, res) => {
  let status
  const len = Object.keys(res.locals.data).length // 判断是否获取到mockJS模拟的数据
  if (res.req.originalMethod === 'DELETE') {
    status = len === 0
  } else {
    status = !!len
  }
  setTimeout(() => { // 由于本地请求速度较快，不方便loading动效显示利用延时器，模拟真实服务器请求速度
    if (req.url === '/auth')res.jsonp(null)
    res.jsonp({ // 使用res.jsonp()方法将mockJS模拟生成的数据进行自定义包装后输出
      err: status ? 0 : 1,
      msg: '操作' + (status ? '成功' : '失败'),
      data: res.locals.data
    })
  }, 100)
}
server.use(jsonServer.rewriter(rules)) // 根据需要重写路由匹配规则
server.use(router) // 安装路由
// 监听http服务
server.listen({
  host: HOST,
  port: PORT
}, () => {
  console.log(`The server is running on http://${HOST}:${PORT}`)
})
