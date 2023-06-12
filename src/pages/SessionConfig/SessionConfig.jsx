import { useState, useEffect } from "react";
import SessionsList from "../../components/SessionsList/SessionsList";
import ActiveSession from "../../components/ActiveSession/ActiveSession";
import axios from "axios";
import "./SessionConfig.scss";

const SessionConfig = () => {
  const [savedSessions, setSavedSessions] = useState([]);
  const [activeSession, setActiveSession] = useState({});

  //?Query DB for sessions
  useEffect(() => {
    const fetchLogs = async () => {
      const res = await axios.get(
        `http://localhost:3000/journal-sessions/${
          JSON.parse(localStorage.getItem("authData"))._id
        }`
      );
      setSavedSessions(res.data);
    };
    fetchLogs();
  }, [activeSession, savedSessions]);

  return (
    <div className="sessionConfig">
      <SessionsList
        savedSessions={savedSessions}
        setSavedSessions={setSavedSessions}
        activeSession={activeSession}
        setActiveSession={setActiveSession}
      />
      <ActiveSession
        activeSession={activeSession}
        setActiveSession={setActiveSession}
        savedSessions={savedSessions}
        setSavedSessions={setSavedSessions}
      />
    </div>
  );
};

export default SessionConfig;