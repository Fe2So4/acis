import Vue from 'vue'
import axios from 'axios'

import App from './Statistics'
import router from './routerStatistics'
import store from './store'
import ElementUI from 'element-ui'
import 'normalize.css/normalize.css'
import './styles/index.scss'
import './styles/transition.scss'
import './iconfont/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
import './utils/dialog'
import VueContextMenu from 'vue-contextmenu'

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'

import VXETablePluginElement from 'vxe-table-plugin-element'
import 'vxe-table-plugin-element/dist/style.css'
import './styles/vxe-table-variable.scss' // 修改vxe-table默认样式
import './styles/element-variables.scss' // 修改element-ui默认样式
// ...
// 解决vxe - table与element - ui兼容性问题
// ...
VXETable.use(VXETablePluginElement)
Vue.use(VXETable)
Vue.use(ElementUI)
// 引入鼠标右击菜单栏相关
Vue.use(VueContextMenu)
// 增加广播功能
Vue.prototype.$eventHub = new Vue()
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App />'
}).$mount('#app')
