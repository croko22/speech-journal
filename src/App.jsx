import React, { useState, useEffect } from 'react'
import './App.css'

//WebSpeechAPI
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()
mic.continuous = true
mic.interimResults = true
mic.lang = 'es-ES'

//Estructura de Nota
const nota = {title: "",text: ""}

function App() {
  //YA FUNCIONA PERO AHORA FALTA SEPARAR EN COMPONENTS
  //CREO QUE SERIA MEJOR SEPARAR EL TITULO DEL TEXTO
  const [isListening, setIsListening] = useState(false)
  const [title,setTitle] = useState("")
  const [note, setNote] = useState(nota)
  const [savedNotes, setSavedNotes] = useState([])

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
      setNote({text:transcript})
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSaveNote = () => {
    let tmpNota = {
      ...note,
      title: title
    }
    setSavedNotes([...savedNotes, tmpNota])
    setNote(nota)
    console.log(savedNotes)
  }

  const handleChange = (e) => {
    setTitle(e.target.value)
  }

  return (
    <>
      <h1>Speech Journal</h1>
      <div className="container">
        {/* RECONOCIMIENTO DE VOZ */}
        <div className="box">
          <h2>Grabación de notas</h2>
          {isListening ? <span>🎙️</span> : <span>🛑</span>}
          <button onClick={handleSaveNote} disabled={!note}>Save Note</button>
          <button onClick={() => setIsListening(prevState => !prevState)}>Start/Stop</button>
          <input type="text" placeholder="Titulo" className='title' value={title} onChange={(e)=>handleChange(e)}/>
          <p>{note.text}</p>
        </div>
        {/* NOTAS */}
        <div className="box">
          <h2>Notas</h2>
          {savedNotes.map(n => (
            <div key={n.index}>
              <h3>{n.title}</h3>
              <p>{n.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App