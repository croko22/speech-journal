import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import RecordNote from "../../components/RecordNote/RecordNote";
import { getSessionById, saveNote } from "../../lib/api";
import "./InSession.scss";

const InSession = () => {
  const navigate = useNavigate();
  //? Get stored sessions
  const [storedSessions, setStoredSessions] = useState([]);
  const [index, setIndex] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState({});
  //* Note
  const [note, setNote] = useState({});
  const [allNotes, setAllNotes] = useState([]);
  //? Question phases (Think, answer, next)
  const quesTionPhases = ["think", "answer", "next", "end"];
  const [questionsPhase, setQuestionsPhase] = useState(quesTionPhases[0]);
  //? Timer
  const [counter, setCounter] = useState(15);
  //? Handle speech input
  const [isListening, setIsListening] = useState(false);

  //* Query session id
  const { sessionId } = useParams();
  const { status, isLoading } = useQuery({
    queryKey: ["session", sessionId],
    queryFn: () => getSessionById(sessionId),
    onSuccess: (data) => {
      setCurrentQuestion(data?.questions[0]);
      setStoredSessions(data?.questions || []);
      setCounter(data?.questions[0]?.timeToThink);
      setNote({
        question: data?.questions[0]?.question,
        answer: "",
      });
    },
  });

  //? Timer
  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      if (status === "success") {
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
            setCurrentQuestion(storedSessions[index]);
            setNote({
              question: storedSessions[index].question,
              answer: "",
            });
            setQuestionsPhase(quesTionPhases[0]);
            break;
          case "end":
            setAllNotes([...allNotes, note]);
            saveNote(allNotes);
            navigate("/saved-logs");
            break;
          default:
            break;
        }
      }
    }
  }, [counter]);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="session">
      <h1 className="session__phase-title">
        {questionsPhase[0].toUpperCase() + questionsPhase.slice(1)}
      </h1>
      <p className="session__timer">{counter}</p>
      <div className="session__question">
        {questionsPhase !== "next" && questionsPhase !== "end" && (
          <h1 className="session__question__title">
            {currentQuestion?.question}
          </h1>
        )}
        <p className="session__question__phase">
          {questionsPhase === "think" && "Think and reflect for some time..."}
          {questionsPhase === "next" && "New question incoming"}
          {questionsPhase === "answer" && "I'm all ears... 👂👂👂"}
          {questionsPhase === "end" && "Session ended"}
        </p>
      </div>
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
