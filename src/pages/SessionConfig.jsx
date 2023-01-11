import {useState} from 'react'
import {FaPlus} from 'react-icons/fa'
import SessionCard from '../components/SessionCard'
import './SessionConfig.scss'

const SessionConfig = () => {
  const [addMode, setAddMode] = useState(false)
  const [selectedCard,setSelectedCard] = useState({})

  return (
    <div className='sessionConfig'>
        <h1>Session configuration</h1>
        {/* //*Rendered sessioncards*/}
        <SessionCard/>
        {
          addMode ?
          <div>
            <SessionCard/>
            <button onClick={()=>setAddMode(false)}><FaPlus/> Create new question</button>
          </div>
          :
          <button onClick={()=>setAddMode(true)}><FaPlus/> Add new question</button>
        }
    </div>
  )
}

export default SessionConfig