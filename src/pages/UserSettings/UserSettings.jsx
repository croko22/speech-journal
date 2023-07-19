import { useState } from "react";
import { FaCheck, FaTimes, FaSkull } from "react-icons/fa";
import axios from "axios";
import "./UserSettings.scss";

const UserSettings = () => {
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const user = JSON.parse(window.localStorage.getItem("authData"));

  const handleDeleteClick = () => {
    setShowDeleteButton(false);
    axios.delete(`${import.meta.env.VITE_API_URL}/users/${user._id}`);
    window.localStorage.removeItem("authData");
    window.location.reload();
  };

  return (
    <div className="user-settings-page">
      <h1 className="page-title">Account</h1>
      <p className="username">Username: {user.username}</p>
      <p className="email">Email: {user.email}</p>
      <h2>
        Danger Zone <FaSkull />
      </h2>
      <small>
        "Are you sure you want to delete your account? This action cannot be
        undone."
      </small>
      <button
        className="delete-button"
        onClick={() => setShowDeleteButton(true)}
      >
        Delete Account
      </button>
      {showDeleteButton && (
        <div className="delete-confirm">
          <p>Are you sure you want to delete your account?</p>
          <div className="delete-confirm__buttons">
            <button
              className="delete-confirm__buttons-button"
              onClick={handleDeleteClick}
            >
              <FaCheck /> Yes
            </button>
            <button
              className="delete-confirm__buttons-button"
              onClick={() => setShowDeleteButton(false)}
            >
              <FaTimes /> No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSettings;
