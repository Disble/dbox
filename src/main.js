import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/core/fonts';
import Buefy from 'buefy';

Vue.use(Buefy, {
    defaultIconComponent: 'vue-fontawesome',
    defaultIconPack: 'fas',
});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
