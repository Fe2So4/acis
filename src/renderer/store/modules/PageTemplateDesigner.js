const state = () => ({
  widgetMap: new Map(), // 控件属性map集
  widgetList: [], // 控件属性列表
  activeWidgetId: null, // 激活项id
  designerWidth: 904,
  designerHeight: 1366,
  designerActive: false
})

const getters = {
  // 获取当前激活项属性
  activeWidget: state => state.widgetMap.get(state.activeWidgetId),
  // 获取当前模板激活状态
  designerActive: state => state.designerActive
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
  },
  // 设置模板激活状态
  SET_DESIGNER_ACTIVE (state, payload) {
    state.designerActive = payload
  },
  // 设置模板宽度
  SET_DESIGNER_WIDTH (state, payload) {
    state.designerWidth = payload
  },
  // 设置模板高度
  SET_DESIGNER_HEIGHT (state, payload) {
    state.designerHeight = payload
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
  },
  setDesignerActive ({ commit }, payload) {
    commit('SET_DESIGNER_ACTIVE', payload)
  },
  setDesignerWidth ({ commit }, payload) {
    commit('SET_DESIGNER_WIDTH', payload)
  },
  setDesignerHeight ({ commit }, payload) {
    commit('SET_DESIGNER_Height', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
