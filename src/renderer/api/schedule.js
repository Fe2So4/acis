const config = require('../config/urlConfig')

// 手术申请列表查询
export const getOpeApply = `${config.default.api.baseURL}/acis/operation/getOpeApplyInfo`

// 获取房态图接口
export const getRoomList = `${config.default.api.baseURL}/acis/operation/getMainRoomList`

// 获取已排班列表
export const getAllocatedList = `${config.default.api.baseURL}/acis/operation/getOpeArrangingList`

// 获取医生列表
export const getDocList = `${config.default.api.baseURL}/acis/operation/getAnesDocList`

// 获取护士列表
export const getNurseList = `${config.default.api.baseURL}/acis/operation/getOpeNurseList`

// 分配手术申请至手术间
export const distributeOpeApply = `${config.default.api.baseURL}/acis/operation/arrangeOpeRoom`

// 取消手术申请
export const cancelOpeApply = `${config.default.api.baseURL}/acis/operation/deleteRoom`

// 安排主麻并生成日志
export const distributeMainAnaes = `${config.default.api.baseURL}/acis/operation/arrangeFirstAnesDoc`

// 安排洗手护士并生成日志
export const distributeWashNurse = `${config.default.api.baseURL}/acis/operation/arrangeOpeNurse`

// 安排副麻并生成日志
export const distributeSubAnaes = `${config.default.api.baseURL}/acis/operation/arrangeOtherAnesDoc`

// 安排巡回护士并生成日志
export const distributeHangNurse = `${config.default.api.baseURL}/acis/operation/arrangeSupplyNurse`

// 交换两个手术间数据---手术间
export const changeRoomData = `${config.default.api.baseURL}/acis/operation/changeDataFromTwoRooms`

// 更换手术间信息---单条
export const changeTwoRoomData = `${config.default.api.baseURL}/acis/operation/changeRoom`

// 右键清空操作
export const clearAllRoomData = `${config.default.api.baseURL}/acis/operation/clearArrange`

// 撤销手术间或麻醉医生护士安排
export const cancelClearDistribute = `${config.default.api.baseURL}/acis/operation/deleteLogBySysno`

// 撤销清空操作
export const cancelClearOption = `${config.default.api.baseURL}/acis/operation/deleteLogBySysno`

// 通过手术间号更改手术间配置信息
export const changeConfigByRoomNo = `${config.default.api.baseURL}/acis/operation/editRoomDetailByRoomNo`

// 通过手术间号查询手术间配置信息
export const getConfigByRoomNo = `${config.default.api.baseURL}/acis/operation/getRoomDetailByRoomNo`

// 麻醉方法查询
export const getAnaesMethod = `${config.default.api.baseURL}/acis/operation/getAnesMethodList`

// 日志查询
export const getRecord = `${config.default.api.baseURL}/acis/operation/selectLogMessage`

// 提交前预览
export const previewList = `${config.default.api.baseURL}/acis/operation/getOpeInfo`

// 提交全部手术申请
export const submitAllApply = `${config.default.api.baseURL}/acis/operation/submitRoomSchedule`

// 提交某条手术申请
export const submitSimpleApply = `${config.default.api.baseURL}/acis/operation/submitRoomSchedule`

// 修改医护配置
export const updateDocNurseConfig = `${config.default.api.baseURL}/acis/operation/updateDocConfigInfo`

// 切换列表
export const getSwitchList = `${config.default.api.baseURL}/acis/operation/getOpeInfoInArrange`

// 查询详情页护士列表
export const getDetailNurseList = `${config.default.api.baseURL}/acis/operation/getNurseList1`

// 查询详情页医师列表
export const getDetailDocList = `${config.default.api.baseURL}/acis/operation/getAnesDocList1`

// 更改单条手术申请
export const updateSimpleApply = `${config.default.api.baseURL}/acis/operation/updateOpeArrangeInfo`

// 手术通知单查询
export const getNoticeData = `${config.default.api.baseURL}/acis/operation/getOpeInformForm`

// 手术通知单患者列表查询
export const getNoticePtList = `${config.default.api.baseURL}/acis/operation/getPtOpeInfoList`

// 排班表列表查询
export const getTableList = `${config.default.api.baseURL}/acis/operation/getOpeScheduleForm`

// 同步手术申请信息
export const synchroApply = `${config.default.api.baseURL}/acis/operation/syncOpeApplyInfo`

// 同步患者信息
export const synchroPatient = `${config.default.api.baseURL}/acis/operation/syncPatMasterIndex`

// 手术间最大量配置
export const configMaxDefalut = `${config.default.api.baseURL}/acis/operation/configMaxDefault`

// 批量修改手术排班内容
export const updateScheduledInfo = `${config.default.api.baseURL}/acis/operation/updateDocAndNurse`

// 批量修改已排班手术间和台次
export const updateScheduledRoomPlatform = `${config.default.api.baseURL}/acis/operation/updateRoomAndSequence`

// 排班已提交撤销操作
export const cancelScheduleSubmit = `${config.default.api.baseURL}/acis/operation/repealOperation`

// 获取当前用户默认手术间
export const getCurrentRoom = `${config.default.api.baseURL}/acis/operation/getDefaultFloor`

// 取消当前手术
export const cancelCurrentOperation = `${config.default.api.baseURL}/acis/operation/deleteOperation`

// 导出排版表exceL
export const exportScheduleReport = `${config.default.api.baseURL}/acis/operation/downExcel`