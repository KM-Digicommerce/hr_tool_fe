import React, { useState, useEffect } from 'react'; 
import { Box, Button, Typography, Paper, FormControl, MenuItem, Select, InputLabel, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/en'; // Ensure the English locale is loaded
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Extend dayjs to support UTC and timezone plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const AttendanceHistory = () => {
  const [currentDate, setCurrentDate] = useState(dayjs()); // Start with today's date
  const [weekDates, setWeekDates] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(currentDate.month()); // To store selected month for dropdown
  const [selectedYear, setSelectedYear] = useState(currentDate.year()); // To store selected year for dropdown
  const [attendanceData, setAttendanceData] = useState([]); // To store attendance data
  const [attendanceDataInitial, setAttendanceDataInitial] = useState([]); // To store attendance data

  const employeeId = localStorage.getItem("employeeId");

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = [2023, 2024, 2025]; // Example years, you can adjust as needed

  const getWeekDates = (date) => {
    const startOfWeek = date.startOf('week');
    const endOfWeek = date.endOf('week');
    let daysArray = [];
    for (let i = 0; i < 7; i++) {
      daysArray.push(startOfWeek.add(i, 'day'));
    }
    return { startOfWeek, endOfWeek, daysArray };
  };

  const fetchAttendanceData = async (startDate, endDate) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_IP}employee/get_attendance_summary/?employee_id=${employeeId}&start_date=${startDate}&end_date=${endDate}`);
      setAttendanceDataInitial(response.data.data.attendance_summary); 
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  const convertToHours = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    if (hours === 0) {
      return `${minutes}m ${seconds}s`;
    }
    if (hours === 0 && minutes === 0) {
      console.log(minutes, seconds , 'minutes, seconds');
      return `${seconds}s`;
    }
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const formatAttendanceData = (attendanceSummary) => {
    return attendanceSummary.map((attendance) => {
      const date = dayjs(attendance.date).format('YYYY-MM-DD');
      let status = attendance.status || "Absent"; 
      let break_time = attendance.break_time ? convertToHours(attendance.break_time) : "N/A"; 
      let hoursWorked = attendance.total_working_hours ? convertToHours(attendance.total_working_hours) : "N/A"; 

      // Convert check-in and check-out times to local system time in 12-hour format (AM/PM)
      const checkInTimeLocal = attendance.check_in_time 
        ? dayjs.utc(attendance.check_in_time).isValid()
          ? dayjs.utc(attendance.check_in_time).local().format('hh:mm A') // 12-hour format with AM/PM
          : 'Invalid Date'
        : 'N/A';

      const checkOutTimeLocal = attendance.check_out_time 
        ? dayjs.utc(attendance.check_out_time).isValid()
          ? dayjs.utc(attendance.check_out_time).local().format('hh:mm A') // 12-hour format with AM/PM
          : 'Invalid Date'
        : 'N/A';

      return {
        date,
        status,
        check_in_time: checkInTimeLocal,
        check_out_time: checkOutTimeLocal,
        break_time: break_time,
        hoursWorked
      }; 
    });
  };

  // Fetch and format attendance data when attendanceDataInitial changes
  useEffect(() => {
    const formattedData = formatAttendanceData(attendanceDataInitial);
    setAttendanceData(formattedData);
  }, [attendanceDataInitial]); // Re-fetch and format on data change

  // Fetch attendance data whenever currentDate changes
  useEffect(() => {
    const { startOfWeek, endOfWeek, daysArray } = getWeekDates(currentDate);
    setWeekDates(daysArray);
    fetchAttendanceData(startOfWeek.format('YYYY-MM-DD'), endOfWeek.format('YYYY-MM-DD'));
  }, [currentDate]); // Re-fetch attendance data whenever the date changes

  const handleWeekNavigation = (direction) => {
    const newDate = direction === 'next' ? currentDate.add(1, 'week') : currentDate.subtract(1, 'week');
    setCurrentDate(newDate);
  };

  const handleMonthChange = (event) => {
    const newMonth = event.target.value;
    setSelectedMonth(newMonth);
    setCurrentDate(dayjs().month(newMonth).year(selectedYear)); 
  };

  const handleYearChange = (event) => {
    const newYear = event.target.value;
    setSelectedYear(newYear);
    setCurrentDate(dayjs().month(selectedMonth).year(newYear)); 
  };

  return (
    <Box sx={{ p: 3 }}>
      <h2>Attendance History</h2>
      <Box sx={{ marginBottom: 3 }}>
        <FormControl sx={{ minWidth: 150 }} size="small">
          <InputLabel>Month</InputLabel>
          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
            label="Month"
            fullWidth
          >
            {months.map((month, index) => (
              <MenuItem key={index} value={index}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120, marginLeft: 2 }} size="small">
          <InputLabel>Year</InputLabel>
          <Select
            value={selectedYear}
            onChange={handleYearChange}
            label="Year"
            fullWidth
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
        <Button variant="outlined" onClick={() => handleWeekNavigation('prev')} sx={{ marginRight: 1 }}>
          Previous Week
        </Button>

        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'center' }}>
          {weekDates.map((date, index) => (
            <Paper key={index} sx={{ padding: 1, marginRight: 1, backgroundColor: '#f0f0f0', borderRadius: 1, textAlign: 'center', width: '100px' }}>
              <Typography variant="body1">{date.format('D')}</Typography>
              <Typography variant="body2" color="textSecondary">{date.format('dddd')}</Typography>
            </Paper>
          ))}
        </Box>

        <Button variant="outlined" onClick={() => handleWeekNavigation('next')}>
          Next Week
        </Button>
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <h3>Attendance for the Week</h3>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="attendance history table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Check-In</TableCell>
                <TableCell>Check-Out</TableCell>
                <TableCell>Break</TableCell>
                <TableCell align="right">Total Work Hours</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">No attendance data available</TableCell>
                </TableRow>
              ) : (
                attendanceData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.check_in_time}</TableCell>
                    <TableCell>{row.check_out_time}</TableCell>
                    <TableCell>{row.break_time}</TableCell>
                    <TableCell align="right">{row.hoursWorked}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
export default AttendanceHistory;