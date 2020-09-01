const state = {
  exportVisible: false
}
const getters = {
  exportVisible: state => state.exportVisible
}
const mutations = {
  SHOW_EXPORT (state, payload) {
    state.exportVisible = payload
  },
  CLOSE_EXPORT (state, payload) {
    state.exportVisible = payload
  }
}
const actions = {
  showExport ({ commit }, payload) {
    commit('SHOW_EXPORT', true)
  },
  closeExport ({ commit }, payload) {
    commit('CLOSE_EXPORT', false)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
