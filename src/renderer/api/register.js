// const baseUrl = 'http://192.168.1.192:8090'
const config = require('@/config/urlConfig')
// /acis/posIS/posSurgicaRegister/save'
// /acis/posIS/posSurgicaRegister/save'
// 手术信息修改
// export const register = `${config.default.api.baseURL}/acis/posIS/posSurgicaRegister/save`
export const register = `${config.default.api.baseURL}/acis/intraoperative/info/updateOperationInfo`
// 手术信息回显
// export const getRegisterData = `${config.default.api.baseURL}/acis/posIS/posSurgicaRegister/queryOperationInfo`
export const getRegisterData = `${config.default.api.baseURL}/acis/intraoperative/info/getOperationInformation`

// 急诊登记查询
export const getEmergencyInfo = `${config.default.api.baseURL}/acis/preIS/preEemergency/showEemergencyInfo`

// 急诊登记保存
// export const saveEmergencyInfo = `${config.default.api.baseURL}/acis/preIS/preEemergency/saveEemergencyInfo`
export const saveEmergencyInfo = `${config.default.api.baseURL}/acis/intraoperative/info/emergencyRegister`

// 术后登记液体数据回显
export const getPostoperativeFluidRegistration = `${config.default.api.baseURL}/acis/intraoperative/info/getPostoperativeFluidRegistration`

// 术后登记液体数据保存
export const updatePostoperativeFluidRegistration = `${config.default.api.baseURL}/acis/intraoperative/info/updatePostoperativeFluidRegistration`
