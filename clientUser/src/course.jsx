import Button from '@mui/material/Button';
import { Hidden, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function Course(){
    const {id} = useParams()
    const [course, setCoure] = useState(null)
    const navigate = useNavigate()
    const [purchasedCoursesData, setPurchasedCourses] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        fetch("http://localhost:3000/user/course/" + id,{
            headers:{
                "Authorization": "bearer " + localStorage.getItem("token")
            }
        }).then((res) => res.json()
        .then(data => setCoure(data.course))
        )
        fetch("http://localhost:3000/user/purchasedcourses", {
            headers:{
                "Authorization": "bearer " + localStorage.getItem("token")
            }
        }).then((res) => res.json().then((data) => {
            if(data){
                setPurchasedCourses(data.purchasedCourses);
                setLoading(false)
            }
        }).catch(() =>{
            setLoading(false)
        }))
    }, [])

    if(loading){
        return(
            <div/>
        )
    }

    if(course){
        const isCoursePurchased = purchasedCoursesData.find(purchasedCourse => purchasedCourse._id === id);
        if(isCoursePurchased){
            return(
                <div style={{display: "flex"}}>
                    <div style={{ display: "flex", flexWrap: 'wrap', flexDirection:"column", alignItems: "right", minHeight: 700,
                        flex: "1", position: "fixed", top: 57, right: 0, bottom: 0, padding: "20px", backgroundColor: "#FAFAFA"}}>
                        <img src={course.image}></img>
                        <Typography>{course.title}</Typography>
                        <Typography>{course.price}</Typography>
                        <Button onClick={() => {
                            fetch("http://localhost:3000/user/courses/" + id,{
                            method: "POST",
                            headers:{
                                "Authorization": "bearer " + localStorage.getItem("token")
                            }
                        }).then((res) => res.json().then((data) => console.log(data)))}} variant="outlined">DETAILS</Button>
                    </div>
                    <div style={{position: "relative",flex: "2", marginRight: "350px", marginTop: 30, marginLeft:20, overflow: "auto"}}>
                        <Typography>{course.description}</Typography>
                    </div>
                </div>
            )
        }
        return(
            <div style={{display: "flex"}}>
                <div style={{ display: "flex", flexWrap: 'wrap', flexDirection:"column", alignItems: "right", minHeight: 700,
                    flex: "1", position: "fixed", top: 57, right: 0, bottom: 0, padding: "20px", backgroundColor: "#FAFAFA"}}>
                    <img src={course.image}></img>
                    <Typography>{course.title}</Typography>
                    <Typography>{course.price}</Typography>
                    <Button onClick={() => {
                        fetch("http://localhost:3000/user/courses/" + id,{
                        method: "POST",
                        headers:{
                            "Authorization": "bearer " + localStorage.getItem("token")
                        }
                    }).then((res) => res.json().then((data) => console.log(data)))}} variant="outlined">BUY</Button>
                </div>
                <div style={{position: "relative",flex: "2", marginRight: "350px", marginTop: 30, marginLeft:20, overflow: "auto"}}>
                    <Typography>{course.description}</Typography>
                </div>
            </div>
        )
    }
}
export default Course