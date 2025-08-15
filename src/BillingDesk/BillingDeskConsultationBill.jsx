// // // // import React, { useState, useEffect } from 'react';
// // // // import PropTypes from 'prop-types';
// // // // import {
// // // //   Box,
// // // //   Typography,
// // // //   Paper,
// // // //   List,
// // // //   ListItem,
// // // //   ListItemText,
// // // //   Divider,
// // // //   CircularProgress,
// // // //   Alert,
// // // //   Button,
// // // // } from '@mui/material';

// // // // /**
// // // //  * Fetches data from a given URL with error handling.
// // // //  * @param {string} url - The URL to fetch from.
// // // //  * @returns {Promise<object>} The JSON data from the response.
// // // //  */
// // // // async function fetchData(url) {
// // // //   const response = await fetch(url);
// // // //   if (!response.ok) {
// // // //     const errorText = await response.text();
// // // //     throw new Error(`Failed to fetch from ${url}: ${response.status} - ${errorText}`);
// // // //   }
// // // //   return response.json();
// // // // }

// // // // /**
// // // //  * A page component for the Billing Desk to manage and generate consultation bills.
// // // //  * It fetches a list of appointments from a local API and displays them.
// // // //  * @param {object} props - The component props.
// // // //  * @param {object} props.billingDeskUser - The user object for the billing desk.
// // // //  */
// // // // function BillingDeskConsultationBill({ billingDeskUser }) {
// // // //   const [appointments, setAppointments] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);

// // // //   useEffect(() => {
// // // //     const fetchAppointments = async () => {
// // // //       try {
// // // //         setLoading(true);
// // // //         const fetchedAppointments = await fetchData('http://localhost:2010/api/appointments');

// // // //         // Fetch patient and doctor names for each appointment
// // // //         const enrichedAppointments = await Promise.all(
// // // //           fetchedAppointments.map(async (appointment) => {
// // // //             let patientName = 'Unknown Patient';
// // // //             let doctorName = 'Unknown Doctor';

// // // //             try {
// // // //               // Assuming a patient API endpoint exists like /api/patients/{id}
// // // //               const patientData = await fetchData(`http://localhost:2010/api/patients/${appointment.patientId}`);
// // // //               patientName = patientData.name;
// // // //             } catch (patientError) {
// // // //               console.error(`Could not fetch patient with ID ${appointment.patientId}:`, patientError);
// // // //             }

// // // //             try {
// // // //               // Assuming a doctor API endpoint exists like /api/doctors/{id}
// // // //               const doctorData = await fetchData(`http://localhost:2010/api/doctors/${appointment.doctorId}`);
// // // //               doctorName = doctorData.name;
// // // //             } catch (doctorError) {
// // // //               console.error(`Could not fetch doctor with ID ${appointment.doctorId}:`, doctorError);
// // // //             }

// // // //             // Format date and time for better display
// // // //             const appointmentDate = new Date(appointment.appointmentDate).toLocaleDateString();
// // // //             const appointmentTime = new Date(appointment.appointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// // // //             return {
// // // //               ...appointment,
// // // //               patientName,
// // // //               doctorName,
// // // //               formattedDate: appointmentDate,
// // // //               formattedTime: appointmentTime,
// // // //             };
// // // //           })
// // // //         );

// // // //         setAppointments(enrichedAppointments);
// // // //         setError(null);
// // // //       } catch (err) {
// // // //         console.error('Error fetching appointments:', err);
// // // //         setError('Failed to load appointments. Please check the API.');
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchAppointments();
// // // //   }, []);

// // // //   const handleGenerateBill = (appointmentId) => {
// // // //     // In a real application, this would trigger a bill generation process.
// // // //     console.log(`Generate Bill button clicked for appointment ID: ${appointmentId}`);
// // // //     // You could navigate to a bill generation page or open a modal here.
// // // //   };

// // // //   return (
// // // //     <Box
// // // //       sx={{
// // // //         display: 'flex',
// // // //         flexDirection: 'column',
// // // //         alignItems: 'center',
// // // //         justifyContent: 'flex-start',
// // // //         height: '100%',
// // // //         p: 4,
// // // //         bgcolor: 'background.default',
// // // //         overflowY: 'auto',
// // // //       }}
// // // //     >
// // // //       {/* Header section */}
// // // //       <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'text.primary' }}>
// // // //         Consultation Bill
// // // //       </Typography>
// // // //       <Typography variant="body1" color="text.secondary" align="center" sx={{ maxWidth: 600, mb: 4 }}>
// // // //         Welcome, {billingDeskUser.name}! This page shows a list of recent appointments. You can generate a bill for each one.
// // // //       </Typography>

// // // //       {/* Conditional rendering for loading, error, and empty state */}
// // // //       {loading && (
// // // //         <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
// // // //           <CircularProgress />
// // // //         </Box>
// // // //       )}

// // // //       {error && (
// // // //         <Alert severity="error" sx={{ width: '100%', maxWidth: 700, mt: 2 }}>
// // // //           {error}
// // // //         </Alert>
// // // //       )}

// // // //       {!loading && !error && appointments.length === 0 && (
// // // //         <Alert severity="info" sx={{ width: '100%', maxWidth: 700, mt: 2 }}>
// // // //           No appointments found.
// // // //         </Alert>
// // // //       )}

// // // //       {/* Appointments list section */}
// // // //       {!loading && !error && appointments.length > 0 && (
// // // //         <Box sx={{ width: '100%', maxWidth: 700 }}>
// // // //           <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'text.primary', mb: 2 }}>
// // // //             Recent Appointments
// // // //           </Typography>
// // // //           <List>
// // // //             {appointments.map((appointment, index) => (
// // // //               <React.Fragment key={appointment.id}>
// // // //                 <Paper elevation={2} sx={{ mb: 2, p: 2 }}>
// // // //                   <ListItem disableGutters>
// // // //                     <ListItemText
// // // //                       primary={
// // // //                         <Typography variant="h6" component="span">
// // // //                           {appointment.patientName}
// // // //                         </Typography>
// // // //                       }
// // // //                       secondary={
// // // //                         <React.Fragment>
// // // //                           <Typography component="span" variant="body2" color="text.primary">
// // // //                             Doctor: {appointment.doctorName}
// // // //                           </Typography>
// // // //                           <br />
// // // //                           <Typography component="span" variant="body2" color="text.secondary">
// // // //                             Date: {appointment.formattedDate} | Time: {appointment.formattedTime}
// // // //                           </Typography>
// // // //                           <br />
// // // //                           <Typography component="span" variant="body2" color="text.secondary">
// // // //                             Reason: {appointment.reasonForVisit}
// // // //                           </Typography>
// // // //                         </React.Fragment>
// // // //                       }
// // // //                     />
// // // //                     <Button
// // // //                       variant="contained"
// // // //                       color="primary"
// // // //                       onClick={() => handleGenerateBill(appointment.id)}
// // // //                       sx={{ ml: 2, flexShrink: 0 }}
// // // //                     >
// // // //                       Generate Bill
// // // //                     </Button>
// // // //                   </ListItem>
// // // //                 </Paper>
// // // //               </React.Fragment>
// // // //             ))}
// // // //           </List>
// // // //         </Box>
// // // //       )}
// // // //     </Box>
// // // //   );
// // // // }

// // // // BillingDeskConsultationBill.propTypes = {
// // // //   billingDeskUser: PropTypes.shape({
// // // //     userId: PropTypes.string,
// // // //     name: PropTypes.string,
// // // //     email: PropTypes.string,
// // // //     profilePic: PropTypes.string,
// // // //   }),
// // // // };

// // // // // A simple App component to render the main component with mock props for demonstration
// // // // const App = () => {
// // // //   const mockUser = {
// // // //     userId: 'user123',
// // // //     name: 'Admin',
// // // //     email: 'admin@example.com',
// // // //     profilePic: 'https://placehold.co/100x100',
// // // //   };
// // // //   return <BillingDeskConsultationBill billingDeskUser={mockUser} />;
// // // // };

// // // // export default App;
// // // import React, { useState, useEffect } from 'react';
// // // import PropTypes from 'prop-types';
// // // import {
// // //   Box,
// // //   Typography,
// // //   Paper,
// // //   List,
// // //   ListItem,
// // //   ListItemText,
// // //   Divider,
// // //   CircularProgress,
// // //   Alert,
// // //   Button,
// // //   Grid,
// // //   TextField,
// // //   Card,
// // //   CardContent,
// // //   Modal,
// // // } from '@mui/material';

// // // // --- Utility Functions ---
// // // /**
// // //  * Fetches data from a given URL with error handling and a simulated delay.
// // //  * @param {string} url - The URL to fetch from.
// // //  * @returns {Promise<object|array>} The JSON data from the response.
// // //  */
// // // async function fetchData(url) {
// // //   // Simulate network latency for a better user experience
// // //   await new Promise(resolve => setTimeout(resolve, 500));
// // //   try {
// // //     const response = await fetch(url);
// // //     if (!response.ok) {
// // //       const errorText = await response.text();
// // //       throw new Error(`Failed to fetch from ${url}: ${response.status} - ${errorText}`);
// // //     }
// // //     return response.json();
// // //   } catch (error) {
// // //     console.error(`Fetch error for URL: ${url}`, error);
// // //     throw error;
// // //   }
// // // }

// // // // --- Component 1: AppointmentList.js ---
// // // /**
// // //  * A page component for the Billing Desk to manage and generate consultation bills.
// // //  * It fetches a list of appointments from a local API and displays them.
// // //  * @param {object} props - The component props.
// // //  * @param {object} props.billingDeskUser - The user object for the billing desk.
// // //  * @param {function} props.onGenerateBillClick - Function to call when "Generate Bill" is clicked.
// // //  */
// // // function AppointmentList({ billingDeskUser, onGenerateBillClick }) {
// // //   const [appointments, setAppointments] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   useEffect(() => {
// // //     const fetchAppointments = async () => {
// // //       try {
// // //         setLoading(true);
// // //         // Fetch all appointments from the live API
// // //         const fetchedAppointments = await fetchData('http://localhost:2010/api/appointments');
        
// // //         // Fetch patient and doctor names for each appointment
// // //         const enrichedAppointments = await Promise.all(
// // //           fetchedAppointments.map(async (appointment) => {
// // //             let patientName = 'Unknown Patient';
// // //             let doctorName = 'Unknown Doctor';

// // //             // Fetch patient data from the API
// // //             try {
// // //               const patientData = await fetchData(`http://localhost:2010/api/patients/${appointment.patientId}`);
// // //               patientName = patientData.name;
// // //             } catch (patientError) {
// // //               console.error(`Could not fetch patient with ID ${appointment.patientId}:`, patientError);
// // //             }

// // //             // Fetch doctor data from the API
// // //             try {
// // //               const doctorData = await fetchData(`http://localhost:2010/api/doctors/${appointment.doctorId}`);
// // //               doctorName = doctorData.name;
// // //             } catch (doctorError) {
// // //               console.error(`Could not fetch doctor with ID ${appointment.doctorId}:`, doctorError);
// // //             }

// // //             const appointmentDate = new Date(appointment.appointmentDate).toLocaleDateString();
// // //             const appointmentTime = new Date(appointment.appointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// // //             return {
// // //               ...appointment,
// // //               patientName,
// // //               doctorName,
// // //               formattedDate: appointmentDate,
// // //               formattedTime: appointmentTime,
// // //             };
// // //           })
// // //         );

// // //         setAppointments(enrichedAppointments);
// // //         setError(null);
// // //       } catch (err) {
// // //         console.error('Error fetching appointments:', err);
// // //         setError('Failed to load appointments. Please check the API.');
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchAppointments();
// // //   }, []);

// // //   return (
// // //     <Box
// // //       sx={{
// // //         display: 'flex',
// // //         flexDirection: 'column',
// // //         alignItems: 'center',
// // //         justifyContent: 'flex-start',
// // //         height: '100%',
// // //         p: 4,
// // //         bgcolor: 'background.default',
// // //         overflowY: 'auto',
// // //       }}
// // //     >
// // //       <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'text.primary' }}>
// // //         Consultation Bill
// // //       </Typography>
// // //       <Typography variant="body1" color="text.secondary" align="center" sx={{ maxWidth: 600, mb: 4 }}>
// // //         Welcome, {billingDeskUser.name}! This page shows a list of recent appointments. You can generate a bill for each one.
// // //       </Typography>

// // //       {loading && (
// // //         <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
// // //           <CircularProgress />
// // //         </Box>
// // //       )}

// // //       {error && (
// // //         <Alert severity="error" sx={{ width: '100%', maxWidth: 700, mt: 2 }}>
// // //           {error}
// // //         </Alert>
// // //       )}

// // //       {!loading && !error && appointments.length === 0 && (
// // //         <Alert severity="info" sx={{ width: '100%', maxWidth: 700, mt: 2 }}>
// // //           No appointments found.
// // //         </Alert>
// // //       )}

// // //       {!loading && !error && appointments.length > 0 && (
// // //         <Box sx={{ width: '100%', maxWidth: 700 }}>
// // //           <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'text.primary', mb: 2 }}>
// // //             Recent Appointments
// // //           </Typography>
// // //           <List>
// // //             {appointments.map((appointment) => (
// // //               <Paper elevation={2} sx={{ mb: 2, p: 2 }} key={appointment.id}>
// // //                 <ListItem disableGutters>
// // //                   <ListItemText
// // //                     primary={
// // //                       <Typography variant="h6" component="span">
// // //                         {appointment.patientName}
// // //                       </Typography>
// // //                     }
// // //                     secondary={
// // //                       <React.Fragment>
// // //                         <Typography component="span" variant="body2" color="text.primary">
// // //                           Doctor: {appointment.doctorName}
// // //                         </Typography>
// // //                         <br />
// // //                         <Typography component="span" variant="body2" color="text.secondary">
// // //                           Date: {appointment.formattedDate} | Time: {appointment.formattedTime}
// // //                         </Typography>
// // //                         <br />
// // //                         <Typography component="span" variant="body2" color="text.secondary">
// // //                           Reason: {appointment.reasonForVisit}
// // //                         </Typography>
// // //                       </React.Fragment>
// // //                     }
// // //                   />
// // //                   <Button
// // //                     variant="contained"
// // //                     color="primary"
// // //                     onClick={() => onGenerateBillClick(appointment.id)}
// // //                     sx={{ ml: 2, flexShrink: 0 }}
// // //                   >
// // //                     Generate Bill
// // //                   </Button>
// // //                 </ListItem>
// // //               </Paper>
// // //             ))}
// // //           </List>
// // //         </Box>
// // //       )}
// // //     </Box>
// // //   );
// // // }

// // // AppointmentList.propTypes = {
// // //   billingDeskUser: PropTypes.shape({
// // //     userId: PropTypes.string,
// // //     name: PropTypes.string,
// // //     email: PropTypes.string,
// // //     profilePic: PropTypes.string,
// // //   }),
// // //   onGenerateBillClick: PropTypes.func.isRequired,
// // // };

// // // // --- Component 2: BillingForm.js ---
// // // /**
// // //  * A page component for generating a consultation bill.
// // //  * This component handles the form for entering billing details.
// // //  * @param {object} props - The component props.
// // //  * @param {string} props.appointmentId - The ID of the appointment to generate a bill for.
// // //  * @param {function} props.onBack - A function to call to navigate back to the list.
// // //  */
// // // function BillingForm({ appointmentId, onBack }) {
// // //   const [appointment, setAppointment] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [showModal, setShowModal] = useState(false);
// // //   const [consultationFee, setConsultationFee] = useState('250.00');
// // //   const [additionalCharges, setAdditionalCharges] = useState('0.00');
// // //   const [notes, setNotes] = useState('');

// // //   useEffect(() => {
// // //     const fetchAppointmentDetails = async () => {
// // //       try {
// // //         setLoading(true);
// // //         // Fetch the specific appointment details using the provided ID
// // //         const fetchedAppointment = await fetchData(`http://localhost:2010/api/appointments/${appointmentId}`);
        
// // //         // Fetch patient and doctor names from their respective endpoints
// // //         let patientName = 'Unknown Patient';
// // //         let doctorName = 'Unknown Doctor';
// // //         try {
// // //           const patientData = await fetchData(`http://localhost:2010/api/patients/${fetchedAppointment.patientId}`);
// // //           patientName = patientData.name;
// // //         } catch (e) {
// // //           console.error('Could not fetch patient name:', e);
// // //         }
// // //         try {
// // //           const doctorData = await fetchData(`http://localhost:2010/api/doctors/${fetchedAppointment.doctorId}`);
// // //           doctorName = doctorData.name;
// // //         } catch (e) {
// // //           console.error('Could not fetch doctor name:', e);
// // //         }

// // //         // Format the date and time for display
// // //         const appointmentDate = new Date(fetchedAppointment.appointmentDate).toLocaleDateString();
// // //         const appointmentTime = new Date(fetchedAppointment.appointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// // //         const formattedAppointment = {
// // //           ...fetchedAppointment,
// // //           patientName,
// // //           doctorName,
// // //           formattedDate: appointmentDate,
// // //           formattedTime: appointmentTime,
// // //         };

// // //         setAppointment(formattedAppointment);
// // //         setError(null);
// // //       } catch (err) {
// // //         console.error('Error fetching appointment details:', err);
// // //         setError('Failed to load appointment details. Please check the API.');
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchAppointmentDetails();
// // //   }, [appointmentId]);

// // //   const handleCreateBill = () => {
// // //     // This is where the bill creation logic would go.
// // //     // For this example, we'll just log the details and show a modal.
// // //     console.log('Bill created for appointment:', appointment.id);
// // //     console.log('Billing Details:', { consultationFee, additionalCharges, notes });
// // //     // Use a custom modal instead of alert()
// // //     setShowModal(true);
// // //   };

// // //   const handleCloseModal = () => {
// // //     setShowModal(false);
// // //     onBack(); // Navigate back to the appointment list after closing the modal
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', p: 4 }}>
// // //         <CircularProgress />
// // //       </Box>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <Box sx={{ p: 4 }}>
// // //         <Button onClick={onBack} variant="outlined" sx={{ mb: 2 }}>
// // //           &larr; Back to Appointments
// // //         </Button>
// // //         <Alert severity="error">{error}</Alert>
// // //       </Box>
// // //     );
// // //   }

// // //   if (!appointment) {
// // //       return (
// // //           <Box sx={{ p: 4 }}>
// // //               <Button onClick={onBack} variant="outlined" sx={{ mb: 2 }}>
// // //                   &larr; Back to Appointments
// // //               </Button>
// // //               <Alert severity="info">No appointment data to display.</Alert>
// // //           </Box>
// // //       );
// // //   }

// // //   return (
// // //     <Box
// // //       sx={{
// // //         p: 4,
// // //         display: 'flex',
// // //         flexDirection: 'column',
// // //         alignItems: 'center',
// // //         height: '100%',
// // //         overflowY: 'auto',
// // //       }}
// // //     >
// // //       <Box sx={{ width: '100%', maxWidth: 800 }}>
// // //         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
// // //           <Typography variant="h4" component="h1">
// // //             Generate Bill
// // //           </Typography>
// // //           <Button onClick={onBack} variant="outlined" startIcon={<i className="fas fa-arrow-left" />}>
// // //             Back to Appointments
// // //           </Button>
// // //         </Box>
// // //         <Card elevation={3} sx={{ p: 4 }}>
// // //           <CardContent>
// // //             <Typography variant="h6" gutterBottom>
// // //               Bill for Appointment
// // //             </Typography>
// // //             <Divider sx={{ my: 2 }} />
// // //             <Grid container spacing={2}>
// // //               <Grid item xs={12} sm={6}>
// // //                 <Typography variant="body1"><strong>Patient:</strong> {appointment.patientName}</Typography>
// // //               </Grid>
// // //               <Grid item xs={12} sm={6}>
// // //                 <Typography variant="body1"><strong>Doctor:</strong> {appointment.doctorName}</Typography>
// // //               </Grid>
// // //               <Grid item xs={12} sm={6}>
// // //                 <Typography variant="body1"><strong>Date:</strong> {appointment.formattedDate}</Typography>
// // //               </Grid>
// // //               <Grid item xs={12} sm={6}>
// // //                 <Typography variant="body1"><strong>Time:</strong> {appointment.formattedTime}</Typography>
// // //               </Grid>
// // //               <Grid item xs={12}>
// // //                 <Typography variant="body1"><strong>Reason for Visit:</strong> {appointment.reasonForVisit}</Typography>
// // //               </Grid>
// // //             </Grid>

// // //             <Divider sx={{ my: 4 }} />

// // //             <Typography variant="h6" gutterBottom>
// // //               Billing Details
// // //             </Typography>
// // //             <Grid container spacing={3}>
// // //               <Grid item xs={12} sm={6}>
// // //                 <TextField 
// // //                   label="Consultation Fee" 
// // //                   fullWidth 
// // //                   variant="outlined" 
// // //                   value={consultationFee} 
// // //                   onChange={(e) => setConsultationFee(e.target.value)}
// // //                 />
// // //               </Grid>
// // //               <Grid item xs={12} sm={6}>
// // //                 <TextField 
// // //                   label="Additional Charges" 
// // //                   fullWidth 
// // //                   variant="outlined" 
// // //                   value={additionalCharges}
// // //                   onChange={(e) => setAdditionalCharges(e.target.value)}
// // //                 />
// // //               </Grid>
// // //               <Grid item xs={12}>
// // //                 <TextField 
// // //                   label="Notes" 
// // //                   fullWidth 
// // //                   multiline 
// // //                   rows={4} 
// // //                   variant="outlined" 
// // //                   value={notes}
// // //                   onChange={(e) => setNotes(e.target.value)}
// // //                 />
// // //               </Grid>
// // //             </Grid>

// // //             <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
// // //               <Button variant="contained" color="primary" onClick={handleCreateBill}>
// // //                 Create Bill
// // //               </Button>
// // //             </Box>
// // //           </CardContent>
// // //         </Card>
// // //       </Box>

// // //       {/* Custom Modal for alert message */}
// // //       <Modal open={showModal} onClose={handleCloseModal}>
// // //         <Box sx={{
// // //           position: 'absolute',
// // //           top: '50%',
// // //           left: '50%',
// // //           transform: 'translate(-50%, -50%)',
// // //           width: 400,
// // //           bgcolor: 'background.paper',
// // //           border: '2px solid #000',
// // //           boxShadow: 24,
// // //           p: 4,
// // //           borderRadius: 2,
// // //         }}>
// // //           <Typography variant="h6" component="h2" gutterBottom>
// // //             Success!
// // //           </Typography>
// // //           <Typography sx={{ mt: 2 }}>
// // //             Bill for appointment {appointment?.id} created successfully!
// // //           </Typography>
// // //           <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
// // //             <Button onClick={handleCloseModal} variant="contained">
// // //               OK
// // //             </Button>
// // //           </Box>
// // //         </Box>
// // //       </Modal>
// // //     </Box>
// // //   );
// // // }

// // // BillingForm.propTypes = {
// // //   appointmentId: PropTypes.string.isRequired,
// // //   onBack: PropTypes.func.isRequired,
// // // };

// // // // --- Main App Component (Acting as a router) ---
// // // /**
// // //  * Main application component that manages the view state
// // //  * between the appointment list and the billing form.
// // //  */
// // // const App = () => {
// // //   const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

// // //   const mockUser = {
// // //     userId: 'user123',
// // //     name: 'Billing Desk',
// // //     email: 'billingdesk@example.com',
// // //     profilePic: 'https://placehold.co/100x100',
// // //   };

// // //   return (
// // //     <React.Fragment>
// // //       {selectedAppointmentId ? (
// // //         <BillingForm
// // //           appointmentId={selectedAppointmentId}
// // //           onBack={() => setSelectedAppointmentId(null)}
// // //         />
// // //       ) : (
// // //         <AppointmentList
// // //           billingDeskUser={mockUser}
// // //           onGenerateBillClick={setSelectedAppointmentId}
// // //         />
// // //       )}
// // //     </React.Fragment>
// // //   );
// // // };

// // // export default App;
// // // import React, { useState, useEffect } from 'react';
// // // import {
// // //   Box,
// // //   Typography,
// // //   Paper,
// // //   List,
// // //   ListItem,
// // //   ListItemText,
// // //   Divider,
// // //   CircularProgress,
// // //   Alert,
// // //   Button,
// // //   Grid,
// // //   TextField,
// // //   Card,
// // //   CardContent,
// // //   Modal,
// // //   IconButton,
// // //   FormControl,
// // //   InputLabel,
// // //   Select,
// // //   MenuItem,
// // // } from '@mui/material';
// // // import CloseIcon from '@mui/icons-material/Close';

// // // // PDF Libraries
// // // import jsPDF from 'jspdf';
// // // import html2canvas from 'html2canvas';

// // // // Utility function to fetch data with error handling and simulated delay
// // // async function fetchData(url, options = {}) {
// // //   await new Promise((r) => setTimeout(r, 300)); // 300ms delay
// // //   const res = await fetch(url, options);
// // //   if (!res.ok) {
// // //     const msg = await res.text();
// // //     throw new Error(msg || 'Fetch error');
// // //   }
// // //   return res.json();
// // // }

// // // export default function BillingDesk() {
// // //   const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
// // //   const [selectedBillId, setSelectedBillId] = useState(null);

// // //   // Appointment List States
// // //   const [appointments, setAppointments] = useState([]);
// // //   const [listLoading, setListLoading] = useState(false);
// // //   const [listError, setListError] = useState(null);

// // //   // Billing Form States
// // //   const [appointmentDetails, setAppointmentDetails] = useState(null);
// // //   const [formLoading, setFormLoading] = useState(false);
// // //   const [formError, setFormError] = useState(null);
// // //   const [billDetails, setBillDetails] = useState(null);

// // //   // Bill Document fields based on Bill.java
// // //   const [billDate] = useState(new Date().toISOString().split('T')[0]);
// // //   const [totalAmount, setTotalAmount] = useState(0);
// // //   const [amountPaid, setAmountPaid] = useState(0);
// // //   const [balanceDue, setBalanceDue] = useState(0);
// // //   const [paymentMethod, setPaymentMethod] = useState('Credit Card'); // Combo box value
// // //   const [status, setStatus] = useState('Pending');
// // //   const [billType] = useState('Consultation'); // Fixed value
// // //   const [billDocumentUrl, setBillDocumentUrl] = useState('');
// // //   const [consultationFee, setConsultationFee] = useState('0.00');
// // //   const [additionalCharges, setAdditionalCharges] = useState('0.00');
// // //   const [notes, setNotes] = useState('');
  
// // //   // Modals and PDF states
// // //   const [showSuccessModal, setShowSuccessModal] = useState(false);
// // //   const [showPreviewModal, setShowPreviewModal] = useState(false);
// // //   const [pdfContent, setPdfContent] = useState('');
// // //   const [pdfBlob, setPdfBlob] = useState(null);
// // //   const [uploading, setUploading] = useState(false);

