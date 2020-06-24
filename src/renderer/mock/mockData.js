import sourceData from './source_data'
import templateData from './template_data'
import signData from './sign_data'
const Mock = require('mockjs')
Mock.setup({
  timeout: '200-600'
})
// 源数据表名和字段名
Mock.mock('/api/dataSource', 'get', sourceData)
// 获取源数据表中查出的结果
Mock.mock('/api/getValueData', 'get', {
  code: 200,
  success: true,
  data: [
    {
      tableName: 'acis_ope_apply_info',
      className: 'patient_id',
      value: '123211'
    },
    {
      tableName: 'acis_ope_apply_info',
      className: 'visit_id',
      value: '01101'
    },
    {
      tableName: 'acis_ope_apply_info',
      className: 'inpatient_ward',
      value: '二病区'
    }
  ]
})
// 模板数据
Mock.mock('/api/getTemplateData', 'get', templateData)
// 字典数据
Mock.mock('/api/getDictionaryData', 'post', {
  code: 200,
  success: true,
  data: [
    {
      value: '一病区'
    },
    {
      value: '二病区'
    },
    {
      value: '三病区'
    }
  ]
})
// 体征数据
Mock.mock('/api/getSignData', 'post', signData)
