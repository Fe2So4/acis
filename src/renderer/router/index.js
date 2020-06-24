import Vue from 'vue'
import Router from 'vue-router'
import customDialogs from './modules/customDialog'
Vue.use(Router)
let router = null
if (process.env.BUILD_TARGET === 'schedule') {
  router = new Router({
    routes: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login/index')
      },
      {
        path: '/schedule-home',
        name: 'HomeSchedule',
        component: () => import('@/views/HomeSchedule/index'),
        redirect: '/schedule-home/report',
        children: [
          {
            path: 'schedule',
            name: 'Schedule',
            component: () => import('@/views/Schedule/scheduling')
          },
          {
            path: 'report',
            name: 'Report',
            component: () => import('@/views/ScheduleReport/index')
          }
        ]
      },
      {
        path: '*',
        redirect: '/'
      }
    ]
  })
} else {
  router = new Router({
    routes: [
      {
        path: '/',
        redirect: '/home'
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
      ...customDialogs,
      {
        path: '*',
        redirect: '/'
      }
    ]
  })
}
// 解决重复点击导航路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  if (to.name !== from.name) {
    next()
  }
})

export default router
