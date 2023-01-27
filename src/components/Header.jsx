import { FaCog, FaFileAlt } from 'react-icons/fa';
import './Header.scss'

const Header = () => {

  return (
    <div className='header'>
        <a className='header-title' href='/'>🎤 Speech Journal</a>
        <div>
          {/* JUMP TO THE SESSION LINK */}
          <a className='header-link' href="/session"><FaCog/> Journal Session</a>
          <a className='header-link' href="/"><FaFileAlt/>Saved logs</a>
        </div>
    </div>
  )
}

export default Header