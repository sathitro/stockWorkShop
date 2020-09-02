import { REGISTER_FAILED, REGISTER_SUCCESS, REGISTER_DEFAULT }  from "./../constrant/Constrant";

const initialState = {
    result: null,
    isFetching: false,
    error: false,
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case REGISTER_FAILED:
            return {...state, isFetching: false, error: true,  result: payload}
        case REGISTER_SUCCESS:
            return {...state, isFetching: false, error: false,  result: payload}
        case REGISTER_DEFAULT:
            return initialState
        default:
            return state
        }

}
