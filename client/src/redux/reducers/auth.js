import {REGISTER_FAIL, REGISTER_SUCCESS} from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null
};

const auth = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {...state, ...payload, isAuthenticated: true, loading: false}
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {...state, loading: false, token: null, isAuthenticated: false}
        default:
            return state;
    }
};

export default auth;