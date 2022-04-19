import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { detailsProduct } from "../actions/productActions";
import { createReview } from "../actions/reviewActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function ReviewCreatePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const param = useParams();
  let { id: productId } = param;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userState = useSelector((state) => state.userSignIn);
  const { userInfo } = userState;

  const [rating, setRating] = useState();
  const [shadowVal, setShadowVal] = useState();
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!userInfo) {
      navigate(`/signin?redirect=/review/create-review/product/${productId}`);
    } else {
      dispatch(detailsProduct(productId));
    }
  }, [dispatch, navigate, userInfo, productId]);

  const submitReviewHandler = (e) => {
    e.preventDefault();
    dispatch(
      createReview({
        product: productId,
        title: title,
        rating: rating,
        content: comment,
        location: "Canada",
        isVerified: true,
      })
    );
    navigate(`/product/${productId}`);
  };

  return (
    <div>
      <div className="row sidepad hr">
        <h1 style={{ fontSize: "4rem", marginBottom: "2rem" }}>
          Create New Reviews
        </h1>
        <div className="grey mt-2">
          Your public name: <big>{userInfo && userInfo.name}</big>
          <br />
          <small className="cart-button blue">Would you like to change?</small>
        </div>
      </div>
      <div className="row top sidepad mt-2">
        <div className="col-1">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variants="danger">{error}</MessageBox>
          ) : (
            <div className="sm">
              <img src={product.image} alt={product.name} />
            </div>
          )}
        </div>
        <div className="col-3">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variants="danger">{error}</MessageBox>
          ) : (
            <div>
              <Link to={`/product/${productId}`}>{product.name}</Link>
              <br />
              {product.brand}
            </div>
          )}
          <div className="mb-3">
            <h1 className="mb-1">Overall Rating</h1>
            <span>
              <i
                className={
                  rating >= 1
                    ? `fa fa-star fa-3x orange`
                    : `fa fa-star-o fa-3x orange`
                }
                onClick={() => setRating(1)}
                onMouseOver={() => setShadowVal(1)}
                onMouseOut={() => setShadowVal(0)}
                style={
                  shadowVal >= 1
                    ? { cursor: "pointer", color: "#f19d0190" }
                    : {}
                }
              ></i>
            </span>
            <span>
              <i
                className={
                  rating >= 2
                    ? `fa fa-star fa-3x orange`
                    : `fa fa-star-o fa-3x orange`
                }
                onClick={() => setRating(2)}
                onMouseOver={() => setShadowVal(2)}
                onMouseOut={() => setShadowVal(0)}
                style={
                  shadowVal >= 2
                    ? { cursor: "pointer", color: "#f19d0190" }
                    : {}
                }
              ></i>
            </span>
            <span>
              <i
                className={
                  rating >= 3
                    ? `fa fa-star fa-3x orange`
                    : `fa fa-star-o fa-3x orange`
                }
                onClick={() => setRating(3)}
                onMouseOver={() => setShadowVal(3)}
                onMouseOut={() => setShadowVal(0)}
                style={
                  shadowVal >= 3
                    ? { cursor: "pointer", color: "#f19d0190" }
                    : {}
                }
              ></i>
            </span>
            <span>
              <i
                className={
                  rating >= 4
                    ? `fa fa-star fa-3x orange`
                    : `fa fa-star-o fa-3x orange`
                }
                onClick={() => setRating(4)}
                onMouseOver={() => setShadowVal(4)}
                onMouseOut={() => setShadowVal(0)}
                style={
                  shadowVal >= 4
                    ? { cursor: "pointer", color: "#f19d0190" }
                    : {}
                }
              ></i>
            </span>
            <span>
              <i
                className={
                  rating >= 5
                    ? `fa fa-star fa-3x orange`
                    : `fa fa-star-o fa-3x orange`
                }
                onClick={() => setRating(5)}
                onMouseOver={() => setShadowVal(5)}
                onMouseOut={() => setShadowVal(0)}
                style={
                  shadowVal >= 5
                    ? { cursor: "pointer", color: "#f19d0190" }
                    : {}
                }
              ></i>
            </span>
          </div>
          <div className="mb-3">
            <div>
              <label htmlFor="title">Add a headline</label>
            </div>
            <input
              id="title"
              className="title"
              type="text"
              placeholder="Add a headline"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <div>
              <label htmlFor="comments">Write your review</label>
            </div>
            <textarea
              id="comments"
              rows="10"
              cols="100"
              placeholder="Add comments"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button
              className="submitReview"
              onClick={(e) => submitReviewHandler(e)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
