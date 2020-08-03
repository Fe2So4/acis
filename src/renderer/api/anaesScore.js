import {
  mock,
  baseZhong
} from './urlAndPortConfig'

// 获取麻醉评分项 - 钟 - 2020-07-21
export const getAnesthesiaGradeItem = mock
  ? '/api/getAnesthesiaGradeItem'
  : baseZhong + 'acis/posIS/posAnesthesiaGrade/access'

// 保存麻醉评分 - 钟 - 2020-07-21
// export const saveAnesthesiaGrade = mock
//   ? '/api/saveAnesthesiaGrade'
//   : baseZhong + 'acis/posIS/posAnesthesiaGrade/saveInfo'

// 计算麻醉评分 - 钟 - 2020-07-23
export const calculateAnesthesiaGrade = mock
  ? '/api/calculateAnesthesiaGrade'
  : baseZhong + 'acis/posIS/posAnesthesiaGrade/scoreCalculation'

// 回显麻醉评分项 - 钟 - 2020-07-21
export const showAnesthesiaGradeItem = mock
  ? '/api/showAnesthesiaGradeItem'
  : baseZhong + 'acis/posIS/posAnesthesiaGrade/echoInfo'

// 回显麻醉评分项 - 钟 - 2020-08-03
export const showTotalScore = mock
  ? ''
  : baseZhong + 'acis/posIS/posAnesthesiaGrade/showTotalScore'
