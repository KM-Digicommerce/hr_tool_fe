import React, { useState } from 'react';
import { Box, TextField, MenuItem, Select, InputLabel, FormControl, Button, Grid, Typography, Paper, FormHelperText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Sample Leave Data
const sampleLeaveRequests = [
  {
    id: 1,
    leaveType: "Sick Leave",
    leaveDate: "2025-01-20",
    duration: "Full Day",
    reason: "Feeling unwell",
  },
  {
    id: 2,
    leaveType: "Casual Leave",
    leaveDate: "2025-01-18",
    duration: "Half Day",
    reason: "Personal reasons",
  },
  {
    id: 3,
    leaveType: "Earned Leave",
    leaveDate: "2025-01-15",
    duration: "Full Day",
    reason: "Family function",
  },
];

const LeaveRequest = () => {
  // State to handle form data
  const [leaveType, setLeaveType] = useState('');
  const [leaveDate, setLeaveDate] = useState(null);
  const [duration, setDuration] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [isFormOpen, setFormOpen] = useState(false); // State to toggle the form visibility
  const [leaveRequests, setLeaveRequests] = useState(sampleLeaveRequests); // Store leave requests

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form inputs
    if (!leaveType || !leaveDate || !duration || !reason) {
      setError('All fields are required');
      return;
    }

    // Add new leave request to the list
    const newRequest = {
      id: leaveRequests.length + 1,
      leaveType,
      leaveDate: leaveDate.toISOString().split('T')[0], // Format the date as yyyy-mm-dd
      duration,
      reason,
    };

    setLeaveRequests([...leaveRequests, newRequest]);

    // Reset form values
    setLeaveType('');
    setLeaveDate(null);
    setDuration('');
    setReason('');
    setFormOpen(false); // Close the form after submission
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Leave Requests
      </Typography>

      {/* Apply Button in the Top-right corner */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
        <Button variant="contained" color="primary" onClick={() => setFormOpen(true)}>
          Apply
        </Button>
      </Box>

      {/* Leave Request Table */}
      <TableContainer component={Paper} sx={{ marginBottom: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Leave Type</TableCell>
              <TableCell>Leave Date</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Reason</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaveRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.leaveType}</TableCell>
                <TableCell>{request.leaveDate}</TableCell>
                <TableCell>{request.duration}</TableCell>
                <TableCell>{request.reason}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog (Pop-up) for Leave Request Form */}
      <Dialog open={isFormOpen} onClose={() => setFormOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Leave Request Form</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Leave Type Dropdown */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!error}>
                  <InputLabel>Leave Type</InputLabel>
                  <Select
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                    label="Leave Type"
                    required
                  >
                    <MenuItem value="sick">Sick Leave</MenuItem>
                    <MenuItem value="casual">Casual Leave</MenuItem>
                    <MenuItem value="earned">Earned Leave</MenuItem>
                    <MenuItem value="priviliged">Priviliged Leave</MenuItem>
                    <MenuItem value="maternity">Maternity Leave</MenuItem>
                    <MenuItem value="paternity">Paternity Leave</MenuItem>
                    <MenuItem value="sandwitch">Sandwitch Leave</MenuItem>
                  </Select>
                  {error && <FormHelperText>{error}</FormHelperText>}
                </FormControl>
              </Grid>

              {/* Leave Date Picker */}
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Leave Date"
                    value={leaveDate}
                    onChange={(newValue) => setLeaveDate(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth required />}
                  />
                </LocalizationProvider>
              </Grid>

              {/* Duration Dropdown */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!error}>
                  <InputLabel>Duration</InputLabel>
                  <Select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    label="Duration"
                    required
                  >
                    <MenuItem value="full-day">Full Day</MenuItem>
                    <MenuItem value="half-day">Half Day</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Reason Input */}
              <Grid item xs={12}>
                <TextField
                  label="Reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  fullWidth
                  multiline
                  rows={4}
                  required
                  error={!!error}
                  helperText={error && "This field is required"}
                />
              </Grid>
            </Grid>
            </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Submit Leave Request
          </Button>
        </DialogActions>
   
    </Dialog>
    </Box>
  );
};

export default LeaveRequest;
