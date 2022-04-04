import Axios from "axios";
import {
  ADD_CART_ITEM,
  CART_SAVE_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  DELETE_CART_ITEM,
  UPDATE_CART_QUANTITY,
} from "../constants/cartConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/products/${productId}`);
  dispatch({
    type: ADD_CART_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      stock: data.stock,
      price: data.price,
      product: data._id,
      qty,
      maxQty: data.maxQty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems)); // Save in the local storage
};

export const deleteFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: DELETE_CART_ITEM, payload: productId });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const updateCartQuantity = (idx, quantity) => (dispatch, getState) => {
  dispatch({
    type: UPDATE_CART_QUANTITY,
    payload: { index: idx, qty: quantity },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
  localStorage.setItem("paymentMethod", data);
};
