import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
let router = null
router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/schedule-home'
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
// 解决重复点击导航路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
