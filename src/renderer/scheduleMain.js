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
Vue.use(ElementUI)
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
