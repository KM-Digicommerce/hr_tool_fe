import React from "react";
import { Container, Box, Grid, Card, CardContent, Typography, Avatar } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

// Sample employee data
const employees = [
  {
    id: 1,
    name: "John Doe",
    position: "Software Engineer",
    department: "IT Department",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    avatar: "https://img.freepik.com/free-photo/business-man-by-skyscraper_1303-13655.jpg?uid=R178818371&ga=GA1.1.965077700.1728471595&semt=ais_hybrid",
    joinDate: "2020-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "HR Manager",
    department: "HR Department",
    email: "jane.smith@example.com",
    phone: "+1 234 567 891",
    avatar: "https://img.freepik.com/free-photo/studio-portrait-beautiful-young-woman-posing_1301-3611.jpg?uid=R178818371&ga=GA1.1.965077700.1728471595&semt=ais_hybrid",
    joinDate: "2018-03-25",
  },
  {
    id: 3,
    name: "Michael Johnson",
    position: "Backend Developer",
    department: "IT Department",
    email: "michael@example.com",
    phone: "+1 234 567 891",
    avatar: "https://img.freepik.com/free-photo/portrait-man-with-glasses_23-2148514897.jpg?uid=R178818371&ga=GA1.1.965077700.1728471595&semt=ais_hybrid",
    joinDate: "2018-03-25",
  },
  // Add more employees as needed
];

const EmployeeList = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      {/* Employee Cards */}
      <Grid container spacing={4}>
        {employees.map((employee) => (
          <Grid item xs={12} sm={6} md={4} key={employee.id}>
            <Link to={`/hr/employee-view/${employee.id}`} style={{ textDecoration: "none" }}> {/* Link to the employee view page */}
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
                    <Avatar
                      src={employee.avatar}
                      sx={{ width: 60, height: 60, marginRight: 2 }}
                    />
                    <Box>
                      <Typography variant="h6">{employee.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {employee.position}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {employee.department}
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
