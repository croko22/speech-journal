import  {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import SessionConfig from './pages/SessionConfig'

function App() {
  return (
    <>
    {/* //TODO: Hacer una store de la data en sustand */}
    <Header/>
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