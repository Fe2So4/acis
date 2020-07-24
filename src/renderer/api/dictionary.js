const config = require('@/config/urlConfig')
// 常用术语字典列表查询
export const commonTermsList = `${config.default.api.baseURL}/acis/dict/getCommonDict`
// 常用术语详情查询
export const commonTermsDetail = `${config.default.api.baseURL}/acis/dict/getCommonDictdetails`
// 新增常用术语详情
export const addCommonTermsDetail = `${config.default.api.baseURL}/acis/dict/addCommonDictdetails`
// 编辑常用术语详情
export const updateCommonTermsDetail = `${config.default.api.baseURL}/acis/dict/updateCommonDictdetails`
// 删除常用术语详情

export const deleteCommonTermsDetail = `${config.default.api.baseURL}/acis/dict/deleteCommonDictdetails`
// 麻醉事件列表查询
export const anaesEventList = `${config.default.api.baseURL}/acis/dict/getAnesEventDict`
// 麻醉事件新增
export const addAnaesEvent = `${config.default.api.baseURL}/acis/dict/addAnesEventDetails`
// 麻醉事件修改
export const updateAnaesEvent = `${config.default.api.baseURL}/acis/dict/updateAnesEventDetails`
// 麻醉事件删除
export const deleteAnaesEvent = `${config.default.api.baseURL}/acis/dict/deleteAnesEventDetails`
// 麻醉事件详情
export const anaesEventDetail = `${config.default.api.baseURL}/acis/dict/getAnesEventDetails`

// 麻醉方法列表查询
export const anaesMethodDetail = `${config.default.api.baseURL}/acis/dict/getAnesMethodList`
// 新增麻醉方法列表
export const addMethodDetail = `${config.default.api.baseURL}/acis/dict/addAnesMethodList`
// 修改麻醉方法列表
export const updateMethodDetail = `${config.default.api.baseURL}/acis/dict/updateAnesMethodList`
// 删除麻醉方法列表
export const deleteMethodDetail = `${config.default.api.baseURL}/acis/dict/deleteAnesMethodList`

// 麻醉常用量详情查询
export const commonUseDetail = `${config.default.api.baseURL}/acis/dict/getAnesUsualDose`
// 麻醉常用量详情新增
export const addCommonUseDetail = `${config.default.api.baseURL}/acis/dict/addAnesUsualDose`
// 麻醉常用量详情删除
export const deleteCommonUseDetail = `${config.default.api.baseURL}/acis/dict/deleteAnesEventDetails`
// 麻醉常用量详情修改
export const updateCommonUseDetail = `${config.default.api.baseURL}/acis/dict/updateAnesUsualDose`

// 采集仪器字典列表查询
export const deviceDetail = `${config.default.api.baseURL}/acis/dict/getInstrumentList`
// 采集仪器字典列表增加
export const addDeviceDetail = `${config.default.api.baseURL}/acis/dict/addInstrumentList`
// 采集仪器字典列表删除
export const deleteDeviceDetail = `${config.default.api.baseURL}/acis/dict/deleteInstrumentList`
// 采集仪器字典列表修改
export const updateDeviceDetail = `${config.default.api.baseURL}/acis/dict/updateInstrumentList`

// 手术间字典详情查询
export const opeRoomDetail = `${config.default.api.baseURL}/acis/dict/getOpeRoomList`
// 手术间字典详情新增
export const addRoomDetail = `${config.default.api.baseURL}/acis/dict/addOpeRoomList`
// 手术间字典详情修改
export const updateRoomDetail = `${config.default.api.baseURL}/acis/dict/updateOpeRoomList`
// 手术间字典详情删除
export const deleteRoomDetail = `${config.default.api.baseURL}/acis/dict/deleteOpeRoomList`

// 医护字典查询
export const doctorData = `${config.default.api.baseURL}/acis/dict/getDoctorNurseList`
// 医护字典删除
export const deleteDoctorData = `${config.default.api.baseURL}/acis/dict/deleteDoctorNurseList`
// 医护字典修改
// acis/dict/updateDoctorNurseList
export const updateDoctorData = `${config.default.api.baseURL}/acis/dict/updateDoctorNurseList`
// 医护字典新增
export const addDoctorData = `${config.default.api.baseURL}/acis/dict/addDoctorNurseList`

// 诊断字典查询
export const diagnoseData = `${config.default.api.baseURL}/acis/dict/getDiagnoseList`
// 诊断字典删除
export const deleteDiagnoseData = `${config.default.api.baseURL}/acis/dict/deleteDiagnoseList`
// 诊断字典修改
// acis/dict/updateDoctorNurseList
export const updateDiagnoseData = `${config.default.api.baseURL}/acis/dict/updateDiagnoseList`
// 诊断字典新增
export const addDiagnoseData = `${config.default.api.baseURL}/acis/dict/addDiagnoseList`

// 手术名称字典查询
export const opeNameData = `${config.default.api.baseURL}/acis/dict/getOperationList`
//  手术名称字典删除
export const deleteOpeNameData = `${config.default.api.baseURL}/acis/dict/deleteOperationList`
//  手术名称字典修改
// acis/dict/updateDoctorNurseList
export const updateOpeNameData = `${config.default.api.baseURL}/acis/dict/updateOperationList`
//  手术名称字典新增
export const addOpeNameData = `${config.default.api.baseURL}/acis/dict/addOperationList`
