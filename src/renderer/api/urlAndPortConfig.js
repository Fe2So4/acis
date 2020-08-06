const mock =
  process.env.NODE_ENV === 'development'
    ? !(process.env.MOCK === 'none')
    : false

const IP = {
  SERVER: '47.103.105.200',
  LOCAL: 'localhost',
  XIE: '192.168.1.198',
  LI: '192.168.1.177',
  ZHONG: '192.168.1.157'
}
const PORT = {
  BASE: '8090',
  SCOKET: '9099'
}
const productIpType = 'SERVER' // 'SERVER' / 'LOCAL'
const devlopmentIpType = 'SERVER' // 'SERVER' / 'LOCAL' / ''

const IP_BASE = IP[productIpType]
const IP_LI = devlopmentIpType ? IP[devlopmentIpType] : IP.LI
const IP_XIE = devlopmentIpType ? IP[devlopmentIpType] : IP.XIE
const IP_ZHONG = devlopmentIpType ? IP[devlopmentIpType] : IP.ZHONG

// 用于打包
const URL_PRODUCT = `http://${IP_BASE}:${PORT.BASE}/`

// 李
const baseLi =
  process.env.NODE_ENV === 'development'
    ? `http://${IP_LI}:${PORT.BASE}/`
    : URL_PRODUCT
const socketLi =
  process.env.NODE_ENV === 'development'
    ? `http://${IP_LI}:${PORT.SCOKET}/`
    : `http://${IP_BASE}:${PORT.SCOKET}/`

// 谢
const baseXie =
  process.env.NODE_ENV === 'development'
    ? `http://${IP_XIE}:${PORT.BASE}/`
    : URL_PRODUCT

// 钟
const baseZhong =
  process.env.NODE_ENV === 'development'
    ? `http://${IP_ZHONG}:${PORT.BASE}/`
    : URL_PRODUCT

export { mock, baseLi, socketLi, baseXie, baseZhong }
