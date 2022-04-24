import Axios from "axios";
import {
  REVIEWS_CREATE_FAIL,
  REVIEWS_CREATE_REQUEST,
  REVIEWS_CREATE_SUCCESS,
  REVIEWS_DELETE_FAIL,
  REVIEWS_DELETE_REQUEST,
  REVIEWS_DELETE_SUCCESS,
  REVIEWS_SEARCH_FAIL,
  REVIEWS_SEARCH_REQUEST,
  REVIEWS_SEARCH_SUCCESS,
  REVIEWS_UPDATE_FAIL,
  REVIEWS_UPDATE_REQUEST,
  REVIEWS_UPDATE_SUCCESS,
} from "../constants/reviewConstants";

export const searchReviews =
  ({
    productId,
    sortOrder = "top",
    verifiedFilter = false,
    ratingFilter = "all",
    page = 1,
  }) =>
  async (dispatch) => {
    dispatch({ type: REVIEWS_SEARCH_REQUEST });
    try {
      const { data } = await Axios.get(
        `/api/review?product=${productId}&sort=${sortOrder}&verified=${verifiedFilter}&rating=${ratingFilter}&page=${page}`
      );
      dispatch({ type: REVIEWS_SEARCH_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: REVIEWS_SEARCH_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createReview = (review) => async (dispatch, getState) => {
  dispatch({ type: REVIEWS_CREATE_REQUEST, payload: review });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await Axios({
      method: "post",
      url: "/api/review/create-review",
      data: review,
      headers: { Authorization: "Basic " + userInfo.token },
    });
    dispatch({ type: REVIEWS_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REVIEWS_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateReview = (review) => async (dispatch, getState) => {
  dispatch({ type: REVIEWS_UPDATE_REQUEST, payload: review });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await Axios({
      method: "put",
      url: "/api/review/edit-review",
      data: review,
      headers: { Authorization: "Basic " + userInfo.token },
    });
    dispatch({ type: REVIEWS_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REVIEWS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteReview = (productId) => async (dispatch, getState) => {
  dispatch({ type: REVIEWS_DELETE_REQUEST, payload: { product: productId } });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await Axios({
      method: "delete",
      url: "/api/review/delete-review",
      headers: { Authorization: "Basic " + userInfo.token },
      data: { product: productId },
    });
    dispatch({ type: REVIEWS_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REVIEWS_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
