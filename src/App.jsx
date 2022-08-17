import React, { useState, useEffect } from 'react'
import { v4 } from "uuid";
import './App.css'
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
  const [savedNotes, setSavedNotes] = useState([])
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
        text:transcript
      }
      setNote(tmpNota)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSaveNote = () => {
    if(isEditing){
      const newNotes = savedNotes.filter((nota) => nota.id !== note.id);
      const tmpNotas = [...newNotes, note]
      setSavedNotes(tmpNotas)
    } else {
      let tmpNota = {...note,id:v4()}
      const tmpNotas = [...savedNotes, tmpNota]
      setSavedNotes(tmpNotas)
    }
    setNote(nota)
  }

  const handleChangeT = (e) => {
    let tmpNota = {...note,title: e.target.value}
    setNote(tmpNota)
  }

  const handleChangeN = (e) => {
    let tmpNota = {...note,text: e.target.value}
    setNote(tmpNota)
  }

  const deleteNote = (id) => {
		const newNotes = savedNotes.filter((note) => note.id !== id);
		setSavedNotes(newNotes);
	};

  const editNote = (id) => {
		const noteToEdit = savedNotes.filter((note) => note.id == id)[0];
    setNote({title: noteToEdit.title,text: noteToEdit.text, id: noteToEdit.id})
    setIsEditing(true)
    console.log(noteToEdit)
	};

  return (
    <>
      <Header language={language} setLanguage={setLanguage}/>
      <div className="container">
        {/* RECONOCIMIENTO DE VOZ */}
        <div className="box">
          <h2>Grabación de notas</h2>
          {isListening ? <span>🎙️</span> : <span>🛑</span>}
          <button onClick={handleSaveNote} disabled={!note.title||!note.text}>Save Note</button>
          <button onClick={() => setIsListening(prevState => !prevState)}>Start/Stop</button>
          <input type="text" className='title' value={note.title} onChange={(e)=>handleChangeT(e)}/>
          <textarea placeholder="Toma notas y luego edita" value={note.text} onChange={(e)=>handleChangeN(e)}></textarea>
        </div>
        <Notas savedNotes={savedNotes} handleDeleteNote={deleteNote} handleEditNote={editNote}/>
      </div>
    </>
  )
}

export default App