import Axios from "axios";
import { CART_RESET } from "../constants/cartConstants";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_SUMMARY_FAIL,
  ORDER_SUMMARY_REQUEST,
  ORDER_SUMMARY_SUCCESS,
} from "../constants/orderConstats";

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    // const { data } = await Axios.post("/api/order", order, {
    //   headers: { Authorization: `Bearer ${userInfo.token}` },
    // });
    const { data } = await Axios({
      method: "post",
      url: "/api/order",
      data: order,
      headers: { Authorization: "Basic " + userInfo.token },
    });

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: CART_RESET });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const summaryOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_SUMMARY_REQUEST, payload: orderId });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    // const { data } = await Axios.get(`/api/order/${orderId}`, orderId, {
    //   headers: { Authorization: `Bearer ${userInfo.token}` },
    // });
    const { data } = await Axios({
      method: "get",
      url: `/api/order/${orderId}`,
      headers: { Authorization: "Basic " + userInfo.token },
    });

    dispatch({ type: ORDER_SUMMARY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_SUMMARY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};