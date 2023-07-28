import Home from "../pages/Home/Home";
import InSession from "../pages/InSession/InSession";
import Page404 from "../pages/Page404/Page404";
import SavedLogs from "../pages/SavedLogs/SavedLogs";
import SessionConfig from "../pages/SessionConfig/SessionConfig";
import UserSettings from "../pages/UserSettings/UserSettings";
import ProtectedRoute from "../utils/ProtectedRoute";

export const ProtectedRoutes = [
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/home", element: <Home /> },
      {
        path: "/session",
        children: [
          { path: "config", element: <SessionConfig /> },
          { path: ":sessionId", element: <InSession /> },
        ],
      },
      { path: "/saved-logs", element: <SavedLogs /> },
      { path: "/settings", element: <UserSettings /> },
      { path: "*", element: <Page404 /> },
    ],
  },
];
