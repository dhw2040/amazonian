import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGN_OUT,
  USER_UPDATE_SECURITY_FAIL,
  USER_UPDATE_SECURITY_REQUEST,
  USER_UPDATE_SECURITY_RESET,
  USER_UPDATE_SECURITY_SUCCESS,
} from "../constants/userConstants";

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return {
        loading: true,
      };
    case USER_SIGNIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case USER_SIGNIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_SIGN_OUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userUpdateSecurityReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_SECURITY_REQUEST:
      return { loading: true };
    case USER_UPDATE_SECURITY_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_SECURITY_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_SECURITY_RESET:
      return {};
    default:
      return state;
  }
};
