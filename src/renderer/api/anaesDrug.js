const mock =
  process.env.NODE_ENV === 'development'
    ? !(process.env.MOCK === 'none')
    : false

const base = 'http://localhost:8090/'
// 李
const baseLi = process.env.NODE_ENV === 'development' ? 'http://192.168.1.177:8090/' : base
// // 谢
// const baseXie =
//   process.env.NODE_ENV === 'development' ? 'http://192.168.1.198:8090/' : base
// // 钟
// const baseZhong =
//   process.env.NODE_ENV === 'development' ? 'http://192.168.1.190:8090/' : base

// socket.io 地址 - 李 - 2020-07-14
export const getSocketData = 'http://192.168.1.149:9099'
// export const getSocketData = 'http://192.168.1.154:9099/'

// 文书设计器和展示公共 ------------------------------start-----------------------------
export const getDoseUnit = mock
  ? '/api/getTemplateData'
  : baseLi + 'acis/dict/getDosageUnitList'
export const getConUnit = mock
  ? '/api/getTemplateData'
  : baseLi + 'acis/dict/getConUnitList'
export const getSpeedUnit = mock
  ? '/api/getTemplateData'
  : baseLi + 'acis/dict/getSpeedUnitList'
export const getDrugChannel = mock
  ? '/api/getTemplateData'
  : baseLi + 'acis/dict/getDrugUseTypeList'
