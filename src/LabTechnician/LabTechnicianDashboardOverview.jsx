// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import {
//   Box, Typography, Paper, Grid, Card, CardContent, CircularProgress,
//   Chip, Button, TextField, FormControl, InputLabel, Select, MenuItem
// } from '@mui/material';
// import EventNoteIcon from '@mui/icons-material/EventNote';
// import PersonIcon from '@mui/icons-material/Person';
// import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import DescriptionIcon from '@mui/icons-material/Description';
// import RoomIcon from '@mui/icons-material/Room';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import SearchIcon from '@mui/icons-material/Search'; // For search bar

// // Import the new medical records component - Make sure this path is correct
// import LabTechnicianMedicalRecords from './LabTechnicianMedicalRecords';

// const LabTechnicianAppointments = ({ labTechnician }) => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState(''); // State for search term
//   const [sortOption, setSortOption] = useState('date'); // State for sort option

//   // State to manage showing the medical records page
//   const [showMedicalRecordsPage, setShowMedicalRecordsPage] = useState(false);
//   const [selectedPatientIdForRecords, setSelectedPatientIdForRecords] = useState(null);
//   // State to store the doctor ID from the selected appointment, passed to MedicalRecords
//   const [selectedDoctorIdForRecords, setSelectedDoctorIdForRecords] = useState(null);

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const response = await fetch('http://localhost:2010/api/appointments');
//         if (!response.ok) {
//           throw new Error(`Failed to fetch appointments: ${response.status} ${response.statusText}`);
//         }
//         const data = await response.json();
//         console.log("Fetched appointments data:", data);

//         setAppointments(data); // Set unsorted data initially
//       } catch (err) {
//         console.error("Error fetching appointments:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, []); // Empty dependency array means this effect runs once on mount

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Scheduled': return 'info';
//       case 'Completed': return 'success';
//       case 'Cancelled': return 'error';
//       case 'Pending': return 'warning';
//       default: return 'default';
//     }
//   };

//   const handleViewMedicalRecords = (patientId, doctorId) => {
//     setSelectedPatientIdForRecords(patientId);
//     setSelectedDoctorIdForRecords(doctorId); // Store the doctor ID
//     setShowMedicalRecordsPage(true);
//   };

//   const handleBackToAppointments = () => {
//     setShowMedicalRecordsPage(false);
//     setSelectedPatientIdForRecords(null);
//     setSelectedDoctorIdForRecords(null); // Clear doctor ID on back
//   };

//   // Filter appointments based on search term for patient ID, doctor ID, or appointment ID
//   const filteredAppointments = appointments.filter(appointment => {
//     const lowerCaseSearchTerm = searchTerm.toLowerCase();

//     // Ensure all IDs are converted to strings before calling toLowerCase()
//     // Use optional chaining (?) and nullish coalescing (?? '') for robustness
//     const appointmentId = (appointment.customId || appointment.id || '').toString().toLowerCase();
//     const patientId = (appointment.patientId || '').toString().toLowerCase();
//     const doctorId = (appointment.doctorId || '').toString().toLowerCase();

//     return (
//       patientId.includes(lowerCaseSearchTerm) ||
//       doctorId.includes(lowerCaseSearchTerm) ||
//       appointmentId.includes(lowerCaseSearchTerm)
//     );
//   });

//   // Sort appointments based on sort option
//   const sortedAppointments = [...filteredAppointments].sort((a, b) => {
//     switch (sortOption) {
//       case 'date':
//         const dateA = new Date(a.appointmentDate);
//         const dateB = new Date(b.appointmentDate);
//         if (dateA - dateB !== 0) {
//           return dateA - dateB;
//         }
//         // Then sort by time if dates are the same.
//         // Assuming appointmentTime is in a sortable string format like "HH:MM" or "HH:MM:SS"
//         return (a.appointmentTime || '').localeCompare(b.appointmentTime || '');
//       case 'patientId':
//         return (a.patientId || '').localeCompare(b.patientId || '');
//       case 'doctorId':
//         return (a.doctorId || '').localeCompare(b.doctorId || '');
//       case 'status':
//         return (a.status || '').localeCompare(b.status || '');
//       default:
//         return 0;
//     }
//   });

