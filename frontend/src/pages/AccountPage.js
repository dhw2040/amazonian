import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default function AccountPage() {
  const param = useParams();
  let { id: userId } = param;
  return (
    <div className="row sidepad">
      <h1>Your Account</h1>
      <div className="row">
        <div className="col-1">
          <Link to="/order/mine">
            <div className="card card-body">
              <div className="row">
                <div className="col-sm mr-2">
                  <img
                    className="sm"
                    src="/imgs/your_account_orders.png"
                    alt="your_account_orders"
                  ></img>
                </div>
                <div className="col-1">
                  <h3>Your Orders</h3>
                  <span className="grey">
                    Track, return, or buy things again
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-1">
          <Link to={`/user/${userId}/security`}>
            <div className="card card-body">
              <div className="row">
                <div className="col-sm mr-2">
                  <img
                    className="sm"
                    src="/imgs/your_account_login.png"
                    alt="your_account_login"
                  ></img>
                </div>
                <div className="col-1">
                  <h3>Login & Security</h3>
                  <span className="grey">
                    Edit login, name, and mobile number
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-1">
          <Link to="/prime">
            <div className="card card-body">
              <div className="row">
                <div className="col-sm mr-2">
                  <img
                    className="sm"
                    src="/imgs/your_account_prime.png"
                    alt="your_account_prime"
                  ></img>
                </div>
                <div className="col-1">
                  <h3>Prime</h3>
                  <span className="grey">
                    View benefits and payment settings
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-1">
          <Link to={`/user/${userId}/giftcard`}>
            <div className="card card-body">
              <div className="row">
                <div className="col-sm mr-2">
                  <img
                    className="sm"
                    src="/imgs/your_account_giftcard.png"
                    alt="your_account_giftcard"
                  ></img>
                </div>
                <div className="col-1">
                  <h3>Gift cards</h3>
                  <span className="grey">
                    View balance, redeem, or reload cards
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-1">
          <Link to={`/user/${userId}/payments`}>
            <div className="card card-body">
              <div className="row">
                <div className="col-sm mr-2">
                  <img
                    className="sm"
                    src="/imgs/your_account_payment.png"
                    alt="your_account_payment"
                  ></img>
                </div>
                <div className="col-1">
                  <h3>Your Payments</h3>
                  <span className="grey">
                    Manage payment methods and settings, view all transactions
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-1">
          <Link to={`/user/${userId}/profile`}>
            <div className="card card-body">
              <div className="row">
                <div className="col-sm mr-2">
                  <img
                    className="sm"
                    src="/imgs/your_account_profile.png"
                    alt="your_account_profile"
                  ></img>
                </div>
                <div className="col-1">
                  <h3>Your Profiles</h3>
                  <span className="grey">
                    Manage, add, or remove user profiles
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-1">
          <Link to={`/user/${userId}/messages`}>
            <div className="card card-body">
              <div className="row">
                <div className="col-sm mr-2">
                  <img
                    className="sm"
                    src="/imgs/your_account_message.png"
                    alt="your_account_message"
                  ></img>
                </div>
                <div className="col-1">
                  <h3>Your Messages</h3>
                  <span className="grey">
                    View messages to and from Amazonian,sellers,and buyers
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-1">
          <Link to="/order/mine">
            <div className="card card-body">
              <div className="row">
                <div className="col-sm mr-2">
                  <img
                    className="sm"
                    src="/imgs/your_account_archive_orders.png"
                    alt="your_account_archive_orders"
                  ></img>
                </div>
                <div className="col-1">
                  <h3>Archived Orders</h3>
                  <span className="grey">
                    View and manage your archived orders
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
