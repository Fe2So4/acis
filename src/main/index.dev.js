/**
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `vue-devtools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */

/* eslint-disable */
import { BrowserWindow } from 'electron';
import path from 'path';
// Install `electron-debug` with `devtron`
// require('electron-debug')({ showDevTools: true })
require('electron-debug')()

// Install `vue-devtools`
require('electron').app.on('ready', () => {
  // let installExtension = require('electron-devtools-installer')
  // installExtension.default(installExtension.VUEJS_DEVTOOLS)
  //   .then(() => {})
  //   .catch(err => {
  //     console.log('Unable to install `vue-devtools`: \n', err)
  //   })
  // 安装vue-devtools
  BrowserWindow.addDevToolsExtension(path.resolve(__dirname, '../../dev-tools/vue-devtools'));
})

// Require `main` process to boot app
require('./index')