const mock = !(process.env.MOCK === 'none')
export const dataSource = mock ? '/api/dataSource' : ''
export const getTemplateData = mock ? '/api/getTemplateData' : ''
export const getValueData = mock ? '/api/getValueData' : ''
export const getDictionaryData = mock ? '/api/getDictionaryData' : ''
