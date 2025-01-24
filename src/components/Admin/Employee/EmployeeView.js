import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Box, Typography, Avatar, Divider, CircularProgress, Grid } from '@mui/material';
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
        const response = await axios.get(`${process.env.REACT_APP_HR_IP}hr/obtainEmployeeDetails/?employee_id=${employeeId}`);
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
        {/* Use a default avatar image as API doesn't provide avatar */}
        <Avatar sx={{ width: 100, height: 100, marginRight: 2 }} src="/path/to/default-avatar.jpg" />
        <Box>
          <Typography variant="h4">{employee.first_name}</Typography>
          <Typography variant="h6">{employee.job_position || 'Not Provided'}</Typography>
          <Typography variant="body1" color="textSecondary">{employee.department}</Typography>
        </Box>
      </Box>

      {/* Display basic employee information */}
      <Typography variant="body1"><strong>Username:</strong> {employee.username}</Typography>
      <Typography variant="body1"><strong>Email:</strong> {employee.email}</Typography>
      <Typography variant="body1"><strong>Phone:</strong> {employee.contact_number || 'Not Provided'}</Typography>
      <Typography variant="body1"><strong>Join Date:</strong> {employee.last_login}</Typography>

      {/* Additional employee details */}
      <Divider sx={{ marginY: 2 }} />
      <Typography variant="body1"><strong>Position:</strong> {employee.job_position || 'Not Provided'}</Typography>
      <Typography variant="body1"><strong>Department:</strong> {employee.department}</Typography>

      {/* Display Bank Account Info */}
      <Divider sx={{ marginY: 2 }} />
      <Typography variant="body1"><strong>Bank Name:</strong> {employee.bank_account?.bank_name || 'Not Provided'}</Typography>
      <Typography variant="body1"><strong>Branch:</strong> {employee.bank_account?.branch || 'Not Provided'}</Typography>
      <Typography variant="body1"><strong>Account Number:</strong> {employee.bank_account?.account_number || 'Not Provided'}</Typography>

      {/* Show other fields that might be present in the response */}
      <Divider sx={{ marginY: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1"><strong>State:</strong> {employee.state || 'Not Provided'}</Typography>
          <Typography variant="body1"><strong>Country:</strong> {employee.country || 'Not Provided'}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1"><strong>City:</strong> {employee.city || 'Not Provided'}</Typography>
          <Typography variant="body1"><strong>Zip Code:</strong> {employee.zip_code || 'Not Provided'}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EmployeeView;
