const baseUrl = 'http://192.168.1.192:8090'
// /acis/posIS/posSurgicaRegister/save'
// /acis/posIS/posSurgicaRegister/save'
export const register = `${baseUrl}/acis/posIS/posSurgicaRegister/save`
export const getRegisterData = `${baseUrl}/acis/posIS/posSurgicaRegister/queryOperationInfo`

// 急诊登记查询
export const getEmergencyInfo = `${baseUrl}/acis/preIS/preEemergency/showEemergencyInfo`

// 急诊登记保存
export const saveEmergencyInfo = `${baseUrl}/acis/preIS/preEemergency/saveEemergencyInfo`
