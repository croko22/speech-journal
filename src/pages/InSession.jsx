import React, { useEffect, useState } from "react";
import "./InSession.scss";

const InSession = () => {
  const storedSessions = JSON.parse(localStorage.getItem("Sessions"));
  //? Question phases (Think, answer, next)
  const quesTionPhases = ["think", "answer", "next"];
  //TODO: Add logic to change question when phase is "next"
  const [questionsPhase, setQuestionsPhase] = useState(quesTionPhases[0]);
  const [currentQuestion, setCurrentQuestion] = useState(storedSessions[0]);
  const [counter, setCounter] = useState(currentQuestion.timeToThink);
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter === 0 && questionsPhase === "think") {
      setCounter(currentQuestion.timeToAnswer);
      setQuestionsPhase(quesTionPhases[1]);
    }
    if (counter === 0 && questionsPhase === "answer") {
      setQuestionsPhase(quesTionPhases[2]);
    }
  }, [counter]);

  return (
    <div className="session-container">
      <h1 className="session-title">InSession</h1>
      <h2>{questionsPhase}</h2>
      <p className="timer">{counter}</p>
      {<h1>{currentQuestion.question}</h1>}
      <textarea name="text" placeholder="I'm all ears... 👂👂👂"></textarea>
    </div>
  );
};

export default InSession;
