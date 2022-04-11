import Axios from "axios";
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
  USER_UPDATE_SECURITY_SUCCESS,
} from "../constants/userConstants";

export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post("/api/users/signin", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  dispatch({ type: USER_SIGN_OUT });
};

export const register =
  (name, email, password, confirmPassword) => async (dispatch) => {
    dispatch({
      type: USER_REGISTER_REQUEST,
      payload: { name, email, password, confirmPassword },
    });
    try {
      const { data } = await Axios.post("/api/users/register", {
        name,
        email,
        password,
        confirmPassword,
      });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data }); // After register, authenticate user as well by dispatching signin
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateUserSecurity = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_SECURITY_REQUEST, payload: user });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put("/api/users/security", user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_UPDATE_SECURITY_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_SECURITY_FAIL, payload: message });
  }
};
