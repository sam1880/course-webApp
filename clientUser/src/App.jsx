import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Appbar from './components/Appbar';
import Signin from './components/Signin';
import Signup from './components/Signup';
import CoursesGrid from './components/CoursesGrid';
import Course from './course';


function App() {

  return (
      <Router>
        <Appbar/>
        <Routes>
          <Route path ='/' element={<Signin/>}/>
          <Route path='/courses' element ={<CoursesGrid/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path = '/course/:id' element={<Course/>}/>
        </Routes>
      </Router>
    )
}

export default App
