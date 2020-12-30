import moment from 'moment'
import request from '../../utils/requestForMock'
const state = {
  time: moment(new Date()).format('yyyy-MM-DD'),
  currentRoom:
  {
    roomNo: null,
    maxCount: '',
    count: '',
    roomIndex: null,
    listLength: 0
  },
  defaultRoom: {
    room1: null,
    room2: null
  },
  allCount: 0 // 分配手术总数
}
const getters = {
  time: state => state.time,
  currentRoom: state => state.currentRoom,
  listLength: state => state.listLength,
  allCount: state => state.allCount,
  defaultRoom: state => state.defaultRoom
}
const mutations = {
  SET_TIME(state, payload) {
    state.time = payload
  },
  SET_CURRENT_ROOM(state, payload) {
    state.currentRoom = payload
  },
  SET_ALL_COUNT(state, payload) {
    state.allCount = payload
  },
  CLEAR_CURRENT_ROOM(state, payload) {
    state.currentRoom = {
      roomNo: null,
      maxCount: '',
      count: '',
      roomIndex: null,
      listLength: 0
    }
  }
}
const actions = {
  setTime({ commit }, payload) {
    commit('SET_TIME', payload)
  },
  setCurrentRoom({ commit }, payload) {
    commit('SET_CURRENT_ROOM', payload)
  },
  clearCurrentRoom({ commit }) {
    commit('CLEAR_CURRENT_ROOM')
  },
  setAllCount({ commit }, payload) {
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
