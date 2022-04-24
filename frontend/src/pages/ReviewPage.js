import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  detailsProduct,
  listReviews,
  updateProductReview,
} from "../actions/productActions";
import { deleteReview, searchReviews } from "../actions/reviewActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { generateRefineURL } from "../utils";

export default function ReviewPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const param = useParams();
  const {
    id: productId,
    sortOrder = "top",
    verifiedFilter = false,
    ratingFilter = "all",
    page = 1,
  } = param;

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

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

  const reviewsSearch = useSelector((state) => state.reviewsSearch);
  const {
    loading: loadingSearchReviews,
    error: errorSearchReviews,
    topPositive,
    topCritical,
    reviews,
    searchCount,
  } = reviewsSearch;

  // Review Delete & Update Product Rating
  const reviewDelete = useSelector((state) => state.reviewDelete);
  const {
    error: errorDeleteReview,
    success: successDeleteReview,
    message: messageDeleteReview,
    newAvg: newAvgDeleteReview,
    newNumReviews: newNumDeleteReview,
  } = reviewDelete;

  const filterByString =
    sortOrder === "recent" &&
    "Recent reviews " + verifiedFilter &&
    "Verified purchase only " + ratingFilter !== "all"
      ? ratingFilter !== "Positive" && ratingFilter !== "Critical"
        ? ratingFilter + " star only"
        : ratingFilter
      : "";

  const helpfulHandler = () => {};

  const writeReviewHandler = (e) => {
    e.preventDefault();
    navigate(`/review/create-review/product/${productId}`);
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

  const generateRefineURL = (refineField) => {
    const refineSortOrder = refineField.sortOrder || sortOrder;
    const refineVerifiedFilter = refineField.verifiedFilter || verifiedFilter;
    const refineRatingFilter = refineField.ratingFilter || ratingFilter;

    return `/review/product/${productId}/sort/${refineSortOrder}/verified/${refineVerifiedFilter}/rating/${refineRatingFilter}`;
  };

  useEffect(() => {
    if (successDeleteReview) {
      if (newAvgDeleteReview !== null && newNumDeleteReview !== null) {
        dispatch(
          updateProductReview({
            product: productId,
            avgRating: newAvgDeleteReview,
            numReviews: newNumDeleteReview,
          })
        );
      }
    }
    dispatch(detailsProduct(productId));
    dispatch(listReviews(productId));
    dispatch(
      searchReviews({
        productId,
        sortOrder,
        verifiedFilter,
        ratingFilter,
        page,
      })
    );
  }, [
    dispatch,
    newAvgDeleteReview,
    newNumDeleteReview,
    productId,
    ratingFilter,
    sortOrder,
    successDeleteReview,
    verifiedFilter,
    page,
  ]);

  return (
    <div>
      <div className="row top hr">
        <div className="col-sm mb-3 ml-2">
          <h1 className="mb-1">Customer reviews</h1>
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
          <div>
            <button className="review" onClick={(e) => writeReviewHandler(e)}>
              Write a customer review
            </button>
          </div>
        </div>
        <div className="col-3">
          <div className="row top">
            {loadingProduct ? (
              <LoadingBox></LoadingBox>
            ) : errorProduct ? (
              <MessageBox variants="danger">{errorProduct}</MessageBox>
            ) : (
              <>
                <div className="col-xs">
                  <Link to={`/product/${product._id}`}>
                    <div className="xs mt-2">
                      <img src={product.image} alt={product.name}></img>
                    </div>
                  </Link>
                </div>
                <div className="col-3 ml-2">
                  <div>
                    <Link to={`/product/${product._id}`}>
                      <big>
                        <h1>{product.name}</h1>
                      </big>
                    </Link>
                  </div>

                  <span>by {product.brand}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="row top">
        <div className="col-4">
          <div className="row top hr">
            {loadingSearchReviews ? (
              <LoadingBox></LoadingBox>
            ) : errorSearchReviews ? (
              <MessageBox variants="danger">{errorSearchReviews}</MessageBox>
            ) : (
              <>
                <div className="col-1 ml-2">
                  <h1>Top positive review</h1>
                  <div>
                    <Link to="#">
                      <small>All positive reviews</small>
                    </Link>
                  </div>
                  {topPositive && (
                    <div>
                      <ul className="no-list-style">
                        <li className="mb-3">
                          {topPositive.user && topPositive.user.name ? (
                            <>
                              <i
                                src={topPositive.user.img}
                                alt="r.user.name"
                              ></i>
                              <span>{topPositive.user.name}</span>
                            </>
                          ) : (
                            "Anonymous User"
                          )}
                        </li>
                        <li>
                          <Rating
                            rating={topPositive.rating}
                            color="orange"
                          ></Rating>
                          <h3>
                            <Link
                              to={`/review/${topPositive._id}?product=${productId}`}
                            >
                              {topPositive.title}
                            </Link>
                          </h3>
                        </li>
                        <li>
                          <small className="grey">
                            Reviewed in {topPositive.location}
                          </small>
                        </li>
                        {topPositive.user && topPositive.isVerified && (
                          <li>
                            <span
                              className="price"
                              style={{ fontSize: "1.5rem" }}
                            >
                              Verified Purchase
                            </span>
                          </li>
                        )}
                        <li>
                          <p>
                            <big>{topPositive.content}</big>
                          </p>
                        </li>
                        {topPositive.helpful &&
                          topPositive.helpful.count !== 0 && (
                            <li>
                              <small className="grey">
                                {topPositive.helpful.count} people found this
                                helpful
                              </small>
                            </li>
                          )}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="col-1">
                  <h1>Top critical review</h1>
                  <div>
                    <Link to="#">
                      <small>All critical reviews</small>
                    </Link>
                  </div>
                  {topCritical && (
                    <div>
                      <ul className="no-list-style">
                        <li className="mb-3">
                          {topCritical.user && topCritical.user.name ? (
                            <>
                              <i
                                src={topCritical.user.img}
                                alt="r.user.name"
                              ></i>
                              <span>{topCritical.user.name}</span>
                            </>
                          ) : (
                            "Anonymous User"
                          )}
                        </li>
                        <li>
                          <Rating
                            rating={topCritical.rating}
                            color="orange"
                          ></Rating>
                          <h3>
                            <Link
                              to={`/review/${topCritical._id}?product=${productId}`}
                            >
                              {topCritical.title}
                            </Link>
                          </h3>
                        </li>
                        <li>
                          <small className="grey">
                            Reviewed in {topCritical.location}
                          </small>
                        </li>
                        {topCritical.user && topCritical.isVerified && (
                          <li>
                            <span
                              className="price"
                              style={{ fontSize: "1.5rem" }}
                            >
                              Verified Purchase
                            </span>
                          </li>
                        )}
                        <li>
                          <p>
                            <big>{topCritical.content}</big>
                          </p>
                        </li>
                        {topCritical.helpful &&
                          topCritical.helpful.count !== 0 && (
                            <li>
                              <small className="grey">
                                {topCritical.helpful.count} people found this
                                helpful
                              </small>
                            </li>
                          )}
                      </ul>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="row top flex-start hr">
            <div className="col-100 ml-2 mt-2 mb-2">
              <div>
                <form className="review">
                  <i className="fa fa-search"></i>
                  <input
                    className="review"
                    type="text"
                    name="review"
                    id="reviewInput"
                    placeholder="Search customer reviews"
                  ></input>
                  <button className="reviewSearch" type="submit">
                    Search
                  </button>
                </form>
              </div>
              <div>
                <table className="review">
                  <thead>
                    <tr>
                      <th>
                        <small>SORT BY</small>
                      </th>
                      <th className="filter">
                        <small>FILTER BY</small>
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <select
                          className="review sort"
                          onChange={(e) => {
                            navigate(
                              generateRefineURL({ sortOrder: e.target.value })
                            );
                          }}
                        >
                          <option value="top">Top reviews</option>
                          <option value="recent">Most recent</option>
                        </select>
                      </td>
                      <td className="filter">
                        <select
                          className="review"
                          onChange={(e) => {
                            navigate(
                              generateRefineURL({
                                verifiedFilter: e.target.value,
                              })
                            );
                          }}
                        >
                          <option value={false}>All reviewers</option>
                          <option value={true}>Verified purchase only</option>
                        </select>
                      </td>
                      <td className="filter">
                        <select
                          className="review"
                          onChange={(e) => {
                            navigate(
                              generateRefineURL({
                                ratingFilter: e.target.value,
                              })
                            );
                          }}
                        >
                          <option value="all">All stars</option>
                          <option value="5">5 star only</option>
                          <option value="4">4 star only</option>
                          <option value="3">3 star only</option>
                          <option value="2">2 star only</option>
                          <option value="1">1 star only</option>
                          <option disabled role="separator"></option>
                          <option value="Positive">All positive</option>
                          <option value="Critical">All critical</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong className="dark-grey">FILTERED BY</strong>
                      </td>
                      <td></td>
                    </tr>
                    {filterByString.length > 0 && (
                      <tr>
                        <td>
                          <strong>{filterByString}</strong>
                          <Link to="#">
                            <small> Clear filter</small>
                          </Link>
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td>{searchCount} global ratings | reviews</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="row top hr">
            <div className="col-100">
              <h1>From Canada</h1>
              <div>
                {loadingSearchReviews ? (
                  <LoadingBox></LoadingBox>
                ) : errorSearchReviews ? (
                  <MessageBox variants="danger">
                    {errorSearchReviews}
                  </MessageBox>
                ) : reviews.length === 0 ? (
                  <h1>There is no review that matches your criteria.</h1>
                ) : (
                  reviews.map((r) => (
                    <div key={r.title} className="mb-3">
                      <ul className="no-list-style">
                        <li className="mb-3">
                          {r.user && r.user.name ? (
                            <>
                              <i src={r.user.img} alt="r.user.name"></i>
                              <span>{r.user.name}</span>
                            </>
                          ) : (
                            "Anonymous User"
                          )}
                        </li>
                        <li>
                          <Rating rating={r.rating} color="orange"></Rating>
                          <h3>
                            <Link to={`/review/${r._id}?product=${productId}`}>
                              {r.title}
                            </Link>
                          </h3>
                        </li>
                        <li>
                          <small className="grey">
                            Reviewed in {r.location}
                          </small>
                        </li>
                        {r.user && r.isVerified && (
                          <li>
                            <span
                              className="price"
                              style={{ fontSize: "1.5rem" }}
                            >
                              Verified Purchase
                            </span>
                          </li>
                        )}
                        <li>
                          <p>
                            <big>{r.content}</big>
                          </p>
                        </li>
                        {r.helpful && r.helpful.count !== 0 && (
                          <li>
                            <small className="grey">
                              {r.helpful.count} people found this helpful
                            </small>
                          </li>
                        )}
                        <li>
                          {userInfo && r.user === userInfo._id ? (
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
                            <>
                              <button
                                className="review helpful"
                                onClick={helpfulHandler}
                              >
                                Helpful
                              </button>
                              <button className="review report vr">
                                Report Abuse
                              </button>
                            </>
                          )}
                        </li>
                      </ul>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-1 mr-2">
          <h2>Questions? Get fast answers from reviewers</h2>
          <form id="question">
            <textarea
              rows="3"
              cols="35"
              name="comment"
              form="question"
            ></textarea>
            <div>
              <Link className="question" to={`/question/product/${productId}`}>
                <small>See all questions</small>
              </Link>
              <button className="review ask" type="submit">
                Ask
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
