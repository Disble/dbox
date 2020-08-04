import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/core/fonts';
import Buefy from 'buefy';
import './assets/css/styles.scss';
import limitLength from '@/filters/limit-length';
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate';
import es from 'vee-validate/dist/locale/es.json';
import * as rules from 'vee-validate/dist/rules';

// install rules and localization
Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
});

localize('es', es);

// Install components globally
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

Vue.use(limitLength);
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
