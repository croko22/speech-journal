import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ProtectedRoute from "./utils/ProtectedRoute";
import Landing from "./pages/Landing/Landing";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import InSession from "./pages/InSession/InSession";
import SavedLogs from "./pages/SavedLogs/SavedLogs";
import SessionConfig from "./pages/SessionConfig/SessionConfig";
import UserSettings from "./pages/UserSettings/UserSettings";
import Page404 from "./pages/Page404/Page404";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route element={<ProtectedRoute />}>
              <Route path="home" element={<Home />} />
              <Route path="/session">
                <Route path="config" element={<SessionConfig />} />
                <Route path=":sessionId" element={<InSession />} />
              </Route>
              <Route path="/saved-logs" element={<SavedLogs />} />
              <Route path="/settings" element={<UserSettings />} />
              <Route path="*" element={<Page404 />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
