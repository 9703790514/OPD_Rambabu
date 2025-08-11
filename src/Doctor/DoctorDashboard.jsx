// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Avatar from '@mui/material/Avatar';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import CircularProgress from '@mui/material/CircularProgress';

// import DashboardIcon from '@mui/icons-material/Dashboard';
// import GroupIcon from '@mui/icons-material/Group';
// import EventNoteIcon from '@mui/icons-material/EventNote';
// import DateRangeIcon from '@mui/icons-material/DateRange';
// import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import SettingsIcon from '@mui/icons-material/Settings';
// import LogoutIcon from '@mui/icons-material/Logout';
// import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';

// // Import Doctor specific page components
// import DoctorDashboardOverview from './DoctorDashboardOverview';
// import DoctorPatientList from './DoctorPatientList';
// import DoctorAppointments from './DoctorAppointments';
// import DoctorPrescriptions from './DoctorPrescriptions';
// import DoctorMySchedule from './DoctorMySchedule';
// import DoctorSettings from './DoctorSettings';
// import DoctorTodayAppointments from './DoctorTodayAppointments';
// import DoctorMedicalRecordsPage from './DoctorMedicalRecordsPage';
// import DoctorPrescriptionsPage from './DoctorPrescriptionsPage';
// import DoctorDiagnosticTestsPage from './DoctorDiagnosticTestsPage';

// // Utility to generate a consistent color from a string for avatar background
// function stringToColor(string) {
//   let hash = 0;
//   for (let i = 0; i < string.length; i += 1) {
//     hash = string.charCodeAt(i) + ((hash << 5) - hash);
//   }
//   let color = '#';
//   for (let i = 0; i < 3; i += 1) {
//     const value = (hash >> (i * 8)) & 0xff;
//     color += `00${value.toString(16)}`.slice(-2);
//   }
//   return color;
// }

// // Utility to create Avatar props with initials fallback
// function stringAvatar(name) {
//   const initials = name
//     ? name.split(' ').map(n => n[0]).join('').toUpperCase()
//     : 'DR'; // Default for Doctor initials
//   return {
//     sx: { bgcolor: stringToColor(name || 'Default Doctor') },
//     children: initials,
//   };
// }

// // --- Navigation items for Doctor Dashboard ---
// const DOCTOR_NAVIGATION = [
//   { kind: 'header', title: 'Doctor Navigation' },
//   { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
//   { segment: 'patient-list', title: 'Patient List', icon: <GroupIcon /> },
//   { segment: 'appointments', title: 'All Appointments', icon: <EventNoteIcon /> },
//   { segment: 'today-appointments', title: 'Today\'s Appointments', icon: <DateRangeIcon /> },
//   { segment: 'prescriptions', title: 'Prescriptions', icon: <LocalPharmacyIcon /> },
//   { segment: 'my-schedule', title: 'My Schedule', icon: <CalendarTodayIcon /> },
//   { segment: 'settings', title: 'Settings', icon: <SettingsIcon /> },
// ];

// // --- Custom Material-UI Theme (reused for consistency) ---
// const theme = createTheme({
//   palette: {
//     mode: 'light',
//     primary: {
//       main: '#1976d2', // Calming Blue (hospital-friendly)
//       contrastText: '#fff',
//     },
//     secondary: {
//       main: '#388e3c', // Green for action / confirmation
//     },
//     background: {
//       default: '#f5f7fa',
//       paper: '#ffffff',
//     },
//     error: {
//       main: '#d32f2f', // Red for errors/warnings
//     },
//     text: {
//       primary: '#202124',
//       secondary: '#5f6368',
//     },
//     info: { main: '#03a9f4' },
//     success: { main: '#4caf50' },
//     warning: { main: '#ff9800' },
//   },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     h6: {
//       fontWeight: 600,
//       fontSize: '1.25rem',
//     },
//     body1: {
//       fontSize: '1rem',
//     },
//   },
//   components: {
//     MuiTypography: {
//       styleOverrides: {
//         root: {
//           lineHeight: 1.5,
//         },
//       },
//     },
//   },
// });

// // --- Profile Menu Component (reused and adapted for Doctor) ---
// function DoctorProfileMenu({ user, onLogout, onProfilePicChange, loading }) {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);

//   const handleOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       onProfilePicChange(e.target.files[0]);
//       handleClose();
//     }
//   };

//   if (loading) {
//     return (
//       <Box sx={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//         <CircularProgress size={24} color="inherit" />
//       </Box>
//     );
//   }

//   return (
//     <>
//       <Tooltip title="Open Profile Menu">
//         <IconButton
//           onClick={handleOpen}
//           size="small"
//           sx={{ ml: 2 }}
//           aria-controls={open ? 'profile-menu' : undefined}
//           aria-haspopup="true"
//           aria-expanded={open ? 'true' : undefined}
//           aria-label="User profile menu"
//         >
//           {user.profilePic ? (
//             <Avatar alt={user.name} src={user.profilePic} sx={{ width: 40, height: 40 }} />
//           ) : (
//             <Avatar {...stringAvatar(user.name)} sx={{ width: 40, height: 40 }} />
//           )}
//         </IconButton>
//       </Tooltip>

//       <Menu
//         id="profile-menu"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         onClick={handleClose}
//         PaperProps={{
//           elevation: 4,
//           sx: {
//             mt: 1.5,
//             minWidth: 240,
//             p: 2,
//             boxShadow:
//               'rgb(0 0 0 / 0.2) 0px 2px 8px',
//           },
//         }}
//         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//       >
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//           {user.profilePic ? (
//             <Avatar alt={user.name} src={user.profilePic} sx={{ width: 64, height: 64, mr: 2 }} />
//           ) : (
//             <Avatar {...stringAvatar(user.name)} sx={{ width: 64, height: 64, mr: 2 }} />
//           )}
//           <Box>
//             <Typography variant="h6" noWrap>
//               {user.name}
//             </Typography>
//             <Typography variant="body2" color="text.secondary" noWrap>
//               {user.email}
//             </Typography>
//           </Box>
//         </Box>

//         <MenuItem>
//           <label htmlFor="upload-profile-pic" style={{ cursor: 'pointer', width: '100%' }}>
//             Change Profile Picture
//           </label>
//           <input
//             id="upload-profile-pic"
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             style={{ display: 'none' }}
//           />
//         </MenuItem>

//         <Divider sx={{ my: 1 }} />

//         <MenuItem
//           onClick={() => {
//             onLogout();
//           }}
//           sx={{ color: 'error.main' }}
//         >
//           <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
//           Logout
//         </MenuItem>
//       </Menu>
//     </>
//   );
// }

// DoctorProfileMenu.propTypes = {
//   user: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     profilePic: PropTypes.string,
//   }).isRequired,
//   onLogout: PropTypes.func.isRequired,
//   onProfilePicChange: PropTypes.func.isRequired,
//   loading: PropTypes.bool,
// };

