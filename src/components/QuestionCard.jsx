import React, { useState } from "react";
import { FaTrashAlt, FaRegEdit, FaTimes, FaRegSave } from "react-icons/fa";
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
          <div className="btnsBox">
            <button className="btn-note">
              <FaTimes onClick={() => setAddMode(false)} />
            </button>
            <button className="btn-note" onClick={() => addQuestion(question)}>
              <FaRegSave />
            </button>
          </div>
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
          className="questionInput"
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
    </>
  );
};

export default SessionCard;
