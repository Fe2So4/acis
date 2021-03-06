import moment from 'moment'
const themes = Object.freeze([
  {
    name: '黑晶蓝',
    value: 'dark-blue'
  },
  {
    name: '砂岩灰',
    value: 'dark-gray'
  },
  {
    name: '琉璃白',
    value: 'light-white'
  }
])
const state = {
  userInfo: { // 当前登录人信息
    loginName: '', // 工号
    userName: '', // 姓名
    roleName: '' // 职位
  },
  // 当前登录用户id
  userId: '',
  // 病人id
  patientId: '',
  // 手术id
  operationId: '',
  // 当前选中病人手术间
  roomNo: '',
  // 手术状态
  // 3 准备手术
  // 4 入诱导室
  // 5 出诱导室
  // 6 入手术室
  // 7 麻醉开始
  // 8 手术开始
  // 9 手术结束
  // 10 麻醉结束
  // 11 出手术室
  // 12 准备复苏
  // 13 入复苏室
  // 14 出复苏室
  // 15 转入病房
  // 16 转入ICU
  // 17 病案归档
  procedureState: '',
  ptCardInfo: {
    roomNo: '',
    ptName: '',
    gender: '',
    ptId: ''
  },
  // 存储各手术状态时间，conCode解释同procedureState
  operationStateMap: {},
  // 主题
  theme: 'light-white', // dark-blue  dark-gray light-white
  themes
}
const getters = {
  patientId: state => state.patientId,
  operationId: state => state.operationId,
  ptCardInfo: state => state.ptCardInfo,
  validateHours: state => (hours) => {
    if (state.operationStateMap[11] && state.operationStateMap[11].time) {
      const { time } = state.operationStateMap[11]
      if (moment().diff(moment(time), 'hours') > hours) {
        return false
      }
    }
    return true
  }
}
const mutations = {
  SET_PATIENT_CARDINFO (state, payload) {
    state.ptCardInfo.roomNo = payload.roomNo
    state.ptCardInfo.ptName = payload.ptName
    state.ptCardInfo.gender = payload.gender
    state.ptCardInfo.ptId = payload.ptId
  },
  SET_USER_INFO (state, data) {
    state.userInfo.loginName = data.loginName
    state.userInfo.userName = data.userName
    state.userInfo.roleName = data.roleName
  },
  SET_USER_ID (state, id) {
    state.userId = id
  },
  CLEAR_USER_ID (state) {
    state.userId = ''
  },
  SET_PATIENT_ID (state, id) {
    state.patientId = id
  },
  CLEAR_PATIENT_ID (state) {
    state.patientId = ''
  },
  SET_OPERATION_ID (state, id) {
    state.operationId = id
  },
  CLEAR_OPERATION_ID (state) {
    state.operationId = ''
  },
  SET_ROOM_NO (state, roomNo) {
    state.roomNo = roomNo
  },
  CLEAR_ROOM_NO (state) {
    state.roomNo = ''
  },
  SET_PROCEDURE_STATE (state, procedureState) {
    state.procedureState = procedureState
  },
  CLEAR_PROCEDURE_STATE (state) {
    state.procedureState = ''
  },
  SET_OPERATION_STATE_MAP (state, obj) {
    state.operationStateMap = obj
  },
  CLEAR_OPERATION_STATE_MAP (state) {
    state.operationStateMap = {}
  },
  SET_THEME (state, theme) {
    state.theme = theme
  }
}

const actions = {
  setUserInfo ({ commit }, data) {
    commit('SET_USER_INFO', data)
  },
  setPatientCardInfo ({ commit }, payload) {
    commit('SET_PATIENT_CARDINFO', payload)
  },
  setUserId ({ commit }, id) {
    commit('SET_USER_ID', id)
  },
  clearUserId ({ commit }) {
    commit('CLEAR_USER_ID')
  },
  setPatientId ({ commit }, id) {
    commit('SET_PATIENT_ID', id)
  },
  clearPatientId ({ commit }) {
    commit('CLEAR_PATIENT_ID')
  },
  setOperationId ({ commit }, id) {
    commit('SET_OPERATION_ID', id)
  },
  clearOperationId ({ commit }) {
    commit('CLEAR_OPERATION_ID')
  },
  setRoomNo ({ commit }, roomNo) {
    commit('SET_ROOM_NO', roomNo)
  },
  clearRoomNo ({ commit }) {
    commit('CLEAR_ROOM_NO')
  },
  setProcedureState ({ commit }, procedureState) {
    commit('SET_PROCEDURE_STATE', procedureState)
  },
  clearProcedureState ({ commit }) {
    commit('CLEAR_PROCEDURE_STATE')
  },
  setOperationStateList ({ commit }, list) {
    const obj = list.reduce((acc, item) => {
      acc[item.conCode] = item
      return acc
    }, {})
    commit('CLEAR_OPERATION_STATE_MAP')
    commit('SET_OPERATION_STATE_MAP', obj)
  },
  clearBaseInfo ({ dispatch }) {
    dispatch('clearPatientId')
    dispatch('clearOperationId')
    dispatch('clearRoomNo')
    dispatch('clearProcedureState')
  },
  setTheme ({ commit }, theme) {
    commit('SET_THEME', theme)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
