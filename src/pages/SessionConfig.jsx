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

  //TODO: updateQuestion | Then implement in MONGO
  const updateQuestion = (id, question) => {
    setSession(session.map((q) => (q.id === id ? question : q)));
  };

  return (
    <div className="sessionConfig">
      <div className="sessions-container box">
        <h1>Sessions</h1>
        {
          //*Rendered SessionCards
          session.map((question) => (
            <div className="session-card" key={question.id}>
              <h2>Session 1</h2>
              <p>{question.question}</p>
              <p>
                Time:{" "}
                {parseInt(question.timeToAnswer) +
                  parseInt(question.timeToThink)}
                {"s"}
              </p>
            </div>
          ))
        }
      </div>
      <div className="questions-container box">
        {/* //*Rendered QuestionCards*/}
        <h1>Questions</h1>
        {session.map((question) => (
          <QuestionCard
            key={question.id}
            sQuestion={question}
            deleteQuestion={deleteQuestion}
            updateQuestion={updateQuestion}
          />
        ))}
        {addMode ? (
          <QuestionCard
            sQuestion={{
              id: 0,
              question: "New question",
              timeToThink: 15,
              timeToAnswer: 15,
            }}
            addQuestion={addQuestion}
            addMode={addMode}
            setAddMode={setAddMode}
          />
        ) : (
          <button className="newQuestionBtn" onClick={() => setAddMode(true)}>
            <FaPlus /> Add new question
          </button>
        )}
      </div>
    </div>
  );
};

export default SessionConfig;
