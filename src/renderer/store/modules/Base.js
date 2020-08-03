const state = {
  // 当前登录用户id
  userId: '666',
  // 病人id
  patientId: '1000001',
  // patientId: 'a54sd',
  // 手术id
  operationId: 'b0f9d8bda9244397a44cb8ff278937d9',
  // 手术间
  roomNo: '603',
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
  procedureState: '3',
  ptCardInfo: {
    roomNo: '',
    ptName: '',
    gender: '',
    ptId: ''
  }
}
const getters = {
  patientId: state => state.patientId,
  operationId: state => state.operationId,
  ptCardInfo: state => state.ptCardInfo
}
const mutations = {
  SET_PATIENT_CARDINFO (state, payload) {
    state.ptCardInfo.roomNo = payload.roomNo
    state.ptCardInfo.ptName = payload.ptName
    state.ptCardInfo.gender = payload.gender
    state.ptCardInfo.ptId = payload.ptId
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
  }
}

const actions = {
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
