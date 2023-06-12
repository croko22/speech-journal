import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../hooks/useStore";
import "./Landing.scss";
import Footer from "../../components/Footer/Footer";

const Landing = () => {
  const authData = useStore((state) => state.authData);
  const navigate = useNavigate();

  useEffect(() => {
    if (authData) navigate("/home");
  }, [authData, navigate]);

  return (
    // <div className="landing-container">
    //   <div className="hero">
    //     <div className="">
    //       <h1> Speech journal 🎤</h1>
    //       <p className="hero-text">
    //         Speech journal is a tool to help you improve your speech and
    //         communication skills while journaling.
    //       </p>
    //       <p>
    //         It allows you to record your speech and then analyze it to find out
    //         what you can improve.
    //       </p>
    //       <small>
    //         It also allows you to save your sessions and review them later.
    //       </small>
    //       <br />
    //       <a className="login" >
    //         Join now
    //       </a>
    //     </div>
    //   </div>
    // </div>
    <div className="landing-page">
      <section className="hero">
        <div className="container">
          <h1 className="title">Speech Journal 🎤</h1>
          <p className="subtitle">
            Effortless journaling with the power of your voice
          </p>
          <div className="cta">
            <a className="btn" href="/auth">
              Get Started
            </a>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="feature">
            <img src="/speech-journal-hero.png" alt="Feature 1" />
            <h2 className="feature-title">Voice-Activated Journaling</h2>
            <p className="feature-description">
              Record your thoughts and experiences simply by speaking, and let
              our advanced voice recognition technology transcribe your entries
              with accuracy.
            </p>
          </div>

          <div className="feature">
            <img src="/speech-journal-hero.png" alt="Feature 2" />
            <h2 className="feature-title">Set Journal Sessions</h2>
            <p className="feature-description">
              Plan your journaling sessions in advance, set reminders, and
              create a consistent habit of self-reflection and personal growth.
            </p>
          </div>

          <div className="feature">
            <img src="/speech-journal-hero.png" alt="Feature 3" />
            <h2 className="feature-title">Secure and Private</h2>
            <p className="feature-description">
              Your journal entries are encrypted and stored securely. You have
              full control over your data, ensuring utmost privacy and
              confidentiality.
            </p>
          </div>
        </div>
      </section>

      <section className="pricing">
        <div className="container">
          <h2 className="pricing-title">Choose Your Plan</h2>
          <div className="pricing-cards">
            <div className="pricing-card">
              <h3 className="pricing-card-title">Free Plan</h3>
              <p className="pricing-card-price">$0</p>
              <ul className="pricing-card-features">
                <li>Basic features</li>
                <li>Limited notes (Once per day)</li>
                <li>Single user</li>
              </ul>
              <button className="btn">Get Started</button>
            </div>
            <div className="pricing-card">
              <h3 className="pricing-card-title">Premium Plan</h3>
              <p className="pricing-card-price">$4.99/month</p>
              <ul className="pricing-card-features">
                <li>All features included</li>
                <li>Unlimited notes</li>
                <li>Multiple users</li>
              </ul>
              <button className="btn btn-secondary">Subscribe Now</button>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-description">
            Experience the power of voice-activated journaling today.
          </p>
          <button className="btn">Sign Up Now</button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Landing;