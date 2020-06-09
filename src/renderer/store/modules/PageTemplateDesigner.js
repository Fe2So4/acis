const state = () => ({
  activeWidget: null,
  height: 800,
  width: 600,
  direction: '1'
})

const getters = {
}

const mutations = {
  SET_ACTIVE_WIDGET (state, widget) {
    if (!widget.id) {
      state.activeWidget.actual = widget.actual
    } else {
      state.activeWidget = widget
    }
  },
  SET_WIDTH_HEIGHT (state, payload) {
    state.width = payload.width
    state.height = payload.height
  },
  SET_DIRECTION (state, payload) {
    state.direction = payload
  }
}

const actions = {
  setActiveWidget ({ commit }, widget) {
    commit('SET_ACTIVE_WIDGET', widget)
  },
  setWidthHeight ({ commit }, payload) {
    commit('SET_WIDTH_HEIGHT', payload)
  },
  setDirection ({ commit }, payload) {
    commit('SET_DIRECTION', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
