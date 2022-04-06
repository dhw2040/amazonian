import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { summaryOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function OrderSummaryPage() {
  const params = useParams();
  const { id: orderId } = params;

  const orderSummary = useSelector((state) => state.orderSummary);
  const { loading, order, error } = orderSummary;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(summaryOrder(orderId));
  }, [dispatch, orderId]);

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variants="danger">{error}</MessageBox>
      ) : (
        <div className="row top">
          <div className="card card-body">
            <div className="success">
              <h1>Thank you!</h1> Your order has been successfully placed.
            </div>
            <p>Your order ID: {orderId} </p>
          </div>
        </div>
      )}
    </div>
  );
}
