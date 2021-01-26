import {
  mock,
  baseLi,
  baseZhong
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

// 获取手术状态信息 - 李 - 2020-08-14
export const getOpeConConfig = mock
  ? ''
  : baseLi + 'acis/superConfig/getOpeConConfig'

// 更新手术状态信息 - 李 - 2020-08-14
export const updateOpeConConfig = mock
  ? ''
  : baseLi + 'acis/superConfig/updateOpeConConfig'

// 获取导航组列表 - 李 - 2020-08-14
export const getModule = mock
  ? ''
  : baseLi + 'acis/superConfig/getModule'

// 获取导航菜单列表 - 李 - 2020-08-14
export const getOpeModuleConfig = mock
  ? ''
  : baseLi + 'acis/superConfig/getOpeModuleConfig'

// 更新导航菜单列表 - 李 - 2020-08-14
export const updateOpeModuleConfig = mock
  ? ''
  : baseLi + 'acis/superConfig/updateOpeModuleConfig'

// 获取文书菜单配置信息 - 李 - 2020-08-14
export const getWritConfig = mock
  ? ''
  : baseLi + 'acis/superConfig/getWritConfig'

// 更新文书菜单配置信息 - 李 - 2020-08-14
export const updateWritConfig = mock
  ? ''
  : baseLi + 'acis/superConfig/updateWritConfig'

// 获取手术状态列表 - 李 - 2020-08-14
export const getOpeStateDict = mock
  ? ''
  : baseLi + 'acis/dict/getOpeStateDict'

// 获取文书上传配置 - 钟 - 2020-08-17
export const getFileUpload = mock
  ? ''
  : baseZhong + 'acis/superConfig/getFileUpload'

// 保存文书上传配置 - 钟 - 2020-08-17
export const saveFileUpload = mock
  ? ''
  : baseZhong + 'acis/superConfig/saveFileUpload'

// 获取文书上传列表 - 钟 - 2020-08-17
export const getUploadTemplateInfo = mock
  ? ''
  : baseZhong + 'acis/superConfig/getUploadTemplateInfo'

// 保存文书上传列表 - 钟 - 2020-08-17
export const saveUploadTemplateInfo = mock
  ? ''
  : baseZhong + 'acis/superConfig/saveUploadTemplateInfo'

// 查询体征项配置信息 - 李 - 2021-01-26
export const getVitalSignDict = baseLi + 'acis/superConfig/getVitalSignDict'

// 编辑体征配置信息 - 李 - 2021-01-26
export const updateVitalSignDict = baseLi + 'acis/superConfig/updateVitalSignDict'

// 体征字典查询 - 李 - 2021-01-26
export const getVitalSignDictAll = baseLi + 'acis/superConfig/getVitalSignDictAll'
