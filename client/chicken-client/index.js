const { app, BrowserWindow } = require('electron')
const path = require('path')

// Create an Electron app
const createWindow = () => {
  const win = new BrowserWindow({
    titleBarStyle: 'hiddenInset',
    titleBarOverlay: true,
    frame: false,
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('public/views/index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
});



function simple_print(str) {
  return str;
}

module.exports ={
    simple_print
}