import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import Sidebar from './component/sidebar';
import Navbar from './component/navbar';
import TransactionPage from './page/transaction';
import GlobalStyle from './GlobalStyles';
import EmployeePage from './page/employee';
import Employee_detailPage from './page/employee_detail';
import Employee_addPage from './page/employee_add';
import KioskPage from './page/kiosk';
import Kiosk_detailPage from './page/kiosk_detail';
import Login from './page/login';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  return (
    <Router> {/* Wrap the entire app in the Router */}
      <GlobalStyle />
      <Container>
        {!isLoggedIn ? (
          <Login setIsLoggedIn={setIsLoggedIn} /> // Pass setIsLoggedIn to Login for updating login state
        ) : (
          <>
            <Sidebar />
            <ContainerContent>
              <Navbar />
              {/* Router part */}
              <Routes>
                <Route path="/transaction" element={<TransactionPage />} />
                <Route path="/employee" element={<EmployeePage />} />
                <Route path="/employee/employee_detail" element={<Employee_detailPage />} />
                <Route path="/employee/employee_add" element={<Employee_addPage />} />
                <Route path="/kiosk" element={<KioskPage />} />
                <Route path="/kiosk/kiosk_detail" element={<Kiosk_detailPage />} />
                <Route path="*" element={<Navigate to="/transaction" />} /> {/* Default redirect */}
              </Routes>
              {/* end Router part */}
            </ContainerContent>
          </>
        )}
      </Container>
    </Router>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: #F6F6F6;
`;

const ContainerContent = styled.div`
  height: 100%;
  width: 85%;
  display: flex;
  flex-direction: column;
`;