// // //   // Auto-calculation useEffect
// // //   useEffect(() => {
// // //     const calculatedTotal = parseFloat(consultationFee || 0) + parseFloat(additionalCharges || 0);
// // //     setTotalAmount(calculatedTotal.toFixed(2));
// // //     setAmountPaid(calculatedTotal.toFixed(2));
// // //     setBalanceDue(0);
// // //   }, [consultationFee, additionalCharges]);

// // //   // Load appointments from API
// // //   useEffect(() => {
// // //     if (selectedAppointmentId === null) {
// // //       async function loadAppointments() {
// // //         try {
// // //           setListLoading(true);
// // //           setListError(null);
// // //           const appts = await fetchData('http://localhost:2010/api/appointments');

// // //           const enriched = await Promise.all(
// // //             appts.map(async (appt) => {
// // //               let patientFullName = 'Unknown Patient';
// // //               let doctorFullName = 'Unknown Doctor';
// // //               let doctorConsultationFee = 'N/A';
// // //               let doctorSpecialization = '';

// // //               try {
// // //                 const patient = await fetchData(`http://localhost:2008/api/patients/${appt.patientId}`);
// // //                 patientFullName = `${patient.first_name} ${patient.last_name}`;
// // //               } catch (e) {
// // //                 console.error('Error fetching patient:', e);
// // //               }

// // //               try {
// // //                 const doctor = await fetchData(`http://localhost:2005/api/doctors/${appt.doctorId}`);
// // //                 doctorFullName = `Dr. ${doctor.firstName} ${doctor.lastName}`;
// // //                 doctorConsultationFee = doctor.consultationFee?.toString() ?? 'N/A';
// // //                 doctorSpecialization = doctor.specialization ?? '';
// // //               } catch (e) {
// // //                 console.error('Error fetching doctor:', e);
// // //               }

// // //               return {
// // //                 ...appt,
// // //                 patientFullName,
// // //                 doctorFullName,
// // //                 doctorConsultationFee,
// // //                 doctorSpecialization,
// // //                 formattedDate: new Date(appt.appointmentDate).toLocaleDateString(),
// // //                 formattedTime: new Date(appt.appointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // //               };
// // //             })
// // //           );
// // //           setAppointments(enriched);
// // //         } catch (e) {
// // //           setListError('Failed to load appointments.');
// // //           console.error(e);
// // //         } finally {
// // //           setListLoading(false);
// // //         }
// // //       }
// // //       loadAppointments();
// // //     }
// // //   }, [selectedAppointmentId]);

// // //   // Load appointment details when an appointment is selected
// // //   useEffect(() => {
// // //     if (selectedAppointmentId !== null) {
// // //       async function loadAppointmentDetails() {
// // //         try {
// // //           setFormLoading(true);
// // //           setFormError(null);
// // //           const appt = await fetchData(`http://localhost:2010/api/appointments/${selectedAppointmentId}`);

// // //           let patientFullName = 'Unknown Patient';
// // //           let doctorFullName = 'Unknown Doctor';
// // //           let doctorConsultationFee = '250.00';
// // //           let doctorSpecialization = '';

// // //           try {
// // //             const patient = await fetchData(`http://localhost:2008/api/patients/${appt.patientId}`);
// // //             patientFullName = `${patient.first_name} ${patient.last_name}`;
// // //           } catch (e) {
// // //             console.error('Error fetching patient:', e);
// // //           }

// // //           try {
// // //             const doctor = await fetchData(`http://localhost:2005/api/doctors/${appt.doctorId}`);
// // //             doctorFullName = `Dr. ${doctor.firstName} ${doctor.lastName}`;
// // //             doctorConsultationFee = doctor.consultationFee?.toString() ?? '250.00';
// // //             doctorSpecialization = doctor.specialization ?? '';
// // //           } catch (e) {
// // //             console.error('Error fetching doctor:', e);
// // //           }

// // //           setAppointmentDetails({
// // //             ...appt,
// // //             patientFullName,
// // //             doctorFullName,
// // //             doctorConsultationFee,
// // //             doctorSpecialization,
// // //             formattedDate: new Date(appt.appointmentDate).toLocaleDateString(),
// // //             formattedTime: new Date(appt.appointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // //           });

// // //           setConsultationFee(doctorConsultationFee);
// // //           setAdditionalCharges('0.00');
// // //           setNotes('');
// // //           setPaymentMethod('Credit Card');
// // //           setStatus('Pending');
// // //           setBillDocumentUrl('');

// // //         } catch (e) {
// // //           setFormError('Failed to load appointment details.');
// // //           console.error(e);
// // //         } finally {
// // //           setFormLoading(false);
// // //         }
// // //       }
// // //       loadAppointmentDetails();
// // //     } else {
// // //       setAppointmentDetails(null);
// // //     }
// // //   }, [selectedAppointmentId]);
  
// // //   // Handlers
// // //   const handleGenerateBillClick = (appointment) => {
// // //     setSelectedAppointmentId(appointment.id);
// // //   };

// // //   const handleBackToList = () => {
// // //     setSelectedAppointmentId(null);
// // //     setFormError(null);
// // //     setSelectedBillId(null);
// // //   };

// // //   const handleCreateBill = async () => {
// // //     if (!appointmentDetails) {
// // //       alert('No appointment selected.');
// // //       return;
// // //     }
// // //     setFormLoading(true);
// // //     setFormError(null);

// // //     const newBill = {
// // //       patientId: appointmentDetails.patientId,
// // //       appointmentId: selectedAppointmentId,
// // //       billDate: billDate,
// // //       totalAmount: parseFloat(totalAmount),
// // //       amountPaid: parseFloat(amountPaid),
// // //       balanceDue: parseFloat(balanceDue),
// // //       paymentMethod: paymentMethod,
// // //       status: status,
// // //       billType: billType,
// // //       transactionId: `TRANS-${Math.floor(Math.random() * 1000000)}`, // Auto-generated
// // //       issuedByUserId: 'mockUser123', // Static for this example
// // //       bills: ['Consultation', 'Additional Charges'], // Simplified bill items
// // //       billDocumentUrl: billDocumentUrl,
// // //     };

// // //     try {
// // //       const createdBill = await fetchData('http://localhost:2009/api/bills', {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify(newBill),
// // //       });

// // //       setSelectedBillId(createdBill.id);
// // //       setShowSuccessModal(true);
// // //       console.log('Bill created successfully:', createdBill);
// // //     } catch (e) {
// // //       setFormError('Failed to create bill.');
// // //       console.error('Error creating bill:', e);
// // //     } finally {
// // //       setFormLoading(false);
// // //     }
// // //   };

// // //   const createPDFContent = () => {
// // //     if (!appointmentDetails) return '';

// // //     const baseFee = parseFloat(consultationFee || 0) + parseFloat(additionalCharges || 0);
// // //     const gst = baseFee * 0.18;
// // //     const calculatedTotalAmount = baseFee + gst;

// // //     return `
// // //       <div id="bill-template" style="font-family: Arial, sans-serif; font-size: 12px; line-height: 1.6; padding: 20px; color: #333; border: 1px solid #ddd; max-width: 800px; margin: auto;">
// // //         <div style="text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px;">
// // //           <h1 style="color: #004d40; margin: 0;">Sarvotham Spine Care Hospital</h1>
// // //           <p style="margin: 5px 0 0;">123 Health St, Wellness City, 560001</p>
// // //           <p style="margin: 0;">Phone: (080) 1234 5678 | Email: contact@sarvothamhospital.com</p>
// // //         </div>
// // //         <h2 style="text-align: center; color: #333; margin-bottom: 20px;">Invoice / Medical Bill</h2>
// // //         <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
// // //           <div>
// // //             <strong>Bill Date:</strong> ${billDate || 'N/A'}<br/>
// // //             <strong>Bill Type:</strong> Consultation
// // //           </div>
// // //           <div>
// // //             <strong>Patient:</strong> ${appointmentDetails.patientFullName}<br/>
// // //             <strong>Doctor:</strong> ${appointmentDetails.doctorFullName}
// // //           </div>
// // //         </div>
// // //         <table style="width: 100%; border-collapse: collapse; margin-top: 20px; border: 1px solid #ddd;">
// // //           <thead>
// // //             <tr style="background-color: #f2f2f2;">
// // //               <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Description</th>
// // //               <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Amount (₹)</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody>
// // //             <tr>
// // //               <td style="padding: 8px; border: 1px solid #ddd;">Consultation Fee</td>
// // //               <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${parseFloat(consultationFee).toFixed(2)}</td>
// // //             </tr>
// // //             <tr>
// // //               <td style="padding: 8px; border: 1px solid #ddd;">Additional Charges</td>
// // //               <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${parseFloat(additionalCharges).toFixed(2)}</td>
// // //             </tr>
// // //             <tr>
// // //               <td style="padding: 8px; border: 1px solid #ddd;">GST (18%)</td>
// // //               <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${gst.toFixed(2)}</td>
// // //             </tr>
// // //           </tbody>
// // //         </table>
// // //         <div style="margin-top: 20px; text-align: right;">
// // //           <p style="font-size: 16px; font-weight: bold; margin: 5px 0;">Total Amount: ₹${calculatedTotalAmount.toFixed(2)}</p>
// // //           <p style="margin: 5px 0;">Payment Method: ${paymentMethod}</p>
// // //         </div>
// // //         <div style="margin-top: 40px; border-top: 1px dashed #999; padding-top: 20px;">
// // //           <p><strong>Notes:</strong> ${notes || 'N/A'}</p>
// // //         </div>
// // //         <div style="margin-top: 40px; text-align: center; color: #666; font-style: italic;">
// // //           Thank you for choosing Sarvotham Spine Care Hospital.
// // //         </div>
// // //       </div>
// // //     `;
// // //   };

// // //   const handleGeneratePDFPreview = async () => {
// // //     if (!appointmentDetails) {
// // //       alert('No appointment details available to generate a PDF preview.');
// // //       return;
// // //     }

// // //     setPdfContent('');
// // //     setPdfBlob(null);

// // //     const contentHtml = createPDFContent();
// // //     setPdfContent(contentHtml);

// // //     const billContent = document.createElement('div');
// // //     billContent.style.width = '210mm';
// // //     billContent.style.backgroundColor = '#fff';
// // //     billContent.innerHTML = contentHtml;
// // //     document.body.appendChild(billContent);

// // //     try {
// // //       const canvas = await html2canvas(billContent, { scale: 2 });
// // //       const imgData = canvas.toDataURL('image/png');
// // //       const pdf = new jsPDF('p', 'mm', 'a4');
// // //       const imgProps = pdf.getImageProperties(imgData);
// // //       const pdfWidth = pdf.internal.pageSize.getWidth();
// // //       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

// // //       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
// // //       const pdfOutput = pdf.output('blob');
// // //       setPdfBlob(pdfOutput);

// // //       setShowPreviewModal(true);
// // //     } catch (error) {
// // //       console.error('Error generating PDF:', error);
// // //       alert('Failed to generate PDF. Please try again.');
// // //     } finally {
// // //       document.body.removeChild(billContent);
// // //     }
// // //   };

// // //   const handleDownloadPDF = () => {
// // //     if (!pdfBlob) {
// // //       alert('PDF not available for download.');
// // //       return;
// // //     }

// // //     const url = URL.createObjectURL(pdfBlob);
// // //     const link = document.createElement('a');
// // //     link.href = url;
// // //     link.download = `bill_appointment_${selectedAppointmentId}.pdf`;
// // //     document.body.appendChild(link);
// // //     link.click();
// // //     document.body.removeChild(link);
// // //     URL.revokeObjectURL(url);
// // //   };

// // //   const handleUploadBill = async (event) => {
// // //     const file = event.target.files[0];
// // //     if (!file) return;

// // //     if (!selectedBillId) {
// // //       alert('Please create a bill first before uploading a document.');
// // //       return;
// // //     }

// // //     setUploading(true);
// // //     const formData = new FormData();
// // //     formData.append('billDocument', file);

// // //     try {
// // //       const response = await fetch(`http://localhost:2009/api/bills/upload-document/${selectedBillId}`, {
// // //         method: 'POST',
// // //         body: formData,
// // //       });

// // //       if (!response.ok) {
// // //         const errorText = await response.text();
// // //         throw new Error(errorText || 'Failed to upload file');
// // //       }

// // //       const uploadResult = await response.json();
// // //       console.log('File uploaded successfully:', uploadResult);

// // //       setBillDocumentUrl(uploadResult.fileUrl);

// // //       alert(`Uploaded file: ${file.name} and bill document URL updated.`);
// // //     } catch (e) {
// // //       console.error('Error uploading file:', e);
// // //       alert(`Failed to upload file: ${e.message}`);
// // //     } finally {
// // //       setUploading(false);
// // //     }
// // //   };

// // //   const handleCloseModal = () => {
// // //     setShowSuccessModal(false);
// // //     handleBackToList();
// // //   };

// // //   const handleClosePreviewModal = () => {
// // //     setShowPreviewModal(false);
// // //     setPdfContent('');
// // //     setPdfBlob(null);
// // //   };

// // //   const renderAppointmentList = () => (
// // //     <Box
// // //       sx={{
// // //         display: 'flex',
// // //         flexDirection: 'column',
// // //         alignItems: 'center',
// // //         justifyContent: 'flex-start',
// // //         height: '100vh',
// // //         p: 4,
// // //         bgcolor: 'background.default',
// // //         overflowY: 'auto',
// // //       }}
// // //     >
// // //       <Typography variant="h4" component="h1" gutterBottom>
// // //         Consultation Bill
// // //       </Typography>
// // //       <Typography variant="body1" color="text.secondary" align="center" sx={{ maxWidth: 600, mb: 4 }}>
// // //         Welcome! Here are the recent appointments. Click "Generate Bill" to create a bill.
// // //       </Typography>

// // //       {listLoading && (
// // //         <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
// // //           <CircularProgress />
// // //         </Box>
// // //       )}

// // //       {listError && (
// // //         <Alert severity="error" sx={{ width: '100%', maxWidth: 700, mt: 2 }}>
// // //           {listError}
// // //         </Alert>
// // //       )}

// // //       {!listLoading && !listError && appointments.length === 0 && (
// // //         <Alert severity="info" sx={{ width: '100%', maxWidth: 700, mt: 2 }}>
// // //           No appointments found.
// // //         </Alert>
// // //       )}

// // //       {!listLoading && !listError && appointments.length > 0 && (
// // //         <Box sx={{ width: '100%', maxWidth: 700 }}>
// // //           <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'text.primary', mb: 2 }}>
// // //             Recent Appointments
// // //           </Typography>
// // //           <List>
// // //             {appointments.map((appointment) => (
// // //               <Paper key={appointment.id} sx={{ mb: 2, p: 2 }}>
// // //                 <ListItem
// // //                   disableGutters
// // //                   secondaryAction={
// // //                     <Button
// // //                       variant="contained"
// // //                       color="primary"
// // //                       sx={{ ml: 2, flexShrink: 0 }}
// // //                       onClick={() => handleGenerateBillClick(appointment)}
// // //                     >
// // //                       Generate Bill
// // //                     </Button>
// // //                   }
// // //                 >
// // //                   <ListItemText
// // //                     primary={<Typography variant="h6">{appointment.patientFullName}</Typography>}
// // //                     secondary={
// // //                       <>
// // //                         <Typography component="span" color="text.primary">
// // //                           Doctor: {appointment.doctorFullName} ({appointment.doctorSpecialization}) - Fee: ₹{appointment.doctorConsultationFee}
// // //                         </Typography>
// // //                         <br />
// // //                         <Typography component="span" color="text.secondary">
// // //                           Date: {appointment.formattedDate} | Time: {appointment.formattedTime}
// // //                         </Typography>
// // //                         <br />
// // //                         <Typography component="span" color="text.secondary">
// // //                           Reason: {appointment.reasonForVisit || 'N/A'}
// // //                         </Typography>
// // //                       </>
// // //                     }
// // //                   />
// // //                 </ListItem>
// // //               </Paper>
// // //             ))}
// // //           </List>
// // //         </Box>
// // //       )}
// // //     </Box>
// // //   );

// // //   const renderBillingForm = () => {
// // //     if (formLoading) {
// // //       return (
// // //         <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
// // //           <CircularProgress />
// // //         </Box>
// // //       );
// // //     }

// // //     if (formError) {
// // //       return (
// // //         <Box sx={{ p: 4 }}>
// // //           <Alert severity="error">{formError}</Alert>
// // //           <Button variant="outlined" onClick={handleBackToList} sx={{ mt: 2 }}>
// // //             &larr; Back to Appointments
// // //           </Button>
// // //         </Box>
// // //       );
// // //     }

// // //     if (!appointmentDetails) {
// // //       return (
// // //         <Box sx={{ p: 4 }}>
// // //           <Typography variant="body1">No appointment data found.</Typography>
// // //           <Button variant="outlined" onClick={handleBackToList} sx={{ mt: 2 }}>
// // //             &larr; Back to Appointments
// // //           </Button>
// // //         </Box>
// // //       );
// // //     }

// // //     return (
// // //       <Box sx={{ p: 4, maxWidth: 720, mx: 'auto', overflowY: 'auto' }}>
// // //         <Typography variant="h4" gutterBottom>
// // //           Generate Bill
// // //         </Typography>
// // //         <Button onClick={handleBackToList} variant="outlined" sx={{ mb: 3 }}>
// // //           &larr; Back to Appointments
// // //         </Button>

// // //         <Card sx={{ mb: 3 }}>
// // //           <CardContent>
// // //             <Typography variant="h6" gutterBottom>
// // //               Appointment Details
// // //             </Typography>
// // //             <Divider sx={{ my: 1 }} />
// // //             <Typography>
// // //               <strong>Patient:</strong> {appointmentDetails.patientFullName}
// // //             </Typography>
// // //             <Typography>
// // //               <strong>Doctor:</strong> {appointmentDetails.doctorFullName} ({appointmentDetails.doctorSpecialization})
// // //             </Typography>
// // //             <Typography>
// // //               <strong>Date:</strong> {appointmentDetails.formattedDate}
// // //             </Typography>
// // //             <Typography>
// // //               <strong>Time:</strong> {appointmentDetails.formattedTime}
// // //             </Typography>
// // //             <Typography>
// // //               <strong>Reason:</strong> {appointmentDetails.reasonForVisit || 'N/A'}
// // //             </Typography>
// // //           </CardContent>
// // //         </Card>

// // //         <Card>
// // //           <CardContent>
// // //             <Typography variant="h6" gutterBottom>
// // //               Bill Information
// // //             </Typography>
// // //             <Divider sx={{ my: 1 }} />
// // //             <Grid container spacing={2}>
// // //               {/* Bill Date - Current Date (Read-only) */}
// // //               <Grid item xs={12} sm={6}>
// // //                 <TextField 
// // //                   label="Bill Date" 
// // //                   fullWidth 
// // //                   value={billDate} 
// // //                   InputProps={{ readOnly: true }} 
// // //                   InputLabelProps={{ shrink: true }} 
// // //                 />
// // //               </Grid>

// // //               {/* Bill Type - Consultation (Read-only) */}
// // //               <Grid item xs={12} sm={6}>
// // //                 <TextField 
// // //                   label="Bill Type" 
// // //                   fullWidth 
// // //                   value={billType} 
// // //                   InputProps={{ readOnly: true }} 
// // //                 />
// // //               </Grid>
              
// // //               {/* Payment Method - Combo Box */}
// // //               <Grid item xs={12} sm={6}>
// // //                 <FormControl fullWidth>
// // //                   <InputLabel id="payment-method-label">Payment Method</InputLabel>
// // //                   <Select
// // //                     labelId="payment-method-label"
// // //                     value={paymentMethod}
// // //                     label="Payment Method"
// // //                     onChange={(e) => setPaymentMethod(e.target.value)}
// // //                   >
// // //                     <MenuItem value="Credit Card">Credit Card</MenuItem>
// // //                     <MenuItem value="Debit Card">Debit Card</MenuItem>
// // //                     <MenuItem value="Cash">Cash</MenuItem>
// // //                     <MenuItem value="Online Transfer">Online Transfer</MenuItem>
// // //                   </Select>
// // //                 </FormControl>
// // //               </Grid>

// // //               {/* Consultation Fee */}
// // //               <Grid item xs={12} sm={6}>
// // //                 <TextField 
// // //                   label="Consultation Fee" 
// // //                   fullWidth 
// // //                   type="number" 
// // //                   value={consultationFee} 
// // //                   onChange={(e) => setConsultationFee(e.target.value)} 
// // //                 />
// // //               </Grid>

// // //               {/* Additional Charges */}
// // //               <Grid item xs={12} sm={6}>
// // //                 <TextField 
// // //                   label="Additional Charges" 
// // //                   fullWidth 
// // //                   type="number" 
// // //                   value={additionalCharges} 
// // //                   onChange={(e) => setAdditionalCharges(e.target.value)} 
// // //                 />
// // //               </Grid>

// // //               {/* Total Amount (Read-only) */}
// // //               <Grid item xs={12} sm={6}>
// // //                 <TextField 
// // //                   label="Total Amount" 
// // //                   fullWidth 
// // //                   type="number" 
// // //                   value={totalAmount} 
// // //                   InputProps={{ readOnly: true }} 
// // //                 />
// // //               </Grid>
              
// // //               {/* Amount Paid */}
// // //               <Grid item xs={12} sm={6}>
// // //                 <TextField 
// // //                   label="Amount Paid" 
// // //                   fullWidth 
// // //                   type="number" 
// // //                   value={amountPaid} 
// // //                   onChange={(e) => setAmountPaid(e.target.value)} 
// // //                 />
// // //               </Grid>

// // //               {/* Balance Due (Read-only) */}
// // //               <Grid item xs={12} sm={6}>
// // //                 <TextField 
// // //                   label="Balance Due" 
// // //                   fullWidth 
// // //                   type="number" 
// // //                   value={parseFloat(totalAmount - amountPaid).toFixed(2)} 
// // //                   InputProps={{ readOnly: true }} 
// // //                 />
// // //               </Grid>

// // //               {/* Status */}
// // //               <Grid item xs={12}>
// // //                 <TextField 
// // //                   label="Status" 
// // //                   fullWidth 
// // //                   value={status} 
// // //                   onChange={(e) => setStatus(e.target.value)} 
// // //                 />
// // //               </Grid>
// // //             </Grid>

// // //             {/* Generate PDF button and Upload section */}
// // //             <Box sx={{ mt: 3, mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
// // //               <Button 
// // //   variant="outlined" 
// // //   onClick={handleGeneratePDFPreview} 
// // // >
// // //   Generate PDF
// // // </Button>
// // //             </Box>

// // //             <Box sx={{ mt: 2 }}>
// // //               <Typography variant="subtitle1" gutterBottom>
// // //                 Upload Document
// // //               </Typography>
// // //               <TextField 
// // //                 label="Choose File" 
// // //                 fullWidth 
// // //                 InputProps={{
// // //                   readOnly: true,
// // //                   startAdornment: (
// // //                     <input 
// // //                       type="file" 
// // //                       style={{ display: 'none' }} 
// // //                       id="bill-document-upload"
// // //                       onChange={handleUploadBill}
// // //                     />
// // //                   ),
// // //                 }}
// // //                 onClick={() => document.getElementById('bill-document-upload').click()}
// // //                 value={billDocumentUrl.split('/').pop() || ''}
// // //               />
// // //               <Typography variant="caption" color="text.secondary">
// // //                 {uploading ? 'Uploading...' : 'Click to choose a file'}
// // //               </Typography>
// // //             </Box>

// // //             <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
// // //               <Button 
// // //                 variant="contained" 
// // //                 onClick={handleCreateBill} 
// // //                 disabled={formLoading || !!selectedBillId}
// // //               >
// // //                 {formLoading ? 'Creating Bill...' : 'Create Bill'}
// // //               </Button>
// // //             </Box>
// // //           </CardContent>
// // //         </Card>

// // //         {/* Success Modal */}
// // //         <Modal
// // //           open={showSuccessModal}
// // //           onClose={handleCloseModal}
// // //           aria-labelledby="success-modal-label"
// // //           aria-describedby="success-modal-description"
// // //         >
// // //           <Box
// // //             sx={{
// // //               position: 'absolute',
// // //               top: '50%',
// // //               left: '50%',
// // //               transform: 'translate(-50%, -50%)',
// // //               width: 400,
// // //               bgcolor: 'background.paper',
// // //               boxShadow: 24,
// // //               borderRadius: 2,
// // //               p: 4,
// // //               outline: 'none',
// // //             }}
// // //           >
// // //             <Typography id="success-modal-label" variant="h6" gutterBottom>
// // //               Success
// // //             </Typography>
// // //             <Typography id="success-modal-description" sx={{ mb: 3 }}>
// // //               Bill for appointment created successfully with ID: <strong>{selectedBillId}</strong>.
// // //             </Typography>
// // //             <Box textAlign="right">
// // //               <Button variant="contained" onClick={handleCloseModal}>
// // //                 OK
// // //               </Button>
// // //             </Box>
// // //           </Box>
// // //         </Modal>

// // //         {/* PDF Preview Modal */}
// // //         <Modal
// // //           open={showPreviewModal}
// // //           onClose={handleClosePreviewModal}
// // //           aria-labelledby="pdf-preview-modal-title"
// // //           aria-describedby="pdf-preview-modal-description"
// // //         >
// // //           <Box
// // //             sx={{
// // //               position: 'absolute',
// // //               top: '50%',
// // //               left: '50%',
// // //               transform: 'translate(-50%, -50%)',
// // //               width: { xs: '90%', sm: '70%', md: '60%' },
// // //               height: '90vh',
// // //               bgcolor: 'background.paper',
// // //               boxShadow: 24,
// // //               p: 4,
// // //               outline: 'none',
// // //               display: 'flex',
// // //               flexDirection: 'column',
// // //             }}
// // //           >
// // //             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// // //               <Typography id="pdf-preview-modal-title" variant="h6">
// // //                 PDF Preview
// // //               </Typography>
// // //               <IconButton onClick={handleClosePreviewModal} aria-label="close">
// // //                 <CloseIcon />
// // //               </IconButton>
// // //             </Box>
// // //             <Divider />
// // //             <Box id="pdf-preview-content" sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }} dangerouslySetInnerHTML={{ __html: pdfContent }} />
// // //             <Divider />
// // //             <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
// // //               <Button variant="contained" color="primary" onClick={handleDownloadPDF} disabled={!pdfBlob}>
// // //                 Download PDF
// // //               </Button>
// // //             </Box>
// // //           </Box>
// // //         </Modal>
// // //       </Box>
// // //     );
// // //   };

// // //   return selectedAppointmentId === null ? renderAppointmentList() : renderBillingForm();
// // // }


