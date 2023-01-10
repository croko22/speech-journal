import { FaTrashAlt, FaRegEdit } from 'react-icons/fa';

const Nota = ({nota, handleDeleteNote, handleEditNote}) => {
  return (
    <div key={nota.id} className="note">
        <button className='btn-note' onClick={()=>handleDeleteNote(nota.id)}><FaTrashAlt/></button>
        <button className='btn-note' onClick={()=>handleEditNote(nota.id)}><FaRegEdit/></button>
        <h4>{nota.title}</h4>
        <p>{nota.text}</p>
    </div>
  )
}

export default Nota