import axios from "axios";
import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, PLACE_ORDER_FAIL, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS } from "../Constants/OrderConstant";

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


  