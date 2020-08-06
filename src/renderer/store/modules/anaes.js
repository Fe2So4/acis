const state = {
  eventType: {
    eventName: '麻药',
    eventCode: ''
  }
}
const getters = {
  eventType: state => state.eventType
}
const mutations = {
  SET_EVENT_TYPE (state, payload) {
    state.eventType.eventName = payload.perName
    state.eventType.eventCode = payload.perCode
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
