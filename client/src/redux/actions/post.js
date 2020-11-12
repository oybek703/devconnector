import {
    ADD_COMMENT,
    ADD_POST,
    DELETE_POST,
    GET_POST,
    GET_POSTS,
    POST_ERROR, REMOVE_COMMENT,
    SET_POSTS_LOADING,
    UPDATE_LIKES
} from "./types";
import axios from 'axios';
import {setAlert} from "./alert";

export const getPosts = () => async (dispatch) => {
    try {
        dispatch({type: SET_POSTS_LOADING});
        const res = await axios.get('/api/posts');
        dispatch({type: GET_POSTS, payload: res.data});
    } catch (e) {
        dispatch({type: POST_ERROR, payload: e.message});
    }
}

export const addLike = (id) => async (dispatch) => {
    try {
        const res = await axios.put(`/api/posts/like/${id}`);
        dispatch({type: UPDATE_LIKES, payload: {id, likes: res.data}});
    } catch (e) {
        dispatch({type: POST_ERROR, payload: e.message});
    }
}

export const removeLike = (id) => async (dispatch) => {
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`);
        dispatch({type: UPDATE_LIKES, payload: {id, likes: res.data}});
    } catch (e) {
        dispatch({type: POST_ERROR, payload: e.message});
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await axios.delete(`/api/posts/${id}`);
        dispatch({type: DELETE_POST, payload: {id}});
        dispatch(setAlert('Post removed', 'success'));
    } catch (e) {
        dispatch({type: POST_ERROR, payload: e.message});
    }
}

export const addPost = (formData) => async (dispatch) => {
    try {
        const res = await axios.post('/api/posts', formData,{headers: {'Content-Type': 'application/json'}});
        dispatch({type: ADD_POST, payload: res.data});
        dispatch(setAlert('Post added.', 'success'));
    } catch (e) {
        dispatch({type: POST_ERROR, payload: e.message});
    }
}

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({type: SET_POSTS_LOADING});
        const res = await axios.get(`/api/posts/${id}`);
        dispatch({type: GET_POST, payload: res.data});
    } catch (e) {
        dispatch({type: POST_ERROR, payload: e.message});
    }
}

export const addComment = (postId, formData) => async (dispatch) => {
    try {
        const res = await axios.post(`/api/posts/comments/${postId}`, formData, {headers: {'Content-Type': 'application/json'}});
        dispatch({type: ADD_COMMENT, payload: res.data});
        dispatch(setAlert('Comment added.', 'success'));
    } catch (e) {
        dispatch({type: POST_ERROR, payload: e.message});
    }
}

export const deleteComment = (postId, commentId) => async (dispatch) => {
    try {
        await axios.delete(`/api/posts/comments/${postId}/${commentId}`);
        dispatch({type: REMOVE_COMMENT, payload: commentId});
        dispatch(setAlert('Comment deleted.', 'danger'));
    } catch (e) {
        dispatch({type: POST_ERROR, payload: e.message});
    }
}