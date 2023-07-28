import { useState, useEffect } from "react";
import { useStore } from "../../hooks/useStore";
import { axios } from "../../hooks/axios";
import SessionsList from "../../components/SessionsList/SessionsList";
import ActiveSession from "../../components/ActiveSession/ActiveSession";
import "./SessionConfig.scss";

const SessionConfig = () => {
  const [savedSessions, setSavedSessions] = useState([]);
  const [activeSession, setActiveSession] = useState({});
  const authData = useStore((state) => state.authData);

  //?Query DB for sessions
  useEffect(() => {
    const fetchLogs = async () => {
      const res = await axios.get(`/journal-sessions/${authData._id}`);
      setSavedSessions(res.data);
    };
    fetchLogs();
  }, []);

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
