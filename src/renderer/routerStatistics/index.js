import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginStatistics')
    },
    {
      path: '/statistics-home',
      name: 'HomeStatistics',
      component: () => import('@/views/HomeStatistics'),
      redirect: '/statistics-home/default',
      children: [
        {
          path: 'default',
          name: 'DefaultStatistics',
          component: () => import('@/views/DefaultStatistics')
        },
        {
          path: 'search-statistics',
          name: 'SearchStatistics',
          component: () => import('@/views/SearchStatistics')
        },
        {
          path: 'quantity-statistics',
          name: 'QuantityStatistics',
          component: () => import('@/views/QuantityStatistics')
        },
        {
          path: 'recover-statistics',
          name: 'RecoverStatistics',
          component: () => import('@/views/RecoverRoomPatientStatistics')
        },
        {
          path: 'cancel-statistics',
          name: 'CancelStatistics',
          component: () => import('@/views/CancelOperationStatistics')
        },
        {
          path: 'anes-method-statistics',
          name: 'AnesMethodStatistics',
          component: () => import('@/views/AnesMethodStatistics')
        },
        {
          path: 'asa-statistics',
          name: 'AsALevelStatistics',
          component: () => import('@/views/AsALevelStatistics')
        },
        {
          path: 'blood-statistics',
          name: 'BloodStatistics',
          component: () => import('@/views/BloodStatistics')
        },
        {
          path: 'dept-statistics',
          name: 'DeptStatistics',
          component: () => import('@/views/DeptStatistics')
        },
        {
          path: 'anes-doc-statistics',
          name: 'AnesDocStatistics',
          component: () => import('@/views/AnesDocStatistics')
        },
        {
          path: 'ope-doc-statistics',
          name: 'OpeDocStatistics',
          component: () => import('@/views/OpeDocStatistics')
        },
        {
          path: 'nurse-statistics',
          name: 'NurseStatistics',
          component: () => import('@/views/NurseStatistics')
        },
        {
          path: 'arterial-statistics',
          name: 'ArterialPunctureStatistics',
          component: () => import('@/views/ArterialPunctureStatistics')
        },
        {
          path: 'quantity-control-statistics',
          name: 'QuantityControlStatistics',
          component: () => import('@/views/QuantityControlStatistics')
        },
        {
          path: 'followup-statistics',
          name: 'FollowupStatistics',
          component: () => import('@/views/PostoperativeFollowupStatistics')
        },
        {
          path: 'anes-qc17-statistics',
          name: 'QuantityControlSeventeenStatistics',
          component: () => import('@/views/QuantityControlSeventeenStatistics')
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
// 解决重复点击导航路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
