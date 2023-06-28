import axios from "axios";
import { CLEAR_ERRORS } from "../Constants/productConstants";
import { ADD_TO_CART_FAIL, ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, REMOVE_CART_FAIL, REMOVE_CART_REQUEST, REMOVE_CART_SUCCESS, UPDATE_CART_FAIL, UPDATE_CART_REQUEST, UPDATE_CART_SUCCESS, GET_CART_ITEM_FAIL, GET_CART_ITEM_REQUEST, GET_CART_ITEM_SUCCESS } from "../Constants/CartConstants";

export const AddToCart = (Item) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TO_CART_REQUEST });
    const { data } = await axios.post(`${process.env.REACT_APP_CART_URL}/new-cart`, Item);
    dispatch({
      type: ADD_TO_CART_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ADD_TO_CART_FAIL,
      payload: error.response.data.message,
    });
  }
}

export const updateCart = (Item) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CART_REQUEST });
    const { data } = await axios.post(`${process.env.REACT_APP_CART_URL}/update-cart`, Item);
    dispatch({
      type: UPDATE_CART_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CART_FAIL,
      payload: error.response.data.message,
    });
  }
}

export const removeCart = (Item) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_CART_REQUEST });
    const { data } = await axios.post(`${process.env.REACT_APP_CART_URL}/remove-cart-item`, Item);
    dispatch({
      type: REMOVE_CART_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: REMOVE_CART_FAIL,
      payload: error.response.data.message,
    });
  }
}

export const getCartItems = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CART_ITEM_REQUEST });
    const { data } = await axios.post(`${process.env.REACT_APP_CART_URL}/get-cart-items`);
    dispatch({
      type: GET_CART_ITEM_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_CART_ITEM_FAIL,
      payload: error.response.data.message,
    });
  }
}

export const ToggleCartPage = (type) => async (dispatch) => {
  dispatch({
    type: type,
    payload: []
  });
}

export const CheckoutProcess = (type) => async (dispatch) => {
  dispatch({
    type: type,
    payload: []
  });
}


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};