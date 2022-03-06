import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './../store/store';
Vue.use(VueRouter);

import Dashboard from './../components/Dashboard.vue';
import Login from './../components/Login.vue';
import App from './../components/App.vue';
import NotFound from './../components/404.vue';

export const routes = [
    {
        name: 'login',
        path: '/login',
        component: Login,
        meta: {
            requiresAuth: false,
        }
    },
    {
        name: 'root',
        path: '/',
        redirect:{name:'dashboard'},
        component: Dashboard,
        meta: {
            requiresAuth: true,
        }
    },
    {
        name: 'dashboard',
        path: '/dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true,
        }
    },
    {
        name: '404',
        path: '*',
        component: NotFound
    }
];

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

// Auth
function isLoggedIn() {
    //console.log('sss',store.getters['auth/isLoggedIn'])
    return store.getters['auth/isLoggedIn'];
}

router.beforeEach((to, from, next) => {
    
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!isLoggedIn()) {
            //console.log(from);
            next({ name: 'login' })
        } else {
            next();
        }
    } else  {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (isLoggedIn()) {
            next({ name: 'dashboard' })
        } else {
            next()
            console.log(to);
        }
    } 


});

export default router