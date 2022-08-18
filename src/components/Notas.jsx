import React, {useState} from 'react'
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa';
import Search from './Search';

const Notas = ({savedNotes, handleDeleteNote, handleEditNote}) => {
  const [searchText, setSearchText] = useState('');
  return (
    <div className="box scrollable-div">
      <h2>Notas</h2>
      <Search handleSearchNote={setSearchText}/>
      {savedNotes.filter((note) => note.text.toLowerCase().includes(searchText))
      .map(n => (
        <div key={n.id} className="note">
          <button className='btn-note' onClick={()=>handleDeleteNote(n.id)}><FaTrashAlt/></button>
          <button className='btn-note' onClick={()=>handleEditNote(n.id)}><FaRegEdit/></button>
          <h4>{n.title}</h4>
          <p>{n.text}</p>
        </div>
      ))}
    </div>
  )
}

export default Notas