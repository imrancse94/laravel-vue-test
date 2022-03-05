import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import auth from './auth'
import subject from './subject'

export default new Vuex.Store({
    modules: {
        auth,
        subject
    }
});