import React, { useEffect, useid, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

export default function LogInSecurityPage() {
  const navigate = useNavigate();

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const userUpdateSecurity = useSelector((state) => state.userUpdateSecurity);
  const { success, error, loading } = userUpdateSecurity;

  const { search } = useLocation();
  const fieldSearch = new URLSearchParams(search).get("field");
  const field = fieldSearch ? String(fieldSearch) : "";

  const successMessage = "You have successfully changed your " + field;
  const editButtonHandler = (e, reqField) => {
    e.preventDefault();
    navigate(`/user/security/update?field=${reqField}`);
  };

  return (
    <div className="row sidepad md">
      <div className="col-100 mb-1">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variants="danger">{error}</MessageBox>
        ) : (
          success && (
            <MessageBox variants="success">{successMessage}</MessageBox>
          )
        )}
      </div>
      <div className="col-100">
        <h1>Login & Security</h1>
      </div>

      <div className="card card-body security">
        <div className="row top">
          <div className="col-1">
            <div>
              <strong>Name:</strong>
            </div>
            <div>{userInfo.name}</div>
          </div>
          <div className="col-1">
            <button
              className="security"
              onClick={(e) => editButtonHandler(e, "name")}
            >
              Edit
            </button>
          </div>
        </div>
        <div className="row top">
          <div className="col-1">
            <div>
              <strong>Email:</strong>
            </div>
            <div>{userInfo.email}</div>
          </div>
          <div className="col-1">
            <button
              className="security"
              onClick={(e) => editButtonHandler(e, "email")}
            >
              Edit
            </button>
          </div>
        </div>
        <div className="row top">
          <div className="col-1">
            <div>
              <strong>Mobile Phone Number:</strong>
            </div>
            {userInfo.phone ? (
              <div className>{userInfo.mobile}</div>
            ) : (
              <div className="blue">why add a mobile phone number?</div>
            )}
          </div>
          <div className="col-1">
            <button
              className="security"
              onClick={(e) => editButtonHandler(e, "mobile")}
            >
              {userInfo.phone ? "Edit" : "Add"}
            </button>
          </div>
        </div>
        <div className="row top no-border">
          <div className="col-1">
            <div>
              <strong>Password:</strong>
            </div>
            <div>*******</div>
          </div>
          <div className="col-1">
            <button
              className="security"
              onClick={(e) => editButtonHandler(e, "password")}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
