import React from "react";
import "./SavedLogs.scss";

const SavedLogs = () => {
  const savedLogs = JSON.parse(localStorage.getItem("Logs")) || [];

  const deleteLog = (id) => {
    const tmpLogs = savedLogs.filter((log) => log.id !== id);
    localStorage.setItem("Logs", JSON.stringify(tmpLogs));
  };

  return (
    <div>
      <ul className="logs-containter">
        {savedLogs.map((log, index) => (
          <li className="log-card" key={index}>
            <p className="date">{log.date}</p>
            {log.QAs.map((qa, index) => (
              <div key={index}>
                <h5>{qa.question}</h5>
                <p>{qa.text}</p>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedLogs;
