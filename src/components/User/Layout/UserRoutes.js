import React from 'react'
import { Routes, Route } from "react-router-dom";
import UserDashboard from "../Dashboard/UserDashboard";
import AttendanceRequest from '../Attendance/AttendanceRequest';
import AttendanceHistory from '../Attendance/AttendanceHistory';
import LeaveRequest from '../Leave/LeaveRequest';
import Payslip from '../Payroll/Payslip';
import Allowance from '../Payroll/Allowance';
import Deduction from '../Payroll/Deductions';
import Profile from '../Employee/Profile';
import WorkTypeRequest from '../Employee/WorkTypeRequest';
import { Box } from '@mui/material';

function UserRoutes() {

 
  return (
    <Box>
        <Routes>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/attendance/request" element={<AttendanceRequest />} />
          <Route path="/attendance/history" element={<AttendanceHistory />} />
          <Route path="/leave/request" element={<LeaveRequest />} /> 
          <Route path="/payroll/payslips" element={<Payslip />} /> 
          <Route path="/payroll/view-allowances" element={<Allowance />} /> 
          <Route path="/payroll/view-deductions" element={<Deduction />} /> 
          <Route path="/profile" element={<Profile />} />
          <Route path="/work-type-request" element={<WorkTypeRequest />} />
        </Routes>
    </Box>
  )
}

export default UserRoutes
