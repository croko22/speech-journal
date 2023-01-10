import React, { useState, useEffect } from 'react'
import { v4 } from "uuid";
import './App.scss'
import GrabarNota from './components/GrabarNota';
import Header from './components/Header';
import Notas from "./components/Notas"

//WebSpeechAPI
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()
mic.continuous = true
mic.interimResults = true

//Estructura de Nota
const nota = {title: "",text: ""}
function App() {
  const [isListening, setIsListening] = useState(false)
  const [isEditing,setIsEditing] = useState(false)
  const [note, setNote] = useState(nota)
  const [savedNotes, setSavedNotes] = useState(() => {
    const savedN = localStorage.getItem("notas");
    return (savedN) ? JSON.parse(savedN) : [];
  });

  //SpeechRecognition Language
  const [language,setLanguage] = useState('es-ES')
  mic.lang = language

  //Cargar notas
  useEffect(() => {
		const tsavedNotes = JSON.parse(localStorage.getItem('notas'));
		if (tsavedNotes) setSavedNotes(tsavedNotes);
	},[]);
  useEffect(() => {
		localStorage.setItem('notas',JSON.stringify(savedNotes));
	}, [savedNotes]);

  // Reconocimiento de voz 
  useEffect(() => {
    handleListen()
  }, [isListening])
  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {console.log('Stopped Mic on Click')}
    }
    mic.onstart = () => {console.log('Mics on')}
    //Speech recognition
    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      let tmpNota = {
        ...note,
        text:note.text+transcript
      }
      setNote(tmpNota)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleChange = (e) => {
    let tmpNota = {...note,[e.target.name]: e.target.value}
    setNote(tmpNota)
  }
  // Gestion de las notas
  const handleSaveNote = () => {
    if(isEditing){
      const newNotes = savedNotes.filter((nota) => nota.id !== note.id);
      const tmpNotas = [...newNotes, note]
      setSavedNotes(tmpNotas)
      setIsEditing(false)
    } else {
      const date = new Date();
      let tmpNota = {...note,id:v4(),date: date.toLocaleDateString()}
      const tmpNotas = [...savedNotes, tmpNota]
      setSavedNotes(tmpNotas)
    }
    setNote(nota)
  }

  const deleteNote = (id) => {
		const newNotes = savedNotes.filter((note) => note.id !== id);
		setSavedNotes(newNotes);
	};

  const editNote = (id) => {
    const date = new Date();
		const noteToEdit = savedNotes.filter((note) => note.id == id)[0];
    setNote({title: noteToEdit.title,text: noteToEdit.text, id: noteToEdit.id,date: date.toLocaleDateString()})
    setIsEditing(true)
	};

  return (
    <>
      <Header language={language} setLanguage={setLanguage}/>
      <div className="container">
        <GrabarNota note={note} isListening={isListening} setIsListening={setIsListening} 
          handleSaveNote={handleSaveNote} handleChange={handleChange}/>
        <Notas savedNotes={savedNotes} handleDeleteNote={deleteNote} handleEditNote={editNote}/>
      </div>
    </>
  )
}

export default App