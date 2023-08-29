import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { toUnitless } from '@mui/material/styles/cssUtils';

function PostCourse(){
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
                    <TextField/>
                    <TextField/>
                    <TextField/>
                <Button>post</Button>
            </Card>
        </div>
    )
}

export default PostCourse