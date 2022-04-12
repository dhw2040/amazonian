import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setName] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search/query/${query}`);
  };
  return (
    <form className="search" onSubmit={submitHandler}>
      <div className="row">
        <input
          className="search"
          type="text"
          name="query"
          id="query"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button className="search" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
}
