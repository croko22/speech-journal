import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header/Header";
const ProtectedRoute = () => {
  const userToken = localStorage.getItem("authData");

  return !userToken || userToken === "undefined" || userToken === null ? (
    <Navigate to="/" />
  ) : (
    <React.Fragment>
      <Header />
      <Outlet />
    </React.Fragment>
  );
};
export default ProtectedRoute;
