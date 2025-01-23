import React, { useState } from "react";
import { Container, Box, Card, CardContent, Typography, Avatar, TextField, Button, Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const Profile = () => {
  // Sample data for employee
  const [employeeData, setEmployeeData] = useState({
    fullName: "John Doe",
    jobTitle: "Software Engineer",
    department: "Development",
    email: "john.doe@example.com",
    phone: "+1 234 567 8901",
    address: "123 Street, City, Country",
    profilePicture: ""
  });

  // For edit mode
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({ ...employeeData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handleSave = () => {
    setEmployeeData({ ...editedData });
    setEditMode(false);
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Card>
        <CardContent>
          {/* Profile Picture Section */}
          <Box display="flex" alignItems="center" justifyContent="center" sx={{ mb: 4 }}>
            <Avatar
              src={employeeData.profilePicture}
              sx={{ width: 120, height: 120 }}
            />
            {editMode && (
              <Button
                variant="contained"
                color="primary"
                sx={{ ml: 2 }}
                startIcon={<EditIcon />}
              >
                Change Picture
              </Button>
            )}
          </Box>

          {/* Personal Information */}
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Personal Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                name="fullName"
                value={editMode ? editedData.fullName : employeeData.fullName}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Job Title"
                variant="outlined"
                fullWidth
                name="jobTitle"
                value={editMode ? editedData.jobTitle : employeeData.jobTitle}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Department"
                variant="outlined"
                fullWidth
                name="department"
                value={editMode ? editedData.department : employeeData.department}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={editMode ? editedData.email : employeeData.email}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                name="phone"
                value={editMode ? editedData.phone : employeeData.phone}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                name="address"
                value={editMode ? editedData.address : employeeData.address}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Grid>
          </Grid>

          {/* Action buttons */}
          <Box display="flex" justifyContent="flex-end" sx={{ mt: 3 }}>
            {editMode ? (
              <>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ mr: 2 }}
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
