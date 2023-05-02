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
        {window.localStorage.getItem("authData") ? (
          <>
            <NavLink
              className={`header-link ${({ isActive }) =>
                isActive ? "active-header-link" : ""}`}
              to="/session"
            >
              <FaCog className="icon" />
              <span>Journal Session</span>
            </NavLink>
            <NavLink
              className={`header-link ${({ isActive }) =>
                isActive ? "active-header-link" : ""}`}
              to="/saved-logs"
            >
              <FaFileAlt className="icon" />
              <span>Saved logs</span>
            </NavLink>
            <NavLink
              className={`header-link ${({ isActive }) =>
                isActive ? "active-header-link" : ""}`}
              to="/in-session"
            >
              <FaPlay className="icon" />
              <span>Start session</span>
            </NavLink>
            <button
              className="logout"
              onClick={() => {
                window.localStorage.removeItem("authData");
                window.location.reload();
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <a className="login" href="/auth">
            Login
          </a>
        )}
      </nav>
    </header>
  );
};

export default Header;
