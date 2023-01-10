import  {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import SessionConfig from './pages/SessionConfig'

function App() {
  return (
    <>
    {/* //TODO: Hacer una store de la data en sustand */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/session" element={<SessionConfig/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App