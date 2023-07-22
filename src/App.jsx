import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ProtectedRoute from "./utils/ProtectedRoute";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import InSession from "./pages/InSession/InSession";
import SavedLogs from "./pages/SavedLogs/SavedLogs";
import SessionConfig from "./pages/SessionConfig/SessionConfig";
import Landing from "./pages/Landing/Landing";
import Page404 from "./pages/Page404/Page404";
import Auth from "./pages/Auth/Auth";
import UserSettings from "./pages/UserSettings/UserSettings";

function App() {
  //TODO: Simplify this route structure
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/session">
              <Route
                path="config"
                element={
                  <ProtectedRoute>
                    <SessionConfig />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":sessionId"
                element={
                  <ProtectedRoute>
                    <InSession />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route
              path="/saved-logs"
              element={
                <ProtectedRoute>
                  <SavedLogs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <UserSettings />
                </ProtectedRoute>
              }
            />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
