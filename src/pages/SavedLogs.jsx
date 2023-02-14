import React from "react";

const SavedLogs = () => {
  const savedLogs = JSON.parse(localStorage.getItem("Logs")) || [];
  return (
    <div>
      <h1>Saved Logs</h1>
      <ul>
        {savedLogs.map((log, index) => (
          <li key={index}>
            <p>{log.date}</p>
            {log.QAs.map((qa, index) => (
              <div key={index}>
                <p>{qa.question}</p>
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
