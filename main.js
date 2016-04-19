'use strict';
const electron = require('electron');

// electron.hideInternalModules();
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const dialog = electron.dialog;

const path = require('path');

const ipcMain = electron.ipcMain;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 270,
        height: 360,
        title: 'Login',
        frame: false,
        movable: true
    });

    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/html/login.html');

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    mainWindow.setThumbarButtons([]);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on('loginCheck', function(event, args){
  if (args.password == '111111') {
    event.sender.send('loginCheck-reply', {result: true});
    console.log(dialog.showMessageBox({
      type: "info",
      message: "weclome "+args.userName,

    }));
  }else {
    event.sender.send('loginCheck-reply',  {result: false});
    console.log(dialog.showMessageBox('login failed'));
  }
});
