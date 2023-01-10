import { FaCog } from 'react-icons/fa';

const Header = ({language,setLanguage}) => {
    const handleChangeL = () => {
        (language=="es-ES")? setLanguage("en-US") : setLanguage("es-ES") 
      }

  return (
    <div className='header'>
        <h1>🎤 Speech Journal</h1>
        <a href="/session"><FaCog/> Journal Session</a>
        {(language=="es-ES")?  <button onClick={handleChangeL}> ES </button> :  <button onClick={handleChangeL}> EN </button>}
    </div>
  )
}

export default Header