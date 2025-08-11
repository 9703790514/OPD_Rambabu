// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Alert,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Button,
//   Chip,
// } from '@mui/material';
// import PersonIcon from '@mui/icons-material/Person';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import EventNoteIcon from '@mui/icons-material/EventNote';
// import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

// const MyHealthPage = ({ patient, onViewMedicalRecords }) => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPatientAppointments = async () => {
//       if (!patient?.userId) {
//         setError("Patient ID is not available.");
//         setLoading(false);
//         return;
//       }
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await fetch(`http://localhost:2010/api/appointments/patient/${patient.userId}`);
//         if (!res.ok) {
//           const errorText = await res.text();
//           throw new Error(`Failed to fetch appointments: ${res.status} - ${errorText}`);
//         }
//         const data = await res.json();
//         setAppointments(data);
//       } catch (err) {
//         setError(err.message || "Failed to load appointments.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPatientAppointments();
//   }, [patient.userId]);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Confirmed': return 'success';
//       case 'Pending': return 'warning';
//       case 'Cancelled': return 'error';
//       case 'Scheduled': return 'info';
//       case 'Completed': return 'primary';
//       default: return 'default';
//     }
//   };

//   return (
//     <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', width: '100%' }}>
//       <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.dark' }}>
//         Your Appointments
//       </Typography>

//       {loading && (
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
//           <CircularProgress />
//           <Typography variant="h6" sx={{ ml: 2 }}>Loading Appointments...</Typography>
//         </Box>
//       )}

//       {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

//       {!loading && !error && appointments.length === 0 && (
//         <Alert severity="info" sx={{ mb: 3 }}>No appointments found.</Alert>
//       )}

//       {!loading && !error && appointments.length > 0 && (
//         <Grid container spacing={3}>
//           {appointments.map((appt) => (
//             <Grid item xs={12} sm={6} md={4} key={appt.id}>
//               <Card
//                 elevation={6}
//                 sx={{
//                   borderRadius: 3,
//                   background: 'linear-gradient(145deg, #ffffff, #f0f2f5)',
//                   boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
//                   height: '100%',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'space-between',
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
//                     <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
//                     Patient ID: {appt.patientId || 'N/A'}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, display: 'flex', alignItems: 'center' }}>
//                     <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
//                     Time: {appt.appointmentTime ? new Date(appt.appointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, display: 'flex', alignItems: 'center' }}>
//                     <EventNoteIcon fontSize="small" sx={{ mr: 1 }} />
//                     Type: {appt.reasonForVisit || 'N/A'}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
//                     <MeetingRoomIcon fontSize="small" sx={{ mr: 1 }} />
//                     Room: {appt.roomNumber || 'N/A'}
//                   </Typography>
//                   <Chip label={appt.status || 'Unknown'} color={getStatusColor(appt.status)} size="small" sx={{ mt: 1 }} />
//                 </CardContent>

//                 <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
//                   {appt.medicalRecordId && (
//                     <Button
//                       variant="contained"
//                       size="small"
//                       color="secondary"
//                       onClick={() => onViewMedicalRecords(appt.medicalRecordId)}
//                     >
//                       View Medical Records
//                     </Button>
//                   )}
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}

//       <Box sx={{ mt: 6, opacity: 0.7, textAlign: 'center' }}>
//         <Typography variant="body2" color="text.secondary">
//           View and manage your upcoming appointments and their medical records.
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// MyHealthPage.propTypes = {
//   patient: PropTypes.shape({
//     userId: PropTypes.string.isRequired,
//   }).isRequired,
//   onViewMedicalRecords: PropTypes.func.isRequired,
// };

// export default MyHealthPage;
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Divider,
  Avatar,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from '@mui/material';
import {
  Person as PersonIcon,
  AccessTime as AccessTimeIcon,
  EventNote as EventNoteIcon,
  MeetingRoom as MeetingRoomIcon,
  MedicalInformation as MedicalInformationIcon,
  HealthAndSafety as HealthAndSafetyIcon,
  CalendarToday as CalendarTodayIcon,
  Wc as WcIcon,
  Cake as CakeIcon,
  LocalPharmacy as LocalPharmacyIcon,
  Warning as WarningIcon,
  LocationOn as LocationOnIcon,
  Phone as PhoneIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from '@mui/icons-material';
import { styled } from '@mui/system';

// Custom theme for a more polished look
const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600, fontSize: '1.25rem' },
    body1: { fontSize: '1rem' },
    body2: { fontSize: '0.875rem' },
  },
  palette: {
    primary: {
      main: '#1a73e8',
      dark: '#0e4a9e',
    },
    secondary: {
      main: '#2196f3',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#1f2937',
      secondary: '#6b7280',
    },
    success: { main: '#4caf50' },
    info: { main: '#2196f3' },
    warning: { main: '#ff9800' },
    error: { main: '#f44336' },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
          transition: 'transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
});

