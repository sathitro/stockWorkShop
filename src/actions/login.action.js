
import {LOGIN_FETCHING, LOGIN_FAILED, LOGIN_SUSCESS, LOGOUT, LOGIN_STATUS, server } from "../constrant/Constrant";
import { httpClient } from "./../utils/HttpClient";
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
    return async dispatch => {
        dispatch(setStateToFetching());
        // setTimeout(() => { 
        //     dispatch(setStateToSuccess("ok"));
        //     history.push('/stock');
        // },2000);
        const result = await httpClient.post( server.LOGIN_URL, {username,password} );
        //alert(JSON.stringify(result.data));
        if(result.data.result === 'ok'){
            localStorage.setItem(LOGIN_STATUS, "ok");
            dispatch(setStateToSuccess(result.data.result));
            history.push('/stock');
        }else{
            localStorage.setItem(LOGIN_STATUS, "nok");
            dispatch(setStateToFailed(result.data.message));
        }
    }
}

export const logout = ({history}) => {
    return dispatch => {
        localStorage.removeItem(LOGIN_STATUS);
        dispatch(setStateToLogOut());
        history.push('/');
    }
}

export const hasError = (payload) => {
    return dispatch => {
        dispatch(setStateToFailed(payload))
    }
}

export const reLogin = () => {
    return dispatch => {
        const loginStatus = localStorage.getItem(LOGIN_STATUS);
        if(loginStatus === 'ok'){
            dispatch(setStateToSuccess({}));
        }
    }
}

export const isLoggedIn = () => {
    const loginStatus = localStorage.getItem(LOGIN_STATUS);
    return loginStatus === "ok";
};