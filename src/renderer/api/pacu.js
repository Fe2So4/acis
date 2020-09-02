import {
  mock,
  baseZhong
} from './urlAndPortConfig'

// 获取PACU状态详细信息 - 钟 - 2020-08-18
export const getPacuStatus = mock
  ? ''
  : baseZhong + 'acis/pacuS/pacuRealtimeMode/query'
