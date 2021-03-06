import { ipcRenderer } from 'electron'
const prodIp = ipcRenderer.sendSync('get-prod-ip')

// const mock =
//   process.env.NODE_ENV === 'development'
//     ? !(process.env.MOCK === 'none')
//     : false
const mock = false
const IP = {
  SERVER: prodIp,
  LOCAL: 'localhost',
  XIE: '192.168.1.134',
  LI: '192.168.81.32',
  // LI: '192.168.80.174',
  // LI: '168.1.1.188',
  // LI: '168.5.14.117',
  ZHONG: '192.168.1.191'
}
const PORT = {
  BASE: '8090',
  SOCKET: '9093',
  SOCKETROOM: '9099'
}
const developmentIpType = 'SERVER' // 'SERVER' / ''
const productIpType = 'SERVER' // 'SERVER' / 'LOCAL'

const IP_BASE = IP[productIpType]
const IP_LI = developmentIpType ? IP[developmentIpType] : IP.LI
const IP_XIE = developmentIpType ? IP[developmentIpType] : IP.XIE
const IP_ZHONG = developmentIpType ? IP[developmentIpType] : IP.ZHONG

// 用于打包
const URL_PRODUCT = `http://${IP_BASE}:${PORT.BASE}/`

// 李
const baseLi =
  process.env.NODE_ENV === 'development'
    ? `http://${IP_LI}:${PORT.BASE}/`
    : URL_PRODUCT
const socketLi =
  process.env.NODE_ENV === 'development'
    ? `http://${IP_LI}:${PORT.SOCKET}/`
    : `http://${IP_BASE}:${PORT.SOCKET}/`

const socketRoom =
  process.env.NODE_ENV === 'development'
    ? `http://${IP_LI}:${PORT.SOCKETROOM}/`
    : `http://${IP_BASE}:${PORT.SOCKETROOM}/`

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

export { mock, baseLi, socketLi, socketRoom, baseXie, baseZhong }
