import React from "react";
import styled from "styled-components";
import Profile from "../assets/profile.jpg"
function Navbar(){
    return(
        <>
            <Container>
                <CompanyText>Company name</CompanyText>
                <ProfileContainer>
                    <ProfileContainer_image>
                        <img src={ Profile } style={{ width:'100%', height:'100%',  objectFit: 'cover'}}/>
                    </ProfileContainer_image>
                    <ProfileContainer_name>
                        <ProfileContainer_name_text>Sittisak Rodpraya</ProfileContainer_name_text>
                        <ProfileContainer_role_text>admin</ProfileContainer_role_text>
                    </ProfileContainer_name>
                </ProfileContainer>
            </Container>
        </>
    )
}

export default Navbar;

const Container = styled.div`
    height: 12vh;
    display: flex;
    background-color: #FFF;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #D9D9D9;
    padding: 0px 20px;
`
const CompanyText = styled.div`
    font-size: 1.5rem;
`

const ProfileContainer = styled.div`
    display: flex;
`

const ProfileContainer_image = styled.div`
    display: flex;
    width: 45px;
    height: 45px;
    border-radius: 45px; /* Use percentage to ensure a perfect circle */
    background-color: gray;
    margin-right: 8px;
    overflow: hidden; /* Ensures the image stays inside the circle */
    align-items: center;
    justify-content: center;    
`

const ProfileContainer_name = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const ProfileContainer_name_text = styled.div`
    display: flex;
    justify-content: flex-end;
    font-size: 1rem;
`
const ProfileContainer_role_text = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: start;
    width: 100%;
    font-size: 0.9rem;
`