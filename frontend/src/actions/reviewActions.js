import Axios from "axios";
import {
  REVIEWS_CREATE_FAIL,
  REVIEWS_CREATE_REQUEST,
  REVIEWS_CREATE_SUCCESS,
} from "../constants/reviewConstants";

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
