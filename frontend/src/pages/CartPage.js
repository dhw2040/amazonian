import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  addToCart,
  deleteFromCart,
  updateCartQuantity,
} from "../actions/cartActions";
import MessageBox from "../components/MessageBox";

export default function CartPage(props) {
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { id: productId } = param;

  const { search } = useLocation();
  const qtySearch = new URLSearchParams(search).get("qty");
  const qty = qtySearch ? Number(qtySearch) : 1;

  const cartState = useSelector((state) => state.cart);
  const { cartItems } = cartState;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  // Handler Functions

  const qtyHandler = (idx, q) => {
    dispatch(updateCartQuantity(idx, q));
  };

  const deleteFromCartHandler = (id) => {
    dispatch(deleteFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <div className="row top">
      <div className="col-3">
        <div className="card card-body">
          <div className="row bottom hr">
            <h1>Shopping Cart</h1>
            <span className="grey">price</span>
          </div>
          {cartItems.length === 0 ? (
            <MessageBox variants="danger">
              <h1>Your Amazonian cart is empty.</h1>{" "}
              <Link to="/">Go Shopping!</Link>
            </MessageBox>
          ) : (
            cartItems.map((item, idx) => (
              <div key={idx} className="row top hr">
                <div className="col-1">
                  <Link to={`/product/${item.product}`}>
                    <img className="sm" src={item.image} alt={item.name}></img>
                  </Link>
                </div>
                <div className="col-3">
                  <Link to={`/product/${item.product}`}>
                    <h2>{item.name}</h2>
                  </Link>
                  <ul className="no-list-style">
                    <li>
                      <small className="grey">
                        Ships from and sold by Amazonian
                      </small>
                    </li>
                    <li>
                      <small className="grey">Eligible for FREE Shipping</small>
                    </li>
                    <li>
                      <small className="success">
                        {item.stock > 0 ? "In Stock" : "Out of Stock"}
                      </small>
                    </li>
                    <li>
                      <label>Qty: </label>
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          qtyHandler(item.product, e.target.value)
                        }
                      >
                        {[...Array(Number(item.maxQty)).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                      <small
                        className="cart-button blue vr"
                        onClick={() => deleteFromCartHandler(item.product)}
                      >
                        Delete
                      </small>
                      <small className="cart-button blue vr">
                        Save for later
                      </small>
                      <small className="cart-button blue vr">
                        See more like this
                      </small>
                    </li>
                  </ul>
                </div>
                <div className="col-1">
                  <strong className="right">
                    <h2>$ {item.price}</h2>
                  </strong>
                </div>
              </div>
            ))
          )}
          <div className="row">
            <div></div>
            <big>
              Subtotal (
              {parseInt(
                cartItems.reduce((total, x) => total + x.qty, 0),
                10
              )}{" "}
              items):{" "}
              <strong>
                ${" "}
                {parseInt(
                  cartItems.reduce((total, x) => total + x.qty * x.price, 0),
                  10
                )}
              </strong>
            </big>
          </div>
        </div>
      </div>
      <div className="col-0">
        {cartItems.length !== 0 && (
          <div className="card card-body">
            <div>
              <i className="fa fa-lg fa-check-circle" aria-hidden="true"></i>
              <small>
                <span className="success">
                  Your order qualifies for FREE shipping (excludes remote
                  locations).
                </span>
                <span className="grey">Choose this option at checkout.</span>{" "}
                <Link to="https://www.amazon.ca/gp/help/customer/display.html?nodeId=GZXW7X6AKTHNUP6H&pop-up=1">
                  Details
                </Link>
              </small>
            </div>
            <div>
              <big>
                Subtotal (
                {parseInt(
                  cartItems.reduce((total, x) => total + x.qty, 0),
                  10
                )}{" "}
                items):{" "}
                <strong>
                  ${" "}
                  {parseInt(
                    cartItems.reduce((total, x) => total + x.qty * x.price, 0),
                    10
                  )}
                </strong>
              </big>
            </div>
            <div>
              <button onClick={checkoutHandler} className="block primary">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
        <div className="card card-body"></div>
      </div>
    </div>
  );
}
