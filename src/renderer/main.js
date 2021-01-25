import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'normalize.css/normalize.css'
// import 'element-ui/lib/theme-chalk/index.css'
import './styles/element-variables.scss' // 修改element-ui默认样式
import './styles/index.scss'
import './styles/transition.scss'
import './iconfont/iconfont.css'
import './utils/dialog'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import Tooltip from './components/Tooltip/main'
import CtxMenu from './components/CtxMenu/main'

import VXETablePluginElement from 'vxe-table-plugin-element'
import 'vxe-table-plugin-element/dist/style.css'
// import './styles/vxe-table-variable-gray.scss' // 修改vxe-table默认样式
// ...
// 解决vxe - table与element - ui兼容性问题
// ...
VXETable.use(VXETablePluginElement)

Vue.use(VXETable)
Vue.use(ElementUI)
if (!process.env.IS_WEB) { Vue.use(require('vue-electron')) }
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
// 增加tooltip
Vue.prototype.$tooltip = Tooltip
// 增加右击菜单
Vue.prototype.$ctxMenu = CtxMenu
// 增加广播功能
Vue.prototype.$eventHub = new Vue()
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
