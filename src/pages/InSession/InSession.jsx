import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "../../hooks/useStore";
import { axios } from "../../hooks/axios";
import RecordNote from "../../components/RecordNote/RecordNote";
import "./InSession.scss";

const getSessionById = async (id) => {
  const { data } = await axios.get(`/journal-sessions/session/${id}`);
  return data;
};

const InSession = () => {
  const navigate = useNavigate();
  const authData = useStore((state) => state.authData);
  //? Get stored sessions
  const [storedSessions, setStoredSessions] = useState([]);
  const [index, setIndex] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState({});
  //* Note
  const [note, setNote] = useState({
    question: currentQuestion?.question || "",
    answer: "",
  });
  const [allNotes, setAllNotes] = useState([]);
  //* Query session id
  const { sessionId } = useParams();
  const { status } = useQuery({
    queryKey: ["session", sessionId],
    queryFn: () => getSessionById(sessionId),
    onSuccess: (data) => {
      setCurrentQuestion(data?.questions[0]);
      setStoredSessions(data?.questions || []);
      setNote({
        question: data?.questions[0]?.question,
        answer: "",
      });
    },
  });

  //? Question phases (Think, answer, next)
  const quesTionPhases = ["think", "answer", "next", "end"];
  const [questionsPhase, setQuestionsPhase] = useState(quesTionPhases[0]);
  //? Timer
  const [counter, setCounter] = useState(currentQuestion?.timeToThink || 15);
  //? Handle speech input
  const [isListening, setIsListening] = useState(false);

  //? Send to backend
  const saveNote = async () => {
    await axios.post(`/journal-entries`, {
      qas: allNotes,
      user: authData._id,
    });
  };

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
            saveNote();
            navigate("/saved-logs");
            break;
          default:
            break;
        }
      }
    }
  }, [counter]);

  return (
    <div className="session">
      <h1 className="session__phase-title">
        {questionsPhase[0].toUpperCase() + questionsPhase.slice(1)}
      </h1>
      <p className="session__timer">{counter}</p>
      <div className="session__question">
        {
          <h1 className="session__question__title">
            {questionsPhase !== "next" &&
              questionsPhase !== "end" &&
              currentQuestion?.question}
          </h1>
        }
        <p className="session__question__phase">
          {questionsPhase === "think"
            ? "Think and reflect for some time..."
            : questionsPhase === "next"
            ? "New question incoming"
            : "I'm all ears... 👂👂👂"}
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
