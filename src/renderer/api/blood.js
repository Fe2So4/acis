import {
  baseLi
} from './urlAndPortConfig'

// 查询血气分析字典 - 李 - 2021-01-25
export const getBloodGasAnalysisDict = baseLi + 'acis/blood/getBloodGasAnalysisDict'

// 查询某患者血气分析记录（时间列表） - 李 - 2021-01-25
export const getBloodGasAnalysisRecordTime = baseLi + 'acis/blood/getBloodGasAnalysisRecordTime'

// 查询某患者某条血气分析详情 - 李 - 2021-01-25
export const getBloodGasAnalysisRecordDetail = baseLi + 'acis/blood/getBloodGasAnalysisRecordDetail'

// 保存血气分析 - 李 - 2021-01-25
export const addBloodGasAnalysisRecord = baseLi + 'acis/blood/addBloodGasAnalysisRecord'

// 编辑血气分析 - 李 - 2021-01-25
export const updateBloodGasAnalysisRecord = baseLi + 'acis/blood/updateBloodGasAnalysisRecord'

// 删除血气分析 - 李 - 2021-01-25
export const deleteBloodGasAnalysisRecord = baseLi + 'acis/blood/deleteBloodGasAnalysisRecord'

// 文件上传
export const ftpUploadAnesPDF = baseLi + 'acis/intraoperative/info/ftpUploadAnesPDF'

// 判断是否可以进行文件上传
export const acisUploadWritWright = baseLi + 'acis/intraoperative/info/acisUploadWritWright'

// 调用电子签名
export const getSignPicture = 'api.jhsec.com.cn/pkiserver/v1/getSignPicture'
