/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
import Vue from 'vue';
import App from './components/App.vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import router from './router/route';
import store from './store/store';
import { getToken,removeToken } from './Helper'
import * as jwt from "jsonwebtoken";
import {API_BASE_URL} from "./config";
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

//Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
 const jwt_secret = "1U8dHpfmY1xuk3udc7mMbSk8YVQhMephmkoq7WGzCQJUcHSNGzFSoE3dtt4hXr5V";
 var token = getToken();

 Vue.use(VueAxios, axios);

 const main = () => {
    new Vue({
        el: '#app',
        store: store,
        router: router,
        render: h => h(App),
    });
   
 }


 if (token) {
    jwt.verify(token, jwt_secret, (err, decoded) => {
        if (err) {
            removeToken()
            token = null;
        } else {
            if (decoded.iss !== API_BASE_URL+"login") {;
                removeToken()
                token = null;
            }
        }
    });
}
if (token) {
    store.dispatch("auth/authUser")
        .then(() => {
            main();
        })
} else {
    main();
}

 