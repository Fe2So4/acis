// const config = require('@/config/urlConfig')
const config = 'http://192.168.1.106:7090'
// const config = 'http://47.103.105.200:7090'
// const config = 'http://47.103.105.200:7090'

// 统计登录
export const login = `${config}/acis/count/countLogin`

// 获取左侧统计菜单
export const getStatisticsMenu = `${config}/acis/count/getSearchMenuList`

// 查询统计
export const getOpeSearch = `${config}/acis/count/searchOperation`

// 查询统计导出
export const getOpeSearchExcel = `${config}/acis/count/searchOperationeExcel`

// 手术取消
export const getCancelStatistics = `${config}/acis/count/countCancelOperationInfo`

// 手术取消导出
export const getCancelStatisticsExcel = `${config}/acis/count/countCancelOperationInfoExcel`

// 麻醉方法
export const getOpeMethodStatistics = `${config}/acis/count/countAnesMethod`

// 麻醉方法导出
export const getAnesMethodExcel = `${config}`

// asa 分级
export const getAsaStatistics = `${config}/acis/count/countAsaClass`

// asa 分级统计
export const getAsaExcel = `${config}/acis/count/countAsaClassExcel`

// 科室工作量查询
export const getDeptWork = `${config}/acis/count/countDpetWork`

// 科室工作量导出
export const getDeptWorkExcel = `${config}/acis/count/countDpetWorkExcel`

// 麻醉医师工作量
export const getAnesWork = `${config}/acis/count/countAnesDocWork`

// 麻醉医师工作量导出
export const getAnesWorkExcel = `${config}/acis/count/countAnesDocWorkExcel`

// 手术医师工作量导出
export const getSurgeonWorkName = `${config}/acis/count/countSurgeonWorkExcel`

// 手术医师工作量
export const getSurgeonWork = `${config}/acis/count/countSurgeonWork`

// 护士工作量
export const getNurseWork = `${config}/acis/count/countNurseWork`

// 护士工作量导出
export const getNurseWorkExcel = `${config}/acis/count/countNurseWorkExcel`

// 导出excel
export const exportExcel = `${config}/acis/count/download`

// 自定义导出模板
export const customExportTemplate = `${config}/acis/count/getUserAllCountTemplateItems`

// 自定义导出模板保存
export const saveTemplate = `${config}/acis/count/updateUserCountTemplate`

// 查询用户信息
export const findUserInfo = `${config}/acis/count/getUserInfo`

// 手术医生远程搜索
export const findOpeDoc = `${config}/acis/dict/getSurgeonDict`

// 麻醉医生远程搜索
export const findAnesDoc = `${config}/acis/dict/getAnesDocDict`

// 护士远程搜索
export const findNurse = `${config}/acis/dict/getNurseDict`

// 手术方法远程搜索
export const findOpeMethod = `${config}/acis/dict/getOperationDict`

// 科室远程搜索
export const findDept = `${config}/acis/dict/getDeptDict`

// 麻醉方法远程搜索
export const findAnesMethod = `${config}/acis/dict/getAnesMethodDict`
