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
      redirect: '/home/patientInfo',
      // redirect: '/login',
      component: () => import('@/views/Home/index'),
      children: [{
        path: 'patientInfo',
        name: 'PatientInfo',
        component: () => import('@/views/PatientInfo/index')
      },
      {
        path: 'formContainer',
        name: 'FormContainer',
        component: () => import('@/views/FormContainer/index')
      }]
    },
    {
      path: '*',
      redirect: '/'
    },
    ...customDialogs
  ]
})
// 解决重复点击导航路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
