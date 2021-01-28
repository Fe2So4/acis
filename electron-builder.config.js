const moment = require('moment')
const today = moment().format('YYYYMMDD')

module.exports = {
  productName: `AnaesthesiaCIS ${today}`,
  appId: 'acis',
  directories: {
    output: 'build'
  },
  publish: [
    {
      provider: 'generic',
      url: 'http://128.0.18.38:8080/operation/operation_schedule32'
    }
  ],
  files: [
    'dist/electron/**/*'
  ],
  dmg: {
    contents: [
      {
        x: 410,
        y: 150,
        type: 'link',
        path: '/Applications'
      },
      {
        x: 130,
        y: 150,
        type: 'file'
      }
    ]
  },
  mac: {
    icon: 'build/icons/icon.icons'
  },
  win: {
    icon: 'build/icons/favicon.ico'
  },
  linux: {
    icon: 'build/icons'
  },
  asar: true,
  nsis: {
    oneClick: false,
    allowElevation: true,
    allowToChangeInstallationDirectory: true,
    installerIcon: 'build/icons/favicon.ico',
    uninstallerIcon: 'build/icons/favicon.ico',
    installerHeaderIcon: 'build/icons/favicon.ico',
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: 'acis'
  }
}
