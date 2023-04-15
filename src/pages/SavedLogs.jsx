import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import "./SavedLogs.scss";

const SavedLogs = () => {
  const [savedLogs, setSavedLogs] = useState(
    JSON.parse(localStorage.getItem("Logs")) || []
  );

  const deleteLog = (id) => {
    const tmpLogs = savedLogs.filter((log) => log.id !== id);
    setSavedLogs(tmpLogs);
  };

  useEffect(() => {
    localStorage.setItem("Logs", JSON.stringify(savedLogs));
  }, [savedLogs]);

  return (
    <div>
      <h1>Saved logs</h1>
      <ul className="logs-containter">
        {savedLogs.map((log, index) => (
          <li className="log-card" key={index}>
            <p className="date">
              {/* {log.date} */}
              <FaTrashAlt onClick={() => deleteLog(log.id)} />
            </p>
            {log.qas.map((qa, index) => (
              <div key={index}>
                <h5>{qa.question}</h5>
                <p>{qa.answer}</p>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedLogs;
