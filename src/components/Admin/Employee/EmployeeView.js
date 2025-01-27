import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Box, Typography, Avatar, Divider, CircularProgress, Grid, Tabs, Tab, Table, TableBody, TableCell, TableHead, TableRow, Button, Paper } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'; // Import axios for making API calls

const EmployeeView = () => {
  const { employeeId } = useParams(); // Get the employeeId from the URL
  const [employee, setEmployee] = useState(null); // State to hold employee data
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle errors
  const [selectedTab, setSelectedTab] = useState(0); // State to handle selected tab

  const [workTypeShiftData, setWorkTypeShiftData] = useState(null);
  const [workTypeShift, setWorkTypeShift] = useState(null);
  const [loadingWorkTypeShift, setLoadingWorkTypeShift] = useState(false);
  const [errorWorkTypeShift, setErrorWorkTypeShift] = useState(null);
  // States for payslip data
  const [payslips, setPayslips] = useState([]);
  const [loadingPayslips, setLoadingPayslips] = useState(false);
  const [errorPayslips, setErrorPayslips] = useState(null);
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      leaveType: 'Sick Leave',
      startDate: '2025-01-01',
      endDate: '2025-01-03',
      requestedDays: 3,
      status: 'Pending',
    },
    {
      id: 2,
      leaveType: 'Casual Leave',
      startDate: '2025-02-10',
      endDate: '2025-02-12',
      requestedDays: 2,
      status: 'Pending',
    },
    {
      id: 3,
      leaveType: 'Annual Leave',
      startDate: '2025-03-15',
      endDate: '2025-03-20',
      requestedDays: 5,
      status: 'Approved',
    }
  ]);
  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${process.env.REACT_APP_HR_IP}hr/obtainEmployeeDetails/?employee_id=${employeeId}`);
        if (response && response.data) {
          setEmployee(response.data.data.users);
        }
      } catch (err) {
        setError("Error fetching employee details");
        console.error("Error fetching employee details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [employeeId]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    if (newValue === 1) {
        fetchWorkTypeShiftData(); // Fetch Work Type & Shift data when tab is clicked
      } 
      if (newValue === 2) {
        fetchPayslipsData(); // Fetch Payslips data when PaySlip tab is clicked
      }
  };
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_HR_IP}hr/updateWorkTypeRequest/`, {
        employee_id: employeeId,
        id,
        status: newStatus
      });
      console.log(response.data, "response");
      
      if (response.data.data.success) {
        // Immediately update the status in the local state to reflect the change live
        setWorkTypeShiftData(prevData =>
          prevData.map(item =>
            item.id === id ? { ...item, status: newStatus } : item
          )
        );
        fetchWorkTypeShiftData(); // Fetch Work Type & Shift data when tab is clicked
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };
  const fetchWorkTypeShiftData = async () => {
    setLoadingWorkTypeShift(true);
    setErrorWorkTypeShift(null);
    setWorkTypeShiftData(null); // Reset previous data
    try {
      const response = await axios.get(`${process.env.REACT_APP_HR_IP}hr/workTypeRequest/?employee_id=${employeeId}`);
      setWorkTypeShift(response.data.data.current_type_name);  // Store the "current_type_name" from the response
      setWorkTypeShiftData(response.data.data.users);  // Store the "users" array from the response
    } catch (err) {
      setErrorWorkTypeShift("Error fetching work type & shift data");
      console.error("Error fetching work type & shift data:", err);
    } finally {
      setLoadingWorkTypeShift(false);
    }
  };
  const fetchPayslipsData = async () => {
    setLoadingPayslips(true);
    setErrorPayslips(null);
    setPayslips([]); // Reset previous payslip data
    try {
      const response = await axios.get(`${process.env.REACT_APP_HR_IP}hr/obtainPaySlipsForUser/?employee_id=${employeeId}`);
      if (response.data && response.data.data.users) {
        setPayslips(response.data.data.users);  // Store the payslips data in state
      }
    } catch (err) {
      setErrorPayslips("Error fetching payslips data");
      console.error("Error fetching payslips data:", err);
    } finally {
      setLoadingPayslips(false);
    }
  };
  const handleLeaveStatusUpdate = (id, newStatus) => {
    // Update the status of the leave request in state
    setLeaveRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  if (!employee) {
    return <Typography>Employee not found</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ marginTop: 1 }}>
      <Box display="flex" alignItems="center" sx={{ marginBottom: 4 }}>
        <Avatar sx={{ width: 100, height: 100, marginRight: 2 }} src="/path/to/default-avatar.jpg" />
        <Box>
          <Typography variant="h4">{employee.first_name}</Typography>
          <Typography variant="h6">{employee.job_position || 'Not Provided'}</Typography>
          <Typography variant="body1" color="textSecondary">{employee.department}</Typography>
        </Box>
      </Box>

      <Tabs value={selectedTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary" variant="fullWidth" aria-label="employee details tabs">
        <Tab label="About" />
        <Tab label="Work Type & Shift" />
        <Tab label="PaySlip" />
        <Tab label="Leave" />
      </Tabs>

      <Box sx={{ paddingTop: 2 }}>
        {selectedTab === 0 && (
          <>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>About Employee</Typography>
            <Typography variant="body1"><strong>Username:</strong> {employee.username}</Typography>
            <Typography variant="body1"><strong>Email:</strong> {employee.email}</Typography>
            <Typography variant="body1"><strong>Phone:</strong> {employee.contact_number || 'Not Provided'}</Typography>
            <Typography variant="body1"><strong>Join Date:</strong> {employee.last_login}</Typography>
            <Divider sx={{ marginY: 2 }} />
            <Typography variant="body1"><strong>Position:</strong> {employee.job_position || 'Not Provided'}</Typography>
            <Typography variant="body1"><strong>Department:</strong> {employee.department}</Typography>
            <Divider sx={{ marginY: 2 }} />
            <Typography variant="body1"><strong>Bank Name:</strong> {employee.bank_account?.bank_name || 'Not Provided'}</Typography>
            <Typography variant="body1"><strong>Branch:</strong> {employee.bank_account?.branch || 'Not Provided'}</Typography>
            <Typography variant="body1"><strong>Account Number:</strong> {employee.bank_account?.account_number || 'Not Provided'}</Typography>
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
          </>
        )}

{selectedTab === 1 && (
          <>
            <Typography variant="h5">Work Type & Shift</Typography>
            {workTypeShiftData ? (
              <Typography variant="h6">Current Shift : {workTypeShift} </Typography>
            ) : null}
            {loadingWorkTypeShift ? (
              <CircularProgress />
            ) : errorWorkTypeShift ? (
              <Typography color="error">{errorWorkTypeShift}</Typography>
            ) : workTypeShiftData ? (
              <Paper sx={{ padding: 2, overflowX: 'auto' }}>
                <Table>
                  <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                    <TableRow>
                      <TableCell sx={{ width: '15%',textAlign:'center' }}>Username</TableCell>
                      <TableCell sx={{ width: '15%',textAlign:'center' }}>Work Type</TableCell>
                      <TableCell sx={{ width: '10%',textAlign:'center' }}>Date</TableCell>
                      <TableCell sx={{ width: '15%',textAlign:'center' }}>From Date</TableCell>
                      <TableCell sx={{ width: '15%',textAlign:'center' }}>To Date</TableCell>
                      <TableCell sx={{ width: '25%',textAlign:'center' }}>Description</TableCell>
                      <TableCell sx={{ width: '10%',textAlign:'center' }}>Status</TableCell>
                      <TableCell sx={{ width: '20%',textAlign:'center' }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {workTypeShiftData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.username}</TableCell>
                        <TableCell>{row.type_name}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.from_date}</TableCell>
                        <TableCell>{row.to_date}</TableCell>
                        <TableCell>{row.description}</TableCell>
                        <TableCell> {row.status} </TableCell>
                        <TableCell sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleStatusUpdate(row.id, 'approved')}
                            disabled={row.status === 'approved'}
                            sx={{ minWidth: '80px' }}
                          >
                            <CheckIcon />
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleStatusUpdate(row.id, 'rejected')}
                            disabled={row.status === 'rejected'}
                            sx={{ minWidth: '80px' }}
                          >
                            <CloseIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            ) : (
              <Typography>No data available for Work Type & Shift.</Typography>
            )}
          </>
        )}
       {selectedTab === 2 && (
  <>
    <Typography variant="h5">Payslips</Typography>
    {loadingPayslips ? (
      <CircularProgress />
    ) : errorPayslips ? (
      <Typography color="error">{errorPayslips}</Typography>
    ) : payslips.length > 0 ? (
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Table>
        <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
        <TableRow>
              <TableCell sx={{ textAlign: 'center' }}>Payslip Period</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Status</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Total Salary</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Allowances</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Deductions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payslips.map((payslip) => (
              <TableRow key={payslip.id}>
                <TableCell sx={{ textAlign: 'center' }}>
                  {new Date(payslip.from_date).toLocaleDateString()} - {new Date(payslip.to_date).toLocaleDateString()}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{payslip.status}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{payslip.total_salary}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <ul>
                    {payslip.allowances.map((allowance, index) => (
                      <li key={index}>
                        {allowance.name}: {allowance.amount}
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <ul>
                    {payslip.deductions.map((deduction, index) => (
                      <li key={index}>
                        {deduction.name}: {deduction.amount}
                      </li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    ) : (
      <Typography>No payslips available.</Typography>
    )}
  </>
)}
   {selectedTab === 3 && (
          <>
            <Typography variant="h5">Leave</Typography>
            <Table>
            <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
                  <TableCell>Leave Type</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Requested Days</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaveRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.leaveType}</TableCell>
                    <TableCell>{request.startDate}</TableCell>
                    <TableCell>{request.endDate}</TableCell>
                    <TableCell>{request.requestedDays} days</TableCell>
                    <TableCell>{request.status}</TableCell>
                    <TableCell>
                      {request.status === 'Pending' && (
                        <>
                          <Button
                            onClick={() => handleLeaveStatusUpdate(request.id, 'Approved')}
                            startIcon={<CheckIcon />}
                            sx={{ color: 'green', marginRight: 1 }}
                          >
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleLeaveStatusUpdate(request.id, 'Rejected')}
                            startIcon={<CloseIcon />}
                            sx={{ color: 'red' }}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      {request.status === 'Approved' && (
                        <Typography sx={{ color: 'green' }}>Approved</Typography>
                      )}
                      {request.status === 'Rejected' && (
                        <Typography sx={{ color: 'red' }}>Rejected</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </Box>
    </Container>
  );
};

export default EmployeeView;
