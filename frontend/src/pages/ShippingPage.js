import React, { useState } from "react";
import ProgressBar from "../components/ProgressBar";

export default function ShippingPage() {
  const [fullName, setFullname] = useState("");
  const [address1, setFirstAddress] = useState("");
  const [address2, setSecondAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const submitHandler = (e) => {
    e.prventDefault();
  };

  return (
    <div>
      <ProgressBar p1 p2="active"></ProgressBar>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Add a new Address</h1>
          <p className="dark-grey">
            Be sure to click "Ship to this address" when done.
          </p>
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
