import axios from 'axios';
import {GET_PROFILE, PROFILE_ERROR} from "./types";
import {setAlert} from "./alert";

export const getCurrentProfile = () => async (dispatch) => {
    try{
        const res = await axios.get('/api/profile/me');
        dispatch({type: GET_PROFILE, payload: res.data});
    } catch (e) {
        dispatch({type: PROFILE_ERROR, payload: e.response.data.errors});
    }
}

export const createProfile = (formData, history, edit = false) => async (dispatch) => {
    try {
        const res = await axios.post('/api/profile', formData, {headers: {'Content-Type': 'application/json'}});
        dispatch({type: GET_PROFILE, payload: res.data});
        dispatch(setAlert((edit ? 'Profile updated.' : 'Profile created.'), 'success'));
        !edit && history.push('/dashboard');
    } catch (e) {
        const errors = e.response.data.errors;
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        dispatch({type: PROFILE_ERROR, payload: e.response.data.errors});
    }
}