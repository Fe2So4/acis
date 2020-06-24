import service from '../utils/request'

// 获取用户列表
export function getUserList (data) {
  return service({
    url: '/medSysUser/list',
    method: 'post',
    data
  })
}

// 获取角色列表
export function getRoleList (data) {
  return service({
    url: '/medSysRole/getAllRole',
    method: 'post',
    data
  })
}

// 获取职称列表
export function getOccupations (data) {
  return service({
    url: '/medSysUser/getByName',
    method: 'post',
    data
  })
}

// 新增账号
export function addUser (data) {
  return service({
    url: '/medSysUser/add',
    method: 'post',
    data
  })
}

// 删除用户
export function deleteUser (data) {
  return service({
    url: '/medSysUser/delete',
    method: 'post',
    data
  })
}

// 修改用户
export function editUser (data) {
  return service({
    url: '/medSysUser/update',
    method: 'post',
    data
  })
}

// 修改密码
export function updatePass (data) {
  return service({
    url: '/medSysUser/updatePwd',
    method: 'post',
    data
  })
}

// 查询手术间列表
export function getOperationRoom (data) {
  return service({
    url: '/medSysOpeRoom/selectRoomList',
    method: 'post',
    data
  })
}

// 添加手术间
export function addOperationRoom (data) {
  return service({
    url: '/medSysOpeRoom/addRoom',
    method: 'post',
    data
  })
}

// 编辑手术间
export function editOperationRoom (data) {
  return service({
    url: '/medSysOpeRoom/updateRoom',
    method: 'post',
    data
  })
}

// 删除手术间
export function deleteOperationRoom (data) {
  return service({
    url: '/medSysOpeRoom/deleteRoom',
    method: 'post',
    data
  })
}

// 获取手术套餐列表
export function getOperationPackage (data) {
  return service({
    url: '/operationPackage/selectOpsModePackage',
    method: 'post',
    data
  })
}

// 获取手术套餐---所有项目
export function getOperationItems (data) {
  return service({
    url: '/operationPackage/selectOpsItems',
    method: 'post',
    data
  })
}

// 新增套餐
export function addOperationItems (data) {
  return service({
    url: '/operationPackage/updateModeItems',
    method: 'post',
    data
  })
}

// 查询某套餐的项目列表
export function getItemList (data) {
  return service({
    url: '/operationPackage/selectOpsItemsByMode',
    method: 'post',
    data
  })
}

// 禁用启用套餐
export function forbidItems (data) {
  return service({
    url: '/operationPackage/deletePackage',
    method: 'post',
    data
  })
}

// 启用套餐
export function activeItems (data) {
  return service({
    url: '/operationPackage/activePackage',
    method: 'post',
    data
  })
}

// 获取医生列表 -- 字典
export function getDoctorList (data) {
  return service({
    url: '/hisUsers/selectDoctorList',
    method: 'post',
    data
  })
}

// 获取护士列表 -- 字典
export function getNurseList (data) {
  return service({
    url: '/hisUsers/selectNurseList',
    method: 'post',
    data
  })
}

// 获取手术列表 -- 手术字典
export function getOperationList (data) {
  return service({
    url: '/operationDict/getOperationDict',
    method: 'post',
    data
  })
}

// 获取科室列表 -- 科室字典
export function getDepartmentList (data) {
  return service({
    url: '/deptDict/getDeptDict',
    method: 'post',
    data
  })
}

// 获取麻醉方法列表
export function getAnaesList (data) {
  return service({
    url: '/operationSchedule/getMainAnaesthesiaList',
    method: 'post',
    data
  })
}

// 获取某角色权限信息
export function getSingleRole (data) {
  return service({
    url: '/medSysRole/getRolePermission',
    method: 'post',
    data
  })
}

// 新增角色
export function addNewRole (data) {
  return service({
    url: '/medSysRole/add',
    method: 'post',
    data
  })
}

// 修改角色
export function editRole (data) {
  return service({
    url: '/medSysRole/modify',
    method: 'post',
    data
  })
}

// 删除某个角色
export function deleteRole (data) {
  return service({
    url: '/medSysRole/delete',
    method: 'post',
    data
  })
}

// 模糊查询科室信息
export function selectDept (data) {
  return service({
    url: '/deptDict/getDeptAll',
    method: 'post',
    data
  })
}

// 模糊查询医生信息
export function selectDoc (data) {
  return service({
    url: '/medSysUser/selectSurgeon',
    method: 'post',
    data
  })
}

// 更新角色权限
export function updateRoleAuthority (data) {
  return service({
    url: `/medSysRole/updatePermission?roleCode=${data.roleCode}&deptCode=${data.deptCode}`,
    method: 'post',
    data: data.obj
  })
}
