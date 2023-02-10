import React, { useEffect, useState } from "react";
import GrabarNota from "../components/GrabarNota";
import "./InSession.scss";

const InSession = () => {
  const storedSessions = JSON.parse(localStorage.getItem("Sessions"));
  const [index, setIndex] = useState(0);
  //? Question phases (Think, answer, next)
  const quesTionPhases = ["think", "answer", "next", "end"];
  const [questionsPhase, setQuestionsPhase] = useState(quesTionPhases[0]);
  const [currentQuestion, setCurrentQuestion] = useState(storedSessions[0]);
  const [counter, setCounter] = useState(currentQuestion.timeToThink);

  //? Timer
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter === 0 && questionsPhase === "think") {
      setQuestionsPhase(quesTionPhases[1]);
      setCounter(currentQuestion.timeToAnswer);
    }
    if (counter === 0 && questionsPhase === "answer") {
      setQuestionsPhase(quesTionPhases[2]);
      setCounter(5);
    }
    if (
      counter === 0 &&
      questionsPhase === "next" &&
      index < storedSessions.length
    ) {
      setIndex(index + 1);
      setCurrentQuestion(storedSessions[index]);
      setQuestionsPhase(quesTionPhases[0]);
      setCounter(currentQuestion.timeToThink);
    } else if (counter === 0 && questionsPhase === "next") {
      setQuestionsPhase(quesTionPhases[3]);
    }
  }, [counter]);

  return (
    <div className="session-container">
      <h1 className="session-title">InSession</h1>
      <h2>{questionsPhase}</h2>
      <p className="timer">{counter}</p>
      {<h1>{currentQuestion.question}</h1>}
      <textarea
        name="text"
        placeholder={
          questionsPhase === "think"
            ? "Think and reflect for some time..."
            : questionsPhase === "next"
            ? "New question incoming"
            : "I'm all ears... 👂👂👂"
        }
      ></textarea>
      {/* <GrabarNota
        note={note}
        setNote={setNote}
        handleSaveNote={handleSaveNote}
        handleChange={handleChange}
      /> */}
    </div>
  );
};

export default InSession;
