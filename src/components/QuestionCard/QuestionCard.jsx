import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTrashAlt, FaRegEdit, FaTimes, FaRegSave } from "react-icons/fa";
import { axios } from "../../hooks/axios";
import { v4 } from "uuid";

import "./QuestionCard.scss";

const SessionCard = ({
  sQuestion = {
    id: v4(),
    question: "",
    timeToThink: 15,
    timeToAnswer: 15,
  },
  activeSession,
  setActiveSession,
  addQuestionMode,
  setAddQuestionMode,
}) => {
  const queryClient = useQueryClient();
  const [question, setQuestion] = useState(sQuestion);

  const patchSession = async (sessionData) => {
    axios.patch(`/journal-sessions/${activeSession._id}`, sessionData);
  };

  const addQuestionMutation = useMutation({
    mutationFn: () => {
      patchSession({ questions: [...activeSession.questions, question] });
    },
    onMutate: () => {
      const tmpSession = {
        ...activeSession,
        questions: [...activeSession.questions, question],
      };
      setActiveSession(tmpSession);
      setAddQuestionMode(false);
      return () => setActiveSession(activeSession);
    },
    onError: (err, id, rollback) => rollback(),
    onSettled: () => queryClient.invalidateQueries("savedSessions"),
  });

  const deleteQuestionMutation = useMutation({
    mutationFn: () =>
      patchSession({
        questions: activeSession.questions.filter((q) => q.id !== question.id),
      }),
    onMutate: () => {
      const updatedQuestions = activeSession?.questions.filter(
        (q) => q.id !== question.id
      );
      const tmpSession = {
        ...activeSession,
        questions: updatedQuestions,
      };
      setActiveSession(tmpSession);
      return () => setActiveSession(activeSession);
    },
    onError: (err, id, rollback) => rollback(),
    onSettled: () => queryClient.invalidateQueries("savedSessions"),
  });

  const updateQuestionMutation = useMutation({
    mutationFn: () => patchSession({ questions: activeSession.questions }),
    onMutate: () => {
      const updatedQuestions = activeSession?.questions.map((q) =>
        q.id === question.id ? question : q
      );
      const tmpSession = {
        ...activeSession,
        questions: updatedQuestions,
      };
      setActiveSession(tmpSession);
      return () => setActiveSession(activeSession);
    },
    onError: (err, id, rollback) => rollback(),
    onSettled: () => queryClient.invalidateQueries("savedSessions"),
  });
  return (
    <div className="questionCard">
      {addQuestionMode ? (
        <div>
          <FaTimes
            className="btn-note"
            onClick={() => setAddQuestionMode(false)}
          />
          <FaRegSave
            className="btn-note"
            onClick={() => addQuestionMutation.mutate()}
          />
        </div>
      ) : (
        <div>
          <FaTrashAlt
            className="btn-note"
            onClick={() => deleteQuestionMutation.mutate()}
          />
          <FaRegEdit
            className="btn-note"
            onClick={() => updateQuestionMutation.mutate()}
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
            setQuestion({ ...question, timeToThink: parseInt(e.target.value) })
          }
          className="timeSelectInput"
          type="number"
          defaultValue={sQuestion.timeToThink}
        />
        <label className="timeSelectLabel">Time to answer: </label>
        <input
          onChange={(e) =>
            setQuestion({ ...question, timeToAnswer: parseInt(e.target.value) })
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
