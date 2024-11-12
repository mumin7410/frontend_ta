import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import IconUserAdd from "../assets/svgicon/add_user";
import Button from '@mui/material/Button';

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
      field: 'email',
      headerName: 'Email',
      flex: 2, // Use flex for auto width
      minWidth: 150,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    flex: 2, // Use flex for auto width
    minWidth: 150,
  },
  {
    field: 'role',
    headerName: 'Role',
    flex: 2, // Use flex for auto width
    minWidth: 150,
  },
];

function Employee(){

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 50,
    page: 0,
  });
  const [count, setCount] = useState(0)
  const navigate = useNavigate();
  const handleRowClick = (params) => {
    navigate('employee_detail', { state: { 
        empid: params.row.empid,
        firstName: params.row.firstName,
        lastName: params.row.lastName,
        email: params.row.email,
        phone: params.row.phone,
        role: params.row.role,

      }})
  };

  const handleAddClick = (params) => {
    navigate('employee_add')
  };

    useEffect(() => {
      const fetchTransactions = async () => {
          try {
            
              const response = await axios.get('http://localhost:8001/api/employees', {
                  params: { page: paginationModel.page + 1, pageSize: paginationModel.pageSize } // Pass pagination parameters
              });
              const transformedData = response.data.results.map(employee_info => ({
                  empid: employee_info.emp_id,
                  lastName: employee_info.last_name,
                  firstName: employee_info.name,
                  email: employee_info.email,
                  phone: employee_info.phone,
                  role: employee_info.role,
              }));

              setRows(transformedData);
              setCount(response.data.count)
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
          <TopContainer>
            <IconContainer onClick={handleAddClick}>
              <IconUserAdd />
            </IconContainer>
          </TopContainer>
          <Box sx={{ height: '90%', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[50,100, 250]}
                disableRowSelectionOnClick
                getRowHeight={() => 50}
                getRowId={(row) => row.empid}
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
  );
}

export default Employee;

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