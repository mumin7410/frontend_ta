import React from "react";
import Camera_component from "../component/camera_component";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

function Kiosk_detail(){
    const location = useLocation();
    const location_id = location.state?.location_id
    return(
        <>
            <Container>
                <Camera_component location_id={location_id}/>
            </Container>
        </>
    )
}

export default Kiosk_detail;

const Container = styled.div`
    margin: 40px 40px;
    min-height: 88vh;
    display: flex;
    flex-direction: column;
`;