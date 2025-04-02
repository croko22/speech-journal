import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axios } from "../../hooks/axios";
import { toast } from "sonner";

const Register = ({ email, setEmail, password, setPassword }) => {
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/auth/register`, {
        username,
        email,
        password,
      });
      if (response.status === 201) {
        navigate("/login");
        toast.success("Registration successful");
      } else console.log("Register failed");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <form className="section-login-2-form" onSubmit={handleSubmit}>
      <h1 className="section-login-2-title">Register</h1>
      <div className="login-form-1">
        <label htmlFor="input-username">Username</label>
        <input
          type="text"
          id="input-username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
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
        <input type="checkbox" id="input-checkbox" required />
        <p>
          By creating an account, you agree to the{" "}
          <a href="#">Terms & Conditions.</a>
        </p>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="login-form-submit-btn">
        <button>Create an Account</button>
      </div>
    </form>
  );
};

export default Register;
