import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Box, Typography, Avatar, Divider, CircularProgress } from '@mui/material';
import axios from 'axios'; // Import axios for making API calls

const EmployeeView = () => {
  const { employeeId } = useParams(); // Get the employeeId from the URL
  const [employee, setEmployee] = useState(null); // State to hold employee data
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Reset error state
        const response = await axios.get(`${process.env.REACT_APP_IP}hr/obtainEmployeeDetails/?employee_id=${employeeId}`);
        if (response && response.data) {
          setEmployee(response.data.data.users); // Set employee data from the API response
        }
      } catch (err) {
        setError("Error fetching employee details"); // Handle errors
        console.error("Error fetching employee details:", err);
      } finally {
        setLoading(false); // Stop loading after the API call
      }
    };

    fetchEmployeeDetails(); // Fetch employee details when component mounts
  }, [employeeId]); // Dependency array ensures it runs when employeeId changes

  // Show loading indicator while fetching data
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Show error message if there was an error during the fetch
  if (error) {
    return <Typography>{error}</Typography>;
  }

  // If employee data is not found
  if (!employee) {
    return <Typography>Employee not found</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Box display="flex" alignItems="center" sx={{ marginBottom: 4 }}>
        <Avatar src={employee.avatar} sx={{ width: 100, height: 100, marginRight: 2 }} />
        <Box>
          <Typography variant="h4">{employee.name}</Typography>
          <Typography variant="h6">{employee.position}</Typography>
          <Typography variant="body1" color="textSecondary">{employee.department}</Typography>
        </Box>
      </Box>
      <Typography variant="body1"><strong>User Name:</strong> {employee.username}</Typography>
      <Typography variant="body1"><strong>Email:</strong> {employee.email}</Typography>
      <Typography variant="body1"><strong>Phone:</strong> {employee.phone}</Typography>
      <Typography variant="body1"><strong>Join Date:</strong> {employee.joinDate}</Typography>

      {/* Additional employee details */}
      <Divider sx={{ marginY: 2 }} />
      <Typography variant="body1"><strong>Position:</strong> {employee.position}</Typography>
      <Typography variant="body1"><strong>Department:</strong> {employee.department}</Typography>
    </Container>
  );
};

export default EmployeeView;
