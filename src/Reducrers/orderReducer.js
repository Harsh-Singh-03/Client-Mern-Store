import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, PLACE_ORDER_FAIL, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS } from "../Constants/OrderConstant";
import { CLEAR_ERRORS } from "../Constants/productConstants";

export const createOrderReducre = (state = { orderID: "", isOrderCreated: false }, action) => {
    switch (action.type) {
      case CREATE_ORDER_REQUEST:
        return {
          orderID: "",
          isOrderCreated: false
        };
      case CREATE_ORDER_SUCCESS:
        return {
            orderID: action.payload.orderId,
            isOrderCreated: action.payload.success,
            message: action.payload.message
        };
      case CREATE_ORDER_FAIL:
        return {
            orderID: "",
            isOrderCreated: false
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
};

export const placedOrderReducre = (state = { placedMessage: "", isOrderPlaced: false }, action) => {
    switch (action.type) {
      case PLACE_ORDER_REQUEST:
        return {
          placedMessage: "",
          isOrderPlaced: false
        };
      case PLACE_ORDER_SUCCESS:
        return {
            isOrderPlaced: action.payload.success,
            placedMessage: action.payload.message
        };
      case PLACE_ORDER_FAIL:
        return {
            placedMessage: action.payload.message,
            isOrderPlaced: false
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
};
  