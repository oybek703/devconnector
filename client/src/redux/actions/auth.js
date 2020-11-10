import axios from 'axios';
import {AUTH_ERROR, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED} from "./types";
import {setAlert} from "./alert";
import {setAuthToken} from "../../utils";

export const loadUser = () => async (dispatch) => {
    if(localStorage.token) setAuthToken(localStorage.token);
    try {
        const res = await axios.get('/api/auth');
        dispatch({type: USER_LOADED, payload: res.data});
    } catch (e) {
        dispatch({type: AUTH_ERROR});
    }
}

export const register = (name, email, password) => async (dispatch) => {
        try {
           const res = await axios.post('/api/users', JSON.stringify({name, email, password}), {headers: {'Content-Type': 'application/json'}});
           dispatch({type: REGISTER_SUCCESS, payload: res.data});
           dispatch(loadUser());
        } catch (e) {
           const errors = e.response.data.errors;
           errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
           dispatch({type: REGISTER_FAIL});
        }
}

export const login = (email, password) => async (dispatch) => {
    try {
        const res = await axios.post('/api/auth', JSON.stringify({email, password}), {headers: {'Content-Type': 'application/json'}});
        dispatch({type: LOGIN_SUCCESS, payload: res.data});
        dispatch(loadUser());
    } catch (e) {
        const errors = e.response.data.errors;
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        dispatch({type: LOGIN_ERROR});
    }
}

export const logout = () => (dispatch) => {dispatch({type: LOGOUT});}