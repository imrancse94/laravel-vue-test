export const SUBJECT_ADD = (state, data) => {

}


export const SET_LOGIN = (state, data) => {
    state.loggedIn = true;
    state.user = data;
}

export const SET_LOGOUT = (state) => {
    state.loggedIn = false;
    state.user = {};
}


export const GET_SUBJECT = (state,data) => {
    state.subjects = data
}

