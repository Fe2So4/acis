const config = require('@/config/urlConfig')

// 获取表单数据
export const getIntraoMonitorData = `${config.default.api.baseURL}/acis/intraoperative/info/getIntraoMonitorindividuation`
// get
// http://192.168.80.115:8090/acis/intraoperative/info/getIntraoMonitorData?templeteCode=1
// parameters: templeteCode

// 更新表单数据
export const updateIntraoMonitorIndividuation = `${config.default.api.baseURL}/acis/intraoperative/info/updateIntraoMonitorIndividuation`
