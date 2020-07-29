import {
  mock,
  baseLi
} from './urlAndPortConfig'

// 术中患者列表 - 李 - 2020-07-27
export const getPatientList = mock
  ? ''
  : baseLi + 'acis/superConfig/getOpeSimpleInfoMenu'

// 实时状态 - 李 - 2020-07-28
export const getRealtimeState = mock
  ? ''
  : baseLi + 'acis/superConfig/getRealState'

// 获取手术间列表 - 李 - 2020-07-28
export const getRoomList = mock
  ? ''
  : baseLi + 'acis/operation/getRoomList'

// 手术概览列表 - 李 - 2020-07-28
export const getOpeView = mock
  ? ''
  : baseLi + 'acis/superConfig/getOpeView'
