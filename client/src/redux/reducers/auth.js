import {
    AUTH_ERROR,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED
} from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null
};

const auth = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case USER_LOADED:
            return {... state, isAuthenticated: true, loading: false, user: payload}
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {...state, ...payload, isAuthenticated: true, loading: false}
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_ERROR:
        case LOGOUT:
            localStorage.removeItem('token');
            return {...state, loading: false, token: null, isAuthenticated: false, user: null}
        default:
            return state;
    }
};

export default auth;