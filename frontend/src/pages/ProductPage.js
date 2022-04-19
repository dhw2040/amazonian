import React, { useEffect, useState } from "react";
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

export default function ProductPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const param = useParams();
  let { id: productId } = param;
  const productDetails = useSelector((state) => state.productDetails);
  const productReviews = useSelector((state) => state.productReviews);
  const reviewCreate = useSelector((state) => state.reviewCreate);
  const {
    loading: loadingProduct,
    error: errorProduct,
    product,
  } = productDetails;

  const {
    loading: loadingReviews,
    error: errorReviews,
    reviews,
    numReviews,
    avgRating,
  } = productReviews;

  const {
    error: errorCreate,
    avgRating: avgRatingCreate,
    numReviews: numReviewsCreate,
    message: messageCreate,
  } = reviewCreate;

  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    navigate(`/cart/${productId}?qty=${qty}`);
  };

  const helpfulHandler = () => {};

  const writeReviewHandler = () => {
    navigate(`/review/create-review/product/${productId}`);
  };

  useEffect(() => {
    if (reviewCreate) {
      dispatch(
        updateProductReview({
          product: productId,
          avgRating: avgRatingCreate,
          numReviews: numReviewsCreate,
        })
      );
    }
    dispatch(detailsProduct(productId));
    dispatch(listReviews(productId));
  }, [dispatch, productId, reviewCreate, avgRatingCreate, numReviewsCreate]);

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
                    <Rating rating={avgRating} numReviews={numReviews}></Rating>
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
                  rating={product.rating}
                  numReviews={product.numReviews}
                  label={`out of 5`}
                  size="lg"
                  color="orange"
                  bar={true}
                  percentages={["56", "32", "18", "3", "1"]}
                  productId={productId}
                ></Rating>
              </div>
              <hr />
              <div>
                <div>
                  <h2 className="mb-1">Review this product</h2>
                </div>
                <p>Share your thoughts with other customers</p>
                <button className="review" onClick={writeReviewHandler}>
                  Write a customer review
                </button>
              </div>
            </div>
            <div className="col-3 mb-3">
              <h2 className="mb-1">Top reviews from Canada</h2>
              <div>
                {errorCreate ? (
                  <MessageBox variants="danger">{errorCreate}</MessageBox>
                ) : (
                  messageCreate && (
                    <MessageBox variants="success">{messageCreate}</MessageBox>
                  )
                )}
                {loadingReviews ? (
                  <LoadingBox></LoadingBox>
                ) : errorReviews ? (
                  <MessageBox variants="danger">{errorReviews}</MessageBox>
                ) : reviews.length === 0 ? (
                  <h1>There is no review for this product.</h1>
                ) : (
                  reviews.map((r) => (
                    <ul key={r.title} className="no-list-style">
                      <li className="mb-3">
                        {r.user ? (
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
                        <Link to={`/review/${r._id}?product=${productId}`}>
                          {r.title}
                        </Link>
                      </li>
                      <li>
                        <small className="grey">Reviewed in {r.location}</small>
                      </li>
                      {r.user && r.isVerified && (
                        <li>
                          <small className="price">Verified Purchase</small>
                        </li>
                      )}
                      <li>
                        <p>{r.content}</p>
                      </li>
                      {r.helpful && r.helpful.count !== 0 && (
                        <li>
                          <small className="grey">
                            {r.helpful.count} people found this helpful
                          </small>
                        </li>
                      )}
                      <li>
                        <button
                          className="review helpful"
                          onClick={helpfulHandler}
                        >
                          Helpful
                        </button>
                        <small className="cart-button blue vr ml-3">
                          Report abuse
                        </small>
                      </li>
                    </ul>
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
