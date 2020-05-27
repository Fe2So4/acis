import Vue from 'vue'
import Router from 'vue-router'
import customDialogs from './modules/customDialog'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
      // component: () => import('@/views/system/system-department')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login/index')
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/Home/index')
    },
    {
      path: '*',
      redirect: '/'
    },
    ...customDialogs
  ]
})
