import {useState} from 'react'
import {FaPlus} from 'react-icons/fa'
import { v4 } from "uuid";
import SessionCard from '../components/SessionCard'
import './SessionConfig.scss'

const SessionConfig = () => {
  const [sessions, setSessions] = useState([
    {id:1, question:'Question 1', timeToThink:60, timeToAnswer:60},
    {id:2, question:'Question 2', timeToThink:60, timeToAnswer:60},
    {id:3, question:'Question 3', timeToThink:60, timeToAnswer:60},
  ])
  const [addMode, setAddMode] = useState(false)

  const addQuestion = (session) => {
    let tmpSession = {...session,id:v4()}
    setSessions([...sessions, tmpSession])
    setAddMode(false)
  }

  const deleteQuestion = (id) => {
    setSessions(sessions.filter((session) => session.id !== id))
  }

  return (
    <div className='sessionConfig'>
        <h1>Session configuration</h1>
        {/* //*Rendered sessioncards*/}
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} deleteQuestion={deleteQuestion}/>
        ))}
        {
          addMode ?
          <SessionCard 
            session={{id:0, question:'New question', timeToThink:60, timeToAnswer:60}} 
            addQuestion={addQuestion}
            addMode={addMode}
            setAddMode={setAddMode}
          />
          :
          <button onClick={()=>setAddMode(true)}><FaPlus/> Add new question</button>
        }
    </div>
  )
}

export default SessionConfig