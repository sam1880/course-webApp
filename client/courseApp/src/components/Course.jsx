import Button from '@mui/material/Button';
import { Hidden, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function Course(){
    const {id} = useParams()
    const [course, setCoure] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        fetch("http://localhost:3000/admin/course/" + id,{
            headers:{
                "Authorization": "bearer " + localStorage.getItem("token")
            }
        }).then((res) => res.json()
        .then(data => setCoure(data.course))
        )
    }, [])

    if(course){
        return(
            <div style={{display: "flex"}}>
                <div style={{ display: "flex", flexWrap: 'wrap', flexDirection:"column", alignItems: "right", minHeight: 700,
                    flex: "1", position: "fixed", top: 57, right: 0, bottom: 0, padding: "20px", backgroundColor: "#FAFAFA"}}>
                    <img src={course.image} style={{maxwidth: 250, maxHeight: 350, objectFit: 'cover'}}></img>
                    <Typography>{course.title}</Typography>
                    <Typography>{course.price}</Typography>
                    <Button onClick={()=> navigate("/courses/edit/" + course._id)} variant="outlined">EDIT</Button>
                </div>
                <div style={{position: "relative",flex: "2", marginRight: "350px", marginTop: 30, marginLeft:20, overflow: "auto"}}>
                    <Typography>{course.description}</Typography>
                </div>
            </div>
        )
    }
}
export default Course