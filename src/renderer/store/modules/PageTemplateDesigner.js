const state = () => ({
  widgetMap: new Map(), // 控件属性map集
  widgetList: [], // 控件属性列表
  activeWidgetId: null, // 激活项id
  paperSettingVisible: false,
  paperSetting: {
    id: 'paper',
    name: 'paper',
    width: 210,
    height: 297
  }
})

const getters = {
  // 获取当前激活项属性
  activeWidget: state => state.widgetMap.get(state.activeWidgetId),
  // 纸张宽
  paperWidth: state => state.paperSetting.width,
  // 纸张高
  paperHeight: state => state.paperSetting.height,
  // 所有配置
  templateData: state => [state.paperSetting, ...state.widgetList]
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
  CLEAR_WIDGET_MAP (state) {
    state.widgetMap = new Map()
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
  // 设置纸张设置显示状态
  SET_PAPER_SETTING_VISIBLE (state, visible) {
    state.paperSettingVisible = visible
  },
  SET_PAPER_SETTING (state, value) {
    state.paperSetting = value
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
  setActiveWidget ({ commit, dispatch }, widget) {
    commit('SET_ACTIVE_WIDGET', widget)
    if (!widget) {
      dispatch('hidePaperSetting')
    }
  },
  // 显示纸张设置
  showPaperSetting ({ commit, dispatch }) {
    dispatch('setActiveWidget', null)
    commit('SET_PAPER_SETTING_VISIBLE', true)
  },
  // 隐藏纸张设置
  hidePaperSetting ({ commit }) {
    commit('SET_PAPER_SETTING_VISIBLE', false)
  },
  // 设置纸张设置
  setPaperSetting ({ commit }, value) {
    commit('SET_PAPER_SETTING', value)
  },
  initStore ({ commit, dispatch }, list) {
    if (!Array.isArray(list)) return
    commit('CLEAR_WIDGET_MAP')
    commit('SET_WIDGET_LIST')
    const paperSetting = list.shift()
    commit('SET_PAPER_SETTING', paperSetting)
    list.forEach(widget => {
      dispatch('setWidgetMap', widget)
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
