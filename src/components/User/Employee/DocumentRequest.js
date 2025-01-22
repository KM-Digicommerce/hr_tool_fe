// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Button, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Typography } from '@mui/material';

// const DocumentRequest = () => {
//   const [documentRequests, setDocumentRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch document request data when component mounts
//     const fetchDocumentRequests = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/employee/document-requests`);
//         setDocumentRequests(response.data.requests); // Assuming the response data structure
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch document requests');
//         setLoading(false);
//       }
//     };

//     fetchDocumentRequests();
//   }, []);

//   const handleApproveRequest = async (requestId) => {
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/employee/document-request/approve`, { requestId });
//       if (response.status === 200) {
//         // Update the status of the request in the local state
//         setDocumentRequests(prevState =>
//           prevState.map(request =>
//             request.id === requestId ? { ...request, status: 'Approved' } : request
//           )
//         );
//       }
//     } catch (error) {
//       console.error("Error approving request:", error);
//     }
//   };

//   const handleRejectRequest = async (requestId) => {
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/employee/document-request/reject`, { requestId });
//       if (response.status === 200) {
//         // Update the status of the request in the local state
//         setDocumentRequests(prevState =>
//           prevState.map(request =>
//             request.id === requestId ? { ...request, status: 'Rejected' } : request
//           )
//         );
//       }
//     } catch (error) {
//       console.error("Error rejecting request:", error);
//     }
//   };

//   if (loading) {
//     return (
//       <div style={{ textAlign: 'center' }}>
//         <CircularProgress />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <Typography color="error" variant="h6" align="center">
//         {error}
//       </Typography>
//     );
//   }

//   return (
//     <div style={{ padding: '20px' }}>
//       <Typography variant="h4" gutterBottom>Document Requests</Typography>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Document Name</TableCell>
//             <TableCell>Requested By</TableCell>
//             <TableCell>Status</TableCell>
//             <TableCell>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {documentRequests.map((request) => (
//             <TableRow key={request.id}>
//               <TableCell>{request.documentName}</TableCell>
//               <TableCell>{request.requestedBy}</TableCell>
//               <TableCell>{request.status}</TableCell>
//               <TableCell>
//                 {request.status === 'Pending' && (
//                   <>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={() => handleApproveRequest(request.id)}
//                       style={{ marginRight: '10px' }}
//                     >
//                       Approve
//                     </Button>
//                     <Button
//                       variant="contained"
//                       color="secondary"
//                       onClick={() => handleRejectRequest(request.id)}
//                     >
//                       Reject
//                     </Button>
//                   </>
//                 )}
//                 {request.status === 'Approved' && (
//                   <Typography color="primary">Approved</Typography>
//                 )}
//                 {request.status === 'Rejected' && (
//                   <Typography color="error">Rejected</Typography>
//                 )}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default DocumentRequest;
import React, { useState } from 'react';
import { Button, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';

const DocumentRequestPage = () => {
  // Sample data for document requests
  const initialDocumentRequests = [
    { id: 1, documentName: "Salary Slip", requestedBy: "John Doe", status: "Pending" },
    { id: 2, documentName: "Leave Certificate", requestedBy: "Jane Smith", status: "Approved" },
    { id: 3, documentName: "Tax Form", requestedBy: "Michael Brown", status: "Pending" },
    { id: 4, documentName: "Employment Verification", requestedBy: "Sara Lee", status: "Rejected" },
  ];

  const [documentRequests, setDocumentRequests] = useState(initialDocumentRequests);

  const handleApproveRequest = (requestId) => {
    // Update request status to 'Approved'
    setDocumentRequests(prevState =>
      prevState.map(request =>
        request.id === requestId ? { ...request, status: 'Approved' } : request
      )
    );
  };

  const handleRejectRequest = (requestId) => {
    // Update request status to 'Rejected'
    setDocumentRequests(prevState =>
      prevState.map(request =>
        request.id === requestId ? { ...request, status: 'Rejected' } : request
      )
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Document Requests</Typography>
      
      {/* Display the Document Requests Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Document Name</TableCell>
            <TableCell>Requested By</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documentRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.documentName}</TableCell>
              <TableCell>{request.requestedBy}</TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  color={request.status === 'Pending' ? 'orange' : request.status === 'Approved' ? 'green' : 'red'}
                >
                  {request.status}
                </Typography>
              </TableCell>
              <TableCell>
                {request.status === 'Pending' && (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleApproveRequest(request.id)}
                      style={{ marginRight: '10px' }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleRejectRequest(request.id)}
                    >
                      Reject
                    </Button>
                  </>
                )}
                {request.status === 'Approved' && (
                  <Typography color="primary">Approved</Typography>
                )}
                {request.status === 'Rejected' && (
                  <Typography color="error">Rejected</Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DocumentRequestPage;
