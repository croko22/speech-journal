import React from 'react'
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa';
import './SessionCard.scss'

const SessionCard = () => {
  return (
    <div className='sessionCard'>
        <button className='btn-note'><FaTrashAlt/></button>
        <button className='btn-note'><FaRegEdit/></button>
        <h3>Question?</h3>
        <div className='timeSelectSection'>
          <label>Time to think: </label><input className='timeSelectInput' type='number' value={60}/> 
          <label>Time to answer: </label><input className='timeSelectInput' type='number' value={60}/> 
        </div>
    </div>
  )
}

export default SessionCard