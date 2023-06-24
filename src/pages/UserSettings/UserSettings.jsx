import { useState } from "react";
import "./UserSettings.scss";

const UserSettings = () => {
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const user = JSON.parse(window.localStorage.getItem("authData"));

  const handleDeleteClick = () => {
    setShowDeleteButton(false);
    console.log("Deleting account...", user._id);
  };

  return (
    <div className="user-settings-page">
      <h1 className="page-title">Account</h1>
      <p className="username">Username: {user.username}</p>
      <p className="email">Email: {user.email}</p>
      <p>
        <button
          className="delete-button"
          onClick={() => setShowDeleteButton(true)}
        >
          Delete Account
        </button>
      </p>
      {showDeleteButton && (
        <p className="delete-confirm">
          Are you sure you want to delete your account?
          <button className="delete-confirm-button" onClick={handleDeleteClick}>
            Yes
          </button>
          <button
            className="delete-confirm-button"
            onClick={() => setShowDeleteButton(false)}
          >
            No
          </button>
        </p>
      )}
    </div>
  );
};

export default UserSettings;
