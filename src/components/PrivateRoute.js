import React from "react";
import { Navigate } from "react-router-dom";
import { isLogin } from "../utils/auth";

function PrivateRoute({ children }) {
  const auth = isLogin();
  return auth ? children : <Navigate to='/login'/>
}

export default PrivateRoute;