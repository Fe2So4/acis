import moment from 'moment'
import request from '../../utils/requestForMock'
import { getCurrentRoom } from '../../api/schedule'
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
  SET_DEFAULT_ROOM(state, payload) {
    state.defaultRoom.room1 = payload
    state.defaultRoom.room2 = payload
  },
  SET_DEFAULT_ROOM1(state, payload) {
    state.defaultRoom.room1 = payload
  },
  SET_DEFAULT_ROOM2(state, payload) {
    state.defaultRoom.room2 = payload
  }
}
const actions = {
  setTime({ commit }, payload) {
    commit('SET_TIME', payload)
  },
  setCurrentRoom({ commit }, payload) {
    commit('SET_CURRENT_ROOM', payload)
  },
  setAllCount({ commit }, payload) {
    commit('SET_ALL_COUNT', payload)
  },
  setDefaultRoom({ commit }) {
    console.log('12345')
    request({
      method: 'get',
      url: getCurrentRoom
    }).then(res => {
      console.log(res)
      if (res.data.code === 200) {
        commit('SET_DEFAULT_ROOM', res.data.data)
      }
    })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
