import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { options } from "../utils";

export default function Product(props) {
  const { product, type } = props;
  return (
    <div key={product._id} className={`card ${type}`}>
      <div className="md">
        <Link to={`/product/${product._id}`}>
          <img src={product.image} alt={product.abbr} />
        </Link>
      </div>

      <div className="card-body">
        {type === "search" && (
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        )}
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <Link to={`/product/${product._id}`}>
          <small className="price">${product.price}</small>
        </Link>
        {type === "search" && (
          <div>
            Get it by <strong> {options[0].date}</strong>
            <br />
            <small>
              <strong>FREE Delivery </strong> on your first order of itmes
              shipped by Amazonian.
            </small>
          </div>
        )}
      </div>
    </div>
  );
}
