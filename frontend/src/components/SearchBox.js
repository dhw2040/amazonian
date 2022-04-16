import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listProductCategories } from "../actions/productActions";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

export default function SearchBox() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [keywords, setKeywords] = useState("all");
  const [department, setDepartment] = useState("all");

  const departmentList = useSelector((state) => state.productCategories);
  const { loading, error, categories } = departmentList;

  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search/department/${department}/keywords/${keywords}`);
  };
  return (
    <>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variants="danger">{error}</MessageBox>
      ) : (
        <form className="search" onSubmit={submitHandler}>
          <select
            className="search"
            onChange={(e) => {
              setDepartment(e.target.value);
            }}
          >
            <option value="All">All</option>
            {categories.map((c, idx) => (
              <option key={idx} value={c}>
                {c}
              </option>
            ))}
          </select>
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
        </form>
      )}
    </>
  );
}
