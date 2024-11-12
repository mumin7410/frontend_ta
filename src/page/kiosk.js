import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconUserAdd from "../assets/svgicon/add_user";
import styled from "styled-components";
import axios from 'axios';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { 
      field: 'location_id', 
      headerName: 'LocationID', 
      flex: 1, // Use flex for auto width
      minWidth: 90, // Set a minimum width
    },
    {
      field: 'location_name',
      headerName: 'Location name',
      flex: 2, // Use flex for auto width
      minWidth: 150,
    },
    {
    field: 'location_status',
    headerName: 'Status',
    flex: 2, // Use flex for auto width
    minWidth: 150,
    },
  ];

function Kiosk(){

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 50,
        page: 0,
    });
    const [count, setCount] = useState(0)
    const navigate = useNavigate();

    // const handleAddClick = (params) => {
    //     navigate('kiosk_detail', { state: { 
    //         location_id: params.row.location_id,
    //     }})
    // };

    const handleRowClick = (params) => {
        navigate('kiosk_detail', { state: { 
            location_id: params.row.location_id,
        }})
    }

    useEffect(() => {
        const fetchKiosk = async () => {
            try {
              
                const response = await axios.get('http://localhost:8001/api/camera_locations', {
                    params: { page: paginationModel.page + 1, pageSize: paginationModel.pageSize } // Pass pagination parameters
                });
                const transformedData = response.data.results.map(location => ({
                    location_id: location.id,
                    location_name: location.location_name,
                    location_status: location.status,
                }));
                
                console.log(transformedData)
                setRows(transformedData);
                setCount(response.data.count)
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Error fetching data");
                setLoading(false);
            }
        };
  
        fetchKiosk();
    }, [paginationModel]); // Fetch data when page or pageSize changes

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;


    return(
        <>
            <Container>
                <Box sx={{ height: '90%', width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSizeOptions={[1, 2, 5]}
                        disableRowSelectionOnClick
                        getRowHeight={() => 50}
                        getRowId={(row) => row.location_id}
                        paginationMode="server"
                        rowCount={count}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        onRowClick={handleRowClick}
                        sx={{
                        '& .MuiDataGrid-row:hover': {
                            cursor: 'pointer',
                        },
                        '& .MuiDataGrid-cell:focus': {
                            outline: 'none',
                        },
                        }}
                    />
                </Box>
            </Container>
        </>
    )
}

export default Kiosk;

const Container = styled.div`
    margin: 40px 40px;
    height: 88vh;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  margin-bottom: 5px;
`

const IconContainer = styled.div`
  padding: 10px;
  width: auto;
  border-radius: 12px;
  background-color: #FFF;
  display: inline-flex; // Or use inline-block
  border: 1px solid rgba(0, 0, 0, 0.17);

  &:hover {
      cursor: pointer;
  }
`