// // // import React, { useState, useEffect } from 'react';
// // // import {
// // //   Box,
// // //   Typography,
// // //   Paper,
// // //   List,
// // //   ListItem,
// // //   ListItemText,
// // //   Divider,
// // //   CircularProgress,
// // //   Alert,
// // //   Button,
// // //   Grid,
// // //   TextField,
// // //   Card,
// // //   CardContent,
// // //   Modal,
// // //   IconButton,
// // //   FormControl,
// // //   InputLabel,
// // //   Select,
// // //   MenuItem,
// // // } from '@mui/material';
// // // import CloseIcon from '@mui/icons-material/Close';

// // // // PDF Libraries
// // // import jsPDF from 'jspdf';
// // // import html2canvas from 'html2canvas';

// // // // Utility function to fetch data with error handling and simulated delay
// // // async function fetchData(url, options = {}) {
// // //   await new Promise((r) => setTimeout(r, 300)); // 300ms delay
// // //   const res = await fetch(url, options);
// // //   if (!res.ok) {
// // //     const msg = await res.text();
// // //     throw new Error(msg || 'Fetch error');
// // //   }
// // //   return res.json();
// // // }

// // // export default function BillingDesk() {
// // //   const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
// // //   const [selectedBillId, setSelectedBillId] = useState(null);

// // //   // Appointment List States
// // //   const [appointments, setAppointments] = useState([]);
// // //   const [listLoading, setListLoading] = useState(false);
// // //   const [listError, setListError] = useState(null);

// // //   // Billing Form States
// // //   const [appointmentDetails, setAppointmentDetails] = useState(null);
// // //   const [formLoading, setFormLoading] = useState(false);
// // //   const [formError, setFormError] = useState(null);
// // //   const [billDetails, setBillDetails] = useState(null);

// // //   // Bill Document fields based on Bill.java
// // //   const [billDate] = useState(new Date().toISOString().split('T')[0]);
// // //   const [totalAmount, setTotalAmount] = useState(0);
// // //   const [amountPaid, setAmountPaid] = useState(0);
// // //   const [balanceDue, setBalanceDue] = useState(0);
// // //   const [paymentMethod, setPaymentMethod] = useState('Credit Card'); // Combo box value
// // //   const [status, setStatus] = useState('Pending');
// // //   const [billType] = useState('Consultation'); // Fixed value
// // //   const [billDocumentUrl, setBillDocumentUrl] = useState('');
// // //   const [consultationFee, setConsultationFee] = useState('0.00');
// // //   const [additionalCharges, setAdditionalCharges] = useState('0.00');
// // //   const [notes, setNotes] = useState('');

// // //   // Modals and PDF states
// // //   const [showSuccessModal, setShowSuccessModal] = useState(false);
// // //   const [showPreviewModal, setShowPreviewModal] = useState(false);
// // //   const [pdfContent, setPdfContent] = useState('');
// // //   const [pdfBlob, setPdfBlob] = useState(null);
// // //   const [uploading, setUploading] = useState(false);

// // //   // Auto-calculation useEffect
// // //   useEffect(() => {
// // //     const calculatedTotal = parseFloat(consultationFee || 0) + parseFloat(additionalCharges || 0);
// // //     setTotalAmount(calculatedTotal.toFixed(2));
// // //     setAmountPaid(calculatedTotal.toFixed(2));
// // //     setBalanceDue(0);
// // //   }, [consultationFee, additionalCharges]);

// // //   // Load appointments from API
// // //   useEffect(() => {
// // //     if (selectedAppointmentId === null) {
// // //       async function loadAppointments() {
// // //         try {
// // //           setListLoading(true);
// // //           setListError(null);
// // //           const appts = await fetchData('http://localhost:2010/api/appointments');

// // //           const enriched = await Promise.all(
// // //             appts.map(async (appt) => {
// // //               let patientFullName = 'Unknown Patient';
// // //               let doctorFullName = 'Unknown Doctor';
// // //               let doctorConsultationFee = 'N/A';
// // //               let doctorSpecialization = '';

// // //               try {
// // //                 const patient = await fetchData(`http://localhost:2008/api/patients/${appt.patientId}`);
// // //                 patientFullName = `${patient.first_name} ${patient.last_name}`;
// // //               } catch (e) {
// // //                 console.error('Error fetching patient:', e);
// // //               }

// // //               try {
// // //                 const doctor = await fetchData(`http://localhost:2005/api/doctors/${appt.doctorId}`);
// // //                 doctorFullName = `Dr. ${doctor.firstName} ${doctor.lastName}`;
// // //                 doctorConsultationFee = doctor.consultationFee?.toString() ?? 'N/A';
// // //                 doctorSpecialization = doctor.specialization ?? '';
// // //               } catch (e) {
// // //                 console.error('Error fetching doctor:', e);
// // //               }

// // //               return {
// // //                 ...appt,
// // //                 patientFullName,
// // //                 doctorFullName,
// // //                 doctorConsultationFee,
// // //                 doctorSpecialization,
// // //                 formattedDate: new Date(appt.appointmentDate).toLocaleDateString(),
// // //                 formattedTime: new Date(appt.appointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // //               };
// // //             })
// // //           );
// // //           setAppointments(enriched);
// // //         } catch (e) {
// // //           setListError('Failed to load appointments.');
// // //           console.error(e);
// // //         } finally {
// // //           setListLoading(false);
// // //         }
// // //       }
// // //       loadAppointments();
// // //     }
// // //   }, [selectedAppointmentId]);

// // //   // Load appointment details when an appointment is selected
// // //   useEffect(() => {
// // //     if (selectedAppointmentId !== null) {
// // //       async function loadAppointmentDetails() {
// // //         try {
// // //           setFormLoading(true);
// // //           setFormError(null);
// // //           const appt = await fetchData(`http://localhost:2010/api/appointments/${selectedAppointmentId}`);

// // //           let patientFullName = 'Unknown Patient';
// // //           let doctorFullName = 'Unknown Doctor';
// // //           let doctorConsultationFee = '250.00';
// // //           let doctorSpecialization = '';

// // //           try {
// // //             const patient = await fetchData(`http://localhost:2008/api/patients/${appt.patientId}`);
// // //             patientFullName = `${patient.first_name} ${patient.last_name}`;
// // //           } catch (e) {
// // //             console.error('Error fetching patient:', e);
// // //           }

// // //           try {
// // //             const doctor = await fetchData(`http://localhost:2005/api/doctors/${appt.doctorId}`);
// // //             doctorFullName = `Dr. ${doctor.firstName} ${doctor.lastName}`;
// // //             doctorConsultationFee = doctor.consultationFee?.toString() ?? '250.00';
// // //             doctorSpecialization = doctor.specialization ?? '';
// // //           } catch (e) {
// // //             console.error('Error fetching doctor:', e);
// // //           }

// // //           setAppointmentDetails({
// // //             ...appt,
// // //             patientFullName,
// // //             doctorFullName,
// // //             doctorConsultationFee,
// // //             doctorSpecialization,
// // //             formattedDate: new Date(appt.appointmentDate).toLocaleDateString(),
// // //             formattedTime: new Date(appt.appointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// // //           });

// // //           setConsultationFee(doctorConsultationFee);
// // //           setAdditionalCharges('0.00');
// // //           setNotes('');
// // //           setPaymentMethod('Credit Card');
// // //           setStatus('Pending');
// // //           setBillDocumentUrl(''); // Reset the URL when a new appointment is selected

// // //         } catch (e) {
// // //           setFormError('Failed to load appointment details.');
// // //           console.error(e);
// // //         } finally {
// // //           setFormLoading(false);
// // //         }
// // //       }
// // //       loadAppointmentDetails();
// // //     } else {
// // //       setAppointmentDetails(null);
// // //     }
// // //   }, [selectedAppointmentId]);

// // //   // Handlers
// // //   const handleGenerateBillClick = (appointment) => {
// // //     setSelectedAppointmentId(appointment.id);
// // //     setSelectedBillId(null); // Ensure no old bill ID is present
// // //     setBillDocumentUrl(''); // Ensure the document URL is reset
// // //   };

// // //   const handleBackToList = () => {
// // //     setSelectedAppointmentId(null);
// // //     setFormError(null);
// // //     setSelectedBillId(null);
// // //   };

// // //   const handleCreateBill = async () => {
// // //     if (!appointmentDetails) {
// // //       alert('No appointment selected.');
// // //       return;
// // //     }

// // //     // Check if a bill document has been uploaded
// // //     if (!billDocumentUrl) {
// // //       alert('Please upload a bill document first.');
// // //       return;
// // //     }

// // //     setFormLoading(true);
// // //     setFormError(null);

// // //     const newBill = {
// // //       patientId: appointmentDetails.patientId,
// // //       appointmentId: selectedAppointmentId,
// // //       billDate: billDate,
// // //       totalAmount: parseFloat(totalAmount),
// // //       amountPaid: parseFloat(amountPaid),
// // //       balanceDue: parseFloat(balanceDue),
// // //       paymentMethod: paymentMethod,
// // //       status: status,
// // //       billType: billType,
// // //       transactionId: `TRANS-${Math.floor(Math.random() * 1000000)}`, // Auto-generated
// // //       issuedByUserId: 'mockUser123', // Static for this example
// // //       bills: ['Consultation', 'Additional Charges'], // Simplified bill items
// // //       billDocumentUrl: billDocumentUrl,
// // //     };

// // //     try {
// // //       const createdBill = await fetchData('http://localhost:2009/api/bills', {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify(newBill),
// // //       });

// // //       setSelectedBillId(createdBill.id);
// // //       setShowSuccessModal(true);
// // //       console.log('Bill created successfully:', createdBill);
// // //     } catch (e) {
// // //       setFormError('Failed to create bill.');
// // //       console.error('Error creating bill:', e);
// // //     } finally {
// // //       setFormLoading(false);
// // //     }
// // //   };

// // //   const createPDFContent = () => {
// // //     if (!appointmentDetails) return '';

// // //     const baseFee = parseFloat(consultationFee || 0) + parseFloat(additionalCharges || 0);
// // //     const gst = baseFee * 0.18;
// // //     const calculatedTotalAmount = baseFee + gst;

// // //     return `
// // //       <div id="bill-template" style="font-family: Arial, sans-serif; font-size: 12px; line-height: 1.6; padding: 20px; color: #333; border: 1px solid #ddd; max-width: 800px; margin: auto;">
// // //         <div style="text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px;">
// // //           <h1 style="color: #004d40; margin: 0;">Sarvotham Spine Care Hospital</h1>
// // //           <p style="margin: 5px 0 0;">123 Health St, Wellness City, 560001</p>
// // //           <p style="margin: 0;">Phone: (080) 1234 5678 | Email: contact@sarvothamhospital.com</p>
// // //         </div>
// // //         <h2 style="text-align: center; color: #333; margin-bottom: 20px;">Invoice / Medical Bill</h2>
// // //         <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
// // //           <div>
// // //             <strong>Bill Date:</strong> ${billDate || 'N/A'}<br/>
// // //             <strong>Bill Type:</strong> Consultation
// // //           </div>
// // //           <div>
// // //             <strong>Patient:</strong> ${appointmentDetails.patientFullName}<br/>
// // //             <strong>Doctor:</strong> ${appointmentDetails.doctorFullName}
// // //           </div>
// // //         </div>
// // //         <table style="width: 100%; border-collapse: collapse; margin-top: 20px; border: 1px solid #ddd;">
// // //           <thead>
// // //             <tr style="background-color: #f2f2f2;">
// // //               <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Description</th>
// // //               <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Amount (₹)</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody>
// // //             <tr>
// // //               <td style="padding: 8px; border: 1px solid #ddd;">Consultation Fee</td>
// // //               <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${parseFloat(consultationFee).toFixed(2)}</td>
// // //             </tr>
// // //             <tr>
// // //               <td style="padding: 8px; border: 1px solid #ddd;">Additional Charges</td>
// // //               <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${parseFloat(additionalCharges).toFixed(2)}</td>
// // //             </tr>
// // //             <tr>
// // //               <td style="padding: 8px; border: 1px solid #ddd;">GST (18%)</td>
// // //               <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${gst.toFixed(2)}</td>
// // //             </tr>
// // //           </tbody>
// // //         </table>
// // //         <div style="margin-top: 20px; text-align: right;">
// // //           <p style="font-size: 16px; font-weight: bold; margin: 5px 0;">Total Amount: ₹${calculatedTotalAmount.toFixed(2)}</p>
// // //           <p style="margin: 5px 0;">Payment Method: ${paymentMethod}</p>
// // //         </div>
// // //         <div style="margin-top: 40px; border-top: 1px dashed #999; padding-top: 20px;">
// // //           <p><strong>Notes:</strong> ${notes || 'N/A'}</p>
// // //         </div>
// // //         <div style="margin-top: 40px; text-align: center; color: #666; font-style: italic;">
// // //           Thank you for choosing Sarvotham Spine Care Hospital.
// // //         </div>
// // //       </div>
// // //     `;
// // //   };

   
 


// // //   const handleGeneratePDFPreview = async () => {
// // //     if (!appointmentDetails) {
// // //       alert('No appointment details available to generate a PDF preview.');
// // //       return;
// // //     }

// // //     setPdfContent('');
// // //     setPdfBlob(null);

// // //     const contentHtml = createPDFContent();
// // //     setPdfContent(contentHtml);

// // //     const billContent = document.createElement('div');
// // //     billContent.style.width = '210mm';
// // //     billContent.style.backgroundColor = '#fff';
// // //     billContent.innerHTML = contentHtml;
// // //     document.body.appendChild(billContent);

// // //     try {
// // //       const canvas = await html2canvas(billContent, { scale: 2 });
// // //       const imgData = canvas.toDataURL('image/png');
// // //       const pdf = new jsPDF('p', 'mm', 'a4');
// // //       const imgProps = pdf.getImageProperties(imgData);
// // //       const pdfWidth = pdf.internal.pageSize.getWidth();
// // //       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

// // //       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
// // //       const pdfOutput = pdf.output('blob');
// // //       setPdfBlob(pdfOutput);

// // //       setShowPreviewModal(true);
// // //     } catch (error) {
// // //       console.error('Error generating PDF:', error);
// // //       alert('Failed to generate PDF. Please try again.');
// // //     } finally {
// // //       document.body.removeChild(billContent);
// // //     }
// // //   };

// // //   const handleDownloadPDF = () => {
// // //     if (!pdfBlob) {
// // //       alert('PDF not available for download.');
// // //       return;
// // //     }

// // //     const url = URL.createObjectURL(pdfBlob);
// // //     const link = document.createElement('a');
// // //     link.href = url;
// // //     link.download = `bill_appointment_${selectedAppointmentId}.pdf`;
// // //     document.body.appendChild(link);
// // //     link.click();
// // //     document.body.removeChild(link);
// // //     URL.revokeObjectURL(url);
// // //   };

// // //   const handleUploadBill = async (event) => {
// // //     const file = event.target.files[0];
// // //     if (!file) {
// // //       return;
// // //     }

// // //     // Client-side validation to prevent sending invalid files
// // //     const MAX_FILE_SIZE_MB = 10;
// // //     const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
    
// // //     if (file.size > MAX_FILE_SIZE_BYTES) {
// // //       alert(`File is too large. Please upload a file smaller than ${MAX_FILE_SIZE_MB} MB.`);
// // //       event.target.value = null; // Reset the input field
// // //       return;
// // //     }
    
// // //     if (file.type !== 'application/pdf') {
// // //       alert('Invalid file type. Only PDF files are allowed.');
// // //       event.target.value = null; // Reset the input field
// // //       return;
// // //     }

// // //     setUploading(true);
// // //     const formData = new FormData();
// // //     formData.append('billDocument', file);

// // //     try {
// // //       const response = await fetch(`http://localhost:2009/api/bills/upload-document`, { // No trailing slash
// // //         method: 'POST',
// // //         body: formData,
// // //       });

// // //       if (!response.ok) {
// // //         const errorText = await response.text();
// // //         throw new Error(errorText || 'Failed to upload file');
// // //       }

// // //       const uploadResult = await response.json();
// // //       console.log('File uploaded successfully:', uploadResult);

// // //       setBillDocumentUrl(uploadResult.fileUrl);

// // //       alert(`Uploaded file: ${file.name} and bill document URL updated. Please click 'Create Bill' to finalize.`);
// // //     } catch (e) {
// // //       console.error('Error uploading file:', e);
// // //       alert(`Failed to upload file: ${e.message}`);
// // //     } finally {
// // //       setUploading(false);
// // //       event.target.value = null;
// // //     }
// // //   };

// // //   const handleCloseModal = () => {
// // //     setShowSuccessModal(false);
// // //     handleBackToList();
// // //   };

// // //   const handleClosePreviewModal = () => {
// // //     setShowPreviewModal(false);
// // //     setPdfContent('');
// // //     setPdfBlob(null);
// // //   };

// // //   const renderAppointmentList = () => (
// // //     <Box
// // //       sx={{
// // //         display: 'flex',
// // //         flexDirection: 'column',
// // //         alignItems: 'center',
// // //         justifyContent: 'flex-start',
// // //         height: '100vh',
// // //         p: 4,
// // //         bgcolor: 'background.default',
// // //         overflowY: 'auto',
// // //       }}
// // //     >
// // //       <Typography variant="h4" component="h1" gutterBottom>
// // //         Consultation Bill
// // //       </Typography>
// // //       <Typography variant="body1" color="text.secondary" align="center" sx={{ maxWidth: 600, mb: 4 }}>
// // //         Welcome! Here are the recent appointments. Click "Generate Bill" to create a bill.
// // //       </Typography>

// // //       {listLoading && (
// // //         <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
// // //           <CircularProgress />
// // //         </Box>
// // //       )}

// // //       {listError && (
// // //         <Alert severity="error" sx={{ width: '100%', maxWidth: 700, mt: 2 }}>
// // //           {listError}
// // //         </Alert>
// // //       )}

// // //       {!listLoading && !listError && appointments.length === 0 && (
// // //         <Alert severity="info" sx={{ width: '100%', maxWidth: 700, mt: 2 }}>
// // //           No appointments found.
// // //         </Alert>
// // //       )}

// // //       {!listLoading && !listError && appointments.length > 0 && (
// // //         <Box sx={{ width: '100%', maxWidth: 700 }}>
// // //           <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'text.primary', mb: 2 }}>
// // //             Recent Appointments
// // //           </Typography>
// // //           <List>
// // //             {appointments.map((appointment) => (
// // //               <Paper key={appointment.id} sx={{ mb: 2, p: 2 }}>
// // //                 <ListItem
// // //                   disableGutters
// // //                   secondaryAction={
// // //                     <Button
// // //                       variant="contained"
// // //                       color="primary"
// // //                       sx={{ ml: 2, flexShrink: 0 }}
// // //                       onClick={() => handleGenerateBillClick(appointment)}
// // //                     >
// // //                       Generate Bill
// // //                     </Button>
// // //                   }
// // //                 >
// // //                   <ListItemText
// // //                     primary={<Typography variant="h6">{appointment.patientFullName}</Typography>}
// // //                     secondary={
// // //                       <>
// // //                         <Typography component="span" color="text.primary">
// // //                           Doctor: {appointment.doctorFullName} ({appointment.doctorSpecialization}) - Fee: ₹{appointment.doctorConsultationFee}
// // //                         </Typography>
// // //                         <br />
// // //                         <Typography component="span" color="text.secondary">
// // //                           Date: {appointment.formattedDate} | Time: {appointment.formattedTime}
// // //                         </Typography>
// // //                         <br />
// // //                         <Typography component="span" color="text.secondary">
// // //                           Reason: {appointment.reasonForVisit || 'N/A'}
// // //                         </Typography>
// // //                       </>
// // //                     }
// // //                   />
// // //                 </ListItem>
// // //               </Paper>
// // //             ))}
// // //           </List>
// // //         </Box>
// // //       )}
// // //     </Box>
// // //   );

// // //   const renderBillingForm = () => {
// // //     if (formLoading) {
// // //       return (
// // //         <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
// // //           <CircularProgress />
// // //         </Box>
// // //       );
// // //     }

// // //     if (formError) {
// // //       return (
// // //         <Box sx={{ p: 4 }}>
// // //           <Alert severity="error">{formError}</Alert>
// // //           <Button variant="outlined" onClick={handleBackToList} sx={{ mt: 2 }}>
// // //             &larr; Back to Appointments
// // //           </Button>
// // //         </Box>
// // //       );
// // //     }

// // //     if (!appointmentDetails) {
// // //       return (
// // //         <Box sx={{ p: 4 }}>
// // //           <Typography variant="body1">No appointment data found.</Typography>
// // //           <Button variant="outlined" onClick={handleBackToList} sx={{ mt: 2 }}>
// // //             &larr; Back to Appointments
// // //           </Button>
// // //         </Box>
// // //       );
// // //     }

// // //     return (
// // //       <Box sx={{ p: 4, maxWidth: 720, mx: 'auto', overflowY: 'auto' }}>
// // //         <Typography variant="h4" gutterBottom>
// // //           Generate Bill
// // //         </Typography>
// // //         <Button onClick={handleBackToList} variant="outlined" sx={{ mb: 3 }}>
// // //           &larr; Back to Appointments
// // //         </Button>

// // //         <Card sx={{ mb: 3 }}>
// // //           <CardContent>
// // //             <Typography variant="h6" gutterBottom>
// // //               Appointment Details
// // //             </Typography>
// // //             <Divider sx={{ my: 1 }} />
// // //             <Typography>
// // //               <strong>Patient:</strong> {appointmentDetails.patientFullName}
// // //             </Typography>
// // //             <Typography>
// // //               <strong>Doctor:</strong> {appointmentDetails.doctorFullName} ({appointmentDetails.doctorSpecialization})
// // //             </Typography>
// // //             <Typography>
// // //               <strong>Date:</strong> {appointmentDetails.formattedDate}
// // //             </Typography>
// // //             <Typography>
// // //               <strong>Time:</strong> {appointmentDetails.formattedTime}
// // //             </Typography>
// // //             <Typography>
// // //               <strong>Reason:</strong> {appointmentDetails.reasonForVisit || 'N/A'}
// // //             </Typography>
// // //           </CardContent>
// // //         </Card>

// // //         <Card>
// // //           <CardContent>
// // //             <Typography variant="h6" gutterBottom>
// // //               Bill Information
// // //             </Typography>
// // //             <Divider sx={{ my: 1 }} />
// // //             <Grid container spacing={2}>
// // //               {/* Bill Date - Current Date (Read-only) */}
// // //               <Grid item xs={12} sm={6}>
// // //                 <TextField
// // //                   label="Bill Date"
// // //                   fullWidth
// // //                   value={billDate}
// // //                   InputProps={{ readOnly: true }}
// // //                   InputLabelProps={{ shrink: true }}
// // //                 />
// // //               </Grid>

// // //               {/* Bill Type - Consultation (Read-only) */}
// // //               <Grid item xs={12} sm={6}>
// // //                 <TextField
// // //                   label="Bill Type"
// // //                   fullWidth
// // //                   value={billType}
// // //                   InputProps={{ readOnly: true }}
// // //                 />
// // //               </Grid>

// // //               {/* Payment Method - Combo Box */}
// // //               <Grid item xs={12} sm={6}>
// // //                 <FormControl fullWidth>
// // //                   <InputLabel id="payment-method-label">Payment Method</InputLabel>
// // //                   <Select
// // //                     labelId="payment-method-label"
// // //                     value={paymentMethod}
// // //                     label="Payment Method"
// // //                     onChange={(e) => setPaymentMethod(e.target.value)}
// // //                   >
// // //                     <MenuItem value="Credit Card">Credit Card</MenuItem>
// // //                     <MenuItem value="Debit Card">Debit Card</MenuItem>
// // //                     <MenuItem value="Cash">Cash</MenuItem>
// // //                     <MenuItem value="Online Transfer">Online Transfer</MenuItem>
// // //                   </Select>
// // //                 </FormControl>
// // //               </Grid>

// // //               {/* Consultation Fee */}
// // //               <Grid item xs={12} sm={6}>
// // //                 <TextField
// // //                   label="Consultation Fee"
// // //                   fullWidth
// // //                   type="number"
// // //                   value={consultationFee}
// // //                   onChange={(e) => setConsultationFee(e.target.value)}
// // //                 />
// // //               </Grid>

// // //               {/* Additional Charges */}
// // //               <Grid item xs={12} sm={6}>
// // //                 <TextField
// // //                   label="Additional Charges"
// // //                   fullWidth
// // //                   type="number"
// // //                   value={additionalCharges}
// // //                   onChange={(e) => setAdditionalCharges(e.target.value)}
// // //                 />
// // //               </Grid>

// // //               {/* Total Amount (Read-only) */}
// // //               <Grid item xs={12} sm={6}>
// // //                 <TextField
// // //                   label="Total Amount"
// // //                   fullWidth
// // //                   type="number"
// // //                   value={totalAmount}
// // //                   InputProps={{ readOnly: true }}
// // //                 />
// // //               </Grid>

// // //               {/* Amount Paid */}
// // //               <Grid item xs={12} sm={6}>
// // //                 <TextField
// // //                   label="Amount Paid"
// // //                   fullWidth
// // //                   type="number"
// // //                   value={amountPaid}
// // //                   onChange={(e) => setAmountPaid(e.target.value)}
// // //                 />
// // //               </Grid>

// // //               {/* Balance Due (Read-only) */}
// // //               <Grid item xs={12} sm={6}>
// // //                 <TextField
// // //                   label="Balance Due"
// // //                   fullWidth
// // //                   type="number"
// // //                   value={parseFloat(totalAmount - amountPaid).toFixed(2)}
// // //                   InputProps={{ readOnly: true }}
// // //                 />
// // //               </Grid>

// // //               {/* Status */}
// // //               <Grid item xs={12}>
// // //                 <TextField
// // //                   label="Status"
// // //                   fullWidth
// // //                   value={status}
// // //                   onChange={(e) => setStatus(e.target.value)}
// // //                 />
// // //               </Grid>
// // //             </Grid>

// // //             {/* Generate PDF button and Upload section */}
// // //             <Box sx={{ mt: 3, mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
// // //               <Button
// // //                 variant="outlined"
// // //                 onClick={handleGeneratePDFPreview}
// // //                 disabled={!appointmentDetails} // Button is now enabled as long as appointment details are available
// // //               >
// // //                 Generate PDF
// // //               </Button>
// // //             </Box>

// // //             <Box sx={{ mt: 2 }}>
// // //               <Typography variant="subtitle1" gutterBottom>
// // //                 Upload Document
// // //               </Typography>
// // //               <TextField
// // //                 label="Choose File"
// // //                 fullWidth
// // //                 InputProps={{
// // //                   readOnly: true,
// // //                   startAdornment: (
// // //                     <input
// // //                       type="file"
// // //                       style={{ display: 'none' }}
// // //                       id="bill-document-upload"
// // //                       onChange={handleUploadBill}
// // //                     />
// // //                   ),
// // //                 }}
// // //                 onClick={() => document.getElementById('bill-document-upload').click()}
// // //                 value={billDocumentUrl.split('/').pop() || ''}
// // //               />
// // //               <Typography variant="caption" color="text.secondary">
// // //                 {uploading ? 'Uploading...' : 'Click to choose a file'}
// // //               </Typography>
// // //             </Box>

