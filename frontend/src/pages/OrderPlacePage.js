import Axios from "axios";
// import Stripe from "stripe";
// import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { addDays, options, toNum } from "../utils";
import { deleteFromCart, updateCartQuantity } from "../actions/cartActions";
import { createOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ProgressBar from "../components/ProgressBar";
import { ORDER_CREATE_RESET } from "../constants/orderConstats";

export default function OrderPlacePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/placeorder");
    } else if (!paymentMethod) {
      navigate("/payment");
    }
    // enablePaypalScript();

    if (success) {
      navigate(`/order/${order._id}/pay`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [navigate, dispatch, userInfo, paymentMethod, success, order]);

  const [saveShippingPaymentInfo, setSaveShippingPaymentInfo] = useState(0);
  const [code, setCode] = useState("");
  const [deliveryOptions, setDeliveryOptions] = useState({
    price: options[0].price,
    date: options[0].date,
  });

  cart.itemSubtotal = toNum(
    cartItems.reduce((total, x) => total + x.qty * x.price, 0)
  );
  cart.shippingPrice = cart.itemSubtotal > 0 ? toNum(deliveryOptions.price) : 0;
  cart.total = toNum(cart.itemSubtotal + cart.shippingPrice);
  cart.tax = toNum(cart.total * 0.13);
  cart.final = toNum(cart.total + cart.tax);
  cart.expectedDelivery = new Date(deliveryOptions.date);
  cart.eligibleReturnDate = new Date(addDays(30));

  // Handler Functions
  const qtyHandler = (idx, q) => {
    dispatch(updateCartQuantity(idx, q));
  };

  const deleteFromCartHandler = (id) => {
    dispatch(deleteFromCart(id));
  };

  const deliveryOptionsHandler = (price, date) => {
    setDeliveryOptions({ price: price, date: date });
  };

  const applyCodeHandler = () => {};

  // const enablePaypalScript = async () => {
  //   const { data } = await Axios.get("/api/config/paypal");
  //   const script = document.createElement("script");
  //   script.type = "text/javascript";
  //   script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
  //   script.async = true;
  //   script.onload = () => {
  //     setSdkReady(true);
  //   };
  //   document.body.appendChild(script);
  // };

  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderedItems: cart.cartItems }));
  };

  return (
    <div>
      <ProgressBar p1 p2 p3 p4="active"></ProgressBar>
      {loading && <LoadingBox />}
      {error && <MessageBox variants="danger">{error}</MessageBox>}
      <div className="row top center">
        <h1 className="justify-start">Review your order</h1>
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
              {cartItems.length === 0 ? (
                <MessageBox variants="danger">
                  <h1>Your Amazonian cart is empty.</h1>{" "}
                  <Link to="/">Go Shopping!</Link>
                </MessageBox>
              ) : (
                <div>
                  <h2 className="green">
                    Estimated delivery: {deliveryOptions.date}
                  </h2>
                  {deliveryOptions.price === options[0].price &&
                    deliveryOptions.date === options[0].date && (
                      <span className="grey">
                        If you order in the next 30 minutes
                      </span>
                    )}
                  <div className="row top">
                    <div className="col-2">
                      {cartItems.map((item, idx) => (
                        <div key={idx} className="row top hr">
                          <div className="col-xs mr-2">
                            <Link to={`/product/${item.product}`}>
                              <img
                                className="sm"
                                src={item.image}
                                alt={item.name}
                              ></img>
                            </Link>
                          </div>
                          <div className="col-2">
                            <Link to={`/product/${item.product}`}>
                              <big>
                                <strong>{item.name}</strong>
                              </big>
                            </Link>
                            <ul className="no-list-style">
                              <li>
                                <small className="grey">
                                  Ships from and sold by Amazonian
                                </small>
                              </li>
                              <li>
                                <span className="price">${item.price}</span>
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
                        </div>
                      ))}
                    </div>
                    <div className="col-1 ml-2">
                      <strong>Choose a delivery option: </strong>
                      <form id="deliveryOptions">
                        <div>
                          <div>
                            <input
                              type="radio"
                              id="option1"
                              name="deliveryOptions"
                              onChange={() =>
                                deliveryOptionsHandler(
                                  options[0].price,
                                  options[0].date
                                )
                              }
                            ></input>
                            <label htmlFor="option1">
                              <strong className="green">
                                {options[0].date}
                              </strong>
                              <div className="grey">
                                {options[0].price} - Standard Shipping
                              </div>
                            </label>
                          </div>
                        </div>
                        <div>
                          <div>
                            <input
                              type="radio"
                              id="option2"
                              name="deliveryOptions"
                              onChange={() =>
                                deliveryOptionsHandler(
                                  options[1].price,
                                  options[1].date
                                )
                              }
                            ></input>
                            <label htmlFor="option2">
                              <strong className="green">
                                {options[1].date}
                              </strong>
                              <div className="grey">
                                {options[1].price} - Standard 3-Day Shipping
                              </div>
                            </label>
                          </div>
                        </div>
                        <div>
                          <div>
                            <input
                              type="radio"
                              id="option3"
                              name="deliveryOptions"
                              onChange={() =>
                                deliveryOptionsHandler(
                                  options[2].price,
                                  options[2].date
                                )
                              }
                            ></input>
                            <label htmlFor="option3">
                              <strong className="green">
                                {options[2].date}
                              </strong>
                              <div className="grey">
                                {options[2].price} - Standard 5-Day Shipping
                              </div>
                            </label>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-1">
            <div className="card card-body">
              <button
                className="block primary"
                onClick={placeOrderHandler}
                disabled={cartItems.length === 0}
              >
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
                    <div>${cart.itemSubtotal}</div>
                  </li>
                  <li className="row">
                    <div>Shipping & Handling:</div>
                    <div>${deliveryOptions.price}</div>
                  </li>
                  <hr />
                  <li className="row">
                    <div>Total before tax:</div>
                    <div>${cart.total}</div>
                  </li>
                  <li className="row">
                    <div>Estimated tax (GST & HST): </div>
                    <div>${cart.tax}</div>
                  </li>
                  <hr />
                  <li className="row">
                    <div className="dark-red">Order final:</div>
                    <div className="dark-red">${cart.final}</div>
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
