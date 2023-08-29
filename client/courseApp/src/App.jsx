import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Appbar from './components/Appbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoursesGrid from './components/CoursesGrid';
import AllCoursesGrid from './components/AllCoursesGrid';
import EditCourse from './components/EditCourse';
import Course from './components/Course';
import PostCourse from './components/PostCourse';
import React, { useEffect } from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useSetRecoilState,
  useRecoilValue,
} from 'recoil';
import axios from 'axios';
import { userState } from './store/atoms/user';

function App() {


  return (
    <div>
      <RecoilRoot>
        <Router>
          <InitUser/>
          <Appbar/>
          <Routes>
            <Route path= '/' element={<AllCoursesGrid/>}/>
            <Route path= '/course/:id' element={<Course/>}></Route>
            <Route path= '/courses/edit/:id' element={<EditCourse/>}/>
            <Route path='/courses' element={<CoursesGrid/>}/>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/signup' element={<SignUp/>}/>   
            <Route path = '/course/post' element ={<PostCourse/>}/>
          </Routes>
        </Router>
      </RecoilRoot>
    </div>
  )
}

function InitUser(){
  const setUser = useSetRecoilState(userState)

  const init = async() => {
    try{
      const response = await axios.get("http://localhost:3000/admin/me", {
        headers: {
          "Authorization" : "bearer " + localStorage.getItem("token")
        }
      })

      if(response.data.username){
        setUser({
          isLoading: false,
          userEmail: response.data.username
        })
      }
      else{
        setUser({
          isLoading: false,
          userEmail: null,
        })
      }

    }
    catch (e){
      setUser({
        isLoading: false,
        userEmail: null,
      })
    }
  };

  useEffect(()=>{
    init();
  },[])
  return(
    <div></div>
  )
}

export default App
