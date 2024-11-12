import React, {useState} from "react";
import styled from "styled-components";
import Logo from '../assets/logo.png'
import Sidebar_button from "./sidebar_button";

function Sidebar(){
    const [activeButton, setActiveButton] = useState("");  // Track active button
    return (
        <>
            <Container>
                <LogoWrapper >
                    <img src={ Logo } style={{ height:'52px', width:'145px' }}/>
                </LogoWrapper >
                <Title>
                    <p>MENU</p>
                </Title>
                <Sidebar_button title={"Transaction"} icon={"transaction"} link_path={"/transaction"} activeButton={activeButton} setActiveButton={setActiveButton}/>
                <Sidebar_button title={"Employee"} icon={"emp"} link_path={"/employee"} activeButton={activeButton} setActiveButton={setActiveButton}/>
                <Sidebar_button title={"Kiosk"} icon={"cctv"} link_path={"/kiosk"} activeButton={activeButton} setActiveButton={setActiveButton}/>
            </Container>
        </>
    )
}

export default Sidebar;

const Container = styled.div`
  width: 15%;
  min-height: 100vh;
  background-color: #FFF;
  border-right: 1px solid #D9D9D9;
  display: flex;
  flex-direction:column;
  align-items: center;
  padding: 20px 32px 0 20px;
`;

const LogoWrapper  = styled.div`
    height: auto;
    width: auto;
    object-fit: contain;
`

const Title = styled.div`
    width: 100%;
`