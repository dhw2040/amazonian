import React, { useEffect } from "react";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

export default function HomePage() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList); // must match the reducer in the store.js
  const { loading, error, products } = productList; // must match the params in ProductReducer

  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        // content of messsage box has children {error} available to MB.js
        <MessageBox variants="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product} type="home"></Product>
          ))}
        </div>
      )}
    </div>
  );
}
