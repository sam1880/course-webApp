import { useEffect, useState } from "react"
import App from "../App"
import { useNavigate } from "react-router-dom"
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

function CoursesGrid(){
    const[courses, setCourses] = useState([])
    const navigate = useNavigate()

    useEffect(() =>{
        fetch("http://localhost:3000/admin/courses", {
            headers: {
                "Authorization": "bearer " + localStorage.getItem("token")
            }
        }).then((res)=> res.json()
            .then((data)=> {
                console.log(data)
                setCourses(data.courses)
            }
                )
            )
    },[])

    return(
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {courses.map(course =>{
                return(
                    <div 
                        onClick={()=> navigate("/course/" + course._id)} key={course._id}>
                        <Course course={course}/>
                    </div>
                    )
            })}
        </div>
    )
}

function Course(props){
    return(
        <div style={{ margin: "10px",}}>
            <Card style={{display: "flex", flexWrap: "wrap", flexDirection:"column", alignItems:"center"}}>
                <img src={props.course.image} style={{width: 200, minHeight: 200}}></img>
                <Typography>{props.course.title}</Typography>
                <Typography>{props.course.description}</Typography>
            </Card>
        </div>
    )
}

export default CoursesGrid

// {"courses":[{"_id":"6e","title":"f","description":"bl","price":599,"published":false,"__v":0}]}
//[{"_id":"64","title":"f","description":"b","price":599,"published":false,"__v":0}]
//second one is the example of what map function works on, first one isnt
//you again had a error with map function, just remember its the data structure
// i fixed the setCourses to take data.courses instead of data

//another problem that i was facing was while returning the value in Course function,...
//you did props.title, which didnt work. had to do props.course.title...
//this course means, from all the props that u are sending from <Course /> tag, u want the course prop