import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBox() {
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState("all");
  const [department, setDepartment] = useState("all");

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search/department/${department}/keywords/${keywords}`);
  };
  return (
    <form className="search" onSubmit={submitHandler}>
      <div className="row">
        <div className="department"></div>
        <input
          className="search"
          type="text"
          name="keywords"
          id="keywords"
          onChange={(e) => setKeywords(e.target.value)}
        ></input>
        <button className="search" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
}
