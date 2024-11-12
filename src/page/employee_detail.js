import React,{useState, useEffect} from "react";
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import { useLocation, useNavigate } from "react-router-dom";
import IconAccountEditOutline from "../assets/svgicon/edit_user";
import Button from "@mui/material/Button";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconImagePlus from "../assets/svgicon/image_plus";
import IconDelete from "../assets/svgicon/delete_icon";
import * as faceapi from 'face-api.js';

function Employee_detail(){

    const location = useLocation();

    const [empid, setEmpid] = useState(location.state?.empid );
    const [firstName, setFirstName] = useState(location.state?.firstName);
    const [lastName, setLastName] = useState(location.state?.lastName);
    const [email, setEmail] = useState(location.state?.email);
    const [phone, setPhone] = useState(location.state?.phone);
    const [role, setRole] = useState(location.state?.role);

    const [images, setImages] = useState([])

    const [loading, setLoading] = useState(false);
    const [isEdit, setIsedit] = useState(false);
    const [imagesDisplay, setImagesDisplay] = useState([]);
    const [uploadState, setUploadState] = useState(false)
    const [submituploadState, setSubmitUploadState] = useState(false)

    const navigate = useNavigate();

    async function loadModels() {
        const MODEL_URL = '/models'; // Update with the path to your model files
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    }
    
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/api/images?emp_id=${empid}`,{
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                console.log('successful:', response.data);
                setImages(response.data)
            } catch (error) {
                console.error('failed:', error);
            }
        }
        fetchTransactions()
    },[])

    useEffect(() => {
        loadModels();
    },[])

    async function validateFace(imageFile) {
        // Convert the image file to an HTMLImageElement for face-api.js
        const image = await new Promise((resolve, reject) => {
            const img = new Image();
            img.src = URL.createObjectURL(imageFile);
            img.onload = () => resolve(img);
            img.onerror = reject;
        });
    
        // Detect all faces using tiny_face_detector model
        const detections = await faceapi.detectAllFaces(image, new faceapi.TinyFaceDetectorOptions());
        if(detections.length === 0){
            alert('There no human face')
            return false
        }else if(detections.length > 1){
            alert('There human face more than 1')
            return false
        }
        else if(detections.length === 1){
            return true
        }
    }

    const handleEditState = () => {
        setIsedit(!isEdit)
    };

    const handleUploadState = () => {
        setUploadState(!uploadState)
    };

    const handleSelectFile = async (event) => {
        const files = Array.from(event.target.files);
        const validatedFiles = [];
    
        for (let file of files) {
            const isValidFace = await validateFace(file);
            if (isValidFace) {
                validatedFiles.push({
                    file,
                    url: URL.createObjectURL(file),
                });
            }
        }
    
        setImagesDisplay((prevImages) => [...prevImages, ...validatedFiles]);
    };

    const handleRemoveImage = (index) => {
        setImagesDisplay(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const handleUploadImage = async () => {
        // Iterate over imagesDisplay array to upload each file
        for (const image of imagesDisplay) {
            const formData = new FormData();
            formData.append('image', image.file); // Add the file to the form data
            formData.append('emp_id', empid);     // Add any additional data you need
            formData.append('name', firstName);        // Assuming name is also needed for upload
    
            try {
                const response = await axios.post('http://localhost:8001/api/upload_emp_image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Upload successful:', response.data);
            } catch (error) {
                console.error('Upload failed:', error);
            }finally {
                window.location.reload()
            }
        }
    };

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
            console.log(`http://localhost:8001/api/employees/${empid}/`)
            // Make a PUT request to your Django API endpoint to edit the employee
            const response = await axios.put(`http://localhost:8001/api/employees/${empid}/`, employeeData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            // Handle success
            console.log("Employee updated:", response.data);
            // Optionally clear the form or give feedback to the user
        } catch (error) {
            // Handle error
            console.error("There was an error updating the employee:", error.response ? error.response.data : error.message);
        } finally {
            // Set loading to false after request completes
            setLoading(false);
            navigate('/employee'); // Navigate to the employee list or another page after the update
        }
    };

    useEffect(() => {
        if(imagesDisplay.length > 0){
            setSubmitUploadState(true)
        }
        else{
            setSubmitUploadState(false)
        }
    },[imagesDisplay])

    return(
        <>
            <Container>
                <TopContainer>
                    <h3 style={{ textDecoration: 'underline', fontStyle: 'italic', color:'rgba(0,0,0,0.7)'}}>Employee information</h3>
                    <IconContainer isEdit={isEdit} onClick={handleEditState}>
                        <IconAccountEditOutline />
                    </IconContainer>
                </TopContainer>
                <TextField 
                    id="outlined-basic" 
                    label="EmpID" 
                    variant="outlined" 
                    value={empid} 
                    InputProps={{
                        readOnly: isEdit ? true : true,
                    }}
                    onChange={(e) => setEmpid(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <TextField 
                    id="outlined-basic" 
                    label="First Name" 
                    variant="outlined" 
                    value={firstName} 
                    InputProps={{
                        readOnly: isEdit ? false : true,
                    }}
                    onChange={(e) => setFirstName(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <TextField 
                    id="outlined-basic" 
                    label="Last Name" 
                    variant="outlined" 
                    value={lastName} 
                    InputProps={{
                        readOnly: isEdit ? false : true,
                    }}
                    onChange={(e) => setLastName(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <TextField 
                    id="outlined-basic" 
                    label="Email" 
                    variant="outlined" 
                    value={email} 
                    InputProps={{
                        readOnly: isEdit ? false : true,
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <TextField 
                    id="outlined-basic" 
                    label="Phone" 
                    variant="outlined" 
                    value={phone} 
                    InputProps={{
                        readOnly: isEdit ? false : true,
                    }}
                    onChange={(e) => setPhone(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <TextField 
                    id="outlined-basic" 
                    label="Role" 
                    variant="outlined" 
                    value={role} 
                    InputProps={{
                        readOnly: isEdit ? false : true,
                    }}
                    onChange={(e) => setRole(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <div style={{ textAlign: 'center', marginBottom:'10px' }}>
                {/* Show loader or submit button */}
                {loading ? (
                    <CircularProgress size={40} />
                ) : isEdit ? (
                    <Button 
                        variant="outlined" 
                        onClick={handleSubmit}
                        sx={{
                            borderColor: '#FFA144', // Custom border color
                            color: '#FFA144', // Text color
                            '&:hover': {
                                backgroundColor:'rgba(255, 161, 68,0.12)'
                            },
                            paddingX:'120px'
                        }}    
                    >Submit</Button>
                ): <></>}
                </div>

                <hr style={{ width:'100%' }}/>

                <TopContainer>
                    <h3 style={{ textDecoration: 'underline', fontStyle: 'italic', color:'rgba(0,0,0,0.7)'}}>Upload employee images</h3>
                    <IconContainer isEdit={uploadState} onClick={handleUploadState}>
                        <IconImagePlus />
                    </IconContainer>
                </TopContainer>

                <EmpImageContainer>
                    <ImageList sx={{ 
                            width: '50%', 
                            height: 500, 
                            marginTop:'15px', 
                            backgroundColor:'white', 
                            padding:'15px',
                            borderRadius:'12px',
                            border: '1px solid rgba(0, 0, 0, 0.17)'
                        }} 
                        cols={3} rowHeight={164}
                    >
                        {!uploadState ?  images.map((item) => (
                            <ImageListItem key={item.img}>
                            <img
                                srcSet={`http://localhost:8001/${item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                src={`http://localhost:8001/${item.image}?w=164&h=164&fit=crop&auto=format`}
                                alt={item.title}
                                loading="lazy"
                            />
                            </ImageListItem>
                        )): imagesDisplay.map((img, index) => (
                                <ImageListItem key={index}>
                                <img
                                    src={img.url}
                                    alt={`Selected file ${index + 1}`}
                                    loading="lazy"
                                />
                                <div 
                                    style={{
                                        position:'absolute',
                                        top:'0px',
                                        right:'0px',
                                        color:'red',
                                        cursor:'pointer'
                                    }}
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    <IconDelete />
                                </div>
                                </ImageListItem>
                            ))
                        }
                    </ImageList>
                    
                    <EmpUploadContainer>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            style={{ display: 'none' }} // Hide the input element
                            id="file-input"
                            onChange={handleSelectFile} // Call when files are selected
                        />
                         {uploadState ? <Button
                            variant="outlined"
                            onClick={() => document.getElementById('file-input').click()} // Trigger file input click
                            sx={{
                                borderColor: 'rgba(0, 0, 0,0.5)',
                                color: 'rgba(0, 0, 0,0.5)',
                                '&:hover': { backgroundColor: 'rgba(0, 0, 0,0.1)' },
                                width: '300px',
                                marginBottom: '15px'
                            }}
                        >
                            Select file
                        </Button>:<></>}
                        {submituploadState ? <Button 
                            variant="outlined" 
                            onClick={handleUploadImage}
                            sx={{
                                borderColor: '#FFA144', // Custom border color
                                color: '#FFA144', // Text color
                                '&:hover': {
                                    backgroundColor:'rgba(255, 161, 68,0.12)'
                                },
                                width: '300px',
                            }}    
                        >Submit</Button>:<></>}
                    </EmpUploadContainer>
                </EmpImageContainer>
            </Container>
        </>
    )
}

export default Employee_detail;

const Container = styled.div`
    margin: 40px 40px;
    min-height: 88vh;
    display: flex;
    flex-direction: column;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
  align-items: center;
`

const IconContainer = styled.div`
  padding: 10px;
  width: auto;
  border-radius: 12px;
  background-color: ${({ isEdit }) => (isEdit ? 'rgba(255, 161, 68,0.7)' : '#FFF')};
  display: inline-flex; // Or use inline-block
  border: 1px solid rgba(0, 0, 0, 0.17);
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
      cursor: pointer;
  }
`

const EmpImageContainer = styled.div`
    display: flex;
`

const EmpUploadContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
`
