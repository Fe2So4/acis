const state = () => ({
  widgetMap: new Map(), // 控件属性map集
  widgetList: [], // 控件属性列表
  activeWidgetId: null// 激活项id
})

const getters = {
  // 获取当前激活项属性
  activeWidget: state => state.widgetMap.get(state.activeWidgetId)
}

const mutations = {
// 设置控件属性map集
  SET_WIDGET_MAP (state, widget) {
    let originalData = state.widgetMap.get(widget.id)
    if (originalData) {
      originalData = Object.assign(originalData, widget)
    } else {
      state.widgetMap.set(widget.id, widget)
    }
  },
  DELETE_WIDGET (state, id) {
    // 删除页面控件操作
    state.widgetMap.delete(id)
  },
  SET_WIDGET_LIST (state) {
    // 提取控件属性map集，提交后台
    state.widgetList = [...state.widgetMap.values()]
  },
  SET_ACTIVE_WIDGET (state, id) {
    // 设置当前激活项
    state.activeWidgetId = id
  }
}

const actions = {
  setWidgetMap ({ commit }, data) {
    commit('SET_WIDGET_MAP', data)
    commit('SET_WIDGET_LIST')
  },
  deleteWidget ({ commit }, id) {
    commit('DELETE_WIDGET', id)
    commit('SET_WIDGET_LIST')
  },
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
