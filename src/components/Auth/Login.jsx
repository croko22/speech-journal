import { axios } from "../../hooks/axios";
import storage from "../../hooks/storage";

const Login = ({ email, setEmail, password, setPassword }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/auth/login`, {
        email,
        password,
      });

      if (res.status === 201) storage.setToken(res.data);
      else console.log("Login failed");
      //console.log(res.data);
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
