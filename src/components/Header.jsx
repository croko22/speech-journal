import { NavLink } from "react-router-dom";
import { FaCog, FaFileAlt, FaPlay, FaUser } from "react-icons/fa";
import Dropdown from "react-dropdown";
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
            {/* //TODO: User dropdown, logout and settings */}
            <div className="header-link">
              <FaUser className="icon" />
              <Dropdown
                options={[
                  { value: "1", label: "Logout" },
                  { value: "2", label: "Settings" },
                ]}
                onChange={(e) => {
                  switch (e.value) {
                    case "1":
                      window.localStorage.removeItem("authData");
                      window.location.reload();
                      break;
                    case "2":
                      window.location.href = "/settings";
                      break;
                    default:
                      break;
                  }
                }}
                placeholder="User"
                className="dropdown"
                menuClassName="dropdown-menu"
                placeholderClassName="dropdown-placeholder"
              />
            </div>
          </>
        ) : (
          <a className="login" href="/auth">
            Sign in
          </a>
        )}
      </nav>
    </header>
  );
};

export default Header;
