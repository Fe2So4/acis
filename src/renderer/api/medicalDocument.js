const mock =
  process.env.NODE_ENV === 'development'
    ? !(process.env.MOCK === 'none')
    : false

const URL_BASE = 'localhost'
const URL_LI = '192.168.1.177'
const URL_XIE = '192.168.1.198'
const URL_ZHONG = '192.168.1.190'
const PORT_BASE = '8090'
const PORT_SOCKET = '9099'

const base = `http://${URL_BASE}:${PORT_BASE}/`
// 李
const baseLi =
  process.env.NODE_ENV === 'development'
    ? `http://${URL_LI}:${PORT_BASE}/`
    : base
// 谢
const baseXie =
  process.env.NODE_ENV === 'development'
    ? `http://${URL_XIE}:${PORT_BASE}/`
    : base
// 钟
const baseZhong =
  process.env.NODE_ENV === 'development'
    ? `http://${URL_ZHONG}:${PORT_BASE}/`
    : base

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

// 文书模板保存 - 李 - 2020-07-17
export const getTagNamesList = mock
  ? '/api/getTagNamesList'
  : baseLi + 'acis/generalConfig/getHisSignList'
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

// 获取事件数据 - 谢 - 2020-07-15
export const getEventData = mock
  ? '/api/getEventData'
  : baseXie + 'acis/intraoperative/info/getAcisIntraoEventInfo'

// 获取事件列表 - 谢 - 2020-07-15
export const getEventDictData = mock
  ? '/api/getEventDictData'
  : baseXie + 'acis/intraoperative/dict/getAcisIntraoEventDict'

// 增加新事件 - 谢 - 2020-07-15
export const addNewEvent = mock
  ? '/api/addNewEvent'
  : baseXie + 'acis/intraoperative/info/addAcisIntraoEvents'

// 获取文书列表 - 钟 - 2020-07-13
export const getDocumentsList = mock
  ? '/api/getDocumentsList'
  : baseZhong + 'acis/templatewrit/templete/queryTemplateListTest'

// 获取字典源数据 - 钟 - 2020-07-14
export const getDictionaryData = mock
  ? '/api/getDictionaryData'
  : baseZhong + 'acis/common/template/showDictionaryData'

// 文书保存一般控件 - 钟 - 2020-07-15
export const saveDocumentData = mock
  ? '/api/saveDocumentData'
  : baseZhong + 'acis/common/template/saveCustomData'

// socket.io 地址 - 李 - 2020-07-14
export const getSocketData = mock
  ? `http://${URL_LI}:${PORT_SOCKET}/`
  : `http://${URL_BASE}:${PORT_SOCKET}/`

// 保存修改过的体征 - 谢 - 2020-07-16
export const saveChangedSignData = mock
  ? '/api/saveChangedSignData'
  : baseXie + 'acis/intraoperative/info/editPatientMonitorDataExt'

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
