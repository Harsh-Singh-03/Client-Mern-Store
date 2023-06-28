import axios from "axios";
import { USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL, USER_TOKEN_VERIFY_REQ, USER_TOKEN_VERIFY_SUCCESS, USER_TOKEN_VERIFY_FAIL, USER_SIGNOUT_REQ, USER_SIGNOUT_SUCCESS, USER_SIGNOUT_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, ADD_ADDRESS_REQUEST, ADD_ADDRESS_SUCCESS, ADD_ADDRESS_FAIL } from "../Constants/UserConstants";

axios.defaults.withCredentials = true;

export const SignUp = (formdata) => async (dispatch) => {
    try {
        dispatch({ type: USER_SIGNUP_REQUEST });
        const { data } = await axios.post(`${process.env.REACT_APP_USER_URL}/sign-up`, formdata, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response.data.message,
        });
    }

}

export const SignIn = (d) => async (dispatch) => {
    try {
        dispatch({ type: USER_SIGNIN_REQUEST });
        const { data } = await axios.post(`${process.env.REACT_APP_USER_URL}/login`, d, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response.data.message,
        });
    }
}

export const TokenVerify = () => async (dispatch) => {
    try {
        dispatch({ type: USER_TOKEN_VERIFY_REQ });
        const { data } = await axios.post(`${process.env.REACT_APP_USER_URL}/verify-token`);
        dispatch({
            type: USER_TOKEN_VERIFY_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_TOKEN_VERIFY_FAIL,
            payload: error.response.data.message,
        });
    }
}

export const toggleAuthDisplay = (type) => async (dispatch) => {
    dispatch({
        type: type,
        payload: []
    });
}
export const SIGNOUT = () => async (dispatch) => {
    dispatch({type: USER_SIGNOUT_REQ, });
    try {
        const {data} = await axios.post(`${process.env.REACT_APP_USER_URL}/sign-out`)
        dispatch({
            type: USER_SIGNOUT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_SIGNOUT_FAIL,
            payload: error.response.data.message
        })
    }
}
// Addresss

export const addUserAddress = (Address) => async (dispatch) => {
    try {
        dispatch({ type: ADD_ADDRESS_REQUEST });
        const { data } = await axios.post(`${process.env.REACT_APP_USER_URL}/add-user-address`, Address);
        dispatch({
            type: ADD_ADDRESS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ADD_ADDRESS_FAIL,
            payload: error.response.data.message,
        });
    }
}