import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Layout from '../views/Layout.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '/',
                name: 'Home',
                component: Home
            },
            {
                path: '/box/:id',
                name: 'Box',
                // route level code-splitting
                // this generates a separate chunk (box.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import(/* webpackChunkName: "box" */ '../views/AppBox.vue')
            },
            {
                path: '/detail/:id',
                name: 'Detail',
                component: () =>
                    import(/* webpackChunkName: "detail" */ '../views/AppDetail.vue')
            },
        ]
    },

];

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
});

export default router;
