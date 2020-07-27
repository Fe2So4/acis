const config = require('@/config/urlConfig')
// 手术申请列表查询
export const getOpeApply = `${config.default.api.baseURL}/acis/operation/getOpeApplyInfo`
// 获取房态图接口
export const getRoomList = `${config.default.api.baseURL}/acis/operation/getMainRoomList`
// 获取已排班列表
export const getAllocatedList = `${config.default.api.baseURL}/acis/operation/getOpeArrangingList`
// 获取医生列表
export const getDocList = `${config.default.api.baseURL}/acis/operation/getAnesDocList`
// 获取护士列表
export const getNurseList = `${config.default.api.baseURL}/acis/operation/getOpeNurseList`
// 分配手术申请至手术间
export const distributeOpeApply = `${config.default.api.baseURL}/acis/operation/arrangeOpeRoom`
// 取消手术申请
export const cancelOpeApply = `${config.default.api.baseURL}/acis/operation/deleteRoom`
