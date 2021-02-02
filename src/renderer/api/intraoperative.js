import {
  mock,
  baseXie,
  baseLi
} from './urlAndPortConfig'

// 获取交办信息 - 谢 - 2020-07-27
export const getExchangeInfo = mock
  ? ''
  : baseXie + 'acis/intraoperative/info/getOperationExchangeInfo'
// 医生和护士列表 - 李 - 2020-07-27
export const getDoctorNurseList = mock
  ? ''
  : baseLi + 'acis/dict/getDoctorNurseList'
// 保存交班信息 - 谢 - 2020-07-27
export const saveExchangeInfo = mock
  ? ''
  : baseXie + 'acis/intraoperative/info/operationExchange'
// 获取事件列表 - 谢 - 2020-07-29
export const getEventList = mock
  ? ''
  : baseXie + 'acis/intraoperative/templete/getAcisIntraoEventCodeList'
// 获取事件细节列表 - 谢 - 2020-07-29
export const getEventDetailList = mock
  ? ''
  : baseXie + 'acis/intraoperative/templete/getAcisIntraoEventDetailByCodeList'
// 获取已有事件列表 - 谢 - 2020-07-29
export const getExistEvent = mock
  ? ''
  : baseXie + 'acis/intraoperative/info/getAcisIntraoEventRegistList'
// 获取途径列表 - 谢 - 2020-07-29
export const getApproachList = mock
  ? ''
  : baseXie + 'acis/dict/getCommonDictdetails/D004'
// 保存修改、删除、添加的数据 - 谢 - 2020-07-30
export const saveEvent = mock
  ? ''
  : baseXie + 'acis/intraoperative/info/storageAcisIntraoEventRegistList'
// 获取事件模板列表 - 谢 - 2020-07-30
export const getEventTemplateList = mock
  ? ''
  : baseXie + 'acis/intraoperative/templete/getAnesthesiaEventTempleteList'
// 获取事件模板具体内容 - 谢 - 2020-07-30
export const getEventTemplateDetail = mock
  ? ''
  : baseXie + 'acis/intraoperative/templete/getAnesthesiaEventTemplete'
// 获取监测数据 - 谢 - 2020-07-30
export const getMonitorData = mock
  ? ''
  : baseXie + 'acis/intraoperative/info/getAcisIntraoMonitorListenData'
// 添加体征/监测项目 - 谢 - 2020-07-30
export const addSignOrMonitorItem = mock
  ? ''
  : baseXie + 'acis/intraoperative/templete/addAcisIntraoEventTemplete'
// 删除体征/监测项目 - 谢 - 2020-07-30
export const deleteSignOrMonitorItem = mock
  ? ''
  : baseXie + 'acis/intraoperative/templete/deleteAcisIntraoEventTemplete'
// 保存模板 - 谢 - 2020-07-31
export const addNewTemplate = mock
  ? ''
  : baseXie + 'acis/intraoperative/templete/addAnesthesiaEventTemplete'
// 保存体征/监测数据 - 谢 - 2020-07-31
export const saveSignOrMonitorData = mock
  ? ''
  : baseXie + 'acis/intraoperative/info/editAcisIntraoMonitorAndListenData'
// 保存修改后的模板 - 谢 - 2020-07-31
export const saveChangedEventTemplate = mock
  ? ''
  : baseXie + 'acis/intraoperative/templete/editAnesIntraoTempleteDetail'
// 删除事件模板 - 谢 - 2020-07-31
export const deleteEventTemplate = mock
  ? ''
  : baseXie + 'acis/intraoperative/templete/deleteAnesthesiaEventTemplete'
// 重命名事件模板名称 - 谢 - 2020-07-31
export const renameEventTemplate = mock
  ? ''
  : baseXie + 'acis/intraoperative/templete/changeAcisIntraoTempleteName'

// 获取术中事件信息 - 李 - 2021-02-01
export const getAcisIntraoEventInfo = baseLi + 'acis/intraoperative/info/getAcisIntraoEventInfo'
