import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import QuestionCard from "../QuestionCard/QuestionCard";

const ActiveSession = ({
  activeSession,
  setActiveSession,
  savedSessions,
  setSavedSessions,
}) => {
  const [addQuestionMode, setAddQuestionMode] = useState(false);

  useEffect(() => {
    setSavedSessions(
      savedSessions.map((s) =>
        s._id === activeSession._id ? activeSession : s
      )
    );
  }, [activeSession]);

  return (
    <div className="questions-container box">
      <div className="qc-header">
        <h1>{activeSession?.name}</h1>
      </div>
      {/* //*Rendered QuestionCards*/}
      {activeSession?.questions?.map((question) => (
        <QuestionCard
          key={question.id}
          sQuestion={question}
          activeSession={activeSession}
          setActiveSession={setActiveSession}
        />
      ))}
      {addQuestionMode ? (
        <QuestionCard
          activeSession={activeSession}
          setActiveSession={setActiveSession}
          addQuestionMode={addQuestionMode}
          setAddQuestionMode={setAddQuestionMode}
        />
      ) : (
        <button
          className="newQuestionBtn"
          onClick={() => setAddQuestionMode(true)}
        >
          <FaPlus /> Add new question
        </button>
      )}
    </div>
  );
};

export default ActiveSession;
