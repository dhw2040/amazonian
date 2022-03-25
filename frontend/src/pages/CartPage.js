import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { addToCart, updateCartQuantity } from "../actions/cartActions";

export default function CartPage(props) {
  const param = useParams();
  const dispatch = useDispatch();

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

  const qtyHandler = (idx, q) => {
    dispatch(updateCartQuantity(idx, q));
  };

  const checkoutHandler = () => {};

  return (
    <div className="row top">
      <div className="col-3">
        <div className="card">
          <div className="row bottom hr">
            <h1>Shopping Cart</h1>
            <span className="grey">price</span>
          </div>
          {cartItems.map((item, idx) => (
            <div key={idx} className="row top hr">
              <div className="col-1">
                <Link to={`/product/${item.product}`}>
                  <img className="md" src={item.image} alt={item.name}></img>
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
                    <label>Qty: </label>
                    <select
                      value={item.qty}
                      onChange={(e) => qtyHandler(item.product, e.target.value)}
                    >
                      {[...Array(Number(item.maxQty)).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </li>
                </ul>
              </div>
              <div className="col-1">
                <strong className="right">
                  <h2>$ {item.price}</h2>
                </strong>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-1">
        <div className="card">
          <div>
            Your order qualifies for FREE shipping (excludes remote locations).
            Choose this option at checkout. Details
          </div>
          <div>
            <button onClick={checkoutHandler} className="block primary">
              Proceed to Checkout
            </button>
          </div>
        </div>
        <div className="card">
          <div>
            Your order qualifies for FREE shipping (excludes remote locations).
            Choose this option at checkout. Details
          </div>
          <div>
            <button onClick={checkoutHandler} className="block primary">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
