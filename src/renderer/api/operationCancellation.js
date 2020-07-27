import {
  mock,
  baseZhong
} from './urlAndPortConfig'

// 手术取消管理-取消按钮 - 钟 - 2020-07-24
export const cancelOperation = mock
  ? ''
  : baseZhong + 'acis/OperCS/operationCancelled/cancelOperation'
// 手术取消管理-保存 - 钟 - 2020-07-24
export const saveCancellation = mock
  ? ''
  : baseZhong + 'acis/OperCS/operationCancelled/save'