//   if (loading) {
//     return (
//       <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', width: '100%', textAlign: 'center' }}>
//         <CircularProgress sx={{ mt: 5 }} />
//         <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
//           Loading appointments...
//         </Typography>
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', width: '100%', textAlign: 'center' }}>
//         <Typography variant="h6" color="error" sx={{ mt: 5 }}>
//           Error: {error}
//         </Typography>
//         <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
//           Failed to load appointments. Please try again later.
//         </Typography>
//       </Box>
//     );
//   }

//   // Conditionally render the Medical Records page
//   if (showMedicalRecordsPage && selectedPatientIdForRecords) {
//     return (
//       <LabTechnicianMedicalRecords
//         patientId={selectedPatientIdForRecords}
//         doctorIdFromAppointment={selectedDoctorIdForRecords} // Pass the doctor ID here
//         onBack={handleBackToAppointments}
//         labTechnician={labTechnician}
//       />
//     );
//   }

//   return (
//     <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', width: '100%' }}>
//       <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.dark' }}>
//         Lab Technician Appointments
//       </Typography>

//       {/* Search and Sort Bars */}
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
//         <TextField
//           label="Search by Patient/Doctor/Appointment ID"
//           variant="outlined"
//           size="small"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <SearchIcon sx={{ mr: 1, color: 'action.active' }} />
//             ),
//           }}
//           sx={{ flexGrow: 1, minWidth: { xs: '100%', sm: 'auto' } }}
//         />
//         <FormControl variant="outlined" size="small" sx={{ minWidth: { xs: '100%', sm: 150 } }}>
//           <InputLabel id="sort-by-label">Sort By</InputLabel>
//           <Select
//             labelId="sort-by-label"
//             value={sortOption}
//             onChange={(e) => setSortOption(e.target.value)}
//             label="Sort By"
//           >
//             <MenuItem value="date">Date & Time</MenuItem>
//             <MenuItem value="patientId">Patient ID</MenuItem>
//             <MenuItem value="doctorId">Doctor ID</MenuItem>
//             <MenuItem value="status">Status</MenuItem>
//           </Select>
//         </FormControl>
//       </Box>

//       {sortedAppointments.length === 0 && searchTerm !== '' ? (
//         <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, background: 'linear-gradient(145deg, #ffffff, #f0f2f5)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', textAlign: 'center' }}>
//           <Typography variant="h6" color="text.secondary">
//             No appointments found matching your search.
//           </Typography>
//         </Paper>
//       ) : sortedAppointments.length === 0 ? (
//         <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, background: 'linear-gradient(145deg, #ffffff, #f0f2f5)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', textAlign: 'center' }}>
//           <Typography variant="h6" color="text.secondary">
//             No appointments found.
//           </Typography>
//           <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
//             Check back later for new appointments.
//           </Typography>
//         </Paper>
//       ) : (
//         <Grid container spacing={4} justifyContent="center">
//           {sortedAppointments.map((appointment) => (
//             <Grid item xs={12} sm={6} md={4} key={appointment.id}>
//               <Card elevation={6} sx={{
//                 borderRadius: 3,
//                 p: 2,
//                 background: 'linear-gradient(145deg, #ffffff, #f0f2f5)',
//                 boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'space-between',
//               }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
//                     Appointment ID: {appointment.customId || appointment.id.substring(0, 5)}
//                   </Typography>
//                   <Chip
//                     label={appointment.status}
//                     color={getStatusColor(appointment.status)}
//                     size="small"
//                     sx={{ mb: 2, fontWeight: 'bold' }}
//                   />

