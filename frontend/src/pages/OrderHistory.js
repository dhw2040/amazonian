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
    <div className="row center">
      <h1 className="justify-start">Your Orders</h1>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variants="danger">{error}</MessageBox>
      ) : (
        <div className="col-100">
          {orders.map((order) => (
            <div key={order._id} className="card card-body">
              <div className="row">
                <table className="table">
                  <thead>
                    <tr>
                      <th>ORDER PLACED</th>
                      <th>TOTAL</th>
                      <th>DISPATCH TO</th>
                      <th>ORDER # {order._id}</th>
                    </tr>
                  </thead>
                  <tbody>
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
                  </tbody>
                </table>
              </div>
              <div>
                <h1>
                  {order.isDelivered
                    ? "Delivered " + order.dateOfDelivery.substring(0, 10)
                    : "Expected " + order.expectedDelivery.substring(0, 10)}
                </h1>
              </div>
              <div className="row top">
                <div className="col-2">
                  <span>
                    Your packcage{" "}
                    {order.isDelivered
                      ? "was delivered to "
                      : "is on the way to "}
                    {order.shippingAddress.address1}
                  </span>
                  {order.orderedItems.map((item) => (
                    <div key={item.product} className="row top hr">
                      <div className="col-xs mr-2">
                        <Link to={`/product/${item.product}`}>
                          <img
                            className="md"
                            src={item.image}
                            alt={item.name}
                          ></img>
                        </Link>
                      </div>
                      <div className="col-2 ml-2">
                        <Link to={`/product/${item.product}`}>
                          <big>
                            <strong>{item.name}</strong>
                          </big>
                        </Link>
                        <ul className="no-list-style">
                          <li>
                            <small className="dark-grey">
                              Ships from and sold by Amazonian
                            </small>
                          </li>
                          <li>
                            <small className="dark-grey">
                              Eligible for return until{" "}
                              <strong>
                                {order.eligibleReturnDate.substring(0, 10)}
                              </strong>
                            </small>
                          </li>
                          <li>
                            <span className="price">${item.price}</span>
                          </li>
                        </ul>
                        <div>
                          <button className="primary buyAgain">
                            Buy it again
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="col-1">
                  <ul className="no-list-style">
                    <li>
                      <button className="mb-3 myOrder">Track package</button>
                    </li>
                    <li>
                      <button className="myOrder">Return items</button>
                    </li>
                    <li>
                      <button className="myOrder">Share gift reciept</button>
                    </li>
                    <li>
                      <button className="myOrder">Leave Seller feedback</button>
                    </li>
                    <li>
                      <button className="myOrder">
                        Write a product review
                      </button>
                    </li>
                    <li>
                      <button className="myOrder">Archive order</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
