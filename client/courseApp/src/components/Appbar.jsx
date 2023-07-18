import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';

function Appbar(){

    return(
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <Typography>Course Shop</Typography>
            <div>
                <Button>Sign In</Button>
                <Button>Sign Up</Button>
            </div>
        </div>
    )
}

export default Appbar