// // //             <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
// // //               <Button
// // //                 variant="contained"
// // //                 onClick={handleCreateBill}
// // //                 disabled={formLoading || !!selectedBillId || !billDocumentUrl}
// // //               >
// // //                 {formLoading ? 'Creating Bill...' : 'Create Bill'}
// // //               </Button>
// // //             </Box>
// // //           </CardContent>
// // //         </Card>

// // //         {/* Success Modal */}
// // //         <Modal
// // //           open={showSuccessModal}
// // //           onClose={handleCloseModal}
// // //           aria-labelledby="success-modal-label"
// // //           aria-describedby="success-modal-description"
// // //         >
// // //           <Box
// // //             sx={{
// // //               position: 'absolute',
// // //               top: '50%',
// // //               left: '50%',
// // //               transform: 'translate(-50%, -50%)',
// // //               width: 400,
// // //               bgcolor: 'background.paper',
// // //               boxShadow: 24,
// // //               borderRadius: 2,
// // //               p: 4,
// // //               outline: 'none',
// // //             }}
// // //           >
// // //             <Typography id="success-modal-label" variant="h6" gutterBottom>
// // //               Success
// // //             </Typography>
// // //             <Typography id="success-modal-description" sx={{ mb: 3 }}>
// // //               Bill for appointment created successfully with ID: <strong>{selectedBillId}</strong>.
// // //             </Typography>
// // //             <Box textAlign="right">
// // //               <Button variant="contained" onClick={handleCloseModal}>
// // //                 OK
// // //               </Button>
// // //             </Box>
// // //           </Box>
// // //         </Modal>

// // //         {/* PDF Preview Modal */}
// // //         <Modal
// // //           open={showPreviewModal}
// // //           onClose={handleClosePreviewModal}
// // //           aria-labelledby="pdf-preview-modal-title"
// // //           aria-describedby="pdf-preview-modal-description"
// // //         >
// // //           <Box
// // //             sx={{
// // //               position: 'absolute',
// // //               top: '50%',
// // //               left: '50%',
// // //               transform: 'translate(-50%, -50%)',
// // //               width: { xs: '90%', sm: '70%', md: '60%' },
// // //               height: '90vh',
// // //               bgcolor: 'background.paper',
// // //               boxShadow: 24,
// // //               p: 4,
// // //               outline: 'none',
// // //               display: 'flex',
// // //               flexDirection: 'column',
// // //             }}
// // //           >
// // //             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// // //               <Typography id="pdf-preview-modal-title" variant="h6">
// // //                 PDF Preview
// // //               </Typography>
// // //               <IconButton onClick={handleClosePreviewModal} aria-label="close">
// // //                 <CloseIcon />
// // //               </IconButton>
// // //             </Box>
// // //             <Divider />
// // //             <Box id="pdf-preview-content" sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }} dangerouslySetInnerHTML={{ __html: pdfContent }} />
// // //             <Divider />
// // //             <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
// // //               <Button variant="contained" color="primary" onClick={handleDownloadPDF} disabled={!pdfBlob}>
// // //                 Download PDF
// // //               </Button>
// // //             </Box>
// // //           </Box>
// // //         </Modal>
// // //       </Box>
// // //     );
// // //   };

// // //   return selectedAppointmentId === null ? renderAppointmentList() : renderBillingForm();
// // // }

// // import React, { useState, useEffect } from 'react';
// // import {
// //   Box,
// //   Typography,
// //   Paper,
// //   List,
// //   ListItem,
// //   ListItemText,
// //   Divider,
// //   CircularProgress,
// //   Alert,
// //   Button,
// //   Grid,
// //   TextField,
// //   Card,
// //   CardContent,
// //   Modal,
// //   IconButton,
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   MenuItem,
// //   styled,
// // } from '@mui/material';
// // import CloseIcon from '@mui/icons-material/Close';
// // import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// // // PDF Libraries
// // import jsPDF from 'jspdf';
// // import html2canvas from 'html2canvas';

// // // Styled Components for custom styles
// // const StyledPaper = styled(Paper)(({ theme }) => ({
// //   backgroundColor: '#ffffff',
// //   boxShadow: theme.shadows[3],
// //   borderRadius: theme.shape.borderRadius,
// //   transition: 'transform 0.2s, box-shadow 0.2s',
// //   '&:hover': {
// //     transform: 'translateY(-2px)',
// //     boxShadow: theme.shadows[6],
// //   },
// // }));

// // const StyledButton = styled(Button)(({ theme }) => ({
// //   backgroundColor: '#00796b',
// //   color: '#ffffff',
// //   '&:hover': {
// //     backgroundColor: '#004d40',
// //   },
// // }));

// // // Utility function to fetch data with error handling and simulated delay
// // async function fetchData(url, options = {}) {
// //   await new Promise((r) => setTimeout(r, 300)); // 300ms delay
// //   const res = await fetch(url, options);
// //   if (!res.ok) {
// //     const msg = await res.text();
// //     throw new Error(msg || 'Fetch error');
// //   }
// //   return res.json();
// // }

// // export default function BillingDesk() {
// //   const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
// //   const [selectedBillId, setSelectedBillId] = useState(null);

// //   // Appointment List States
// //   const [appointments, setAppointments] = useState([]);
// //   const [listLoading, setListLoading] = useState(false);
// //   const [listError, setListError] = useState(null);

// //   // Billing Form States
// //   const [appointmentDetails, setAppointmentDetails] = useState(null);
// //   const [formLoading, setFormLoading] = useState(false);
// //   const [formError, setFormError] = useState(null);
// //   const [billDetails, setBillDetails] = useState(null);

// //   // Bill Document fields based on Bill.java
// //   const [billDate] = useState(new Date().toISOString().split('T')[0]);
// //   const [totalAmount, setTotalAmount] = useState(0);
// //   const [amountPaid, setAmountPaid] = useState(0);
// //   const [balanceDue, setBalanceDue] = useState(0);
// //   const [paymentMethod, setPaymentMethod] = useState('Credit Card'); // Combo box value
// //   const [status, setStatus] = useState('Pending');
// //   const [billType] = useState('Consultation'); // Fixed value
// //   const [billDocumentUrl, setBillDocumentUrl] = useState('');
// //   const [consultationFee, setConsultationFee] = useState('0.00');
// //   const [additionalCharges, setAdditionalCharges] = useState('0.00');
// //   const [notes, setNotes] = useState('');

// //   // Modals and PDF states
// //   const [showSuccessModal, setShowSuccessModal] = useState(false);
// //   const [showPreviewModal, setShowPreviewModal] = useState(false);
// //   const [pdfContent, setPdfContent] = useState('');
// //   const [pdfBlob, setPdfBlob] = useState(null);
// //   const [uploading, setUploading] = useState(false);

// //   // Auto-calculation useEffect
// //   useEffect(() => {
// //     const calculatedTotal = parseFloat(consultationFee || 0) + parseFloat(additionalCharges || 0);
// //     setTotalAmount(calculatedTotal.toFixed(2));
// //     setAmountPaid(calculatedTotal.toFixed(2));
// //     setBalanceDue(0);
// //   }, [consultationFee, additionalCharges]);

// //   // Load appointments from API
// //   useEffect(() => {
// //     if (selectedAppointmentId === null) {
// //       async function loadAppointments() {
// //         try {
// //           setListLoading(true);
// //           setListError(null);
// //           const appts = await fetchData('http://localhost:2010/api/appointments');

// //           const enriched = await Promise.all(
// //             appts.map(async (appt) => {
// //               let patientFullName = 'Unknown Patient';
// //               let doctorFullName = 'Unknown Doctor';
// //               let doctorConsultationFee = 'N/A';
// //               let doctorSpecialization = '';

// //               try {
// //                 const patient = await fetchData(`http://localhost:2008/api/patients/${appt.patientId}`);
// //                 patientFullName = `${patient.first_name} ${patient.last_name}`;
// //               } catch (e) {
// //                 console.error('Error fetching patient:', e);
// //               }

// //               try {
// //                 const doctor = await fetchData(`http://localhost:2005/api/doctors/${appt.doctorId}`);
// //                 doctorFullName = `Dr. ${doctor.firstName} ${doctor.lastName}`;
// //                 doctorConsultationFee = doctor.consultationFee?.toString() ?? 'N/A';
// //                 doctorSpecialization = doctor.specialization ?? '';
// //               } catch (e) {
// //                 console.error('Error fetching doctor:', e);
// //               }

// //               return {
// //                 ...appt,
// //                 patientFullName,
// //                 doctorFullName,
// //                 doctorConsultationFee,
// //                 doctorSpecialization,
// //                 formattedDate: new Date(appt.appointmentDate).toLocaleDateString(),
// //                 formattedTime: new Date(appt.appointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// //               };
// //             })
// //           );
// //           setAppointments(enriched);
// //         } catch (e) {
// //           setListError('Failed to load appointments.');
// //           console.error(e);
// //         } finally {
// //           setListLoading(false);
// //         }
// //       }
// //       loadAppointments();
// //     }
// //   }, [selectedAppointmentId]);

// //   // Load appointment details when an appointment is selected
// //   useEffect(() => {
// //     if (selectedAppointmentId !== null) {
// //       async function loadAppointmentDetails() {
// //         try {
// //           setFormLoading(true);
// //           setFormError(null);
// //           const appt = await fetchData(`http://localhost:2010/api/appointments/${selectedAppointmentId}`);

// //           let patientFullName = 'Unknown Patient';
// //           let doctorFullName = 'Unknown Doctor';
// //           let doctorConsultationFee = '250.00';
// //           let doctorSpecialization = '';

// //           try {
// //             const patient = await fetchData(`http://localhost:2008/api/patients/${appt.patientId}`);
// //             patientFullName = `${patient.first_name} ${patient.last_name}`;
// //           } catch (e) {
// //             console.error('Error fetching patient:', e);
// //           }

// //           try {
// //             const doctor = await fetchData(`http://localhost:2005/api/doctors/${appt.doctorId}`);
// //             doctorFullName = `Dr. ${doctor.firstName} ${doctor.lastName}`;
// //             doctorConsultationFee = doctor.consultationFee?.toString() ?? '250.00';
// //             doctorSpecialization = doctor.specialization ?? '';
// //           } catch (e) {
// //             console.error('Error fetching doctor:', e);
// //           }

// //           setAppointmentDetails({
// //             ...appt,
// //             patientFullName,
// //             doctorFullName,
// //             doctorConsultationFee,
// //             doctorSpecialization,
// //             formattedDate: new Date(appt.appointmentDate).toLocaleDateString(),
// //             formattedTime: new Date(appt.appointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// //           });

// //           setConsultationFee(doctorConsultationFee);
// //           setAdditionalCharges('0.00');
// //           setNotes('');
// //           setPaymentMethod('Credit Card');
// //           setStatus('Pending');
// //           setBillDocumentUrl(''); // Reset the URL when a new appointment is selected
// //         } catch (e) {
// //           setFormError('Failed to load appointment details.');
// //           console.error(e);
// //         } finally {
// //           setFormLoading(false);
// //         }
// //       }
// //       loadAppointmentDetails();
// //     } else {
// //       setAppointmentDetails(null);
// //     }
// //   }, [selectedAppointmentId]);

// //   // Handlers
// //   const handleGenerateBillClick = (appointment) => {
// //     setSelectedAppointmentId(appointment.id);
// //     setSelectedBillId(null); // Ensure no old bill ID is present
// //     setBillDocumentUrl(''); // Ensure the document URL is reset
// //   };

// //   const handleBackToList = () => {
// //     setSelectedAppointmentId(null);
// //     setFormError(null);
// //     setSelectedBillId(null);
// //   };

// //   const handleCreateBill = async () => {
// //     if (!appointmentDetails) {
// //       alert('No appointment selected.');
// //       return;
// //     }

// //     // Check if a bill document has been uploaded
// //     if (!billDocumentUrl) {
// //       alert('Please upload a bill document first.');
// //       return;
// //     }

// //     setFormLoading(true);
// //     setFormError(null);

// //     const newBill = {
// //       patientId: appointmentDetails.patientId,
// //       appointmentId: selectedAppointmentId,
// //       billDate: billDate,
// //       totalAmount: parseFloat(totalAmount),
// //       amountPaid: parseFloat(amountPaid),
// //       balanceDue: parseFloat(balanceDue),
// //       paymentMethod: paymentMethod,
// //       status: status,
// //       billType: billType,
// //       transactionId: `TRANS-${Math.floor(Math.random() * 1000000)}`, // Auto-generated
// //       issuedByUserId: 'mockUser123', // Static for this example
// //       bills: ['Consultation', 'Additional Charges'], // Simplified bill items
// //       billDocumentUrl: billDocumentUrl,
// //     };

// //     try {
// //       const createdBill = await fetchData('http://localhost:2009/api/bills', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(newBill),
// //       });

// //       setSelectedBillId(createdBill.id);
// //       setShowSuccessModal(true);
// //       console.log('Bill created successfully:', createdBill);
// //     } catch (e) {
// //       setFormError('Failed to create bill.');
// //       console.error('Error creating bill:', e);
// //     } finally {
// //       setFormLoading(false);
// //     }
// //   };

// //   const createPDFContent = () => {
// //     if (!appointmentDetails) return '';

// //     const baseFee = parseFloat(consultationFee || 0) + parseFloat(additionalCharges || 0);
// //     const gst = baseFee * 0.18;
// //     const calculatedTotalAmount = baseFee + gst;

// //     return `
// //       <div id="bill-template" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 14px; line-height: 1.6; padding: 30px; color: #444; border: 1px solid #e0e0e0; max-width: 800px; margin: auto; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border-radius: 8px;">
// //         <div style="text-align: center; border-bottom: 3px solid #00796b; padding-bottom: 15px; margin-bottom: 25px;">
// //           <h1 style="color: #00796b; margin: 0; font-size: 28px;">Sarvotham Spine Care Hospital</h1>
// //           <p style="margin: 8px 0 0; font-size: 14px;">123 Health St, Wellness City, 560001</p>
// //           <p style="margin: 4px 0 0; font-size: 14px;">Phone: (080) 1234 5678 | Email: contact@sarvothamhospital.com</p>
// //         </div>
// //         <h2 style="text-align: center; color: #555; margin-bottom: 25px; font-size: 22px; font-weight: 600;">Invoice / Medical Bill</h2>
// //         <div style="display: flex; justify-content: space-between; margin-bottom: 20px; background-color: #f9f9f9; padding: 15px; border-radius: 6px;">
// //           <div>
// //             <strong>Bill Date:</strong> ${billDate || 'N/A'}<br/>
// //             <strong>Bill Type:</strong> Consultation
// //           </div>
// //           <div style="text-align: right;">
// //             <strong>Patient:</strong> ${appointmentDetails.patientFullName}<br/>
// //             <strong>Doctor:</strong> ${appointmentDetails.doctorFullName}
// //           </div>
// //         </div>
// //         <table style="width: 100%; border-collapse: collapse; margin-top: 20px; border: 1px solid #e0e0e0; border-radius: 6px; overflow: hidden;">
// //           <thead>
// //             <tr style="background-color: #00796b; color: #ffffff;">
// //               <th style="padding: 12px; border: 1px solid #e0e0e0; text-align: left;">Description</th>
// //               <th style="padding: 12px; border: 1px solid #e0e0e0; text-align: right;">Amount (₹)</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             <tr style="background-color: #fdfdfd;">
// //               <td style="padding: 12px; border: 1px solid #e0e0e0;">Consultation Fee</td>
// //               <td style="padding: 12px; border: 1px solid #e0e0e0; text-align: right;">${parseFloat(consultationFee).toFixed(2)}</td>
// //             </tr>
// //             <tr style="background-color: #fdfdfd;">
// //               <td style="padding: 12px; border: 1px solid #e0e0e0;">Additional Charges</td>
// //               <td style="padding: 12px; border: 1px solid #e0e0e0; text-align: right;">${parseFloat(additionalCharges).toFixed(2)}</td>
// //             </tr>
// //             <tr style="background-color: #fdfdfd;">
// //               <td style="padding: 12px; border: 1px solid #e0e0e0;">GST (18%)</td>
// //               <td style="padding: 12px; border: 1px solid #e0e0e0; text-align: right;">${gst.toFixed(2)}</td>
// //             </tr>
// //             <tr style="background-color: #f2f2f2; font-weight: bold;">
// //               <td style="padding: 12px; border: 1px solid #e0e0e0; text-align: right;">Total Amount</td>
// //               <td style="padding: 12px; border: 1px solid #e0e0e0; text-align: right;">₹${(baseFee + gst).toFixed(2)}</td>
// //             </tr>
// //           </tbody>
// //         </table>
// //         <div style="margin-top: 25px; text-align: right;">
// //           <p style="font-size: 16px; font-weight: bold; margin: 5px 0; color: #00796b;">Total Amount: ₹${calculatedTotalAmount.toFixed(2)}</p>
// //           <p style="margin: 5px 0;">Payment Method: ${paymentMethod}</p>
// //         </div>
// //         <div style="margin-top: 40px; border-top: 1px dashed #cccccc; padding-top: 20px;">
// //           <p style="font-size: 14px;"><strong>Notes:</strong> ${notes || 'N/A'}</p>
// //         </div>
// //         <div style="margin-top: 40px; text-align: center; color: #888; font-style: italic; font-size: 14px;">
// //           Thank you for choosing Sarvotham Spine Care Hospital.
// //         </div>
// //       </div>
// //     `;
// //   };

// //   const handleGeneratePDFPreview = async () => {
// //     if (!appointmentDetails) {
// //       alert('No appointment details available to generate a PDF preview.');
// //       return;
// //     }

// //     setPdfContent('');
// //     setPdfBlob(null);

// //     const contentHtml = createPDFContent();
// //     setPdfContent(contentHtml);

// //     const billContent = document.createElement('div');
// //     billContent.style.width = '210mm';
// //     billContent.style.backgroundColor = '#fff';
// //     billContent.innerHTML = contentHtml;
// //     document.body.appendChild(billContent);

// //     try {
// //       const canvas = await html2canvas(billContent, { scale: 2 });
// //       const imgData = canvas.toDataURL('image/png');
// //       const pdf = new jsPDF('p', 'mm', 'a4');
// //       const imgProps = pdf.getImageProperties(imgData);
// //       const pdfWidth = pdf.internal.pageSize.getWidth();
// //       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

// //       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
// //       const pdfOutput = pdf.output('blob');
// //       setPdfBlob(pdfOutput);

// //       setShowPreviewModal(true);
// //     } catch (error) {
// //       console.error('Error generating PDF:', error);
// //       alert('Failed to generate PDF. Please try again.');
// //     } finally {
// //       document.body.removeChild(billContent);
// //     }
// //   };

// //   const handleDownloadPDF = () => {
// //     if (!pdfBlob) {
// //       alert('PDF not available for download.');
// //       return;
// //     }

// //     const url = URL.createObjectURL(pdfBlob);
// //     const link = document.createElement('a');
// //     link.href = url;
// //     link.download = `bill_appointment_${selectedAppointmentId}.pdf`;
// //     document.body.appendChild(link);
// //     link.click();
// //     document.body.removeChild(link);
// //     URL.revokeObjectURL(url);
// //   };

// //   const handleUploadBill = async (event) => {
// //     const file = event.target.files[0];
// //     if (!file) {
// //       return;
// //     }

// //     // Client-side validation to prevent sending invalid files
// //     const MAX_FILE_SIZE_MB = 10;
// //     const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// //     if (file.size > MAX_FILE_SIZE_BYTES) {
// //       alert(`File is too large. Please upload a file smaller than ${MAX_FILE_SIZE_MB} MB.`);
// //       event.target.value = null; // Reset the input field
// //       return;
// //     }

// //     if (file.type !== 'application/pdf') {
// //       alert('Invalid file type. Only PDF files are allowed.');
// //       event.target.value = null; // Reset the input field
// //       return;
// //     }

// //     setUploading(true);
// //     const formData = new FormData();
// //     formData.append('billDocument', file);

// //     try {
// //       const response = await fetch(`http://localhost:2009/api/bills/upload-document`, {
// //         method: 'POST',
// //         body: formData,
// //       });

// //       if (!response.ok) {
// //         const errorText = await response.text();
// //         throw new Error(errorText || 'Failed to upload file');
// //       }

// //       const uploadResult = await response.json();
// //       console.log('File uploaded successfully:', uploadResult);

// //       setBillDocumentUrl(uploadResult.fileUrl);

// //       alert(`Uploaded file: ${file.name} and bill document URL updated. Please click 'Create Bill' to finalize.`);
// //     } catch (e) {
// //       console.error('Error uploading file:', e);
// //       alert(`Failed to upload file: ${e.message}`);
// //     } finally {
// //       setUploading(false);
// //       event.target.value = null;
// //     }
// //   };

// //   const handleCloseModal = () => {
// //     setShowSuccessModal(false);
// //     handleBackToList();
// //   };

// //   const handleClosePreviewModal = () => {
// //     setShowPreviewModal(false);
// //     setPdfContent('');
// //     setPdfBlob(null);
// //   };

// //   const renderAppointmentList = () => (
// //     <Box
// //       sx={{
// //         display: 'flex',
// //         flexDirection: 'column',
// //         alignItems: 'center',
// //         justifyContent: 'flex-start',
// //         minHeight: '100vh',
// //         p: 4,
// //         bgcolor: '#f4f6f8', // Light gray background
// //       }}
// //     >
// //       <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#00796b', fontWeight: 'bold' }}>
// //         Consultation Billing Desk 🧑‍⚕️
// //       </Typography>
// //       <Typography variant="body1" color="text.secondary" align="center" sx={{ maxWidth: 600, mb: 4 }}>
// //         Select an appointment from the list below to generate a new bill.
// //       </Typography>

// //       {listLoading && (
// //         <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
// //           <CircularProgress sx={{ color: '#00796b' }} />
// //         </Box>
// //       )}

// //       {listError && (
// //         <Alert severity="error" sx={{ width: '100%', maxWidth: 700, mt: 2 }}>
// //           {listError}
// //         </Alert>
// //       )}

// //       {!listLoading && !listError && appointments.length === 0 && (
// //         <Alert severity="info" sx={{ width: '100%', maxWidth: 700, mt: 2 }}>
// //           No appointments found.
// //         </Alert>
// //       )}

// //       {!listLoading && !listError && appointments.length > 0 && (
// //         <Box sx={{ width: '100%', maxWidth: 700 }}>
// //           <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#333', mb: 2, fontWeight: '600' }}>
// //             Recent Appointments
// //           </Typography>
// //           <List>
// //             {appointments.map((appointment) => (
// //               <StyledPaper key={appointment.id} sx={{ mb: 2 }}>
// //                 <ListItem
// //                   disableGutters
// //                   secondaryAction={
// //                     <StyledButton
// //                       variant="contained"
// //                       onClick={() => handleGenerateBillClick(appointment)}
// //                       sx={{ ml: 2, flexShrink: 0 }}
// //                     >
// //                       Generate Bill
// //                     </StyledButton>
// //                   }
// //                 >
// //                   <ListItemText
// //                     sx={{ p: 2 }}
// //                     primary={<Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>{appointment.patientFullName}</Typography>}
// //                     secondary={
// //                       <>
// //                         <Typography component="span" color="text.primary" sx={{ display: 'block' }}>
// //                           <span style={{ fontWeight: 'bold' }}>Doctor:</span> {appointment.doctorFullName} ({appointment.doctorSpecialization})
// //                         </Typography>
// //                         <Typography component="span" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
// //                           <span style={{ fontWeight: 'bold' }}>Date:</span> {appointment.formattedDate} | <span style={{ fontWeight: 'bold' }}>Time:</span> {appointment.formattedTime}
// //                         </Typography>
// //                         <Typography component="span" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
// //                           <span style={{ fontWeight: 'bold' }}>Reason:</span> {appointment.reasonForVisit || 'N/A'}
// //                         </Typography>
// //                       </>
// //                     }
// //                   />
// //                 </ListItem>
// //               </StyledPaper>
// //             ))}
// //           </List>
// //         </Box>
// //       )}
// //     </Box>
// //   );

// //   const renderBillingForm = () => {
// //     if (formLoading) {
// //       return (
// //         <Box sx={{ display: 'flex', justifyContent: 'center', p: 4, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
// //           <CircularProgress sx={{ color: '#00796b' }} />
// //         </Box>
// //       );
// //     }

// //     if (formError) {
// //       return (
// //         <Box sx={{ p: 4, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
// //           <Alert severity="error">{formError}</Alert>
// //           <Button variant="outlined" onClick={handleBackToList} sx={{ mt: 2, color: '#00796b', borderColor: '#00796b' }}>
// //             <ArrowBackIcon sx={{ mr: 1 }} /> Back to Appointments
// //           </Button>
// //         </Box>
// //       );
// //     }

// //     if (!appointmentDetails) {
// //       return (
// //         <Box sx={{ p: 4, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
// //           <Typography variant="body1">No appointment data found.</Typography>
// //           <Button variant="outlined" onClick={handleBackToList} sx={{ mt: 2, color: '#00796b', borderColor: '#00796b' }}>
// //             <ArrowBackIcon sx={{ mr: 1 }} /> Back to Appointments
// //           </Button>
// //         </Box>
// //       );
// //     }

// //     return (
// //       <Box sx={{ p: 4, maxWidth: 800, mx: 'auto', bgcolor: '#f4f6f8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
// //         <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
// //           <Button onClick={handleBackToList} variant="text" sx={{ color: '#00796b' }}>
// //             <ArrowBackIcon sx={{ mr: 1 }} /> Back
// //           </Button>
// //           <Typography variant="h4" gutterBottom sx={{ flexGrow: 1, textAlign: 'center', color: '#00796b', fontWeight: 'bold' }}>
// //             Generate Bill
// //           </Typography>
// //         </Box>

// //         <Card sx={{ mb: 3, boxShadow: 3, borderRadius: 2 }}>
// //           <CardContent>
// //             <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#00796b' }}>
// //               Appointment Details
// //             </Typography>
// //             <Divider sx={{ my: 1 }} />
// //             <Grid container spacing={1}>
// //               <Grid item xs={12} sm={6}>
// //                 <Typography>
// //                   <span style={{ fontWeight: 'bold' }}>Patient:</span> {appointmentDetails.patientFullName}
// //                 </Typography>
// //               </Grid>
// //               <Grid item xs={12} sm={6}>
// //                 <Typography>
// //                   <span style={{ fontWeight: 'bold' }}>Doctor:</span> {appointmentDetails.doctorFullName} ({appointmentDetails.doctorSpecialization})
// //                 </Typography>
// //               </Grid>
// //               <Grid item xs={12} sm={6}>
// //                 <Typography>
// //                   <span style={{ fontWeight: 'bold' }}>Date:</span> {appointmentDetails.formattedDate}
// //                 </Typography>
// //               </Grid>
// //               <Grid item xs={12} sm={6}>
// //                 <Typography>
// //                   <span style={{ fontWeight: 'bold' }}>Time:</span> {appointmentDetails.formattedTime}
// //                 </Typography>
// //               </Grid>
// //               <Grid item xs={12}>
// //                 <Typography>
// //                   <span style={{ fontWeight: 'bold' }}>Reason:</span> {appointmentDetails.reasonForVisit || 'N/A'}
// //                 </Typography>
// //               </Grid>
// //             </Grid>
// //           </CardContent>
// //         </Card>

