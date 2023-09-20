import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {productsReducer, filterReducer, FilterDataReducer, getQueryReducer, newProductReducer} from "./Reducrers/productReducers";
import { AuthDisplay, SignupReducer, UserTokenReducer, SignOutReducer, SigninReducer, AddAddressReducer } from "./Reducrers/UserReducers";
import { AddToCart, UpdateCart, removeCart, CartDisplay, CartItemsReducers,CheckoutProcess } from "./Reducrers/cartReducer";
import { createOrderReducre, placedOrderReducre, getCustomerOrders } from "./Reducrers/orderReducer";

const reducer = combineReducers({
    products: productsReducer,
    filters: filterReducer,
    filterKeyData: FilterDataReducer,
    queryval: getQueryReducer,
    Signup: SignupReducer,
    AuthDisplay: AuthDisplay,
    TokenVerify: UserTokenReducer,
    SignOut: SignOutReducer,
    SignIn: SigninReducer,
    newProduct: newProductReducer,
    newCart: AddToCart,
    updateCart: UpdateCart  ,
    removeCart,
    CartDisplay,
    CartItems: CartItemsReducers,
    CheckoutProcess,
    addUserAddress: AddAddressReducer,
    CreateOrder: createOrderReducre,
    PlacedOrder: placedOrderReducre,
    getCustomerOrders
  });
  
  let initialState = {}
  const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;