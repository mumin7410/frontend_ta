import React, { useEffect } from "react";
import styled from "styled-components";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';  // Import axios

function Camera_component({location_id}) {
    const [status, setStatus] = React.useState(null); // Start with null to indicate loading

    // Fetch initial camera status from the API when the component mounts
    useEffect(() => {
        const fetchCameraStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/api/camera_locations?id=${location_id}`); // Adjust API endpoint if needed
                if (response.data.results && response.data.results[0].status !== undefined) {
                    const res_status = response.data.results[0].status
                    setStatus(res_status === 'active' ? true : false); // Assuming the API returns status as 'active' or 'inactive'
                }
            } catch (error) {
                console.error("Error fetching camera status:", error);
            }
        };

        fetchCameraStatus();
    }, []);  // Empty dependency array ensures this runs only once when the component mounts

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    useEffect(() => {
        const updateStatus = async () => {
            if (status !== undefined) {
                try {
                    // Make PUT request to update the camera status using axios
                    const response = await axios.put('http://localhost:8001/api/camera_locations', {
                        location_id: location_id,  // Change this based on the camera ID you want to update
                        status: status ? 'active' : 'inactive',
                    });

                    console.log("Camera status updated:", response.data);
                } catch (error) {
                    console.error("Error updating camera status:", error);
                }
            }
        };

        // Only call the API when the status changes
        if (status !== false && status !== true) {
            return; // Avoid making API call if the status is not set
        }

        updateStatus();
    }, [status]); // Trigger when status changes

    return (
        <>
            <div style={{ marginBottom: '30px' }}>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status !== null ? status : ''}
                            label="Status"
                            onChange={handleChange}
                        >
                            <MenuItem value={true}>Active</MenuItem>
                            <MenuItem value={false}>Inactive</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <Video_Container>
                {status ? (
                    <img src={`http://localhost:8000/api/video_stream_${location_id}` }alt="Camera Stream" className="w-full h-full object-cover" />
                ) : (
                    <></>
                )}
            </Video_Container>
        </>
    );
}

export default Camera_component;

const Video_Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 14px;
    background-color: #000; /* Optional: Background color for better visibility */
`;
