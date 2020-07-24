const config = require('@/config/urlConfig')
// 常用术语字典列表查询
export const commonTermsList = `${config.default.api.baseURL}/acis/dict/getCommonDict`
// 常用术语详情查询
export const commonTermsDetail = `${config.default.api.baseURL}/acis/dict/getCommonDictdetails`
// 新增常用术语详情
export const addCommonTermsDetail = `${config.default.api.baseURL}/acis/dict/addCommonDictdetails`
// 编辑常用术语详情
export const updateCommonTermsDetail = `${config.default.api.baseURL}/acis/dict/updateCommonDictdetails`
// 麻醉事件列表查询
export const anaesEventList = `${config.default.api.baseURL}/acis/dict/getAnesEventDict`
// 麻醉事件详情
export const anaesEventDetail = `${config.default.api.baseURL}/acis/dict/getAnesEventDetails`
// 麻醉方法列表查询
export const anaesMethodDetail = `${config.default.api.baseURL}/acis/dict/getAnesMethodList`
// 麻醉常用量详情查询
export const commonUseDetail = `${config.default.api.baseURL}/acis/dict/getAnesUsualDose`
// 采集仪器字典列表查询
export const deviceDetail = `${config.default.api.baseURL}/acis/dict/getInstrumentList`
// 手术间字典详情查询
export const opeRoomDetail = `${config.default.api.baseURL}/acis/dict/getOpeRoomList`
