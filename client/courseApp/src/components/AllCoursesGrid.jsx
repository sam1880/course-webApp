import { useEffect, useState } from "react"
import App from "../App"
import { json } from "react-router-dom"

function AllCoursesGrid(){
    const[courses, setCourses] = useState([])

    useEffect(() =>{
        fetch("http://localhost:3000/all/users").then((res)=> res.json()
            .then((data)=> {
                console.log(data)
                setCourses(data.courses)
            }
                )
            )
    },[])
    return(
        <div>
            {courses.map(course =>{
                return(
                    <div key={course._id}>
                        <Course course={course}/>
                    </div>
                    )
            })}
        </div>
    )
}

function Course(props){
    return(
        <div>
            {props.course.title}
        </div>
    )
}

export default AllCoursesGrid

// {"courses":[{"_id":"6e","title":"f","description":"bl","price":599,"published":false,"__v":0}]}
//[{"_id":"64","title":"f","description":"b","price":599,"published":false,"__v":0}]
//second one is the example of what map function works on, first one isnt
//you again had a error with map function, just remember its the data structure
// i fixed the setCourses to take data.courses instead of data

//another problem that i was facing was while returning the value in Course function,...
//you did props.title, which didnt work. had to do props.course.title...
//this course means, from all the props that u are sending from <Course /> tag, u want the course prop