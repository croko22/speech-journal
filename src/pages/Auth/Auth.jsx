import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { axios } from "../../hooks/axios";
import storage from "../../hooks/storage";
import Login from "../../components/Auth/Login";
import Register from "../../components/Auth/Register";
import "./Auth.scss";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState("login"); // ["login", "register"]
  const authData = storage.getToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (authData) {
      navigate("/home");
      navigate(0);
    }
  }, [authData, navigate]);

  return (
    <main>
      <section className="section-login">
        <div className="section-main">
          <div className="section-login-1">
            <div className="section-login-1-main">
              <h1 className="section-login-1-title">🎤 Speech journal</h1>
              <p className="section-login-1-text">
                Journaling by recording your speech
              </p>
              <div className="section-login-1-img">
                <img src="sj-mock.png" alt="Speech journal mockup" />
              </div>
            </div>
          </div>
          <div className="section-login-2">
            <div className="section-login-2-main">
              {authMode === "login" ? (
                <Login
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                />
              ) : (
                <Register
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                />
              )}
              {authMode === "login" ? (
                <p>
                  Don't have an account?{" "}
                  <button onClick={() => setAuthMode("register")}>
                    Register
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <button onClick={() => setAuthMode("login")}>Login</button>
                </p>
              )}
              <p>or</p>
              {/* 
              //TODO: Acoplar gAuth 
              //TODO: Arreglar el backend pa que reciba un token de google y lo valide
              */}

              {/* <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  const response = await axios.post(`/auth/google`, {
                    token: credentialResponse.credential,
                  });
                  storage.setToken(response.data);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              /> */}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Auth;
