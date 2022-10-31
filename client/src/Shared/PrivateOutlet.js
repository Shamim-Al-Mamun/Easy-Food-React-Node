import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateOutlet = () => {
  const { user } = useSelector((state) => state.auth);
  return user?.role === "user" || user?.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateOutlet;
