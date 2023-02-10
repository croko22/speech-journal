import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import "./Home.scss";
import GrabarNota from "../components/GrabarNota";
import Notas from "../components/Notas";

//*Estructura de Nota
const nota = { title: "", text: "" };
function Home() {
  const [isEditing, setIsEditing] = useState(false);
  const [note, setNote] = useState(nota);
  const [savedNotes, setSavedNotes] = useState(
    JSON.parse(localStorage.getItem("notas")) || []
  );

  useEffect(() => {
    localStorage.setItem("notas", JSON.stringify(savedNotes));
  }, [savedNotes]);

  const handleChange = (e) => {
    let tmpNota = { ...note, [e.target.name]: e.target.value };
    setNote(tmpNota);
  };
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
      <GrabarNota
        note={note}
        setNote={setNote}
        handleSaveNote={handleSaveNote}
        handleChange={handleChange}
      />
      <Notas
        savedNotes={savedNotes}
        handleDeleteNote={deleteNote}
        handleEditNote={editNote}
      />
    </div>
  );
}

export default Home;
