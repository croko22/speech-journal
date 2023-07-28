import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useStore } from "../hooks/useStore";
import Header from "../components/Header/Header";
const ProtectedRoute = () => {
  //TODO: Replace this with a useAuth hook
  const authData = useStore((state) => state.authData);
  return !authData || authData === "undefined" || authData === null ? (
    <Navigate to="/" />
  ) : (
    <React.Fragment>
      <Header />
      <Outlet />
    </React.Fragment>
  );
};
export default ProtectedRoute;
