import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
const ProtectedRoute = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
    const userToken = localStorage.getItem("authData");
    if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false);
      return navigate("/");
    }
    setIsLoggedIn(true);
  };
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);
  return (
    <React.Fragment>
      <Header />
      <Outlet />
    </React.Fragment>
  );
};
export default ProtectedRoute;
