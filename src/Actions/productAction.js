import axios from "axios";

import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS,CLEAR_ERRORS, FILTER_PRODUCT_FAIL, FILTER_PRODUCT_REQUEST, FILTER_PRODUCT_SUCCESS, REQUEST_FILTER_DATA, SUCCESS_FILTER_DATA, FAIL_FILTER_DATA, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL } from "../Constants/productConstants";

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });
    const { data } = await axios.post(`${process.env.REACT_APP_PRODUCT_URL}/get-all-product-test`);
    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getFilterProducts = (query) => async (dispatch) => {
  try {
    dispatch({ type: FILTER_PRODUCT_REQUEST });
    const { data } = await axios.get(`${process.env.REACT_APP_PRODUCT_URL}/product-filter`, {params: query});
    dispatch({
      type: FILTER_PRODUCT_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: FILTER_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getFilterData = (query) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_FILTER_DATA });
    const { data } = await axios.post(`${process.env.REACT_APP_PRODUCT_URL}/get-price-brand`, query);
    dispatch({
      type: SUCCESS_FILTER_DATA,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: FAIL_FILTER_DATA,
      payload: error.response.data.message,
    });
  }
};
export const getQueryValue = (query) => async (dispatch) =>{
  dispatch({
    type: "GET_QUERY_VALUE",
    payload: query
  });
}
export const GetSingleProduct= (id) => async (dispatch) =>{
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });
    const { data } = await axios.post(`${process.env.REACT_APP_PRODUCT_URL}/get-single-product`, id);
    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
}
// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};