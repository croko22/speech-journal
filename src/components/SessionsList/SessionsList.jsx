import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import SessionCard from "../SessionCard/SessionCard";

const SessionsList = ({
  savedSessions,
  setSavedSessions,
  activeSession,
  setActiveSession,
}) => {
  const [addSessionMode, setAddSessionMode] = useState(false);

  return (
    <div className="sessions-container box">
      <h1>Journal Sessions</h1>
      {savedSessions.map((session, index) => (
        <SessionCard
          key={index}
          session={session}
          activeSession={activeSession}
          setActiveSession={setActiveSession}
          savedSessions={savedSessions}
          setSavedSessions={setSavedSessions}
        />
      ))}
      {addSessionMode ? (
        <SessionCard
          key={0}
          addSessionMode={addSessionMode}
          setAddSessionMode={setAddSessionMode}
          setActiveSession={setActiveSession}
          savedSessions={savedSessions}
          setSavedSessions={setSavedSessions}
        />
      ) : (
        <button
          className="newSessionBtn"
          onClick={() => {
            setActiveSession({ name: "", questions: [] });
            setAddSessionMode(true);
          }}
        >
          <FaPlus /> Add new session
        </button>
      )}
    </div>
  );
};

export default SessionsList;
