import Vue from 'vue'
import Router from 'vue-router'
import customDialogs from './modules/customDialog'
Vue.use(Router)
let router = null
if (process.env.BUILD_TARGET === 'schedule') {
  router = new Router({
    routes: [
      {
        path: '/',
        redirect: '/login'
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/LoginSchedule/index')
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
            component: () => import('@/views/Schedule/index')
          },
          {
            path: 'report',
            name: 'Report',
            component: () => import('@/views/ScheduleReport/index')
          },
          {
            path: 'schedule-change',
            name: 'ScheduleChange',
            component: () => import('@/views/ScheduleChange/index')
          }
        ]
      },
      {
        path: '*',
        redirect: '/'
      }
    ]
  })
} else if (process.env.BUILD_TARGET === 'statistics') {
  router = new Router({
    routes: [
      {
        path: '/',
        redirect: '/login'
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/LoginStatistics/index')
      },
      {
        path: '/statistics-home',
        name: 'HomeStatistics',
        component: () => import('@/views/HomeStatistics/index'),
        redirect: '/statistics-home/default',
        children: [
          {
            path: 'default',
            name: 'DefaultStatistics',
            component: () => import('@/views/DefaultStatistics/index')
          },
          {
            path: 'search-statistics',
            name: 'SearchStatistics',
            component: () => import('@/views/SearchStatistics/index')
          },
          {
            path: 'quantity-statistics',
            name: 'QuantityStatistics',
            component: () => import('@/views/QuantityStatistics/index')
          },
          {
            path: 'recover-statistics',
            name: 'RecoverStatistics',
            component: () => import('@/views/RecoverRoomPatientStatistics/index')
          },
          {
            path: 'cancel-statistics',
            name: 'CancelStatistics',
            component: () => import('@/views/CancelOperationStatistics/index')
          },
          {
            path: 'anes-method-statistics',
            name: 'AnesMethodStatistics',
            component: () => import('@/views/AnesMethodStatistics/index')
          },
          {
            path: 'asa-statistics',
            name: 'AsALevelStatistics',
            component: () => import('@/views/AsALevelStatistics/index')
          },
          {
            path: 'blood-statistics',
            name: 'BloodStatistics',
            component: () => import('@/views/BloodStatistics/index')
          },
          {
            path: 'dept-statistics',
            name: 'DeptStatistics',
            component: () => import('@/views/DeptStatistics/index')
          },
          {
            path: 'anes-doc-statistics',
            name: 'AnesDocStatistics',
            component: () => import('@/views/AnesDocStatistics/index')
          },
          {
            path: 'ope-doc-statistics',
            name: 'OpeDocStatistics',
            component: () => import('@/views/OpeDocStatistics/index')
          },
          {
            path: 'nurse-statistics',
            name: 'NurseStatistics',
            component: () => import('@/views/NurseStatistics/index')
          },
          {
            path: 'arterial-statistics',
            name: 'ArterialPunctureStatistics',
            component: () => import('@/views/ArterialPunctureStatistics/index')
          },
          {
            path: 'quantity-control-statistics',
            name: 'QuantityControlStatistics',
            component: () => import('@/views/QuantityControlStatistics/index')
          },
          {
            path: 'followup-statistics',
            name: 'FollowupStatistics',
            component: () => import('@/views/PostoperativeFollowupStatistics/index')
          },
          {
            path: 'anes-qc17-statistics',
            name: 'QuantityControlSeventeenStatistics',
            component: () => import('@/views/QuantityControlSeventeenStatistics/index')
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
        redirect: '/login'
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
              path: 'medicalDocument/:templateId/:rescueMode/:pageInfo/:syncHis/:opePhase/:buttonConfig',
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
        path: '/printDocument/:templateId/:operationId/:patientId/:pageIndex/:isRescueMode/:opePhase/:pageInfo',
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
