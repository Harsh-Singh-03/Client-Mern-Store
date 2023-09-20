import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS,CLEAR_ERRORS, FILTER_PRODUCT_FAIL, FILTER_PRODUCT_REQUEST, FILTER_PRODUCT_SUCCESS, REQUEST_FILTER_DATA, SUCCESS_FILTER_DATA, FAIL_FILTER_DATA, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL} from "../Constants/productConstants";

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case ALL_PRODUCT_SUCCESS:
      return {
        products: action.payload,
        loading: false,
      };
    case ALL_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
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

export const filterReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case FILTER_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case FILTER_PRODUCT_SUCCESS:
      return {
        products: action.payload,
        loading: false,
      };
    case FILTER_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
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

export const FilterDataReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case REQUEST_FILTER_DATA:
      return {
        loading: true,
        data: [],
      };
    case SUCCESS_FILTER_DATA:
      return {
        loading: false,
        data: action.payload,
      };
    case FAIL_FILTER_DATA:
      return {
        loading: false,
        error: action.payload,
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

export const getQueryReducer = (state = { queryVal: {} }, action) => {
  switch (action.type) {
    case "GET_QUERY_VALUE":
      return {
        queryVal: action.payload
      }
    default:
      return state;
  }
}

export const newProductReducer = (state = { product: {}, loading: true, isProduct: false }, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        loading: true,
        product: {},
        isProduct: false
      }
    case NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        isProduct: action.payload.success
      }
    case NEW_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
        isProduct: false
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








