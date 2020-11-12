import axios from 'axios';
import {
    ACCOUNT_DELETED,
    CLEAR_PROFILE,
    GET_PROFILE,
    GET_PROFILES,
    GET_REPOS,
    PROFILE_ERROR,
    UPDATE_PROFILE
} from "./types";
import {setAlert} from "./alert";

export const getCurrentProfile = () => async (dispatch) => {
    try{
        const res = await axios.get('/api/profile/me');
        dispatch({type: GET_PROFILE, payload: res.data});
    } catch (e) {
        dispatch({type: PROFILE_ERROR, payload: e.message});
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
        dispatch({type: PROFILE_ERROR, payload: e.message});
    }
}

export const addExperience = (formData, history) => async (dispatch) => {
    try {
        const res = await axios.put('/api/profile/experience', formData, {headers: {'Content-Type': 'application/json'}});
        dispatch({type: UPDATE_PROFILE, payload: res.data});
        dispatch(setAlert('Experience added.', 'success'));
        history.push('/dashboard');
    } catch (e) {
        const errors = e.response.data.errors;
        if(errors) errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        dispatch({type: PROFILE_ERROR, payload: e.message});
    }
}

export const addEducation = (formData, history) => async (dispatch) => {
    try {
        const res = await axios.put('/api/profile/education', formData, {headers: {'Content-Type': 'application/json'}});
        dispatch({type: UPDATE_PROFILE, payload: res.data});
        dispatch(setAlert('Education added.', 'success'));
        history.push('/dashboard');
    } catch (e) {
        const errors = e.response.data.errors;
        if(errors) errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        dispatch({type: PROFILE_ERROR, payload: e.message});
    }
}

export const deleteExperience = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);
        dispatch({type: UPDATE_PROFILE, payload: res.data});
        dispatch(setAlert('Experience deleted.'))
    } catch (e) {
        dispatch({type: PROFILE_ERROR, payload: e.message});
    }
}

export const deleteEducation = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);
        dispatch({type: UPDATE_PROFILE, payload: res.data});
        dispatch(setAlert('Education deleted.'));
    } catch (e) {
        dispatch({type: PROFILE_ERROR, payload: e.message});
    }
}

export const deleteAccount = () => async (dispatch) => {
    if(window.confirm('Are you sure you want to delete user.')) {
        try {
            await axios.delete('/api/profile');
            dispatch({type: ACCOUNT_DELETED});
            dispatch({type: CLEAR_PROFILE});
            dispatch(setAlert('Account is deleted.'));
        } catch (e) {
            dispatch({type: PROFILE_ERROR, payload: e.message});
        }
    }
}

export const getAllProfiles = () => async (dispatch) => {
    try {
        dispatch({type: CLEAR_PROFILE});
        const res = await axios.get('/api/profile');
        dispatch({type: GET_PROFILES, payload: res.data});
    } catch (e) {
        dispatch({type: PROFILE_ERROR, payload: e.message});
    }
}

export const getRepos = (username) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`);
        dispatch({type: GET_REPOS, payload: res.data});
    } catch (e) {
        dispatch({type: PROFILE_ERROR, payload: e.message});
    }
}

export const getUserById = (userId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);
        dispatch({type: GET_PROFILE, payload: res.data});
    } catch (e) {
        dispatch({type: PROFILE_ERROR, payload: e.message});
    }
}
