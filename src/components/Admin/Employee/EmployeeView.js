import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Box, Typography, Avatar, Divider } from '@mui/material';

// Static employee data
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

const EmployeeView = () => {
  const { employeeId } = useParams(); // Get the employeeId from the URL
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    // Find the employee based on the employeeId from the URL params
    const employeeData = employees.find(emp => emp.id === parseInt(employeeId));
    setEmployee(employeeData);
  }, [employeeId]);

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
