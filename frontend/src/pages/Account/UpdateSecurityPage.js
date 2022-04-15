import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { updateUserSecurity } from "../../actions/userActions";
import MessageBox from "../../components/MessageBox";

export default function UpdateSecurityPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const userUpdateSecurity = useSelector((state) => state.userUpdateSecurity);

  const [newVal, setNewVal] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const { search } = useLocation();
  const fieldSearch = new URLSearchParams(search).get("field");
  const field = fieldSearch ? String(fieldSearch) : "";

  const type =
    field === "name" ? "text" : field === "mobile" ? "tel" : String(field);

  const updateButtonHandler = (e) => {
    e.preventDefault();
    if (field === "password") {
      if (newVal !== confirmPassword) {
        setPasswordErrorMessage("Passwords do not match.");
        return;
      } else if (newVal.length < 6) {
        setPasswordErrorMessage(
          "Passwords must consist of at least 6 characters."
        );
        return;
      }
    }
    dispatch(
      updateUserSecurity({
        userId: userInfo._id,
        field: field,
        updateValue: newVal,
      })
    );
    navigate(`/user/security?field=${field}`);
  };

  return (
    <div className="row sidepad md">
      <div className="col-100 mb-1">
        {passwordErrorMessage.length > 0 && (
          <div className="col-30 mb-1">
            <MessageBox variants="danger">{passwordErrorMessage}</MessageBox>
          </div>
        )}
      </div>
      <div className="col-100 mb-1">
        <h1>Change your {field}</h1>
      </div>
      <div className="col-2">
        <div className="card card-body security">
          <div className="row top">
            <div className="col-1 ">
              <div className="mb-3">
                <small>
                  If you want to change the {field} associated with your Amazon
                  customer account, you may do so below. Be sure to click the
                  Save Changes button when you are done.{" "}
                </small>
              </div>
              <div>
                <strong>New {field}</strong>
              </div>
              <div className="mb-3">
                <input
                  id={field}
                  type={type}
                  placeholder={`Enter new ${field}`}
                  value={newVal}
                  onChange={(e) => setNewVal(e.target.value)}
                ></input>
              </div>
              {field === "password" && (
                <div className="mb-3">
                  <input
                    id={field}
                    type={type}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></input>
                  <div>
                    <small className="dark-grey">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      Passwords must consist of at least 6 characters.
                    </small>
                  </div>
                </div>
              )}
              <button className="rect" onClick={(e) => updateButtonHandler(e)}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
