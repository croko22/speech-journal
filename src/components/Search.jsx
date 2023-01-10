import { MdSearch } from 'react-icons/md';
import './Search.scss'

const Search = ({handleSearchNote}) => {
  return (
    <div className='search'>
        <MdSearch className='search-icons' size='1.3em' />
        <input
            onChange={(event) =>
                handleSearchNote(event.target.value)
            }
            type='text'
            placeholder='Buscar notas...'
        />
	</div>
  )
}

export default Search