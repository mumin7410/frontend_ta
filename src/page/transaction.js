import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const columns = [
    { 
      field: 'empid', 
      headerName: 'EMP ID', 
      flex: 1, // Use flex for auto width
      minWidth: 90, // Set a minimum width
    },
    {
      field: 'firstName',
      headerName: 'First name',
      flex: 2, // Use flex for auto width
      minWidth: 150,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      flex: 2, // Use flex for auto width
      minWidth: 150,
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 2, // Use flex for auto width
      minWidth: 150,
    },
    {
      field: 'location',
      headerName: 'Location',
      flex: 2, // Use flex for auto width
      minWidth: 160,
    },
    {
      field: 'created_at',
      headerName: 'Time',
      flex: 1, // Use flex for auto width
      minWidth: 160,
    },
    {
      field: 'image',
      headerName: 'Image',
      width: 160,
      renderCell: (params) => (
        <a href={`${params.row.image}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <img src={params.value} alt="Employee" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        </a>
      ),
    },
];

const convert_timestamp = (timestampStr) => {
  const date = new Date(timestampStr);
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false // Use 24-hour format
};

  const readableTimestamp = date.toLocaleString('en-US', options);
  return readableTimestamp
}

function Content() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paginationModel, setPaginationModel] = useState({
      pageSize: 50,
      page: 0,
    });
    const [count, setCount] = useState(0)

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://localhost:8001/api/transactions', {
                    params: { page: paginationModel.page + 1, pageSize: paginationModel.pageSize } // Pass pagination parameters
                });

                const transformedData = response.data.results.map(transaction => ({
                    id: transaction.id,
                    empid: transaction.employee_info.emp_id,
                    lastName: transaction.employee_info.last_name,
                    firstName: transaction.employee_info.name,
                    role: transaction.employee_info.role,
                    location: `${transaction.camera_location.location_name}`, // Adjust if needed
                    created_at: `${convert_timestamp(transaction.created_at)}`,
                    image: transaction.image
                }));

                setRows(transformedData);
                setCount(response.data.count);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Error fetching data");
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [paginationModel]); // Fetch data when page or pageSize changes

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Container>
            <Box sx={{ height: '100%', width: '100%' }}>
              <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSizeOptions={[50,100, 250]}
                  disableRowSelectionOnClick
                  getRowHeight={() => 100}
                  paginationMode="server"
                  rowCount={count}
                  paginationModel={paginationModel}
                  onPaginationModelChange={setPaginationModel}
                  sx={{
                    '& .MuiDataGrid-cell:focus': {
                        outline: 'none',
                    },
                  }}
              />
            </Box>
        </Container>
    );
}

export default Content;

const Container = styled.div`
    margin: 40px 40px;
    height: 88vh;
`;
