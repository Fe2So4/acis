let mock
if (process.env.NODE_ENV !== 'development') {
  mock = false
} else {
  mock = !(process.env.MOCK === 'none')
}

const base = 'http://192.168.1.128:8090/'
export const dataSource = mock ? '/api/dataSource' : base + 'acis/dataSource/queryDataSource'
export const getTemplateData = mock ? '/api/getTemplateData' : base + 'acis/dataSourceDict/queryDataSourceDict'
export const getValueData = mock ? '/api/getValueData' : ''
export const getDictionaryData = mock ? '/api/getDictionaryData' : ''
export const getSignData = mock ? '/api/getSignData' : ''
