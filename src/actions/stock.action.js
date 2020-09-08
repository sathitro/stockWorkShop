import { STOCK_FETCHING, STOCK_SUCCESS, STOCK_FAILED, server } from "../constrant/Constrant";
import { httpClient } from "./../utils/HttpClient";

export const setStateToSuccess = (payload) => ({
    type: STOCK_SUCCESS,
    payload,
});
  
const setStateToFetching = () => ({
    type: STOCK_FETCHING,
});
  
const setStateToFailed = () => ({
    type: STOCK_FAILED,
});
  
export const getProducts = () => {
    return dispatch => {
      dispatch(setStateToFetching());
      doGetProducts(dispatch);
    };
};

const doGetProducts = async dispatch => {
    try {
      let result = await httpClient.get(server.PRODUCT_URL);
      dispatch(setStateToSuccess(result.data));
    } catch (err) {      
      dispatch(setStateToFailed());
    }
};