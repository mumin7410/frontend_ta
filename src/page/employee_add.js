import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

function Employee_add() {
    // Set up states for each field
    const [empid, setEmpid] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = async () => {
        // Set loading to true before sending request
        setLoading(true);

        // Create employee data based on the form inputs
        const employeeData = {
            emp_id: empid,
            name: firstName,
            last_name: lastName,
            email,
            phone,
            role
        };

        try {
            // Make a POST request to your Django API endpoint
            const response = await axios.post('http://localhost:8001/api/employees', employeeData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Handle success
            console.log("Employee created:", response.data);
            // Optionally clear the form or give feedback to the user
        } catch (error) {
            // Handle error
            console.error("There was an error creating the employee:", error.response ? error.response.data : error.message);
        } finally {
            // Set loading to false after request completes
            setLoading(false);
            navigate('/employee')
        }
    };
    

    return (
        <>
            <Container>
                <TextField
                    id="outlined-empid"
                    label="EmpID"
                    variant="outlined"
                    value={empid}
                    onChange={(e) => setEmpid(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    id="outlined-firstName"
                    label="First Name"
                    variant="outlined"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    id="outlined-lastName"
                    label="Last Name"
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    id="outlined-email"
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    id="outlined-phone"
                    label="Phone"
                    variant="outlined"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    id="outlined-role"
                    label="Role"
                    variant="outlined"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <div style={{ textAlign: 'center' }}>
                {/* Show loader or submit button */}
                {loading ? (
                    <CircularProgress size={40} />
                ) : (
                    <Button 
                        variant="outlined" 
                        onClick={handleSubmit}
                        sx={{
                            borderColor: '#FFA144', // Custom border color
                            color: '#FFA144', // Text color
                            '&:hover': {
                                borderColor: '#FFA144', // Border color on hover
                                color: '#FFA144', // Text color on hover
                            },
                            paddingX:'120px'
                        }}    
                    >Submit</Button>
                )}
                </div>
            </Container>
        </>
    );
}

export default Employee_add;

const Container = styled.div`
    margin: 40px 40px;
    height: 88vh;
    display: flex;
    flex-direction: column;
`;
