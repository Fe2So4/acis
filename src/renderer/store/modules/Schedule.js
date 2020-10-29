import moment from 'moment'
const state = {
  time: moment(new Date()).format('yyyy-MM-DD'),
  currentRoom:
  {
    roomNo: '601',
    maxCount: '',
    count: '',
    listLength: 0
  },
  allCount: '' // 分配手术总数
}
const getters = {
  time: state => state.time,
  currentRoom: state => state.currentRoom,
  listLength: state => state.listLength,
  allCount: state => state.allCount
}
const mutations = {
  SET_TIME (state, payload) {
    state.time = payload
  },
  SET_CURRENT_ROOM (state, payload) {
    state.currentRoom = payload
  },
  SET_ALL_COUNT (state, payload) {
    state.allCount = payload
  }
}
const actions = {
  setTime ({ commit }, payload) {
    commit('SET_TIME', payload)
  },
  setCurrentRoom ({ commit }, payload) {
    commit('SET_CURRENT_ROOM', payload)
  },
  setAllCount ({ commit }, payload) {
    commit('SET_ALL_COUNT', payload)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
