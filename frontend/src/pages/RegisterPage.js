import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";

import { register, signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useLocation();
  const redirectSearch = new URLSearchParams(search).get("redirect");
  const redirectUrl = redirectSearch ? redirectSearch : "/";

  const userState = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userState;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password, confirmPassword));
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
            <form className="form" onSubmit={registerHandler}>
              <div>
                <h1>Create account</h1>
              </div>
              <div>
                <label htmlFor="name">
                  <small>Your name</small>
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your name"
                  required
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="email">
                  <small>E-mail address</small>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="E-mail"
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
                  title="Passwords must consist of at least 6 characters."
                  required
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <small className="dark-grey">
                  <i class="fa fa-info-circle" aria-hidden="true"></i>
                  Passwords must consist of at least 6 characters.
                </small>
              </div>
              <div>
                <label htmlFor="confirmPassword">
                  <small>Confirm Password </small>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="confirm password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>
              </div>
              <div>
                <label />
                <button className="block primary" type="submit">
                  Create your Amazonian account
                </button>
              </div>
            </form>
            <div>
              <small>
                By creating an account, you agree to Amazonian's{" "}
                <Link to="https://www.amazon.com/gp/help/customer/display.html?nodeId=508088">
                  Conditions of Use
                </Link>{" "}
                and{" "}
                <Link to="https://www.amazon.com/gp/help/customer/display.html?nodeId=468496">
                  Privacy Notice.
                </Link>{" "}
              </small>
            </div>
            <hr />
            <div>
              <div className="content-center">
                <small className="grey content-center">
                  Already have an account?{" "}
                  <Link to={`/signin?redirect=${redirectUrl}`}>Sign in</Link>{" "}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
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
