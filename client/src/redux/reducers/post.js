import {
    ADD_COMMENT,
    ADD_POST,
    DELETE_POST,
    GET_POST,
    GET_POSTS,
    POST_ERROR, REMOVE_COMMENT,
    SET_POSTS_LOADING,
    UPDATE_LIKES
} from "../actions/types";

const initialState = {
    post: null,
    posts: [],
    loading: true,
    error: {}
}

const post = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case SET_POSTS_LOADING:
            return {... state, loading: true};
        case DELETE_POST:
            return {... state, posts: state.posts.filter(post => post._id !== payload.id)}
        case ADD_POST:
            return {... state, posts: [payload, ...state.posts], loading: false};
        case GET_POSTS:
            return {... state, posts: payload, loading: false};
        case GET_POST:
            return {... state, post: payload, loading: false};
        case POST_ERROR:
            return {... state, loading: false, error: payload};
        case ADD_COMMENT:
            return {... state, post: {...state.post, comments: payload} , loading: false};
        case REMOVE_COMMENT:
            return {... state, post: {...state.post, comments: state.post.comments.filter(c => c._id !== payload)}, loading: false};
        case UPDATE_LIKES:
            return {... state,
                posts: state.posts.map(post => post._id === payload.id
                    ? {...post, likes: payload.likes}
                    : post)
            }
        default:
            return state;
    }
}
export default post;