// const config = require('@/config/urlConfig')
// const config = 'http://192.168.1.178:7090'
const config = 'http://47.103.105.200:7090'

// 获取左侧统计菜单
export const getStatisticsMenu = `${config}/acis/count/getSearchMenuList`

// 查询统计
export const getOpeSearch = `${config}/acis/count/searchOperation`

// 手术取消
export const getCancelStatistics = `${config}/acis/count/countCancelOperationInfo`

// 手术方法
export const getOpeMethodStatistics = `${config}/acis/count/countAnesMethod`

// asa 分级
export const getAsaStatistics = `${config}/acis/count/countAsaClass`

// 科室工作量查询
export const getDeptWork = `${config}/acis/count/countDpetWork`

// 麻醉医师工作量
export const getAnesWork = `${config}/acis/count/countAnesDocWork`

// 手术医师工作量导出
export const getSurgeonWorkName = `${config}/acis/count/countSurgeonWorkExcel`

// 手术医师工作量
export const getSurgeonWork = `${config}/acis/count/countSurgeonWork`

// 护士工作量
export const getNurseWork = `${config}/acis/count/countNurseWork`

// 导出excel
export const exportExcel = `${config}/acis/count/download`

// 自定义导出模板
export const customExportTemplate = `${config}/acis/count/getUserAllCountTemplateItems`

// 自定义导出模板保存
export const saveTemplate = `${config}/acis/intraoperative/count/updateUserCountTemplate`

// 查询用户信息
export const findUserInfo = `${config}/acis/count/getUserInfo`
