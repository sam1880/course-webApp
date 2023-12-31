import { useEffect, useState } from "react"
import App from "../App"
import { json, useNavigate } from "react-router-dom"
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Button, Hidden } from "@mui/material";
import TextField from '@mui/material/TextField';

function AllCoursesGrid(){
    const navigate = useNavigate()
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
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <img src="https://i.pinimg.com/736x/cd/ef/11/cdef1143220f9cb370b629a6bbdc7282.jpg"
                style={{
                    objectFit: "cover",
                    height: 500,
                    width: 750,
                }}
                />
                <div style={{position: "relative", top: 200, right: 100, maxHeight: 100}}>
                    <Typography variant="h3">are you a teacher?</Typography>
                    <Button 
                    style={{margin: 20, left:90, maxWidth: 150, maxHeight: 50, fontSize: 20}}
                    variant="contained"
                    onClick={()=> navigate("/signup")}
                    >register</Button>
                </div>
            </div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{position: "relative", top: 200, left: 100}}>
                    <Typography variant="h3">are you a student?</Typography>
                    <Button 
                    style={{margin: 20, left:90, maxWidth: 150, maxHeight: 50, fontSize: 20}}
                    variant="contained"
                    onClick={()=> window.open("http://localhost:5174/signup")}
                    >register</Button>
                </div>
                <img src="https://i.pinimg.com/736x/cd/ef/11/cdef1143220f9cb370b629a6bbdc7282.jpg"
                    style={{
                        position: "relative",
                        objectFit: "cover",
                        height: 500,
                        width: 750,
                    }}
                    />
            </div>

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
        </div>
    )
}

function Course(props){
    return(
        <div style={{ margin: "10px",}}>
            <Card style={{display: "flex", flexWrap: "wrap", flexDirection:"column", alignItems:"center"}}>
                <img src={props.course.image} style={{width: 200, maxHeight: 250, objectFit: "cover"}}></img>
                <Typography>{props.course.title}</Typography>
                <Typography>{props.course.price}</Typography>
            </Card>
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