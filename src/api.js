import { ipcMain } from 'electron';
import AppService from './services/apps';
import BoxService from './services/boxes';
import SettingService from './services/settings';

const appService = new AppService();
const boxService = new BoxService();
const settingService = new SettingService();
settingService.setFirstTime();
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


// const offlineBox = {
//     title: 'Local',
//     apps: [],
//     createdDate: new Date(),
//     modifiedDate: null,
//     lastLaunchDate: null,
//     deleteDate: null,	    		// tentativo porque puede que si se borren
//     numLaunch: 0,
//     numOpen: 0,
//     visible: true,
//     defaultSort: '',				// tentativo
//     defaultView: 'grid',			// si se ve en lista o con portadas
//     customOptions: {				// solo para grid
//         title: false,
//         rating: false,
//         aditionalData: false,
//         sizeText: 10
//     }
// };
// const onlineBox = {
//     title: 'Online',
//     apps: [],
//     createdDate: new Date(),
//     modifiedDate: null,
//     lastLaunchDate: null,
//     deleteDate: null,	    		// tentativo porque puede que si se borren
//     numLaunch: 0,
//     numOpen: 0,
//     visible: true,
//     defaultSort: '',				// tentativo
//     defaultView: 'grid',			// si se ve en lista o con portadas
//     customOptions: {				// solo para grid
//         title: false,
//         rating: false,
//         aditionalData: false,
//         sizeText: 10
//     }
// };
// boxService.createBox({ box: offlineBox });
// boxService.createBox({ box: onlineBox });


// Functions asyncs for redered process
ipcMain.handle('/api/app', (_event, args) => {
    const { method, params, options } = args;
    const methods = {
        get: async () => {
            if (options !== undefined && options.getAppsById !== undefined) {
                const { appsId } = params;
                return await appService.getAppsById(appsId);
            }
            if (params !== undefined) {
                const { appId } = params;
                return await appService.getApp({ appId });
            }
            return await appService.getApps({ createdDate: 1 });
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

ipcMain.handle('/api/box', (_event, args) => {
    const { method, params } = args;
    const methods = {
        get: async () => {
            if (params !== undefined) {
                const { boxId } = params;
                return await boxService.getBox({ boxId });
            }
            return await boxService.getBoxes({ createdDate: 1 });
        },
        post: async () => {
            const { box } = params;
            return await boxService.createBox({ box });
        },
        put: async () => {
            const { boxId, box } = params;
            return await boxService.updateBox({ boxId, box });
        },
        delete: async () => {
            const { boxId } = params;
            return await boxService.deleteBox({ boxId });
        }
    }
    return methods[method]();
});

ipcMain.handle('/tools/dialog', (_event, args) => {
    const { dialog } = require('electron');
    const { options } = args;
    return dialog.showOpenDialogSync(options);
});

ipcMain.handle('/settings', (_event, args) => {
    const { method, params } = args;
    const options = {
        get: () => {
            const { key, value } = params;
            return settingService.getSetting(key, value);
        },

        set: () => {
            const { key, value } = params;
            return settingService.setSetting(key, value);
        },

        has: () => {
            const { key } = params;
            return settingService.hasSetting(key);
        }
    };
    return options[method]();
});


