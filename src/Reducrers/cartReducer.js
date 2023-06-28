import { ADD_TO_CART_FAIL, ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, REMOVE_CART_FAIL, REMOVE_CART_REQUEST, REMOVE_CART_SUCCESS, UPDATE_CART_FAIL, UPDATE_CART_REQUEST, UPDATE_CART_SUCCESS, GET_CART_ITEM_FAIL, GET_CART_ITEM_REQUEST, GET_CART_ITEM_SUCCESS } from "../Constants/CartConstants";
import { CLEAR_ERRORS } from "../Constants/productConstants";

export const AddToCart = (state = { cartMessage: "", cartData: {}, isCart: false }, action) => {
    switch (action.type) {
        case ADD_TO_CART_REQUEST:
            return {
                cartMessage: "",
                cartData: {},
                isCart: false
            }
        case ADD_TO_CART_SUCCESS:
            return {
                cartMessage: action.payload.message,
                cartData: action.payload.data,
                isCart: action.payload.success
            }
        case ADD_TO_CART_FAIL:
            return {
                cartMessage: "",
                isCart: false,
                cartData: {}
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }

}

export const UpdateCart = (state = { UCartMessage: "", UpCartData: {}, isUpCart: false }, action) => {
    switch (action.type) {
        case UPDATE_CART_REQUEST:
            return {
                UCartMessage: "",
                UpCartData: {},
                isUpCart: false
            }
        case UPDATE_CART_SUCCESS:
            return {
                UCartMessage: action.payload.message,
                UpCartData: action.payload.data,
                isUpCart: action.payload.success
            }
        case UPDATE_CART_FAIL:
            return {
                UCartMessage: "",
                isUpCart: false,
                UpCartData: {}
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }

}
export const removeCart = (state = { RCartMessage: "", RCartData: {}, isRCart: false }, action) => {
    switch (action.type) {
        case REMOVE_CART_REQUEST:
            return {
                RCartMessage: "",
                RCartData: {},
                isRCart: false
            }
        case REMOVE_CART_SUCCESS:
            return {
                RCartMessage: action.payload.message,
                RCartData: action.payload.data,
                isRCart: action.payload.success
            }
        case REMOVE_CART_FAIL:
            return {
                RCartMessage: "",
                isRCart: false,
                RCartData: {}
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }

}

export const CartItemsReducers = (state = { CartMessage: "", CartData: {items: []}, isCartItems: true, loading: true }, action) => {
    switch (action.type) {
        case GET_CART_ITEM_REQUEST:
            return {
                CartMessage: "",
                CartData: {items: []},
                loading: true,
                isCartItems: true,
            }
        case GET_CART_ITEM_SUCCESS:
            return {
                CartMessage: action.payload.message,
                CartData: action.payload.data,
                loading: false,
                isCartItems: action.payload.isCartItem,
            }
        case GET_CART_ITEM_FAIL:
            return {
                CartMessage: "Cart is empty",
                CartData: {items: []},
                loading: false,
                isCartItems: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }

}

export const CartDisplay = (state = { CartView: false }, action) => {
    switch (action.type) {
        case "CART_OPEN":
          return {
            CartView: true
          };
        case "CART_CLOSE":
          return {
            CartView: false
          };
        default:
          return state;
      }
}

export const CheckoutProcess = (state = { processCount: 1 }, action) => {
    switch (action.type) {
        case "PROCESS_DETAIL":
          return {
            processCount: 1
          };
        case "PROCESS_PAYMENT":
          return {
            processCount: 2
          };
        default:
          return state;
      }
}
