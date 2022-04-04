import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";

import { signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function SigninPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useLocation();
  const redirectSearch = new URLSearchParams(search).get("redirect");
  const redirectUrl = redirectSearch ? redirectSearch : "/";

  const userState = useSelector((state) => state.userSignIn);
  const { userInfo, loading, error } = userState;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signinHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  const registerHandler = () => {
    navigate(`/register?redirect=${redirectUrl}`);
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirectUrl);
    }
  }, [navigate, userInfo, redirectUrl]);

  return (
    <div>
      <div className="row center">
        <div className="col-0">
          <div className="content-center">
            <Link to="/">
              <img
                className="sm"
                src="/imgs/amazon_logo.jpg"
                alt="amazon_logo"
              />
            </Link>
          </div>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variants="danger">{error}</MessageBox>}
          <div className="card card-body">
            <form className="form" onSubmit={signinHandler}>
              <div>
                <h1>Sign-In</h1>
              </div>
              <div>
                <label htmlFor="email">
                  <small>E-mail address or mobile phone number</small>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="E-mail or Mobile phone number"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="password">
                  <small>Password </small>
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <div>
                <label />
                <button className="block rect" type="submit">
                  Sign In
                </button>
              </div>
            </form>
            <div>
              <small>
                By continuing, you agree to Amazonian's{" "}
                <Link to="https://www.amazon.com/gp/help/customer/display.html?nodeId=508088">
                  Conditions of Use
                </Link>{" "}
                and{" "}
                <Link to="https://www.amazon.com/gp/help/customer/display.html?nodeId=468496">
                  Privacy Notice.
                </Link>{" "}
              </small>
            </div>
            <div className="content-center">
              <small className="grey content-center">New to Amazonian?</small>
              <button className="block" onClick={registerHandler}>
                Create your Amazonian account
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <hr></hr>
      </div>
      <div className="content-center">
        <small>
          {" "}
          <Link to="https://www.amazon.com/gp/help/customer/display.html?nodeId=508088">
            Conditions of Use
          </Link>
        </small>
        <small>
          <Link to="https://www.amazon.com/gp/help/customer/display.html?nodeId=468496">
            Privacy Notice
          </Link>
        </small>
        <small>
          <Link to="https://www.amazon.com/gp/help/customer/display.html">
            Help
          </Link>
        </small>
      </div>
      <div className="content-center">
        <small className="grey">
          © 1996-2022, Amazonian, Inc. or its affiliates
        </small>
      </div>
    </div>
  );
}
