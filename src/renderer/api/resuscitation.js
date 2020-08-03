import {
  mock,
  baseZhong,
  baseLi
} from './urlAndPortConfig'

// 展示复苏床位 - 钟 - 2020-07-23
export const getResuscitationBedList = mock
  ? '/api/getResuscitationBedList'
  : baseZhong + 'acis/pacuS/pacuBedManagement/bedsInfoShow'

// 展示复苏床位 - 钟 - 2020-8-03
export const selectResuscitationBed = mock
  ? ''
  : baseZhong + 'acis/pacuS/pacuBedManagement/bedsChoose'

// 增加设备信息 - 李 - 2020-8-03
export const addMonitorInfo = mock
  ? ''
  : baseLi + 'acis/signDataCollect/addMonitorInfo'
