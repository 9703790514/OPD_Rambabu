// // import React, { useState, useEffect } from 'react';
// // import PropTypes from 'prop-types';
// // import {
// //   Box,
// //   Typography,
// //   Paper,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Chip,
// //   Button,
// //   CircularProgress,
// //   Alert,
// //   TextField,
// //   ToggleButtonGroup,
// //   ToggleButton,
// // } from '@mui/material';
// // import EventNoteIcon from '@mui/icons-material/EventNote';
// // import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// // import PendingActionsIcon from '@mui/icons-material/PendingActions';
// // import CancelIcon from '@mui/icons-material/Cancel';
// // import PersonIcon from '@mui/icons-material/Person';
// // import AccessTimeIcon from '@mui/icons-material/AccessTime';
// // import DoneAllIcon from '@mui/icons-material/DoneAll';

// // const DoctorAppointments = ({ doctorUser }) => {
// //   const [appointments, setAppointments] = useState([]);
// //   const [filteredAppointments, setFilteredAppointments] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [selectedSection, setSelectedSection] = useState('Upcoming');

// //   // Fetch appointments function (same as before)
// //   const fetchAppointments = async () => {
// //     if (!doctorUser || !doctorUser.userId) {
// //       setError('Doctor user ID is not available.');
// //       setLoading(false);
// //       return;
// //     }

// //     setLoading(true);
// //     setError(null);

// //     console.log('Fetching appointments for Doctor ID:', doctorUser.userId);

// //     try {
// //       const response = await fetch(
// //         `http://localhost:2010/api/appointments/doctor/${doctorUser.userId}`
// //       );

// //       if (!response.ok) {
// //         const errorText = await response.text();
// //         throw new Error(`Failed to fetch appointments: ${response.status} - ${errorText}`);
// //       }

// //       const data = await response.json();
// //       setAppointments(data);
// //       setFilteredAppointments(data);
// //       console.log('Appointments fetched successfully:', data);
// //     } catch (err) {
// //       console.error('Error fetching appointments:', err);
// //       setError(err.message || 'Failed to load appointments.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAppointments();
// //   }, [doctorUser.userId]);

// //   // Filter appointments on searchTerm change
// //   useEffect(() => {
// //     if (!searchTerm.trim()) {
// //       setFilteredAppointments(appointments);
// //       return;
// //     }

// //     const lowerSearch = searchTerm.toLowerCase();

// //     const filtered = appointments.filter(
// //       (appt) =>
// //         (appt.patientName && appt.patientName.toLowerCase().includes(lowerSearch)) ||
// //         (appt.reasonForVisit && appt.reasonForVisit.toLowerCase().includes(lowerSearch)) ||
// //         (appt.patientId && appt.patientId.toLowerCase().includes(lowerSearch))
// //     );

// //     setFilteredAppointments(filtered);
// //   }, [searchTerm, appointments]);

// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case 'Confirmed':
// //         return 'success';
// //       case 'Pending':
// //         return 'warning';
// //       case 'Cancelled':
// //         return 'error';
// //       case 'Scheduled':
// //         return 'info';
// //       case 'Completed':
// //         return 'primary';
// //       default:
// //         return 'default';
// //     }
// //   };

// //   const getStatusIcon = (status) => {
// //     switch (status) {
// //       case 'Confirmed':
// //         return <CheckCircleIcon fontSize="small" />;
// //       case 'Pending':
// //         return <PendingActionsIcon fontSize="small" />;
// //       case 'Cancelled':
// //         return <CancelIcon fontSize="small" />;
// //       case 'Scheduled':
// //         return <EventNoteIcon fontSize="small" />;
// //       case 'Completed':
// //         return <DoneAllIcon fontSize="small" />;
// //       default:
// //         return null;
// //     }
// //   };

// //   const handleUpdateStatus = async (appointmentId, newStatus) => {
// //     console.log(`Attempting to update status for Appointment ID: ${appointmentId} to ${newStatus}`);
// //     try {
// //       const response = await fetch(
// //         `http://localhost:2010/api/appointments/${appointmentId}/status`,
// //         {
// //           method: 'PUT',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify({ status: newStatus }),
// //         }
// //       );

