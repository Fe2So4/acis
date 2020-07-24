'use strict'

import { app, BrowserWindow, Menu, ipcMain } from 'electron'
import '../renderer/store'
const fs = require('fs')

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
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
    frame: false,
    // fullscreen: true, // 是否全屏
    webPreferences: {
      // webSecurity: false,
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
