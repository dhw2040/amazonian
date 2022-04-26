import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { detailsProduct, listReviews } from "../actions/productActions";
import {
  deleteReview,
  listReviewDetails,
  voteHelpful,
} from "../actions/reviewActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";

export default function ReviewCustomerPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const param = useParams();
  const { reviewId, productId } = param;

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const reviewDetails = useSelector((state) => state.reviewDetails);
  const { loading: loadingReview, error: errorReview, review } = reviewDetails;

  const productDetails = useSelector((state) => state.productDetails);
  const {
    loading: loadingProduct,
    error: errorProduct,
    product,
  } = productDetails;

  const productReviews = useSelector((state) => state.productReviews);
  const {
    loading: loadingProductReviews,
    error: errorProductReviews,
    distribution,
  } = productReviews;

  const reviewVote = useSelector((state) => state.reviewVote);
  const {
    error: errorReviewVote,
    success: successReviewVote,
    message: messageReviewVote,
    review: votedReview,
  } = reviewVote;

  const helpfulHandler = (e, review) => {
    e.preventDefault();
    let returnVal = window.confirm(
      "Would you like to vote helpful for this review?"
    );
    if (returnVal) {
      dispatch(voteHelpful(review));
    }
  };

  const editReviewHandler = (e) => {
    e.preventDefault();
    navigate(`/review/create-review/product/${productId}/?mode=edit`);
  };

  const deleteReviewHandler = (e) => {
    e.preventDefault();
    let returnVal = window.confirm(
      "Are you sure you want to delete your review?"
    );
    if (returnVal) {
      dispatch(deleteReview(productId));
    }
  };

  useEffect(() => {
    dispatch(listReviewDetails(reviewId));
    dispatch(detailsProduct(productId));
    dispatch(listReviews(productId));
  }, [dispatch, productId, reviewId]);

  return (
    <div>
      <div className="row top hr">
        <div className="col-3 ml-2">
          <h1 style={{ fontSize: "4rem" }}>Customer Review</h1>
          {loadingReview ? (
            <LoadingBox></LoadingBox>
          ) : errorReview ? (
            <MessageBox variants="danger"></MessageBox>
          ) : (
            <div>
              <ul className="review no-list-style">
                <li className="mb-3">
                  {review.user && review.user.name ? (
                    <>
                      <i src={review.user.img} alt="r.user.name"></i>
                      <span>{review.user.name}</span>
                    </>
                  ) : (
                    "Anonymous User"
                  )}
                </li>
                <li>
                  <Rating
                    rating={review.rating}
                    color="orange"
                    inline={true}
                  ></Rating>
                  <h2>
                    <Link to={`/review/${review._id}/product/${productId}`}>
                      {review.title}
                    </Link>
                  </h2>
                </li>
                <li>
                  <small className="grey">Reviewed in {review.location}</small>
                </li>
                {review.user && review.isVerified && (
                  <li>
                    <span className="price" style={{ fontSize: "1.5rem" }}>
                      Verified Purchase
                    </span>
                  </li>
                )}
                <li>
                  <p>{review.content}</p>
                </li>
                {review.helpful && review.helpful.length > 0 && (
                  <li>
                    <small className="grey">
                      {review.helpful.length} people found this helpful
                    </small>
                  </li>
                )}
                <li>
                  {userInfo && review.user === userInfo._id ? (
                    <>
                      <button
                        className="review helpful"
                        onClick={(e) => editReviewHandler(e)}
                      >
                        Edit
                      </button>
                      <button
                        className="review helpful vr"
                        onClick={(e) => deleteReviewHandler(e)}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <div className="row flex-start">
                      {!votedReview || votedReview._id !== review._id ? (
                        <button
                          className="review helpful"
                          onClick={(e) => helpfulHandler(e, review)}
                        >
                          Helpful
                        </button>
                      ) : errorReviewVote ? (
                        <MessageBox variants="danger">
                          {errorReviewVote}
                        </MessageBox>
                      ) : (
                        successReviewVote && (
                          <MessageBox variants="helpful">
                            {messageReviewVote}
                          </MessageBox>
                        )
                      )}
                      <button className="review report vr">Report Abuse</button>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="col-sm">
          <h1 className="mb-1">Product details</h1>
          {loadingProduct ? (
            <LoadingBox></LoadingBox>
          ) : errorProduct ? (
            <MessageBox variants="danger">{errorProduct}</MessageBox>
          ) : (
            <div className="row top">
              <div className="col-xs mr-1 ">
                <Link to={`/product/${product._id}`}>
                  <div className="xs">
                    <img src={product.image} alt={product.name}></img>
                  </div>
                </Link>
              </div>
              <div className="col-2">
                <Link to={`/product/${product._id}`}>
                  {product.name.substring(0, 30)}...
                </Link>
                <div> by {product.brand}</div>
              </div>
            </div>
          )}
          <div>
            {loadingProduct ? (
              <LoadingBox></LoadingBox>
            ) : errorProduct ? (
              <MessageBox>{errorProduct}</MessageBox>
            ) : loadingProductReviews ? (
              <LoadingBox></LoadingBox>
            ) : errorProductReviews ? (
              <MessageBox>{errorProductReviews}</MessageBox>
            ) : (
              <Rating
                rating={product.avgRating}
                numReviews={product.numReviews}
                label={`out of 5`}
                size="lg"
                color="orange"
                bar={true}
                distribution={distribution ? distribution : [0, 0, 0, 0, 0]}
                productId={productId}
              ></Rating>
            )}
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
}
