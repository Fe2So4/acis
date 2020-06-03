const config = require('../urlConfig')
// 患者列表
export const opeList = () => {
  return `${config.default.api.baseURL}/opeList`
}
