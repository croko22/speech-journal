import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { v4 } from "uuid";
import QuestionCard from "../components/QuestionCard";
import "./SessionConfig.scss";

const SessionConfig = () => {
  const storedSessions = JSON.parse(localStorage.getItem("Sessions"));
  const [session, setSession] = useState(storedSessions || []);
  const [addMode, setAddMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("Sessions", JSON.stringify(session));
  }, [session]);

  const addQuestion = (question) => {
    let tmpQuestion = { ...question, id: v4() };
    setSession([...session, tmpQuestion]);
    setAddMode(false);
  };

  const deleteQuestion = (id) => {
    setSession(session.filter((question) => question.id !== id));
  };

  //TODO: Fix editQuestion
  const editQuestion = (question) => {
    deleteQuestion(question.id);
    addQuestion(question);
  };

  return (
    <div className="sessionConfig">
      <h1>Session configuration</h1>
      {/* //*Rendered QuestionCards*/}
      {session.map((question) => (
        <QuestionCard
          key={question.id}
          sQuestion={question}
          deleteQuestion={deleteQuestion}
          editQuestion={editQuestion}
        />
      ))}
      {addMode ? (
        <QuestionCard
          sQuestion={{
            id: 0,
            question: "New question",
            timeToThink: 60,
            timeToAnswer: 60,
          }}
          addQuestion={addQuestion}
          addMode={addMode}
          setAddMode={setAddMode}
        />
      ) : (
        <button onClick={() => setAddMode(true)}>
          <FaPlus /> Add new question
        </button>
      )}
    </div>
  );
};

export default SessionConfig;