// //         <Card sx={{ boxShadow: 3, borderRadius: 2, flexGrow: 1 }}>
// //           <CardContent>
// //             <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#00796b' }}>
// //               Bill Information
// //             </Typography>
// //             <Divider sx={{ my: 1 }} />
// //             <Grid container spacing={3}>
// //               {/* Bill Date - Current Date (Read-only) */}
// //               <Grid item xs={12} sm={6}>
// //                 <TextField
// //                   label="Bill Date"
// //                   fullWidth
// //                   value={billDate}
// //                   InputProps={{ readOnly: true }}
// //                   InputLabelProps={{ shrink: true }}
// //                   variant="outlined"
// //                 />
// //               </Grid>

// //               {/* Bill Type - Consultation (Read-only) */}
// //               <Grid item xs={12} sm={6}>
// //                 <TextField
// //                   label="Bill Type"
// //                   fullWidth
// //                   value={billType}
// //                   InputProps={{ readOnly: true }}
// //                   variant="outlined"
// //                 />
// //               </Grid>

// //               {/* Payment Method - Combo Box */}
// //               <Grid item xs={12} sm={6}>
// //                 <FormControl fullWidth variant="outlined">
// //                   <InputLabel id="payment-method-label">Payment Method</InputLabel>
// //                   <Select
// //                     labelId="payment-method-label"
// //                     value={paymentMethod}
// //                     label="Payment Method"
// //                     onChange={(e) => setPaymentMethod(e.target.value)}
// //                   >
// //                     <MenuItem value="Credit Card">Credit Card</MenuItem>
// //                     <MenuItem value="Debit Card">Debit Card</MenuItem>
// //                     <MenuItem value="Cash">Cash</MenuItem>
// //                     <MenuItem value="Online Transfer">Online Transfer</MenuItem>
// //                   </Select>
// //                 </FormControl>
// //               </Grid>

// //               {/* Consultation Fee */}
// //               <Grid item xs={12} sm={6}>
// //                 <TextField
// //                   label="Consultation Fee"
// //                   fullWidth
// //                   type="number"
// //                   value={consultationFee}
// //                   onChange={(e) => setConsultationFee(e.target.value)}
// //                   variant="outlined"
// //                 />
// //               </Grid>

// //               {/* Additional Charges */}
// //               <Grid item xs={12} sm={6}>
// //                 <TextField
// //                   label="Additional Charges"
// //                   fullWidth
// //                   type="number"
// //                   value={additionalCharges}
// //                   onChange={(e) => setAdditionalCharges(e.target.value)}
// //                   variant="outlined"
// //                 />
// //               </Grid>

// //               {/* Total Amount (Read-only) */}
// //               <Grid item xs={12} sm={6}>
// //                 <TextField
// //                   label="Total Amount"
// //                   fullWidth
// //                   type="number"
// //                   value={totalAmount}
// //                   InputProps={{ readOnly: true }}
// //                   variant="outlined"
// //                 />
// //               </Grid>

// //               {/* Amount Paid */}
// //               <Grid item xs={12} sm={6}>
// //                 <TextField
// //                   label="Amount Paid"
// //                   fullWidth
// //                   type="number"
// //                   value={amountPaid}
// //                   onChange={(e) => setAmountPaid(e.target.value)}
// //                   variant="outlined"
// //                 />
// //               </Grid>

// //               {/* Balance Due (Read-only) */}
// //               <Grid item xs={12} sm={6}>
// //                 <TextField
// //                   label="Balance Due"
// //                   fullWidth
// //                   type="number"
// //                   value={parseFloat(totalAmount - amountPaid).toFixed(2)}
// //                   InputProps={{ readOnly: true }}
// //                   variant="outlined"
// //                 />
// //               </Grid>
// //             </Grid>

// //             {/* Generate PDF button and Upload section */}
// //             <Box sx={{ mt: 3, mb: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
// //               <StyledButton
// //                 variant="contained"
// //                 onClick={handleGeneratePDFPreview}
// //                 disabled={!appointmentDetails}
// //               >
// //                 Generate PDF
// //               </StyledButton>
// //             </Box>

// //             <Box sx={{ mt: 2 }}>
// //               <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
// //                 Upload Document
// //               </Typography>
// //               <TextField
// //                 label="Choose File"
// //                 fullWidth
// //                 variant="outlined"
// //                 InputProps={{
// //                   readOnly: true,
// //                   endAdornment: (
// //                     <Button
// //                       variant="contained"
// //                       component="label"
// //                       sx={{ bgcolor: '#00796b', '&:hover': { bgcolor: '#004d40' } }}
// //                     >
// //                       Browse
// //                       <input
// //                         type="file"
// //                         hidden
// //                         id="bill-document-upload"
// //                         onChange={handleUploadBill}
// //                         accept="application/pdf"
// //                       />
// //                     </Button>
// //                   ),
// //                 }}
// //                 value={billDocumentUrl ? billDocumentUrl.split('/').pop() : ''}
// //               />
// //               <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
// //                 {uploading ? 'Uploading...' : (billDocumentUrl ? `Uploaded: ${billDocumentUrl.split('/').pop()}` : 'Please upload the generated PDF')}
// //               </Typography>
// //             </Box>

// //             <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
// //               <StyledButton
// //                 variant="contained"
// //                 onClick={handleCreateBill}
// //                 disabled={formLoading || !!selectedBillId || !billDocumentUrl}
// //               >
// //                 {formLoading ? 'Creating Bill...' : 'Create Bill'}
// //               </StyledButton>
// //             </Box>
// //           </CardContent>
// //         </Card>

// //         {/* Success Modal */}
// //         <Modal
// //           open={showSuccessModal}
// //           onClose={handleCloseModal}
// //           aria-labelledby="success-modal-label"
// //           aria-describedby="success-modal-description"
// //         >
// //           <Box
// //             sx={{
// //               position: 'absolute',
// //               top: '50%',
// //               left: '50%',
// //               transform: 'translate(-50%, -50%)',
// //               width: 400,
// //               bgcolor: 'background.paper',
// //               boxShadow: 24,
// //               borderRadius: 2,
// //               p: 4,
// //               outline: 'none',
// //               textAlign: 'center',
// //             }}
// //           >
// //             <Typography id="success-modal-label" variant="h6" component="h2" gutterBottom>
// //               ✅ Success!
// //             </Typography>
// //             <Typography id="success-modal-description" sx={{ mb: 3 }}>
// //               Bill for appointment created successfully with ID: <strong style={{ color: '#00796b' }}>{selectedBillId}</strong>.
// //             </Typography>
// //             <Box>
// //               <StyledButton variant="contained" onClick={handleCloseModal}>
// //                 OK
// //               </StyledButton>
// //             </Box>
// //           </Box>
// //         </Modal>

// //         {/* PDF Preview Modal */}
// //         <Modal
// //           open={showPreviewModal}
// //           onClose={handleClosePreviewModal}
// //           aria-labelledby="pdf-preview-modal-title"
// //           aria-describedby="pdf-preview-modal-description"
// //         >
// //           <Box
// //             sx={{
// //               position: 'absolute',
// //               top: '50%',
// //               left: '50%',
// //               transform: 'translate(-50%, -50%)',
// //               width: { xs: '90%', sm: '70%', md: '60%' },
// //               height: '90vh',
// //               bgcolor: 'background.paper',
// //               boxShadow: 24,
// //               p: 4,
// //               outline: 'none',
// //               display: 'flex',
// //               flexDirection: 'column',
// //               borderRadius: 2,
// //             }}
// //           >
// //             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// //               <Typography id="pdf-preview-modal-title" variant="h6" sx={{ fontWeight: 'bold' }}>
// //                 PDF Preview 📄
// //               </Typography>
// //               <IconButton onClick={handleClosePreviewModal} aria-label="close">
// //                 <CloseIcon />
// //               </IconButton>
// //             </Box>
// //             <Divider />
// //             <Box id="pdf-preview-content" sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }} dangerouslySetInnerHTML={{ __html: pdfContent }} />
// //             <Divider />
// //             <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
// //               <StyledButton variant="contained" onClick={handleDownloadPDF} disabled={!pdfBlob}>
// //                 Download PDF
// //               </StyledButton>
// //             </Box>
// //           </Box>
// //         </Modal>
// //       </Box>
// //     );
// //   };

// //   return selectedAppointmentId === null ? renderAppointmentList() : renderBillingForm();
// // }

// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Paper,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   CircularProgress,
//   Alert,
//   Button,
//   Grid,
//   TextField,
//   Card,
//   CardContent,
//   Modal,
//   IconButton,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   styled,
//   useTheme, // Import useTheme for responsive styling
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// // PDF Libraries
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// // Styled Components for custom styles
// const StyledPaper = styled(Paper)(({ theme }) => ({
//   backgroundColor: '#ffffff',
//   boxShadow: theme.shadows[3],
//   borderRadius: theme.shape.borderRadius,
//   transition: 'transform 0.2s, box-shadow 0.2s',
//   '&:hover': {
//     transform: 'translateY(-2px)',
//     boxShadow: theme.shadows[6],
//   },
// }));

// const StyledButton = styled(Button)(({ theme }) => ({
//   backgroundColor: '#00796b', // Dark Teal
//   color: '#ffffff',
//   borderRadius: theme.shape.borderRadius, // Apply theme's border radius
//   padding: '10px 20px',
//   fontWeight: 'bold',
//   textTransform: 'none', // Prevent uppercase transformation
//   '&:hover': {
//     backgroundColor: '#004d40', // Even darker teal on hover
//     boxShadow: theme.shadows[4],
//   },
//   '&:disabled': {
//     backgroundColor: '#b2dfdb', // Lighter teal for disabled state
//     color: '#ffffff',
//   },
// }));

// // Utility function to fetch data with error handling and simulated delay
// async function fetchData(url, options = {}) {
//   // Simulate network delay for better UX demonstration
//   await new Promise((r) => setTimeout(r, 500)); // 500ms delay

//   const res = await fetch(url, options);
//   if (!res.ok) {
//     const msg = await res.text();
//     throw new Error(msg || `Fetch error: ${res.status} ${res.statusText}`);
//   }
//   return res.json();
// }

// export default function BillingDesk() {
//   const theme = useTheme(); // Access the theme for responsive values

//   const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
//   const [selectedBillId, setSelectedBillId] = useState(null);

//   // Appointment List States
//   const [appointments, setAppointments] = useState([]);
//   const [listLoading, setListLoading] = useState(false);
//   const [listError, setListError] = useState(null);

//   // Billing Form States
//   const [appointmentDetails, setAppointmentDetails] = useState(null);
//   const [formLoading, setFormLoading] = useState(false);
//   const [formError, setFormError] = useState(null);
//   const [billDetails, setBillDetails] = useState(null); // This state is declared but not used in the provided code.

//   // Bill Document fields based on Bill.java
//   const [billDate] = useState(new Date().toISOString().split('T')[0]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [amountPaid, setAmountPaid] = useState(0);
//   const [balanceDue, setBalanceDue] = useState(0);
//   const [paymentMethod, setPaymentMethod] = useState('Credit Card'); // Combo box value
//   const [status, setStatus] = useState('Pending'); // Default status
//   const [billType] = useState('Consultation'); // Fixed value
//   const [billDocumentUrl, setBillDocumentUrl] = useState('');
//   const [consultationFee, setConsultationFee] = useState('0.00');
//   const [additionalCharges, setAdditionalCharges] = useState('0.00');
//   const [notes, setNotes] = useState('');

//   // Modals and PDF states
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [showPreviewModal, setShowPreviewModal] = useState(false);
//   const [pdfContent, setPdfContent] = useState('');
//   const [pdfBlob, setPdfBlob] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   // Auto-calculation useEffect for totalAmount, amountPaid, balanceDue
//   useEffect(() => {
//     const baseFee = parseFloat(consultationFee || 0);
//     const charges = parseFloat(additionalCharges || 0);
//     const calculatedTotal = (baseFee + charges).toFixed(2); // Calculate total before GST for display
//     const calculatedAmountPaid = parseFloat(amountPaid || 0);

//     setTotalAmount(calculatedTotal);
//     // Automatically set amount paid to total if it's less than total, or keep it if manually set higher
//     if (calculatedAmountPaid < parseFloat(calculatedTotal)) {
//       setAmountPaid(calculatedTotal);
//     }
//     setBalanceDue((parseFloat(calculatedTotal) - calculatedAmountPaid).toFixed(2));
//   }, [consultationFee, additionalCharges, amountPaid]); // Recalculate if these change

//   // Load appointments from API
//   useEffect(() => {
//     // Only load appointments if no appointment is selected (i.e., we are on the list view)
//     if (selectedAppointmentId === null) {
//       async function loadAppointments() {
//         try {
//           setListLoading(true);
//           setListError(null);
//           const appts = await fetchData('http://localhost:2010/api/appointments');

//           // Enrich appointment data with patient and doctor details
//           const enriched = await Promise.all(
//             appts.map(async (appt) => {
//               let patientFullName = 'Unknown Patient';
//               let doctorFullName = 'Unknown Doctor';
//               let doctorConsultationFee = 'N/A';
//               let doctorSpecialization = '';

//               // Fetch patient details
//               try {
//                 const patient = await fetchData(`http://localhost:2008/api/patients/${appt.patientId}`);
//                 patientFullName = `${patient.first_name} ${patient.last_name}`;
//               } catch (e) {
//                 console.error(`Error fetching patient ${appt.patientId}:`, e);
//                 // Optionally set a more specific error for the list item if needed
//               }

//               // Fetch doctor details
//               try {
//                 const doctor = await fetchData(`http://localhost:2005/api/doctors/${appt.doctorId}`);
//                 doctorFullName = `Dr. ${doctor.firstName} ${doctor.lastName}`;
//                 doctorConsultationFee = doctor.consultationFee?.toString() ?? '250.00'; // Default fee if not found
//                 doctorSpecialization = doctor.specialization ?? 'General Physician';
//               } catch (e) {
//                 console.error(`Error fetching doctor ${appt.doctorId}:`, e);
//                 // Optionally set a more specific error for the list item if needed
//               }

//               return {
//                 ...appt,
//                 patientFullName,
//                 doctorFullName,
//                 doctorConsultationFee,
//                 doctorSpecialization,
//                 formattedDate: new Date(appt.appointmentDate).toLocaleDateString(),
//                 formattedTime: new Date(appt.appointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//               };
//             })
//           );
//           setAppointments(enriched);
//         } catch (e) {
//           setListError('Failed to load appointments. Please check the server status.');
//           console.error('Error loading appointments:', e);
//         } finally {
//           setListLoading(false);
//         }
//       }
//       loadAppointments();
//     }
//   }, [selectedAppointmentId]); // Re-run when selectedAppointmentId changes to null (back to list)

//   // Load appointment details when an appointment is selected
//   useEffect(() => {
//     if (selectedAppointmentId !== null) {
//       async function loadAppointmentDetails() {
//         try {
//           setFormLoading(true);
//           setFormError(null);
//           const appt = await fetchData(`http://localhost:2010/api/appointments/${selectedAppointmentId}`);

//           let patientFullName = 'Unknown Patient';
//           let doctorFullName = 'Unknown Doctor';
//           let doctorConsultationFee = '250.00'; // Default value
//           let doctorSpecialization = '';

//           // Fetch patient details
//           try {
//             const patient = await fetchData(`http://localhost:2008/api/patients/${appt.patientId}`);
//             patientFullName = `${patient.first_name} ${patient.last_name}`;
//           } catch (e) {
//             console.error('Error fetching patient for details:', e);
//           }

//           // Fetch doctor details
//           try {
//             const doctor = await fetchData(`http://localhost:2005/api/doctors/${appt.doctorId}`);
//             doctorFullName = `Dr. ${doctor.firstName} ${doctor.lastName}`;
//             doctorConsultationFee = doctor.consultationFee?.toString() ?? '250.00';
//             doctorSpecialization = doctor.specialization ?? 'General Physician';
//           } catch (e) {
//             console.error('Error fetching doctor for details:', e);
//           }

//           setAppointmentDetails({
//             ...appt,
//             patientFullName,
//             doctorFullName,
//             doctorConsultationFee,
//             doctorSpecialization,
//             formattedDate: new Date(appt.appointmentDate).toLocaleDateString(),
//             formattedTime: new Date(appt.appointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//           });

//           // Initialize form fields with fetched data
//           setConsultationFee(doctorConsultationFee);
//           setAdditionalCharges('0.00'); // Always start with 0 additional charges
//           setNotes('');
//           setPaymentMethod('Credit Card');
//           setStatus('Pending'); // Bill status
//           setBillDocumentUrl(''); // Reset the URL when a new appointment is selected
//           setAmountPaid(doctorConsultationFee); // Set amount paid to consultation fee initially
//         } catch (e) {
//           setFormError('Failed to load appointment details. Please try again.');
//           console.error('Error loading appointment details:', e);
//         } finally {
//           setFormLoading(false);
//         }
//       }
//       loadAppointmentDetails();
//     } else {
//       setAppointmentDetails(null); // Clear details when no appointment is selected
//     }
//   }, [selectedAppointmentId]); // Re-run when selectedAppointmentId changes

//   // Handlers
//   const handleGenerateBillClick = (appointment) => {
//     setSelectedAppointmentId(appointment.id);
//     setSelectedBillId(null); // Ensure no old bill ID is present
//     setBillDocumentUrl(''); // Ensure the document URL is reset
//     setFormError(null); // Clear any previous form errors
//   };

//   const handleBackToList = () => {
//     setSelectedAppointmentId(null);
//     setFormError(null);
//     setSelectedBillId(null);
//     setBillDocumentUrl(''); // Clear document URL when going back
//   };

//   const handleCreateBill = async () => {
//     if (!appointmentDetails) {
//       alert('No appointment selected to create a bill.');
//       return;
//     }

//     // Check if a bill document has been uploaded
//     if (!billDocumentUrl) {
//       alert('Please upload a bill document first before creating the bill.');
//       return;
//     }

//     setFormLoading(true);
//     setFormError(null);

//     // Calculate final total including GST for the bill object
//     const baseFee = parseFloat(consultationFee || 0) + parseFloat(additionalCharges || 0);
//     const gstRate = 0.18; // 18% GST
//     const gstAmount = baseFee * gstRate;
//     const finalTotalAmount = (baseFee + gstAmount).toFixed(2);

//     const newBill = {
//       patientId: appointmentDetails.patientId,
//       appointmentId: selectedAppointmentId,
//       billDate: billDate,
//       totalAmount: parseFloat(finalTotalAmount), // Use the final calculated total
//       amountPaid: parseFloat(amountPaid),
//       balanceDue: parseFloat(balanceDue),
//       paymentMethod: paymentMethod,
//       status: status,
//       billType: billType,
//       transactionId: `TRANS-${Math.floor(Math.random() * 1000000)}`, // Auto-generated simple transaction ID
//       issuedByUserId: 'mockUser123', // Static for this example, replace with actual user ID
//       bills: [ // Detailed bill items
//         { description: 'Consultation Fee', amount: parseFloat(consultationFee).toFixed(2) },
//         { description: 'Additional Charges', amount: parseFloat(additionalCharges).toFixed(2) },
//         { description: 'GST (18%)', amount: gstAmount.toFixed(2) }
//       ],
//       billDocumentUrl: billDocumentUrl,
//       notes: notes, // Include notes in the bill object
//     };

//     try {
//       const createdBill = await fetchData('http://localhost:2009/api/bills', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newBill),
//       });

//       setSelectedBillId(createdBill.id);
//       setShowSuccessModal(true);
//       console.log('Bill created successfully:', createdBill);
//     } catch (e) {
//       setFormError(`Failed to create bill: ${e.message}`);
//       console.error('Error creating bill:', e);
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   const createPDFContent = () => {
//     if (!appointmentDetails) return '';

//     const baseFee = parseFloat(consultationFee || 0) + parseFloat(additionalCharges || 0);
//     const gst = baseFee * 0.18;
//     const calculatedTotalAmount = baseFee + gst;

//     return `
//       <div id="bill-template" style="font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.6; padding: 30px; color: #333; border: 1px solid #e0e0e0; max-width: 800px; margin: auto; box-shadow: 0 8px 24px rgba(0,0,0,0.1); border-radius: 12px; background-color: #ffffff;">
//         <div style="text-align: center; border-bottom: 4px solid #00796b; padding-bottom: 20px; margin-bottom: 30px;">
//           <h1 style="color: #00796b; margin: 0; font-size: 32px; font-weight: 700;">Sarvotham Spine Care Hospital</h1>
//           <p style="margin: 10px 0 0; font-size: 15px; color: #555;">123 Health St, Wellness City, 560001</p>
//           <p style="margin: 5px 0 0; font-size: 15px; color: #555;">Phone: (080) 1234 5678 | Email: contact@sarvothamhospital.com</p>
//         </div>
//         <h2 style="text-align: center; color: #444; margin-bottom: 30px; font-size: 24px; font-weight: 600; text-transform: uppercase;">Invoice / Medical Bill</h2>
//         <div style="display: flex; justify-content: space-between; margin-bottom: 25px; background-color: #e0f2f1; padding: 20px; border-radius: 8px; border: 1px solid #b2dfdb;">
//           <div>
//             <strong>Bill Date:</strong> <span style="font-weight: normal;">${billDate || 'N/A'}</span><br/>
//             <strong>Bill Type:</strong> <span style="font-weight: normal;">Consultation</span>
//           </div>
//           <div style="text-align: right;">
//             <strong>Patient:</strong> <span style="font-weight: normal;">${appointmentDetails.patientFullName}</span><br/>
//             <strong>Doctor:</strong> <span style="font-weight: normal;">${appointmentDetails.doctorFullName}</span>
//           </div>
//         </div>
//         <table style="width: 100%; border-collapse: collapse; margin-top: 25px; border: 1px solid #cfd8dc; border-radius: 8px; overflow: hidden;">
//           <thead>
//             <tr style="background-color: #00796b; color: #ffffff;">
//               <th style="padding: 15px; border: 1px solid #00796b; text-align: left; font-weight: 600;">Description</th>
//               <th style="padding: 15px; border: 1px solid #00796b; text-align: right; font-weight: 600;">Amount (₹)</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr style="background-color: #fdfdfd;">
//               <td style="padding: 15px; border: 1px solid #e0e0e0;">Consultation Fee</td>
//               <td style="padding: 15px; border: 1px solid #e0e0e0; text-align: right;">${parseFloat(consultationFee).toFixed(2)}</td>
//             </tr>
//             <tr style="background-color: #fdfdfd;">
//               <td style="padding: 15px; border: 1px solid #e0e0e0;">Additional Charges</td>
//               <td style="padding: 15px; border: 1px solid #e0e0e0; text-align: right;">${parseFloat(additionalCharges).toFixed(2)}</td>
//             </tr>
//             <tr style="background-color: #fdfdfd;">
//               <td style="padding: 15px; border: 1px solid #e0e0e0;">GST (18%)</td>
//               <td style="padding: 15px; border: 1px solid #e0e0e0; text-align: right;">${gst.toFixed(2)}</td>
//             </tr>
//             <tr style="background-color: #e0f2f1; font-weight: bold;">
//               <td style="padding: 15px; border: 1px solid #b2dfdb; text-align: right; font-size: 16px;">Total Amount</td>
//               <td style="padding: 15px; border: 1px solid #b2dfdb; text-align: right; font-size: 16px; color: #00796b;">₹${calculatedTotalAmount.toFixed(2)}</td>
//             </tr>
//           </tbody>
//         </table>
//         <div style="margin-top: 30px; text-align: right;">
//           <p style="font-size: 16px; font-weight: bold; margin: 5px 0; color: #00796b;">Amount Paid: ₹${parseFloat(amountPaid).toFixed(2)}</p>
//           <p style="font-size: 16px; font-weight: bold; margin: 5px 0; color: ${parseFloat(balanceDue) > 0 ? '#d32f2f' : '#065f46'};">Balance Due: ₹${parseFloat(balanceDue).toFixed(2)}</p>
//           <p style="margin: 10px 0;">Payment Method: <span style="font-weight: normal;">${paymentMethod}</span></p>
//         </div>
//         <div style="margin-top: 40px; border-top: 1px dashed #cccccc; padding-top: 25px;">
//           <p style="font-size: 15px;"><strong>Notes:</strong> <span style="font-weight: normal;">${notes || 'N/A'}</span></p>
//         </div>
//         <div style="margin-top: 50px; text-align: center; color: #888; font-style: italic; font-size: 14px;">
//           Thank you for choosing Sarvotham Spine Care Hospital. We wish you a speedy recovery.
//         </div>
//       </div>
//     `;
//   };

//   const handleGeneratePDFPreview = async () => {
//     if (!appointmentDetails) {
//       alert('No appointment details available to generate a PDF preview.');
//       return;
//     }

//     setPdfContent('');
//     setPdfBlob(null);
//     setFormLoading(true); // Indicate loading while PDF is being generated

//     const contentHtml = createPDFContent();
//     setPdfContent(contentHtml);

//     // Create a temporary div to render HTML for canvas conversion
//     const billContent = document.createElement('div');
//     billContent.style.width = '210mm'; // A4 width
//     billContent.style.backgroundColor = '#fff';
//     billContent.style.position = 'absolute'; // Position off-screen
//     billContent.style.left = '-9999px';
//     billContent.innerHTML = contentHtml;
//     document.body.appendChild(billContent);

//     try {
//       const canvas = await html2canvas(billContent, { scale: 2, logging: false }); // scale for better resolution
//       const imgData = canvas.toDataURL('image/jpeg', 1.0); // Use JPEG for smaller file size, quality 1.0
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//       // Add image to PDF, ensuring it fits within A4 page
//       pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
//       const pdfOutput = pdf.output('blob');
//       setPdfBlob(pdfOutput);

//       setShowPreviewModal(true);
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//       alert('Failed to generate PDF. Please try again. Check console for details.');
//     } finally {
//       document.body.removeChild(billContent); // Clean up temporary div
//       setFormLoading(false); // End loading
//     }
//   };

//   const handleDownloadPDF = () => {
//     if (!pdfBlob) {
//       alert('PDF not available for download.');
//       return;
//     }

//     const url = URL.createObjectURL(pdfBlob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `bill_appointment_${selectedAppointmentId}.pdf`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url); // Clean up the object URL
//   };

//   const handleUploadBill = async (event) => {
//     const file = event.target.files[0];
//     if (!file) {
//       return;
//     }

//     // Client-side validation for file type and size
//     const MAX_FILE_SIZE_MB = 5; // Reduced max size for practical web uploads
//     const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

//     if (file.size > MAX_FILE_SIZE_BYTES) {
//       alert(`File is too large. Please upload a file smaller than ${MAX_FILE_SIZE_MB} MB.`);
//       event.target.value = null; // Reset the input field
//       return;
//     }

//     if (file.type !== 'application/pdf') {
//       alert('Invalid file type. Only PDF files are allowed.');
//       event.target.value = null; // Reset the input field
//       return;
//     }

//     setUploading(true);
//     setFormError(null); // Clear previous errors

//     const formData = new FormData();
//     formData.append('billDocument', file);

//     try {
//       const response = await fetch(`http://localhost:2009/api/bills/upload-document`, {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(errorText || 'Failed to upload file');
//       }

//       const uploadResult = await response.json();
//       console.log('File uploaded successfully:', uploadResult);

//       setBillDocumentUrl(uploadResult.fileUrl);

//       // Provide clear instruction to the user
//       alert(`Uploaded file: ${file.name}. Please click 'Create Bill' to finalize the billing process.`);
//     } catch (e) {
//       console.error('Error uploading file:', e);
//       setFormError(`Failed to upload file: ${e.message}`);
//     } finally {
//       setUploading(false);
//       event.target.value = null; // Clear the file input for next upload
//     }
//   };

//   const handleCloseModal = () => {
//     setShowSuccessModal(false);
//     handleBackToList(); // Go back to the appointment list after successful bill creation
//   };

//   const handleClosePreviewModal = () => {
//     setShowPreviewModal(false);
//     setPdfContent('');
//     setPdfBlob(null);
//   };

//   // Component to render the list of appointments
//   const renderAppointmentList = () => (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'flex-start',
//         minHeight: '100vh',
//         p: { xs: 2, sm: 4 }, // Responsive padding
//         bgcolor: '#f8f9fa', // Lighter gray background
//       }}
//     >
//       <Typography
//         variant="h4"
//         component="h1"
//         gutterBottom
//         sx={{
//           color: '#00796b',
//           fontWeight: 'bold',
//           textAlign: 'center',
//           mb: 4,
//           fontSize: { xs: '1.8rem', sm: '2.5rem' }, // Responsive font size
//         }}
//       >
//         Consultation Billing Desk 🧑‍⚕️
//       </Typography>
//       <Typography variant="body1" color="text.secondary" align="center" sx={{ maxWidth: 600, mb: 4 }}>
//         Select an appointment from the list below to generate a new bill.
//       </Typography>

//       {listLoading && (
//         <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
//           <CircularProgress sx={{ color: '#00796b' }} />
//         </Box>
//       )}

//       {listError && (
//         <Alert severity="error" sx={{ width: '100%', maxWidth: 700, mt: 2, borderRadius: 2 }}>
//           {listError}
//         </Alert>
//       )}

//       {!listLoading && !listError && appointments.length === 0 && (
//         <Alert severity="info" sx={{ width: '100%', maxWidth: 700, mt: 2, borderRadius: 2 }}>
//           No appointments found.
//         </Alert>
//       )}

//       {!listLoading && !listError && appointments.length > 0 && (
//         <Box sx={{ width: '100%', maxWidth: 700 }}>
//           <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#333', mb: 2, fontWeight: '600' }}>
//             Recent Appointments
//           </Typography>
//           <List>
//             {appointments.map((appointment) => (
//               <StyledPaper key={appointment.id} sx={{ mb: 2 }}>
//                 <ListItem
//                   disableGutters
//                   secondaryAction={
//                     <StyledButton
//                       variant="contained"
//                       onClick={() => handleGenerateBillClick(appointment)}
//                       sx={{ ml: { xs: 1, sm: 2 }, flexShrink: 0 }} // Responsive margin
//                     >
//                       Generate Bill
//                     </StyledButton>
//                   }
//                 >
//                   <ListItemText
//                     sx={{ p: { xs: 1.5, sm: 2 } }} // Responsive padding
//                     primary={
//                       <Typography
//                         variant="h6"
//                         sx={{ fontWeight: 'bold', color: '#333', fontSize: { xs: '1rem', sm: '1.25rem' } }}
//                       >
//                         {appointment.patientFullName}
//                       </Typography>
//                     }
//                     secondary={
//                       <>
//                         <Typography component="span" color="text.primary" sx={{ display: 'block' }}>
//                           <span style={{ fontWeight: 'bold' }}>Doctor:</span> {appointment.doctorFullName} ({appointment.doctorSpecialization})
//                         </Typography>
//                         <Typography component="span" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
//                           <span style={{ fontWeight: 'bold' }}>Date:</span> {appointment.formattedDate} | <span style={{ fontWeight: 'bold' }}>Time:</span> {appointment.formattedTime}
//                         </Typography>
//                         <Typography component="span" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
//                           <span style={{ fontWeight: 'bold' }}>Reason:</span> {appointment.reasonForVisit || 'N/A'}
//                         </Typography>
//                       </>
//                     }
//                   />
//                 </ListItem>
//               </StyledPaper>
//             ))}
//           </List>
//         </Box>
//       )}
//     </Box>
//   );

//   // Component to render the billing form
//   const renderBillingForm = () => {
//     if (formLoading) {
//       return (
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4, bgcolor: '#f8f9fa', minHeight: '100vh' }}>
//           <CircularProgress sx={{ color: '#00796b' }} />
//           <Typography variant="h6" sx={{ ml: 2, color: '#00796b' }}>Loading details...</Typography>
//         </Box>
//       );
//     }

