import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { toUnitless } from '@mui/material/styles/cssUtils';
import { useState } from 'react';

export default function PostCourse(){
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [img, setImg] = useState("")
    const [price, setPrice] = useState("")
    return(
        <div style={{
            display: "flex",
            justifyContent: 'center'
        }}>
            <Card 
            style={{
                display: "flex",
                flexDirection: 'column',
                justifyContent: 'center',
                width: 300,
                padding: 20,
                margin: 30,
                }}>
                    <TextField
                    type='text'
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}/>
                    <TextField
                    type='text'
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}/>
                    <TextField
                    type='text'
                    value={img}
                    onChange={(e)=> setImg(e.target.value)}/>
                    <TextField
                    type='text'
                    value={price}
                    onChange={(e)=> setPrice(e.target.value)}/>
                <Button onClick={() => {fetch("http://localhost:3000/admin/courses", {
                    method: "POST",
                    body: JSON.stringify({
                        title: title,
                        description: description,
                        image: img,
                        price: price,
                        published: true
                    }),
                    headers:{
                        "Authorization" : "bearer " + localStorage.getItem("token"),
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json().then((data) => console.log(data)))
                }}>post</Button>
            </Card>
            <Card>
                
            </Card>
        </div>
    )
}

