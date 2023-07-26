import { useState } from "react";
import { FaCheck, FaTimes, FaSkull } from "react-icons/fa";
import { axios } from "../../hooks/axios";
import "./UserSettings.scss";

const UserSettings = () => {
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const user = JSON.parse(window.localStorage.getItem("authData"));

  const handleDeleteClick = () => {
    setShowDeleteButton(false);
    axios.delete(`/users/${user._id}`);
    window.localStorage.removeItem("authData");
    window.location.reload();
  };

  return (
    <div className="user-settings">
      <h1 className="user-settings__title">Account</h1>
      <div className="user-settings__data">
        <h2>User data</h2>
        <p className="user-settings__data__username">
          Username: {user.username}
        </p>
        <p className="user-settings__data__email">Email: {user.email}</p>
      </div>
      <hr />
      <div className="user-settings__danger-zone">
        <h2 className="user-settings__danger-zone__title">
          Danger Zone <FaSkull />
        </h2>
        <small className="user-settings__danger-zone__message">
          "Are you sure you want to delete your account? This action cannot be
          undone."
        </small>
        <button
          className="user-settings__danger-zone__delete-button"
          onClick={() => setShowDeleteButton(true)}
        >
          Delete Account
        </button>
        {showDeleteButton && (
          <div className="user-settings__danger-zone__delete-confirm">
            <p>Are you sure you want to delete your account?</p>
            <div className="user-settings__danger-zone__delete-confirm__buttons">
              <button onClick={handleDeleteClick}>
                <FaCheck /> Yes
              </button>
              <button onClick={() => setShowDeleteButton(false)}>
                <FaTimes /> No
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSettings;
