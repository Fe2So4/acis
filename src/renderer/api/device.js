import {
  mock,
  baseLi
} from './urlAndPortConfig'

// 采集仪器信息查询 - 李 - 2020-07-24
export const getMonitorInfo = mock
  ? ''
  : baseLi + 'acis/signDataCollect/getMonitorInfo'

// 采集仪器记录保存 - 李 - 2020-07-24
export const addMonitorInfo = mock
  ? ''
  : baseLi + 'acis/signDataCollect/addMonitorInfo'

export const getOperationBindEquipmentIp = mock
  ? ''
  : baseLi + 'acis/intraoperative/info/getOperationBindEquipmentIp'
export const saveServerIp = mock
  ? ''
  : baseLi + 'start'
