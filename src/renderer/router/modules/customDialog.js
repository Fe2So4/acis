const customDialogs = [
  {
    path: '/configuration-system',
    name: 'ConfigurationSystem',
    component: () => import('@/views/ConfigurationSystem/index'),
    redirect: { name: 'NormalSetting' },
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
      }, {
        path: 'super-normal-setting',
        name: 'SuperNormalSetting',
        component: () => import('@/views/ConfigurationSystem/SuperNormalSetting')
      }, {
        path: 'operation-status',
        name: 'OperationStatus',
        component: () => import('@/views/ConfigurationSystem/OperationStatus')
      }, {
        path: 'navigation-menu',
        name: 'NavigationMenu',
        component: () => import('@/views/ConfigurationSystem/NavigationMenu')
      }, {
        path: 'document-menu',
        name: 'DocumentMenu',
        component: () => import('@/views/ConfigurationSystem/DocumentMenu')
      }, {
        path: '*',
        redirect: {
          name: 'NormalSetting'
        }
      }
    ]
  },
  {
    path: '/intraoperative-register-sign-display-setting',
    name: 'IntraoperativeRegisterSignDisplaySetting',
    component: () => import('@/views/ConfigurationSystem/IntraoperativeRegisterSignDisplaySetting')
  },
  {
    path: '/template-designer',
    name: 'TemplateDesigner',
    component: () => import('@/views/TemplateDesigner/index')
    // component: () => import('@/views/Designer/index')
  },
  {
    path: '/event',
    name: 'Event',
    component: () => import('@/views/Event/index'),
    children: [
      {
        path: 'anesthetic',
        name: 'Anesthetic'
      }
    ]
  },
  {
    path: '/hemodynamics',
    name: 'Hemodynamics',
    component: () => import('@/views/Hemodynamics/index')
  },
  {
    path: '/operation-overview',
    name: 'OperationOverview',
    component: () => import('@/views/OperationOverview/index')
  },
  {
    path: '/template-management',
    name: 'TemplateManagement',
    redirect: '/template-management/document-template',
    component: () => import('@/views/TemplateManagement/index'),
    children: [
      {
        path: 'blood-template',
        name: 'BloodTemplate',
        component: () => import('@/views/TemplateManagement/BloodTemplate/index')
      },
      {
        path: 'event-template',
        name: 'EventTemplate',
        component: () => import('@/views/TemplateManagement/EventTemplate/index')
      },
      {
        path: 'document-template',
        name: 'DocumentTemplate',
        component: () => import('@/views/TemplateManagement/DocumentTemplate/index')
      },
      {
        path: 'clear-template',
        name: 'ClearTemplate',
        component: () => import('@/views/TemplateManagement/OperationClearTemplate/index')
      }
    ]
  }
]
export default customDialogs
