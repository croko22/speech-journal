import { FaCog, FaFileAlt } from 'react-icons/fa';

const Header = () => {

  return (
    <div className='header'>
        <h1>🎤 Speech Journal</h1>
        <a className='header-link' href="/session"><FaCog/> Journal Session Settings</a>
        <a className='header-link' href="/"><FaFileAlt/>Saved logs</a>
    </div>
  )
}

export default Header