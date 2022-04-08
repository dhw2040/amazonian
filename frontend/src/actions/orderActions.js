import Axios from "axios";
import { CART_RESET } from "../constants/cartConstants";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_MY_LIST_FAIL,
  ORDER_MY_LIST_REQUEST,
  ORDER_MY_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
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

export const payOrder =
  (order, paymentResult) => async (dispatch, getState) => {
    dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await Axios({
        method: "put",
        url: `/api/order/${order._id}/pay`,
        data: { order, paymentResult },
        headers: { Authorization: "Basic " + userInfo.token },
      });

      dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listMyOrder = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_MY_LIST_REQUEST, payload: {} });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await Axios({
      method: "GET",
      url: "/api/order/mine",
      headers: { Authorization: "Basic " + userInfo.token },
    });

    dispatch({ type: ORDER_MY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_MY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
