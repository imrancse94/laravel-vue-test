import { createStore } from "vuex";

import auth from './auth'
import subject from './subject'

export default new createStore({
    modules: {
        auth,
        subject
    }
});