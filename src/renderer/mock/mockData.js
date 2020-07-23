import medicalDocument from './medicalDocument'
import resuscitation from './resuscitation'
const Mock = require('mockjs')
Mock.setup({
  timeout: '200-600'
})
// 源数据表名和字段名
Mock.mock('/api/dataSource', 'get', medicalDocument.sourceData)
// 字典表名、字段名、关系名
Mock.mock(
  '/api/getDictionaryTableData',
  'get',
  medicalDocument.dictionaryTableData
)
// 模板信息
Mock.mock('/api/getTemplateInfo', 'post', {
  code: 200,
  success: true,
  data: {
    templateId: 1,
    startTime: '2020-07-01 09:00',
    endTime: '2020-07-01 13:00',
    pageIndex: 1,
    pageTotal: 3
  }
})

// 模板数据
Mock.mock(/^\/api\/getTemplateData/, medicalDocument.templateData)

// 获取源数据表中查出的结果
Mock.mock(/^\/api\/getValueData/, medicalDocument.valueData)

// 字典数据
Mock.mock(/^\/api\/getDictionaryData/, 'post', {
  code: 200,
  success: true,
  data: ['一病区', '二病区', '三病区']
})
// 体征数据
Mock.mock(/^\/api\/getSignData/, 'post', medicalDocument.signData)
// 事件数据
Mock.mock(/^\/api\/getEventData/, medicalDocument.eventData)
// 事件字典数据
Mock.mock('/api/getEventDictData', medicalDocument.eventDictData)
// 新增事件
Mock.mock('/api/addNewEvent', 'post', medicalDocument.addData)
// 获取文书列表
Mock.mock('/api/getDocumentsList', 'post', medicalDocument.documentsList)
// 文书保存
Mock.mock(/^\/api\/updateDocument/, 'post', medicalDocument.addData)
// 文书数据保存
Mock.mock(/^\/api\/saveDocumentData/, 'post', medicalDocument.addData)
// 体征数据保存
Mock.mock(/^\/api\/saveChangedSignData/, 'post', medicalDocument.addData)
// 获取tag name列表
Mock.mock(/^\/api\/getTagNamesList/, medicalDocument.tagNamesList)
// 获取his体征数据
Mock.mock(/^\/api\/getSignInfo/, medicalDocument.signInfo)
// 获取检验数据
Mock.mock(/^\/api\/getTestInfo/, medicalDocument.signInfo)
// 获取复苏床位列表
Mock.mock(/^\/api\/getResuscitationBedList/, resuscitation.bedList)
