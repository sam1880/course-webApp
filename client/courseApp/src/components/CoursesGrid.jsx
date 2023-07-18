import { useEffect, useState } from "react"
import App from "../App"

function CoursesGrid(){
    const[courses, setCourses] = useState([])

    useEffect(() =>{
        fetch("http://localhost:3000/courses")
        .then((res)=> res.json()
            .then((data)=> {
                console.log(data)
                setCourses(data)
            }
                )
            )
    },[])
    return(
        <div>
            {courses.map((course) => {
                return(
                    <div key={course.id}>
                    {course.title}
                    <br/>
                    {course.description}
                    <br/>
                    <img src={course.image}></img>
                </div>
                )
            })}
        </div>
    )
}

export default CoursesGrid