import { STOCK_FETCHING, STOCK_SUCCESS, STOCK_FAILED } from "../constrant/Constrant";

const initialState = {
    result: null,
    isFetching: false,
    isError: false,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
      case STOCK_FETCHING:
        return { ...state, isFetching: true, result: null, isError: false  };
      case STOCK_SUCCESS:
        return { ...state, isFetching: false, result: payload, isError: false };
      case STOCK_FAILED:
        return { ...state, isFetching: false, result: null, isError: true };
      default:
        return state;
    }
};
  
