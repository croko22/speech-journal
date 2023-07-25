import React, { useState, useEffect } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";
import "./RecordNote.scss";

//*WebSpeechAPI
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = SpeechRecognition ? new SpeechRecognition() : null;
if (mic) {
  mic.continuous = true;
  mic.interimResults = true;
}

const RecordNote = ({ note, setNote, isListening, setIsListening }) => {
  if (!SpeechRecognition) {
    return (
      <div className="recording-box">
        <p className="recording-box__browser-not-supported">
          Browser does not support Speech Recognition :(
        </p>
        <textarea
          name="answer"
          placeholder="Toma notas y luego edita"
          value={note.answer}
          onChange={(e) =>
            setNote({ ...note, [e.target.name]: e.target.value })
          }
          disabled={!isListening}
        ></textarea>
      </div>
    );
  }

  const handleChangeL = () => {
    language == "es-ES" ? setLanguage("en-US") : setLanguage("es-ES");
  };

  //TODO: Create a config file, stores in zustand, ls or idk
  //* SpeechRecognition Language
  const [language, setLanguage] = useState("es-ES");
  mic.lang = language;
  //? Reconocimiento de voz
  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) mic.start();
    else mic.stop();

    //?Speech recognition
    mic.onresult = (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0].transcript)
        .join("");

      let tmpNota = {
        ...note,
        answer: note.answer + transcript,
      };
      setNote(tmpNota);
    };
  };

  return (
    <div className="recording-box">
      <div className="recording-box__buttons">
        {isListening ? <FaMicrophone /> : <FaStop />}
        <button onClick={() => setIsListening((prevState) => !prevState)}>
          {isListening ? "Stop" : "Start"}
        </button>
        <button onClick={handleChangeL}>
          {language == "es-ES" ? "🇪🇸" : "🇺🇸"}
        </button>
      </div>
      <textarea
        name="answer"
        placeholder="Toma notas y luego edita"
        value={note.answer}
        onChange={(e) => setNote({ ...note, [e.target.name]: e.target.value })}
        disabled={!isListening}
      ></textarea>
    </div>
  );
};

export default RecordNote;
