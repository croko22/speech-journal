import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RecordNote from "../components/RecordNote";
import "./InSession.scss";

const InSession = () => {
  const navigate = useNavigate();
  //? Get stored sessions
  const storedSessions = JSON.parse(localStorage.getItem("Sessions"));
  //TODO: Use a stack instead of an index to get the current question
  const [index, setIndex] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(storedSessions[0]);
  //? Question phases (Think, answer, next)
  const quesTionPhases = ["think", "answer", "next", "end"];
  const [questionsPhase, setQuestionsPhase] = useState(quesTionPhases[0]);
  //? Timer
  const [counter, setCounter] = useState(currentQuestion?.timeToThink || 0);
  //? Handle speech input
  const [isListening, setIsListening] = useState(false);
  //* Note
  const [note, setNote] = useState({
    question: currentQuestion?.question || "",
    answer: "",
  });
  const [allNotes, setAllNotes] = useState([]);

  //? Send to backend
  const saveNote = async () => {
    await axios.post("http://localhost:3000/journal-entries", {
      qas: allNotes,
      user: JSON.parse(localStorage.getItem("authData"))._id,
    });
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
          if (index < storedSessions.length)
            setQuestionsPhase(quesTionPhases[2]);
          else setQuestionsPhase(quesTionPhases[3]);
          setCounter(5);
          setIsListening(false);
          setAllNotes([...allNotes, note]);
          break;
        case "next":
          setIndex(index + 1);
          setCounter(storedSessions[index].timeToThink);
          //? Set current question
          setCurrentQuestion(storedSessions[index]);
          setNote({
            question: storedSessions[index].question,
            answer: "",
          });
          setQuestionsPhase(quesTionPhases[0]);
          break;
        case "end":
          setAllNotes([...allNotes, note]);
          saveNote();
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
