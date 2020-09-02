import {REGISTER_FAILED,REGISTER_SUCCESS,REGISTER_DEFAULT}  from "./../constrant/Constrant";

// to Reducer
export const setStateToFailed = (payload) => ({
    type: REGISTER_FAILED,
    payload
});

export const setStateToSuccess = (payload) => ({
    type: REGISTER_SUCCESS,
    payload
})

export const setStateToDefault = () => ({
    type: REGISTER_DEFAULT,
})


//action for React to use
export const hasError = (payload) => {
    return dispatch => {
        dispatch(setStateToFailed(payload));
    }
}


export const registerSuccess = (payload) => {
    return dispatch => {
        dispatch(setStateToSuccess(payload));
    }
}

export const registerDefault = () => {
    return dispatch => {
        dispatch(setStateToDefault());
    }
}

