const state = {
  patientId: '1000001',
  // patientId: 'a54sd',
  operationId: 'b0f9d8bda9244397a44cb8ff278937d9'
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
