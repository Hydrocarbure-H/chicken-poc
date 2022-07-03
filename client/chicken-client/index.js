const { app, BrowserWindow } = require('electron')
const path = require('path')

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true
// If the above code have to be modified, must comment the previous line

// Create an Electron app
const createWindow = () => {
  const win = new BrowserWindow({
    icon: 'public/images/logo/icon-200-200.png',
    titleBarStyle: 'hiddenInset',
    titleBarOverlay: true,
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    center: true,
    'minHeight': 600,
    'minWidth': 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  win.webContents.openDevTools()

  win.loadFile('public/views/home.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', () => {
  app.quit()
});
