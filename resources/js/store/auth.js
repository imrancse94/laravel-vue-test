import auth from './../Api/auth'
import { setToken, removeToken } from './../Helper';
import {SET_LOGOUT,SET_LOGIN} from './mutation_type';

const login = ({ commit }, user) => {
    return auth.login(user).then(({ data }) => {
        var response = data;
        console.log('response.access_token',user)
        if ('data' in response) {
            response = response.data;
            setToken(response.access_token)
            commit('SET_LOGIN', response);
        }
        
        return Promise.resolve(data);
    })
}

export const authUser = ({ commit }) => {
    return auth.getAuthData().then(({ data }) => {
        const response = data.data;
        if (response) {
            if (response.access_token) {
                setToken(response.access_token)
                commit('SET_LOGIN', response);
            } else {
                removeToken();
            }
        } else {
            removeToken();
        }
        return Promise.resolve(data);
    }).catch(error => {
        removeToken();
        return Promise.reject(error);
    })
}


const logout = ({ commit }) => {
    commit('SET_LOGOUT');
    removeToken();
}

export default {
    namespaced: true,
    actions:{
        login,
        logout,
        authUser
    },
    mutations:{
        SET_LOGOUT,
        SET_LOGIN
    },
    state:{
        loggedIn:false,
        user:{}
    },
    getters:{
        isLoggedIn(state){
            return state.loggedIn;
        },
        getUser(state){
            return state.user;
        }
    }
    
}
