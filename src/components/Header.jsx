import { FaCog, FaFileAlt, FaPlay } from 'react-icons/fa';
import './Header.scss'

const Header = () => {

  return (
    <div className='header'>
        <a className='header-title' href='/'>🎤 Speech Journal</a>
        <div>
          <a className='header-link' href="/session"><FaCog/> Journal Session</a>
          <a className='header-link' href="/"><FaFileAlt/>Saved logs</a>
          <a className='header-link' href="/"><FaPlay/>Start session</a>
        </div>
    </div>
  )
}

export default Header