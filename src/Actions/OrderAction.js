import axios from "axios";
import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_CUS_FAIL, GET_ORDER_CUS_REQUEST, GET_ORDER_CUS_SUCCESS, PLACE_ORDER_FAIL, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS } from "../Constants/OrderConstant";

export const createOrder = (detail) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_ORDER_REQUEST });
      const { data } = await axios.post(`${process.env.REACT_APP_ORDER_URL}/create-order`, detail);
      dispatch({
        type: CREATE_ORDER_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: CREATE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
}

export const placedOrder = (detail) => async (dispatch) => {
    try {
      dispatch({ type: PLACE_ORDER_REQUEST });
      const { data } = await axios.post(`${process.env.REACT_APP_ORDER_URL}/placed-order`, detail);
      dispatch({
        type: PLACE_ORDER_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: PLACE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
}

export const getCustomerOrders = (detail) => async (dispatch) => {
    try {
      dispatch({ type: GET_ORDER_CUS_REQUEST });
      const { data } = await axios.get(`${process.env.REACT_APP_ORDER_URL}/get-customer-orders?id=${detail}`, );
      dispatch({
        type: GET_ORDER_CUS_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: GET_ORDER_CUS_FAIL,
        payload: error.response.data.message,
      });
    }
}


  