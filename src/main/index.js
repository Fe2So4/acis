'use strict'

import { app, BrowserWindow, Menu, ipcMain } from 'electron'
import '../renderer/store'
const { autoUpdater } = require('electron-updater')
const fs = require('fs')
const Path = require('path')
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const feedUrl = 'http://192.168.1.58/operation/operation_schedule'
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 560,
    // useContentSize: true,
    width: 880,
    frame: process.env.NODE_ENV === 'development',
    // fullscreen: true, // 是否全屏
    webPreferences: {
      // webSecurity: false, // 官方建议不要禁用
      nodeIntegration: true
    }
    // movable: false// 可否移动
  })
  // mainWindow.maximize()
  mainWindow.loadURL(winURL)
  // Open dev tools initially when in development mode
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.on('did-frame-finish-load', () => {
      mainWindow.webContents.once('devtools-opened', () => {
        mainWindow.focus()
      })
      mainWindow.webContents.openDevTools()
    })
  }
  // 显示开发者工具
  // mainWindow.webContents.openDevTools()

  // 主进程监听渲染进程更新事件
  ipcMain.on('update', (e, arg) => {
    console.log('update', arg)
    checkForUpdates()
  })
  const checkForUpdates = () => {
    // 执行更新检查
    // if (config.LOCAL_DEBUG) {
    //   // 调试环境必须主动设置当前版本，electron-update有bug会去取electron的版本,而不是app的版本
    //   autoUpdater.currentVersion = config.version
    // }
    autoUpdater.autoDownload = false
    // 配置安装包远端服务器
    autoUpdater.setFeedURL(feedUrl)
    // 下面是自动更新的整个生命周期所发生的事件
    autoUpdater.on('error', function (message) {
      sendUpdateMessage('error', message)
    })
    autoUpdater.on('checking-for-update', function (message) {
      sendUpdateMessage('checking-for-update', message)
    })
    autoUpdater.on('update-available', function (message) {
      sendUpdateMessage('update-available', message)
    })
    autoUpdater.on('update-not-available', function (message) {
      sendUpdateMessage('update-not-available', message)
    })

    // 更新下载进度事件
    autoUpdater.on('download-progress', function (progressObj) {
      sendUpdateMessage('downloadProgress', progressObj)
      // mainWindow.webContents.send('downloadProgress', progressObj)
    })
    // 更新下载完成事件
    autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
      sendUpdateMessage('isUpdateNow')
      ipcMain.on('updateNow', (e, arg) => {
        autoUpdater.quitAndInstall()
      })
    })
    // 执行自动更新检查
    autoUpdater.checkForUpdates()
    ipcMain.on('checkForUpdate', () => {
      // 执行自动更新检查
      autoUpdater.checkForUpdates()
    })
    ipcMain.on('downloadUpdate', () => {
      // 下载
      autoUpdater.downloadUpdate()
    })
  }
  // 主进程主动发送消息给渲染进程函数
  function sendUpdateMessage (message, data) {
    console.log({ message, data })
    mainWindow.webContents.send('message', { message, data })
  }
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // 隐藏菜单
  Menu.setApplicationMenu(null)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

const secondaryWindows = new Map()
const createNewWindow = (locationName, title) => {
  if (secondaryWindows.has(title)) {
    secondaryWindows.get(title).webContents.focus()
    return
  }
  let newWindow = new BrowserWindow({
    show: false,
    modal: true
  })

  newWindow.loadURL(winURL)
  // newWindow.once('ready-to-show', () => {
  //   newWindow.show()
  // })

  newWindow.on('closed', () => {
    secondaryWindows.delete(title)
    newWindow = null
  })

  newWindow.webContents.on('did-finish-load', () => {
    newWindow.webContents.send('route', locationName)
  })

  ipcMain.once('show-window', (e) => {
    newWindow.setTitle(title)
    newWindow.show()
  })

  secondaryWindows.set(title, newWindow)
  return newWindow
}
ipcMain.on('open-new-window', (e, locationName, title) => {
  createNewWindow(locationName, title)
})
// ---------------------------------打印功能 start--------------
// 新建打印窗口
const printWindows = new Set()
const createPrintWindow = (printRoute) => {
  let newPrintWindow = new BrowserWindow({
    // show: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
  })

  newPrintWindow.loadURL(winURL)
  newPrintWindow.once('ready-to-show', () => {
    newPrintWindow.show()
  })

  newPrintWindow.webContents.on('did-finish-load', () => {
    newPrintWindow.webContents.send('printRoute', printRoute)
  })

  newPrintWindow.on('closed', () => {
    printWindows.delete(newPrintWindow)
    newPrintWindow = null
  })

  printWindows.add(newPrintWindow)
  return newPrintWindow
}

let printWin
ipcMain.on('print-document', (e, printRoute) => {
  printWin = createPrintWindow(printRoute)
})
ipcMain.on('ready-to-print', () => {
  printWin.webContents.print({
    margins: {
      marginType: 'custom',
      top: 50,
      bottom: 50,
      left: 50,
      right: 10
    }
  })
})

// ---------------------------------打印功能 end--------------

// ---------------------------------显示病历功能 start--------------
// 新建打印窗口
const createEMRWindow = (name) => {
  let newWindow = new BrowserWindow({
    webPreferences: {
      webSecurity: false
    }
  })
  const filePath = `${__static}/EMR/${name}.html`
  newWindow.loadURL(filePath)
  newWindow.once('ready-to-show', () => {
    newWindow.show()
  })

  newWindow.on('closed', () => {
    newWindow = null
    fs.unlink(filePath, (err) => {
      if (err) throw err
      console.log(`${filePath} was deleted`)
    })
  })
  return newWindow
}

ipcMain.on('show-EMR', (e, name) => {
  printWin = createEMRWindow(name)
})
// ---------------------------------显示病历功能 end--------------

// 打印手术通知单
const printPageURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080/static/print/print.html'
  // : Path.join(__dirname, '../../static/print/print.html')
  // `file://${__dirname}/index.html`
  : Path.join(__dirname, '/static/print/print.html')
const printWindowsPage = new Set()
const createPrintWindowPage = () => {
  let newPrintWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
  })

  newPrintWindow.loadURL(printPageURL)
  newPrintWindow.once('ready-to-show-schedule', () => {
  })

  newPrintWindow.on('closed', () => {
    printWindowsPage.delete(newPrintWindow)
    newPrintWindow = null
  })

  printWindowsPage.add(newPrintWindow)
  return newPrintWindow
}
let printHtml = ''
let cssFileName = ''
let printWin1 = null
let printOptions = null
ipcMain.on('printChannel', (e, html, css, options) => {
  printWin1 = createPrintWindowPage()
  printHtml = html
  cssFileName = css
  printOptions = options
})

ipcMain.on('print-page-ready', (e) => {
  e.reply('print-page-ready-reply', printHtml, cssFileName, printOptions)
})

ipcMain.on('print-content', (e, options) => {
  console.log(e, options)
  if (options) {
    printWin1.webContents.print(options)
  } else {
    printWin1.webContents.print()
  }
  // const options = { silent: true, landscape: true }
})

// 远程下载文件
ipcMain.on('download', (evt, args) => {
  const url = JSON.parse(args)
  const downloadUrl = url.downloadUrl
  console.log(downloadUrl)
  // const saveUrl = url.saveUrl
  mainWindow.webContents.downloadURL(downloadUrl)
})
