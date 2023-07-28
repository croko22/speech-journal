import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useStore } from "../../hooks/useStore";
import { axios } from "../../hooks/axios";
import "./SavedLogs.scss";

const SavedLogs = () => {
  const queryClient = useQueryClient();
  const authData = useStore((state) => state.authData);
  const [savedLogs, setSavedLogs] = useState([]);

  //* Fetch logs from DB
  useEffect(() => {
    const fetchLogs = async () => {
      const res = await axios.get(`/journal-entries/${authData._id}`);
      setSavedLogs(res.data);
    };
    fetchLogs();
  }, []);

  const deleteLogMutation = useMutation({
    mutationFn: (id) => axios.delete(`journal-entries/${id}`),
    onMutate: (id) => {
      const newLogs = savedLogs.filter((log) => log._id !== id);
      setSavedLogs(newLogs);
      return () => setSavedLogs(newLogs);
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
            <p className="log-card__date">
              <small>{log.dateAdded?.slice(0, 10)}</small>{" "}
              <FaTrashAlt
                className="log-card__date__delete-log-icon"
                onClick={() => deleteLogMutation.mutate(log._id)}
              />
            </p>
            {log.qas.map((qa, index) => (
              <div key={index}>
                <h5>{qa.question}</h5>
                <p className="log-card__answer">{qa.answer}</p>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedLogs;
