import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import RecordNote from "../components/RecordNote";
import "./InSession.scss";

const InSession = () => {
  const navigate = useNavigate();
  //? Get stored sessions
  const storedSessions = JSON.parse(localStorage.getItem("Sessions"));
  const [index, setIndex] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(storedSessions[0]);
  //? Question phases (Think, answer, next)
  const quesTionPhases = ["think", "answer", "next", "end"];
  const [questionsPhase, setQuestionsPhase] = useState(quesTionPhases[0]);
  //? Timer
  const [counter, setCounter] = useState(currentQuestion.timeToThink);
  //?Handle speech input
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState({
    question: currentQuestion.question,
    text: "",
  });
  const [allNotes, setAllNotes] = useState([]);

  const handleSaveNote = () => {
    const log = {
      id: v4(),
      date: new Date().toLocaleDateString(),
      QAs: allNotes,
    };
    const storedLogs = JSON.parse(localStorage.getItem("Logs")) || [];
    const tmpLogs = [...storedLogs, log];
    localStorage.setItem("Logs", JSON.stringify(tmpLogs));
  };

  //? Timer
  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      switch (questionsPhase) {
        case "think":
          setQuestionsPhase(quesTionPhases[1]);
          setCounter(currentQuestion.timeToAnswer);
          setIsListening(true);
          break;
        case "answer":
          setQuestionsPhase(quesTionPhases[2]);
          setCounter(5);
          setIsListening(false);
          break;
        case "next":
          if (index < storedSessions.length) {
            setAllNotes([...allNotes, note]);
            setIndex(index + 1);
            setCurrentQuestion(storedSessions[index]);
            setCounter(storedSessions[index].timeToThink);
            setNote({
              question: storedSessions[index].question,
              text: "",
            });
            setQuestionsPhase(quesTionPhases[0]);
          } else {
            setAllNotes([...allNotes, note]);
            setQuestionsPhase(quesTionPhases[3]);
            setCounter(3);
          }
          break;
        case "end":
          setAllNotes([...allNotes, note]);
          handleSaveNote();
          navigate("/saved-logs");
          break;
        default:
          break;
      }
    }
  }, [counter]);

  return (
    <div className="session-container">
      <h1 className="session-title">
        {questionsPhase[0].toUpperCase() + questionsPhase.slice(1)}
      </h1>
      <p className="timer">{counter}</p>
      {
        <h1>
          {questionsPhase !== "next" &&
            questionsPhase !== "end" &&
            currentQuestion.question}
        </h1>
      }
      {questionsPhase === "think"
        ? "Think and reflect for some time..."
        : questionsPhase === "next"
        ? "New question incoming"
        : "I'm all ears... 👂👂👂"}
      <RecordNote
        note={note}
        setNote={setNote}
        isListening={isListening}
        setIsListening={setIsListening}
      />
    </div>
  );
};

export default InSession;
