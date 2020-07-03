import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'normalize.css/normalize.css'
import './styles/index.scss'
import './iconfont/iconfont.css'
// import 'element-ui/lib/theme-chalk/index.css'
import './styles/element-variables.scss'
import './utils/dialog'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
import Tooltip from './components/Tooltip/main'
Vue.use(VXETable)
Vue.use(ElementUI)
if (!process.env.IS_WEB) { Vue.use(require('vue-electron')) }
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
// 增加tooltip
Vue.prototype.$tooltip = Tooltip
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
