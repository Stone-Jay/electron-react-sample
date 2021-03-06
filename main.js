'use strict'
// require('babel-register')
// import electron from 'electron'
// import notifier from 'node-notifier'
const electron = require('electron')

process.env.ELECTRON_HIDE_INTERNAL_MODULES = 'true'

// electron.hideInternalModules()
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const dialog = electron.dialog

const path = require('path')

const ipcMain = electron.ipcMain

const Tray = electron.Tray

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let loginWindow

let mainWindow

let appTray

function createWindow () {
  // Create the browser window.
  loginWindow = new BrowserWindow({
    width: 270,
    height: 360,
    title: 'Login',
    frame: false,
    movable: true
  })

  // and load the index.html of the app.
  loginWindow.loadURL(path.join('file://', __dirname, '/src/html/login.html'))

  // Open the DevTools.
  loginWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  loginWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    loginWindow = null
  })

  loginWindow.setThumbarButtons([])
}

function createMainWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Index',
    // frame: false,
    movable: true
  })

  // and load the index.html of the app.
  mainWindow.loadURL(path.join('file://', __dirname, '/src/html/index.html'))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  loginWindow.close()
  createTray()

  mainWindow.setThumbarButtons([])
}

// 系统托盘区图标
function createTray () {
  appTray = new Tray(path.join(__dirname, '/src/img/sample.ico'))
  appTray.setToolTip('Hi there!')

  appTray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide()
    } else {
      mainWindow.show()
    }
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.once('ready', () => {
  createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (loginWindow === null) {
    createWindow()
  }
})

// ipc example at main.js
ipcMain.on('loginCheck', (event, args) => {
  if (args.password === '111111') {
    event.sender.send('loginCheck-reply', {
      result: true
    })
    createMainWindow()
    // loginWindow.close()
  } else {
    event.sender.send('loginCheck-reply', {
      result: false
    })
    dialog.showMessageBox({
      type: 'info',
      message: args.userName + 'login failed !',
      buttons: [],
      title: 'login info'
    })
  }
})
