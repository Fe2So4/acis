// const config = require('@/config/urlConfig')
const config = 'http://192.168.1.178:7090'

// 获取左侧统计菜单
export const getStatisticsMenu = `${config}/acis/count/getSearchMenuList`

// 查询统计
export const getOpeSearch = `${config}/acis/count/searchOperation`

// 手术取消
export const getCancelStatistics = `${config}/acis/count/countCancelOperationInfo`

// 手术方法
export const getOpeMethodStatistics = `${config}/acis/count/countAnesMethod`

// asa 分级
export const getAsaStatistics = `${config}/acis/count/countAsaClass`
