import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        <img className="md" src={product.image} alt={product.abbr} />
      </Link>
      <div className="card-body">
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <Link to={`/product/${product._id}`}>
          <small>
            <span className="price">${product.price}</span>
          </small>
        </Link>
      </div>
    </div>
  );
}
