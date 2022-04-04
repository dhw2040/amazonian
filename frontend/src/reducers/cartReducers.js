import {
  ADD_CART_ITEM,
  CART_SAVE_ADDRESS,
  DELETE_CART_ITEM,
  UPDATE_CART_QUANTITY,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_CART_ITEM:
      const item = action.payload;
      const inCart = state.cartItems.find((x) => x.product === item.product);
      if (inCart) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === item.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case DELETE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case UPDATE_CART_QUANTITY:
      const updateItem = state.cartItems.find(
        (x) => x.product === action.payload.index
      );
      updateItem.qty = action.payload.qty;
      const newCart = state.cartItems.map((x) =>
        x.product === action.payload.index ? updateItem : x
      );
      return {
        ...state,
        cartItems: newCart,
      };
    case CART_SAVE_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    default:
      return state;
  }
};