//     if (formError) {
//       return (
//         <Box sx={{ p: 4, bgcolor: '#f8f9fa', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
//           <Alert severity="error" sx={{ width: '100%', maxWidth: 600, mb: 3, borderRadius: 2 }}>
//             {formError}
//           </Alert>
//           <StyledButton variant="outlined" onClick={handleBackToList} sx={{ mt: 2 }}>
//             <ArrowBackIcon sx={{ mr: 1 }} /> Back to Appointments
//           </StyledButton>
//         </Box>
//       );
//     }

//     if (!appointmentDetails) {
//       return (
//         <Box sx={{ p: 4, bgcolor: '#f8f9fa', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
//           <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>No appointment data found for billing.</Typography>
//           <StyledButton variant="outlined" onClick={handleBackToList} sx={{ mt: 2 }}>
//             <ArrowBackIcon sx={{ mr: 1 }} /> Back to Appointments
//           </StyledButton>
//         </Box>
//       );
//     }

//     return (
//       <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: 800, mx: 'auto', bgcolor: '#f8f9fa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//           <Button onClick={handleBackToList} variant="text" sx={{ color: '#00796b', textTransform: 'none', fontWeight: 'bold' }}>
//             <ArrowBackIcon sx={{ mr: 1 }} /> Back
//           </Button>
//           <Typography variant="h4" gutterBottom sx={{ flexGrow: 1, textAlign: 'center', color: '#00796b', fontWeight: 'bold', fontSize: { xs: '1.5rem', sm: '2rem' } }}>
//             Generate Bill
//           </Typography>
//         </Box>

//         <Card sx={{ mb: 3, boxShadow: 4, borderRadius: 3, border: '1px solid #e0e0e0' }}>
//           <CardContent>
//             <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#00796b', borderBottom: '2px solid #b2dfdb', pb: 1, mb: 2 }}>
//               Appointment Details
//             </Typography>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <Typography variant="body1">
//                   <span style={{ fontWeight: 'bold' }}>Patient:</span> {appointmentDetails.patientFullName}
//                 </Typography>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography variant="body1">
//                   <span style={{ fontWeight: 'bold' }}>Doctor:</span> {appointmentDetails.doctorFullName} ({appointmentDetails.doctorSpecialization})
//                 </Typography>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography variant="body1">
//                   <span style={{ fontWeight: 'bold' }}>Date:</span> {appointmentDetails.formattedDate}
//                 </Typography>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography variant="body1">
//                   <span style={{ fontWeight: 'bold' }}>Time:</span> {appointmentDetails.formattedTime}
//                 </Typography>
//               </Grid>
//               <Grid item xs={12}>
//                 <Typography variant="body1">
//                   <span style={{ fontWeight: 'bold' }}>Reason:</span> {appointmentDetails.reasonForVisit || 'N/A'}
//                 </Typography>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>

//         <Card sx={{ boxShadow: 4, borderRadius: 3, flexGrow: 1, border: '1px solid #e0e0e0' }}>
//           <CardContent>
//             <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#00796b', borderBottom: '2px solid #b2dfdb', pb: 1, mb: 2 }}>
//               Bill Information
//             </Typography>
//             <Grid container spacing={3}>
//               {/* Bill Date - Current Date (Read-only) */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Bill Date"
//                   fullWidth
//                   value={billDate}
//                   InputProps={{ readOnly: true }}
//                   InputLabelProps={{ shrink: true }}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>

//               {/* Bill Type - Consultation (Read-only) */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Bill Type"
//                   fullWidth
//                   value={billType}
//                   InputProps={{ readOnly: true }}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>

//               {/* Payment Method - Combo Box */}
//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth variant="outlined" size="small">
//                   <InputLabel id="payment-method-label">Payment Method</InputLabel>
//                   <Select
//                     labelId="payment-method-label"
//                     value={paymentMethod}
//                     label="Payment Method"
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                   >
//                     <MenuItem value="Credit Card">Credit Card</MenuItem>
//                     <MenuItem value="Debit Card">Debit Card</MenuItem>
//                     <MenuItem value="Cash">Cash</MenuItem>
//                     <MenuItem value="Online Transfer">Online Transfer</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>

//               {/* Consultation Fee */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Consultation Fee (₹)"
//                   fullWidth
//                   type="number"
//                   value={consultationFee}
//                   onChange={(e) => setConsultationFee(e.target.value)}
//                   variant="outlined"
//                   size="small"
//                   inputProps={{ min: "0" }}
//                 />
//               </Grid>

//               {/* Additional Charges */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Additional Charges (₹)"
//                   fullWidth
//                   type="number"
//                   value={additionalCharges}
//                   onChange={(e) => setAdditionalCharges(e.target.value)}
//                   variant="outlined"
//                   size="small"
//                   inputProps={{ min: "0" }}
//                 />
//               </Grid>

//               {/* Total Amount (Read-only) */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Total Amount (₹)"
//                   fullWidth
//                   type="number"
//                   value={totalAmount}
//                   InputProps={{ readOnly: true }}
//                   variant="outlined"
//                   size="small"
//                   sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#e0f2f1' } }} // Light teal background for read-only
//                 />
//               </Grid>

//               {/* Amount Paid */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Amount Paid (₹)"
//                   fullWidth
//                   type="number"
//                   value={amountPaid}
//                   onChange={(e) => setAmountPaid(e.target.value)}
//                   variant="outlined"
//                   size="small"
//                   inputProps={{ min: "0" }}
//                 />
//               </Grid>

//               {/* Balance Due (Read-only) */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Balance Due (₹)"
//                   fullWidth
//                   type="number"
//                   value={balanceDue}
//                   InputProps={{ readOnly: true }}
//                   variant="outlined"
//                   size="small"
//                   sx={{
//                     '& .MuiOutlinedInput-root': {
//                       backgroundColor: parseFloat(balanceDue) > 0 ? '#ffebee' : '#e8f5e9', // Light red for due, light green for paid
//                     },
//                     '& .MuiInputBase-input': {
//                       color: parseFloat(balanceDue) > 0 ? '#d32f2f' : '#388e3c', // Darker red/green text
//                       fontWeight: 'bold',
//                     }
//                   }}
//                 />
//               </Grid>
//               {/* Notes */}
//               <Grid item xs={12}>
//                 <TextField
//                   label="Notes"
//                   fullWidth
//                   multiline
//                   rows={3}
//                   value={notes}
//                   onChange={(e) => setNotes(e.target.value)}
//                   variant="outlined"
//                   size="small"
//                   placeholder="Add any relevant notes for the bill..."
//                 />
//               </Grid>
//             </Grid>

//             {/* Generate PDF button and Upload section */}
//             <Box sx={{ mt: 3, mb: 2, display: 'flex', justifyContent: 'flex-end', gap: 2, flexWrap: 'wrap' }}>
//               <StyledButton
//                 variant="contained"
//                 onClick={handleGeneratePDFPreview}
//                 disabled={!appointmentDetails || formLoading}
//               >
//                 {formLoading ? 'Generating PDF...' : 'Generate PDF'}
//               </StyledButton>
//             </Box>

//             <Box sx={{ mt: 2 }}>
//               <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
//                 Upload Bill Document (PDF)
//               </Typography>
//               <TextField
//                 label="Choose File"
//                 fullWidth
//                 variant="outlined"
//                 size="small"
//                 InputProps={{
//                   readOnly: true,
//                   endAdornment: (
//                     <StyledButton
//                       variant="contained"
//                       component="label"
//                       sx={{ minWidth: 'auto', px: 2, py: 1 }} // Smaller button for browse
//                       disabled={uploading}
//                     >
//                       {uploading ? <CircularProgress size={20} color="inherit" /> : 'Browse'}
//                       <input
//                         type="file"
//                         hidden
//                         id="bill-document-upload"
//                         onChange={handleUploadBill}
//                         accept="application/pdf"
//                       />
//                     </StyledButton>
//                   ),
//                 }}
//                 value={billDocumentUrl ? billDocumentUrl.split('/').pop() : ''}
//               />
//               <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
//                 {uploading ? 'Uploading...' : (billDocumentUrl ? `Uploaded: ${billDocumentUrl.split('/').pop()}` : 'Please upload the generated PDF document (Max 5MB)')}
//               </Typography>
//             </Box>

//             <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
//               <StyledButton
//                 variant="contained"
//                 onClick={handleCreateBill}
//                 disabled={formLoading || !!selectedBillId || !billDocumentUrl || uploading} // Disable if no document uploaded or still uploading
//               >
//                 {formLoading ? 'Creating Bill...' : 'Create Bill'}
//               </StyledButton>
//             </Box>
//           </CardContent>
//         </Card>

//         {/* Success Modal */}
//         <Modal
//           open={showSuccessModal}
//           onClose={handleCloseModal}
//           aria-labelledby="success-modal-label"
//           aria-describedby="success-modal-description"
//         >
//           <Box
//             sx={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               width: { xs: '90%', sm: 400 }, // Responsive width
//               bgcolor: 'background.paper',
//               boxShadow: 24,
//               borderRadius: 3,
//               p: 4,
//               outline: 'none',
//               textAlign: 'center',
//               border: '1px solid #e0e0e0',
//             }}
//           >
//             <Typography id="success-modal-label" variant="h6" component="h2" gutterBottom sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
//               ✅ Success!
//             </Typography>
//             <Typography id="success-modal-description" sx={{ mb: 3, color: 'text.secondary' }}>
//               Bill for appointment created successfully with ID: <strong style={{ color: '#00796b' }}>{selectedBillId}</strong>.
//             </Typography>
//             <Box>
//               <StyledButton variant="contained" onClick={handleCloseModal}>
//                 OK
//               </StyledButton>
//             </Box>
//           </Box>
//         </Modal>

//         {/* PDF Preview Modal */}
//         <Modal
//           open={showPreviewModal}
//           onClose={handleClosePreviewModal}
//           aria-labelledby="pdf-preview-modal-title"
//           aria-describedby="pdf-preview-modal-description"
//         >
//           <Box
//             sx={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               width: { xs: '95%', sm: '80%', md: '70%', lg: '60%' }, // More responsive width
//               height: '90vh',
//               bgcolor: 'background.paper',
//               boxShadow: 24,
//               p: { xs: 2, sm: 4 },
//               outline: 'none',
//               display: 'flex',
//               flexDirection: 'column',
//               borderRadius: 3,
//               border: '1px solid #e0e0e0',
//             }}
//           >
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//               <Typography id="pdf-preview-modal-title" variant="h6" sx={{ fontWeight: 'bold', color: '#00796b' }}>
//                 PDF Preview 📄
//               </Typography>
//               <IconButton onClick={handleClosePreviewModal} aria-label="close">
//                 <CloseIcon />
//               </IconButton>
//             </Box>
//             <Divider sx={{ mb: 2 }} />
//             <Box id="pdf-preview-content" sx={{ flexGrow: 1, overflowY: 'auto', p: 1 }} dangerouslySetInnerHTML={{ __html: pdfContent }} />
//             <Divider sx={{ mt: 2 }} />
//             <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
//               <StyledButton variant="contained" onClick={handleDownloadPDF} disabled={!pdfBlob}>
//                 Download PDF
//               </StyledButton>
//             </Box>
//           </Box>
//         </Modal>
//       </Box>
//     );
//   };

//   return selectedAppointmentId === null ? renderAppointmentList() : renderBillingForm();
// }


import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Alert,
  Button,
  Grid,
  TextField,
  Card,
  CardContent,
  Modal,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  styled,
  useTheme, // Import useTheme for responsive styling
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// PDF Libraries
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Styled Components for custom styles
const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#ffffff',
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[6],
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#00796b', // Dark Teal
  color: '#ffffff',
  borderRadius: theme.shape.borderRadius, // Apply theme's border radius
  padding: '10px 20px',
  fontWeight: 'bold',
  textTransform: 'none', // Prevent uppercase transformation
  '&:hover': {
    backgroundColor: '#004d40', // Even darker teal on hover
    boxShadow: theme.shadows[4],
  },
  '&:disabled': {
    backgroundColor: '#b2dfdb', // Lighter teal for disabled state
    color: '#ffffff',
  },
}));

