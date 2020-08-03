const config = require('@/config/urlConfig')

export const getDoseUnit = `${config.default.api.baseURL}/acis/dict/getDosageUnitList`
export const getConUnit = `${config.default.api.baseURL}/acis/dict/getConUnitList`
export const getSpeedUnit = `${config.default.api.baseURL}/acis/dict/getSpeedUnitList`
export const getDrugChannel = `${config.default.api.baseURL}/acis/dict/getDrugUseTypeList`
export const getChargeType = `${config.default.api.baseURL}/acis/dict/getChargeTypeList`
export const getAdviceClassify = `${config.default.api.baseURL}/acis/dict/getAdviceTypeList`
// 科室列表
export const getDeptList = `${config.default.api.baseURL}/acis/dict/getDeptList`

// 查询大事件用药左侧列表
export const getEventList = 'http://192.168.1.198:8090/acis/intraoperative/templete/getAnesthesuaBigEventDetails'
