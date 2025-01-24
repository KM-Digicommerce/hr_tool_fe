import React, { useState, useEffect } from "react";
import { Container, Box, Card, CardContent, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Done, Cancel } from "@mui/icons-material";
import axios from "axios";

const WorkTypeRequest = () => {
  const [requests, setRequests] = useState([]); // Start with an empty array to hold the requests
  const employeeId = localStorage.getItem("employeeId");

  // Fetch work type requests from API on component mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_HR_IP}hr/workTypeRequest/?employee_id=${employeeId}`);
        console.log(response.data, "response"); // Log the response to inspect the data structure
        // Assuming the response has a data field containing an array of requests
        setRequests(response.data); // Update the state with the API response data
      } catch (error) {
        console.error("Error fetching work type requests:", error);
      }
    };

    fetchRequests();
  }, [employeeId]); // Empty dependency array means this effect runs once on component mount

  const handleAction = (requestId, action) => {
    // Simulate the action (approve or reject) on the request
    const updatedRequests = requests.map((request) =>
      request.id === requestId
        ? {
            ...request,
            status: action === "approve" ? "Approved" : "Rejected",
          }
        : request
    );
    setRequests(updatedRequests);
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Work Type Requests
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Work Type</strong></TableCell>
                  <TableCell><strong>Requested By</strong></TableCell>
                  <TableCell><strong>Start Date</strong></TableCell>
                  <TableCell><strong>End Date</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No requests available
                    </TableCell>
                  </TableRow>
                ) : (
                  requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.workType}</TableCell>
                      <TableCell>{request.requestedBy}</TableCell>
                      <TableCell>{request.startDate}</TableCell>
                      <TableCell>{request.endDate}</TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            color:
                              request.status === "Approved"
                                ? "green"
                                : request.status === "Rejected"
                                ? "red"
                                : "orange",
                            fontWeight: "bold",
                          }}
                        >
                          {request.status}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {request.status === "Pending" && (
                          <Box>
                            <Button
                              variant="contained"
                              color="success"
                              sx={{ mr: 1 }}
                              onClick={() => handleAction(request.id, "approve")}
                              startIcon={<Done />}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => handleAction(request.id, "reject")}
                              startIcon={<Cancel />}
                            >
                              Reject
                            </Button>
                          </Box>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  );
};

export default WorkTypeRequest;
