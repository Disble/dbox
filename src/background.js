'use strict';

import { app, protocol, BrowserWindow, ipcMain } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import AppService from './services/apps';
const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } }
]);

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1366,
        height: 768,
        webPreferences: {
            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            webSecurity: false
        },
    });
    win.maximize();
    const appService = new AppService();
    // const word = {
    //     title: 'Word',
    //     tile: 'https://www.muycomputer.com/wp-content/uploads/2020/02/Microsoft-Word-560x600.jpg',
    //     background: '',
    //     icon: '',
    //     release_date: new Date(),
    //     rating: 0,
    //     create_date: new Date,
    //     tags: [],
    //     visiblity: true,
    //     path: path.normalize("C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Word.lnk")
    // };
    // const powerpoint = {
    //     title: 'Power Point',
    //     tile: 'https://us.123rf.com/450wm/dennizn/dennizn1606/dennizn160600056/58006921-montreal-canad%C3%A1-23-de-mayo-2016-logotipo-de-microsoft-office-powerpoint-en-una-pantalla-de-tel%C3%A9fono-m%C3%B3vil-m.jpg?ver=6',
    //     background: '',
    //     icon: '',
    //     release_date: new Date(),
    //     rating: 0,
    //     create_date: new Date,
    //     tags: [],
    //     visiblity: true,
    //     path: path.normalize("C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\PowerPoint.lnk")
    // };
    // // Valores de prueba
    // appService.createApp({ app: word });
    // appService.createApp({ app: powerpoint });


    // Functions asyncs for redered process
    ipcMain.handle('/api/app', (_event, args) => {
        const { method, params } = args;
        const methods = {
            get: async () => {
                if (params !== undefined) {
                    const { appId } = params;
                    return await appService.getApp({ appId });
                }
                return await appService.getApps();
            },
            post: async () => {
                const { app } = params;
                return await appService.createApp({ app });
            },
            put: async () => {
                const { appId, app } = params;
                return await appService.updateApp({ appId, app });
            },
            delete: async () => {
                const { appId } = params;
                return await appService.deleteApp({ appId });
            }
        }
        // console.log('ipcMain.handle(/api/app)', methods, method, params);
        return methods[method]();
    });

    ipcMain.handle('/tools/dialog', (_event, args) => {
        const { dialog } = require('electron');
        const { options } = args;
        return dialog.showOpenDialogSync(options);
    });

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
        if (!process.env.IS_TEST) win.webContents.openDevTools();
    } else {
        createProtocol('app');
        // Load the index.html when not in development
        win.loadURL('app://./index.html');
    }

    win.on('closed', () => {
        win = null;
    });
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
            await installExtension(VUEJS_DEVTOOLS);
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString());
        }
    }
    createWindow();
    protocol.registerFileProtocol('file', (request, callback) => {
        const pathname = decodeURI(request.url.replace('file:///', ''));
        callback(pathname);
    });
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', data => {
            if (data === 'graceful-exit') {
                app.quit();
            }
        });
    } else {
        process.on('SIGTERM', () => {
            app.quit();
        });
    }
}