// //       if (!response.ok) {
// //         const errorText = await response.text();
// //         throw new Error(`Failed to update appointment status: ${response.status} - ${errorText}`);
// //       }
// //       await fetchAppointments();
// //       console.log(`Successfully updated status for Appointment ID: ${appointmentId}`);
// //     } catch (err) {
// //       console.error('Error updating appointment status:', err);
// //       setError(err.message || 'Failed to update appointment status.');
// //     }
// //   };

// //   // Define section filters
// //   const sectionFilters = {
// //     Upcoming: (appt) =>
// //       appt.status === 'Scheduled' || appt.status === 'Confirmed' || appt.status === 'Pending',
// //     Completed: (appt) => appt.status === 'Completed',
// //     Cancelled: (appt) => appt.status === 'Cancelled',
// //   };

// //   // Filter appointments for currently selected section
// //   const currentSectionAppointments = filteredAppointments.filter(sectionFilters[selectedSection]);

// //   // Render section table or no data alert
// //   const renderAppointmentsTable = (appts) => (
// //     appts.length === 0 ? (
// //       <Alert severity="info" sx={{ mb: 3 }}>
// //         No {selectedSection.toLowerCase()} appointments found.
// //       </Alert>
// //     ) : (
// //       <TableContainer component={Paper} elevation={6} sx={{ borderRadius: 3 }}>
// //         <Table aria-label={`${selectedSection} appointments table`}>
// //           <TableHead sx={{ bgcolor: '#e3f2fd' }}>
// //             <TableRow>
// //               <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Patient Name</TableCell>
// //               <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Date</TableCell>
// //               <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Time</TableCell>
// //               <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Type</TableCell>
// //               <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Status</TableCell>
// //               <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Actions</TableCell>
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {appts.map((row) => (
// //               <TableRow
// //                 key={row.id}
// //                 sx={{
// //                   '&:last-child td, &:last-child th': { border: 0 },
// //                   '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
// //                 }}
// //               >
// //                 <TableCell>
// //                   <PersonIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
// //                   {row.patientName || row.patientId || 'N/A'}
// //                 </TableCell>
// //                 <TableCell>{row.appointmentDate || 'N/A'}</TableCell>
// //                 <TableCell>
// //                   <AccessTimeIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
// //                   {row.appointmentTime
// //                     ? new Date(row.appointmentTime).toLocaleTimeString([], {
// //                         hour: '2-digit',
// //                         minute: '2-digit',
// //                       })
// //                     : 'N/A'}
// //                 </TableCell>
// //                 <TableCell>{row.reasonForVisit || 'N/A'}</TableCell>
// //                 <TableCell>
// //                   <Chip
// //                     label={row.status || 'Unknown'}
// //                     color={getStatusColor(row.status)}
// //                     size="small"
// //                     icon={getStatusIcon(row.status)}
// //                   />
// //                 </TableCell>
// //                 <TableCell>
// //                   {/* Show "Complete" button only for Scheduled or Confirmed in Upcoming */}
// //                   {selectedSection === 'Upcoming' &&
// //                     (row.status === 'Scheduled' || row.status === 'Confirmed') && (
// //                       <Button
// //                         variant="contained"
// //                         size="small"
// //                         color="primary"
// //                         onClick={() => handleUpdateStatus(row.id, 'Completed')}
// //                         sx={{ mr: 1 }}
// //                       >
// //                         Complete
// //                       </Button>
// //                     )}
// //                 </TableCell>
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>
// //     )
// //   );

// //   return (
// //     <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', width: '100%' }}>
// //       <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.dark' }}>
// //         Appointments Management
// //       </Typography>

// //       {/* Nav Bar with section buttons */}
// //       <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
// //         <ToggleButtonGroup
// //           value={selectedSection}
// //           exclusive
// //           onChange={(e, value) => {
// //             if (value !== null) setSelectedSection(value);
// //           }}
// //           aria-label="appointment sections"
// //           color="primary"
// //           size="small"
// //           sx={{ borderRadius: 2 }}
// //         >
// //           <ToggleButton value="Upcoming" aria-label="Upcoming appointments">
// //             Upcoming
// //           </ToggleButton>
// //           <ToggleButton value="Completed" aria-label="Completed appointments">
// //             Completed
// //           </ToggleButton>
// //           <ToggleButton value="Cancelled" aria-label="Cancelled appointments">
// //             Cancelled
// //           </ToggleButton>
// //         </ToggleButtonGroup>
// //       </Box>

// //       <TextField
// //         label="Search appointments"
// //         variant="outlined"
// //         fullWidth
// //         size="small"
// //         sx={{ mb: 4 }}
// //         value={searchTerm}
// //         onChange={(e) => setSearchTerm(e.target.value)}
// //         placeholder="Search by patient name, reason, or patient ID"
// //       />

// //       {loading && (
// //         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
// //           <CircularProgress />
// //           <Typography variant="h6" sx={{ ml: 2 }}>
// //             Loading Appointments...
// //           </Typography>
// //         </Box>
// //       )}

// //       {error && (
// //         <Alert severity="error" sx={{ mb: 3 }}>
// //           {error}
// //         </Alert>
// //       )}

// //       {!loading && !error && renderAppointmentsTable(currentSectionAppointments)}

// //       <Box sx={{ mt: 6, opacity: 0.7, textAlign: 'center' }}>
// //         <Typography variant="body2" color="text.secondary">
// //           Manage your daily and upcoming appointments, view patient details, and update status.
// //         </Typography>
// //       </Box>
// //     </Box>
// //   );
// // };

// // DoctorAppointments.propTypes = {
// //   doctorUser: PropTypes.shape({
// //     userId: PropTypes.string.isRequired,
// //     name: PropTypes.string,
// //     email: PropTypes.string,
// //     profilePic: PropTypes.string,
// //   }).isRequired,
// // };

// // export default DoctorAppointments;
// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Chip,
//   Button,
//   CircularProgress,
//   Alert,
//   TextField,
//   ToggleButtonGroup,
//   ToggleButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Divider,
// } from '@mui/material';
// import EventNoteIcon from '@mui/icons-material/EventNote';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import PendingActionsIcon from '@mui/icons-material/PendingActions';
// import CancelIcon from '@mui/icons-material/Cancel';
// import PersonIcon from '@mui/icons-material/Person';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import DoneAllIcon from '@mui/icons-material/DoneAll';
// import CloseIcon from '@mui/icons-material/Close';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// const DoctorAppointments = ({ doctorUser }) => {
//   const [appointments, setAppointments] = useState([]);
//   const [filteredAppointments, setFilteredAppointments] = useState([]);
//   const [patientDetailsMap, setPatientDetailsMap] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedSection, setSelectedSection] = useState('Upcoming');
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [isPatientPanelOpen, setIsPatientPanelOpen] = useState(false);

//   // Function to fetch both appointments and patient details
//   const fetchAppointmentsAndPatients = async () => {
//     if (!doctorUser || !doctorUser.userId) {
//       setError('Doctor user ID is not available.');
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       // 1. Fetch appointments for the doctor
//       const appointmentsResponse = await fetch(
//         `http://localhost:2010/api/appointments/doctor/${doctorUser.userId}`
//       );
//       if (!appointmentsResponse.ok) {
//         throw new Error(`Failed to fetch appointments: ${appointmentsResponse.status}`);
//       }
//       const appointmentData = await appointmentsResponse.json();
//       setAppointments(appointmentData);
//       setFilteredAppointments(appointmentData);

//       // 2. Extract unique patient IDs from the appointments
//       const patientIds = [...new Set(appointmentData.map(appt => appt.patientId))];
//       const newPatientDetailsMap = { ...patientDetailsMap };

//       // 3. Fetch patient details for each unique ID
//       const patientPromises = patientIds.map(async (patientId) => {
//         // Only fetch if we don't already have the details
//         if (!newPatientDetailsMap[patientId]) {
//           const patientResponse = await fetch(
//             `http://localhost:2008/api/patients/${patientId}`
//           );
//           if (!patientResponse.ok) {
//             console.error(`Failed to fetch patient details for ID: ${patientId}`);
//             return { [patientId]: { first_name: 'Unknown', last_name: 'Patient' } }; // Fallback
//           }
//           const patientData = await patientResponse.json();
//           return { [patientId]: patientData };
//         }
//         return {};
//       });

//       const patientDetailsResults = await Promise.all(patientPromises);
//       patientDetailsResults.forEach(result => Object.assign(newPatientDetailsMap, result));
//       setPatientDetailsMap(newPatientDetailsMap);

//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setError(err.message || 'Failed to load appointments or patient details.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAppointmentsAndPatients();
//   }, [doctorUser.userId]);

//   // Filter appointments on searchTerm change
//   useEffect(() => {
//     if (!searchTerm.trim()) {
//       setFilteredAppointments(appointments);
//       return;
//     }

//     const lowerSearch = searchTerm.toLowerCase();

//     const filtered = appointments.filter(
//       (appt) => {
//         const patient = patientDetailsMap[appt.patientId];
//         const patientName = patient ? `${patient.first_name} ${patient.last_name}` : appt.patientId;

//         return (
//           patientName.toLowerCase().includes(lowerSearch) ||
//           (appt.reasonForVisit && appt.reasonForVisit.toLowerCase().includes(lowerSearch)) ||
//           (appt.patientId && appt.patientId.toLowerCase().includes(lowerSearch))
//         );
//       }
//     );

//     setFilteredAppointments(filtered);
//   }, [searchTerm, appointments, patientDetailsMap]);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Confirmed':
//         return 'success';
//       case 'Pending':
//         return 'warning';
//       case 'Cancelled':
//         return 'error';
//       case 'Scheduled':
//         return 'info';
//       case 'Completed':
//         return 'primary';
//       default:
//         return 'default';
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'Confirmed':
//         return <CheckCircleIcon fontSize="small" />;
//       case 'Pending':
//         return <PendingActionsIcon fontSize="small" />;
//       case 'Cancelled':
//         return <CancelIcon fontSize="small" />;
//       case 'Scheduled':
//         return <EventNoteIcon fontSize="small" />;
//       case 'Completed':
//         return <DoneAllIcon fontSize="small" />;
//       default:
//         return null;
//     }
//   };

//   const handleUpdateStatus = async (appointmentId, newStatus) => {
//     try {
//       const response = await fetch(
//         `http://localhost:2010/api/appointments/${appointmentId}/status`,
//         {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ status: newStatus }),
//         }
//       );

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Failed to update appointment status: ${response.status} - ${errorText}`);
//       }
//       await fetchAppointmentsAndPatients();
//     } catch (err) {
//       console.error('Error updating appointment status:', err);
//       setError(err.message || 'Failed to update appointment status.');
//     }
//   };

//   // Define section filters
//   const sectionFilters = {
//     Upcoming: (appt) =>
//       appt.status === 'Scheduled' || appt.status === 'Confirmed' || appt.status === 'Pending',
//     Completed: (appt) => appt.status === 'Completed',
//     Cancelled: (appt) => appt.status === 'Cancelled',
//   };

//   // Filter appointments for currently selected section
//   const currentSectionAppointments = filteredAppointments.filter(sectionFilters[selectedSection]);

//   // Handler for opening patient details panel
//   const handleOpenPatientPanel = (patientId) => {
//     setSelectedPatient(patientDetailsMap[patientId]);
//     setIsPatientPanelOpen(true);
//   };

//   // Handler for closing patient details panel
//   const handleClosePatientPanel = () => {
//     setIsPatientPanelOpen(false);
//     setSelectedPatient(null);
//   };

//   // Render section table or no data alert
//   const renderAppointmentsTable = (appts) => (
//     appts.length === 0 ? (
//       <Alert severity="info" sx={{ mb: 3 }}>
//         No {selectedSection.toLowerCase()} appointments found.
//       </Alert>
//     ) : (
//       <TableContainer component={Paper} elevation={6} sx={{ borderRadius: 3 }}>
//         <Table aria-label={`${selectedSection} appointments table`}>
//           <TableHead sx={{ bgcolor: '#e3f2fd' }}>
//             <TableRow>
//               <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Patient Name</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Date</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Time</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Type</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Status</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {appts.map((row) => {
//               const patient = patientDetailsMap[row.patientId];
//               const patientName = patient ? `${patient.first_name} ${patient.last_name}` : row.patientId;

//               return (
//                 <TableRow
//                   key={row.id}
//                   sx={{
//                     '&:last-child td, &:last-child th': { border: 0 },
//                     '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
//                   }}
//                 >
//                   <TableCell>
//                     <Button
//                       onClick={() => handleOpenPatientPanel(row.patientId)}
//                       sx={{ textTransform: 'none', p: 0, minWidth: 0 }}
//                     >
//                       <PersonIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
//                       <Typography variant="body2" color="primary" sx={{ textDecoration: 'underline' }}>
//                         {patientName}
//                       </Typography>
//                     </Button>
//                   </TableCell>
//                   <TableCell>{row.appointmentDate || 'N/A'}</TableCell>
//                   <TableCell>
//                     <AccessTimeIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
//                     {row.appointmentTime
//                       ? new Date(row.appointmentTime).toLocaleTimeString([], {
//                           hour: '2-digit',
//                           minute: '2-digit',
//                         })
//                       : 'N/A'}
//                   </TableCell>
//                   <TableCell>{row.reasonForVisit || 'N/A'}</TableCell>
//                   <TableCell>
//                     <Chip
//                       label={row.status || 'Unknown'}
//                       color={getStatusColor(row.status)}
//                       size="small"
//                       icon={getStatusIcon(row.status)}
//                     />
//                   </TableCell>
//                   <TableCell>
//                     {selectedSection === 'Upcoming' &&
//                       (row.status === 'Scheduled' || row.status === 'Confirmed') && (
//                         <Button
//                           variant="contained"
//                           size="small"
//                           color="primary"
//                           onClick={() => handleUpdateStatus(row.id, 'Completed')}
//                           sx={{ mr: 1 }}
//                         >
//                           Complete
//                         </Button>
//                       )}
//                   </TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     )
//   );

//   return (
//     <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', width: '100%' }}>
//       <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.dark' }}>
//         Appointments Management
//       </Typography>

//       {/* Nav Bar with section buttons */}
//       <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
//         <ToggleButtonGroup
//           value={selectedSection}
//           exclusive
//           onChange={(e, value) => {
//             if (value !== null) setSelectedSection(value);
//           }}
//           aria-label="appointment sections"
//           color="primary"
//           size="small"
//           sx={{ borderRadius: 2 }}
//         >
//           <ToggleButton value="Upcoming" aria-label="Upcoming appointments">
//             Upcoming
//           </ToggleButton>
//           <ToggleButton value="Completed" aria-label="Completed appointments">
//             Completed
//           </ToggleButton>
//           <ToggleButton value="Cancelled" aria-label="Cancelled appointments">
//             Cancelled
//           </ToggleButton>
//         </ToggleButtonGroup>
//       </Box>

//       <TextField
//         label="Search appointments"
//         variant="outlined"
//         fullWidth
//         size="small"
//         sx={{ mb: 4 }}
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         placeholder="Search by patient name, reason, or patient ID"
//       />

//       {loading && (
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
//           <CircularProgress />
//           <Typography variant="h6" sx={{ ml: 2 }}>
//             Loading Appointments...
//           </Typography>
//         </Box>
//       )}

//       {error && (
//         <Alert severity="error" sx={{ mb: 3 }}>
//           {error}
//         </Alert>
//       )}

//       {!loading && !error && renderAppointmentsTable(currentSectionAppointments)}

//       <Box sx={{ mt: 6, opacity: 0.7, textAlign: 'center' }}>
//         <Typography variant="body2" color="text.secondary">
//           Manage your daily and upcoming appointments, view patient details, and update status.
//         </Typography>
//       </Box>

//       {/* Patient Details Dialog */}
//       <Dialog open={isPatientPanelOpen} onClose={handleClosePatientPanel} maxWidth="sm" fullWidth>
//         <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center' }}>
//           <InfoOutlinedIcon color="primary" sx={{ mr: 1 }} />
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             Patient Details
//           </Typography>
//           <Button onClick={handleClosePatientPanel} size="small">
//             <CloseIcon />
//           </Button>
//         </DialogTitle>
//         <Divider />
//         <DialogContent dividers>
//           {selectedPatient ? (
//             <Box>
//               <DialogContentText sx={{ mb: 2 }}>
//                 <Typography variant="h6" gutterBottom>
//                   {selectedPatient.first_name} {selectedPatient.last_name}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Date of Birth:</strong> {selectedPatient.date_of_birth}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Gender:</strong> {selectedPatient.gender}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Contact Number:</strong> {selectedPatient.contact_number}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Address:</strong> {selectedPatient.address}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Blood Group:</strong> {selectedPatient.blood_group}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Allergies:</strong> {selectedPatient.allergies}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Current Medications:</strong> {selectedPatient.current_medications}
//                 </Typography>
//               </DialogContentText>
//             </Box>
//           ) : (
//             <DialogContentText>
//               No patient details available.
//             </DialogContentText>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClosePatientPanel} variant="contained" color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// DoctorAppointments.propTypes = {
//   doctorUser: PropTypes.shape({
//     userId: PropTypes.string.isRequired,
//     name: PropTypes.string,
//     email: PropTypes.string,
//     profilePic: PropTypes.string,
//   }).isRequired,
// };

// export default DoctorAppointments;


import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  CircularProgress,
  Alert,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
} from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const DoctorAppointments = ({ doctorUser }) => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [patientDetailsMap, setPatientDetailsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState('Upcoming');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isPatientPanelOpen, setIsPatientPanelOpen] = useState(false);
  const [doctorId, setDoctorId] = useState(null); // State to hold the MongoDB _id

  // Function to fetch doctor's details by customId and then appointments
  const fetchDoctorAndAppointments = async () => {
    if (!doctorUser || !doctorUser.userId) {
      setError('Doctor user ID is not available.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Step 1: Fetch the doctor's details using the customId (doctorUser.userId)
      const doctorDetailsResponse = await fetch(
        `http://localhost:2005/api/doctors/customId/${doctorUser.userId}`
      );

      if (!doctorDetailsResponse.ok) {
        throw new Error(`Failed to fetch doctor details: ${doctorDetailsResponse.status}`);
      }

      const doctorDetails = await doctorDetailsResponse.json();
      const mongoId = doctorDetails.id; // Extract the MongoDB _id
      setDoctorId(mongoId);

      // Step 2: Fetch appointments using the MongoDB _id
      const appointmentsResponse = await fetch(
        `http://localhost:2010/api/appointments/doctor/${mongoId}`
      );
      if (!appointmentsResponse.ok) {
        throw new Error(`Failed to fetch appointments: ${appointmentsResponse.status}`);
      }
      const appointmentData = await appointmentsResponse.json();
      setAppointments(appointmentData);
      setFilteredAppointments(appointmentData);

      // Step 3: Extract unique patient IDs and fetch their details
      const patientIds = [...new Set(appointmentData.map(appt => appt.patientId))];
      const newPatientDetailsMap = { ...patientDetailsMap };

      const patientPromises = patientIds.map(async (patientId) => {
        if (!newPatientDetailsMap[patientId]) {
          const patientResponse = await fetch(
            `http://localhost:2008/api/patients/${patientId}`
          );
          if (!patientResponse.ok) {
            console.error(`Failed to fetch patient details for ID: ${patientId}`);
            return { [patientId]: { first_name: 'Unknown', last_name: 'Patient' } };
          }
          const patientData = await patientResponse.json();
          return { [patientId]: patientData };
        }
        return {};
      });

      const patientDetailsResults = await Promise.all(patientPromises);
      patientDetailsResults.forEach(result => Object.assign(newPatientDetailsMap, result));
      setPatientDetailsMap(newPatientDetailsMap);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Failed to load appointments or patient details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorAndAppointments();
  }, [doctorUser.userId]); // Re-run the effect if the customId changes

  // ... (rest of the component code remains the same)

  // Filter appointments on searchTerm change
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredAppointments(appointments);
      return;
    }

    const lowerSearch = searchTerm.toLowerCase();

    const filtered = appointments.filter(
      (appt) => {
        const patient = patientDetailsMap[appt.patientId];
        const patientName = patient ? `${patient.first_name} ${patient.last_name}` : appt.patientId;

        return (
          patientName.toLowerCase().includes(lowerSearch) ||
          (appt.reasonForVisit && appt.reasonForVisit.toLowerCase().includes(lowerSearch)) ||
          (appt.patientId && appt.patientId.toLowerCase().includes(lowerSearch))
        );
      }
    );

    setFilteredAppointments(filtered);
  }, [searchTerm, appointments, patientDetailsMap]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Cancelled':
        return 'error';
      case 'Scheduled':
        return 'info';
      case 'Completed':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Confirmed':
        return <CheckCircleIcon fontSize="small" />;
      case 'Pending':
        return <PendingActionsIcon fontSize="small" />;
      case 'Cancelled':
        return <CancelIcon fontSize="small" />;
      case 'Scheduled':
        return <EventNoteIcon fontSize="small" />;
      case 'Completed':
        return <DoneAllIcon fontSize="small" />;
      default:
        return null;
    }
  };

  const handleUpdateStatus = async (appointmentId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:2010/api/appointments/${appointmentId}/status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update appointment status: ${response.status} - ${errorText}`);
      }
      await fetchAppointmentsAndPatients();
    } catch (err) {
      console.error('Error updating appointment status:', err);
      setError(err.message || 'Failed to update appointment status.');
    }
  };

  // Define section filters
  const sectionFilters = {
    Upcoming: (appt) =>
      appt.status === 'Scheduled' || appt.status === 'Confirmed' || appt.status === 'Pending',
    Completed: (appt) => appt.status === 'Completed',
    Cancelled: (appt) => appt.status === 'Cancelled',
  };

  // Filter appointments for currently selected section
  const currentSectionAppointments = filteredAppointments.filter(sectionFilters[selectedSection]);

  // Handler for opening patient details panel
  const handleOpenPatientPanel = (patientId) => {
    setSelectedPatient(patientDetailsMap[patientId]);
    setIsPatientPanelOpen(true);
  };

  // Handler for closing patient details panel
  const handleClosePatientPanel = () => {
    setIsPatientPanelOpen(false);
    setSelectedPatient(null);
  };

  // Render section table or no data alert
  const renderAppointmentsTable = (appts) => (
    appts.length === 0 ? (
      <Alert severity="info" sx={{ mb: 3 }}>
        No {selectedSection.toLowerCase()} appointments found.
      </Alert>
    ) : (
      <TableContainer component={Paper} elevation={6} sx={{ borderRadius: 3 }}>
        <Table aria-label={`${selectedSection} appointments table`}>
          <TableHead sx={{ bgcolor: '#e3f2fd' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Patient Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Time</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appts.map((row) => {
              const patient = patientDetailsMap[row.patientId];
              const patientName = patient ? `${patient.first_name} ${patient.last_name}` : row.patientId;

              return (
                <TableRow
                  key={row.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                  }}
                >
                  <TableCell>
                    <Button
                      onClick={() => handleOpenPatientPanel(row.patientId)}
                      sx={{ textTransform: 'none', p: 0, minWidth: 0 }}
                    >
                      <PersonIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                      <Typography variant="body2" color="primary" sx={{ textDecoration: 'underline' }}>
                        {patientName}
                      </Typography>
                    </Button>
                  </TableCell>
                  <TableCell>{row.appointmentDate || 'N/A'}</TableCell>
                  <TableCell>
                    <AccessTimeIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                    {row.appointmentTime
                      ? new Date(row.appointmentTime).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'N/A'}
                  </TableCell>
                  <TableCell>{row.reasonForVisit || 'N/A'}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status || 'Unknown'}
                      color={getStatusColor(row.status)}
                      size="small"
                      icon={getStatusIcon(row.status)}
                    />
                  </TableCell>
                  <TableCell>
                    {selectedSection === 'Upcoming' &&
                      (row.status === 'Scheduled' || row.status === 'Confirmed') && (
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          onClick={() => handleUpdateStatus(row.id, 'Completed')}
                          sx={{ mr: 1 }}
                        >
                          Complete
                        </Button>
                      )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', width: '100%' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 1, fontWeight: 'bold', color: 'primary.dark' }}>
        Appointments Management
      </Typography>
      {/* ADDED DOCTOR ID HERE */}
      {doctorId && (
        <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 3 }}>
          Doctor ID: {doctorId}
        </Typography>
      )}

      {/* Nav Bar with section buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <ToggleButtonGroup
          value={selectedSection}
          exclusive
          onChange={(e, value) => {
            if (value !== null) setSelectedSection(value);
          }}
          aria-label="appointment sections"
          color="primary"
          size="small"
          sx={{ borderRadius: 2 }}
        >
          <ToggleButton value="Upcoming" aria-label="Upcoming appointments">
            Upcoming
          </ToggleButton>
          <ToggleButton value="Completed" aria-label="Completed appointments">
            Completed
          </ToggleButton>
          <ToggleButton value="Cancelled" aria-label="Cancelled appointments">
            Cancelled
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <TextField
        label="Search appointments"
        variant="outlined"
        fullWidth
        size="small"
        sx={{ mb: 4 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by patient name, reason, or patient ID"
      />

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ ml: 2 }}>
            Loading Appointments...
          </Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && renderAppointmentsTable(currentSectionAppointments)}

      <Box sx={{ mt: 6, opacity: 0.7, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Manage your daily and upcoming appointments, view patient details, and update status.
        </Typography>
      </Box>

      {/* Patient Details Dialog */}
      <Dialog open={isPatientPanelOpen} onClose={handleClosePatientPanel} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center' }}>
          <InfoOutlinedIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Patient Details
          </Typography>
          <Button onClick={handleClosePatientPanel} size="small">
            <CloseIcon />
          </Button>
        </DialogTitle>
        <Divider />
        <DialogContent dividers>
          {selectedPatient ? (
            <Box>
              <DialogContentText sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {selectedPatient.first_name} {selectedPatient.last_name}
                </Typography>
                <Typography variant="body1">
                  <strong>Date of Birth:</strong> {selectedPatient.date_of_birth}
                </Typography>
                <Typography variant="body1">
                  <strong>Gender:</strong> {selectedPatient.gender}
                </Typography>
                <Typography variant="body1">
                  <strong>Contact Number:</strong> {selectedPatient.contact_number}
                </Typography>
                <Typography variant="body1">
                  <strong>Address:</strong> {selectedPatient.address}
                </Typography>
                <Typography variant="body1">
                  <strong>Blood Group:</strong> {selectedPatient.blood_group}
                </Typography>
                <Typography variant="body1">
                  <strong>Allergies:</strong> {selectedPatient.allergies}
                </Typography>
                <Typography variant="body1">
                  <strong>Current Medications:</strong> {selectedPatient.current_medications}
                </Typography>
              </DialogContentText>
            </Box>
          ) : (
            <DialogContentText>
              No patient details available.
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePatientPanel} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

DoctorAppointments.propTypes = {
  doctorUser: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
    profilePic: PropTypes.string,
  }).isRequired,
};

export default DoctorAppointments;