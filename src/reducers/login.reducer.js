import { LOGIN_FETCHING, LOGIN_FAILED, LOGIN_SUSCESS, LOGOUT } from "./../constrant/Constrant";

// rxreducer ninja
const initialState = {
    result: null,
    isFetching: false,
    error: false,
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN_FETCHING:
            return {...state,isFetching: true,  error: false, result: null}
        case LOGIN_FAILED:
            return {...state,isFetching: false, error: true,  result: payload}
        case LOGIN_SUSCESS:
            return {...state,isFetching: false, error: false, result: payload}
        case LOGOUT:
            return initialState
        default:
            return state
    }
}
