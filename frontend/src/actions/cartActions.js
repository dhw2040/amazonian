import Axios from "axios";
import {
  ADD_CART_ITEM,
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

export const updateCartQuantity =
  (idx, quantity) => async (dispatch, getState) => {
    // const { currentCart } = localStorage.getItem(
    //   "cartItems",
    //   JSON.stringify(getState().cart.cartItems)
    // );
    // const newItem = { ...currentCart[idx] };
    // newItem.qty = quantity;
    // console.log(newItem);
    // const newCart = currentCart.map((x) => (x.product === idx ? x : newItem));
    dispatch({
      type: UPDATE_CART_QUANTITY,
      payload: { index: idx, qty: quantity },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
