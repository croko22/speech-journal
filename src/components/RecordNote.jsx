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
  if (!(window.SpeechRecognition || window.webkitSpeechRecognition)) {
    return <div>Browser does not support Speech Recognition</div>;
  }

  const handleChangeL = () => {
    language == "es-ES" ? setLanguage("en-US") : setLanguage("es-ES");
  };

  const handleChange = (e) => {
    let tmpNota = { ...note, [e.target.name]: e.target.value };
    setNote(tmpNota);
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
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
    };
    //?Speech recognition
    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      let tmpNota = {
        ...note,
        text: note.text + transcript,
      };
      setNote(tmpNota);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  return (
    <div className="recording-box">
      <div className="buttons-box">
        {isListening ? <FaMicrophone /> : <FaStop />}
        <button onClick={() => setIsListening((prevState) => !prevState)}>
          Start/Stop
        </button>
        {language == "es-ES" ? (
          <button onClick={handleChangeL}> ES </button>
        ) : (
          <button onClick={handleChangeL}> EN </button>
        )}
      </div>
      <textarea
        name="text"
        placeholder="Toma notas y luego edita"
        value={note.text}
        onChange={(e) => handleChange(e)}
      ></textarea>
    </div>
  );
};

export default RecordNote;