// Styled components for a cleaner and more beautiful look
const PatientInfoCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
  boxShadow: '0 10px 30px rgba(0, 115, 255, 0.1)',
  padding: theme.spacing(3),
  borderRadius: 24,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -50,
    left: -50,
    width: 150,
    height: 150,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: '50%',
    zIndex: 0,
  },
}));

const PatientDetailsTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.dark,
  display: 'flex',
  alignItems: 'center',
  fontSize: '1.8rem',
  marginBottom: theme.spacing(3),
  '& svg': {
    fontSize: '2.2rem',
    marginRight: theme.spacing(1.5),
  },
}));

const StyledInfoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(2),
  '& svg': {
    marginRight: theme.spacing(1.5),
    color: theme.palette.primary.main,
    fontSize: '1.25rem',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(4),
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: -8,
    width: '60px',
    height: '4px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '2px',
  },
}));


const MyHealthPage = ({ patient, onViewMedicalRecords }) => {
  const [patientDetails, setPatientDetails] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loadingPatient, setLoadingPatient] = useState(true);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [errorPatient, setErrorPatient] = useState(null);
  const [errorAppointments, setErrorAppointments] = useState(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      if (!patient?.userId) {
        setErrorPatient("Patient User ID is not available.");
        setLoadingPatient(false);
        return;
      }
      setLoadingPatient(true);
      setErrorPatient(null);

      try {
        const res = await fetch(`http://localhost:2008/api/patients/user/${patient.userId}`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Failed to fetch patient details: ${res.status} - ${text}`);
        }
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setPatientDetails(data[0]);
        } else {
          setErrorPatient("Patient details not found.");
        }
      } catch (err) {
        setErrorPatient(err.message || "Failed to load patient details.");
      } finally {
        setLoadingPatient(false);
      }
    };

    fetchPatientDetails();
  }, [patient?.userId]);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!patientDetails?._id) {
        setAppointments([]);
        return;
      }
      setLoadingAppointments(true);
      setErrorAppointments(null);

      try {
        const res = await fetch(`http://localhost:2010/api/appointments/patient/${patientDetails._id}`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Failed to fetch appointments: ${res.status} - ${text}`);
        }
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        setErrorAppointments(err.message || "Failed to load appointments.");
      } finally {
        setLoadingAppointments(false);
      }
    };

    fetchAppointments();
  }, [patientDetails?._id]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
      case 'Completed':
        return 'success';
      case 'Pending':
      case 'Scheduled':
        return 'info';
      case 'Cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (e) {
      return dateString;
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    try {
      // Create a dummy date to parse the time string correctly
      return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    } catch (e) {
      return timeString;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: { xs: 2, md: 6 }, maxWidth: 1300, mx: 'auto', width: '110%', bgcolor: 'background.default' }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 5, fontWeight: 'bold', color: 'primary.dark' }}>
          <HealthAndSafetyIcon sx={{ fontSize: 40, mr: 1, verticalAlign: 'middle' }} /> Your Health Dashboard
        </Typography>

        {/* Patient Details Section */}
        <Box sx={{ mb: 5 }}>
          <SectionTitle variant="h5">
            <PersonIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Patient Information
          </SectionTitle>
          {loadingPatient && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 5 }}>
              <CircularProgress size={40} />
              <Typography variant="h6" sx={{ ml: 2 }}>Loading Patient Details...</Typography>
            </Box>
          )}

          {errorPatient && <Alert severity="error" sx={{ mb: 3 }}>{errorPatient}</Alert>}

          {patientDetails && (
            <PatientInfoCard elevation={0}>
              <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Avatar sx={{ bgcolor: 'secondary.main', width: 80, height: 80, mr: 3 }}>
                    <PersonIcon sx={{ fontSize: 50 }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.dark' }}>
                      {patientDetails.first_name} {patientDetails.last_name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Patient ID: {patientDetails._id}
                    </Typography>
                  </Box>
                </Box>
                <Grid container spacing={{ xs: 2, md: 4 }}>
                  <Grid item xs={12} sm={6}>
                    <StyledInfoBox>
                      <CakeIcon />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Date of Birth</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{formatDate(patientDetails.date_of_birth)}</Typography>
                      </Box>
                    </StyledInfoBox>
                    <StyledInfoBox>
                      <WcIcon />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Gender</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{patientDetails.gender}</Typography>
                      </Box>
                    </StyledInfoBox>
                    <StyledInfoBox>
                      <LocalPharmacyIcon />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Blood Group</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{patientDetails.blood_group}</Typography>
                      </Box>
                    </StyledInfoBox>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledInfoBox>
                      <PhoneIcon />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Contact Number</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{patientDetails.contact_number}</Typography>
                      </Box>
                    </StyledInfoBox>
                    <StyledInfoBox>
                      <LocationOnIcon />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Address</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{patientDetails.address}</Typography>
                      </Box>
                    </StyledInfoBox>
                    <StyledInfoBox>
                      <WarningIcon color="error" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Allergies</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{patientDetails.allergies || 'None'}</Typography>
                      </Box>
                    </StyledInfoBox>
                  </Grid>
                  <Grid item xs={12}>
                    <StyledInfoBox>
                      <MedicalInformationIcon />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Current Medications</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{patientDetails.current_medications || 'None'}</Typography>
                      </Box>
                    </StyledInfoBox>
                  </Grid>
                </Grid>
              </CardContent>
            </PatientInfoCard>
          )}
        </Box>

        {/* Appointments Section */}
        <Box>
          <SectionTitle variant="h5">
            <CalendarTodayIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Your Appointments
          </SectionTitle>

          {(loadingAppointments || loadingPatient) && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 5 }}>
              <CircularProgress size={40} />
              <Typography variant="h6" sx={{ ml: 2 }}>Loading Appointments...</Typography>
            </Box>
          )}

          {errorAppointments && <Alert severity="error" sx={{ mb: 3 }}>{errorAppointments}</Alert>}
          
          {!loadingAppointments && !errorAppointments && appointments.length === 0 && (
            <Alert severity="info" sx={{ mb: 3 }}>No appointments found.</Alert>
          )}

          {!loadingAppointments && !errorAppointments && appointments.length > 0 && (
            <Grid container spacing={4}>
              {appointments.map((appt) => (
                <Grid item xs={12} sm={6} md={4} key={appt._id}>
                  <Card
                    elevation={8}
                    sx={{
                      borderRadius: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderLeft: `5px solid ${theme.palette[getStatusColor(appt.status)].main}`,
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" color="primary.dark" sx={{ fontWeight: 700 }}>
                          Appointment
                        </Typography>
                        <Chip label={appt.status || 'Unknown'} color={getStatusColor(appt.status)} size="small" />
                      </Box>
                      <Divider sx={{ mb: 2 }} />
                      <Box>
                        <Typography variant="body1" color="text.primary" sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <CalendarTodayIcon fontSize="small" color="secondary" sx={{ mr: 1.5 }} />
                          <Box component="span">
                            <strong>Date:</strong> {formatDate(appt.appointmentDate)}
                          </Box>
                        </Typography>
                        <Typography variant="body1" color="text.primary" sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <AccessTimeIcon fontSize="small" color="secondary" sx={{ mr: 1.5 }} />
                          <Box component="span">
                            <strong>Time:</strong> {formatTime(appt.appointmentTime)}
                          </Box>
                        </Typography>
                        <Typography variant="body1" color="text.primary" sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <EventNoteIcon fontSize="small" color="secondary" sx={{ mr: 1.5 }} />
                          <Box component="span">
                            <strong>Reason:</strong> {appt.reasonForVisit || 'N/A'}
                          </Box>
                        </Typography>
                        <Typography variant="body1" color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
                          <MeetingRoomIcon fontSize="small" color="secondary" sx={{ mr: 1.5 }} />
                          <Box component="span">
                            <strong>Room:</strong> {appt.roomNumber || 'N/A'}
                          </Box>
                        </Typography>
                      </Box>
                    </CardContent>

                    <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
                      {appt.medicalRecordId && (
                        <Button
                          variant="contained"
                          size="small"
                          endIcon={<ArrowForwardIosIcon />}
                          onClick={() => onViewMedicalRecords(appt.medicalRecordId, appt._id)}
                          sx={{ bgcolor: 'secondary.main', '&:hover': { bgcolor: '#1a73e8' } }}
                        >
                          View Medical Record
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

MyHealthPage.propTypes = {
  patient: PropTypes.shape({
    userId: PropTypes.string.isRequired,
  }).isRequired,
  onViewMedicalRecords: PropTypes.func.isRequired,
};

export default MyHealthPage;