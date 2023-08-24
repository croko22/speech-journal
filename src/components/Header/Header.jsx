import { FaCog, FaFileAlt, FaPlay, FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import storage from "../../hooks/storage";
import Dropdown from "react-dropdown";
import "./Header.scss";

const Header = () => {
  const authData = storage.getToken();
  const navigate = useNavigate();
  return (
    <header>
      <nav>
        <a className="header-title" href="/">
          🎤 Speech Journal
        </a>
        {authData ? (
          <>
            <NavLink
              className={`header-link ${({ isActive }) =>
                isActive ? "active-header-link" : ""}`}
              to="/home"
            >
              <FaPlay className="icon" />
              <span>Start session</span>
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
              to="/session/config"
            >
              <FaCog className="icon" />
              <span>Journal Session</span>
            </NavLink>
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
                      googleLogout();
                      storage.clearToken();
                      navigate("/");
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
