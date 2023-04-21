import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import axios from "axios";
import "./SavedLogs.scss";

const SavedLogs = () => {
  const [savedLogs, setSavedLogs] = useState(
    JSON.parse(localStorage.getItem("Logs")) || []
  );

  //* Fetch logs from DB
  useEffect(() => {
    const fetchLogs = async () => {
      const res = await axios.get(
        `http://localhost:3000/journal-entries/${
          JSON.parse(localStorage.getItem("authData"))._id
        }`
      );
      // console.log(res.data);
      setSavedLogs(res.data);
    };
    fetchLogs();
  }, []);

  //TODO: Probar optimistic update with react-query
  const deleteLog = async (id) => {
    console.log(id);
    await axios.delete(`http://localhost:3000/journal-entries/${id}`);
  };

  useEffect(() => {
    localStorage.setItem("Logs", JSON.stringify(savedLogs));
  }, [savedLogs]);

  return (
    <div className="logs-containter">
      <h1>Saved logs</h1>
      <ul className="logs-grid">
        {savedLogs.map((log, index) => (
          <li className="log-card" key={index}>
            <div className="date">
              <small>{log.dateAdded.slice(0, 10)}</small>{" "}
              <FaTrashAlt onClick={() => deleteLog(log._id)} />
            </div>
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
