import React, { useState } from "react";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import "./QuestionCard.scss";

const SessionCard = ({
  sQuestion,
  deleteQuestion,
  addQuestion,
  editQuestion,
  addMode,
  setAddMode,
}) => {
  const [question, setQuestion] = useState(sQuestion);
  return (
    <>
      <div className="questionCard">
        {addMode ? (
          <button onClick={() => setAddMode(false)}>X</button>
        ) : (
          <div>
            <button
              className="btn-note"
              onClick={() => deleteQuestion(question.id)}
            >
              <FaTrashAlt />
            </button>
            <button className="btn-note" onClick={() => editQuestion(question)}>
              <FaRegEdit />
            </button>
          </div>
        )}
        <h3>{sQuestion.question}</h3>
        <input
          onChange={(e) =>
            setQuestion({ ...question, question: e.target.value })
          }
          className="question"
          type="text"
          placeholder="Question?"
        />
        <div className="timeSelectSection">
          <label>Time to think: </label>
          <input
            onChange={(e) =>
              setQuestion({ ...question, timeToThink: e.target.value })
            }
            className="timeSelectInput"
            type="number"
            defaultValue={sQuestion.timeToThink}
          />
          <label>Time to answer: </label>
          <input
            onChange={(e) =>
              setQuestion({ ...question, timeToAnswer: e.target.value })
            }
            className="timeSelectInput"
            type="number"
            defaultValue={sQuestion.timeToAnswer}
          />
        </div>
      </div>
      {addMode && (
        <button onClick={() => addQuestion(question)}>Add question</button>
      )}
    </>
  );
};

export default SessionCard;
