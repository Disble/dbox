import Vue from 'vue';
import Vuex from 'vuex';
import { ipcRenderer } from 'electron';
import backgroundUrl from '@/assets/background-dbox.svg';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        app: {},
        apps: [],
        dboxBackground: {
            backgroundUrl,
            path: 'home'
        }
    },

    mutations: {
        setApp(state, app) {
            state.app = app;
        },

        setApps(state, apps) {
            state.apps = apps;
        },

        setDboxBackground(state, dboxBackground) {
            if (dboxBackground.backgroundUrl === undefined) {
                state.dboxBackground.path = dboxBackground.path;
            } else {
                state.dboxBackground = dboxBackground;
            }
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
            let apps = await ipcRenderer.invoke('/api/app', { method: 'get' });
            context.commit('setApps', apps);
            return apps;
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
        }
    },
    modules: {}
});
