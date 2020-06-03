const state = () => ({
  activeWidget: null
})

const getters = {
}

const mutations = {
  SET_ACTIVE_WIDGET (state, widget) {
    state.activeWidget = widget
  }
}

const actions = {
  setActiveWidget ({ commit }, widget) {
    commit('SET_ACTIVE_WIDGET', widget)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