//                   <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                     <CalendarTodayIcon fontSize="small" color="action" sx={{ mr: 1 }} />
//                     <Typography variant="body2" color="text.secondary">
//                       <strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}
//                     </Typography>
//                   </Box>
//                   <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                     <AccessTimeIcon fontSize="small" color="action" sx={{ mr: 1 }} />
//                     <Typography variant="body2" color="text.secondary">
//                       {/* Assuming appointmentTime is an ISO string or similar that Date constructor can parse */}
//                       <strong>Time:</strong> {new Date(`2000-01-01T${appointment.appointmentTime}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </Typography>
//                   </Box>
//                   <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                     <PersonIcon fontSize="small" color="action" sx={{ mr: 1 }} />
//                     <Typography variant="body2" color="text.secondary">
//                       <strong>Patient ID:</strong> {appointment.patientId}
//                     </Typography>
//                   </Box>
//                   <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                     <MedicalInformationIcon fontSize="small" color="action" sx={{ mr: 1 }} />
//                     <Typography variant="body2" color="text.secondary">
//                       <strong>Doctor ID:</strong> {appointment.doctorId}
//                     </Typography>
//                   </Box>
//                   <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
//                     <DescriptionIcon fontSize="small" color="action" sx={{ mr: 1, mt: 0.5 }} />
//                     <Typography variant="body2" color="text.secondary">
//                       <strong>Reason:</strong> {appointment.reasonForVisit || 'N/A'}
//                     </Typography>
//                   </Box>
//                   <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                     <RoomIcon fontSize="small" color="action" sx={{ mr: 1 }} />
//                     <Typography variant="body2" color="text.secondary">
//                       <strong>Room:</strong> {appointment.roomNumber || 'N/A'}
//                     </Typography>
//                   </Box>
//                   {appointment.notes && (
//                     <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
//                       <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
//                         <strong>Notes:</strong> {appointment.notes}
//                       </Typography>
//                     </Box>
//                   )}
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     startIcon={<VisibilityIcon />}
//                     onClick={() => handleViewMedicalRecords(appointment.patientId, appointment.doctorId)} // Pass doctorId here
//                     sx={{ mt: 2, width: '100%' }}
//                   >
//                     View Medical Records
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}

//       <Box sx={{ mt: 6, opacity: 0.7, textAlign: 'center' }}>
//         <Typography variant="body2" color="text.secondary">
//           This dashboard provides an overview of appointments for lab technicians.
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// LabTechnicianAppointments.propTypes = {
//   labTechnician: PropTypes.shape({
//     userId: PropTypes.string,
//     name: PropTypes.string,
//     email: PropTypes.string,
//     profilePic: PropTypes.string,
//   }),
// };

// export default LabTechnicianAppointments;
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Typography, Paper, Grid, Card, CardContent, CircularProgress,
  Chip, Button, TextField, FormControl, InputLabel, Select, MenuItem,
  InputAdornment
} from '@mui/material';
import { styled, useTheme } from '@mui/system';

// Icons
import EventNoteIcon from '@mui/icons-material/EventNote';
import PersonIcon from '@mui/icons-material/Person';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';
import RoomIcon from '@mui/icons-material/Room';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Import the new medical records component - Make sure this path is correct
import LabTechnicianMedicalRecords from './LabTechnicianMedicalRecords';

// --- Styled Components for a more refined and beautiful aesthetic ---

const PageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 1400,
  margin: 'auto',
  width: '100%',
  backgroundColor: theme.palette.background.default, 
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(3),
  background: theme.palette.mode === 'light' 
    ? 'linear-gradient(145deg, #ffffff, #f0f2f5)' 
    : 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
  boxShadow: '0 12px 28px rgba(0,0,0,0.1), 0 6px 10px rgba(0,0,0,0.06)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 18px 36px rgba(0,0,0,0.15), 0 9px 15px rgba(0,0,0,0.09)',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  position: 'relative',
  fontSize: '2.5rem',
  letterSpacing: '0.05em',
  '&:after': {
    content: '""',
    display: 'block',
    width: '80px',
    height: '5px',
    background: theme.palette.secondary.main,
    margin: '12px auto 0',
    borderRadius: '2.5px',
  },
}));

const InfoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(1.5),
  color: theme.palette.text.secondary,
}));

const InfoText = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '1rem',
  marginLeft: theme.spacing(1),
}));

const NoResultsPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: theme.shape.borderRadius * 3,
  background: theme.palette.mode === 'light' 
    ? 'linear-gradient(145deg, #e3f2fd, #bbdefb)'
    : 'linear-gradient(145deg, #2c3e50, #34495e)',
  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
  textAlign: 'center',
  marginTop: theme.spacing(6),
  border: `1px solid ${theme.palette.divider}`,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  width: '100%',
  py: 1.5,
  fontWeight: 700,
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
  }
}));

// --- Main Component ---

const LabTechnicianAppointments = ({ labTechnician }) => {
  const theme = useTheme();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('date');

  const [showMedicalRecordsPage, setShowMedicalRecordsPage] = useState(false);
  const [selectedAppointmentForRecords, setSelectedAppointmentForRecords] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('http://localhost:2010/api/appointments');
        if (!response.ok) {
          throw new Error(`Failed to fetch appointments: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched appointments data:", data);
        setAppointments(data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled': return 'info';
      case 'Completed': return 'success';
      case 'Cancelled': return 'error';
      case 'Pending': return 'warning';
      default: return 'default';
    }
  };

  const handleViewMedicalRecords = (appointment) => {
    console.log("Setting appointment for medical records view:", appointment);
    setSelectedAppointmentForRecords(appointment);
    setShowMedicalRecordsPage(true);
  };

  const handleBackToAppointments = () => {
    setShowMedicalRecordsPage(false);
    setSelectedAppointmentForRecords(null);
  };

  const filteredAppointments = appointments.filter(appointment => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const appointmentId = (appointment.customId || appointment.id || '').toString().toLowerCase();
    const patientId = (appointment.patientId || '').toString().toLowerCase();
    const doctorId = (appointment.doctorId || '').toString().toLowerCase();
    const reasonForVisit = (appointment.reasonForVisit || '').toLowerCase(); // New line

    return (
      patientId.includes(lowerCaseSearchTerm) ||
      doctorId.includes(lowerCaseSearchTerm) ||
      appointmentId.includes(lowerCaseSearchTerm) ||
      reasonForVisit.includes(lowerCaseSearchTerm) // New line
    );
  });

  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    switch (sortOption) {
      case 'date':
        const dateA = new Date(a.appointmentDate);
        const dateB = new Date(b.appointmentDate);
        if (dateA - dateB !== 0) {
          return dateA - dateB;
        }
        const timeA = a.appointmentTime ? new Date(a.appointmentTime).getTime() : 0;
        const timeB = b.appointmentTime ? new Date(b.appointmentTime).getTime() : 0;
        return timeA - timeB;
      case 'patientId':
        return (a.patientId || '').localeCompare(b.patientId || '');
      case 'doctorId':
        return (a.doctorId || '').localeCompare(b.doctorId || '');
      case 'status':
        return (a.status || '').localeCompare(b.status || '');
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <PageContainer sx={{ textAlign: 'center' }}>
        <CircularProgress size={60} sx={{ mt: 10, color: theme.palette.primary.main }} />
        <Typography variant="h6" color="text.secondary" sx={{ mt: 3, fontWeight: 'medium' }}>
          Fetching appointments...
        </Typography>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer sx={{ textAlign: 'center' }}>
        <Typography variant="h6" color="error" sx={{ mt: 10, fontWeight: 'bold' }}>
          Error: {error}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          Failed to load appointments. Please check your network and try again.
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={handleBackToAppointments}
          sx={{ mt: 3, backgroundColor: theme.palette.error.main, '&:hover': { backgroundColor: theme.palette.error.dark } }}
        >
          Back to Appointments
        </Button>
      </PageContainer>
    );
  }

  if (showMedicalRecordsPage && selectedAppointmentForRecords) {
    return (
      <LabTechnicianMedicalRecords
        patientId={selectedAppointmentForRecords.patientId}
        doctorIdFromAppointment={selectedAppointmentForRecords.doctorId}
        onBack={handleBackToAppointments}
        labTechnician={labTechnician}
        appointmentId={selectedAppointmentForRecords}
      />
    );
  }

  return (
    <PageContainer>
      <SectionTitle variant="h4">
        Lab Technician Appointments Overview
      </SectionTitle>

      {/* Search and Sort Controls */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          gap: 2,
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <TextField
          label="Search appointments" // Updated label
          variant="outlined"
          size="medium"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ flexGrow: 1, minWidth: { xs: '100%', sm: 'auto' } }}
        />
        <FormControl variant="outlined" size="medium" sx={{ minWidth: { xs: '100%', sm: 180 } }}>
          <InputLabel id="sort-by-label">Sort By</InputLabel>
          <Select
            labelId="sort-by-label"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            label="Sort By"
            startAdornment={
              <InputAdornment position="start">
                <SortIcon color="action" />
              </InputAdornment>
            }
          >
            <MenuItem value="date">Date & Time</MenuItem>
            <MenuItem value="patientId">Patient ID</MenuItem>
            <MenuItem value="doctorId">Doctor ID</MenuItem>
            <MenuItem value="status">Status</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Conditional Rendering for No Appointments */}
      {sortedAppointments.length === 0 && searchTerm !== '' ? (
        <NoResultsPaper elevation={6}>
          <Typography variant="h6" color="text.secondary">
            <SearchIcon sx={{ fontSize: 50, mb: 2, color: theme.palette.action.disabled }} />
            <br />
            No appointments found matching your search criteria.
          </Typography>
        </NoResultsPaper>
      ) : sortedAppointments.length === 0 ? (
        <NoResultsPaper elevation={6}>
          <Typography variant="h6" color="text.secondary">
            <EventNoteIcon sx={{ fontSize: 50, mb: 2, color: theme.palette.action.disabled }} />
            <br />
            No appointments available at the moment.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Check back later for new appointments.
          </Typography>
        </NoResultsPaper>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {sortedAppointments.map((appointment) => (
            <Grid item xs={12} sm={6} md={4} key={appointment.id}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
                    <EventNoteIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Appointment ID: {appointment.customId || appointment.id.substring(0, 8)}
                  </Typography>
                  <Chip
                    label={appointment.status}
                    color={getStatusColor(appointment.status)}
                    size="medium"
                    sx={{ mb: 2, fontWeight: 700, px: 1, textTransform: 'uppercase' }}
                  />
                  <Box mt={2}>
                    <InfoBox>
                      <CalendarTodayIcon fontSize="small" color="primary" />
                      <InfoText>
                        Date: {appointment.appointmentDate
                          ? new Date(appointment.appointmentDate).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })
                          : 'N/A'}
                      </InfoText>
                    </InfoBox>
                    <InfoBox>
                      <AccessTimeIcon fontSize="small" color="primary" />
                      <InfoText>
                        Time: {
                          appointment.appointmentTime
                            ? new Date(appointment.appointmentTime).toLocaleTimeString('en-IN', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                              })
                            : 'N/A'
                        }
                      </InfoText>
                    </InfoBox>
                    <InfoBox>
                      <PersonIcon fontSize="small" color="primary" />
                      <InfoText>
                        Patient ID: {appointment.patientId}
                      </InfoText>
                    </InfoBox>
                    <InfoBox>
                      <MedicalInformationIcon fontSize="small" color="primary" />
                      <InfoText>
                        Doctor ID: {appointment.doctorId}
                      </InfoText>
                    </InfoBox>
                    <InfoBox sx={{ alignItems: 'flex-start' }}>
                      <DescriptionIcon fontSize="small" color="primary" />
                      <InfoText>
                        Reason: {appointment.reasonForVisit || 'N/A'}
                      </InfoText>
                    </InfoBox>
                    <InfoBox>
                      <RoomIcon fontSize="small" color="primary" />
                      <InfoText>
                        Room: {appointment.roomNumber || 'N/A'}
                      </InfoText>
                    </InfoBox>
                  </Box>
                  <StyledButton
                    variant="contained"
                    color="primary"
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleViewMedicalRecords(appointment)}
                  >
                    View Medical Records
                  </StyledButton>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ mt: 6, opacity: 0.7, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Last updated: August 2025. This dashboard provides an overview of appointments for lab technicians.
        </Typography>
      </Box>
    </PageContainer>
  );
};

LabTechnicianAppointments.propTypes = {
  labTechnician: PropTypes.shape({
    userId: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    profilePic: PropTypes.string,
  }),
};

export default LabTechnicianAppointments;