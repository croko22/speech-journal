import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import SessionCard from "../components/SessionCard/SessionCard";
import ActiveSession from "../components/ActiveSession/ActiveSession";
import "./SessionConfig.scss";

const SessionConfig = () => {
  const [savedSessions, setSavedSessions] = useState([]);
  const [addSessionMode, setAddSessionMode] = useState(false);
  const [activeSession, setActiveSession] = useState({});

  const templateSession = {
    _id: 0,
    name: "New session",
    questions: [],
  };

  //?Query DB for sessions
  useEffect(() => {
    const fetchLogs = async () => {
      const res = await axios.get(
        `http://localhost:3000/journal-sessions/${
          JSON.parse(localStorage.getItem("authData"))._id
        }`
      );
      setSavedSessions(res.data);
      setActiveSession(res.data[0]);
    };
    fetchLogs();
  }, []);

  return (
    <div className="sessionConfig">
      {/* //TODO: Split into a new component */}
      <div className="sessions-container box">
        <h1>Journal Sessions</h1>
        {
          //*Rendered SessionCards
          savedSessions.map((session) => (
            <SessionCard
              key={session._id}
              session={session}
              activeSession={activeSession}
              setActiveSession={setActiveSession}
            />
          ))
        }
        {addSessionMode ? (
          <SessionCard
            key={0}
            session={templateSession}
            addSessionMode={addSessionMode}
            setAddSessionMode={setAddSessionMode}
            setActiveSession={setActiveSession}
          />
        ) : (
          <button
            className="newSessionBtn"
            onClick={() => {
              setActiveSession(templateSession);
              setAddSessionMode(true);
            }}
          >
            <FaPlus /> Add new session
          </button>
        )}
      </div>
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
