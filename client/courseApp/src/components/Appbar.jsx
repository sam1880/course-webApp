import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';

function Appbar(){
    const [username, setUsername] = useState(null)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        fetch("http://localhost:3000/admin/me", {
            headers:{
                "Authorization": "bearer " + localStorage.getItem("token")
            }
        }).then((res)=> res.json()
        .then(data => {
            if(data){
                setUsername(data.username)
                setLoading(false)
            }
            setLoading(false);
        }).catch(() => {
            setUsername(null); // Reset username if the API call fails or user is not logged in
            setLoading(false);
          }))
    }, [])

    if(loading){
        return(
            <div></div>
        )
    }

    if(username){
        return(
            <div style={{display: "flex", justifyContent: "space-between"}}>
                
                <Typography>Course Shop</Typography>
                <div>{username}</div>
                <div>
                    <Button onClick={() => {window.location = "/signin"; localStorage.setItem("token", null)}}>logout</Button>
                </div>
            </div>
        )
    }
    
    return(
        <div style={{display: "flex", justifyContent: "space-between"}}>
            
            <Typography>Course Shop</Typography>
            <div>{username}</div>
            <div>
                <Button onClick={() => navigate('/SignIn')}>Sign In</Button>
                <Button onClick={()=> navigate('/SignUp')}>Sign Up</Button>
            </div>
        </div>
    )
}

export default Appbar