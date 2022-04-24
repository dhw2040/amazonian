import React, { useEffect, useRef, useState } from "react";
import Rating from "../components/Rating";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  detailsProduct,
  listReviews,
  updateProductReview,
} from "../actions/productActions";
import { deleteReview } from "../actions/reviewActions";
import { REVIEWS_DELETE_RESET } from "../constants/reviewConstants";

export default function ProductPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const param = useParams();
  let { id: productId } = param;
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  // Product Details & Reviews
  const productDetails = useSelector((state) => state.productDetails);
  const {
    loading: loadingProduct,
    error: errorProduct,
    product,
  } = productDetails;

  const productReviews = useSelector((state) => state.productReviews);
  const {
    loading: loadingReviews,
    error: errorReviews,
    reviews,
    distribution,
  } = productReviews;

  // Review Delete & Update Product Rating
  const reviewDelete = useSelector((state) => state.reviewDelete);
  const {
    error: errorDeleteReview,
    success: successDeleteReview,
    message: messageDeleteReview,
    newAvg: newAvgDeleteReview,
    newNumReviews: newNumDeleteReview,
  } = reviewDelete;

  // Use State Hook
  const [qty, setQty] = useState(1);

  // Handler
  const addToCartHandler = () => {
    navigate(`/cart/${productId}?qty=${qty}`);
  };

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

  // Window function for image animation on scroll
  // const ref = useRef(null);
  // const topPos = ref.current.getBoundingClientRect().top;

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
  }, [
    dispatch,
    newAvgDeleteReview,
    newNumDeleteReview,
    productId,
    successDeleteReview,
  ]);

  return (
    <div>
      {loadingProduct ? (
        <LoadingBox></LoadingBox>
      ) : errorProduct ? (
        // content of messsage box has children {error} available to MB.js
        <MessageBox variants="danger">{errorProduct}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back to Result</Link>

          <div className="row top center hr">
            <div className="col-100">
              {errorDeleteReview ? (
                <MessageBox variants="danger">{errorDeleteReview}</MessageBox>
              ) : (
                successDeleteReview && (
                  <MessageBox variants="success">
                    {messageDeleteReview}
                  </MessageBox>
                )
              )}
            </div>
            <div className="col-2">
              <div className="xl">
                <img src={product.image} alt={product.name} />
              </div>
            </div>
            <div className="col-2 ml-2">
              <div className="row hr">
                <ul className="no-list-style">
                  <li>
                    <h1>{product.name}</h1>
                  </li>
                  <li>
                    <Rating
                      rating={product.avgRating}
                      numReviews={product.numReviews}
                      color="orange"
                    ></Rating>
                  </li>
                </ul>
              </div>
              <div className="row hr">
                <ul className="no-list-style">
                  <li>
                    <span className="grey">List Price: </span>
                    <span className="price">${product.price}</span>
                  </li>
                  <li>
                    <span className="grey">Deal Price: </span>
                    <span className="price">${product.price}</span>
                  </li>
                  <li>
                    <strong>FREE Delivery </strong> on your first order.
                  </li>
                </ul>
              </div>
              <div className="row hr">
                <ul>
                  <h2>About this item</h2>
                  {product.description.map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-sm ml-2">
              <div className="card card-body">
                <div className="row hr">
                  <ul className="no-list-style mb-3">
                    <li>
                      <div className="price">${product.price}</div>
                    </li>
                    <li>
                      <div>
                        <a href="https://www.amazon.ca/b?node=19195852011">
                          FREE delivery
                        </a>
                        <strong> Saturday, March 26</strong> on your first
                        order.
                      </div>
                    </li>
                    <li>
                      <div>
                        Or fastest delivery <strong>Tomorrow, March 22.</strong>
                        Order within 16 hrs 7 mins.
                      </div>
                    </li>
                    <li>
                      <span>
                        <i className="fa fa-map-o" aria-hidden="true"></i>
                      </span>
                      <a href="/location"> Select delivery location</a>
                    </li>
                    <li>
                      {product.stock > 0 ? (
                        <h2 className="success">In Stock.</h2>
                      ) : (
                        <h2 className="danger">Out of Stock.</h2>
                      )}
                    </li>

                    {product.stock > 0 && (
                      <li>
                        <div>
                          Quantity:
                          <span>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(Number(product.maxQty)).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </span>
                        </div>
                      </li>
                    )}
                    {product.stock > 0 && (
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary cart"
                        >
                          Add to Cart
                        </button>

                        <button className="buy cart">Buy Now</button>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row top center hr mt-2">
            <div className="col-1 mb-3">
              <h1 className="mb-1">Customer reviews</h1>
              <div>
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
              </div>
              <hr />
              <div>
                <div>
                  <h2 className="mb-1">Review this product</h2>
                </div>
                <p>Share your thoughts with other customers</p>
                <button
                  className="review"
                  onClick={(e) => writeReviewHandler(e)}
                >
                  Write a customer review
                </button>
              </div>
            </div>
            <div className="col-3 mb-3">
              <h2 className="mb-1">Top reviews from Canada</h2>
              <div>
                {loadingReviews ? (
                  <LoadingBox></LoadingBox>
                ) : errorReviews ? (
                  <MessageBox variants="danger">{errorReviews}</MessageBox>
                ) : reviews.length === 0 ? (
                  <h1>There is no review for this product.</h1>
                ) : (
                  reviews.map((r) => (
                    <div key={r.title}>
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
                      <hr />
                      <div className="ml-2">
                        <Link to={`/review/product/${productId}`}>
                          <b>See all reviews</b>
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
