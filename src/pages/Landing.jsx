import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../hooks/useStore";

import "./Landing.scss";

const Landing = () => {
  const authData = useStore((state) => state.authData);
  const navigate = useNavigate();

  useEffect(() => {
    if (authData) navigate("/home");
  }, [authData, navigate]);

  return (
    <div className="landing-container">
      <h1>🎤 Speech journal 🎤</h1>
      <p className="hero-text">
        Speech journal is a tool to help you improve your speech and
        communication skills while journaling.
      </p>
      <p>
        It allows you to record your speech and then analyze it to find out what
        you can improve.
      </p>
      <p>It also allows you to save your sessions and review them later.</p>
      <img className="hero-img" src="/speech-journal-hero.png" alt="hero" />
    </div>
  );
};

export default Landing;
