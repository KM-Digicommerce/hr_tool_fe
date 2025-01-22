import React from 'react'
import { Routes, Route } from "react-router-dom";
import UserDashboard from "../Dashboard/UserDashboard";
import AttendanceRequest from '../Attendance/AttendanceRequest';
import AttendanceHistory from '../Attendance/AttendanceHistory';
import LeaveRequest from '../Leave/LeaveRequest';
import { Box } from '@mui/material';

function UserRoutes() {

 
  return (
    <Box>
        <Routes>
          <Route path="/" element={<UserDashboard />} />
          <Route path="/attendance/request" element={<AttendanceRequest />} />
          <Route path="/attendance/history" element={<AttendanceHistory />} />
          <Route path="/leave/request" element={<LeaveRequest />} /> 
        </Routes>
    </Box>
  )
}

export default UserRoutes
