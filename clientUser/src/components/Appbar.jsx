import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';

function Appbar(){
        const [username, setUsername] = useState(null)
        const navigate = useNavigate()
        const [loading, setLoading] = useState(true)
    
            useEffect(()=>{
                    fetch("http://localhost:3000/user/me", {
                    headers:{
                        "Authorization": "bearer " + localStorage.getItem("token")
                    }
                }).then((res)=> res.json()
                .then(data => {
                    if(data){
                        setUsername(data.username)
                        setLoading(false)
                    }
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
                <div style={{backgroundColor: '#EAEAEA'}}>
                <div style={{display: "flex", justifyContent: "space-between", }}>
                    <Typography onClick={()=> {navigate("/courses")}} style={{margin: 15}}>Course Shop</Typography>
                    <Typography style={{margin: 15}}>{username}</Typography>
                    <div>
                        <Button style={{margin: 10}} onClick={() => {localStorage.setItem("token", null);  window.location = "/"}}>logout</Button>
                    </div>
                </div>
                </div>
    
            )
        }
        
        return(
            <div style={{display: "flex", justifyContent: "space-between", backgroundColor: '#EAEAEA'}}>
                
                <Typography onClick={()=> {if(username){navigate("/courses")}navigate("/signin")}} style={{margin: 15}}>Course Shop</Typography>
                <div>{username}</div>
                <div>
                    <Button style={{margin: 10}} onClick={() => navigate('/SignIn')}>Sign In</Button>
                    <Button style={{margin: 10}} onClick={()=> navigate('/SignUp')}>Sign Up</Button>
                </div>
            </div>
    )
}

export default Appbar