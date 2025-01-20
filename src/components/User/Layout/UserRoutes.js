import React from 'react'
import { Routes, Route } from "react-router-dom";
import UserDashboard from "../Dashboard/UserDashboard";
import { Box } from '@mui/material';


function UserRoutes() {

 
  return (
    <Box>
        <Routes>
          <Route path="/" element={<UserDashboard />} />
       
        </Routes>
    </Box>
  )
}

export default UserRoutes
