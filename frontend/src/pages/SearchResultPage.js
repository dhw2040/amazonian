import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { listProductCategories, listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import Rating from "../components/Rating";
import { prices, ratings } from "../utils";

export default function SearchResultPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const param = useParams();
  const {
    keywords = "all",
    department = "all",
    minPrice = 0,
    maxPrice = Infinity,
    minRating = 0,
    sortOrder = "newest",
    pageNum = 1,
    // availability = false,
  } = param;

  const generateRefineURL = (refineField) => {
    const refinedepartment = refineField.department || department;
    const refineKeywords = refineField.keywords || keywords;
    const refineSortOrder = refineField.sortOrder || sortOrder;
    const refineMin = refineField.minPrice
      ? refineField.minPrice
      : refineField.minPrice === 0
      ? 0
      : minPrice;
    const refineMax = refineField.maxPrice
      ? refineField.maxPrice
      : refineField.maxPrice === Infinity
      ? Infinity
      : maxPrice;
    const refineRating = refineField.minRating || minRating;
    const refinePageNum = refineField.pageNum || pageNum;

    return `/search/department/${refinedepartment}/keywords/${refineKeywords}/min/${refineMin}/max/${refineMax}/rating/${refineRating}/sort/${refineSortOrder}/page/${refinePageNum}`;
  };

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, itemPerPage, totalPageNum } =
    productList;
  const departmentList = useSelector((state) => state.productCategories);
  const {
    loading: loadingDepartment,
    error: errorDepartment,
    categories,
  } = departmentList;

  useEffect(() => {
    dispatch(
      listProducts({
        keywords,
        department,
        minPrice,
        maxPrice,
        minRating,
        sortOrder,
        pageNum,
      })
    );
    dispatch(listProductCategories());
  }, [
    dispatch,
    keywords,
    department,
    minPrice,
    maxPrice,
    minRating,
    sortOrder,
    pageNum,
  ]);

  const range = {
    low: Number(itemPerPage * (pageNum - 1) + 1),
    high: Number(itemPerPage * pageNum),
  };

  return (
    <div>
      <div className="row hr mb-1">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variants="danger">{error}</MessageBox>
        ) : (
          <div>
            {range.low}-{range.high} of {products.length} Results for{" "}
            <small className="dark-red">"{keywords}"</small>
          </div>
        )}
        <div>
          Sort by{" "}
          <select
            onChange={(e) => {
              navigate(generateRefineURL({ sortOrder: e.target.value }));
            }}
          >
            <option value="lowFirst">Price: Low to High</option>
            <option value="highFirst">Price: High to Low</option>
            <option value="topRated">Avg. Customer Reviews</option>
            <option value="newest">Newest Arrivals</option>
          </select>
        </div>
      </div>
      <div className="row top">
        <div className="col-1 sidebar">
          <div>
            <h3>Department</h3>
            {loadingDepartment ? (
              <LoadingBox></LoadingBox>
            ) : errorDepartment ? (
              <MessageBox variants="danger">{errorDepartment}</MessageBox>
            ) : (
              <div className="mb-3">
                <ul className="no-list-style">
                  <li>
                    <Link
                      className={department === "all" ? "active" : ""}
                      to={generateRefineURL({ department: "all" })}
                    >
                      Any
                    </Link>
                  </li>
                  {categories.map((d) => (
                    <li key={d}>
                      <Link
                        className={d === department ? "active" : ""}
                        to={generateRefineURL({ department: d })}
                      >
                        {d}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div>
            <h3>Customer Review</h3>
            <div className="mb-3">
              <ul className="no-list-style">
                {ratings.map((r) => (
                  <li key={r.label}>
                    <Link
                      to={generateRefineURL({ minRating: r.rating })}
                      className={
                        `${r.rating}` === `${minRating}` ? "active" : ""
                      }
                    >
                      <Rating label={" & Up"} rating={r.rating}></Rating>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h3>Price</h3>
            <ul className="no-list-style">
              {prices.map((p) => (
                <li key={p.label}>
                  <Link
                    to={generateRefineURL({ minPrice: p.min, maxPrice: p.max })}
                    className={`${
                      p.min === minPrice && p.max === maxPrice ? "active" : ""
                    }`}
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* <div>
            <h3>Availability</h3>
             <div className="mb-3">
            </div>
            <input
              type="checkbox"
              id="includeEmptyStock"
              name="includeEmptyStock"
              value={false}
              onChange={(e) => {
                navigate(generateRefineURL({ availability: true }));
              }}
            ></input>
          </div> */}
        </div>
        <div className="col-4 vr">
          <div className="mb-3">
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variants="danger">{error}</MessageBox>
            ) : (
              <>
                {products.length === 0 && (
                  <MessageBox variants="danger">
                    No Product Has Been Found
                  </MessageBox>
                )}
                <div className="row center">
                  {products.map((product) => (
                    <Product
                      key={product._id}
                      product={product}
                      type="search"
                    ></Product>
                  ))}
                </div>
                <div className="row center pagebox">
                  {[...Array(totalPageNum).keys()].map((x) => (
                    <Link
                      className={x + 1 === page ? "active" : ""}
                      key={x + 1}
                      to={generateRefineURL({ page: x + 1 })}
                    >
                      {x + 1}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
