const config = require('@/config/urlConfig')
// 患者列表
export const opeList = `${config.default.api.baseURL}/acis/superConfig/getOpeSimpleInfoMenu`
// 手术间列表
export const roomList = `${config.default.api.baseURL}/acis/superConfig/getDefaultRoom`
// 患者详情
export const patientDetail = `${config.default.api.baseURL}/acis/superConfig/getPtOpeDetailInfo`
// 患者手术状态栏
export const patientStatus = `${config.default.api.baseURL}/acis/superConfig/getOpeConMenu`
// 新增状态时间节点
export const addStatus = `${config.default.api.baseURL}/acis/superConfig/addTimePoint`
// 手术排台
export const opeSchedule = `${config.default.api.baseURL}/acis/operation/getOpeArrangeTable`