// // --- Content for the Dashboard Pages (adapted for Doctor) ---
// function DoctorDashboardPageContent({ currentSegment, loading, doctorUser, selectedMedicalRecordId, onNavigate }) {
//   if (loading) {
//     return (
//       <Box
//         sx={{
//           width: '100%',
//           height: '100%',
//           minHeight: '100vh',
//           minWidth: '100vw',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           p: 0,
//           m: 0,
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   switch (currentSegment) {
//     case 'dashboard': return <DoctorDashboardOverview doctorUser={doctorUser} />;
//     case 'patient-list': return <DoctorPatientList doctorUser={doctorUser} />;
//     case 'appointments': return <DoctorAppointments doctorUser={doctorUser} />;
//     case 'today-appointments':
//       return (
//         <DoctorTodayAppointments
//           doctorUser={doctorUser}
//           onViewMedicalRecords={(medicalRecordId) => {
//             onNavigate(`medical-records-detail/${medicalRecordId}`);
//           }}
//         />
//       );
//     case 'medical-records-detail':
//       // Ensure onNavigate is passed here
//       if (selectedMedicalRecordId) {
//         return <DoctorMedicalRecordsPage medicalRecordId={selectedMedicalRecordId} onBack={() => onNavigate('today-appointments')} onNavigate={onNavigate} />;
//       }
//       return <Alert severity="error">Medical Record ID not found for medical records.</Alert>;
//     case 'prescriptions-detail':
//       // Ensure onNavigate is passed here
//       if (selectedMedicalRecordId) {
//         return <DoctorPrescriptionsPage medicalRecordId={selectedMedicalRecordId} onBack={() => onNavigate(`medical-records-detail/${selectedMedicalRecordId}`)} />;
//       }
//       return <Alert severity="error">Medical Record ID not found for prescriptions.</Alert>;
//     case 'diagnostic-tests-detail':
//       // Ensure onNavigate is passed here
//       if (selectedMedicalRecordId) {
//         return <DoctorDiagnosticTestsPage medicalRecordId={selectedMedicalRecordId} onBack={() => onNavigate(`medical-records-detail/${selectedMedicalRecordId}`)} />;
//       }
//       return <Alert severity="error">Medical Record ID not found for diagnostic tests.</Alert>;
//     case 'prescriptions': return <DoctorPrescriptions doctorUser={doctorUser} />;
//     case 'my-schedule': return <DoctorMySchedule doctorUser={doctorUser} />;
//     case 'settings': return <DoctorSettings doctorUser={doctorUser} />;
//     default:
//       return (
//         <Box
//           sx={{
//             py: 6,
//             px: 3,
//             maxWidth: 960,
//             mx: 'auto',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             bgcolor: '#fff',
//             borderRadius: 2,
//             boxShadow:
//               '0 1px 3px rgb(0 0 0 / 0.1), 0 1px 2px rgb(0 0 0 / 0.06)',
//           }}
//         >
//           <Typography variant="h4" gutterBottom>
//             Page Not Found
//           </Typography>
//           <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, textAlign: 'center' }}>
//             The page you are looking for does not exist.
//           </Typography>
//         </Box>
//       );
//   }
// }

// DoctorDashboardPageContent.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   loading: PropTypes.bool,
//   doctorUser: PropTypes.shape({
//     userId: PropTypes.string,
//     name: PropTypes.string,
//     email: PropTypes.string,
//     profilePic: PropTypes.string,
//   }),
//   selectedMedicalRecordId: PropTypes.string,
//   onNavigate: PropTypes.func.isRequired,
// };

// // --- Navigation Sidebar Component ---
// function DoctorNavigationMenu({ currentSegment, onNavigate }) {
//   return (
//     <List sx={{ width: 240, bgcolor: 'background.paper', height: '100vh', borderRight: 1, borderColor: 'divider' }}>
//       {DOCTOR_NAVIGATION.map((item, index) => {
//         if (item.kind === 'header') {
//           return (
//             <Typography key={index} variant="subtitle1" sx={{ mt: 2, mb: 1, px: 2, fontWeight: 'bold' }}>
//               {item.title}
//             </Typography>
//           );
//         }
//         return (
//           <ListItemButton
//             key={item.segment}
//             selected={currentSegment === item.segment}
//             onClick={() => onNavigate(item.segment)}
//           >
//             <ListItemIcon>{item.icon}</ListItemIcon>
//             <ListItemText primary={item.title} />
//           </ListItemButton>
//         );
//       })}
//     </List>
//   );
// }

// DoctorNavigationMenu.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   onNavigate: PropTypes.func.isRequired,
// };

// // --- Main Doctor Dashboard Component ---
// export const DoctorDashboard = () => {
//   const [currentSegment, setCurrentSegment] = useState('dashboard');
//   const [selectedMedicalRecordId, setSelectedMedicalRecordId] = useState(null);

//   const [doctorUser, setDoctorUser] = useState({
//     userId: '',
//     name: '',
//     email: '',
//     profilePic: '',
//   });
//   const [loadingDoctorData, setLoadingDoctorData] = useState(true);

//   useEffect(() => {
//     const loadDoctorData = async () => {
//       setLoadingDoctorData(true);

//       const storedUserId = sessionStorage.getItem('userId');
//       const storedUsername = sessionStorage.getItem('username');
//       const storedEmail = sessionStorage.getItem('email');
//       const storedProfilePic = sessionStorage.getItem('profilePic');

//       if (storedUserId && storedUsername && storedEmail) {
//         setDoctorUser({
//           userId: storedUserId,
//           name: storedUsername,
//           email: storedEmail,
//           profilePic: storedProfilePic || 'http://localhost:2004/default-doctor.png',
//         });
//       } else {
//         window.location.href = '/login';
//       }
//       setLoadingDoctorData(false);
//     };
//     loadDoctorData();
//   }, []);

//   const handleLogout = () => {
//     sessionStorage.clear();
//     window.location.href = '/login';
//   };

//   const handleProfilePicChange = async (file) => {
//     const newPicUrl = URL.createObjectURL(file);
//     setDoctorUser((prev) => ({ ...prev, profilePic: newPicUrl }));
//     console.log('Profile picture changed locally. (Doctor)');
//   };

//   const handleNavigationChange = (segment) => {
//     if (segment.startsWith('medical-records-detail/')) {
//       const medicalRecordId = segment.split('/')[1];
//       setSelectedMedicalRecordId(medicalRecordId);
//       setCurrentSegment('medical-records-detail');
//     } else if (segment.startsWith('prescriptions-detail/')) {
//       const medicalRecordId = segment.split('/')[1];
//       setSelectedMedicalRecordId(medicalRecordId);
//       setCurrentSegment('prescriptions-detail');
//     } else if (segment.startsWith('diagnostic-tests-detail/')) {
//       const medicalRecordId = segment.split('/')[1];
//       setSelectedMedicalRecordId(medicalRecordId);
//       setCurrentSegment('diagnostic-tests-detail');
//     }
//     else {
//       setSelectedMedicalRecordId(null);
//       setCurrentSegment(segment.startsWith('/') ? segment.slice(1) : segment);
//     }
//     console.log('Navigating to segment:', segment);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box
//         sx={{
//           width: '100vw',
//           height: '100vh',
//           p: 0,
//           m: 0,
//           display: 'flex',
//           flexDirection: 'column',
//           overflow: 'hidden',
//         }}
//       >
//         <AppProvider
//           navigation={DOCTOR_NAVIGATION}
//           router={{
//             pathname: currentSegment,
//             navigate: handleNavigationChange,
//           }}
//           theme={theme}
//           branding={{ title: 'Sarvotham\'s Spine Care - Doctor' }}
//         >
//           <DashboardLayout
//             sx={{ flex: 1, p: 0, m: 0, height: '100%' }}
//             slots={{
//               drawerContent: () => (
//                 <DoctorNavigationMenu
//                   currentSegment={currentSegment}
//                   onNavigate={handleNavigationChange}
//                 />
//               ),
//               toolbarAccount: () => (
//                 <DoctorProfileMenu
//                   user={doctorUser}
//                   onLogout={handleLogout}
//                   onProfilePicChange={handleProfilePicChange}
//                   loading={loadingDoctorData}
//                 />
//               ),
//             }}
//           >
//             <DoctorDashboardPageContent
//               currentSegment={currentSegment}
//               loading={loadingDoctorData}
//               doctorUser={doctorUser}
//               selectedMedicalRecordId={selectedMedicalRecordId}
//               onNavigate={handleNavigationChange}
//             />
//           </DashboardLayout>
//         </AppProvider>
//       </Box>
//     </ThemeProvider>
//   );
// };

// DoctorDashboard.propTypes = {
//   // window: PropTypes.func,
// };

// export default DoctorDashboard;
// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Avatar from '@mui/material/Avatar';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import CircularProgress from '@mui/material/CircularProgress';
// import Alert from '@mui/material/Alert'; // Added Alert for consistency

// import DashboardIcon from '@mui/icons-material/Dashboard';
// import GroupIcon from '@mui/icons-material/Group';
// import EventNoteIcon from '@mui/icons-material/EventNote';
// import DateRangeIcon from '@mui/icons-material/DateRange';
// import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import SettingsIcon from '@mui/icons-material/Settings';
// import LogoutIcon from '@mui/icons-material/Logout';
// import MedicalInformationIcon from '@mui/icons-material/MedicalInformation'; // Icon for Medical Records list

// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';

// // Import Doctor specific page components
// import DoctorDashboardOverview from './DoctorDashboardOverview';
// import DoctorPatientList from './DoctorPatientList';
// import DoctorAppointments from './DoctorAppointments';
// import DoctorPrescriptions from './DoctorPrescriptions';
// import DoctorMySchedule from './DoctorMySchedule';
// import DoctorSettings from './DoctorSettings';
// import DoctorTodayAppointments from './DoctorTodayAppointments';
// import DoctorMedicalRecordsPage from './DoctorMedicalRecordsPage'; // Specific medical record detail page
// import DoctorPrescriptionsPage from './DoctorPrescriptionsPage'; // Specific prescriptions page
// import DoctorDiagnosticTestsPage from './DoctorDiagnosticTestsPage'; // Specific diagnostic tests page
// import DoctorMedicalRecords from './DoctorMedicalRecords'; // The list of appointments with medical records

// // Utility to generate a consistent color from a string for avatar background
// function stringToColor(string) {
//   let hash = 0;
//   for (let i = 0; i < string.length; i += 1) {
//     hash = string.charCodeAt(i) + ((hash << 5) - hash);
//   }
//   let color = '#';
//   for (let i = 0; i < 3; i += 1) {
//     const value = (hash >> (i * 8)) & 0xff;
//     color += `00${value.toString(16)}`.slice(-2);
//   }
//   return color;
// }

// // Utility to create Avatar props with initials fallback
// function stringAvatar(name) {
//   const initials = name
//     ? name.split(' ').map(n => n[0]).join('').toUpperCase()
//     : 'DR'; // Default for Doctor initials
//   return {
//     sx: { bgcolor: stringToColor(name || 'Default Doctor') },
//     children: initials,
//   };
// }

// // --- Navigation items for Doctor Dashboard ---
// const DOCTOR_NAVIGATION = [
//   { kind: 'header', title: 'Doctor Navigation' },
//   { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
//   { segment: 'patient-list', title: 'Patient List', icon: <GroupIcon /> },
//   { segment: 'appointments', title: 'All Appointments', icon: <EventNoteIcon /> },
//   { segment: 'today-appointments', title: 'Today\'s Appointments', icon: <DateRangeIcon /> },
//   { segment: 'medical-records', title: 'Medical Records', icon: <MedicalInformationIcon /> }, // Added for the list view
//   { segment: 'prescriptions', title: 'Prescriptions', icon: <LocalPharmacyIcon /> },
//   { segment: 'my-schedule', title: 'My Schedule', icon: <CalendarTodayIcon /> },
//   { segment: 'settings', title: 'Settings', icon: <SettingsIcon /> },
// ];

// // --- Custom Material-UI Theme (reused for consistency) ---
// const theme = createTheme({
//   palette: {
//     mode: 'light',
//     primary: {
//       main: '#1976d2', // Calming Blue (hospital-friendly)
//       contrastText: '#fff',
//     },
//     secondary: {
//       main: '#388e3c', // Green for action / confirmation
//     },
//     background: {
//       default: '#f5f7fa',
//       paper: '#ffffff',
//     },
//     error: {
//       main: '#d32f2f', // Red for errors/warnings
//     },
//     text: {
//       primary: '#202124',
//       secondary: '#5f6368',
//     },
//     info: { main: '#03a9f4' },
//     success: { main: '#4caf50' },
//     warning: { main: '#ff9800' },
//   },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     h6: {
//       fontWeight: 600,
//       fontSize: '1.25rem',
//     },
//     body1: {
//       fontSize: '1rem',
//     },
//   },
//   components: {
//     MuiTypography: {
//       styleOverrides: {
//         root: {
//           lineHeight: 1.5,
//         },
//       },
//     },
//   },
// });

// // --- Profile Menu Component (reused and adapted for Doctor) ---
// function DoctorProfileMenu({ user, onLogout, onProfilePicChange, loading }) {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);

//   const handleOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       onProfilePicChange(e.target.files[0]);
//       handleClose();
//     }
//   };

//   if (loading) {
//     return (
//       <Box sx={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//         <CircularProgress size={24} color="inherit" />
//       </Box>
//     );
//   }

//   return (
//     <>
//       <Tooltip title="Open Profile Menu">
//         <IconButton
//           onClick={handleOpen}
//           size="small"
//           sx={{ ml: 2 }}
//           aria-controls={open ? 'profile-menu' : undefined}
//           aria-haspopup="true"
//           aria-expanded={open ? 'true' : undefined}
//           aria-label="User profile menu"
//         >
//           {user.profilePic ? (
//             <Avatar alt={user.name} src={user.profilePic} sx={{ width: 40, height: 40 }} />
//           ) : (
//             <Avatar {...stringAvatar(user.name)} sx={{ width: 40, height: 40 }} />
//           )}
//         </IconButton>
//       </Tooltip>

//       <Menu
//         id="profile-menu"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         onClick={handleClose}
//         PaperProps={{
//           elevation: 4,
//           sx: {
//             mt: 1.5,
//             minWidth: 240,
//             p: 2,
//             boxShadow:
//               'rgb(0 0 0 / 0.2) 0px 2px 8px',
//           },
//         }}
//         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//       >
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//           {user.profilePic ? (
//             <Avatar alt={user.name} src={user.profilePic} sx={{ width: 64, height: 64, mr: 2 }} />
//           ) : (
//             <Avatar {...stringAvatar(user.name)} sx={{ width: 64, height: 64, mr: 2 }} />
//           )}
//           <Box>
//             <Typography variant="h6" noWrap>
//               {user.name}
//             </Typography>
//             <Typography variant="body2" color="text.secondary" noWrap>
//               {user.email}
//             </Typography>
//           </Box>
//         </Box>

//         <MenuItem>
//           <label htmlFor="upload-profile-pic" style={{ cursor: 'pointer', width: '100%' }}>
//             Change Profile Picture
//           </label>
//           <input
//             id="upload-profile-pic"
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             style={{ display: 'none' }}
//           />
//         </MenuItem>

//         <Divider sx={{ my: 1 }} />

//         <MenuItem
//           onClick={() => {
//             onLogout();
//           }}
//           sx={{ color: 'error.main' }}
//         >
//           <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
//           Logout
//         </MenuItem>
//       </Menu>
//     </>
//   );
// }

// DoctorProfileMenu.propTypes = {
//   user: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     profilePic: PropTypes.string,
//   }).isRequired,
//   onLogout: PropTypes.func.isRequired,
//   onProfilePicChange: PropTypes.func.isRequired,
//   loading: PropTypes.bool,
// };

// // --- Content for the Dashboard Pages (adapted for Doctor) ---
// function DoctorDashboardPageContent({ currentSegment, loading, doctorUser, selectedMedicalRecordId, onNavigate }) {
//   if (loading) {
//     return (
//       <Box
//         sx={{
//           width: '100%',
//           height: '100%',
//           minHeight: '100vh',
//           minWidth: '100vw',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           p: 0,
//           m: 0,
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   switch (currentSegment) {
//     case 'dashboard': return <DoctorDashboardOverview doctorUser={doctorUser} />;
//     case 'patient-list': return <DoctorPatientList doctorUser={doctorUser} />;
//     case 'appointments': return <DoctorAppointments doctorUser={doctorUser} />;
//     case 'today-appointments':
//       return (
//         <DoctorTodayAppointments
//           doctorUser={doctorUser}
//           onViewMedicalRecords={(medicalRecordId) => {
//             onNavigate(`medical-records-detail/${medicalRecordId}`);
//           }}
//         />
//       );
//     case 'medical-records': // Case for the list of medical records (now appointments with medical records)
//       return <DoctorMedicalRecords doctorUser={doctorUser} onNavigate={onNavigate} />;
//     case 'medical-records-detail':
//       if (selectedMedicalRecordId) {
//         return <DoctorMedicalRecordsPage medicalRecordId={selectedMedicalRecordId} onBack={() => onNavigate('medical-records')} onNavigate={onNavigate} />; // Changed onBack to 'medical-records'
//       }
//       return <Alert severity="error">Medical Record ID not found for medical records.</Alert>;
//     case 'prescriptions-detail':
//       if (selectedMedicalRecordId) {
//         return <DoctorPrescriptionsPage medicalRecordId={selectedMedicalRecordId} onBack={() => onNavigate(`medical-records-detail/${selectedMedicalRecordId}`)} />;
//       }
//       return <Alert severity="error">Medical Record ID not found for prescriptions.</Alert>;
//     case 'diagnostic-tests-detail':
//       if (selectedMedicalRecordId) {
//         return <DoctorDiagnosticTestsPage medicalRecordId={selectedMedicalRecordId} onBack={() => onNavigate(`medical-records-detail/${selectedMedicalRecordId}`)} />;
//       }
//       return <Alert severity="error">Medical Record ID not found for diagnostic tests.</Alert>;
//     case 'prescriptions': return <DoctorPrescriptions doctorUser={doctorUser} />;
//     case 'my-schedule': return <DoctorMySchedule doctorUser={doctorUser} />;
//     case 'settings': return <DoctorSettings doctorUser={doctorUser} />;
//     default:
//       return (
//         <Box
//           sx={{
//             py: 6,
//             px: 3,
//             maxWidth: 960,
//             mx: 'auto',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             bgcolor: '#fff',
//             borderRadius: 2,
//             boxShadow:
//               '0 1px 3px rgb(0 0 0 / 0.1), 0 1px 2px rgb(0 0 0 / 0.06)',
//           }}
//         >
//           <Typography variant="h4" gutterBottom>
//             Page Not Found
//           </Typography>
//           <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, textAlign: 'center' }}>
//             The page you are looking for does not exist.
//           </Typography>
//         </Box>
//       );
//   }
// }

// DoctorDashboardPageContent.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   loading: PropTypes.bool,
//   doctorUser: PropTypes.shape({
//     userId: PropTypes.string,
//     name: PropTypes.string,
//     email: PropTypes.string,
//     profilePic: PropTypes.string,
//   }),
//   selectedMedicalRecordId: PropTypes.string,
//   onNavigate: PropTypes.func.isRequired,
// };

// // --- Navigation Sidebar Component ---
// function DoctorNavigationMenu({ currentSegment, onNavigate }) {
//   return (
//     <List sx={{ width: 240, bgcolor: 'background.paper', height: '100vh', borderRight: 1, borderColor: 'divider' }}>
//       {DOCTOR_NAVIGATION.map((item, index) => {
//         if (item.kind === 'header') {
//           return (
//             <Typography key={index} variant="subtitle1" sx={{ mt: 2, mb: 1, px: 2, fontWeight: 'bold' }}>
//               {item.title}
//             </Typography>
//           );
//         }
//         return (
//           <ListItemButton
//             key={item.segment}
//             selected={currentSegment === item.segment}
//             onClick={() => onNavigate(item.segment)}
//           >
//             <ListItemIcon>{item.icon}</ListItemIcon>
//             <ListItemText primary={item.title} />
//           </ListItemButton>
//         );
//       })}
//     </List>
//   );
// }

// DoctorNavigationMenu.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   onNavigate: PropTypes.func.isRequired,
// };

// // --- Main Doctor Dashboard Component ---
// export const DoctorDashboard = () => {
//   const [currentSegment, setCurrentSegment] = useState('dashboard');
//   const [selectedMedicalRecordId, setSelectedMedicalRecordId] = useState(null);

//   const [doctorUser, setDoctorUser] = useState({
//     userId: '',
//     name: '',
//     email: '',
//     profilePic: '',
//   });
//   const [loadingDoctorData, setLoadingDoctorData] = useState(true);

//   useEffect(() => {
//     const loadDoctorData = async () => {
//       setLoadingDoctorData(true);

//       const storedUserId = sessionStorage.getItem('userId');
//       const storedUsername = sessionStorage.getItem('username');
//       const storedEmail = sessionStorage.getItem('email');
//       const storedProfilePic = sessionStorage.getItem('profilePic');

//       if (storedUserId && storedUsername && storedEmail) {
//         setDoctorUser({
//           userId: storedUserId,
//           name: storedUsername,
//           email: storedEmail,
//           profilePic: storedProfilePic || 'http://localhost:2004/default-doctor.png',
//         });
//       } else {
//         window.location.href = '/login';
//       }
//       setLoadingDoctorData(false);
//     };
//     loadDoctorData();
//   }, []);

//   const handleLogout = () => {
//     sessionStorage.clear();
//     window.location.href = '/login';
//   };

//   const handleProfilePicChange = async (file) => {
//     const newPicUrl = URL.createObjectURL(file);
//     setDoctorUser((prev) => ({ ...prev, profilePic: newPicUrl }));
//     console.log('Profile picture changed locally. (Doctor)');
//   };

//   const handleNavigationChange = (segment) => {
//     if (segment.startsWith('medical-records-detail/')) {
//       const medicalRecordId = segment.split('/')[1];
//       setSelectedMedicalRecordId(medicalRecordId);
//       setCurrentSegment('medical-records-detail');
//     } else if (segment.startsWith('prescriptions-detail/')) {
//       const medicalRecordId = segment.split('/')[1];
//       setSelectedMedicalRecordId(medicalRecordId);
//       setCurrentSegment('prescriptions-detail');
//     } else if (segment.startsWith('diagnostic-tests-detail/')) {
//       const medicalRecordId = segment.split('/')[1];
//       setSelectedMedicalRecordId(medicalRecordId);
//       setCurrentSegment('diagnostic-tests-detail');
//     }
//     else {
//       setSelectedMedicalRecordId(null);
//       setCurrentSegment(segment.startsWith('/') ? segment.slice(1) : segment);
//     }
//     console.log('Navigating to segment:', segment);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box
//         sx={{
//           width: '100vw',
//           height: '100vh',
//           p: 0,
//           m: 0,
//           display: 'flex',
//           flexDirection: 'column',
//           overflow: 'hidden',
//         }}
//       >
//         <AppProvider
//           navigation={DOCTOR_NAVIGATION}
//           router={{
//             pathname: currentSegment,
//             navigate: handleNavigationChange,
//           }}
//           theme={theme}
//           branding={{ title: 'Sarvotham\'s Spine Care - Doctor' }}
//         >
//           <DashboardLayout
//             sx={{ flex: 1, p: 0, m: 0, height: '100%' }}
//             slots={{
//               drawerContent: () => (
//                 <DoctorNavigationMenu
//                   currentSegment={currentSegment}
//                   onNavigate={handleNavigationChange}
//                 />
//               ),
//               toolbarAccount: () => (
//                 <DoctorProfileMenu
//                   user={doctorUser}
//                   onLogout={handleLogout}
//                   onProfilePicChange={handleProfilePicChange}
//                   loading={loadingDoctorData}
//                 />
//               ),
//             }}
//           >
//             <DoctorDashboardPageContent
//               currentSegment={currentSegment}
//               loading={loadingDoctorData}
//               doctorUser={doctorUser}
//               selectedMedicalRecordId={selectedMedicalRecordId}
//               onNavigate={handleNavigationChange}
//             />
//           </DashboardLayout>
//         </AppProvider>
//       </Box>
//     </ThemeProvider>
//   );
// };

// DoctorDashboard.propTypes = {
//   // window: PropTypes.func,
// };

// export default DoctorDashboard;
// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Avatar from '@mui/material/Avatar';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import CircularProgress from '@mui/material/CircularProgress';
// import Alert from '@mui/material/Alert';

// import DashboardIcon from '@mui/icons-material/Dashboard';
// import EventNoteIcon from '@mui/icons-material/EventNote';
// import DateRangeIcon from '@mui/icons-material/DateRange';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import LogoutIcon from '@mui/icons-material/Logout';
// import InfoIcon from '@mui/icons-material/Info';
// import ContactMailIcon from '@mui/icons-material/ContactMail';

// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';

// // Import all doctor-specific page components
// import DoctorDashboardOverview from './DoctorDashboardOverview';
// import DoctorAppointments from './DoctorAppointments';
// import DoctorMySchedule from './DoctorMySchedule';
// import DoctorTodayAppointments from './DoctorTodayAppointments';
// import DoctorMedicalRecordsPage from './DoctorMedicalRecordsPage';
// import DoctorPrescriptionsPage from './DoctorPrescriptionsPage';
// import DoctorDiagnosticTestsPage from './DoctorDiagnosticTestsPage';

// // Import the newly created pages
// import AboutUsPage from './AboutUsPage';
// import ContactUsPage from './ContactUsPage';

// // Utility to generate a consistent color from a string for avatar background
// function stringToColor(string) {
//   let hash = 0;
//   for (let i = 0; i < string.length; i += 1) {
//     hash = string.charCodeAt(i) + ((hash << 5) - hash);
//   }
//   let color = '#';
//   for (let i = 0; i < 3; i += 1) {
//     const value = (hash >> (i * 8)) & 0xff;
//     color += `00${value.toString(16)}`.slice(-2);
//   }
//   return color;
// }

// // Utility to create Avatar props with initials fallback
// function stringAvatar(name) {
//   const initials = name
//     ? name.split(' ').map(n => n[0]).join('').toUpperCase()
//     : 'DR';
//   return {
//     sx: { bgcolor: stringToColor(name || 'Default Doctor') },
//     children: initials,
//   };
// }

// // --- Navigation items for Doctor Dashboard ---
// const DOCTOR_NAVIGATION = [
//   { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
//   { segment: 'appointments', title: 'All Appointments', icon: <EventNoteIcon /> },
//   { segment: 'today-appointments', title: 'Today\'s Appointments', icon: <DateRangeIcon /> },
//   { segment: 'my-schedule', title: 'My Schedule', icon: <CalendarTodayIcon /> },
//   { segment: 'about-us', title: 'About Us', icon: <InfoIcon /> },
//   { segment: 'contact-us', title: 'Contact Us', icon: <ContactMailIcon /> },
// ];

// // --- Custom Material-UI Theme ---
// const theme = createTheme({
//   palette: {
//     mode: 'light',
//     primary: {
//       main: '#1976d2',
//       contrastText: '#fff',
//     },
//     secondary: {
//       main: '#388e3c',
//     },
//     background: {
//       default: '#f5f7fa',
//       paper: '#ffffff',
//     },
//     error: {
//       main: '#d32f2f',
//     },
//     text: {
//       primary: '#202124',
//       secondary: '#5f6368',
//     },
//     info: { main: '#03a9f4' },
//     success: { main: '#4caf50' },
//     warning: { main: '#ff9800' },
//   },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     h6: {
//       fontWeight: 600,
//       fontSize: '1.25rem',
//     },
//     body1: {
//       fontSize: '1rem',
//     },
//   },
//   components: {
//     MuiTypography: {
//       styleOverrides: {
//         root: {
//           lineHeight: 1.5,
//         },
//       },
//     },
//   },
// });

// // --- Profile Menu Component ---
// function DoctorProfileMenu({ user, onLogout, onProfilePicChange, loading }) {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);

//   const handleOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       onProfilePicChange(e.target.files[0]);
//       handleClose();
//     }
//   };

//   if (loading) {
//     return (
//       <Box sx={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//         <CircularProgress size={24} color="inherit" />
//       </Box>
//     );
//   }

//   return (
//     <>
//       <Tooltip title="Open Profile Menu">
//         <IconButton
//           onClick={handleOpen}
//           size="small"
//           sx={{ ml: 2 }}
//           aria-controls={open ? 'profile-menu' : undefined}
//           aria-haspopup="true"
//           aria-expanded={open ? 'true' : undefined}
//           aria-label="User profile menu"
//         >
//           {user.profilePic ? (
//             <Avatar alt={user.name} src={user.profilePic} sx={{ width: 40, height: 40 }} />
//           ) : (
//             <Avatar {...stringAvatar(user.name)} sx={{ width: 40, height: 40 }} />
//           )}
//         </IconButton>
//       </Tooltip>

//       <Menu
//         id="profile-menu"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         onClick={handleClose}
//         PaperProps={{
//           elevation: 4,
//           sx: {
//             mt: 1.5,
//             minWidth: 240,
//             p: 2,
//             boxShadow:
//               'rgb(0 0 0 / 0.2) 0px 2px 8px',
//           },
//         }}
//         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//       >
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//           {user.profilePic ? (
//             <Avatar alt={user.name} src={user.profilePic} sx={{ width: 64, height: 64, mr: 2 }} />
//           ) : (
//             <Avatar {...stringAvatar(user.name)} sx={{ width: 64, height: 64, mr: 2 }} />
//           )}
//           <Box>
//             <Typography variant="h6" noWrap>
//               {user.name}
//             </Typography>
//             <Typography variant="body2" color="text.secondary" noWrap>
//               {user.email}
//             </Typography>
//           </Box>
//         </Box>

//         <MenuItem>
//           <label htmlFor="upload-profile-pic" style={{ cursor: 'pointer', width: '100%' }}>
//             Change Profile Picture
//           </label>
//           <input
//             id="upload-profile-pic"
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             style={{ display: 'none' }}
//           />
//         </MenuItem>

//         <Divider sx={{ my: 1 }} />

//         <MenuItem
//           onClick={() => {
//             onLogout();
//           }}
//           sx={{ color: 'error.main' }}
//         >
//           <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
//           Logout
//         </MenuItem>
//       </Menu>
//     </>
//   );
// }

// DoctorProfileMenu.propTypes = {
//   user: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     profilePic: PropTypes.string,
//   }).isRequired,
//   onLogout: PropTypes.func.isRequired,
//   onProfilePicChange: PropTypes.func.isRequired,
//   loading: PropTypes.bool,
// };

// // --- Content for the Dashboard Pages ---
// function DoctorDashboardPageContent({ currentSegment, loading, doctorUser, selectedMedicalRecordId, onNavigate }) {
//   if (loading) {
//     return (
//       <Box
//         sx={{
//           width: '100%',
//           height: '100%',
//           minHeight: '100vh',
//           minWidth: '100vw',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           p: 0,
//           m: 0,
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   switch (currentSegment) {
//     case 'dashboard': return <DoctorDashboardOverview doctorUser={doctorUser} />;
//     case 'appointments': return <DoctorAppointments doctorUser={doctorUser} />;
//     case 'today-appointments':
//       return (
//         <DoctorTodayAppointments
//           doctorUser={doctorUser}
//           onViewMedicalRecords={(medicalRecordId) => {
//             onNavigate(`medical-records-detail/${medicalRecordId}`);
//           }}
//         />
//       );
//     case 'medical-records-detail':
//       if (selectedMedicalRecordId) {
//         return <DoctorMedicalRecordsPage medicalRecordId={selectedMedicalRecordId} onBack={() => onNavigate('appointments')} onNavigate={onNavigate} />;
//       }
//       return <Alert severity="error">Medical Record ID not found for medical records.</Alert>;
//     case 'prescriptions-detail':
//       if (selectedMedicalRecordId) {
//         return <DoctorPrescriptionsPage medicalRecordId={selectedMedicalRecordId} onBack={() => onNavigate(`medical-records-detail/${selectedMedicalRecordId}`)} />;
//       }
//       return <Alert severity="error">Medical Record ID not found for prescriptions.</Alert>;
//     case 'diagnostic-tests-detail':
//       if (selectedMedicalRecordId) {
//         return <DoctorDiagnosticTestsPage medicalRecordId={selectedMedicalRecordId} onBack={() => onNavigate(`medical-records-detail/${selectedMedicalRecordId}`)} />;
//       }
//       return <Alert severity="error">Medical Record ID not found for diagnostic tests.</Alert>;
//     case 'my-schedule': return <DoctorMySchedule doctorUser={doctorUser} />;
//     case 'about-us': return <AboutUsPage />;
//     case 'contact-us': return <ContactUsPage />;
//     default:
//       return (
//         <Box
//           sx={{
//             py: 6,
//             px: 3,
//             maxWidth: 960,
//             mx: 'auto',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             bgcolor: '#fff',
//             borderRadius: 2,
//             boxShadow:
//               '0 1px 3px rgb(0 0 0 / 0.1), 0 1px 2px rgb(0 0 0 / 0.06)',
//           }}
//         >
//           <Typography variant="h4" gutterBottom>
//             Page Not Found
//           </Typography>
//           <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, textAlign: 'center' }}>
//             The page you are looking for does not exist.
//           </Typography>
//         </Box>
//       );
//   }
// }

// DoctorDashboardPageContent.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   loading: PropTypes.bool,
//   doctorUser: PropTypes.shape({
//     userId: PropTypes.string,
//     name: PropTypes.string,
//     email: PropTypes.string,
//     profilePic: PropTypes.string,
//   }),
//   selectedMedicalRecordId: PropTypes.string,
//   onNavigate: PropTypes.func.isRequired,
// };

// // --- Navigation Sidebar Component ---
// function DoctorNavigationMenu({ currentSegment, onNavigate }) {
//   return (
//     <List sx={{ width: 240, bgcolor: 'background.paper', height: '100vh', borderRight: 1, borderColor: 'divider' }}>
//       {DOCTOR_NAVIGATION.map((item) => (
//         <ListItemButton
//           key={item.segment}
//           selected={currentSegment === item.segment}
//           onClick={() => onNavigate(item.segment)}
//         >
//           <ListItemIcon>{item.icon}</ListItemIcon>
//           <ListItemText primary={item.title} />
//         </ListItemButton>
//       ))}
//     </List>
//   );
// }

// DoctorNavigationMenu.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   onNavigate: PropTypes.func.isRequired,
// };

// // --- Main Doctor Dashboard Component ---
// export const DoctorDashboard = () => {
//   const [currentSegment, setCurrentSegment] = useState('dashboard');
//   const [selectedMedicalRecordId, setSelectedMedicalRecordId] = useState(null);

//   const [doctorUser, setDoctorUser] = useState({
//     userId: '',
//     name: '',
//     email: '',
//     profilePic: '',
//   });
//   const [loadingDoctorData, setLoadingDoctorData] = useState(true);

//   useEffect(() => {
//     const loadDoctorData = async () => {
//       setLoadingDoctorData(true);

//       const storedUserId = sessionStorage.getItem('userId');
//       const storedUsername = sessionStorage.getItem('username');
//       const storedEmail = sessionStorage.getItem('email');
//       const storedProfilePic = sessionStorage.getItem('profilePic');

//       if (storedUserId && storedUsername && storedEmail) {
//         setDoctorUser({
//           userId: storedUserId,
//           name: storedUsername,
//           email: storedEmail,
//           profilePic: storedProfilePic || 'http://localhost:2004/default-doctor.png',
//         });
//       } else {
//         window.location.href = '/login';
//       }
//       setLoadingDoctorData(false);
//     };
//     loadDoctorData();
//   }, []);

//   const handleLogout = () => {
//     sessionStorage.clear();
//     window.location.href = '/login';
//   };

//   const handleProfilePicChange = async (file) => {
//     const newPicUrl = URL.createObjectURL(file);
//     setDoctorUser((prev) => ({ ...prev, profilePic: newPicUrl }));
//     console.log('Profile picture changed locally. (Doctor)');
//   };

//   const handleNavigationChange = (segment) => {
//     if (segment.startsWith('medical-records-detail/')) {
//       const medicalRecordId = segment.split('/')[1];
//       setSelectedMedicalRecordId(medicalRecordId);
//       setCurrentSegment('medical-records-detail');
//     } else if (segment.startsWith('prescriptions-detail/')) {
//       const medicalRecordId = segment.split('/')[1];
//       setSelectedMedicalRecordId(medicalRecordId);
//       setCurrentSegment('prescriptions-detail');
//     } else if (segment.startsWith('diagnostic-tests-detail/')) {
//       const medicalRecordId = segment.split('/')[1];
//       setSelectedMedicalRecordId(medicalRecordId);
//       setCurrentSegment('diagnostic-tests-detail');
//     }
//     else {
//       setSelectedMedicalRecordId(null);
//       setCurrentSegment(segment.startsWith('/') ? segment.slice(1) : segment);
//     }
//     console.log('Navigating to segment:', segment);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box
//         sx={{
//           width: '100vw',
//           height: '100vh',
//           p: 0,
//           m: 0,
//           display: 'flex',
//           flexDirection: 'column',
//           overflow: 'hidden',
//         }}
//       >
//         <AppProvider
//           navigation={DOCTOR_NAVIGATION}
//           router={{
//             pathname: currentSegment,
//             navigate: handleNavigationChange,
//           }}
//           theme={theme}
// branding={{
//       title: "Sarvotham Spine Care",
//       logo: (
//         <img
//           src="https://imgs.search.brave.com/I3lfsdq9k6y3txb8rAS9ukU5dwws1WPVNNQq7NQEIXI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9ibHVlLW1lZGlj/YWwtZW1lcmdlbmN5/LXN0YXItbGlmZS13/aXRoLXdoaXRlLWNh/ZHVjZXVzLW1lZGlj/YWwtc3ltYm9sLXdo/aXRlLWJhY2tncm91/bmQtM2QtcmVuZGVy/aW5nXzQ3NjYxMi0x/NTA1NC5qcGc_c2Vt/dD1haXNfaHlicmlk/Jnc9NzQw"
//           alt="Hospital Logo"
//           style={{ height: '40px' }}
//         />
//       ),
//       onClick: () => handleNavigate(''),
//     }}        >
//           <DashboardLayout
//             sx={{ flex: 1, p: 0, m: 0, height: '100%' }}
//             slots={{
//               drawerContent: () => (
//                 <DoctorNavigationMenu
//                   currentSegment={currentSegment}
//                   onNavigate={handleNavigationChange}
//                 />
//               ),
//               toolbarAccount: () => (
//                 <DoctorProfileMenu
//                   user={doctorUser}
//                   onLogout={handleLogout}
//                   onProfilePicChange={handleProfilePicChange}
//                   loading={loadingDoctorData}
//                 />
//               ),
//             }}
//           >
//             <DoctorDashboardPageContent
//               currentSegment={currentSegment}
//               loading={loadingDoctorData}
//               doctorUser={doctorUser}
//               selectedMedicalRecordId={selectedMedicalRecordId}
//               onNavigate={handleNavigationChange}
//             />
//           </DashboardLayout>
//         </AppProvider>
//       </Box>
//     </ThemeProvider>
//   );
// };

// DoctorDashboard.propTypes = {
//   // window: PropTypes.func,
// };

// export default DoctorDashboard;
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import DashboardIcon from '@mui/icons-material/Dashboard';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';

// Import all doctor-specific page components
// Note: These imports are not provided in the user's request, but are needed for the full app to work.
// We will assume they exist for a complete example.
import DoctorDashboardOverview from './DoctorDashboardOverview';
import DoctorAppointments from './DoctorAppointments';
import DoctorMySchedule from './DoctorMySchedule';
// import DoctorTodayAppointments from './DoctorTodayAppointments'; // This is the component we are modifying
import DoctorMedicalRecordsPage from './DoctorMedicalRecordsPage';
import DoctorPrescriptionsPage from './DoctorPrescriptionsPage';
import DoctorDiagnosticTestsPage from './DoctorDiagnosticTestsPage';

// Import the newly created pages
import AboutUsPage from './AboutUsPage';
import ContactUsPage from './ContactUsPage';

// Utility to generate a consistent color from a string for avatar background
function stringToColor(string) {
  let hash = 0;
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

// Utility to create Avatar props with initials fallback
function stringAvatar(name) {
  const initials = name
    ? name.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'DR';
  return {
    sx: { bgcolor: stringToColor(name || 'Default Doctor') },
    children: initials,
  };
}

// --- Navigation items for Doctor Dashboard ---
const DOCTOR_NAVIGATION = [
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'appointments', title: 'All Appointments', icon: <EventNoteIcon /> },
  { segment: 'today-appointments', title: 'Today\'s Appointments', icon: <DateRangeIcon /> },
  { segment: 'my-schedule', title: 'My Schedule', icon: <CalendarTodayIcon /> },
  { segment: 'about-us', title: 'About Us', icon: <InfoIcon /> },
  { segment: 'contact-us', title: 'Contact Us', icon: <ContactMailIcon /> },
];

// --- Custom Material-UI Theme ---
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      contrastText: '#fff',
    },
    secondary: {
      main: '#388e3c',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
    error: {
      main: '#d32f2f',
    },
    text: {
      primary: '#202124',
      secondary: '#5f6368',
    },
    info: { main: '#03a9f4' },
    success: { main: '#4caf50' },
    warning: { main: '#ff9800' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    body1: {
      fontSize: '1rem',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          lineHeight: 1.5,
        },
      },
    },
  },
});

