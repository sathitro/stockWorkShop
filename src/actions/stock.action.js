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

// ไม่ได้เรียก reducer
export const addProduct = (formData, history) => {
  return async (dispatch) => {
    await httpClient.post(server.PRODUCT_URL, formData);
    //back to product page
    history.goBack();
  };
};

export const getProductById = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setStateToFetching());
      let result = await httpClient.get(`${server.PRODUCT_URL}/${id}`);
      dispatch(setStateToSuccess(result.data));
    } catch (error) {
      alert(JSON.stringify(error));
      dispatch(setStateToFailed());
    }
  };
};

export const updateProduct = (formData, history) => {
  return async dispatch => {
    await httpClient.put(server.PRODUCT_URL, formData);
    history.goBack();
  };
};

//delete Product by id
export const deleteProduct = (id) => {
  return async (dispatch) => {
    debugger;
    await httpClient.delete(`/stock/product/${id}`);
    await doGetProducts(dispatch);
  };
};