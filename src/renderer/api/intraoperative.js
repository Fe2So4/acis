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
