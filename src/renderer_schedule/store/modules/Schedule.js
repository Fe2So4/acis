import moment from 'moment'
const state = {
  time: moment(new Date()).format('yyyy-MM-DD'),
  currentRoom:
  {
    roomNo: '601',
    maxCount: '',
    count: ''
  }
}
const getters = {
  time: state => state.time,
  currentRoom: state => state.currentRoom
}
const mutations = {
  SET_TIME (state, payload) {
    state.time = payload
  },
  SET_CURRENT_ROOM (state, payload) {
    state.currentRoom = payload
  }
}
const actions = {
  setTime ({ commit }, payload) {
    commit('SET_TIME', payload)
  },
  setCurrentRoom ({ commit }, payload) {
    commit('SET_CURRENT_ROOM', payload)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
