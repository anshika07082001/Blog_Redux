import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { login } from "../reducer/blogSlice";
import BlogPage from "./BlogPage";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";

const Main = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    let loginData = localStorage.getItem("LoginUser");
    if (loginData) {
      dispatch(login(JSON.parse(loginData)));
    }
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <BlogPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Main;
