import { useRoutes } from "react-router-dom";
import Auth from "../pages/Auth/Auth";
import Landing from "../pages/Landing/Landing";
import { ProtectedRoutes } from "./protected";

export const AppRoutes = () => {
  const commonRoutes = [
    { path: "/", element: <Landing /> },
    { path: "/auth", element: <Auth /> },
  ];

  const routes = [...commonRoutes, ...ProtectedRoutes];
  const element = useRoutes(routes);
  return element;
};
