import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { deleteFromCart, updateCartQuantity } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";
import ProgressBar from "../components/ProgressBar";

export default function OrderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userState = useSelector((state) => state.userSignIn);
  const { userInfo } = userState;
  const cartState = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cartState;

  const [saveShippingPaymentInfo, setSaveShippingPaymentInfo] = useState(0);
  const [code, setCode] = useState("");
  const [deliveryOptions, setDeliveryOptions] = useState({
    price: 6.99,
    date: "Apr. 10, 2022",
  });

  const toNum = (n) => Number(Number(n).toFixed(2));

  cartState.subtotal = toNum(
    cartItems.reduce((total, x) => total + x.qty * x.price, 0)
  );
  cartState.total = cartState.subtotal + toNum(deliveryOptions.price);
  cartState.tax = toNum(cartState.total * 0.13);
  cartState.final = toNum(cartState.total + cartState.tax);

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [navigate, userInfo]);

  const qtyHandler = (idx, q) => {
    dispatch(updateCartQuantity(idx, q));
  };

  const deleteFromCartHandler = (id) => {
    dispatch(deleteFromCart(id));
  };

  const applyCodeHandler = () => {};

  const placeOrderHandler = () => {};

  return (
    <div>
      <ProgressBar p1 p2 p3 p4="active"></ProgressBar>
      <div className="row top center">
        <h1>Review your order</h1>
        <div className="row top">
          <div className="col-3">
            <div className="card card-body info">
              <div className="row top">
                <div className="col-xs">
                  <span>
                    <i
                      className="fa fa-info-circle fa-3x"
                      aria-hidden="true"
                    ></i>
                  </span>
                </div>
                <div className="col-3">
                  <big>
                    Want to save time on your next order and go directly to this
                    step when checking out?
                  </big>
                  <div>
                    <input
                      type="checkbox"
                      id="saveShippingPaymentInfo"
                      name="saveShippingPaymentInfo"
                      value={saveShippingPaymentInfo}
                      onChange={(e) => {
                        setSaveShippingPaymentInfo(1);
                      }}
                    ></input>
                    <label
                      className="dark-grey"
                      htmlFor="saveShippingPaymentInfo"
                    >
                      Check this box to default to these delivery and payment
                      options in the future.
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="card card-body">
              <div className="row top">
                <div className="col-1">
                  <span>
                    <h2>Shipping address</h2>
                    <small className="blue ml-2">Change</small>
                  </span>
                  <div>
                    {shippingAddress && (
                      <ul className="no-list-style">
                        <li>
                          <strong>{shippingAddress.fullName}</strong>
                        </li>
                        <li>
                          <span>
                            {shippingAddress.address1},{" "}
                            <i>Unit #: {shippingAddress.address2}</i>
                          </span>
                        </li>
                        <li>
                          {shippingAddress.city}, {shippingAddress.postalCode}.
                        </li>
                        <li>{shippingAddress.country}</li>
                      </ul>
                    )}
                  </div>
                </div>
                <div className="col-1">
                  <div>
                    <h2>Payment method </h2>
                    <small className="blue ml-2">Change</small>
                    <div>{paymentMethod}</div>
                  </div>
                  <div>
                    <h2>Billing address </h2>
                    <small className="blue ml-2">Change</small>
                    <div>
                      {shippingAddress && (
                        <ul className="no-list-style">
                          <li>
                            <strong>{shippingAddress.fullName}</strong>
                          </li>
                          <li>
                            <span>
                              {shippingAddress.address1},{" "}
                              <i>Unit #: {shippingAddress.address2}</i>
                            </span>
                          </li>
                          <li>
                            {shippingAddress.city}, {shippingAddress.postalCode}
                            .
                          </li>
                          <li>{shippingAddress.country}</li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div>
                    <h2>Gift cards & promotional codes </h2>
                  </div>
                  <form id="form" type="submit">
                    <input
                      id="code"
                      type="text"
                      value={code}
                      placeholder="Enter code"
                      name="code"
                      onChange={(e) => setCode(e.target.value)}
                    ></input>
                    <button onClick={applyCodeHandler}>Apply</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="card card-body">
              <h2 className="green">
                Estimated delivery: {deliveryOptions.date}
              </h2>
              <span className="grey">If you order in the next 30 minutes</span>
              <div>
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
                          <img
                            className="sm"
                            src={item.image}
                            alt={item.name}
                          ></img>
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
                            <small className="grey">
                              Eligible for FREE Shipping
                            </small>
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
                              {[...Array(Number(item.maxQty)).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                            <small
                              className="cart-button blue vr"
                              onClick={() =>
                                deleteFromCartHandler(item.product)
                              }
                            >
                              Delete
                            </small>
                            <small className="cart-button blue vr">
                              Save for later
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
              </div>
            </div>
          </div>
          <div className="col-1">
            <div className="card card-body">
              <button className="block primary" onClick={placeOrderHandler}>
                Place your Order
              </button>
              <div className="content-center">
                <small>
                  By placing your order, you agree to Amazonian's{" "}
                  <Link to="https://www.amazon.com/gp/help/customer/display.html?nodeId=508088">
                    Conditions of Use
                  </Link>{" "}
                  and{" "}
                  <Link to="https://www.amazon.com/gp/help/customer/display.html?nodeId=468496">
                    Privacy Notice.
                  </Link>{" "}
                </small>
              </div>
              <div>
                <ul className="no-list-style">
                  <li>
                    <strong>Order summary</strong>
                  </li>
                  <li className="row">
                    <div>
                      Items (
                      {parseInt(
                        cartItems.reduce((total, x) => total + x.qty, 0),
                        10
                      )}
                      ):
                    </div>
                    <div>${cartState.subtotal}</div>
                  </li>
                  <li className="row">
                    <div>Shipping & Handling:</div>
                    <div>{deliveryOptions.price}</div>
                  </li>
                  <hr />
                  <li className="row">
                    <div>Total before tax:</div>
                    <div>{cartState.total}</div>
                  </li>
                  <li className="row">
                    <div>Estimated tax (GST & HST): </div>
                    <div>{cartState.tax}</div>
                  </li>
                  <hr />
                  <li className="row">
                    <div className="dark-red">Order total:</div>
                    <div className="dark-red">{cartState.final}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
