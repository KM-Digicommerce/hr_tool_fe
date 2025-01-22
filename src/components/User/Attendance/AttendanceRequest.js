import React from 'react';
import { Container, Box, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import { DatePicker } from '@mui/lab';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const AttendanceRequest = () => {  
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
          Attendance Request Form
        </Typography>

        <form noValidate>
          {/* Employee Information */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Employee ID"
                variant="outlined"
                fullWidth
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Employee Name"
                variant="outlined"
                fullWidth
                required
                size="small"
              />
            </Grid>

            {/* Date of Absence */}
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date of Absence"
                  inputFormat="MM/dd/yyyy"
                  renderInput={(props) => (
                    <TextField {...props} variant="outlined" fullWidth required size="small" />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            {/* Attendance Type (Leave or Absence) */}
            <Grid item xs={12}>
              <TextField
                select
                label="Attendance Type"
                fullWidth
                required
                size="small"
                variant="outlined"
                SelectProps={{
                  native: true,
                }}
              >
                <option value="leave">Leave</option>
                <option value="absence">Absence</option>
              </TextField>
            </Grid>

            {/* Reason for Absence */}
            <Grid item xs={12}>
              <TextField
                label="Reason for Absence"
                variant="outlined"
                fullWidth
                required
                size="small"
                multiline
                rows={4}
              />
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Button variant="contained" color="primary">
              Submit Request
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default AttendanceRequest;
