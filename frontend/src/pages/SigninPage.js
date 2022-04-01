import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function SigninPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signinHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="row center hr">
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
          <div className="card card-body">
            <form className="form" onSubmit={signinHandler}>
              <div>
                <h1>Sign-In</h1>
              </div>
              <div>
                <label htmlFor="email">
                  E-mail address or mobile phone number
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
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
            </form>
            <div>
              <label />
              <button className="block primary" type="submit">
                Sign In
              </button>
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
            </div>
          </div>
          <div>
            <small className="grey content-center">New to Amazonian?</small>
            <div>
              <button className="block">Create your Amazonian account</button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="row center">
        <div className="content-center">
          <Link to="https://www.amazon.com/gp/help/customer/display.html?nodeId=508088">
            <small>Conditions of Use</small>
          </Link>
          <Link to="https://www.amazon.com/gp/help/customer/display.html?nodeId=468496">
            <small>Privacy Notice</small>
          </Link>
          <Link to="https://www.amazon.com/gp/help/customer/display.html">
            <small>Help</small>
          </Link>
        </div>
        <div className="content-center">
          <small className="grey">
            © 1996-2022, Amazonian, Inc. or its affiliates
          </small>
        </div>
      </div> */}
    </div>
  );
}
