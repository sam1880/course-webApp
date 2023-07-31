import Button from '@mui/material/Button';
import { Hidden, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function Course(){
    const {id} = useParams()
    const [course, setCoure] = useState(null)
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

    useEffect(()=>{
        fetch("http://localhost:3000/admin/course/" + id,{
            headers:{
                "Authorization": "bearer " + localStorage.getItem("token")
            }
        }).then((res) => res.json()
        .then(data => {setCoure(data.course); setTitle(data.course.title); setDescription(data.course.description); setPrice(data.course.price)})
        )
    }, [])

    function updateCourse(){
        fetch("http://localhost:3000/admin/courses/" + id, {
            method: "PUT",
            body:JSON.stringify({
                title: title,
                description: description,
                price: price,

            }),
            headers:{
                'Authorization': 'bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json().then(data => console.log(data)))
    }

    if(course){
        return(
            <div style={{display: "flex"}}>
                <div style={{ display: "flex", flexWrap: 'wrap', flexDirection:"column", alignItems: "right", minHeight: 700,
                    flex: "1", position: "fixed", top: 57, right: 0, bottom: 0, padding: "20px", backgroundColor: "#FAFAFA"}}>
                    <img src={course.image}></img>
                    
                    <TextField
                        type='text'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    ></TextField>
                    <Button onClick={()=> { updateCourse(); navigate("/course/"+ course._id)}} variant="outlined">SAVE</Button>
                </div>
                <div style={{display: "flex", flexWrap: "wrap", flexDirection:"column", position: "relative",flex: "2", marginRight: "350px", marginTop: 30, marginLeft:20, overflow: "auto"}}>
                    <TextField style={{margin: 10}}
                        type='text'
                        value={title}
                        onChange={(e)=> setTitle(e.target.value)}
                    ></TextField>
                    <TextField
                        multiline
                        minRows={20}
                        type='text'
                        value={description}
                        onChange={(e)=> setDescription(e.target.value)}
                    ></TextField>
                </div>
            </div>
        )
    }
}
export default Course