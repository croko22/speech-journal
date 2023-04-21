import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../hooks/useStore";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Landing = () => {
  const setAuthData = useStore((state) => state.setAuthData);
  const authData = useStore((state) => state.authData);
  const navigate = useNavigate();

  useEffect(() => {
    if (authData) navigate("/home");
  }, [authData, navigate]);

  return (
    <div className="container">
      <h1>Speech journal</h1>
      <p>
        Speech journal is a tool to help you improve your speech and
        communication skills.
      </p>
      <p>
        It allows you to record your speech and then analyze it to find out what
        you can improve.
      </p>
      <p>It also allows you to save your sessions and review them later.</p>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const response = await axios.post("http://localhost:3000/login", {
            token: credentialResponse.credential,
          });
          const data = response.data;
          localStorage.setItem("authData", JSON.stringify(data));

          setAuthData(data);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default Landing;
