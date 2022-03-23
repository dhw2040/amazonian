import React, { useEffect } from "react";
import Rating from "../components/Rating";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsProduct } from "../actions/productActions";

export default function ProductPage() {
  const param = useParams();
  let { id: productId } = param;
  // const product = data.products.find((x) => x._id === param.id); showing product from static data
  // if (!product) {
  //   return <div>Product Not found!</div>;
  // }
  // const productId = props.match.params.id; // get the id inside the url

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails); // returns the state from store
  const { loading, error, product } = productDetails; // return props from reducers

  //dispatch detail product in useEffect, only one time before return is run
  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        // content of messsage box has children {error} available to MB.js
        <MessageBox>{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back to Result</Link>
          <div className="row top center hr">
            <div className="col-2">
              <img className="md" src={product.image} alt={product.name} />
            </div>
            <div className="col-2">
              <div className="row hr">
                <h1>{product.name}</h1>
                <div>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </div>
              </div>
              <div className="row hr">
                <ul className="no-list-style">
                  <li>
                    <span className="grey">List Price: </span>{" "}
                    <span className="price">${product.price}</span>
                  </li>
                  <li>
                    <span className="grey">Deal Price: </span>{" "}
                    <span className="price">${product.price}</span>
                  </li>
                  <li>FREE Delivery on your first order.</li>
                </ul>
              </div>
              <div className="row hr">
                <h2>About this item</h2>
                <ul>
                  {product.description.map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <div className="row hr">
                  <ul className="no-list-style">
                    <li>
                      <div className="price">${product.price}</div>
                    </li>
                    <li>
                      <div>
                        <a href="https://www.amazon.ca/b?node=19195852011">
                          FREE delivery
                        </a>
                        <strong> Saturday, March 26</strong> on your first
                        order.
                      </div>
                    </li>
                    <li>
                      <div>
                        Or fastest delivery <strong>Tomorrow, March 22</strong>.
                        Order within 16 hrs 7 mins.
                      </div>
                    </li>
                    <li>
                      {product.countInStock > 0 ? (
                        <h2 className="success">In Stock.</h2>
                      ) : (
                        <h2 className="danger">Out of Stock.</h2>
                      )}
                    </li>
                    <li>
                      <div>
                        <button className="block primary">Add to Cart</button>
                      </div>
                      <div>
                        <button className="block buy">Buy Now</button>
                      </div>
                    </li>
                  </ul>

                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
