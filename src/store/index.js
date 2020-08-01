import Vue from 'vue';
import Vuex from 'vuex';

import appService from '@/services/app';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        app: {}
    },

    mutations: {
        setApp(state, app) {
            state.app = app;
        }
    },

    actions: {
        getAppById(context, payload) {
            return appService.getById(payload.id)
                .then(res => {
                    context.commit('setApp', res);
                    return res;
                });
        }
    },
    modules: {}
});
