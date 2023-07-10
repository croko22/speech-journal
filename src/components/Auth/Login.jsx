import React from "react";
import { useStore } from "../../hooks/useStore";
import axios from "axios";

const Login = ({ email, setEmail, password, setPassword }) => {
  const setAuthData = useStore((state) => state.setAuthData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      if (response.status === 201) {
        const data = response.data;
        console.log(data);
        localStorage.setItem("authData", JSON.stringify(data.user));
        setAuthData(data);
      } else console.log("Login failed");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="section-login-2-form" onSubmit={handleSubmit}>
      <h1 className="section-login-2-title">Login</h1>
      <div className="login-form-1">
        <label htmlFor="input-email">Email</label>
        <input
          type="text"
          id="input-email"
          placeholder="wallace@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="login-form-3">
        <label htmlFor="input-password">Password</label>
        <input
          type="password"
          id="input-password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="login-form-4">
        <p>
          Welcome back! Check out our <a href="#">Blog post</a> on how to use
          Speech journal
        </p>
      </div>
      <div className="login-form-submit-btn">
        <button>Sign in</button>
      </div>
    </form>
  );
};

export default Login;
