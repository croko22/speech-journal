import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecordNote from "../components/RecordNote";
import "./InSession.scss";
import axios from "axios";

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
  const [counter, setCounter] = useState(currentQuestion?.timeToThink || 0);
  //?Handle speech input
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState({
    question: currentQuestion?.question || "",
    answer: "",
  });
  const [allNotes, setAllNotes] = useState([]);
  //TODO: Send notes to backend
  const handleSaveNote = () => {
    const log = {
      qas: allNotes,
      user: JSON.parse(localStorage.getItem("authData"))._id,
    };
    const storedLogs = JSON.parse(localStorage.getItem("Logs")) || [];
    const tmpLogs = [...storedLogs, log];
    localStorage.setItem("Logs", JSON.stringify(tmpLogs));
    const saveNote = async () => {
      await axios.post("http://localhost:3000/journal-entries", {
        qas: allNotes,
        user: JSON.parse(localStorage.getItem("authData"))._id,
      });
    };
    saveNote();
  };

  //? Timer
  useEffect(() => {
    if (counter > 0) {
      if (!currentQuestion) navigate("/session");
      setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      switch (questionsPhase) {
        case "think":
          setQuestionsPhase(quesTionPhases[1]);
          setCounter(currentQuestion?.timeToAnswer);
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
              answer: "",
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
            currentQuestion?.question}
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
