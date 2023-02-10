import React, { useState, useEffect } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";

//*WebSpeechAPI
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();
mic.continuous = true;
mic.interimResults = true;

const GrabarNota = ({ note, setNote, handleSaveNote, handleChange }) => {
  const [isListening, setIsListening] = useState(false);
  const handleChangeL = () => {
    language == "es-ES" ? setLanguage("en-US") : setLanguage("es-ES");
  };

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
    <div className="box">
      <h2>Grabación de notas</h2>
      {language == "es-ES" ? (
        <button onClick={handleChangeL}> ES </button>
      ) : (
        <button onClick={handleChangeL}> EN </button>
      )}
      {isListening ? <FaMicrophone /> : <FaStop />}
      <button onClick={handleSaveNote} disabled={!note.title || !note.text}>
        Guardar Nota
      </button>
      <button onClick={() => setIsListening((prevState) => !prevState)}>
        Start/Stop
      </button>
      <input
        type="text"
        name="title"
        className="title"
        value={note.title}
        onChange={(e) => handleChange(e)}
      />
      <textarea
        name="text"
        placeholder="Toma notas y luego edita"
        value={note.text}
        onChange={(e) => handleChange(e)}
      ></textarea>
    </div>
  );
};

export default GrabarNota;
