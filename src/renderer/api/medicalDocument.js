import {
  mock,
  baseZhong,
  baseLi,
  socketLi,
  socketRoom,
  baseXie
} from './urlAndPortConfig'

// 文书设计器和展示公共 ------------------------------start-----------------------------
// 获取模板数据json - 钟 - 2020-07-13
export const getTemplateData = mock
  ? '/api/getTemplateData'
  : baseZhong + 'acis/common/template/templateShowing'
// 文书设计器和展示公共 ------------------------------end-------------------------------

// 文书设计器相关 ------------------------------start-------------------------------
// 获取获取源数据表名字段名列表 - 钟 - 2020-07-15
export const dataSource = mock
  ? '/api/dataSource'
  : baseZhong + 'acis/templetewrit/dataSource/getTempleteDataSource'

// 获取获取字典表表名字段名列表 - 钟 - 2020-07-15
export const getDictionaryTableData = mock
  ? '/api/getDictionaryTableData'
  : baseZhong + 'acis/common/templateDataSource/showTemplateDataSource'

// 文书模板保存 - 谢 - 2020-07-15
export const updateDocument = mock
  ? '/api/updateDocument'
  : baseXie + 'acis/templatewrit/templete/acisTempleteUpdateTemplate'

// 获取tagName列表 - 李 - 2020-07-17
export const getTagNamesList = mock
  ? '/api/getTagNamesList'
  : baseLi + 'acis/generalConfig/getHisSignList'

// 保存文书中的表信息 - 钟 - 2020-08-19
export const saveTemplateTableInfo = mock
  ? ''
  : baseZhong + 'acis/templatewrit/templete/saveTemplateTableInfo'
// 文书设计器相关 ------------------------------end-------------------------------

// 文书展示相关 --------------------------------start---------------------------------
// 获取文书分页信息 - 谢 - 2020-07-15
export const getTemplateInfo = mock
  ? '/api/getTemplateInfo'
  : baseXie + 'acis/intraoperative/info/getIntraoMonitorDataByTimeInterval'

// 回显从源数据表中查出的值 - 钟 - 2020-07-15
export const getValueData = mock
  ? '/api/getValueData'
  : baseZhong + 'acis/common/template/queryFillInTemplateInfo'

// 获取体征数据 - 谢 - 2020-07-15
export const getSignData = mock
  ? '/api/getSignData'
  : baseXie + 'acis/intraoperative/info/getIntraoMonitorData'

// 获取事件列表 - 谢 - 2020-07-15
export const getEventDictData = mock
  ? '/api/getEventDictData'
  : baseXie + 'acis/intraoperative/dict/getAcisIntraoEventDict'

// 增加新事件 - 谢 - 2020-07-15
export const addNewEvent = mock
  ? '/api/addNewEvent'
  : baseXie + 'acis/intraoperative/info/addAcisIntraoEvents'

// 获取文书列表 - 谢 - 2020-08-03
export const getDocumentsList = mock
  ? '/api/getDocumentsList'
  : baseXie + 'acis/superConfig/getWritMenu'

// 获取字典源数据 - 钟 - 2020-07-14
export const getDictionaryData = mock
  ? '/api/getDictionaryData'
  : baseZhong + 'acis/common/template/showDictionaryData'

// 文书保存一般控件 - 钟 - 2020-07-15
export const saveDocumentData = mock
  ? '/api/saveDocumentData'
  : baseZhong + 'acis/common/template/saveCustomData'

// socket.io 地址 - 李 - 2020-07-14
export const getSocketData = socketLi

// socket.io 地址 - 李 - 2020-07-14
export const getSocketRoom = socketRoom

// 保存修改过的体征 - 谢 - 2020-07-16
export const saveChangedSignData = mock
  ? '/api/saveChangedSignData'
  : baseXie + 'acis/intraoperative/info/editPatientMonitorDataExt'

// 获取用药字典 - 谢 - 2020-07-16
export const getAnaesDrugList = mock
  ? '/api/saveChangedSignData'
  : baseXie + 'acis/intraoperative/dict/getAcisIntraoPharmacyMedicineDictList'

// 获取用药展示数据
export const getDrugListRecords = mock
  ? '/api/saveChangedSignData'
  : baseXie + 'acis/intraoperative/info/getAcisIntraoPharmacyDataInfo'

// 新增用药数据
export const addDrug = mock
  ? '/api/saveChangedSignData'
  : baseXie + 'acis/intraoperative/info/storageAnesthesiaMedicineBloodEvents'

// 获取输血输液列表数据
export const getInfusionBloodList = mock
  ? '/api/saveChangedSignData'
  : baseXie + 'acis/intraoperative/dict/getAcisIntraoPharmacyBloodDictList'
// 获取输血输液列表数据
export const getBloodInfusionData = mock
  ? '/api/saveChangedSignData'
  : baseXie + 'acis/intraoperative/info/getAcisIntraoBloodDataInfo'

// 获取监测表格数据
export const getMonitorData = mock
  ? '/api/saveChangedSignData'
  : baseXie + 'acis/intraoperative/info/getAcisIntraoMonitorListenData'
// 修改监测表格数据
export const updateMonitorData = mock
  ? '/api/saveChangedSignData'
  : baseXie + 'acis/intraoperative/info/updateAcisIntraoListenDataInfo'

// 文书展示相关 --------------------------------end---------------------------------
// 获取his体征数据 - 李 - 2020-07-20
export const getSignInfo = mock
  ? '/api/getSignInfo'
  : baseLi + 'acis/sysIntegration/getSignInfo'

// 获取检验数据 - 李 - 2020-07-20
export const getTestInfo = mock
  ? '/api/getTestInfo'
  : baseLi + 'acis/sysIntegration/getTestInfo'

// 修改抢救模式 - 李 - 2020-07-20
export const changeDisplayMode = mock
  ? '/api/changeDisplayMode'
  : baseLi + 'acis/signDataCollect/changeOpeMode'
// 文书展示相关 --------------------------------end---------------------------------

// 停止用药
export const stopPharmacyUse = baseLi + 'acis/intraoperative/info/stopPharmacyUse'

// 批量添加体征数据
export const batchAddIntraoMonitorData = baseLi + 'acis/intraoperative/info/batchAddIntraoMonitorData'