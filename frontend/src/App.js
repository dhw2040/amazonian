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
import AccountPage from "./pages/Account/AccountPage";
import LogInSecurityPage from "./pages/Account/LogInSecurityPage";
import UpdateSecurityPage from "./pages/Account/UpdateSecurityPage";
import PrivateRoute from "./components/PrivateRoute";
import SearchBox from "./components/SearchBox";
import SearchResultPage from "./pages/SearchResultPage";
import AdminDashboardPage from "./pages/Admin/AdminDashboardPage";
import ReviewPage from "./pages/ReviewPage";
import ReviewCreatePage from "./pages/ReviewCreatePage";

function App() {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const { cartItems } = cartState;
  const userState = useSelector((state) => state.userSignIn);
  const { userInfo } = userState;

  const [filterOnFocus, setFilterOnFocus] = useState(false);

  const signOutHandler = () => {
    dispatch(signout());
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link to="/">
              <img src="/imgs/amazonian_brand_logo.png" alt="amazonian_logo" />
            </Link>
          </div>
          <div>
            <Link to="#">
              <small>Hello, {userInfo ? userInfo.name : ""}</small>
              <br />
              <b>Select your location</b>
            </Link>
          </div>

          <div className="searchbox">
            <SearchBox />
          </div>
          <div>
            <div
              className="drop-down"
              onMouseOver={() => setFilterOnFocus(true)}
              onMouseOut={() => setFilterOnFocus(false)}
            >
              <Link to="#">
                <small>Hello, {userInfo ? userInfo.name : "Sign in"} </small>
                <br />
                <b>Account & Lists </b>
                <i className="fa fa-caret-down"> </i>
              </Link>
              <div className="drop-down-content">
                <div className="row center mb-1">
                  <div className="col-1">
                    {userInfo ? (
                      <div>
                        <button
                          className="block rect content-center"
                          onClick={signOutHandler}
                        >
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
                    <ul className="no-list-style mb-1">
                      <li>
                        <Link to="/user/home" className="grey">
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
                    {userInfo && userInfo.isAdmin && (
                      <div>
                        <h2>Admin</h2>
                        <ul className="no-list-style">
                          <li>
                            <Link to="/admin/dashboard" className="grey">
                              Dashboard
                            </Link>
                          </li>
                          <li>
                            <Link to="/admin/manageproducts" className="grey">
                              Manage Products
                            </Link>
                          </li>
                          <li>
                            <Link to="/admin/manageorders" className="grey">
                              Manage Orders
                            </Link>
                          </li>
                          <li>
                            <Link to="/admin/manageusers" className="grey">
                              Manage Users
                            </Link>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Link to="/order/mine">
              <small>Return</small>
              <br />
              <b>& Orders</b>
            </Link>
          </div>
          <div>
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
            filterOnFocus
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
            <Route
              path="/order/mine"
              element={
                <PrivateRoute>
                  <OrderHistory />
                </PrivateRoute>
              }
            />
            <Route path="/user/home" element={<AccountPage />} />
            <Route
              path="/user/security"
              element={
                <PrivateRoute>
                  <LogInSecurityPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/security/update"
              element={<UpdateSecurityPage />}
            />

            <Route
              path="/search/keywords/:keywords"
              element={<SearchResultPage />}
              exact
            ></Route>
            <Route
              path="/search/department/:department"
              element={<SearchResultPage />}
              exact
            ></Route>
            <Route
              path="/search/department/:department/keywords/:keywords"
              element={<SearchResultPage />}
              exact
            ></Route>
            <Route
              path="/search/department/:department/keywords/:keywords/min/:minPrice/max/:maxPrice/rating/:minRating/sort/:sortOrder/page/:pageNum"
              element={<SearchResultPage />}
              exact
            ></Route>
            <Route
              path="/admin/dashboard"
              element={<AdminDashboardPage />}
            ></Route>
            <Route
              path="/admin/dashboard"
              element={<AdminDashboardPage />}
            ></Route>
            <Route
              path="/admin/dashboard"
              element={<AdminDashboardPage />}
            ></Route>
            <Route
              path="/admin/dashboard"
              element={<AdminDashboardPage />}
            ></Route>
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/review/product/:id" element={<ReviewPage />} />
            <Route
              path="/review/product/:id/sort/:sortOrder/verified/:verifiedFilter/rating/:ratingFilter"
              element={<ReviewPage />}
            />
            <Route
              path="/review/create-review/product/:id"
              element={<ReviewCreatePage />}
            />
            <Route path="/" exact element={<HomePage />} />
          </Routes>
        </main>
        <footer className="row center">All rights reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
