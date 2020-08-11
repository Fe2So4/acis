import {
  mock,
  baseLi
} from './urlAndPortConfig'

// 获取体征项 - 李 - 2020-07-30
export const getSignList = mock
  ? ''
  : baseLi + 'acis/generalConfig/getSignList'

// 获取血气分析选项 - 李 - 2020-08-11
export const getBloodInfo = mock
  ? ''
  : baseLi + 'acis/generalConfig/getBloodInfo'

// 更新血气分析选项 - 李 - 2020-08-11
export const updateBloodState = mock
  ? ''
  : baseLi + 'acis/generalConfig/updateBloodState'

// 获取血气分析选项单位列表 - 李 - 2020-08-11
export const getUnitList = mock
  ? ''
  : baseLi + 'acis/dict/getUnitList/D020'

// 获取体征报警配置 - 李 - 2020-08-11
export const getAlarmConfig = mock
  ? ''
  : baseLi + 'acis/generalConfig/getAlarmConfig'

// 新增体征报警配置 - 李 - 2020-08-11
export const addAlarmConfig = mock
  ? ''
  : baseLi + 'acis/generalConfig/addAlarmConfig'

// 更新体征报警配置 - 李 - 2020-08-11
export const updateAlarmConfig = mock
  ? ''
  : baseLi + 'acis/generalConfig/updateAlarmConfig'

// 删除体征报警配置 - 李 - 2020-08-11
export const deleteAlarmConfig = mock
  ? ''
  : baseLi + 'acis/generalConfig/deleteAlarmConfig'

// 查询液体属性选项 - 李 - 2020-08-11
export const getLiquidProperty = mock
  ? ''
  : baseLi + 'acis/generalConfig/getLiquidProperty'

// 更新液体属性选项 - 李 - 2020-08-11
export const saveLiquidProperty = mock
  ? ''
  : baseLi + 'acis/generalConfig/saveLiquidProperty'