// --- Profile Menu Component ---
function DoctorProfileMenu({ user, onLogout, onProfilePicChange, loading }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onProfilePicChange(e.target.files[0]);
      handleClose();
    }
  };

  if (loading) {
    return (
      <Box sx={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress size={24} color="inherit" />
      </Box>
    );
  }

  return (
    <>
      <Tooltip title="Open Profile Menu">
        <IconButton
          onClick={handleOpen}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'profile-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          aria-label="User profile menu"
        >
          {user.profilePic ? (
            <Avatar alt={user.name} src={user.profilePic} sx={{ width: 40, height: 40 }} />
          ) : (
            <Avatar {...stringAvatar(user.name)} sx={{ width: 40, height: 40 }} />
          )}
        </IconButton>
      </Tooltip>

      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 4,
          sx: {
            mt: 1.5,
            minWidth: 240,
            p: 2,
            boxShadow:
              'rgb(0 0 0 / 0.2) 0px 2px 8px',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          {user.profilePic ? (
            <Avatar alt={user.name} src={user.profilePic} sx={{ width: 64, height: 64, mr: 2 }} />
          ) : (
            <Avatar {...stringAvatar(user.name)} sx={{ width: 64, height: 64, mr: 2 }} />
          )}
          <Box>
            <Typography variant="h6" noWrap>
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {user.email}
            </Typography>
          </Box>
        </Box>

        <MenuItem>
          <label htmlFor="upload-profile-pic" style={{ cursor: 'pointer', width: '100%' }}>
            Change Profile Picture
          </label>
          <input
            id="upload-profile-pic"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </MenuItem>

        <Divider sx={{ my: 1 }} />

        <MenuItem
          onClick={() => {
            onLogout();
          }}
          sx={{ color: 'error.main' }}
        >
          <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

DoctorProfileMenu.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    profilePic: PropTypes.string,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
  onProfilePicChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

// --- Content for the Dashboard Pages ---
function DoctorDashboardPageContent({ currentSegment, loading, doctorUser, selectedMedicalRecordId, onNavigate }) {
  if (loading) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          minHeight: '100vh',
          minWidth: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 0,
          m: 0,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  switch (currentSegment) {
    case 'dashboard': return <DoctorDashboardOverview doctorUser={doctorUser} />;
    case 'appointments': return <DoctorAppointments doctorUser={doctorUser} />;
    case 'today-appointments':
      return (
        <DoctorTodayAppointments
          doctorUser={doctorUser}
          onViewMedicalRecords={(medicalRecordId) => {
            onNavigate(`medical-records-detail/${medicalRecordId}`);
          }}
        />
      );
    case 'medical-records-detail':
      if (selectedMedicalRecordId) {
        return <DoctorMedicalRecordsPage medicalRecordId={selectedMedicalRecordId} onBack={() => onNavigate('appointments')} onNavigate={onNavigate} />;
      }
      return <Alert severity="error">Medical Record ID not found for medical records.</Alert>;
    case 'prescriptions-detail':
      if (selectedMedicalRecordId) {
        return <DoctorPrescriptionsPage medicalRecordId={selectedMedicalRecordId} onBack={() => onNavigate(`medical-records-detail/${selectedMedicalRecordId}`)} />;
      }
      return <Alert severity="error">Medical Record ID not found for prescriptions.</Alert>;
    case 'diagnostic-tests-detail':
      if (selectedMedicalRecordId) {
        return <DoctorDiagnosticTestsPage medicalRecordId={selectedMedicalRecordId} onBack={() => onNavigate(`medical-records-detail/${selectedMedicalRecordId}`)} />;
      }
      return <Alert severity="error">Medical Record ID not found for diagnostic tests.</Alert>;
    case 'my-schedule': return <DoctorMySchedule doctorUser={doctorUser} />;
    case 'about-us': return <AboutUsPage />;
    case 'contact-us': return <ContactUsPage />;
    default:
      return (
        <Box
          sx={{
            py: 6,
            px: 3,
            maxWidth: 960,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: '#fff',
            borderRadius: 2,
            boxShadow:
              '0 1px 3px rgb(0 0 0 / 0.1), 0 1px 2px rgb(0 0 0 / 0.06)',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, textAlign: 'center' }}>
            The page you are looking for does not exist.
          </Typography>
        </Box>
      );
  }
}

DoctorDashboardPageContent.propTypes = {
  currentSegment: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  doctorUser: PropTypes.shape({
    userId: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    profilePic: PropTypes.string,
  }),
  selectedMedicalRecordId: PropTypes.string,
  onNavigate: PropTypes.func.isRequired,
};

// --- Navigation Sidebar Component ---
function DoctorNavigationMenu({ currentSegment, onNavigate }) {
  return (
    <List sx={{ width: 240, bgcolor: 'background.paper', height: '100vh', borderRight: 1, borderColor: 'divider' }}>
      {DOCTOR_NAVIGATION.map((item) => (
        <ListItemButton
          key={item.segment}
          selected={currentSegment === item.segment}
          onClick={() => onNavigate(item.segment)}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      ))}
    </List>
  );
}

DoctorNavigationMenu.propTypes = {
  currentSegment: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

// --- Main Doctor Dashboard Component ---
export const DoctorDashboard = () => {
  const [currentSegment, setCurrentSegment] = useState('dashboard');
  const [selectedMedicalRecordId, setSelectedMedicalRecordId] = useState(null);

  const [doctorUser, setDoctorUser] = useState({
    userId: '',
    name: '',
    email: '',
    profilePic: '',
  });
  const [loadingDoctorData, setLoadingDoctorData] = useState(true);

  useEffect(() => {
    const loadDoctorData = async () => {
      setLoadingDoctorData(true);

      const storedUserId = sessionStorage.getItem('userId');
      const storedUsername = sessionStorage.getItem('username');
      const storedEmail = sessionStorage.getItem('email');
      const storedProfilePic = sessionStorage.getItem('profilePic');

      if (storedUserId && storedUsername && storedEmail) {
        setDoctorUser({
          userId: storedUserId,
          name: storedUsername,
          email: storedEmail,
          profilePic: storedProfilePic || 'http://localhost:2004/default-doctor.png',
        });
      } else {
        window.location.href = '/login';
      }
      setLoadingDoctorData(false);
    };
    loadDoctorData();
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/login';
  };

  const handleProfilePicChange = async (file) => {
    const newPicUrl = URL.createObjectURL(file);
    setDoctorUser((prev) => ({ ...prev, profilePic: newPicUrl }));
    console.log('Profile picture changed locally. (Doctor)');
  };

  const handleNavigationChange = (segment) => {
    if (segment.startsWith('medical-records-detail/')) {
      const medicalRecordId = segment.split('/')[1];
      setSelectedMedicalRecordId(medicalRecordId);
      setCurrentSegment('medical-records-detail');
    } else if (segment.startsWith('prescriptions-detail/')) {
      const medicalRecordId = segment.split('/')[1];
      setSelectedMedicalRecordId(medicalRecordId);
      setCurrentSegment('prescriptions-detail');
    } else if (segment.startsWith('diagnostic-tests-detail/')) {
      const medicalRecordId = segment.split('/')[1];
      setSelectedMedicalRecordId(medicalRecordId);
      setCurrentSegment('diagnostic-tests-detail');
    }
    else {
      setSelectedMedicalRecordId(null);
      setCurrentSegment(segment.startsWith('/') ? segment.slice(1) : segment);
    }
    console.log('Navigating to segment:', segment);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          p: 0,
          m: 0,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <AppProvider
          navigation={DOCTOR_NAVIGATION}
          router={{
            pathname: currentSegment,
            navigate: handleNavigationChange,
          }}
          theme={theme}
branding={{
      title: "Sarvotham Spine Care",
      logo: (
        <img
          src="https://imgs.search.brave.com/I3lfsdq9k6y3txb8rAS9ukU5dwws1WPVNNQq7NQEIXI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9ibHVlLW1lZGlj/YWwtZW1lcmdlbmN5/LXN0YXItbGlmZS13/aXRoLXdoaXRlLWNh/ZHVjZXVzLW1lZGlj/YWwtc3ltYm9sLXdo/aXRlLWJhY2tncm91/bmQtM2QtcmVuZGVy/aW5nXzQ3NjYxMi0x/NTA1NC5qcGc_c2Vt/dD1haXNfaHlicmlk/Jnc9NzQw"
          alt="Hospital Logo"
          style={{ height: '40px' }}
        />
      ),
      onClick: () => handleNavigationChange(''),
    }}        >
          <DashboardLayout
            sx={{ flex: 1, p: 0, m: 0, height: '100%' }}
            slots={{
              drawerContent: () => (
                <DoctorNavigationMenu
                  currentSegment={currentSegment}
                  onNavigate={handleNavigationChange}
                />
              ),
              toolbarAccount: () => (
                <DoctorProfileMenu
                  user={doctorUser}
                  onLogout={handleLogout}
                  onProfilePicChange={handleProfilePicChange}
                  loading={loadingDoctorData}
                />
              ),
            }}
          >
            <DoctorDashboardPageContent
              currentSegment={currentSegment}
              loading={loadingDoctorData}
              doctorUser={doctorUser}
              selectedMedicalRecordId={selectedMedicalRecordId}
              onNavigate={handleNavigationChange}
            />
          </DashboardLayout>
        </AppProvider>
      </Box>
    </ThemeProvider>
  );
};

DoctorDashboard.propTypes = {
  // window: PropTypes.func,
};

// --- Content for the DoctorTodayAppointments Page (Updated) ---
const DoctorTodayAppointments = ({ doctorUser, onViewMedicalRecords, selectedAppointment, onBackToAppointments }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formattedTodayDate, setFormattedTodayDate] = useState('');
  const [updatingAppointmentId, setUpdatingAppointmentId] = useState(null);

  const fetchDoctorAndAppointments = async () => {
    if (!doctorUser || !doctorUser.userId) {
      setError("Doctor user ID is not available.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const currentFormattedDate = `${year}-${month}-${day}`;
    setFormattedTodayDate(currentFormattedDate);

    try {
      const doctorResponse = await fetch(`http://localhost:2005/api/doctors/customId/${doctorUser.userId}`);
      if (!doctorResponse.ok) {
        throw new Error(`Failed to fetch doctor details: ${doctorResponse.status}`);
      }
      const doctorDetails = await doctorResponse.json();
      const doctorMongoId = doctorDetails.id;

      console.log("Fetched doctor's MongoDB ID:", doctorMongoId);
      console.log("Fetching appointments for date:", currentFormattedDate);

      const appointmentsResponse = await fetch(`http://localhost:2010/api/appointments/doctor/${doctorMongoId}/date/${currentFormattedDate}`);

      if (!appointmentsResponse.ok) {
        const errorText = await appointmentsResponse.text();
        throw new Error(`Failed to fetch today's appointments: ${appointmentsResponse.status} - ${errorText}`);
      }

      if (appointmentsResponse.status === 204) {
        setAppointments([]);
        console.log("No appointments found for today (204 No Content).");
      } else {
        const data = await appointmentsResponse.json();
        setAppointments(data);
        // Log the entire array of appointments to the console
        console.log("All today's appointments fetched successfully:", data);
      }
    } catch (err) {
      console.error("Error fetching today's appointments:", err);
      setError(err.message || "Failed to load today's appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedAppointment) {
      fetchDoctorAndAppointments();
    }
  }, [doctorUser.userId, selectedAppointment]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'success';
      case 'Pending': return 'warning';
      case 'Cancelled': return 'error';
      case 'Scheduled': return 'info';
      case 'Completed': return 'primary';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Confirmed': return <CheckCircleIcon fontSize="small" />;
      case 'Pending': return <PendingActionsIcon fontSize="small" />;
      case 'Cancelled': return <CancelIcon fontSize="small" />;
      case 'Scheduled': return <EventNoteIcon fontSize="small" />;
      case 'Completed': return <DoneAllIcon fontSize="small" />;
      default: return null;
    }
  };

  const handleViewMedicalRecords = (medicalRecordId) => {
    console.log(`Viewing medical records for Medical Record ID: ${medicalRecordId}`);
    onViewMedicalRecords(medicalRecordId);
  };
  
  const handleCompleteAppointment = async (appointmentId) => {
    setUpdatingAppointmentId(appointmentId);
    try {
      const response = await fetch(`http://localhost:2010/api/appointments/${appointmentId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Completed' }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to complete appointment: ${response.status} - ${errorText}`);
      }
  
      console.log(`Appointment ${appointmentId} status updated to Completed.`);
  
      // Re-fetch appointments to update the UI
      fetchDoctorAndAppointments();
    } catch (err) {
      console.error("Error completing appointment:", err);
    } finally {
      setUpdatingAppointmentId(null);
    }
  };

  // Conditional rendering based on whether an appointment is selected
  if (selectedAppointment) {
    return (
      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 900, mx: 'auto', width: '100%' }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBackToAppointments}
          sx={{ mb: 3 }}
        >
          Back to Appointments List
        </Button>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.dark' }}>
          Appointment Details
        </Typography>
        <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, background: 'linear-gradient(145deg, #ffffff, #f0f2f5)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
            Appointment Overview
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Box component="span" sx={{ fontWeight: 'bold' }}>Patient ID:</Box> {selectedAppointment.patientId || 'N/A'}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EventNoteIcon sx={{ mr: 1, color: 'info.main' }} />
              <Box component="span" sx={{ fontWeight: 'bold' }}>Date:</Box> {selectedAppointment.appointmentDate || 'N/A'}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <AccessTimeIcon sx={{ mr: 1, color: 'info.main' }} />
              <Box component="span" sx={{ fontWeight: 'bold' }}>Time:</Box> {selectedAppointment.appointmentTime ? new Date(selectedAppointment.appointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <MeetingRoomIcon sx={{ mr: 1, color: 'info.main' }} />
              <Box component="span" sx={{ fontWeight: 'bold' }}>Room:</Box> {selectedAppointment.roomNumber || 'N/A'}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EventNoteIcon sx={{ mr: 1, color: 'info.main' }} />
              <Box component="span" sx={{ fontWeight: 'bold' }}>Reason for Visit:</Box> {selectedAppointment.reasonForVisit || 'N/A'}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>Status:</Box>
              <Chip
                label={selectedAppointment.status || 'Unknown'}
                color={getStatusColor(selectedAppointment.status)}
                size="small"
                icon={getStatusIcon(selectedAppointment.status)}
                sx={{ mt: 1 }}
              />
            </Box>
          </Box>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            {selectedAppointment.medicalRecordId && (
              <Button
                variant="contained"
                size="small"
                color="secondary"
                onClick={() => handleViewMedicalRecords(selectedAppointment.medicalRecordId)}
              >
                View Medical Records
              </Button>
            )}
            {selectedAppointment.status !== 'Completed' && selectedAppointment.status !== 'Cancelled' && (
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={() => handleCompleteAppointment(selectedAppointment.id)}
                disabled={updatingAppointmentId === selectedAppointment.id}
              >
                {updatingAppointmentId === selectedAppointment.id ? <CircularProgress size={24} /> : 'Complete'}
              </Button>
            )}
          </Box>
        </Paper>
      </Box>
    );
  }

  // Original list view
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', width: '100%' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 1, fontWeight: 'bold', color: 'primary.dark' }}>
        Today's Appointments
      </Typography>
      <Typography variant="h6" gutterBottom align="center" color="text.secondary" sx={{ mb: 4 }}>
        {formattedTodayDate}
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ ml: 2 }}>Loading Today's Appointments...</Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && appointments.length === 0 && (
        <Alert severity="info" sx={{ mb: 3 }}>
          No appointments found for today.
        </Alert>
      )}

      {!loading && !error && appointments.length > 0 && (
        <Grid container spacing={3}>
          {appointments.map((row) => {
            // Log each appointment's details to the console
            console.log("Rendering appointment:", row);
            return (
              <Grid item xs={12} sm={6} md={4} key={row.id}>
                <Card elevation={6} sx={{
                  borderRadius: 3,
                  background: 'linear-gradient(145deg, #ffffff, #f0f2f5)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <CardContent>
                    <Typography variant="h6" component="div" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                      <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Box component="span" sx={{ fontWeight: 'bold' }}>Patient: {row.patientId || 'N/A'}</Box>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, display: 'flex', alignItems: 'center' }}>
                      <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
                      Time: {row.appointmentTime ? new Date(row.appointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, display: 'flex', alignItems: 'center' }}>
                      <EventNoteIcon fontSize="small" sx={{ mr: 1 }} />
                      Type: {row.reasonForVisit || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
                      <MeetingRoomIcon fontSize="small" sx={{ mr: 1 }} />
                      Room: {row.roomNumber || 'N/A'}
                    </Typography>
                    <Chip
                      label={row.status || 'Unknown'}
                      color={getStatusColor(row.status)}
                      size="small"
                      icon={getStatusIcon(row.status)}
                      sx={{ mt: 1 }}
                    />
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
                    {row.medicalRecordId && (
                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={() => handleViewMedicalRecords(row.medicalRecordId)}
                      >
                        View Medical Records
                      </Button>
                    )}
                    {row.status !== 'Completed' && row.status !== 'Cancelled' && (
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={() => handleCompleteAppointment(row.id)}
                        disabled={updatingAppointmentId === row.id}
                        sx={{ ml: 1 }}
                      >
                        {updatingAppointmentId === row.id ? <CircularProgress size={24} /> : 'Complete'}
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      <Box sx={{ mt: 6, opacity: 0.7, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          View and manage your appointments scheduled for today.
        </Typography>
      </Box>
    </Box>
  );
};

DoctorTodayAppointments.propTypes = {
  doctorUser: PropTypes.shape({
    userId: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    profilePic: PropTypes.string,
  }).isRequired,
  onViewMedicalRecords: PropTypes.func.isRequired,
  selectedAppointment: PropTypes.object,
  onBackToAppointments: PropTypes.func,
};

export default DoctorDashboard;
