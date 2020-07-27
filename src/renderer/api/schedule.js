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
//安排主麻并生成日志
export const distributeMainAnaes = `${config.default.api.baseURL}/acis/operation/arrangeFirstAnesDoc`
//安排洗手护士并生成日志
export const distributeWashNurse = `${config.default.api.baseURL}/acis/operation/arrangeOpeNurse`
//安排副麻并生成日志
export const distributeSubAnaes = `${config.default.api.baseURL}/acis/operation/arrangeOtherAnesDoc`
//安排巡回护士并生成日志
export const distributeHangNurse = `${config.default.api.baseURL}/acis/operation/arrangeSupplyNurse`
//交换两个手术间数据
export const changeRoomData = `${config.default.api.baseURL}/acis/operation/changeDataFromTwoRooms`
//更换手术间信息
export const changeTwoRoomData = `${config.default.api.baseURL}/acis/operation/changeRoom`
//清空手术间
export const clearAllRoomData = `${config.default.api.baseURL}/acis/operation/clearArrange`
//撤销手术间或麻醉医生护士安排
export const cancelClearDistribute = `${config.default.api.baseURL}/acis/operation/deleteLog`
//撤销清空操作
export const cancelClearOption = `${config.default.api.baseURL}/acis/operation/deleteLogBySysno`
//通过手术间号更改手术间配置信息
export const changeConfig = `${config.default.api.baseURL}/acis/operation/editRoomDetailByRoomNo`
//麻醉方法查询
export const getAnaesMethod = `${config.default.api.baseURL}/acis/operation/getAnesMethodList`