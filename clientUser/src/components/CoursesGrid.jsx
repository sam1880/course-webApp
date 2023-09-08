import { useEffect, useState } from "react"
import App from "../App"
import { useNavigate } from "react-router-dom"
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function CoursesGrid(){
    const[courses, setCourses] = useState([])
    const navigate = useNavigate()

    useEffect(() =>{
        fetch("http://localhost:3000/user/courses", {
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
                <img src={props.course.image} style={{width: 200, maxHeight: 250, objectFit: "cover"}}></img>
                <Typography>{props.course.title}</Typography>
                <Typography>{props.course.description}</Typography>
            </Card>
        </div>
    )
}

export default CoursesGrid