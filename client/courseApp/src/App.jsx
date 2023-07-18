import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Appbar from './components/Appbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {


  return (
    <div>
      <Router>
        <Appbar/>
        <Routes>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