// Utility function to fetch data with error handling and simulated delay
async function fetchData(url, options = {}) {
  // Simulate network delay for better UX demonstration
  await new Promise((r) => setTimeout(r, 500)); // 500ms delay

  const res = await fetch(url, options);
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || `Fetch error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export default function BillingDesk() {
  const theme = useTheme(); // Access the theme for responsive values

  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [selectedBillId, setSelectedBillId] = useState(null);

  // Appointment List States
  const [appointments, setAppointments] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState(null);

  // Billing Form States
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [billDetails, setBillDetails] = useState(null); // This state is declared but not used in the provided code.

  // Bill Document fields based on Bill.java
  const [billDate] = useState(new Date().toISOString().split('T')[0]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const [balanceDue, setBalanceDue] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card'); // Combo box value
  const [status, setStatus] = useState('Pending'); // Default status
  const [billType] = useState('Consultation'); // Fixed value
  const [billDocumentUrl, setBillDocumentUrl] = useState('');
  const [consultationFee, setConsultationFee] = useState('0.00');
  const [additionalCharges, setAdditionalCharges] = useState('0.00');
  const [notes, setNotes] = useState('');

  // Modals and PDF states
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [pdfContent, setPdfContent] = useState('');
  const [pdfBlob, setPdfBlob] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Auto-calculation useEffect for totalAmount, amountPaid, balanceDue
  useEffect(() => {
    const baseFee = parseFloat(consultationFee || 0) + parseFloat(additionalCharges || 0);
    const gstRate = 0.18; // 18% GST
    const gstAmount = baseFee * gstRate;
    const calculatedTotal = (baseFee + gstAmount).toFixed(2);
    const calculatedAmountPaid = parseFloat(amountPaid || 0);

    setTotalAmount(calculatedTotal);
    setAmountPaid(calculatedTotal); // Automatically set amount paid to total
    setBalanceDue((parseFloat(calculatedTotal) - calculatedAmountPaid).toFixed(2));
  }, [consultationFee, additionalCharges, amountPaid]); // Recalculate if these change


  // Load appointments from API
  useEffect(() => {
    // Only load appointments if no appointment is selected (i.e., we are on the list view)
    if (selectedAppointmentId === null) {
      async function loadAppointments() {
        try {
          setListLoading(true);
          setListError(null);
          const appts = await fetchData('http://localhost:2010/api/appointments');

          // Enrich appointment data with patient and doctor details
          const enriched = await Promise.all(
            appts.map(async (appt) => {
              let patientFullName = 'Unknown Patient';
              let doctorFullName = 'Unknown Doctor';
              let doctorConsultationFee = 'N/A';
              let doctorSpecialization = '';

              // Fetch patient details
              try {
                const patient = await fetchData(`http://localhost:2008/api/patients/${appt.patientId}`);
                patientFullName = `${patient.first_name} ${patient.last_name}`;
              } catch (e) {
                console.error(`Error fetching patient ${appt.patientId}:`, e);
                // Optionally set a more specific error for the list item if needed
              }

              // Fetch doctor details
              try {
                const doctor = await fetchData(`http://localhost:2005/api/doctors/${appt.doctorId}`);
                doctorFullName = ` ${doctor.firstName} ${doctor.lastName}`;
                doctorConsultationFee = doctor.consultationFee?.toString() ?? '250.00'; // Default fee if not found
                doctorSpecialization = doctor.specialization ?? 'General Physician';
              } catch (e) {
                console.error(`Error fetching doctor ${appt.doctorId}:`, e);
                // Optionally set a more specific error for the list item if needed
              }

              return {
                ...appt,
                patientFullName,
                doctorFullName,
                doctorConsultationFee,
                doctorSpecialization,
                formattedDate: new Date(appt.appointmentDate).toLocaleDateString(),
                formattedTime: new Date(appt.appointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              };
            })
          );
          setAppointments(enriched);
        } catch (e) {
          setListError('Failed to load appointments. Please check the server status.');
          console.error('Error loading appointments:', e);
        } finally {
          setListLoading(false);
        }
      }
      loadAppointments();
    }
  }, [selectedAppointmentId]); // Re-run when selectedAppointmentId changes to null (back to list)

  // Load appointment details when an appointment is selected
  useEffect(() => {
    if (selectedAppointmentId !== null) {
      async function loadAppointmentDetails() {
        try {
          setFormLoading(true);
          setFormError(null);
          const appt = await fetchData(`http://localhost:2010/api/appointments/${selectedAppointmentId}`);

          let patientFullName = 'Unknown Patient';
          let doctorFullName = 'Unknown Doctor';
          let doctorConsultationFee = '250.00'; // Default value
          let doctorSpecialization = '';

          // Fetch patient details
          try {
            const patient = await fetchData(`http://localhost:2008/api/patients/${appt.patientId}`);
            patientFullName = `${patient.first_name} ${patient.last_name}`;
          } catch (e) {
            console.error('Error fetching patient for details:', e);
          }

          // Fetch doctor details
          try {
            const doctor = await fetchData(`http://localhost:2005/api/doctors/${appt.doctorId}`);
            doctorFullName = `${doctor.firstName} ${doctor.lastName}`;
            doctorConsultationFee = doctor.consultationFee?.toString() ?? '250.00';
            doctorSpecialization = doctor.specialization ?? 'General Physician';
          } catch (e) {
            console.error('Error fetching doctor for details:', e);
          }

          setAppointmentDetails({
            ...appt,
            patientFullName,
            doctorFullName,
            doctorConsultationFee,
            doctorSpecialization,
            formattedDate: new Date(appt.appointmentDate).toLocaleDateString(),
            formattedTime: new Date(appt.appointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          });

          // Initialize form fields with fetched data
          setConsultationFee(doctorConsultationFee);
          setAdditionalCharges('0.00'); // Always start with 0 additional charges
          setNotes('');
          setPaymentMethod('Credit Card');
          setStatus('Pending'); // Bill status
          setBillDocumentUrl(''); // Reset the URL when a new appointment is selected
          setAmountPaid(doctorConsultationFee); // Set amount paid to consultation fee initially
        } catch (e) {
          setFormError('Failed to load appointment details. Please try again.');
          console.error('Error loading appointment details:', e);
        } finally {
          setFormLoading(false);
        }
      }
      loadAppointmentDetails();
    } else {
      setAppointmentDetails(null); // Clear details when no appointment is selected
    }
  }, [selectedAppointmentId]); // Re-run when selectedAppointmentId changes

  // Handlers
  const handleGenerateBillClick = (appointment) => {
    setSelectedAppointmentId(appointment.id);
    setSelectedBillId(null); // Ensure no old bill ID is present
    setBillDocumentUrl(''); // Ensure the document URL is reset
    setFormError(null); // Clear any previous form errors
  };

  const handleBackToList = () => {
    setSelectedAppointmentId(null);
    setFormError(null);
    setSelectedBillId(null);
    setBillDocumentUrl(''); // Clear document URL when going back
  };

  const handleCreateBill = async () => {
    if (!appointmentDetails) {
      alert('No appointment selected to create a bill.');
      return;
    }

    // Check if a bill document has been uploaded
    if (!billDocumentUrl) {
      alert('Please upload a bill document first before creating the bill.');
      return;
    }

    setFormLoading(true);
    setFormError(null);

    // Calculate final total including GST for the bill object
    const baseFee = parseFloat(consultationFee || 0) + parseFloat(additionalCharges || 0);
    const gstRate = 0.18; // 18% GST
    const gstAmount = baseFee * gstRate;
    const finalTotalAmount = (baseFee + gstAmount).toFixed(2);

    const newBill = {
      patientId: appointmentDetails.patientId,
      appointmentId: selectedAppointmentId,
      billDate: billDate,
      totalAmount: parseFloat(finalTotalAmount), // Use the final calculated total
      amountPaid: parseFloat(amountPaid),
      balanceDue: parseFloat(balanceDue),
      paymentMethod: paymentMethod,
      status: status,
      billType: billType,
      transactionId: `TRANS-${Math.floor(Math.random() * 1000000)}`, // Auto-generated simple transaction ID
      issuedByUserId: '84525', // Static for this example, replace with actual user ID
      // The 'bills' field is removed as it's causing the JSON parse error.
      // The backend seems to expect a List<String>, not a List of objects.
      billDocumentUrl: billDocumentUrl,
      notes: notes, // Include notes in the bill object
    };

    try {
      const createdBill = await fetchData('http://localhost:2009/api/bills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBill),
      });

      setSelectedBillId(createdBill.id);
      setShowSuccessModal(true);
      console.log('Bill created successfully:', createdBill);
    } catch (e) {
      setFormError(`Failed to create bill: ${e.message}`);
      console.error('Error creating bill:', e);
    } finally {
      setFormLoading(false);
    }
  };

  const createPDFContent = () => {
    if (!appointmentDetails) return '';

    const baseFee = parseFloat(consultationFee || 0) + parseFloat(additionalCharges || 0);
    const gst = baseFee * 0.18;
    const calculatedTotalAmount = baseFee + gst;

    return `
      <div id="bill-template" style="font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.6; padding: 30px; color: #333; border: 1px solid #e0e0e0; max-width: 800px; margin: auto; box-shadow: 0 8px 24px rgba(0,0,0,0.1); border-radius: 12px; background-color: #ffffff;">
        <div style="text-align: center; border-bottom: 4px solid #00796b; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="color: #00796b; margin: 0; font-size: 32px; font-weight: 700;">Sarvotham Spine Care Hospital</h1>
          <p style="margin: 10px 0 0; font-size: 15px; color: #555;">123 Health St, Wellness City, 560001</p>
          <p style="margin: 5px 0 0; font-size: 15px; color: #555;">Phone: (080) 1234 5678 | Email: contact@sarvothamhospital.com</p>
        </div>
        <h2 style="text-align: center; color: #444; margin-bottom: 30px; font-size: 24px; font-weight: 600; text-transform: uppercase;">Invoice / Medical Bill</h2>
        <div style="display: flex; justify-content: space-between; margin-bottom: 25px; background-color: #e0f2f1; padding: 20px; border-radius: 8px; border: 1px solid #b2dfdb;">
          <div>
            <strong>Bill Date:</strong> <span style="font-weight: normal;">${billDate || 'N/A'}</span><br/>
            <strong>Bill Type:</strong> <span style="font-weight: normal;">Consultation</span>
          </div>
          <div style="text-align: right;">
            <strong>Patient:</strong> <span style="font-weight: normal;">${appointmentDetails.patientFullName}</span><br/>
            <strong>Doctor:</strong> <span style="font-weight: normal;">${appointmentDetails.doctorFullName}</span>
          </div>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-top: 25px; border: 1px solid #cfd8dc; border-radius: 8px; overflow: hidden;">
          <thead>
            <tr style="background-color: #00796b; color: #ffffff;">
              <th style="padding: 15px; border: 1px solid #00796b; text-align: left; font-weight: 600;">Description</th>
              <th style="padding: 15px; border: 1px solid #00796b; text-align: right; font-weight: 600;">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background-color: #fdfdfd;">
              <td style="padding: 15px; border: 1px solid #e0e0e0;">Consultation Fee</td>
              <td style="padding: 15px; border: 1px solid #e0e0e0; text-align: right;">${parseFloat(consultationFee).toFixed(2)}</td>
            </tr>
            <tr style="background-color: #fdfdfd;">
              <td style="padding: 15px; border: 1px solid #e0e0e0;">Additional Charges</td>
              <td style="padding: 15px; border: 1px solid #e0e0e0; text-align: right;">${parseFloat(additionalCharges).toFixed(2)}</td>
            </tr>
            <tr style="background-color: #fdfdfd;">
              <td style="padding: 15px; border: 1px solid #e0e0e0;">GST (18%)</td>
              <td style="padding: 15px; border: 1px solid #e0e0e0; text-align: right;">${gst.toFixed(2)}</td>
            </tr>
            <tr style="background-color: #e0f2f1; font-weight: bold;">
              <td style="padding: 15px; border: 1px solid #b2dfdb; text-align: right; font-size: 16px;">Total Amount</td>
              <td style="padding: 15px; border: 1px solid #b2dfdb; text-align: right; font-size: 16px; color: #00796b;">₹${calculatedTotalAmount.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <div style="margin-top: 30px; text-align: right;">
          <p style="font-size: 16px; font-weight: bold; margin: 5px 0; color: #00796b;">Amount Paid: ₹${parseFloat(amountPaid).toFixed(2)}</p>
          <p style="font-size: 16px; font-weight: bold; margin: 5px 0; color: ${parseFloat(balanceDue) > 0 ? '#d32f2f' : '#065f46'};">Balance Due: ₹${parseFloat(balanceDue).toFixed(2)}</p>
          <p style="margin: 10px 0;">Payment Method: <span style="font-weight: normal;">${paymentMethod}</span></p>
        </div>
        <div style="margin-top: 40px; border-top: 1px dashed #cccccc; padding-top: 25px;">
          <p style="font-size: 15px;"><strong>Notes:</strong> <span style="font-weight: normal;">${notes || 'N/A'}</span></p>
        </div>
        <div style="margin-top: 50px; text-align: center; color: #888; font-style: italic; font-size: 14px;">
          Thank you for choosing Sarvotham Spine Care Hospital. We wish you a speedy recovery.
        </div>
      </div>
    `;
  };

  const handleGeneratePDFPreview = async () => {
    if (!appointmentDetails) {
      alert('No appointment details available to generate a PDF preview.');
      return;
    }

    setPdfContent('');
    setPdfBlob(null);
    setFormLoading(true); // Indicate loading while PDF is being generated

    const contentHtml = createPDFContent();
    setPdfContent(contentHtml);

    // Create a temporary div to render HTML for canvas conversion
    const billContent = document.createElement('div');
    billContent.style.width = '210mm'; // A4 width
    billContent.style.backgroundColor = '#fff';
    billContent.style.position = 'absolute'; // Position off-screen
    billContent.style.left = '-9999px';
    billContent.innerHTML = contentHtml;
    document.body.appendChild(billContent);

    try {
      const canvas = await html2canvas(billContent, { scale: 2, logging: false }); // scale for better resolution
      const imgData = canvas.toDataURL('image/jpeg', 1.0); // Use JPEG for smaller file size, quality 1.0
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Add image to PDF, ensuring it fits within A4 page
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      const pdfOutput = pdf.output('blob');
      setPdfBlob(pdfOutput);

      setShowPreviewModal(true);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again. Check console for details.');
    } finally {
      document.body.removeChild(billContent); // Clean up temporary div
      setFormLoading(false); // End loading
    }
  };

  const handleDownloadPDF = () => {
    if (!pdfBlob) {
      alert('PDF not available for download.');
      return;
    }

    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bill_appointment_${selectedAppointmentId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Clean up the object URL
  };

  const handleUploadBill = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    // Client-side validation for file type and size
    const MAX_FILE_SIZE_MB = 20; // Reduced max size for practical web uploads
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE_BYTES) {
      alert(`File is too large. Please upload a file smaller than ${MAX_FILE_SIZE_MB} MB.`);
      event.target.value = null; // Reset the input field
      return;
    }

    if (file.type !== 'application/pdf') {
      alert('Invalid file type. Only PDF files are allowed.');
      event.target.value = null; // Reset the input field
      return;
    }

    setUploading(true);
    setFormError(null); // Clear previous errors

    const formData = new FormData();
    formData.append('billDocument', file);

    try {
      const response = await fetch(`http://localhost:2009/api/bills/upload-document`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to upload file');
      }

      const uploadResult = await response.json();
      console.log('File uploaded successfully:', uploadResult);

      setBillDocumentUrl(uploadResult.fileUrl);

      // Provide clear instruction to the user
      alert(`Uploaded file: ${file.name}. Please click 'Create Bill' to finalize the billing process.`);
    } catch (e) {
      console.error('Error uploading file:', e);
      setFormError(`Failed to upload file: ${e.message}`);
    } finally {
      setUploading(false);
      event.target.value = null; // Clear the file input for next upload
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    handleBackToList(); // Go back to the appointment list after successful bill creation
  };

  const handleClosePreviewModal = () => {
    setShowPreviewModal(false);
    setPdfContent('');
    setPdfBlob(null);
  };

  // Component to render the list of appointments
  const renderAppointmentList = () => (
    <Box
  sx={{
    width: '100%',
    maxWidth: '1600px',
    bgcolor: '#f9fafb', // Light neutral background for contrast
    borderRadius: 4,
    boxShadow: '0 16px 40px rgba(0, 105, 92, 0.1)', // Softer, bigger shadow for container
    p: { xs: 4, sm: 6 },
    mx: 'auto',
  }}
>
  <Typography
    variant="h5"
    component="h2"
    gutterBottom
    sx={{
      color: '#004d40',
      mb: 5,
      fontWeight: '800',
      borderBottom: '4px solid #00796b',
      pb: 2,
      letterSpacing: '0.08em',
      fontSize: { xs: '2rem', sm: '2.25rem' },
      textTransform: 'uppercase',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      textShadow: '0 2px 6px rgba(0,0,0,0.1)',
    }}
  >
    Recent Appointments
  </Typography>

  <Grid container spacing={4} justifyContent="center">
    {appointments.map((appointment) => (
      <Grid item xs={12} sm={6} md={4} key={appointment.id} sx={{ display: 'flex', justifyContent: 'center' }}>
        <StyledPaper
          sx={{
            width: 280,
            height: 280,
            cursor: 'pointer',
            borderRadius: 4,
            background: 'linear-gradient(145deg, #e0f2f1, #a7ccc9)', // Soft teal gradient
            boxShadow: '12px 12px 24px #c3d9d7, -12px -12px 24px #ffffff', // Neumorphic shadow
            transition: 'transform 0.35s ease, box-shadow 0.35s ease, background 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            '&:hover': {
              transform: 'translateY(-10px) scale(1.03)',
              boxShadow: '18px 18px 32px #9ac8c5, -18px -18px 32px #effcfb',
              background: 'linear-gradient(145deg, #a7ccc9, #7ac2be)',
            },
          }}
          onClick={() => handleGenerateBillClick(appointment)}
          elevation={8}
          aria-label={`Generate bill for ${appointment.patientFullName}`}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') handleGenerateBillClick(appointment); }}
        >
          <ListItem disableGutters sx={{ px: 3, py: 4 }}>
            <ListItemText
              sx={{ minWidth: 0 }}
              primary={
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: '900',
                    color: '#004d40',
                    fontSize: { xs: '1.25rem', sm: '1.5rem' },
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    textShadow: '0 1px 2px rgba(0,0,0,0.12)',
                  }}
                >
                  {appointment.patientFullName}
                </Typography>
              }
              secondary={
                <>
                  <Typography
                    component="span"
                    color="#00695c"
                    sx={{ display: 'block', mt: 1, fontSize: '1rem', fontWeight: 700 }}
                  >
                    Doctor: {appointment.doctorFullName} ({appointment.doctorSpecialization})
                  </Typography>
                  <Typography
                    component="span"
                    color="#004d40"
                    sx={{ display: 'block', mt: 0.7, fontSize: '0.95rem', fontWeight: 600 }}
                  >
                    Date: {appointment.formattedDate} &nbsp; | &nbsp; Time: {appointment.formattedTime}
                  </Typography>
                  <Typography
                    component="span"
                    color="#2e7d32"
                    sx={{ display: 'block', mt: 1, fontSize: '0.9rem', fontStyle: 'italic', fontWeight: 600 }}
                  >
                    Reason: {appointment.reasonForVisit || 'N/A'}
                  </Typography>
                </>
              }
            />
          </ListItem>
        </StyledPaper>
      </Grid>
    ))}
  </Grid>
