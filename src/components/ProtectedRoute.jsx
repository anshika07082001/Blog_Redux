import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { login } from "../reducer/blogSlice";

const ProtectedRoute = ({ children }) => {
  let dispatch = useDispatch();
  const state = useSelector((state) => state.blogSlice);
  let location = useLocation();

  useEffect(() => {
    let loginData = localStorage.getItem("LoginUser");
    if (loginData) {
      dispatch(login(JSON.parse(loginData)));
    }
  }, [location.pathname]);

  if (!Object.keys(state.loginUser).length > 0) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
