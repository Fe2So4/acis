const state = {
  eventType: ''
}
const getters = {
  eventType: state => state.eventType
}
const mutations = {
  SET_EVENT_TYPE (state, payload) {
    state.eventType = payload
  }
}
const actions = {
  setEventType ({ commit }, payload) {
    commit('SET_EVENT_TYPE', payload)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
