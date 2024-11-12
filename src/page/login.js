import React from "react";
import styled from "styled-components";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function Login({setIsLoggedIn}){
    return(
        <>
            <Container>
                <TextField id="standard-basic" label="Standard" variant="standard" />
            </Container>
        </>
    )
}

export default Login;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`