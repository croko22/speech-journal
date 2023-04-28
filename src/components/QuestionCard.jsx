import React, { useState } from "react";
import { FaTrashAlt, FaRegEdit, FaTimes, FaRegSave } from "react-icons/fa";
import "./QuestionCard.scss";

const SessionCard = ({
  sQuestion,
  deleteQuestion,
  addQuestion,
  updateQuestion,
  addMode,
  setAddMode,
}) => {
  const [question, setQuestion] = useState(sQuestion);
  return (
    <div className="questionCard">
      {addMode ? (
        <div>
          <FaTimes className="btn-note" onClick={() => setAddMode(false)} />
          <FaRegSave
            className="btn-note"
            onClick={() => addQuestion(question)}
          />
        </div>
      ) : (
        <div>
          <FaTrashAlt
            className="btn-note"
            onClick={() => deleteQuestion(question.id)}
          />
          <FaRegEdit
            className="btn-note"
            onClick={() => updateQuestion(question.id, question)}
          />
        </div>
      )}
      <input
        value={question.question}
        onChange={(e) => setQuestion({ ...question, question: e.target.value })}
        className="questionInput"
        type="text"
        placeholder="Question?"
      />
      <div className="timeSelectSection">
        <label className="timeSelectLabel">Time to think: </label>
        <input
          onChange={(e) =>
            setQuestion({ ...question, timeToThink: e.target.value })
          }
          className="timeSelectInput"
          type="number"
          defaultValue={sQuestion.timeToThink}
        />
        <label className="timeSelectLabel">Time to answer: </label>
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
  );
};

export default SessionCard;
