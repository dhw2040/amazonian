import Axios from "axios";
import {
  PRODUCT_CATEGORY_LIST_FAIL,
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_REVIEWS_FAIL,
  PRODUCT_REVIEWS_REQUEST,
  PRODUCT_REVIEWS_SUCCESS,
  PRODUCT_UPDATE_REVIEW_FAIL,
  PRODUCT_UPDATE_REVIEW_REQUEST,
  PRODUCT_UPDATE_REVIEW_SUCCESS,
} from "../constants/productConstants";

export const listProducts =
  ({
    department = "all",
    keywords = "all",
    minPrice = 0,
    maxPrice = Infinity,
    minRating = 0,
    sortOrder = "newest",
    pageNum = 1,
  }) =>
  async (dispatch) => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.get(
        `/api/products?department=${department}&keywords=${keywords}&min=${minPrice}&max=${maxPrice}&rating=${minRating}&sort=${sortOrder}&page=${pageNum}`
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
  };

export const listProductCategories = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/products/categories`);
    dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_CATEGORY_LIST_FAIL, payload: error.message });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    const { data } = await Axios.get(`/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listReviews = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_REVIEWS_REQUEST, payload: productId });
  try {
    const { data } = await Axios.get(`/api/products/${productId}/review`);
    dispatch({ type: PRODUCT_REVIEWS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_REVIEWS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProductReview = (update) => async (dispatch) => {
  dispatch({ type: PRODUCT_UPDATE_REVIEW_REQUEST, payload: update });
  try {
    const productId = update.product;
    const { data } = await Axios({
      method: "put",
      url: `/api/products/${productId}/review/update`,
      data: { avgRating: update.avgRating, numReviews: update.numReviews },
    });
    dispatch({ type: PRODUCT_UPDATE_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