</Box>

  );

  // Component to render the billing form
  const renderBillingForm = () => {
    if (formLoading) {
      return (
        <Box sx={{ display: 'flex', width :'15200px',  justifyContent: 'center', alignItems: 'center', p: 4, bgcolor: '#f8f9fa', minHeight: '100vh' }}>
          <CircularProgress sx={{ color: '#00796b' }} />
          <Typography variant="h6" sx={{ ml: 2, color: '#00796b' }}>Loading details...</Typography>
        </Box>
      );
    }

    if (formError) {
      return (
        <Box sx={{ p: 4, bgcolor: '#f8f9fa', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Alert severity="error" sx={{ width: '100%', maxWidth: 1600, mb: 3, borderRadius: 2 }}>
            {formError}
          </Alert>
          <StyledButton variant="outlined" onClick={handleBackToList} sx={{ mt: 2 }}>
            <ArrowBackIcon sx={{ mr: 1 }} /> Back to Appointments
          </StyledButton>
        </Box>
      );
    }

    if (!appointmentDetails) {
      return (
        <Box sx={{ p: 4, bgcolor: 'blue', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>No appointment data found for billing.</Typography>
          <StyledButton variant="outlined" onClick={handleBackToList} sx={{ mt: 2 }}>
            <ArrowBackIcon sx={{ mr: 1 }} /> Back to Appointments
          </StyledButton>
        </Box>
      );
    }

    return (
      <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: 1100, mx: 'auto', bgcolor: '#f8f9fa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button onClick={handleBackToList} variant="text" sx={{ color: '#00796b', textTransform: 'none', fontWeight: 'bold' }}>
            <ArrowBackIcon sx={{ mr: 1 }} /> Back
          </Button>
          <Typography variant="h4" gutterBottom sx={{ flexGrow: 1, textAlign: 'center', color: '#00796b', fontWeight: 'bold', fontSize: { xs: '1.5rem', sm: '2rem' } }}>
            Generate Bill
          </Typography>
        </Box>

        <Card sx={{ mb: 3, boxShadow: 4, borderRadius: 3, border: '1px solid #e0e0e0' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#00796b', borderBottom: '2px solid #b2dfdb', pb: 1, mb: 2 }}>
              Appointment Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <span style={{ fontWeight: 'bold' }}>Patient:</span> {appointmentDetails.patientFullName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <span style={{ fontWeight: 'bold' }}>Doctor:</span> {appointmentDetails.doctorFullName} ({appointmentDetails.doctorSpecialization})
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <span style={{ fontWeight: 'bold' }}>Date:</span> {appointmentDetails.formattedDate}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <span style={{ fontWeight: 'bold' }}>Time:</span> {appointmentDetails.formattedTime}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <span style={{ fontWeight: 'bold' }}>Reason:</span> {appointmentDetails.reasonForVisit || 'N/A'}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card sx={{ boxShadow: 4, width : 1000, borderRadius: 3, flexGrow: 1, border: '1px solid #e0e0e0' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#00796b', borderBottom: '2px solid #b2dfdb', pb: 1, mb: 2 }}>
              Bill Information
            </Typography>
            <Grid container spacing={3}>
              {/* Bill Date - Current Date (Read-only) */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Bill Date"
                  fullWidth
                  value={billDate}
                  InputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  size="small"
                />
              </Grid>

              {/* Bill Type - Consultation (Read-only) */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Bill Type"
                  fullWidth
                  value={billType}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                  size="small"
                />
              </Grid>

              {/* Payment Method - Combo Box */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel id="payment-method-label">Payment Method</InputLabel>
                  <Select
                    labelId="payment-method-label"
                    value={paymentMethod}
                    label="Payment Method"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <MenuItem value="Credit Card">Credit Card</MenuItem>
                    <MenuItem value="Debit Card">Debit Card</MenuItem>
                    <MenuItem value="Cash">Cash</MenuItem>
                    <MenuItem value="Online Transfer">Online Transfer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Consultation Fee */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Consultation Fee (₹)"
                  fullWidth
                  type="number"
                  value={consultationFee}
                  onChange={(e) => setConsultationFee(e.target.value)}
                  variant="outlined"
                  size="small"
                  inputProps={{ min: "0" }}
                />
              </Grid>

              {/* Additional Charges */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Additional Charges (₹)"
                  fullWidth
                  type="number"
                  value={additionalCharges}
                  onChange={(e) => setAdditionalCharges(e.target.value)}
                  variant="outlined"
                  size="small"
                  inputProps={{ min: "0" }}
                />
              </Grid>

              {/* Total Amount (Read-only) */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Total Amount (₹)"
                  fullWidth
                  type="number"
                  value={totalAmount}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                  size="small"
                  sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#e0f2f1' } }} // Light teal background for read-only
                />
              </Grid>

              {/* Amount Paid */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Amount Paid (₹)"
                  fullWidth
                  type="number"
                  value={amountPaid}
                  onChange={(e) => setAmountPaid(e.target.value)}
                  variant="outlined"
                  size="small"
                  inputProps={{ min: "0" }}
                />
              </Grid>

              {/* Balance Due (Read-only) */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Balance Due (₹)"
                  fullWidth
                  type="number"
                  value={balanceDue}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: parseFloat(balanceDue) > 0 ? '#ffebee' : '#e8f5e9', // Light red for due, light green for paid
                    },
                    '& .MuiInputBase-input': {
                      color: parseFloat(balanceDue) > 0 ? '#d32f2f' : '#388e3c', // Darker red/green text
                      fontWeight: 'bold',
                    }
                  }}
                />
              </Grid>
              {/* Notes */}
              <Grid item xs={12}>
                <TextField
                  label="Notes"
                  fullWidth
                  multiline
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  variant="outlined"
                  size="small"
                  placeholder="Add any relevant notes for the bill..."
                />
              </Grid>
            </Grid>

            {/* Generate PDF button and Upload section */}
            <Box sx={{ mt: 3, mb: 2, display: 'flex', justifyContent: 'flex-end', gap: 2, flexWrap: 'wrap' }}>
              <StyledButton
                variant="contained"
                onClick={handleGeneratePDFPreview}
                disabled={!appointmentDetails || formLoading}
              >
                {formLoading ? 'Generating PDF...' : 'Generate PDF'}
              </StyledButton>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                Upload Bill Document (PDF)
              </Typography>
              <TextField
                label="Choose File"
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <StyledButton
                      variant="contained"
                      component="label"
                      sx={{ minWidth: 'auto', px: 2, py: 1 }} // Smaller button for browse
                      disabled={uploading}
                    >
                      {uploading ? <CircularProgress size={20} color="inherit" /> : 'Browse'}
                      <input
                        type="file"
                        hidden
                        id="bill-document-upload"
                        onChange={handleUploadBill}
                        accept="application/pdf"
                      />
                    </StyledButton>
                  ),
                }}
                value={billDocumentUrl ? billDocumentUrl.split('/').pop() : ''}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {uploading ? 'Uploading...' : (billDocumentUrl ? `Uploaded: ${billDocumentUrl.split('/').pop()}` : 'Please upload the generated PDF document (Max 5MB)')}
              </Typography>
            </Box>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <StyledButton
                variant="contained"
                onClick={handleCreateBill}
                disabled={formLoading || !!selectedBillId || !billDocumentUrl || uploading} // Disable if no document uploaded or still uploading
              >
                {formLoading ? 'Creating Bill...' : 'Create Bill'}
              </StyledButton>
            </Box>
          </CardContent>
        </Card>

        {/* Success Modal */}
        <Modal
          open={showSuccessModal}
          onClose={handleCloseModal}
          aria-labelledby="success-modal-label"
          aria-describedby="success-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: 400 }, // Responsive width
              bgcolor: 'background.paper',
              boxShadow: 24,
              borderRadius: 3,
              p: 4,
              outline: 'none',
              textAlign: 'center',
              border: '1px solid #e0e0e0',
            }}
          >
            <Typography id="success-modal-label" variant="h6" component="h2" gutterBottom sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
              ✅ Success!
            </Typography>
            <Typography id="success-modal-description" sx={{ mb: 3, color: 'text.secondary' }}>
              Bill for appointment created successfully with ID: <strong style={{ color: '#00796b' }}>{selectedBillId}</strong>.
            </Typography>
            <Box>
              <StyledButton variant="contained" onClick={handleCloseModal}>
                OK
              </StyledButton>
            </Box>
          </Box>
        </Modal>

        {/* PDF Preview Modal */}
        <Modal
          open={showPreviewModal}
          onClose={handleClosePreviewModal}
          aria-labelledby="pdf-preview-modal-title"
          aria-describedby="pdf-preview-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '95%', sm: '80%', md: '70%', lg: '60%' }, // More responsive width
              height: '90vh',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: { xs: 2, sm: 4 },
              outline: 'none',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 3,
              border: '1px solid #e0e0e0',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography id="pdf-preview-modal-title" variant="h6" sx={{ fontWeight: 'bold', color: '#00796b' }}>
                PDF Preview 📄
              </Typography>
              <IconButton onClick={handleClosePreviewModal} aria-label="close">
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box id="pdf-preview-content" sx={{ flexGrow: 1, overflowY: 'auto', p: 1 }} dangerouslySetInnerHTML={{ __html: pdfContent }} />
            <Divider sx={{ mt: 2 }} />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <StyledButton variant="contained" onClick={handleDownloadPDF} disabled={!pdfBlob}>
                Download PDF
              </StyledButton>
            </Box>
          </Box>
        </Modal>
      </Box>
    );
  };

  return selectedAppointmentId === null ? renderAppointmentList() : renderBillingForm();
}




// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Paper,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   CircularProgress,
//   Alert,
//   Button,
//   Grid,
//   TextField,
//   Card,
//   CardContent,
//   Modal,
//   IconButton,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   styled,
//   useTheme,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// // PDF Libraries
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import SearchIcon from '@mui/icons-material/Search';
// import InputAdornment from '@mui/material/InputAdornment';
// // Styled Components with fresh vibrant styling
// const StyledPaper = styled(Paper)(({ theme }) => ({
//   background: 'linear-gradient(145deg, #fbe8e7, #ffd1c0)', // warm peach gradient
//   boxShadow: '14px 14px 27px #d9b0a2, -14px -14px 27px #fff1eb', // soft warm neumorphic shadow
//   borderRadius: 18,
//   padding: theme.spacing(3),
//   transition: 'transform 0.35s ease, box-shadow 0.35s ease, background 0.3s ease',
//   cursor: 'pointer',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   '&:hover': {
//     transform: 'translateY(-10px) scale(1.04)',
//     boxShadow: '20px 20px 35px #c99789, -20px -20px 35px #fff4ef',
//     background: 'linear-gradient(145deg, #ffd1c0, #ffb299)',
//   },
// }));

// const StyledButton = styled(Button)(({ theme }) => ({
//   backgroundColor: '#ff7043', // coral orange
//   color: '#ffffff',
//   borderRadius: theme.shape.borderRadius,
//   padding: '12px 24px',
//   fontWeight: 'bold',
//   letterSpacing: 0.5,
//   textTransform: 'none',
//   boxShadow: '0 4px 15px rgba(255, 112, 67, 0.4)',
//   '&:hover': {
//     backgroundColor: '#e64a19', // darker coral
//     boxShadow: '0 6px 20px rgba(230, 74, 25, 0.5)',
//   },
//   '&:disabled': {
//     backgroundColor: '#ffcdb8',
//     color: '#fff6f0',
//     boxShadow: 'none',
//   },
// }));

// // Utility fetch function with delay
// async function fetchData(url, options = {}) {
//   await new Promise((r) => setTimeout(r, 500));
//   const res = await fetch(url, options);
//   if (!res.ok) {
//     const msg = await res.text();
//     throw new Error(msg || `Fetch error: ${res.status} ${res.statusText}`);
//   }
//   return res.json();
// }

// export default function BillingDesk() {
//   const theme = useTheme();

//   // States
//   const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
//   const [selectedBillId, setSelectedBillId] = useState(null);

//   const [appointments, setAppointments] = useState([]);
//   const [listLoading, setListLoading] = useState(false);
//   const [listError, setListError] = useState(null);

//   const [appointmentDetails, setAppointmentDetails] = useState(null);
//   const [formLoading, setFormLoading] = useState(false);
//   const [formError, setFormError] = useState(null);

//   const [billDate] = useState(new Date().toISOString().split('T')[0]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [amountPaid, setAmountPaid] = useState(0);
//   const [balanceDue, setBalanceDue] = useState(0);
//   const [paymentMethod, setPaymentMethod] = useState('Credit Card');
//   const [status, setStatus] = useState('Pending');
//   const [billType] = useState('Consultation');
//   const [billDocumentUrl, setBillDocumentUrl] = useState('');
//   const [consultationFee, setConsultationFee] = useState('0.00');
//   const [additionalCharges, setAdditionalCharges] = useState('0.00');
//   const [notes, setNotes] = useState('');

//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [showPreviewModal, setShowPreviewModal] = useState(false);
//   const [pdfContent, setPdfContent] = useState('');
//   const [pdfBlob, setPdfBlob] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   // Search query state
//   const [searchQuery, setSearchQuery] = useState('');

//   // Auto calculation for amounts
//   useEffect(() => {
//     const baseFee = parseFloat(consultationFee || 0) + parseFloat(additionalCharges || 0);
//     const gst = baseFee * 0.18;
//     const calculatedTotal = (baseFee + gst).toFixed(2);
//     const amtPaid = parseFloat(amountPaid || 0);

//     setTotalAmount(calculatedTotal);
//     setBalanceDue((parseFloat(calculatedTotal) - amtPaid).toFixed(2));
//   }, [consultationFee, additionalCharges, amountPaid]);

//   // Load appointments list
//   useEffect(() => {
//     if (selectedAppointmentId === null) {
//       async function loadAppointments() {
//         try {
//           setListLoading(true);
//           setListError(null);
//           const appts = await fetchData('http://localhost:2010/api/appointments');

//           const enriched = await Promise.all(
//             appts.map(async (appt) => {
//               let patientFullName = 'Unknown Patient';
//               let doctorFullName = 'Unknown Doctor';
//               let doctorConsultationFee = 'N/A';
//               let doctorSpecialization = '';

//               try {
//                 const patient = await fetchData(`http://localhost:2008/api/patients/${appt.patientId}`);
//                 patientFullName = `${patient.first_name} ${patient.last_name}`;
//               } catch {}

//               try {
//                 const doctor = await fetchData(`http://localhost:2005/api/doctors/${appt.doctorId}`);
//                 doctorFullName = `${doctor.firstName} ${doctor.lastName}`;
//                 doctorConsultationFee = (doctor.consultationFee ?? 250.00).toString();
//                 doctorSpecialization = doctor.specialization ?? 'General Physician';
//               } catch {}

//               return {
//                 ...appt,
//                 patientFullName,
//                 doctorFullName,
//                 doctorConsultationFee,
//                 doctorSpecialization,
//                 formattedDate: new Date(appt.appointmentDate).toLocaleDateString(),
//                 formattedTime: new Date(appt.appointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//               };
//             })
//           );
//           setAppointments(enriched);
//         } catch (e) {
//           setListError('Failed to load appointments. Please check the server status.');
//         } finally {
//           setListLoading(false);
//         }
//       }
//       loadAppointments();
//     }
//   }, [selectedAppointmentId]);

//   // Load appointment details for selected
//   useEffect(() => {
//     if (selectedAppointmentId !== null) {
//       async function loadAppointmentDetails() {
//         try {
//           setFormLoading(true);
//           setFormError(null);
//           const appt = await fetchData(`http://localhost:2010/api/appointments/${selectedAppointmentId}`);

//           let patientFullName = ' Routhu Rambabu';
//           let doctorFullName = 'Dr Santosh Kumar';
//           let doctorConsultationFee = '750.00';
//           let doctorSpecialization = '';

//           try {
//             const patient = await fetchData(`http://localhost:2008/api/patients/${appt.patientId}`);
//             patientFullName = `${patient.first_name} ${patient.last_name}`;
//           } catch {}

//           try {
//             const doctor = await fetchData(`http://localhost:2005/api/doctors/${appt.doctorId}`);
//             doctorFullName = `${doctor.firstName} ${doctor.lastName}`;
//             doctorConsultationFee = (doctor.consultationFee ?? 250.00).toString();
//             doctorSpecialization = doctor.specialization ?? 'General Physician';
//           } catch {}

//           setAppointmentDetails({
//             ...appt,
//             patientFullName,
//             doctorFullName,
//             doctorConsultationFee,
//             doctorSpecialization,
//             formattedDate: new Date(appt.appointmentDate).toLocaleDateString(),
//             formattedTime: new Date(appt.appointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//           });

//           setConsultationFee(doctorConsultationFee);
//           setAdditionalCharges('0.00');
//           setNotes('');
//           setPaymentMethod('Credit Card');
//           setStatus('Pending');
//           setBillDocumentUrl('');
//           setAmountPaid(doctorConsultationFee);
//         } catch (e) {
//           setFormError('Failed to load appointment details. Please try again.');
//         } finally {
//           setFormLoading(false);
//         }
//       }
//       loadAppointmentDetails();
//     } else {
//       setAppointmentDetails(null);
//     }
//   }, [selectedAppointmentId]);

//   // Event handlers
//   const handleGenerateBillClick = (appointment) => {
//     setSelectedAppointmentId(appointment.id);
//     setSelectedBillId(null);
//     setBillDocumentUrl('');
//     setFormError(null);
//   };

//   const handleBackToList = () => {
//     setSelectedAppointmentId(null);
//     setFormError(null);
//     setSelectedBillId(null);
//     setBillDocumentUrl('');
//   };

//   const handleCreateBill = async () => {
//     if (!appointmentDetails) {
//       alert('No appointment selected to create a bill.');
//       return;
//     }
//     if (!billDocumentUrl) {
//       alert('Please upload a bill document first before creating the bill.');
//       return;
//     }

//     setFormLoading(true);
//     setFormError(null);

//     const baseFee = parseFloat(consultationFee || 0) + parseFloat(additionalCharges || 0);
//     const gstRate = 0.18;
//     const gstAmount = baseFee * gstRate;
//     const finalTotalAmount = (baseFee + gstAmount).toFixed(2);

//     const newBill = {
//       patientId: appointmentDetails.patientId,
//       appointmentId: selectedAppointmentId,
//       billDate,
//       totalAmount: parseFloat(finalTotalAmount),
//       amountPaid: parseFloat(amountPaid),
//       balanceDue: parseFloat(balanceDue),
//       paymentMethod,
//       status,
//       billType,
//       transactionId: `TRANS-${Math.floor(Math.random() * 1000000)}`,
//       issuedByUserId: '84525', // Replace with actual user id
//       billDocumentUrl,
//       notes,
//     };

//     try {
//       const createdBill = await fetchData('http://localhost:2009/api/bills', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newBill),
//       });
//       setSelectedBillId(createdBill.id);
//       setShowSuccessModal(true);
//     } catch (e) {
//       setFormError(`Failed to create bill: ${e.message}`);
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   // PDF content generator
//   const createPDFContent = () => {
//     if (!appointmentDetails) return '';

//     const baseFee = parseFloat(consultationFee || 0) + parseFloat(additionalCharges || 0);
//     const gst = baseFee * 0.18;
//     const calculatedTotalAmount = baseFee + gst;

//     return `
//       <div style="font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.6; padding: 30px; color: #333; border: 1px solid #e0e0e0; max-width: 800px; margin: auto; box-shadow: 0 8px 24px rgba(0,0,0,0.1); border-radius: 12px; background-color: #ffffff;">
//         <div style="text-align: center; border-bottom: 4px solid #ff7043; padding-bottom: 20px; margin-bottom: 30px;">
//           <h1 style="color: #ff7043; margin: 0; font-size: 32px; font-weight: 700;">Sarvotham Spine Care Hospital</h1>
//           <p style="margin: 10px 0 0; font-size: 15px; color: #555;">123 Health St, Wellness City, 560001</p>
//           <p style="margin: 5px 0 0; font-size: 15px; color: #555;">Phone: (080) 1234 5678 | Email: contact@sarvothamhospital.com</p>
//         </div>
//         <h2 style="text-align: center; color: #6d4c41; margin-bottom: 30px; font-size: 24px; font-weight: 600; text-transform: uppercase;">Invoice / Medical Bill</h2>
//         <div style="display: flex; justify-content: space-between; margin-bottom: 25px; background-color: #fdebd0; padding: 20px; border-radius: 8px; border: 1px solid #f9d5b6;">
//           <div>
//             <strong>Bill Date:</strong> <span style="font-weight: normal;">${billDate || 'N/A'}</span><br/>
//             <strong>Bill Type:</strong> <span style="font-weight: normal;">Consultation</span>
//           </div>
//           <div style="text-align: right;">
//             <strong>Patient:</strong> <span style="font-weight: normal;">${appointmentDetails.patientFullName}</span><br/>
//             <strong>Doctor:</strong> <span style="font-weight: normal;">${appointmentDetails.doctorFullName}</span>
//           </div>
//         </div>
//         <table style="width: 100%; border-collapse: collapse; margin-top: 25px; border: 1px solid #d7ccc8; border-radius: 8px; overflow: hidden;">
//           <thead>
//             <tr style="background-color: #ff7043; color: #ffffff;">
//               <th style="padding: 15px; border: 1px solid #ff7043; text-align: left; font-weight: 600;">Description</th>
//               <th style="padding: 15px; border: 1px solid #ff7043; text-align: right; font-weight: 600;">Amount (₹)</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr style="background-color: #fff3e0;">
//               <td style="padding: 15px; border: 1px solid #d7ccc8;">Consultation Fee</td>
//               <td style="padding: 15px; border: 1px solid #d7ccc8; text-align: right;">${parseFloat(consultationFee).toFixed(2)}</td>
//             </tr>
//             <tr style="background-color: #fff3e0;">
//               <td style="padding: 15px; border: 1px solid #d7ccc8;">Additional Charges</td>
//               <td style="padding: 15px; border: 1px solid #d7ccc8; text-align: right;">${parseFloat(additionalCharges).toFixed(2)}</td>
//             </tr>
//             <tr style="background-color: #fff3e0;">
//               <td style="padding: 15px; border: 1px solid #d7ccc8;">GST (18%)</td>
//               <td style="padding: 15px; border: 1px solid #d7ccc8; text-align: right;">${gst.toFixed(2)}</td>
//             </tr>
//             <tr style="background-color: #fdebd0; font-weight: bold;">
//               <td style="padding: 15px; border: 1px solid #f9d5b6; text-align: right; font-size: 16px;">Total Amount</td>
//               <td style="padding: 15px; border: 1px solid #f9d5b6; text-align: right; font-size: 16px; color: #ff7043;">₹${calculatedTotalAmount.toFixed(2)}</td>
//             </tr>
//           </tbody>
//         </table>
//         <div style="margin-top: 30px; text-align: right;">
//           <p style="font-size: 16px; font-weight: bold; margin: 5px 0; color: #ff7043;">Amount Paid: ₹${parseFloat(amountPaid).toFixed(2)}</p>
//           <p style="font-size: 16px; font-weight: bold; margin: 5px 0; color: ${parseFloat(balanceDue) > 0 ? '#d84315' : '#2e7d32'};">Balance Due: ₹${parseFloat(balanceDue).toFixed(2)}</p>
//           <p style="margin: 10px 0;">Payment Method: <span style="font-weight: normal;">${paymentMethod}</span></p>
//         </div>
//         <div style="margin-top: 40px; border-top: 1px dashed #d7ccc8; padding-top: 25px;">
//           <p style="font-size: 15px;"><strong>Notes:</strong> <span style="font-weight: normal;">${notes || 'N/A'}</span></p>
//         </div>
//         <div style="margin-top: 50px; text-align: center; color: #888; font-style: italic; font-size: 14px;">
//           Thank you for choosing Sarvotham Spine Care Hospital. We wish you a speedy recovery.
//         </div>
//       </div>
//     `;
//   };

//   // PDF generation and preview handlers
//   const handleGeneratePDFPreview = async () => {
//     if (!appointmentDetails) {
//       alert('No appointment details available to generate a PDF preview.');
//       return;
//     }
//     setPdfContent('');
//     setPdfBlob(null);
//     setFormLoading(true);
//     const contentHtml = createPDFContent();
//     setPdfContent(contentHtml);

//     const billContent = document.createElement('div');
//     billContent.style.width = '210mm'; // A4 width
//     billContent.style.backgroundColor = '#fff';
//     billContent.style.position = 'absolute';
//     billContent.style.left = '-9999px';
//     billContent.innerHTML = contentHtml;
//     document.body.appendChild(billContent);

//     try {
//       const canvas = await html2canvas(billContent, { scale: 2, logging: false });
//       const imgData = canvas.toDataURL('image/jpeg', 1.0);
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//       pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
//       const pdfOutput = pdf.output('blob');
//       setPdfBlob(pdfOutput);

//       setShowPreviewModal(true);
//     } catch (error) {
//       alert('Failed to generate PDF. Please try again.');
//     } finally {
//       document.body.removeChild(billContent);
//       setFormLoading(false);
//     }
//   };

//   const handleDownloadPDF = () => {
//     if (!pdfBlob) {
//       alert('PDF not available for download.');
//       return;
//     }
//     const url = URL.createObjectURL(pdfBlob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `bill_appointment_${selectedAppointmentId}.pdf`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   };

//   // File upload handler
//   const handleUploadBill = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const MAX_FILE_SIZE_MB = 20;
//     const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

//     if (file.size > MAX_FILE_SIZE_BYTES) {
//       alert(`File too large (max ${MAX_FILE_SIZE_MB}MB). Please select a smaller file.`);
//       event.target.value = null;
//       return;
//     }

//     if (file.type !== 'application/pdf') {
//       alert('Invalid file type. Please upload a PDF file only.');
//       event.target.value = null;
//       return;
//     }

//     setUploading(true);
//     setFormError(null);

//     try {
//       const formData = new FormData();
//       formData.append('billDocument', file);

//       const response = await fetch('http://localhost:2009/api/bills/upload-document', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(errorText || 'Failed to upload file');
//       }

//       const uploadResult = await response.json();
//       setBillDocumentUrl(uploadResult.fileUrl);
//       alert(`Uploaded file: ${file.name}. Please click 'Create Bill' to finalize.`);
//     } catch (e) {
//       setFormError(`File upload failed: ${e.message}`);
//     } finally {
//       setUploading(false);
//       event.target.value = null;
//     }
//   };

//   // Modal close handlers
//   const handleCloseModal = () => {
//     setShowSuccessModal(false);
//     handleBackToList();
//   };
//   const handleClosePreviewModal = () => {
//     setShowPreviewModal(false);
//     setPdfContent('');
//     setPdfBlob(null);
//   };

//   // Render appointment list with search bar and 3 cards per row
//   const renderAppointmentList = () => (
//     <Box
//       sx={{
//         width: '100%',
//         maxWidth: 1800,
//         bgcolor: '#fff8f3',
//         borderRadius: 4,
//         boxShadow: '0 16px 40px rgba(237, 170, 152, 0.15)',
//         p: { xs: 4, sm: 6 },
//         mx: 'auto',
//       }}
//     >
//       <Typography
//         variant="h5"
//         component="h2"
//         gutterBottom
//         sx={{
//           color: 'black', // burnt orange
//           mb: 5,
//           fontWeight: '800',
//           borderBottom: '4px solid  black',
//           pb: 2,
//           letterSpacing: '0.08em',
//           fontSize: { xs: '2rem', sm: '2.25rem' },
//           textTransform: 'uppercase',
//           fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
//           textShadow: '0 2px 6px rgba(0,0,0,0.1)',
//         }}
//       >
//         Recent Appointments
//       </Typography>

//       {/* Search Bar */}
//      <Box sx={{ mb: 4, maxWidth: 1000, mx: 'auto' }}>
//   <TextField
//     label="Search appointments"
//     variant="outlined"
//     fullWidth
//     size="medium"
//     value={searchQuery}
//     onChange={(e) => setSearchQuery(e.target.value)}
//     placeholder="Search by Appointment ID, Reason, Doctor ID, Patient ID"
//     InputProps={{
//       startAdornment: (
//         <InputAdornment position="start">
//           <SearchIcon sx={{ color: 'black' }} />
//         </InputAdornment>
//       ),
//       sx: {
//         borderRadius: 5,
//         '& fieldset': {
//           borderColor: '#ffccbc',
//         },
//         '&:hover fieldset': {
//           borderColor: 'black',
//         },
//         '&.Mui-focused fieldset': {
//           borderColor: 'black',
//           boxShadow: '0 0 8px rgba(230, 74, 25, 0.4)',
//         },
//         backgroundColor: '#fff5f0',
//       },
//     }}
//     InputLabelProps={{
//       sx: {
//         color: 'black',
//         fontWeight: 600,
//       },
//     }}
//   />
// </Box>

//       <Grid container spacing={4} justifyContent="center">
//         {appointments
//           .filter((appointment) => {
//             const query = searchQuery.trim().toLowerCase();
//             if (!query) return true;

//             return (
//               appointment.id?.toString().toLowerCase().includes(query) ||
//               appointment.reasonForVisit?.toLowerCase().includes(query) ||
//               appointment.doctorId?.toString().toLowerCase().includes(query) ||
//               appointment.patientId?.toString().toLowerCase().includes(query)
//             );
//           })
//           .map((appointment) => (
//             <Grid item xs={12} sm={6} md={4} key={appointment.id} sx={{ display: 'flex', justifyContent: 'center' }}>
//               <StyledPaper
//                 sx={{
//                   width: 350,
//                   height: 280,
//                 }}
//                 onClick={() => handleGenerateBillClick(appointment)}
//                 elevation={8}
//                 aria-label={`Generate bill for ${appointment.patientFullName}`}
//                 role="button"
//                 tabIndex={0}
//                 onKeyPress={(e) => {
//                   if (e.key === 'Enter' || e.key === ' ') handleGenerateBillClick(appointment);
//                 }}
//               >
//                 <ListItem disableGutters sx={{ px: 3, py: 4 }}>
//                   <ListItemText
//                     sx={{ minWidth: 0 }}
//                     primary={
//                       <Typography
//                         variant="h6"
//                         sx={{
//                           fontWeight: '900',
//                           color: 'orange',
//                           fontSize: { xs: '1.25rem', sm: '1.5rem' },
//                           whiteSpace: 'nowrap',
//                           overflow: 'hidden',
//                           textOverflow: 'ellipsis',
//                           textShadow: '0 1px 2px rgba(0,0,0,0.12)',
//                         }}
//                       >
//                         {appointment.patientFullName}
//                       </Typography>
//                     }
//                     secondary={
//                       <>
//                         <Typography
//                           component="span"
//                           color="black"
//                           sx={{ display: 'block', mt: 1, fontSize: '1rem', fontWeight: 700 }}
//                         >
//                           Doctor: {appointment.doctorFullName} ({appointment.doctorSpecialization})
//                         </Typography>
//                         <Typography
//                           component="span"
//                           color="black"
//                           sx={{ display: 'block', mt: 0.7, fontSize: '0.95rem', fontWeight: 600 }}
//                         >
//                           Date: {appointment.formattedDate} &nbsp; | &nbsp; Time: {appointment.formattedTime}
//                         </Typography>
//                         <Typography
//                           component="span"
//                           color="black"
//                           sx={{ display: 'block', mt: 1, fontSize: '0.9rem', fontStyle: 'italic', fontWeight: 600 }}
//                         >
//                           Reason: {appointment.reasonForVisit || 'N/A'}
//                         </Typography>
//                       </>
//                     }
//                   />
//                 </ListItem>
//               </StyledPaper>
//             </Grid>
//           ))}
//       </Grid>
//     </Box>
//   );

//   // Billing Form rendering (with your earlier provided code styling and contents)
//   const renderBillingForm = () => {
//     if (formLoading) {
//       return (
//         <Box sx={{ display: 'flex',maxWidth : 2000, justifyContent: 'center', alignItems: 'center', p: 4, bgcolor: '#fbe9e7', minHeight: '100vh' }}>
//           <CircularProgress sx={{ color: 'black' }} />
//           <Typography variant="h6" sx={{ ml: 2, color: 'black' }}>
         
//           </Typography>
//         </Box>
//       );
//     }
//     if (formError) {
//       return (
//         <Box sx={{ p: 4, bgcolor: '#fbe9e7', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
//           <Alert severity="error" sx={{ width: '1800px', maxWidth: '1800px', mb: 3, borderRadius: 2, bgcolor: '#ffccbc', color: 'black' }}>
//             {formError}
//           </Alert>
//           <StyledButton variant="outlined" onClick={handleBackToList} sx={{ mt: 2, borderColor: 'black', color: 'black' }}>
//             <ArrowBackIcon sx={{ mr: 1 }} /> Back to Appointments
//           </StyledButton>
//         </Box>
//       );
//     }
//     if (!appointmentDetails) {
//       return (
//         <Box sx={{ p: 4, bgcolor: '#e6e1daff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
//           <Typography variant="body1" color="text.secondary" sx={{ mb: 3, color: '#bf360c' }}>
//             No appointment data found for billing.
//           </Typography>
//           <StyledButton variant="outlined" onClick={handleBackToList} sx={{ mt: 2, borderColor: '#bf360c', color: '#bf360c' }}>
//             <ArrowBackIcon sx={{ mr: 1 }} /> Back to Appointments
//           </StyledButton>
//         </Box>
//       );
//     }
//     return (
//       <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: '1100px', mx: 'auto', bgcolor: '#fff3e0', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//           <Button onClick={handleBackToList} variant="text" sx={{ color: '#bf360c', textTransform: 'none', fontWeight: 'bold' }}>
//             <ArrowBackIcon sx={{ mr: 1 }} /> Back
//           </Button>
//           <Typography variant="h4" gutterBottom sx={{ flexGrow: 1, textAlign: 'center', color: '#bf360c', fontWeight: 'bold', fontSize: { xs: '1.5rem', sm: '2rem' } }}>
//             Generate Bill
//           </Typography>
//         </Box>

//         <Card sx={{ mb: 3, boxShadow: 6, borderRadius: 3, border: '1px solid #d7ccc8', bgcolor: '#fff5f0' }}>
//           <CardContent>
//             <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#bf360c', borderBottom: '2px solid #ffccb3', pb: 1, mb: 2 }}>
//               Appointment Details
//             </Typography>
//             <Grid container spacing={2} sx={{ color: '#6d4c41' }}>
//               <Grid item xs={12} sm={6}>
//                 <Typography variant="body1"><strong>Patient:</strong> {appointmentDetails.patientFullName}</Typography>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography variant="body1"><strong>Doctor:</strong> {appointmentDetails.doctorFullName} ({appointmentDetails.doctorSpecialization})</Typography>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography variant="body1"><strong>Date:</strong> {appointmentDetails.formattedDate}</Typography>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography variant="body1"><strong>Time:</strong> {appointmentDetails.formattedTime}</Typography>
//               </Grid>
//               <Grid item xs={12}>
//                 <Typography variant="body1"><strong>Reason:</strong> {appointmentDetails.reasonForVisit || 'N/A'}</Typography>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>

//         <Card sx={{ boxShadow: 6, width: '100%', maxWidth: 16000, borderRadius: 3, flexGrow: 1, border: '1px solid #d7ccc8', bgcolor: '#fff5f0' }}>
//           <CardContent>
//             <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#bf360c', borderBottom: '2px solid #ffccb3', pb: 1, mb: 2 }}>
//               Bill Information
//             </Typography>
//             <Grid container spacing={3}>
//               {/* Bill Date */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Bill Date"
//                   fullWidth
//                   value={billDate}
//                   InputProps={{ readOnly: true }}
//                   InputLabelProps={{ shrink: true }}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>

//               {/* Bill Type */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Bill Type"
//                   fullWidth
//                   value={billType}
//                   InputProps={{ readOnly: true }}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>

//               {/* Payment Method */}
//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth variant="outlined" size="small">
//                   <InputLabel id="payment-method-label">Payment Method</InputLabel>
//                   <Select
//                     labelId="payment-method-label"
//                     value={paymentMethod}
//                     label="Payment Method"
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                   >
//                     <MenuItem value="Credit Card">Credit Card</MenuItem>
//                     <MenuItem value="Debit Card">Debit Card</MenuItem>
//                     <MenuItem value="Cash">Cash</MenuItem>
//                     <MenuItem value="Online Transfer">Online Transfer</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>

//               {/* Consultation Fee */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Consultation Fee (₹)"
//                   fullWidth
//                   type="number"
//                   value={consultationFee}
//                   onChange={(e) => setConsultationFee(e.target.value)}
//                   variant="outlined"
//                   size="small"
//                   inputProps={{ min: "0" }}
//                 />
//               </Grid>

//               {/* Additional Charges */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Additional Charges (₹)"
//                   fullWidth
//                   type="number"
//                   value={additionalCharges}
//                   onChange={(e) => setAdditionalCharges(e.target.value)}
//                   variant="outlined"
//                   size="small"
//                   inputProps={{ min: "0" }}
//                 />
//               </Grid>

//               {/* Total Amount */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Total Amount (₹)"
//                   fullWidth
//                   type="number"
//                   value={totalAmount}
//                   InputProps={{ readOnly: true }}
//                   variant="outlined"
//                   size="small"
//                   sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#ffe6dc' } }}
//                 />
//               </Grid>

//               {/* Amount Paid */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Amount Paid (₹)"
//                   fullWidth
//                   type="number"
//                   value={amountPaid}
//                   onChange={(e) => setAmountPaid(e.target.value)}
//                   variant="outlined"
//                   size="small"
//                   inputProps={{ min: "0" }}
//                 />
//               </Grid>

//               {/* Balance Due */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Balance Due (₹)"
//                   fullWidth
//                   type="number"
//                   value={balanceDue}
//                   InputProps={{ readOnly: true }}
//                   variant="outlined"
//                   size="small"
//                   sx={{
//                     '& .MuiOutlinedInput-root': {
//                       backgroundColor: parseFloat(balanceDue) > 0 ? '#ffebee' : '#e9f5ef',
//                     },
//                     '& .MuiInputBase-input': {
//                       color: parseFloat(balanceDue) > 0 ? '#d84315' : '#2e7d32',
//                       fontWeight: 'bold',
//                     }
//                   }}
//                 />
//               </Grid>

//               {/* Notes */}
//               <Grid item xs={12}>
//                 <TextField
//                   label="Notes"
//                   fullWidth
//                   multiline
//                   rows={3}
//                   value={notes}
//                   onChange={(e) => setNotes(e.target.value)}
//                   variant="outlined"
//                   size="small"
//                   placeholder="Add any relevant notes for the bill..."
//                 />
//               </Grid>
//             </Grid>

//             {/* PDF generate and upload */}
//             <Box sx={{ mt: 3, mb: 2, display: 'flex', justifyContent: 'flex-end', gap: 2, flexWrap: 'wrap' }}>
//               <StyledButton
//                 variant="contained"
//                 onClick={handleGeneratePDFPreview}
//                 disabled={!appointmentDetails || formLoading}
//               >
//                 {formLoading ? 'Generating PDF...' : 'Generate PDF'}
//               </StyledButton>
//             </Box>

//             <Box sx={{ mt: 2 }}>
//               <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#6d4c41' }}>
//                 Upload Bill Document (PDF)
//               </Typography>
//               <TextField
//                 label="Choose File"
//                 fullWidth
//                 variant="outlined"
//                 size="small"
//                 InputProps={{
//                   readOnly: true,
//                   endAdornment: (
//                     <StyledButton
//                       variant="contained"
//                       component="label"
//                       sx={{ minWidth: 'auto', px: 2, py: 1 }}
//                       disabled={uploading}
//                     >
//                       {uploading ? <CircularProgress size={20} color="inherit" /> : 'Browse'}
//                       <input
//                         type="file"
//                         hidden
//                         id="bill-document-upload"
//                         onChange={handleUploadBill}
//                         accept="application/pdf"
//                       />
//                     </StyledButton>
//                   ),
//                 }}
//                 value={billDocumentUrl ? billDocumentUrl.split('/').pop() : ''}
//               />
//               <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
//                 {uploading ? 'Uploading...' : (billDocumentUrl ? `Uploaded: ${billDocumentUrl.split('/').pop()}` : 'Please upload the generated PDF document (Max 5MB)')}
//               </Typography>
//             </Box>

//             <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
//               <StyledButton
//                 variant="contained"
//                 onClick={handleCreateBill}
//                 disabled={formLoading || !!selectedBillId || !billDocumentUrl || uploading}
//               >
//                 {formLoading ? 'Creating Bill...' : 'Create Bill'}
//               </StyledButton>
//             </Box>
//           </CardContent>
//         </Card>

//         {/* Success Modal */}
//         <Modal
//           open={showSuccessModal}
//           onClose={handleCloseModal}
//           aria-labelledby="success-modal-label"
//           aria-describedby="success-modal-description"
//         >
//           <Box
//             sx={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               width: { xs: '90%', sm: 400 },
//               bgcolor: '#fff3e0',
//               boxShadow: 24,
//               borderRadius: 3,
//               p: 4,
//               outline: 'none',
//               textAlign: 'center',
//               border: '1px solid #d7ccc8',
//             }}
//           >
//             <Typography id="success-modal-label" variant="h6" component="h2" gutterBottom sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
//               ✅ Success!
//             </Typography>
//             <Typography id="success-modal-description" sx={{ mb: 3, color: 'text.secondary' }}>
//               Bill for appointment created successfully with ID: <strong style={{ color: '#ff7043' }}>{selectedBillId}</strong>.
//             </Typography>
//             <Box>
//               <StyledButton variant="contained" onClick={handleCloseModal} sx={{ backgroundColor: '#2e7d32', '&:hover': { backgroundColor: '#27632a' } }}>
//                 OK
//               </StyledButton>
//             </Box>
//           </Box>
//         </Modal>

//         {/* PDF Preview Modal */}
//         <Modal
//           open={showPreviewModal}
//           onClose={handleClosePreviewModal}
//           aria-labelledby="pdf-preview-modal-title"
//           aria-describedby="pdf-preview-modal-description"
//         >
//           <Box
//             sx={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               width: { xs: '95%', sm: '80%', md: '70%', lg: '60%' },
//               height: '90vh',
//               bgcolor: '#fff3e0',
//               boxShadow: 24,
//               p: { xs: 2, sm: 4 },
//               outline: 'none',
//               display: 'flex',
//               flexDirection: 'column',
//               borderRadius: 3,
//               border: '1px solid #d7ccc8',
//             }}
//           >
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//               <Typography id="pdf-preview-modal-title" variant="h6" sx={{ fontWeight: 'bold', color: '#bf360c' }}>
//                 PDF Preview 📄
//               </Typography>
//               <IconButton onClick={handleClosePreviewModal} aria-label="close" sx={{ color: '#bf360c' }}>
//                 <CloseIcon />
//               </IconButton>
//             </Box>
//             <Divider sx={{ mb: 2 }} />
//             <Box id="pdf-preview-content" sx={{ flexGrow: 1, overflowY: 'auto', p: 1 }} dangerouslySetInnerHTML={{ __html: pdfContent }} />
//             <Divider sx={{ mt: 2 }} />
//             <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
//               <StyledButton variant="contained" onClick={handleDownloadPDF} disabled={!pdfBlob} sx={{ backgroundColor: '#bf360c', '&:hover': { backgroundColor: '#9a2e0b' } }}>
//                 Download PDF
//               </StyledButton>
//             </Box>
//           </Box>
//         </Modal>
//       </Box>
//     );
//   };

//   // Return either appointment list or billing form
//   return selectedAppointmentId === null ? renderAppointmentList() : renderBillingForm();
// }
