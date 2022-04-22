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

export const listReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        itemPerPage: action.payload.itemPerPage,
        totalPageNum: action.payload.totalPageNum,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listCategoriesReducer = (
  state = { loading: true, categories: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
      };
    case PRODUCT_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const detailsReducer = (
  state = { loading: true, product: {} },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const reviewsReducer = (
  state = { loading: true, reviews: {} },
  action
) => {
  switch (action.type) {
    case PRODUCT_REVIEWS_REQUEST:
      return { loading: true };
    case PRODUCT_REVIEWS_SUCCESS:
      return {
        loading: false,
        reviews: action.payload.reviews,
        distribution: action.payload.distribution,
      };
    case PRODUCT_REVIEWS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateReviewReducer = (
  state = { loading: true, message: {} },
  action
) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_REVIEW_SUCCESS:
      return {
        loading: false,
        message: action.payload.message,
      };
    case PRODUCT_UPDATE_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
