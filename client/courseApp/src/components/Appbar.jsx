import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isUserLoadingState } from '../store/selectors/isUserLoading';
import { userEmailState } from '../store/selectors/userEmail';
import { userState } from '../store/atoms/user';

function Appbar(){
    const navigate = useNavigate()
    const userLoading = useRecoilValue(isUserLoadingState)
    const userEmail = useRecoilValue(userEmailState)
    const setUser = useSetRecoilState(userState)

    if(userLoading){
        return(
            <div></div>
        )
    }

    if(userEmail){
        return(
            <div style={{backgroundColor: '#EAEAEA'}}>
            <div style={{display: "flex", justifyContent: "space-between", }}>
                <Typography onClick={()=> navigate("/courses")} style={{margin: 15}}>Course Shop</Typography>
                <Typography style={{margin: 15}}>{userEmail}</Typography>
                <div>
                    <Button style={{margin: 10}} onClick={() => {localStorage.setItem("token", null);  window.location = "/"; setUser({isLoading: false, userEmail: null})}}>logout</Button>
                </div>
            </div>
            </div>

        )
    }
    
    return(
        <div style={{display: "flex", justifyContent: "space-between", backgroundColor: '#EAEAEA'}}>
            
            <Typography onClick={()=> {if(userEmail){navigate("courses")} else{navigate("/")}}} style={{margin: 15}}>Course Shop</Typography>
            <div>{userEmail}</div>
            <div>
                <Button style={{margin: 10}} onClick={() => navigate('/SignIn')}>Sign In</Button>
                <Button style={{margin: 10}} onClick={()=> navigate('/SignUp')}>Sign Up</Button>
            </div>
        </div>
    )
}

export default Appbar