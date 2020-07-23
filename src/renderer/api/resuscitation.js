import {
  mock,
  baseZhong
} from './urlAndPortConfig'

// 展示复苏床位 - 钟 - 2020-07-23
export const getResuscitationBedList = mock
  ? '/api/getResuscitationBedList'
  : baseZhong + 'acis/pacuS/pacuBedManagement/bedsInfoShow'
