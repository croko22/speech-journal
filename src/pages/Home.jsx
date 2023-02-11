import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import "./Home.scss";
import GrabarNota from "../components/GrabarNota";
import Notas from "../components/Notas";

//*Estructura de Nota
const nota = { title: "", text: "" };
function Home() {
  const [savedNotes, setSavedNotes] = useState(
    JSON.parse(localStorage.getItem("notas")) || []
  );
  const [note, setNote] = useState(nota);
  const [isEditing, setIsEditing] = useState(false);
  //?Handle speech input
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    localStorage.setItem("notas", JSON.stringify(savedNotes));
  }, [savedNotes]);

  // Gestion de las notas
  const handleSaveNote = () => {
    if (isEditing) {
      const newNotes = savedNotes.filter((nota) => nota.id !== note.id);
      const tmpNotas = [...newNotes, note];
      setSavedNotes(tmpNotas);
      setIsEditing(false);
    } else {
      const date = new Date();
      let tmpNota = { ...note, id: v4(), date: date.toLocaleDateString() };
      const tmpNotas = [...savedNotes, tmpNota];
      setSavedNotes(tmpNotas);
    }
    setNote(nota);
  };

  const deleteNote = (id) => {
    const newNotes = savedNotes.filter((note) => note.id !== id);
    setSavedNotes(newNotes);
  };

  const editNote = (id) => {
    const date = new Date();
    const noteToEdit = savedNotes.filter((note) => note.id == id)[0];
    setNote({
      title: noteToEdit.title,
      text: noteToEdit.text,
      id: noteToEdit.id,
      date: date.toLocaleDateString(),
    });
    setIsEditing(true);
  };

  return (
    <div className="container">
      {/* <GrabarNota
        note={note}
        setNote={setNote}
        handleSaveNote={handleSaveNote}
        isListening={isListening}
        setIsListening={setIsListening}
      /> */}
      <Notas
        savedNotes={savedNotes}
        handleDeleteNote={deleteNote}
        handleEditNote={editNote}
      />
    </div>
  );
}

export default Home;
