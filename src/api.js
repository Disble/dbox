import { ipcMain } from 'electron';
import AppService from './services/apps';
import BoxService from './services/boxes';
import SettingService from './services/settings';

const appService = new AppService();
const boxService = new BoxService();
const settingService = new SettingService();
settingService.setFirstTime();
const firstBoxes = async () => {
    settingService.setDefaultBox();
    const hasDefaultBox = settingService.getSetting('hasDefaultBox', false);
    if (!hasDefaultBox) {
        const offline = await boxService.getBoxByTitle({ boxTitle: 'Local' });
        if (!offline) {
            const boxOffline = {
                title: 'Local',
                apps: [],
                numOpen: 0,
                numLaunch: 0,
                createdDate: new Date(),
                modifiedDate: null,
                deletedDate: null, // tentativo porque puede que si se borren
                firstLaunchDate: null,
                lastLaunchDate: null,
                timeLaunched: 0,
                state: 'ok',
                visible: true,
                defaultSort: '', // tentativo
                defaultView: 'grid', // si se ve en lista o con portadas
                customOptions: {
                    // solo para grid
                    title: false,
                    rating: false,
                    aditionalData: false,
                    sizeText: 10
                }
            };
            boxService.createBox({ box: boxOffline });
        }

        const online = await boxService.getBoxByTitle({ boxTitle: 'Online' });
        if (!online) {
            const boxOnline = online ? online : {
                title: 'Online',
                apps: [],
                numOpen: 0,
                numLaunch: 0,
                createdDate: new Date(),
                modifiedDate: null,
                deletedDate: null, // tentativo porque puede que si se borren
                firstLaunchDate: null,
                lastLaunchDate: null,
                timeLaunched: 0,
                state: 'ok',
                visible: true,
                defaultSort: '', // tentativo
                defaultView: 'grid', // si se ve en lista o con portadas
                customOptions: {
                    // solo para grid
                    title: false,
                    rating: false,
                    aditionalData: false,
                    sizeText: 10
                }
            };
            boxService.createBox({ box: boxOnline });
        }
        settingService.setSetting('hasDefaultBox', true);
    }
};
firstBoxes();


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
            return await boxService.getBoxes({ order: 1 });
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


