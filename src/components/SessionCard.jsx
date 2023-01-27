import React, {useState} from 'react'
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa';
import './SessionCard.scss'

const SessionCard = ({session, deleteQuestion, addQuestion, addMode, setAddMode}) => {
  const [question, setQuestion] = useState(session)
  return (
    <>
      <div className='sessionCard'>
          {
            addMode ?
            <button onClick={()=>setAddMode(false)}>X</button>
            :
            <div>
              <button className='btn-note' onClick={()=> deleteQuestion(session.id)} ><FaTrashAlt/></button>
              <button className='btn-note'><FaRegEdit/></button>
            </div>
          }
          <h3>{session.question}</h3>
          <input onChange={(e)=>setQuestion({...question,question:e.target.value})} className='question' type="text" placeholder='Question?' />
          <div className='timeSelectSection'>
            <label>Time to think: </label><input onChange={(e)=>setQuestion({...question,timeToThink:e.target.value})} className='timeSelectInput' type='number' defaultValue={session.timeToAnswer}/> 
            <label>Time to answer: </label><input onChange={(e)=>setQuestion({...question,timeToAnswer:e.target.value})} className='timeSelectInput' type='number' defaultValue={session.timeToThink}/> 
          </div>
      </div>
      {addMode && <button onClick={()=>addQuestion(question)}>Add question</button>}
    </>
  )
}

export default SessionCard