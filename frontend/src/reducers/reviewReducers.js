import {
  REIVEWS_VOTE_HELPFUL_FAIL,
  REIVEWS_VOTE_HELPFUL_REQUEST,
  REIVEWS_VOTE_HELPFUL_SUCCESS,
  REVIEWS_CREATE_FAIL,
  REVIEWS_CREATE_REQUEST,
  REVIEWS_CREATE_RESET,
  REVIEWS_CREATE_SUCCESS,
  REVIEWS_DELETE_FAIL,
  REVIEWS_DELETE_REQUEST,
  REVIEWS_DELETE_RESET,
  REVIEWS_DELETE_SUCCESS,
  REVIEWS_EDIT_FAIL,
  REVIEWS_EDIT_REQUEST,
  REVIEWS_EDIT_RESET,
  REVIEWS_EDIT_SUCCESS,
  REVIEWS_SEARCH_FAIL,
  REVIEWS_SEARCH_REQUEST,
  REVIEWS_SEARCH_SUCCESS,
  REVIEWS_UPDATE_FAIL,
  REVIEWS_UPDATE_REQUEST,
  REVIEWS_UPDATE_RESET,
  REVIEWS_UPDATE_SUCCESS,
} from "../constants/reviewConstants";

export const searchReviewsReducer = (
  state = { loading: true, reviews: [] },
  action
) => {
  switch (action.type) {
    case REVIEWS_SEARCH_REQUEST:
      return { loading: true };
    case REVIEWS_SEARCH_SUCCESS:
      return {
        loading: false,
        topPositive: action.payload.topPositive,
        topCritical: action.payload.topCritical,
        reviews: action.payload.reviews,
        page: action.payload.page,
        searchCount: action.payload.searchCount,
      };
    case REVIEWS_SEARCH_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const createReviewReducer = (
  state = { loading: true, review: {} },
  action
) => {
  switch (action.type) {
    case REVIEWS_CREATE_REQUEST:
      return { loading: true };
    case REVIEWS_CREATE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
        product: action.payload.product,
        newAvg: action.payload.newAvg,
        newNumReviews: action.payload.newNumReviews,
      };
    case REVIEWS_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case REVIEWS_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const editReviewReducer = (
  state = { loading: true, review: {} },
  action
) => {
  switch (action.type) {
    case REVIEWS_EDIT_REQUEST:
      return { loading: true };
    case REVIEWS_EDIT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
        review: action.payload.review,
        newAvg: action.payload.newAvg,
        newNumReviews: action.payload.newNumReviews,
      };
    case REVIEWS_EDIT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case REVIEWS_EDIT_RESET:
      return {};
    default:
      return state;
  }
};

export const voteHelpfulReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case REIVEWS_VOTE_HELPFUL_REQUEST:
      return { loading: true };
    case REIVEWS_VOTE_HELPFUL_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
        review: action.payload.review,
      };
    case REIVEWS_VOTE_HELPFUL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteReviewReducer = (
  state = { loading: true, review: {} },
  action
) => {
  switch (action.type) {
    case REVIEWS_DELETE_REQUEST:
      return { loading: true };
    case REVIEWS_DELETE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
        review: action.payload.review,
        newAvg: action.payload.newAvg,
        newNumReviews: action.payload.newNumReviews,
      };
    case REVIEWS_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case REVIEWS_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
