import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import InSession from "./pages/InSession";
import SessionConfig from "./pages/SessionConfig";

function App() {
  return (
    <>
      {/* //TODO: Hacer una store de la data en sustand */}
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/session" element={<SessionConfig />} />
          <Route path="/session/:sessionId" element={<SessionConfig />} />
          <Route path="/in-session" element={<InSession />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
