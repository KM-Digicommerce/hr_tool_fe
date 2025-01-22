import React, { useState } from "react";
import { Container, Box, Card, CardContent, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Done, Cancel } from "@mui/icons-material";

const WorkTypeRequest = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      workType: "Remote Work",
      startDate: "2025-01-25",
      endDate: "2025-01-28",
      status: "Pending",
      requestedBy: "John Doe",
    },
    {
      id: 2,
      workType: "Leave",
      startDate: "2025-01-20",
      endDate: "2025-01-22",
      status: "Approved",
      requestedBy: "Jane Smith",
    },
    {
      id: 3,
      workType: "Leave",
      startDate: "2025-02-01",
      endDate: "2025-02-03",
      status: "Rejected",
      requestedBy: "Michael Johnson",
    },
  ]);

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
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.workType}</TableCell>
                    <TableCell>{request.requestedBy}</TableCell>
                    <TableCell>{request.startDate}</TableCell>
                    <TableCell>{request.endDate}</TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          color: request.status === "Approved" ? "green" : request.status === "Rejected" ? "red" : "orange",
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  );
};

export default WorkTypeRequest;
