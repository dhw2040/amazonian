import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import { useDispatch, useSelector } from "react-redux";
import CartPage from "./pages/CartPage";
import SigninPage from "./pages/SigninPage";
import { signout } from "./actions/userActions";
import RegisterPage from "./pages/RegisterPage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import OrderPlacePage from "./pages/OrderPlacePage";
import OrderSummaryPage from "./pages/OrderSummaryPage";
import OrderPayPage from "./pages/OrderPayPage";
import OrderHistory from "./pages/OrderHistory";

function App() {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const { cartItems } = cartState;
  const userState = useSelector((state) => state.userSignIn);
  const { userInfo } = userState;

  const [dropDownHover, setDropDownHover] = useState(false);

  const signOutHandler = () => {
    dispatch(signout());
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              amazonian
            </Link>
          </div>
          <div>
            <div
              className="drop-down"
              onMouseOver={() => setDropDownHover(true)}
              onMouseOut={() => setDropDownHover(false)}
            >
              <Link to="#">
                <small>
                  Hello, <strong>{userInfo ? userInfo.name : "Sign in"}</strong>{" "}
                </small>
                <br />
                <small>
                  <strong>Account & Lists </strong>
                </small>
                <i className="fa fa-caret-down"> </i>
              </Link>
              <div className="drop-down-content">
                <div className="row center">
                  <div className="col-1">
                    {userInfo ? (
                      <div className="content-center">
                        <button className="block rect" onClick={signOutHandler}>
                          Sign Out
                        </button>
                      </div>
                    ) : (
                      <div className="content-center">
                        <Link to="/signin">
                          <button className="block rect">Sign in</button>
                        </Link>
                        <small className="grey">New customer?</small>
                        <Link to="/register">Start here</Link>
                      </div>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row top flex-row">
                  <div className="col-1">
                    <h2>Your Lists</h2>
                    <ul className="no-list-style">
                      <li>
                        <Link to="#" className="grey">
                          Create a Wish List
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="grey">
                          Wish from Any Website
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="grey">
                          Find a Gift
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="grey">
                          Discover Your Style
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-1 vr">
                    <h2>Your Account</h2>
                    <ul className="no-list-style">
                      <li>
                        <Link to="#" className="grey">
                          Your Account
                        </Link>
                      </li>
                      <li>
                        <Link to="/order/mine" className="grey">
                          Your Orders
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="grey">
                          Your Recommendations
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="grey">
                          Your Subscribe & Save Items
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <Link to="/cart">
              <i className="fa fa-shopping-cart fa-3x" aria-hidden="true"></i>{" "}
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
          </div>
        </header>
        <main
          style={
            dropDownHover
              ? {
                  transitionDuration: "0.5s",
                  filter: "brightness(50%)",
                  background: "rgba(0,0,0,0.5)",
                }
              : { transitionDuration: "0.5s" }
          }
        >
          <Routes>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/cart/:id" element={<CartPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/placeorder" element={<OrderPlacePage />} />
            {/* <Route path="/order/:id/pay" element={<OrderPayPage />} /> */}
            {/* <Route path="/order/:id/result" element={<OrderResultPage />} /> */}
            <Route path="/order/:id/summary" element={<OrderSummaryPage />} />
            <Route path="/order/mine" element={<OrderHistory />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/" exact element={<HomePage />} />
          </Routes>
        </main>
        <footer className="row center">All rights reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
