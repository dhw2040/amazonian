import React, { useEffect, useState } from "react";
import Rating from "../components/Rating";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsProduct } from "../actions/productActions";

export default function ProductPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const param = useParams();
  let { id: productId } = param;
  // const product = data.products.find((x) => x._id === param.id); showing product from static data
  // if (!product) {
  //   return <div>Product Not found!</div>;
  // }
  // const productId = props.match.params.id; // get the id inside the url
  const productDetails = useSelector((state) => state.productDetails); // returns the state from store
  const { loading, error, product } = productDetails; // return props from reducers
  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    navigate(`/cart/${productId}?qty=${qty}`);
  };

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
        <MessageBox variants="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back to Result</Link>
          <div className="row top center hr">
            <div className="col-2">
              <img className="xl" src={product.image} alt={product.name} />
            </div>
            <div className="col-2 ml-2">
              <div className="row hr">
                <ul className="no-list-style">
                  <li>
                    <h1>{product.name}</h1>
                  </li>
                  <li>
                    <Rating
                      rating={product.rating}
                      numReviews={product.numReviews}
                    ></Rating>
                  </li>
                </ul>
              </div>
              <div className="row hr">
                <ul className="no-list-style">
                  <li>
                    <span className="grey">List Price: </span>
                    <span className="price">${product.price}</span>
                  </li>
                  <li>
                    <span className="grey">Deal Price: </span>
                    <span className="price">${product.price}</span>
                  </li>
                  <li>
                    <strong>FREE Delivery </strong> on your first order.
                  </li>
                </ul>
              </div>
              <div className="row hr">
                <ul>
                  <h2>About this item</h2>
                  {product.description.map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-sm ml-2">
              <div className="card card-body">
                <div className="row hr">
                  <ul className="no-list-style mb-3">
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
                        Or fastest delivery <strong>Tomorrow, March 22.</strong>
                        Order within 16 hrs 7 mins.
                      </div>
                    </li>
                    <li>
                      <span>
                        <i className="fa fa-map-o" aria-hidden="true"></i>
                      </span>
                      <a href="/location"> Select delivery location</a>
                    </li>
                    <li>
                      {product.stock > 0 ? (
                        <h2 className="success">In Stock.</h2>
                      ) : (
                        <h2 className="danger">Out of Stock.</h2>
                      )}
                    </li>

                    {product.stock > 0 && (
                      <li>
                        <div>
                          Quantity:
                          <span>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(Number(product.maxQty)).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </span>
                        </div>
                      </li>
                    )}
                    {product.stock > 0 && (
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary cart"
                        >
                          Add to Cart
                        </button>

                        <button className="buy cart">Buy Now</button>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
