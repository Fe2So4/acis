import {
  mock,
  baseLi
} from './urlAndPortConfig'

// 检验信息查询 - 李 - 2020-07-23
export const getTestInfo = mock
  ? ''
  : baseLi + 'acis/sysIntegration/getTestInfo'

// 同步检验信息 - 李 - 2020-07-23
export const syncTestInfo = mock
  ? ''
  : baseLi + 'acis/sysIntegration/syncTestInfo'

// 同步检验信息 - 李 - 2020-07-23
export const getTestInfoLine = mock
  ? ''
  : baseLi + 'acis/sysIntegration/getTestInfoLine'
