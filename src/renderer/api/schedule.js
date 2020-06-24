
import service from '../utils/request'
// import axios from 'axios'

// 待排班申请
export function getUnallocatedList (data) {
  return service({
    url: '/operationSchedule/getOperationScheduleListByDate',
    method: 'post',
    data
  })
}

// 医生分配列表
export function getDoctorList (data) {
  return service({
    url: '/operationSchedule/mainDoctorList',
    method: 'post',
    data
  })
}

// 护士分配列表
export function getNurseList (data) {
  return service({
    url: '/operationSchedule/mainNurseList',
    method: 'post',
    data
  })
}

// 分配手术间
export function arrangeOpeRoom (data) {
  return service({
    url: '/operationSchedule/arrangeOpeRoom',
    method: 'post',
    data
  })
}

// //分配护士
// export function arrangeOpeNurse(){
//     return service({
//         url: '/operationSchedule/arrangeOpeRoom',
//         method: 'post',
//         data
//     })
// }

// 分配主麻医生
export function arrangeOpeMainDoc (data) {
  return service({
    url: '/operationSchedule/arrangeFirstAnesDoc',
    method: 'post',
    data
  })
}
// 分配副麻
export function arrangeOpeSubDoc (data) {
  return service({
    url: '/operationSchedule/arrangeOtherAnesDoc',
    method: 'post',
    data
  })
}

// 分配洗手护士
export function arrangeWashNurse (data) {
  return service({
    url: '/operationSchedule/arrangeOpeNurse',
    method: 'post',
    data
  })
}

// 分配巡回护士
export function arrangeHangNurse (data) {
  return service({
    url: '/operationSchedule/arrangeSupplyNurse',
    method: 'post',
    data
  })
}

// 撤销操作
export function withDraw (data) {
  return service({
    url: '/scheduleLog/deleteLog',
    method: 'post',
    data
  })
}

// 分配区手术申请
// operationSchedule/mainGetOperationScheduleDetails
export function getAllocatedList (data) {
  return service({
    url: '/operationSchedule/mainList',
    method: 'post',
    data
  })
}

// 房态图
export function getRoomList (data) {
  return service({
    url: '/operationSchedule/getRoomInfoList',
    method: 'post',
    data
  })
}

// 提交前预览
export function getPreviewList (data) {
  return service({
    url: '/operationSchedule/mainAllGetOperationScheduleDetails',
    method: 'post',
    data
  })
}

// 获取麻醉方法列表
export function getAnaesMethods (data) {
  return service({
    url: '/operationSchedule/getMainAnaesthesiaList',
    method: 'post',
    data
  })
}

// 分配记录
export function getRecordsList (data) {
  return service({
    url: '/scheduleLog/selectLogMessage',
    method: 'post',
    data
  })
}

// /获取交换列表信息
// /operationSchedule/selectAllOpeSchInfo
export function getSwitchList (data) {
  return service({
    url: '/operationSchedule/selectAllOpeSchInfo',
    method: 'post',
    data
  })
}

// 提交全部排班手术申请
export function submitAll (data) {
  return service({
    url: '/operationSchedule/submitDateSchedule',
    method: 'post',
    data
  })
}

// 提交单个手术间的申请
//   /operationSchedule/submitRoomSchedule
export function submitRoomAll (data) {
  return service({
    url: '/operationSchedule/submitRoomSchedule',
    method: 'post',
    data
  })
}

// 提交某个手术间某条手术申请
export function submitSimple (data) {
  return service({
    url: '/operationSchedule/submitSingelSchedule',
    method: 'post',
    data
  })
}

// 清空手术间医生或护士
export function clearDocOrNurse (data) {
  return service({
    url: `/scheduleLog/clearArrange?type=${data.type}`,
    method: 'post',
    data: data.obj
  })
}

// 配置最大手术间--默认手术间

// /operationSchedule/updateDoctorsAndNurseOperatingRooms
export function configMaxDefalut (data) {
  return service({
    url: '/operationSchedule/updateDoctorsAndNurseOperatingRooms',
    method: 'post',
    data
  })
}

// 切换手术间
export function updateRoomContent (data) {
  return service({
    url: '/scheduleLog/changeDataFromTwoRooms',
    method: 'post',
    data
  })
}

// 更换手术间
export function updateRoom (data) {
  return service({
    url: '/operationSchedule/changeRoom',
    method: 'post',
    data
  })
}

// 取消某台手术的接口
export function cancelSingle (data) {
  return service({
    url: '/scheduleLog/deleteRoom',
    method: 'post',
    data
  })
}

// 修改单个手术申请信息
export function editSingleApply (data) {
  return service({
    url: '/operationSchedule/editOperationSchedule',
    method: 'post',
    data
  })
}

// 手术间配置
export function submitRoomConfig (data) {
  return service({
    url: '/operationSchedule/editRoomDetaiByRoomNo',
    method: 'post',
    data
  })
}

// 提交修改详情
export function submitEditDetail (data) {
  return service({
    url: '/operationSchedule/editOperationSchedule',
    method: 'post',
    data
  })
}

// 分配手术医生
export function distributeOpeDoc (data) {
  return service({
    url: '/operationSchedule/arrangeSurgeon',
    method: 'post',
    data
  })
}

// 分配手术申请
export function distributeApply (data) {
  return service({
    url: '/operationSchedule/arrangeOpe',
    method: 'post',
    data
  })
}
