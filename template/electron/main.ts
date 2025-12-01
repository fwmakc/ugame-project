import * as path from 'path';

import { app, BrowserWindow } from 'electron';

// Глобальный обработчик необработанных ошибок
// Завершаем процесс с кодом ошибки
process.on('uncaughtException', error => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Обработка Squirrel-событий для установщика Windows
const squirrelStartup = await import('electron-squirrel-startup');
if (squirrelStartup.default) {
  app.quit();
}

function activateMainWindow(): void {
  const mainWindow = BrowserWindow.getAllWindows()[0];
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.focus();
    mainWindow.show();
  }
}

function createWindow(): void {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  window.loadFile('dist/index.html');
}

async function handleSquirrelEvent(): Promise<boolean> {
  if (process.argv.length === 1) {
    return false;
  }

  const { spawn } = await import('child_process');
  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const spawnCommand = function (args: string[]) {
    try {
      return spawn(updateDotExe, args, { detached: true });
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
      // Создаем ярлыки
      spawnCommand(['--createShortcut', exeName]);
      app.quit();
      return true;

    case '--squirrel-uninstall':
      // Удаляем ярлыки
      spawnCommand(['--removeShortcut', exeName]);
      app.quit();
      return true;

    case '--squirrel-obsolete':
      app.quit();
      return true;
  }

  return false;
}

// Если обработали Squirrel-событие, выходим
handleSquirrelEvent()
  .then(shouldExit => {
    if (shouldExit) {
      process.exit(0);
    }
  })
  .catch(() => {
    // Игнорируем ошибки и продолжаем запуск приложения
  });

if (!app.requestSingleInstanceLock()) {
  // Если не удалось получить блокировку, значит уже есть запущенный экземпляр
  app.quit();
} else {
  app.on('second-instance', () => {
    // Кто-то пытается запустить второй экземпляр
    activateMainWindow();
  });

  app.on('open-file', event => {
    event.preventDefault();
    activateMainWindow();
  });

  app.on('open-url', event => {
    event.preventDefault();
    activateMainWindow();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
