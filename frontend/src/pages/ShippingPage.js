import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { saveShippingAddress } from "../actions/cartActions";
import ProgressBar from "../components/ProgressBar";

export default function ShippingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [navigate, userInfo]);

  const [fullName, setFullname] = useState(shippingAddress.fullName);
  const [address1, setFirstAddress] = useState(shippingAddress.address1);
  const [address2, setSecondAddress] = useState(shippingAddress.address2);
  const [city, setCity] = useState(shippingAddress.city);
  const [province, setProvince] = useState(shippingAddress.province);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        fullName,
        address1,
        address2,
        city,
        province,
        postalCode,
        country,
      })
    );
    navigate("/payment");
  };

  return (
    <div>
      <ProgressBar p1 p2="active"></ProgressBar>
      {/* {userInfo.address ? <div></div> : <div></div>} */}
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Add a new Address</h1>
          <span className="dark-grey">
            Be sure to click "Ship to this address" when done.
          </span>
        </div>
        <div>
          <label htmlFor="fullName">Full name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullname(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address1">Address line 1:</label>
          <input
            type="text"
            id="address1"
            placeholder="Street address, P.O.box, company name, etc.."
            value={address1}
            onChange={(e) => setFirstAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address2">Address line 2:</label>
          <input
            type="text"
            id="address2"
            placeholder="Unit number"
            value={address2}
            onChange={(e) => setSecondAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">Province:</label>
          <input
            type="text"
            id="province"
            placeholder="Province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="postalCode">Postal code</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label />
          <button className="block rect" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
