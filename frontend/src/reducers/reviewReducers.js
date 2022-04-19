import {
  REVIEWS_CREATE_FAIL,
  REVIEWS_CREATE_REQUEST,
  REVIEWS_CREATE_SUCCESS,
} from "../constants/reviewConstants";

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
        review: action.payload.review,
        message: action.payload.message,
        avgRating: action.payload.avgRating,
        numReviews: action.payload.numReviews,
      };
    case REVIEWS_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
