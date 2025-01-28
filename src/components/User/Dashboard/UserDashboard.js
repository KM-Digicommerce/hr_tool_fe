import React, { useState, useEffect } from "react";
import { Box, Typography, Button, IconButton, Grid, Card, CardContent, Avatar, TextField, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import axios from "axios";

const Dashboard = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isBreakIn, setIsBreakedIn] = useState(false);
  const [loading, setLoading] = useState(true); // New state to track loading status
  const [runningTime, setRunningTime] = useState(0); // Timer state in seconds
  const [timerInterval, setTimerInterval] = useState(null); 
  const today = new Date();
  const monthNames = [  "January",  "February",  "March",  "April",  "May",  "June",  "July",  "August",  "September",  "October",  "November",  "December",
  ];

  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();
  const user = JSON.parse(localStorage.getItem("user"));
  const employeeId =localStorage.getItem("employeeId");
  const UserId = localStorage.getItem("UserId");
  useEffect(() => {
    const fetchTotalSeconds = async () => {
      try {
        // Call the API to fetch the total_seconds for the user
        const response = await axios.get(
          `${process.env.REACT_APP_IP}employee/getEmployeeId/`,
          { params: { user_id: UserId } }
        );
        if (response.status === 200) {
          const totalSeconds = response.data.data.total_seconds;
          if (totalSeconds >= 0) {
            setLoading(false); // Set loading to false when data is fetched
            setRunningTime(totalSeconds); // Set the running time from the API response
            setIsCheckedIn(true); // Set checked-in status to true
          }
          const BreakStatus = response.data.data.on_break;
          if (BreakStatus === true) {
            setIsBreakedIn(true); // Set checked-in status to true
          }
        } else {
          console.error("Failed to fetch total seconds:", response);
        }
      } catch (error) {
        console.error("Error fetching total seconds:", error);
      }
    };

    fetchTotalSeconds();
  }, [UserId]);

  useEffect(() => {
    // Start timer if user is checked in
    if (isCheckedIn) {
      const interval = setInterval(() => {
        setRunningTime((prevTime) => prevTime + 1);
      }, 1000);
      setTimerInterval(interval);

      // Clear interval when component is unmounted or when checked-out
      return () => clearInterval(interval);
    } else {
      // Stop timer if user is checked out
      clearInterval(timerInterval);
    }
  }, [isCheckedIn]);

  const handleBreakInOut = async () => {
    console.log(isBreakIn);
            try {
              const response = await axios.get(
                `${process.env.REACT_APP_IP}employee/breakRecord/`,
                { params: {break_type:isBreakIn ? 'break_in' : 'break_out', employee_id:employeeId,} } );
              if (response.status === 200) {
               console.log(response.data.data.message);   
              }
              if (response.data.data.message === "Break in recorded successfully") {
                setIsBreakedIn(false); 
              }
              if (response.data.data.message === "Break out recorded successfully") {
                setIsBreakedIn(true); 
              }
              else if (response.data.data.error) {
                alert(response.data.data.error);
                
              }
            } catch (error) {
              console.error("Error during Check In:", error);
            }
  };
  const handleCheckInOut = async () => {
    if (navigator.geolocation) {
      // Setting options for high accuracy
      const options = {
        enableHighAccuracy: true, // Request high accuracy
        timeout: 10000, // Set timeout to 10 seconds
        maximumAge: 0, // Don't use cached location
      };
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
  
          if (isNaN(latitude) || isNaN(longitude)) {
            alert("Unable to retrieve accurate location. Please try again.");
            return;
          }
  
          if (!isCheckedIn) {
            // Check-In API call
            try {
              const response = await axios.post(`${process.env.REACT_APP_IP}employee/checkin/`,  {  longitude,  latitude,  employee_id: employeeId, } );
              console.log(response.data.data.success);
              if (response.data.data.success === true) {
                setIsCheckedIn(true);
                setRunningTime(0); // Reset the timer
                startTimer(); // Start the timer
                // Get the total_seconds from the response
                const totalSeconds = response.data.data.total_seconds;
                if (totalSeconds > 0) {
                  setRunningTime(totalSeconds); // Set initial running time from API
                }
              } else if (response.data.data.message) {
                alert(response.data.data.message);
              }
            } catch (error) {
              console.error("Error during Check In:", error);
            }
          } else {
            // Check-Out API call
            try {
              const response = await axios.get(
                `${process.env.REACT_APP_IP}employee/checkout_user/`,
                { params: { employee_id: employeeId } }
              );
              if (response.status === 200) {
                setIsCheckedIn(false);
                stopTimer(); // Stop the timer
              }
            } catch (error) {
              console.error("Error during Check Out:", error);
            }
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Unable to retrieve location. Please check your location settings.");
        },
        options // Pass options for high accuracy
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      alert("Geolocation is not supported by this browser.");
    }
  };
  
  // Start Timer
  const startTimer = () => {
    const interval = setInterval(() => {
      setRunningTime((prevTime) => prevTime + 1);
    }, 1000); // Update every second
    setTimerInterval(interval);
  };
  
  // Stop Timer
  const stopTimer = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);
  };
  
  // Format time in HH:MM:SS
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };  
  if (loading) {
    return (
      <Box  sx={{  display: "flex",  justifyContent: "center",  alignItems: "center",  height: "100vh",  }}  >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh", p: 3 }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Hello, {user?.name}!
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search for actions, pages, requests, reports, people"
        sx={{
          width: "400px",
          backgroundColor: "#fff",
          borderRadius: 2,
        }}
        InputProps={{
          endAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
      <Box display="flex" alignItems="center" gap={2}>
      <Button
          variant="contained"
          sx={{ backgroundColor: isBreakIn ? "#d9534f" : "#1E824C" }}
          onClick={handleBreakInOut}
        >
          {isBreakIn ? "Break In" : "Break Out"}
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: isCheckedIn ? "#d9534f" : "#1E824C" }}
          onClick={handleCheckInOut}
        >
          {isCheckedIn ? "Check Out" : "Check In"}
        </Button>
        {isCheckedIn && (
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {formatTime(runningTime)}
          </Typography>
        )}
      </Box>
    </Box>
      </Box>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={3}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">
                Profile: 75% complete
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">
                Today's Celebration
              </Typography>
              <Box mt={2}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Sivanandham's Birthday</Typography>
                  <Button size="small" variant="outlined">
                    Wish
                  </Button>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2">
                    Selva's Work Anniversary
                  </Typography>
                  <Button size="small" variant="outlined">
                    Wish
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Center Column */}
        <Grid item xs={12} md={4}>
          {/* Feed */}
          {[1, 2, 3].map((feed) => (
            <Card sx={{ mb: 2, height: "80px" }} key={feed}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Feed {feed}
                </Typography>
                <Typography variant="body2" mt={1}>
                  Sample feed content for feed {feed}.{" "}
                  <Button size="small" endIcon={<ArrowForwardIcon />}>
                    Read More
                  </Button>
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={5}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">
                My Team Members
              </Typography>
              <Box display="flex" mt={2} gap={1}>
                <Avatar sx={{ backgroundColor: "#1E824C" }}>V</Avatar>
                <Avatar sx={{ backgroundColor: "#1E824C" }}>S</Avatar>
                <Avatar sx={{ backgroundColor: "#1E824C" }}>B</Avatar>
              </Box>
            </CardContent>
          </Card>
          {/* Calendar */}
          <Card>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">
                Calendar - {monthNames[today.getMonth()]} {today.getFullYear()}
              </Typography>
              <Table
                size="small"
                sx={{
                  mt: 2,
                  tableLayout: "fixed",
                  width: "100%",
                  "& td": {
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": {
                      backgroundColor: "#E3F2FD",
                    },
                  },
                }}
              >
                <TableHead>
                  <TableRow>
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <TableCell
                          key={day}
                          align="center"
                          sx={{ fontWeight: "bold", padding: "8px" }}
                        >
                          {day}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.from({
                    length: Math.ceil((daysInMonth + today.getDay()) / 7),
                  }).map((_, weekIndex) => (
                    <TableRow key={weekIndex}>
                      {Array.from({ length: 7 }).map((_, dayIndex) => {
                        const day =
                          weekIndex * 7 +
                          dayIndex -
                          new Date(
                            today.getFullYear(),
                            today.getMonth(),
                            1
                          ).getDay() +
                          1;
                        return (
                          <TableCell
                            key={dayIndex}
                            align="center"
                            sx={{
                              backgroundColor:
                                day === today.getDate() ? "#1E824C" : "transparent",
                              color: day === today.getDate() ? "#fff" : "inherit",
                              borderRadius: "50%",
                              padding: "10px",
                              fontWeight: day > 0 && day <= daysInMonth ? "bold" : "normal",
                            }}
                          >
                            {day > 0 && day <= daysInMonth ? day : ""}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
