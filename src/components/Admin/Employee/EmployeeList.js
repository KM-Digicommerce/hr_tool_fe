import React, { useState, useEffect } from "react";
import { Container, Box, Grid, Card, CardContent, Typography, Avatar, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]); // State to hold employee data
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_IP}hr/obtainEmployeesList/`);
        console.log(response, "response");
        if (response && response.data) {
          setEmployees(response.data.data.users); // Assuming the response contains an array of employees
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        alert("Error fetching employee data");
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchEmployees();
  }, []); // Empty dependency array to call the effect only once when the component mounts

  // Show loader while fetching data
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      {/* Employee Cards */}
      <Grid container spacing={4}>
        {employees.map((employee) => (
          <Grid item xs={12} sm={6} md={4} key={employee.id}>
            <Link to={`/hr/employee-view/${employee.id}`} style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  cursor: "pointer",
                  boxShadow: 3,
                  borderRadius: 2,
                  height: "100%",
                  "&:hover": {
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center">
                    {/* <Avatar
                      src={employee.avatar}
                      sx={{ width: 60, height: 60, marginRight: 2 }}
                    /> */}
                    <Box>
                      <Typography variant="h6">{employee.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {employee.role}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {employee.username}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EmployeeList;
