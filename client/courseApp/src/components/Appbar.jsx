import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom'

function Appbar(){
    const navigate = useNavigate()

    return(
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <Typography>Course Shop</Typography>
            <div>
                <Button onClick={() => navigate('/SignIn')}>Sign In</Button>
                <Button onClick={()=> navigate('/SignUp')}>Sign Up</Button>
            </div>
        </div>
    )
}

export default Appbar