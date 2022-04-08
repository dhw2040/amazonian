import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listMyOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function OrderHistory() {
  const dispatch = useDispatch();
  const myOrderList = useSelector((state) => state.orderMyList);
  const { loading, error, orders } = myOrderList;

  useEffect(() => {
    dispatch(listMyOrder());
  }, [dispatch]);
  return (
    <div>
      <h1>Your Order History</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variants="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ORDER PLACED</th>
              <th>TOTAL</th>
              <th>DISPATCH TO</th>
              <th>ORDER # {orders._id}</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.final}</td>
                <td>{order.shippingAddress.fullName}</td>
                <td>
                  <div>
                    <Link to="#">Order Details</Link>
                    <Link to="#" className="vr">
                      Invoice
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
