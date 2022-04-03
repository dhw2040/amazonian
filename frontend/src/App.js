import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import { useDispatch, useSelector } from "react-redux";
import CartPage from "./pages/CartPage";
import SigninPage from "./pages/SigninPage";
import { signout } from "./actions/userActions";

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
                <div className="row center hr">
                  <div className="col-1 content-center">
                    {userInfo && (
                      <button
                        className="block rect primary"
                        onClick={signOutHandler}
                      >
                        Sign Out
                      </button>
                    )}
                    <div className="content-center">
                      <Link to="/signin">
                        <button className="block rect">Sign in</button>
                      </Link>
                      <small>
                        <span className="grey">New customer?</span>
                      </small>
                      <Link to="/register">Start here</Link>
                    </div>
                  </div>
                </div>
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
                        <Link to="#" className="grey">
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
              <i class="fa fa-shopping-cart fa-3x" aria-hidden="true"></i> Cart
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
              : {}
          }
        >
          <Routes>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/cart/:id" element={<CartPage />} />
            <Route path="/signin" element={<SigninPage />} />
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
