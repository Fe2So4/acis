// const baseUrl = 'http://192.168.1.192:8090'
const config = require('@/config/urlConfig')
// /acis/posIS/posSurgicaRegister/save'
// /acis/posIS/posSurgicaRegister/save'
export const register = `${config.default.api.baseURL}/acis/posIS/posSurgicaRegister/save`
export const getRegisterData = `${config.default.api.baseURL}/acis/posIS/posSurgicaRegister/queryOperationInfo`

// 急诊登记查询
export const getEmergencyInfo = `${config.default.api.baseURL}/acis/preIS/preEemergency/showEemergencyInfo`

// 急诊登记保存
export const saveEmergencyInfo = `${config.default.api.baseURL}/acis/preIS/preEemergency/saveEemergencyInfo`
