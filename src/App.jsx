import React, { useState, useEffect } from 'react'
import { v4 } from "uuid";
import './App.css'

//WebSpeechAPI
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()
mic.continuous = true
mic.interimResults = true
mic.lang = 'es-ES'

//Estructura de Nota
const nota = {title: "",text: "",id:v4()}

function App() {
  //YA FUNCIONA PERO AHORA FALTA SEPARAR EN COMPONENTS
  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(nota)
  const [savedNotes, setSavedNotes] = useState([])

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
    const tmpNotas = [...savedNotes, note]
    setSavedNotes(tmpNotas)
    setNote(nota)
    console.log(savedNotes)
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

  return (
    <>
      <h1>Speech Journal</h1>
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
        {/* NOTAS */}
        <div className="box">
          <h2>Notas</h2>
          {savedNotes.map(n => (
            <div key={n.id} className="note">
              <h4>{n.title}</h4>
              <p>{n.text}</p>
              {/* USAR ICONS */}
              <button className='btn-borrar' onClick={()=>deleteNote(n.id)}>Borrar</button>
              {/* <button >editar</button> */}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App