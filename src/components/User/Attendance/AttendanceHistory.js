import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';

const AttendanceHistory = () => {
  // Sample static data
  const attendanceData = [
    { date: '2025-01-10', status: 'Present', hoursWorked: 8 },
    { date: '2025-01-11', status: 'Absent', hoursWorked: 0 },
    { date: '2025-01-12', status: 'Present', hoursWorked: 8 },
    { date: '2025-01-13', status: 'Leave', hoursWorked: 0 },
    { date: '2025-01-14', status: 'Present', hoursWorked: 8 },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <h2>Attendance History</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="attendance history table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Hours Worked</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceData.map((row, index) => (
              <TableRow key={row.date}>
                <TableCell component="th" scope="row">{row.date}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell align="right">{row.hoursWorked}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AttendanceHistory;
