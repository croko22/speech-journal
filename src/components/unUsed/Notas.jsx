import React, {useState} from 'react'
import Nota from './Nota';
import Search from './Search';

const Notas = ({savedNotes, handleDeleteNote, handleEditNote}) => {
  const [searchText, setSearchText] = useState('');
  return (
    <div className="box scrollable-div">
      <h2>Notas</h2>
      <Search handleSearchNote={setSearchText}/>
      {savedNotes.filter((note) => note.text.toLowerCase().includes(searchText))
      .map(n => (
        <Nota key={n.id} nota={n} handleDeleteNote={handleDeleteNote} handleEditNote={handleEditNote}/>
      ))}
    </div>
  )
}

export default Notas