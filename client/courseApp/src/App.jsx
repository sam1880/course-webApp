import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Appbar from './components/Appbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoursesGrid from './components/CoursesGrid';
import AllCoursesGrid from './components/AllCoursesGrid';
import EditCourse from './components/EditCourse';
import Course from './components/Course';
import UserSignup from './components/userSignup';
import UserSignin from './components/UserSignin';

function App() {


  return (
    <div>
      <Router>
        <Appbar/>
        <Routes>
          <Route path= '/home' element={<AllCoursesGrid/>}/>
          <Route path= '/course/:id' element={<Course/>}></Route>
          <Route path= '/courses/edit/:id' element={<EditCourse/>}/>
          <Route path='/courses' element={<CoursesGrid/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
