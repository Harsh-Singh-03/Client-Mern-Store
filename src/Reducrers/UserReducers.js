import { USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL, USER_TOKEN_VERIFY_REQ, USER_TOKEN_VERIFY_SUCCESS, USER_TOKEN_VERIFY_FAIL, USER_SIGNOUT_REQ, USER_SIGNOUT_SUCCESS, USER_SIGNOUT_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL } from "../Constants/UserConstants";
import { CLEAR_ERRORS } from "../Constants/productConstants";

export const SignupReducer = (state = { data: {}, loading: false, SignUpSuccess: false  }, action) => {
    switch (action.type) {
        case USER_SIGNUP_REQUEST:
          return {
            loading: true,
            SignUpSuccess: false
          };
        case USER_SIGNUP_SUCCESS:
          return {
            SignUpSuccess: action.payload.success,
            loading: false,
            data: action.payload
          };
        case USER_SIGNUP_FAIL:
          return {
            loading: false,
            SignUpSuccess: false,
            data: action.payload
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
export const SigninReducer = (state = { data: {}, loading: false, SignInSuccess: false  }, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
          return {
            loading: true,
            SignInSuccess: false
          };
        case USER_SIGNIN_SUCCESS:
          return {
            SignInSuccess: action.payload.success,
            loading: false,
            data: action.payload
          };
        case USER_SIGNIN_FAIL:
          return {
            loading: false,
            SignInSuccess: false,
            data: action.payload
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
export const UserTokenReducer = (state = { UserData: {}, isLoggedIn: false, loading: false  }, action) => {
    switch (action.type) {
        case USER_TOKEN_VERIFY_REQ:
          return {
            isLoggedIn: false,
            loading: true
          };
        case USER_TOKEN_VERIFY_SUCCESS:
          return {
            isLoggedIn: action.payload.success,
            UserData: action.payload.user,
            loading: false
          };
        case USER_TOKEN_VERIFY_FAIL:
          return {
            isLoggedIn: false,
            loading: false
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

export const AuthDisplay = (state = { Authview: false }, action) => {
    switch (action.type) {
        case "TOGGLE_AUTH_DISPLAY":
          return {
            Authview: true
          };
        case "TOGGLE_AUTH_DISPLAY1":
          return {
            Authview: false
          };
        default:
          return state;
      }
}

export const SignOutReducer = (state = { data: [] , SignOutSuccess: false }, action) => {
  switch (action.type) {
      case USER_SIGNOUT_REQ:
        return {
          SignOutSuccess: false
        };
      case USER_SIGNOUT_SUCCESS:
        return {
          SignOutSuccess: action.payload.success,
          data: action.payload
        };
      case USER_SIGNOUT_FAIL:
        return {
          SignOutSuccess: false,
          data: action.payload
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

export const AddAddressReducer = (state = { Success: false  }, action) => {
  switch (action.type) {
      case USER_TOKEN_VERIFY_REQ:
        return {
          
        };
      case USER_TOKEN_VERIFY_SUCCESS:
        return {
          Success: action.payload.success
        };
      case USER_TOKEN_VERIFY_FAIL:
        return {
         Success : false
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