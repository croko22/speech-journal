import React from 'react'
import { FaMicrophone, FaStop } from 'react-icons/fa';

const GrabarNota = ({note, isListening, setIsListening, handleSaveNote, handleChange}) => {
  return (
    <div className="box">
      <h2>Grabación de notas</h2>
      {isListening ? <span><FaMicrophone/></span> : <span><FaStop/></span>}
      <button onClick={handleSaveNote} disabled={!note.title||!note.text}>Save Note</button>
      <button onClick={() => setIsListening(prevState => !prevState)}>Start/Stop</button>
      <input type="text" name='title' className='title' value={note.title} onChange={(e)=>handleChange(e)}/>
      <textarea name='text' placeholder="Toma notas y luego edita" value={note.text} onChange={(e)=>handleChange(e)}></textarea>
    </div>
  )
}

export default GrabarNota