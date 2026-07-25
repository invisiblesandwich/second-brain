const { app, BrowserWindow } = require('electron');
const path = require('path');
const next = require('next');

const isDev = !app.isPackaged;
const nextApp = next({
  dev: false,
  dir: path.join(__dirname, '..'),
});
const handle = nextApp.getRequestHandler();

let mainWindow;

async function startServer() {
  await nextApp.prepare();
  const http = require('http');
  const server = http.createServer((req, res) => handle(req, res));
  server.listen(3000, () => {
    console.log('Next.js server ready on http://localhost:3000');
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  mainWindow.loadURL('http://localhost:3000');
}

app.whenReady().then(async () => {
  await startServer();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});