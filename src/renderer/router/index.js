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
