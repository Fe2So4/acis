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
      component: () => import('../routerStatistics/node_modules/@/views/LoginSchedule/index')
    },
    {
      path: '/schedule-home',
      name: 'HomeSchedule',
      component: () => import('../routerStatistics/node_modules/@/views/HomeSchedule/index'),
      redirect: '/schedule-home/schedule',
      children: [
        {
          path: 'schedule',
          name: 'Schedule',
          component: () => import('../routerStatistics/node_modules/@/views/Schedule/index')
        },
        {
          path: 'report',
          name: 'Report',
          component: () => import('../routerStatistics/node_modules/@/views/ScheduleReport/index')
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
