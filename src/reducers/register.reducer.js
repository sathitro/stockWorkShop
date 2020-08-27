import {REGISTER_FAILED}  from "./../constrant/Constrant";

const initialState = {
    result: null,
    isFetching: false,
    error: false,
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case REGISTER_FAILED:
            return {...state, isFetching: false, error: true,  result: payload}
        default:
            return state
        }

}
