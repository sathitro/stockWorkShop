import {REGISTER_FAILED}  from "./../constrant/Constrant";

// to Reducer
export const setStateToFailed = (payload) => ({
    type: REGISTER_FAILED,
    payload
});


//action for React to use
export const hasError = (payload) => {
    return dispatch => {
        dispatch(setStateToFailed(payload));
    }
}





