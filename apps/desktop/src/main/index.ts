import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import { join } from 'node:path';

function createMainWindow(): BrowserWindow {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1080,
    minHeight: 700,
    show: false,
    backgroundColor: '#F7F8FC',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  win.once('ready-to-show', () => win.show());

  if (process.env.ELECTRON_RENDERER_URL) {
    void win.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    void win.loadFile(join(__dirname, '../renderer/index.html'));
  }

  return win;
}

app.whenReady().then(() => {
  ipcMain.handle('app:get-version', () => app.getVersion());
  ipcMain.handle('project:choose-open', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'OB-DaVi Project', extensions: ['obdavi'] }],
    });
    return result.canceled ? null : result.filePaths[0] ?? null;
  });
  ipcMain.handle('project:choose-create', async () => {
    const result = await dialog.showSaveDialog({
      title: 'Create OB-DaVi project',
      defaultPath: 'analysis.obdavi',
      filters: [{ name: 'OB-DaVi Project', extensions: ['obdavi'] }],
    });
    return result.canceled ? null : result.filePath ?? null;
  });

  createMainWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
