
import {LOGIN_FETCHING, LOGIN_FAILED, LOGIN_SUSCESS, LOGOUT } from "../constrant/Constrant";

// rxaction ninja
export const setStateToFetching = () => ({
    type: LOGIN_FETCHING,
});

export const setStateToSuccess = (payload) => ({
    type: LOGIN_SUSCESS,
    payload
});

export const setStateToFailed = (payload) => ({
    type: LOGIN_FAILED,
    payload
});

export const setStateToLogOut = () => ({
    type: LOGOUT,
});


export const login = ({username, password, history})=>{
    return dispatch => {
        dispatch(setStateToFetching());
        setTimeout(() => { 
            dispatch(setStateToSuccess("ok"));
            history.push('/stock');
        },2000);
    }
}

export const logout = ({history}) => {
    return dispatch => {
        dispatch(setStateToLogOut());
        history.push('/');
    }
}

