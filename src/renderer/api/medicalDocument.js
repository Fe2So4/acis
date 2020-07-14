const mock =
  process.env.NODE_ENV === 'development'
    ? !(process.env.MOCK === 'none')
    : false

// const base = 'http://192.168.1.149:8090/'
const base = 'http://localhost:8090/'

// socket.io 地址 - 李
export const getSocketData = 'http://192.168.1.149:9099'
// export const getSocketData = 'http://192.168.1.154:9099/'
export const dataSource = mock
  ? '/api/dataSource'
  : base + 'acis/dataSource/queryDataSource'
export const getDictionaryTableData = mock
  ? '/api/getDictionaryTableData'
  : base + 'acis/common/templateDataSource/showTemplateDataSource'
export const getTemplateInfo = mock ? '/api/getTemplateInfo' : ''
// 获取模板数据json - 钟 - 2020-07-13
export const getTemplateData = mock
  ? '/api/getTemplateData'
  : base + 'acis/common/template/templateShowing'
export const getValueData = mock ? '/api/getValueData' : ''
// 获取字典源数据 - 钟 - 2020-07-14
export const getDictionaryData = mock
  ? '/api/getDictionaryData'
  : base + 'acis/common/template/showDictionaryData'
export const getSignData = mock ? '/api/getSignData' : ''
export const getEventData = mock ? '/api/getEventData' : ''
export const getEventDictData = mock ? '/api/getEventDictData' : ''
// 增加新事件
export const addNewEvent = mock ? '/api/addNewEvent' : ''
// 获取文书列表 - 钟 - 2020-07-13
export const getDocumentsList = mock
  ? '/api/getDocumentsList'
  : base + 'acis/templatewrit/templete/queryTemplateListTest'
// 文书保存 - 钟 - 2020-07-13
export const updateDocument = mock
  ? '/api/updateDocument'
  : base + 'acis/templatewrit/templete/acisTempleteUpdateTemplate'
