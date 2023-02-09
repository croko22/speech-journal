import { FaCog, FaFileAlt, FaPlay } from "react-icons/fa";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <a className="header-title" href="/">
        🎤 Speech Journal
      </a>
      <div>
        <a className="header-link" href="/session">
          <FaCog className="icon" /> Journal Session
        </a>
        <a className="header-link" href="/">
          <FaFileAlt className="icon" />
          Saved logs
        </a>
        <a className="header-link" href="/in-session">
          <FaPlay className="icon" />
          Start session
        </a>
      </div>
    </div>
  );
};

export default Header;
