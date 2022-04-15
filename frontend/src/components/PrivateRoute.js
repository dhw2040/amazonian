import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

// export default function PrivateRoute({ component: Component, ...rest }) {
//   const userSignIn = useSelector((state) => state.userSignIn);
//   const { userInfo } = userSignIn;
//   return (
//     // Show the component only when the user is signed in
//     // Otherwise, redirect the user to /signin page
//     <Route
//       {...rest}
//       render={(props) =>
//         userInfo ? <Component {...props} /> : <Navigate to="/signin" />
//       }
//     />
//   );
// }
const PrivateRoute = ({ children }) => {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  return userInfo ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
