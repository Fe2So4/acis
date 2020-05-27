const customDialogs = [
  {
    path: '/configuration-system',
    name: 'ConfigurationSystem',
    component: () => import('@/views/ConfigurationSystem/index'),
    children: [{
      path: 'normal',
      name: 'ConfigurationNormal',
      component: () => import('@/views/ConfigurationSystem/Normal')
    }]
  }
]
export default customDialogs
