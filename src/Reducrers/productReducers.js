import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS,CLEAR_ERRORS, FILTER_PRODUCT_FAIL, FILTER_PRODUCT_REQUEST, FILTER_PRODUCT_SUCCESS, REQUEST_FILTER_DATA, SUCCESS_FILTER_DATA, FAIL_FILTER_DATA, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, ALL_REVIEW_REQUEST, ALL_REVIEW_SUCCESS, ALL_REVIEW_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL, UPDATE_REVIEW_REQUEST, UPDATE_REVIEW_SUCCESS, UPDATE_REVIEW_FAIL} from "../Constants/productConstants";

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

export const allReviews = (state = { Reviews: [], loading: false }, action) => {
  switch (action.type) {
    case ALL_REVIEW_REQUEST:
      return {
        loading: true,
        Reviews: [],
      }
    case ALL_REVIEW_SUCCESS:
      return {
        loading: false,
        Reviews: action.payload.data,
      }
    case ALL_REVIEW_FAIL:
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

}

export const addReviews = (state = { newRev: {}, loading: false, isReviewSuccess: false }, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        loading: true,
        newRev: {},
        isReviewSuccess: false
      }
    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        newRev: action.payload.data,
        isReviewSuccess: action.payload.success
      }
    case NEW_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
        isReviewSuccess: false
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

export const deleteReviews = (state = { message: "", loading: false, isReviewDelete: false }, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        loading: true,
        message: "",
        isReviewDelete: false
      }
    case DELETE_REVIEW_SUCCESS:
      return {
        loading: false,
        message: action.payload.message,
        isReviewDelete: action.payload.success
      }
    case DELETE_REVIEW_FAIL:
      return {
        loading: false,
        message:"",
        isReviewDelete: false
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

export const updateReview = (state = { updateMessage: "", loading: false, revData: [], isReviewUpdate: false }, action) => {
  switch (action.type) {
    case UPDATE_REVIEW_REQUEST:
      return {
        loading: true,
        updateMessage: "",
        revData: [],
        isReviewUpdate: false
      }
    case UPDATE_REVIEW_SUCCESS:
      return {
        loading: false,
        updateMessage: action.payload.message,
        revData: action.payload.data,
        isReviewUpdate: action.payload.success
      }
    case UPDATE_REVIEW_FAIL:
      return {
        loading: false,
        updateMessage:"",
        isReviewUpdate: false,
        revData: []
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



