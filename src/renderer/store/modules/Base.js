const state = {
  patientId: '1000001',
  // patientId: 'a54sd',
  operationId: 'b0f9d8bda9244397a44cb8ff278937d9',
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
  procedureState: '9'
}

const mutations = {
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
  SET_PROCEDURE_STATE (state, procedureState) {
    state.procedureState = procedureState
  },
  CLEAR_PROCEDURE_STATE (state) {
    state.procedureState = ''
  }
}

const actions = {
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
  mutations,
  actions
}
