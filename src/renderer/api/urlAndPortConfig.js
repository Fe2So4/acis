const mock =
  process.env.NODE_ENV === 'development'
    ? !(process.env.MOCK === 'none')
    : false

const URL_BASE = 'localhost'
// const URL_LI = '192.168.1.177'
const URL_LI = '47.103.105.200'
// const URL_LI1 = '106.15.197.99'
const URL_LI1 = '47.103.105.200'
const URL_XIE = '47.103.105.200'
// const URL_XIE = '192.168.1.198'
const URL_ZHONG = '47.103.105.200'
// const URL_ZHONG = '192.168.1.157'
const PORT_BASE = '8090'
const PORT_SOCKET = '9099'

const base = `http://${URL_BASE}:${PORT_BASE}/`
// 李
const baseLi =
  process.env.NODE_ENV === 'development'
    ? `http://${URL_LI}:${PORT_BASE}/`
    : base
const socketLi =
  process.env.NODE_ENV === 'development'
    ? `http://${URL_LI1}:${PORT_SOCKET}/`
    : `http://${URL_BASE}:${PORT_SOCKET}/`

// 谢
const baseXie =
  process.env.NODE_ENV === 'development'
    ? `http://${URL_XIE}:${PORT_BASE}/`
    : base

// 钟
const baseZhong =
  process.env.NODE_ENV === 'development'
    ? `http://${URL_ZHONG}:${PORT_BASE}/`
    : base

export {
  mock,
  baseLi,
  socketLi,
  baseXie,
  baseZhong
}
