import React, { useState, useEffect } from "react";
import { Container, Grid, Card, CardContent, Typography, Box, CircularProgress } from "@mui/material";
import { Group, AccessTime, DateRange } from "@mui/icons-material";
import axios from "axios";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true); // New state to track loading status
  console.log(process.env.REACT_APP_IP,'${process.env.REACT_APP_HR_IP}');
  
  useEffect(() => {
    // Define the async function inside useEffect
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_HR_IP}hr/obtainDashboardForHR/`);
        if (response) {
          setDashboardData({
            newJoiningsToday: response.data.data.today_users_count || 0,
            newJoiningsThisWeek: response.data.data.last_one_week_users_count || 0,
            totalStrength: response.data.data.total_users_users_count,
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        alert("Error fetching dashboard data");
      } finally {
        setLoading(false); // Set loading to false when API call completes
      }
    };
    // Call the async function
    fetchDashboardData();
  }, []); // Empty dependency array ensures this runs only once on mount

  if (loading) {
    return (
      <Box  sx={{  display: "flex",  justifyContent: "center",  alignItems: "center",  height: "100vh",  }}  >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 4 }}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* New Joinings Today Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f0f8ff" }}>
            <CardContent>
              <Box sx={{ textAlign: "center" }}>
                <AccessTime sx={{ fontSize: 40, color: "#0074d9" }} />
                <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
                  New Joinings Today
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold", color: "#0074d9" }}>
                  {dashboardData.newJoiningsToday}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* New Joinings This Week Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#e6f7ff" }}>
            <CardContent>
              <Box sx={{ textAlign: "center" }}>
                <DateRange sx={{ fontSize: 40, color: "#33b5e5" }} />
                <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
                  New Joinings This Week
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold", color: "#33b5e5" }}>
                  {dashboardData.newJoiningsThisWeek}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Strength Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#d9f7ff" }}>
            <CardContent>
              <Box sx={{ textAlign: "center" }}>
                <Group sx={{ fontSize: 40, color: "#00b33c" }} />
                <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
                  Total Strength
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold", color: "#00b33c" }}>
                  {dashboardData.totalStrength}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
