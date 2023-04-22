import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import "./SavedLogs.scss";

const SavedLogs = () => {
  const queryClient = useQueryClient();
  const [savedLogs, setSavedLogs] = useState([]);

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
  const deleteLogMutation = useMutation({
    mutationFn: (id) =>
      axios.delete(`http://localhost:3000/journal-entries/${id}`),
    onMutate: (id) => {
      const oldLogs = savedLogs;
      const newLogs = oldLogs.filter((log) => log._id !== id);
      setSavedLogs(newLogs);
      return () => setSavedLogs(oldLogs);
    },
    onError: (err, id, rollback) => rollback(),
    onSettled: () => queryClient.invalidateQueries("savedLogs"),
  });

  return (
    <div className="logs-containter">
      <h1>Saved logs</h1>
      <ul className="logs-grid">
        {savedLogs.map((log, index) => (
          <li className="log-card" key={index}>
            <div className="date">
              <small>{log.dateAdded?.slice(0, 10)}</small>{" "}
              <FaTrashAlt onClick={() => deleteLogMutation.mutate(log._id)} />
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
