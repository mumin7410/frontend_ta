import React, { useState } from "react";
import styled from "styled-components";
import IconTransaction from "../assets/svgicon/transaction";
import IconPersonOutline from "../assets/svgicon/emp";
import IconBxCctv from "../assets/svgicon/cctv";
import { Link } from 'react-router-dom';

function SidebarButton({ title, icon, link_path,activeButton, setActiveButton }) {
    const renderIcon = () => {
        switch (icon) {
            case "emp":
                return <IconPersonOutline />;
            case "cctv":
                return <IconBxCctv />;
            case "transaction":
                return <IconTransaction />;
            default:
                return null;
        }
    };

    const handleClick = () => {
        setActiveButton(title);  // Set the active button to the clicked one
    };

    return (
        <StyledLink to={link_path} onClick={handleClick}>
            <Container isActive={activeButton  == title}>
                <Icon>{renderIcon()}</Icon>
                <Title>{title}</Title>
            </Container>
        </StyledLink>
    );
}

export default SidebarButton;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    width: 100%;
`;

const Container = styled.div`
    background-color: '#FFF';
    padding: 12px 8px;
    border-radius: 15px;
    align-items: center;
    display: flex;
    flex-direction: row;
    width: 100%;
    cursor: pointer;
    margin: 5px 0px;
    transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;

    /* Hover effect */
    &:hover {
        color: #FFF;
        background-color: #FFA144;
        box-shadow: 0 4px 20px rgba(250, 165, 68, 0.5);
    }

    /* Active effect when button is clicked */
    ${({ isActive }) =>
        isActive &&
        `
        color: #FFF;
        background-color: #FFA144;
        box-shadow: 0 4px 20px rgba(250, 165, 68, 0.5);
    `}
`;

const Icon = styled.div`
    height: 30px;
    width: 30px;
    margin-right: 8px;
`;

const Title = styled.div`
    font-size: 0.9rem;
`;
