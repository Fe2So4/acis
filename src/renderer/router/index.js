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
        redirect: '/schedule-home/schedule',
        children: [
          {
            path: 'schedule',
            name: 'Schedule',
            // component: () => import('@/views/Schedule/scheduling')
            component: () => import('@/views/Schedule/index')
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
        redirect: '/home/patientList',
        component: () => import('@/views/HomeNew/index'),
        children: [{
          path: 'patientList',
          name: 'PatientList',
          component: () => import('@/views/PatientList/index')
        },
        {
          path: 'patientInfo',
          name: 'PatientInfo',
          component: () => import('@/views/PatientInfo/index'),
          children: [
            {
              path: 'patientDetail',
              name: 'PatientDetail',
              component: () => import('@/views/PatientInfo/patientDetail/index')
            },
            {
              path: 'medicalDocument/:templateId/:rescueMode/:pageInfo/:syncHis/:opePhase',
              name: 'MedicalDocument',
              component: () => import('@/views/MedicalDocument/index')
            }
          ]
        },
        {
          path: 'formContainer',
          name: 'FormContainer',
          component: () => import('@/views/FormContainer/index')
        }]
      },
      {
        path: '/printDocument/:templateId/:operationId/:patientId/:pageIndex/:isRescueMode',
        name: 'PrintDocument',
        component: () => import('@/views/PrintDocument/index')
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

export default router
