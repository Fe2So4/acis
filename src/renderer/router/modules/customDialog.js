const customDialogs = [
  {
    path: '/configuration-system',
    name: 'ConfigurationSystem',
    component: () => import('@/views/ConfigurationSystem/index'),
    children: [
      {
        path: 'normal-setting',
        name: 'NormalSetting',
        component: () => import('@/views/ConfigurationSystem/NormalSetting')
      }, {
        path: 'liquid-properties',
        name: 'LiquidProperties',
        component: () => import('@/views/ConfigurationSystem/LiquidProperties')
      }, {
        path: 'front-and-back-print',
        name: 'FrontAndBackPrint',
        component: () => import('@/views/ConfigurationSystem/FrontAndBackPrint')
      }, {
        path: 'blood-gas-analysis',
        name: 'BloodGasAnalysis',
        component: () => import('@/views/ConfigurationSystem/BloodGasAnalysis')
      }, {
        path: 'physical-alarm',
        name: 'PhysicalAlarm',
        component: () => import('@/views/ConfigurationSystem/PhysicalAlarm')
      }, {
        path: 'print-and-upload',
        name: 'PrintAndUpload',
        component: () => import('@/views/ConfigurationSystem/PrintAndUpload')
      }, {
        path: 'document-integrity',
        name: 'DocumentIntegrity',
        component: () => import('@/views/ConfigurationSystem/DocumentIntegrity')
      }
    ]
  }
]
export default customDialogs
