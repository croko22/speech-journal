import React from 'react'

const Notas = ({savedNotes, handleDeleteNote, handleEditNote}) => {
  return (
    <div className="box">
      <h2>Notas</h2>
      {savedNotes.map(n => (
        <div key={n.id} className="note">
          <h4>{n.title}</h4>
          <p>{n.text}</p>
          {/* USAR ICONS */}
          <button className='btn-borrar' onClick={()=>handleDeleteNote(n.id)}>Borrar</button>
          <button className='btn-editar' onClick={()=>handleEditNote(n.id)}>Editar</button>
        </div>
      ))}
    </div>
  )
}

export default Notas