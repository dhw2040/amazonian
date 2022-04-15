import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  return userInfo && userInfo.isAdmin ? children : <Navigate to="/signin" />;
};

export default AdminRoute;
