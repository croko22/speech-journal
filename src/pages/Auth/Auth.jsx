import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../hooks/useStore";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./Auth.scss";

const Auth = () => {
  const setAuthData = useStore((state) => state.setAuthData);
  const authData = useStore((state) => state.authData);
  const navigate = useNavigate();

  useEffect(() => {
    if (authData) navigate("/home");
  }, [authData, navigate]);

  return (
    <main>
      <section class="section-login">
        <div class="section-main">
          <div class="section-login-1">
            <div class="section-login-1-main">
              <h1 class="section-login-1-title">🎤 Speech journal</h1>
              <p class="section-login-1-text">
                Journaling by recording your speech
              </p>
              <div class="section-login-1-img">
                <img
                  src="https://rvs-gradie-signup-page.vercel.app/Assets/iPhone-Mockup.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="section-login-2">
            <div class="section-login-2-main">
              <h1 class="section-login-2-title">Login</h1>
              <form class="section-login-2-form">
                <div class="login-form-1">
                  <label for="input-email">Email</label>
                  <input
                    type="text"
                    id="input-email"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div class="login-form-2">
                  <label for="input-name">Full Name</label>
                  <input
                    type="text"
                    id="input-name"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div class="login-form-3">
                  <label for="input-password">Password</label>
                  <input
                    type="password"
                    id="input-password"
                    placeholder="At least 8 characters"
                    required
                  />
                </div>
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    const response = await axios.post(
                      "http://localhost:3000/login",
                      {
                        token: credentialResponse.credential,
                      }
                    );
                    const data = response.data;
                    localStorage.setItem("authData", JSON.stringify(data));

                    setAuthData(data);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
                <div class="login-form-4">
                  <input type="checkbox" id="input-checkbox" />
                  <p>
                    By creating an account, you agree to the{" "}
                    <a href="#">Terms & Conditions.</a>
                  </p>
                </div>
                <div class="login-form-submit-btn">
                  <button>Create an Account</button>
                </div>
                <div class="login-form-5">
                  <p>
                    {/* Already have an account? <a href="#">Sign In</a> */}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Auth;
