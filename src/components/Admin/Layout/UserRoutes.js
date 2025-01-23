import React from 'react'
import { Routes, Route } from "react-router-dom";
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import EmployeeView from '../Employee/EmployeeView';
import EmployeeList from '../Employee/EmployeeList';
import EmployeeWorkTypeRequest from '../Employee/EmployeeWorkTypeRequest';
import { Box } from '@mui/material';

function UserRoutes() {
  return (
    <Box>
        <Routes>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/employee-view/:employeeId" element={<EmployeeView />} />
          <Route path="/employee-list" element={<EmployeeList />} />
          <Route path="/work-type-request" element={<EmployeeWorkTypeRequest />} />
        </Routes>
    </Box>
  )
}

export default UserRoutes;
