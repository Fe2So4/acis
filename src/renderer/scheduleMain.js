import Vue from 'vue'
import axios from 'axios'

import App from './Schedule'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'normalize.css/normalize.css'
import './styles/index.scss'
import 'element-ui/lib/theme-chalk/index.css'
import './utils/dialog'
import VueContextMenu from 'vue-contextmenu'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
Vue.use(VXETable)
Vue.use(ElementUI)
// 引入鼠标右击菜单栏相关
Vue.use(VueContextMenu)
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
