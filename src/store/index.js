import Vue from 'vue';
import Vuex from 'vuex';
const { ipcRenderer } = require('electron');

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        app: {},
        apps: []
    },

    mutations: {
        setApp(state, app) {
            state.app = app;
        },

        setApps(state, apps) {
            state.apps = apps;
        }
    },

    actions: {
        async getAppById(context, payload) {
            let app = await ipcRenderer.invoke(
                '/api/app',
                { method: 'get', params: { appId: payload.id } }
            );
            console.log('store getAppById', app);
            context.commit('setApp', app);
            return app;
        },

        async getApps(context) {
            let apps = await ipcRenderer.invoke('/api/app', { method: 'get' });
            console.log('store getApps', apps);
            context.commit('setApps', apps);
            return apps;
        },

        async createApp(context, payload) {
            let res = await ipcRenderer.invoke(
                '/api/app',
                { method: 'post', params: { app: payload.app } }
            );
            console.log('store createApp', res);
            context.commit('setApp', res);
            return res;
        }
    },
    modules: {}
});

/*


ipcRenderer.invoke('get-database').then(menuCreated => {
    // MyTitleBar.updateMenu(menuCreated);
    console.log('menuCreated', menuCreated);
});

*/
