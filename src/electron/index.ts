import * as path from 'path'
import { app, BrowserWindow } from 'electron'

const isDev = process.argv.includes('--dev')

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    closable: !isDev,
    webPreferences: {
      devTools: isDev,
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  win.webContents.on('did-finish-load', () => {
    win.webContents.setVisualZoomLevelLimits(1, 1)
    win.webContents.setZoomFactor(1)
  })

  if (isDev) {
    function loadDev() {
      win.loadURL('http://localhost:4200/')
      win.webContents.once('did-fail-load', loadDev)
    }
    win.webContents.once('did-finish-load', () => {
      win.webContents.off('did-fail-load', loadDev)
      win.webContents.openDevTools({ mode: 'detach' })
    })
    loadDev()
  } else {
    win.loadFile(path.join(__dirname, 'index.html'))
    win.removeMenu()
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
