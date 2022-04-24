import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import {
  orderCreateReducer,
  orderMyListReducer,
  orderPayReducer,
  orderSummaryReducer,
} from "./reducers/orderReducers";
import {
  listReducer,
  detailsReducer,
  listCategoriesReducer,
  reviewsReducer,
  updateReviewReducer,
} from "./reducers/productReducers";
import {
  createReviewReducer,
  deleteReviewReducer,
  searchReviewsReducer,
} from "./reducers/reviewReducers";
import {
  userRegisterReducer,
  userSigninReducer,
  userUpdateSecurityReducer,
} from "./reducers/userReducers";

const initialState = {
  userSignIn: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "Paypal",
  },
};

const reducer = combineReducers({
  productList: listReducer,
  productDetails: detailsReducer,
  productReviews: reviewsReducer,
  productCategories: listCategoriesReducer,
  reviewsSearch: searchReviewsReducer,
  reviewCreate: createReviewReducer,
  reviewUpdate: updateReviewReducer,
  reviewDelete: deleteReviewReducer,
  cart: cartReducer,
  userSignIn: userSigninReducer,
  userRegister: userRegisterReducer,
  userUpdateSecurity: userUpdateSecurityReducer,
  orderCreate: orderCreateReducer,
  orderSummary: orderSummaryReducer,
  orderPay: orderPayReducer,
  orderMyList: orderMyListReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
