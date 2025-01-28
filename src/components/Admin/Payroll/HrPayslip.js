import React, { useState, useEffect } from 'react';
import {
  Container, TextField, Button, MenuItem, Select, InputLabel, FormControl, Grid, IconButton, Dialog, 
  DialogActions, DialogContent, DialogTitle, Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const HrPayslip = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [allowances, setAllowances] = useState([{ name: '', amount: 0.0 }]);
  const [deductions, setDeductions] = useState([{ name: '', amount: 0.0 }]);
  const [from_date, setFromDate] = useState(null);
  const [to_date, setToDate] = useState(null);

  const [openDialog, setOpenDialog] = useState(false); // For dialog visibility

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_HR_IP}hr/obtainAllEmployee/`);
        setEmployees(response.data.data.user_list); // Assuming response.data is an array of employees
      } catch (error) {
        console.error('Error fetching employees', error);
      }
    };
    fetchEmployees();
  }, []);

  const handleEmployeeChange = (event) => {
    setSelectedEmployee(event.target.value);
  };

  const handleAllowanceChange = (index, field, value) => {
    const newAllowances = [...allowances];
    if (field === 'amount') {
      newAllowances[index][field] = parseFloat(value) || 0.0; // Ensure it's a float value
    } else {
      newAllowances[index][field] = value;
    }
    setAllowances(newAllowances);
  };

  const handleDeductionChange = (index, field, value) => {
    const newDeductions = [...deductions];
    if (field === 'amount') {
      newDeductions[index][field] = parseFloat(value) || 0.0; // Ensure it's a float value
    } else {
      newDeductions[index][field] = value;
    }
    setDeductions(newDeductions);
  };

  const handleAddAllowance = () => {
    setAllowances([...allowances, { name: '', amount: 0.0 }]);
  };

  const handleRemoveAllowance = (index) => {
    const newAllowances = allowances.filter((_, i) => i !== index);
    setAllowances(newAllowances);
  };

  const handleAddDeduction = () => {
    setDeductions([...deductions, { name: '', amount: 0.0 }]);
  };

  const handleRemoveDeduction = (index) => {
    const newDeductions = deductions.filter((_, i) => i !== index);
    setDeductions(newDeductions);
  };

  const handleSubmit = async () => {
    // Prepare the payslip data
    if (!selectedEmployee || !from_date || !to_date || allowances.some(a => !a.name || a.amount <= 0) || deductions.some(d => !d.name || d.amount <= 0)) {
        alert('Please fill all fields to generate a payslip');
        return; // Prevent form submission
      }
    const payslipData = {
      employee_id: selectedEmployee,
      allowances,
      deductions,
      from_date,
      to_date,
    };

    try {
      // Send the data to the API to generate the payslip
      const response = await axios.post(`${process.env.REACT_APP_HR_IP}hr/generatePaySlipForEmployee/`, payslipData);
      console.log('Payslip Generated:', response.data);
      // Close the dialog after the payslip is generated
      handleCloseDialog();
      // Reset the form data
      resetFormData();
    } catch (error) {
      console.error('Error generating payslip:', error);
    }
  };

  const handleOpenDialog = () => {
    resetFormData();
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Function to reset the form data
  const resetFormData = () => {
    setSelectedEmployee('');
    setAllowances([{ name: '', amount: 0.0 }]);
    setDeductions([{ name: '', amount: 0.0 }]);
    setFromDate(null);
    setToDate(null);
  };

  // Function to format number to two decimal places
  const formatAmount = (amount) => {
    return amount.toFixed(2); // Formats the amount to always show two decimal places
  };

  return (
    <Container maxWidth="sm" sx={{ position: 'relative', marginRight:0 }}
    className='payslip-container'>
      {/* Generate Payslip Button (Top-right corner) */}
      <Button
        variant="contained"
        color="primary"
        sx={{ position: 'absolute', top: 1, right: 1 }}
        onClick={handleOpenDialog}
      >
        Generate Payslip
      </Button>

      {/* Dialog for Generate Payslip */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Generate Payslip</DialogTitle>
        <DialogContent>
          {/* Employee Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Employee</InputLabel>
            <Select
              value={selectedEmployee}
              onChange={handleEmployeeChange}
              label="Employee"
            >
              {employees.map((employee) => (
                <MenuItem key={employee.id} value={employee.id}>
                  {employee.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Allowances Section */}
          <Grid container justifyContent="space-between" alignItems="center" marginBottom={2}>
            <Grid item>
              <Typography variant="h6" gutterBottom>
                Allowances
              </Typography>
            </Grid>
            <Grid item>
              <Button onClick={handleAddAllowance} variant="outlined" size="small">
                Add Allowance
              </Button>
            </Grid>
          </Grid>
          {allowances.map((allowance, index) => (
            <Grid container spacing={2} key={index} alignItems="center" marginBottom={2}>
              <Grid item xs={5}>
                <TextField
                  label="Allowance Name"
                  value={allowance.name}
                  onChange={(e) => handleAllowanceChange(index, 'name', e.target.value)}
                  fullWidth
                  inputProps={{ pattern: '[A-Za-z ]*' }} // Allows only text input
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  label="Allowance Amount"
                  value={formatAmount(allowance.amount)} // Always display with 2 decimals
                  onChange={(e) => handleAllowanceChange(index, 'amount', e.target.value)}
                  fullWidth
                  type="number"
                  inputProps={{ step: "0.01", min: "0", style: { appearance: 'none' } }} // Remove spinner
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={() => handleRemoveAllowance(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}

          {/* Deductions Section */}
          <Grid container justifyContent="space-between" alignItems="center" marginBottom={2}>
            <Grid item>
              <Typography variant="h6" gutterBottom>
                Deductions
              </Typography>
            </Grid>
            <Grid item>
              <Button onClick={handleAddDeduction} variant="outlined" size="small">
                Add Deduction
              </Button>
            </Grid>
          </Grid>
          {deductions.map((deduction, index) => (
            <Grid container spacing={2} key={index} alignItems="center" marginBottom={2}>
              <Grid item xs={5}>
                <TextField
                  label="Deduction Name"
                  value={deduction.name}
                  onChange={(e) => handleDeductionChange(index, 'name', e.target.value)}
                  fullWidth
                  inputProps={{ pattern: '[A-Za-z ]*' }} // Allows only text input
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  label="Deduction Amount"
                  value={formatAmount(deduction.amount)} // Always display with 2 decimals
                  onChange={(e) => handleDeductionChange(index, 'amount', e.target.value)}
                  fullWidth
                  type="number"
                  inputProps={{ step: "0.01", min: "0", style: { appearance: 'none' } }} // Remove spinner
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={() => handleRemoveDeduction(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}

          {/* Date Range Picker */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={2} marginTop={2}>
              <Grid item xs={6}>
                <DatePicker
                  label="From Date"
                  value={from_date}
                  onChange={(newValue) => setFromDate(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  label="To Date"
                  value={to_date}
                  onChange={(newValue) => setToDate(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Generate Payslip
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HrPayslip;
