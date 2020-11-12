import {
    CLEAR_PROFILE,
    GET_PROFILE,
    GET_PROFILES,
    GET_REPOS,
    PROFILE_ERROR,
    UPDATE_PROFILE
} from "../actions/types";

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

const profile = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case GET_PROFILES:
            return {... state, profiles: payload, loading: false};
        case GET_REPOS:
            return {...state, repos: payload, loading: false};
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {...state, loading: false, profile: payload, error: {}};
        case PROFILE_ERROR:
            return {...state, loading: false, error: payload};
        case CLEAR_PROFILE:
            return {...state, profile: null, repos: [], error: {}, loading: true, profiles: []};
        default:
            return state;
    }
}
export default profile;