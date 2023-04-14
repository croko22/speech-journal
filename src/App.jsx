import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import InSession from "./pages/InSession";
import SavedLogs from "./pages/SavedLogs";
import SessionConfig from "./pages/SessionConfig";
import Landing from "./pages/Landing";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    //TODO: Hacer una store de la data en sustand
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            {/* //TODO: Protect Auth routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/session"
              element={
                <ProtectedRoute>
                  <SessionConfig />
                </ProtectedRoute>
              }
            />
            <Route
              path="/saved-logs"
              element={
                <ProtectedRoute>
                  <SavedLogs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/in-session"
              element={
                <ProtectedRoute>
                  <InSession />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
