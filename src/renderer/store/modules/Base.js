const state = {
  patientId: '1000001',
  // patientId: 'a54sd',
  operationId: 'b0f9d8bda9244397a44cb8ff278937d9',
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
  setPatientCardInfo ({ commit }, payload) {
    commit('SET_PATIENT_CARDINFO', payload)
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
