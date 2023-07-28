import { useEffect, useState } from "react"
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom'

function SignIn(){
    const navigate = useNavigate()
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")

    return(
        <div>
            <div style={{display: "Flex", justifyContent: "center"}}>
            <Typography style={{marginTop: 200}}>sign in bellow</Typography>
            </div>
            <div style={{display: "flex", justifyContent: "center",}}>
            <Card style={{display: "flex", justifyContent: "center", flexDirection: "column", width: 400, padding: 20}} variant="outlined">
                <TextField id="username" label="Email" variant="standard"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                </TextField>
                <br/>
                <TextField id="password" label="Password" variant="standard"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >
                </TextField>
                <br/>
                <Button variant="text"
                    onClick={() =>{
                        fetch("http://localhost:3000/admin/signin", {
                            method: "POST",
                            body: JSON.stringify({
                                username: email,
                                password: password
                            }),
                            headers:{
                                'Content-Type': 'application/json',
                            }
                        }).then((res) => res.json().then((data) => {console.log(data); localStorage.setItem("token", data.token); window.location = "/" } ))
                    }}
                >Sign in</Button>
            </Card>
            </div>
        </div>

    )
}

export default SignIn