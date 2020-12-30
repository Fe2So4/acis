import { app, ipcMain, shell } from 'electron'

const fs = require('fs-extra')
const appPath = app.getPath('userData')
const filePath = require('path').join(appPath, '_config.json')
function getProdIp () {
  return fs.readJson(filePath).then(
    (obj) => {
      if (obj.ip) {
        return obj.ip
      } else {
        return Promise.reject(new Error('未找到目录'))
      }
    }
  ).catch(
    e => fs.outputJson(filePath, {
      ip: '192.168.1.58'
    })
  ).then(
    () => fs.readJson(filePath)
  ).then(
    obj => obj.ip
  )
}

ipcMain.on('get-prod-ip', async e => {
  const result = await getProdIp()
  e.returnValue = result
})

ipcMain.on('open-config-file', () => {
  shell.showItemInFolder(filePath)
})

export {
  filePath
}
