import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTrashAlt, FaRegEdit, FaTimes, FaRegSave } from "react-icons/fa";
import axios from "axios";
import "./SessionCard.scss";

const SessionCard = ({
  session = {
    name: "",
    questions: [],
  },
  addSessionMode,
  setAddSessionMode,
  activeSession,
  setActiveSession,
  savedSessions,
  setSavedSessions,
}) => {
  const queryClient = useQueryClient();
  const [sessionName, setSessionName] = useState(session.name);

  const createSessionMutation = useMutation({
    mutationFn: async () => {
      await axios.post(`http://localhost:3000/journal-sessions`, {
        user: JSON.parse(localStorage.getItem("authData"))._id,
        name: sessionName,
        questions: [],
      });
    },
    onMutate: () => {
      const tmpSession = {
        ...session,
        name: sessionName,
      };
      setSavedSessions([...savedSessions, tmpSession]);
      setAddSessionMode(false);
      setActiveSession(savedSessions[savedSessions.length - 1]);
    },
    onSettled: () => queryClient.invalidateQueries("savedSessions"),
  });

  const deleteSessionMutation = useMutation({
    mutationFn: () =>
      axios.delete(`http://localhost:3000/journal-sessions/${session._id}`),
    onMutate: () => {
      const updatedSessions = savedSessions.filter(
        (s) => s._id !== session._id
      );
      setSavedSessions(updatedSessions);
    },
    onSettled: () => queryClient.invalidateQueries("savedSessions"),
  });

  return (
    <div
      className={`session-card ${
        activeSession?._id === session?._id && "active"
      }`}
      onClick={() => setActiveSession(session)}
    >
      <div className="session-card-header">
        <input
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
          className="sessionInput"
          type="text"
          placeholder="Session name"
        />
        {addSessionMode ? (
          <div className="btn-container">
            <FaRegSave
              className="btn-note"
              onClick={() => createSessionMutation.mutate()}
            />
            <FaTimes
              className="btn-note"
              onClick={() => setAddSessionMode(false)}
            />
          </div>
        ) : (
          <div className="btn-container">
            <FaRegEdit className="btn-note" onClick={() => {}} />
            <FaTrashAlt
              className="btn-note"
              onClick={() => deleteSessionMutation.mutate()}
            />
          </div>
        )}
      </div>
      <p>
        Time:{" "}
        {session.questions.reduce(
          (acc, cur) => acc + cur.timeToAnswer + cur.timeToThink,
          0
        )}
        {"s"}
      </p>
    </div>
  );
};

export default SessionCard;
