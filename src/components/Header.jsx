import { NavLink } from "react-router-dom";
import { FaCog, FaFileAlt, FaPlay } from "react-icons/fa";
import "./Header.scss";

const Header = () => {
  return (
    <header>
      <a className="header-title" href="/">
        🎤 Speech Journal
      </a>
      <nav>
        <NavLink
          className={({ isActive }) =>
            isActive ? "active-header-link" : "header-link"
          }
          to="/session"
        >
          <FaCog className="icon" />
          <span>Journal Session</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "active-header-link" : "header-link"
          }
          to="/saved-logs"
        >
          <FaFileAlt className="icon" />
          <span>Saved logs</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "active-header-link" : "header-link"
          }
          to="/in-session"
        >
          <FaPlay className="icon" />
          <span>Start session</span>
        </NavLink>
        {window.localStorage.getItem("authData") && (
          <button
            className="logout"
            onClick={() => {
              window.localStorage.removeItem("authData");
              window.location.reload();
            }}
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
