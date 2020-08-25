import Vue from 'vue';
import Vuex from 'vuex';
import { ipcRenderer } from 'electron';
import backgroundUrl from '@/assets/background-dbox.svg';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        app: {},
        apps: [],
        appsBox: [],
        dboxBackground: {
            backgroundUrl,
            path: 'home'
        },
        boxes: [],
        box: {},
        settings: {}
    },

    mutations: {
        setApp(state, app) {
            state.app = app;
        },

        setApps(state, apps) {
            state.apps = apps;
        },

        setAppsBox(state, appsBox) {
            state.appsBox = appsBox;
        },

        setDboxBackground(state, dboxBackground) {
            if (dboxBackground.backgroundUrl === undefined) {
                state.dboxBackground.path = dboxBackground.path;
            } else {
                state.dboxBackground = dboxBackground;
            }
        },

        setBoxes(state, boxes) {
            state.boxes = boxes;
        },

        setBox(state, box) {
            state.box = box;
        },

        setSetting(state, setting) {
            state.settings = setting;
        }
    },

    actions: {
        async getAppById(context, payload) {
            let app = await ipcRenderer.invoke(
                '/api/app',
                { method: 'get', params: { appId: payload.id } }
            );
            context.commit('setApp', app);
            return app;
        },

        async getApps(context) {
            const apps = await ipcRenderer.invoke('/api/app', { method: 'get' });
            context.commit('setApps', apps);
            return apps;
        },

        async getAppsById(context, payload) {
            let appsBox = await ipcRenderer.invoke(
                '/api/app',
                {
                    method: 'get',
                    params: { appsId: payload.appsId, sort: { order: 1 } },
                    options: {
                        getAppsById: true
                    }
                }
            );
            // console.log('store getAppsById()', appsBox);
            context.commit('setAppsBox', appsBox);
            return appsBox;
        },

        async createApp(context, payload) {
            let appCreated = await ipcRenderer.invoke(
                '/api/app',
                { method: 'post', params: { app: payload.app } }
            );
            context.commit('setApp', appCreated);
            return appCreated;
        },

        async updateApp(context, payload) {
            let numReplaced = await ipcRenderer.invoke(
                '/api/app',
                { method: 'put', params: { appId: payload.appId, app: payload.app } }
            );
            const app = payload.app;
            app._id = payload.appId;
            context.commit('setApp', app);
            return numReplaced;
        },

        async deleteApp(context, payload) {
            let numReplaced = await ipcRenderer.invoke(
                '/api/app',
                { method: 'delete', params: { appId: payload.appId } }
            );
            context.commit('setApp', {});
            return numReplaced;
        },

        updateDboxBackground(context, payload) {
            context.commit('setDboxBackground', payload.dboxBackground);
        },

        async getBoxes(context) {
            const boxes = await ipcRenderer.invoke('/api/box', { method: 'get' });
            // console.log('store getBoxes()', boxes);
            context.commit('setBoxes', boxes);
            return boxes;
        },

        async getBoxById(context, payload) {
            let box = await ipcRenderer.invoke(
                '/api/box',
                { method: 'get', params: { boxId: payload.id } }
            );
            context.commit('setBox', box);
            return box;
        },

        async createBox(context, payload) {
            let boxCreated = await ipcRenderer.invoke(
                '/api/box',
                { method: 'post', params: { box: payload.box } }
            );
            context.commit('setBox', boxCreated);
            return boxCreated;
        },

        async updateBox(context, payload) {
            let numReplaced = await ipcRenderer.invoke(
                '/api/box',
                { method: 'put', params: { boxId: payload.boxId, box: payload.box } }
            );
            const box = payload.box;
            box._id = payload.boxId;
            context.commit('setBox', box);
            return numReplaced;
        },

        async deleteBox(context, payload) {
            let numReplaced = await ipcRenderer.invoke(
                '/api/box',
                { method: 'delete', params: { boxId: payload.boxId } }
            );
            context.commit('setBox', {});
            return numReplaced;
        },

        async getSetting(context, payload) {
            let setting = await ipcRenderer.invoke(
                '/settings',
                { method: 'get', params: { key: payload.key, value: payload.value } }
            );
            context.commit('setSetting', setting);
            return setting;
        },

        async setSetting(context, payload) {
            let setting = await ipcRenderer.invoke(
                '/settings',
                { method: 'set', params: { key: payload.key, value: payload.value } }
            );
            context.commit('setSetting', setting);
            return setting;
        },

        async hasSetting(_context, payload) {
            let hasSetting = await ipcRenderer.invoke(
                '/settings',
                { method: 'set', params: { key: payload.key } }
            );
            return hasSetting;
        }
    },
    modules: {}
});
