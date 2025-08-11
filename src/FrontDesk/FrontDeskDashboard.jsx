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
// import PeopleIcon from '@mui/icons-material/People';
// import EventAvailableIcon from '@mui/icons-material/EventAvailable';
// import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import SettingsIcon from '@mui/icons-material/Settings';
// import LogoutIcon from '@mui/icons-material/Logout';

// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';

// // Import Front Desk specific page components
// import FrontDeskDashboardOverview from './FrontDeskDashboardOverview';
// import FrontDeskPatientManagement from './FrontDeskPatientManagement';
// import FrontDeskAppointments from './FrontDeskAppointments';
// import FrontDeskDoctors from './FrontDeskDoctors';
// import FrontDeskDoctorDetailsPage from './FrontDeskDoctorDetailsPage';
// import FrontDeskBookAppointmentPage from './FrontDeskBookAppointmentPage'; // NEW: Import the booking page
// import FrontDeskReports from './FrontDeskReports';
// import FrontDeskSettings from './FrontDeskSettings';

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
//     : 'FD';
//   return {
//     sx: {
//       bgcolor: stringToColor(name || 'Front Desk User'),
//     },
//     children: initials,
//   };
// }

// // --- Navigation items for Front Desk Dashboard ---
// const FRONT_DESK_NAVIGATION = [
//   // Removed: { kind: 'header', title: 'Front Desk Navigation' },
//   { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
//   { segment: 'patient-management', title: 'Patient Management', icon: <PeopleIcon /> },
//   { segment: 'appointments', title: 'Appointments', icon: <EventAvailableIcon /> },
//   { segment: 'doctors', title: 'Doctors', icon: <LocalHospitalIcon /> },
//   { segment: 'reports', title: 'Reports', icon: <BarChartIcon /> },
//   { segment: 'settings', title: 'Settings', icon: <SettingsIcon /> },
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
// function FrontDeskProfileMenu({ user, onLogout, onProfilePicChange, loading }) {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);

//   const handleOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleFileChange = (event) => {
//     if (event.target.files && event.target.files[0]) {
//       onProfilePicChange(event.target.files[0]);
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

// FrontDeskProfileMenu.propTypes = {
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
// function FrontDeskDashboardPageContent({ currentSegment, loading, frontDeskUser, selectedDoctorId, selectedPatientId, onNavigate }) { // Added selectedPatientId
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
//     case 'dashboard': return <FrontDeskDashboardOverview frontDeskUser={frontDeskUser} />;
//     case 'patient-management': return <FrontDeskPatientManagement frontDeskUser={frontDeskUser} onNavigate={onNavigate} />; // Pass onNavigate
//     case 'appointments': return <FrontDeskAppointments frontDeskUser={frontDeskUser} />;
//     case 'doctors': return <FrontDeskDoctors frontDeskUser={frontDeskUser} onNavigate={onNavigate} />;
//     case 'doctor-details':
//       if (selectedDoctorId) {
//         return <FrontDeskDoctorDetailsPage doctorId={selectedDoctorId} onBack={() => onNavigate('doctors')} patient={frontDeskUser} onNavigate={onNavigate} />;
//       }
//       return <Alert severity="error">Doctor ID not found for details.</Alert>;
//     case 'book-appointment': // For booking from doctor details
//       return <FrontDeskBookAppointmentPage doctorId={selectedDoctorId} onBack={() => onNavigate('doctors')} frontDeskUser={frontDeskUser} />;
//     case 'book-appointment-for-patient': // NEW: Case for booking from patient management
//       return <FrontDeskBookAppointmentPage patientId={selectedPatientId} onBack={() => onNavigate('patient-management')} frontDeskUser={frontDeskUser} />;
//     case 'reports': return <FrontDeskReports frontDeskUser={frontDeskUser} />;
//     case 'settings': return <FrontDeskSettings frontDeskUser={frontDeskUser} />;
//     default:
//       console.warn(`FrontDeskDashboardPageContent: Unknown segment received: ${currentSegment}`);
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

// FrontDeskDashboardPageContent.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   loading: PropTypes.bool,
//   frontDeskUser: PropTypes.shape({
//     userId: PropTypes.string,
//     name: PropTypes.string,
//     email: PropTypes.string,
//     profilePic: PropTypes.string,
//   }),
//   selectedDoctorId: PropTypes.string,
//   selectedPatientId: PropTypes.string, // Added selectedPatientId propType
//   onNavigate: PropTypes.func.isRequired,
// };

// // --- Navigation Sidebar Component ---
// function FrontDeskNavigationMenu({ currentSegment, onNavigate }) {
//   return (
//     <List sx={{ width: 240, bgcolor: 'background.paper', height: '100vh', borderRight: 1, borderColor: 'divider' }}>
//       {FRONT_DESK_NAVIGATION.map((item, index) => {
//         // Only render if it's not a header or if you want to keep other types of headers
//         if (item.kind === 'header') {
//           return null; // Don't render header items
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

// FrontDeskNavigationMenu.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   onNavigate: PropTypes.func.isRequired,
// };

// // --- Main Front Desk Dashboard Component ---
// export const FrontDeskDashboard = () => {
//   const [currentSegment, setCurrentSegment] = useState('dashboard');
//   const [selectedDoctorId, setSelectedDoctorId] = useState(null);
//   const [selectedPatientId, setSelectedPatientId] = useState(null); // New state for patient ID

//   const [frontDeskUser, setFrontDeskUser] = useState({
//     userId: '',
//     name: '',
//     email: '',
//     profilePic: '',
//   });
//   const [loadingFrontDeskData, setLoadingFrontDeskData] = useState(true);

//   useEffect(() => {
//     const loadFrontDeskData = async () => {
//       setLoadingFrontDeskData(true);

//       const storedUserId = sessionStorage.getItem('userId');
//       const storedUsername = sessionStorage.getItem('username');
//       const storedEmail = sessionStorage.getItem('email');
//       const storedProfilePic = sessionStorage.getItem('profilePic');

//       if (storedUserId && storedUsername && storedEmail) {
//         setFrontDeskUser({
//           userId: storedUserId,
//           name: storedUsername,
//           email: storedEmail,
//           profilePic: storedProfilePic || 'http://localhost:2004/default-frontdesk.png',
//         });
//       } else {
//         window.location.href = '/login';
//       }
//       setLoadingFrontDeskData(false);
//     };
//     loadFrontDeskData();
//   }, []);

//   const handleLogout = () => {
//     sessionStorage.clear();
//     window.location.href = '/login';
//   };

//   const handleProfilePicChange = (file) => {
//     const newPicUrl = URL.createObjectURL(file);
//     setFrontDeskUser((prev) => ({ ...prev, profilePic: newPicUrl }));
//     console.log('Profile picture changed locally. (Front Desk)');
//   };

//   const handleNavigationChange = (segment) => {
//     if (segment.startsWith('doctor-details/')) {
//       const doctorId = segment.split('/')[1];
//       setSelectedDoctorId(doctorId);
//       setSelectedPatientId(null); // Clear patient ID if navigating to doctor details
//       setCurrentSegment('doctor-details');
//     } else if (segment.startsWith('book-appointment/')) {
//       const doctorId = segment.split('/')[1];
//       setSelectedDoctorId(doctorId);
//       setSelectedPatientId(null); // Clear patient ID if navigating to doctor booking
//       setCurrentSegment('book-appointment');
//     } else if (segment.startsWith('book-appointment-for-patient/')) { // NEW: Handle patient-specific booking
//       const patientId = segment.split('/')[1];
//       setSelectedPatientId(patientId);
//       setSelectedDoctorId(null); // Clear doctor ID if navigating to patient booking
//       setCurrentSegment('book-appointment-for-patient');
//     }
//     else {
//       setSelectedDoctorId(null);
//       setSelectedPatientId(null); // Clear both if navigating to general segment
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
//           navigation={FRONT_DESK_NAVIGATION}
//           router={{
//             pathname: currentSegment,
//             navigate: handleNavigationChange,
//           }}
//           theme={theme}
//           branding={{ title: 'Sarvotham\'s Spine Care - Front Desk' }}
//         >
//           <DashboardLayout
//             sx={{ flex: 1, p: 0, m: 0, height: '100%' }}
//             slots={{
//               drawerContent: () => (
//                 <FrontDeskNavigationMenu
//                   currentSegment={currentSegment}
//                   onNavigate={handleNavigationChange}
//                 />
//               ),
//               toolbarAccount: () => (
//                 <FrontDeskProfileMenu
//                   user={frontDeskUser}
//                   onLogout={handleLogout}
//                   onProfilePicChange={handleProfilePicChange}
//                   loading={loadingFrontDeskData}
//                 />
//               ),
//             }}
//           >
//             <FrontDeskDashboardPageContent
//               currentSegment={currentSegment}
//               loading={loadingFrontDeskData}
//               frontDeskUser={frontDeskUser}
//               selectedDoctorId={selectedDoctorId}
//               selectedPatientId={selectedPatientId} // Pass selectedPatientId
//               onNavigate={handleNavigationChange}
//             />
//           </DashboardLayout>
//         </AppProvider>
//       </Box>
//     </ThemeProvider>
//   );
// };

// FrontDeskDashboard.propTypes = {
//   // No props used, component manages its own state and session data
// };

// export default FrontDeskDashboard;
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

// // Icons
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import PeopleIcon from '@mui/icons-material/People';
// import EventAvailableIcon from '@mui/icons-material/EventAvailable';
// import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import SettingsIcon from '@mui/icons-material/Settings';
// import LogoutIcon from '@mui/icons-material/Logout';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';

// // Toolpad components
// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';

// // Import Front Desk specific page components
// import FrontDeskDashboardOverview from './FrontDeskDashboardOverview';
// import FrontDeskPatientManagement from './FrontDeskPatientManagement';
// import FrontDeskAppointments from './FrontDeskAppointments';
// import FrontDeskDoctors from './FrontDeskDoctors';
// import FrontDeskDoctorDetailsPage from './FrontDeskDoctorDetailsPage';
// import FrontDeskBookAppointmentPage from './FrontDeskBookAppointmentPage';
// import FrontDeskReports from './FrontDeskReports';
// import FrontDeskSettings from './FrontDeskSettings';

// // Import the new patient registration component provided by the user
// import FrontDeskNewPatientRegistration from './FrontDeskNewPatientRegistration';

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
//     : 'FD';
//   return {
//     sx: {
//       bgcolor: stringToColor(name || 'Front Desk User'),
//     },
//     children: initials,
//   };
// }

// // --- Navigation items for Front Desk Dashboard ---
// const FRONT_DESK_NAVIGATION = [
//   { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
//   { segment: 'patient-management', title: 'Patient Management', icon: <PeopleIcon /> },
//   // NEW: Added a navigation item for patient registration
//   { segment: 'patient-registration', title: 'New Patient Registration', icon: <PersonAddIcon /> },
//   { segment: 'appointments', title: 'Appointments', icon: <EventAvailableIcon /> },
//   { segment: 'doctors', title: 'Doctors', icon: <LocalHospitalIcon /> },
//   { segment: 'reports', title: 'Reports', icon: <BarChartIcon /> },
//   { segment: 'settings', title: 'Settings', icon: <SettingsIcon /> },
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
// function FrontDeskProfileMenu({ user, onLogout, onProfilePicChange, loading }) {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);

//   const handleOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleFileChange = (event) => {
//     if (event.target.files && event.target.files[0]) {
//       onProfilePicChange(event.target.files[0]);
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

// FrontDeskProfileMenu.propTypes = {
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
// function FrontDeskDashboardPageContent({ currentSegment, loading, frontDeskUser, selectedDoctorId, selectedPatientId, onNavigate }) {
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
//     case 'dashboard': return <FrontDeskDashboardOverview frontDeskUser={frontDeskUser} />;
//     case 'patient-management': return <FrontDeskPatientManagement frontDeskUser={frontDeskUser} onNavigate={onNavigate} />;
//     // Here, we replace the placeholder component with the actual registration form.
//     case 'patient-registration': 
//       return <FrontDeskNewPatientRegistration onBack={() => onNavigate('patient-management')} frontDeskUser={frontDeskUser} />;
//     case 'appointments': return <FrontDeskAppointments frontDeskUser={frontDeskUser} />;
//     case 'doctors': return <FrontDeskDoctors frontDeskUser={frontDeskUser} onNavigate={onNavigate} />;
//     case 'doctor-details':
//       if (selectedDoctorId) {
//         return <FrontDeskDoctorDetailsPage doctorId={selectedDoctorId} onBack={() => onNavigate('doctors')} patient={frontDeskUser} onNavigate={onNavigate} />;
//       }
//       return <Alert severity="error">Doctor ID not found for details.</Alert>;
//     case 'book-appointment':
//       return <FrontDeskBookAppointmentPage doctorId={selectedDoctorId} onBack={() => onNavigate('doctors')} frontDeskUser={frontDeskUser} />;
//     case 'book-appointment-for-patient':
//       return <FrontDeskBookAppointmentPage patientId={selectedPatientId} onBack={() => onNavigate('patient-management')} frontDeskUser={frontDeskUser} />;
//     case 'reports': return <FrontDeskReports frontDeskUser={frontDeskUser} />;
//     case 'settings': return <FrontDeskSettings frontDeskUser={frontDeskUser} />;
//     default:
//       console.warn(`FrontDeskDashboardPageContent: Unknown segment received: ${currentSegment}`);
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
//             Hey Front Desk
//           </Typography>
//           <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, textAlign: 'center' }}>
//             The page you are looking for does not exist.
//           </Typography>
//         </Box>
//       );
//   }
// }

// FrontDeskDashboardPageContent.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   loading: PropTypes.bool,
//   frontDeskUser: PropTypes.shape({
//     userId: PropTypes.string,
//     name: PropTypes.string,
//     email: PropTypes.string,
//     profilePic: PropTypes.string,
//   }),
//   selectedDoctorId: PropTypes.string,
//   selectedPatientId: PropTypes.string,
//   onNavigate: PropTypes.func.isRequired,
// };

// // --- Navigation Sidebar Component ---
// function FrontDeskNavigationMenu({ currentSegment, onNavigate }) {
//   return (
//     <List sx={{ width: 240, bgcolor: 'background.paper', height: '100vh', borderRight: 1, borderColor: 'divider' }}>
//       {FRONT_DESK_NAVIGATION.map((item) => {
//         if (item.kind === 'header') {
//           return null;
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

// FrontDeskNavigationMenu.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   onNavigate: PropTypes.func.isRequired,
// };

// // --- Main Front Desk Dashboard Component ---
// export const FrontDeskDashboard = () => {
//   const [currentSegment, setCurrentSegment] = useState('dashboard');
//   const [selectedDoctorId, setSelectedDoctorId] = useState(null);
//   const [selectedPatientId, setSelectedPatientId] = useState(null);

//   const [frontDeskUser, setFrontDeskUser] = useState({
//     userId: '',
//     name: '',
//     email: '',
//     profilePic: '',
//   });
//   const [loadingFrontDeskData, setLoadingFrontDeskData] = useState(true);

//   useEffect(() => {
//     const loadFrontDeskData = async () => {
//       setLoadingFrontDeskData(true);

//       const storedUserId = sessionStorage.getItem('userId');
//       const storedUsername = sessionStorage.getItem('username');
//       const storedEmail = sessionStorage.getItem('email');
//       const storedProfilePic = sessionStorage.getItem('profilePic');

//       if (storedUserId && storedUsername && storedEmail) {
//         setFrontDeskUser({
//           userId: storedUserId,
//           name: storedUsername,
//           email: storedEmail,
//           profilePic: storedProfilePic || 'http://localhost:2004/default-frontdesk.png',
//         });
//       } else {
//         window.location.href = '/login';
//       }
//       setLoadingFrontDeskData(false);
//     };
//     loadFrontDeskData();
//   }, []);

//   const handleLogout = () => {
//     sessionStorage.clear();
//     window.location.href = '/login';
//   };

//   const handleProfilePicChange = (file) => {
//     const newPicUrl = URL.createObjectURL(file);
//     setFrontDeskUser((prev) => ({ ...prev, profilePic: newPicUrl }));
//     console.log('Profile picture changed locally. (Front Desk)');
//   };

//   const handleNavigationChange = (segment) => {
//     if (segment.startsWith('doctor-details/')) {
//       const doctorId = segment.split('/')[1];
//       setSelectedDoctorId(doctorId);
//       setSelectedPatientId(null);
//       setCurrentSegment('doctor-details');
//     } else if (segment.startsWith('book-appointment/')) {
//       const doctorId = segment.split('/')[1];
//       setSelectedDoctorId(doctorId);
//       setSelectedPatientId(null);
//       setCurrentSegment('book-appointment');
//     } else if (segment.startsWith('book-appointment-for-patient/')) {
//       const patientId = segment.split('/')[1];
//       setSelectedPatientId(patientId);
//       setSelectedDoctorId(null);
//       setCurrentSegment('book-appointment-for-patient');
//     }
//     else {
//       setSelectedDoctorId(null);
//       setSelectedPatientId(null);
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
//           navigation={FRONT_DESK_NAVIGATION}
//           router={{
//             pathname: currentSegment,
//             navigate: handleNavigationChange,
//           }}
//           theme={theme}
//           branding={{ title: 'Sarvotham\'s Spine Care - Front Desk' }}
//         >
//           <DashboardLayout
//             sx={{ flex: 1, p: 0, m: 0, height: '100%' }}
//             slots={{
//               drawerContent: () => (
//                 <FrontDeskNavigationMenu
//                   currentSegment={currentSegment}
//                   onNavigate={handleNavigationChange}
//                 />
//               ),
//               toolbarAccount: () => (
//                 <FrontDeskProfileMenu
//                   user={frontDeskUser}
//                   onLogout={handleLogout}
//                   onProfilePicChange={handleProfilePicChange}
//                   loading={loadingFrontDeskData}
//                 />
//               ),
//             }}
//           >
//             <FrontDeskDashboardPageContent
//               currentSegment={currentSegment}
//               loading={loadingFrontDeskData}
//               frontDeskUser={frontDeskUser}
//               selectedDoctorId={selectedDoctorId}
//               selectedPatientId={selectedPatientId}
//               onNavigate={handleNavigationChange}
//             />
//           </DashboardLayout>
//         </AppProvider>
//       </Box>
//     </ThemeProvider>
//   );
// };

// FrontDeskDashboard.propTypes = {
//   // No props used, component manages its own state and session data
// };

// export default FrontDeskDashboard;
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

// Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person'; // NEW: Icon for "My Profile"

// Toolpad components
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';

// Import Front Desk specific page components
import FrontDeskDashboardOverview from './FrontDeskDashboardOverview';
import FrontDeskPatientManagement from './FrontDeskPatientManagement';
import FrontDeskAppointments from './FrontDeskAppointments';
import FrontDeskDoctors from './FrontDeskDoctors';
import FrontDeskDoctorDetailsPage from './FrontDeskDoctorDetailsPage';
import FrontDeskBookAppointmentPage from './FrontDeskBookAppointmentPage';
import FrontDeskReports from './FrontDeskReports';
import FrontDeskSettings from './FrontDeskSettings';

// Import the new patient registration component provided by the user
import FrontDeskNewPatientRegistration from './FrontDeskNewPatientRegistration';

// Placeholder for a new 'My Profile' page
const MyProfilePage = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4">My Profile</Typography>
    <Typography variant="body1" color="text.secondary">
      This is a placeholder for the user profile page. You can add user details,
      account settings, and other relevant information here.
    </Typography>
  </Box>
);

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
    : 'FD';
  return {
    sx: {
      bgcolor: stringToColor(name || 'Front Desk User'),
    },
    children: initials,
  };
}

// --- Navigation items for Front Desk Dashboard ---
const FRONT_DESK_NAVIGATION = [
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'patient-management', title: 'Patient Management', icon: <PeopleIcon /> },
  // NEW: Added a navigation item for patient registration
  { segment: 'patient-registration', title: 'New Patient Registration', icon: <PersonAddIcon /> },
  { segment: 'appointments', title: 'Appointments', icon: <EventAvailableIcon /> },
  { segment: 'doctors', title: 'Doctors', icon: <LocalHospitalIcon /> },
  { segment: 'reports', title: 'Reports', icon: <BarChartIcon /> },
  { segment: 'settings', title: 'Settings', icon: <SettingsIcon /> },
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
function FrontDeskProfileMenu({ user, onLogout, onProfilePicChange, loading, onNavigate }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      onProfilePicChange(event.target.files[0]);
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

        <Divider sx={{ my: 1 }} />

        <MenuItem onClick={() => onNavigate('my-profile')}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>

        <MenuItem>
          <label htmlFor="upload-profile-pic" style={{ cursor: 'pointer', width: '100%' }}>
            <ListItemIcon>
              <Avatar sx={{ width: 24, height: 24, bgcolor: 'transparent', color: 'inherit' }} />
            </ListItemIcon>
            <ListItemText>Change Profile Picture</ListItemText>
            <input
              id="upload-profile-pic"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </label>
        </MenuItem>

        <Divider sx={{ my: 1 }} />

        <MenuItem
          onClick={() => {
            onLogout();
          }}
          sx={{ color: 'error.main' }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" sx={{ mr: 1, color: 'error.main' }} />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

FrontDeskProfileMenu.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    profilePic: PropTypes.string,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
  onProfilePicChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  onNavigate: PropTypes.func.isRequired,
};

// --- Content for the Dashboard Pages ---
function FrontDeskDashboardPageContent({ currentSegment, loading, frontDeskUser, selectedDoctorId, selectedPatientId, onNavigate }) {
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
    case 'dashboard': return <FrontDeskDashboardOverview frontDeskUser={frontDeskUser} />;
    case 'patient-management': return <FrontDeskPatientManagement frontDeskUser={frontDeskUser} onNavigate={onNavigate} />;
    case 'patient-registration':
      return <FrontDeskNewPatientRegistration onBack={() => onNavigate('patient-management')} frontDeskUser={frontDeskUser} />;
    case 'appointments': return <FrontDeskAppointments frontDeskUser={frontDeskUser} />;
    case 'doctors': return <FrontDeskDoctors frontDeskUser={frontDeskUser} onNavigate={onNavigate} />;
    case 'doctor-details':
      if (selectedDoctorId) {
        return <FrontDeskDoctorDetailsPage doctorId={selectedDoctorId} onBack={() => onNavigate('doctors')} patient={frontDeskUser} onNavigate={onNavigate} />;
      }
      return <Alert severity="error">Doctor ID not found for details.</Alert>;
    case 'book-appointment':
      return <FrontDeskBookAppointmentPage doctorId={selectedDoctorId} onBack={() => onNavigate('doctors')} frontDeskUser={frontDeskUser} />;
    case 'book-appointment-for-patient':
      return <FrontDeskBookAppointmentPage patientId={selectedPatientId} onBack={() => onNavigate('patient-management')} frontDeskUser={frontDeskUser} />;
    case 'reports': return <FrontDeskReports frontDeskUser={frontDeskUser} />;
    case 'settings': return <FrontDeskSettings frontDeskUser={frontDeskUser} />;
    case 'my-profile': return <MyProfilePage />;
    default:
      console.warn(`FrontDeskDashboardPageContent: Unknown segment received: ${currentSegment}`);
      return (
        <Box
          sx={{
            py: 6,
            px: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            bgcolor: '#f5f7fa',
            width: '100%',
          }}
        >
          {/* Hero Section */}
          <Box
            sx={{
              width: '100%',
              maxWidth: 1200,
              height: { xs: '300px', md: '450px' },
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
              position: 'relative',
              mb: 6,
            }}
          >
            <Box
              component="img"
              src="https://media.istockphoto.com/id/1501183871/photo/doctors-registering-patients-at-the-hospital.jpg?s=612x612&w=0&k=20&c=mnjpoSNO69dNWp11zMmbmMx5S0ch4cG_d-8sMvKzKwI="
              alt="Doctors registering patients at the hospital"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />
            {/* Dark overlay for text readability */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
                p: 3,
              }}
            >
              <Typography
                variant="h3"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  fontSize: { xs: '1.8rem', md: '3rem' },
                }}
              >
                Welcome to Sarvotham's Spine Care
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  maxWidth: 800,
                  opacity: 0.9,
                  fontSize: { xs: '1rem', md: '1.25rem' },
                }}
              >
                Your central hub for managing all front desk operations. From here, you can manage appointments, view patient information, and access doctor schedules with ease.
              </Typography>
            </Box>
          </Box>
          
          {/* FAQ Section */}
          <Box
            sx={{
              mt: 6,
              maxWidth: 960,
              width: '100%',
              textAlign: 'left',
              p: { xs: 2, sm: 4 },
              bgcolor: 'background.paper',
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
              Frequently Asked Questions
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
                Q: How do I schedule a new appointment?
              </Typography>
              <Typography variant="body1" color="text.secondary">
                A: Navigate to the **Appointments** page from the sidebar. From there, you can see a button to schedule a new appointment.
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
                Q: Where can I find a patient's medical history?
              </Typography>
              <Typography variant="body1" color="text.secondary">
                A: The **Patient Management** section allows you to search for patients. Once you find the patient, you can click on their profile to view their detailed information.
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
                Q: How do I manage a doctor's schedule?
              </Typography>
              <Typography variant="body1" color="text.secondary">
                A: You can view and manage doctor schedules by navigating to the **Doctors** page. From there, select a specific doctor to see their availability and scheduled appointments.
              </Typography>
            </Box>
          </Box>
        </Box>
      );
  }
}

FrontDeskDashboardPageContent.propTypes = {
  currentSegment: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  frontDeskUser: PropTypes.shape({
    userId: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    profilePic: PropTypes.string,
  }),
  selectedDoctorId: PropTypes.string,
  selectedPatientId: PropTypes.string,
  onNavigate: PropTypes.func.isRequired,
};

// --- Navigation Sidebar Component ---
function FrontDeskNavigationMenu({ currentSegment, onNavigate }) {
  return (
    <List sx={{ width: 240, bgcolor: 'background.paper', height: '100vh', borderRight: 1, borderColor: 'divider' }}>
      {FRONT_DESK_NAVIGATION.map((item) => {
        if (item.kind === 'header') {
          return null;
        }
        return (
          <ListItemButton
            key={item.segment}
            selected={currentSegment === item.segment}
            onClick={() => onNavigate(item.segment)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        );
      })}
    </List>
  );
}

FrontDeskNavigationMenu.propTypes = {
  currentSegment: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

// --- Main Front Desk Dashboard Component ---
export const FrontDeskDashboard = () => {
  const [currentSegment, setCurrentSegment] = useState('dashboard');
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const [frontDeskUser, setFrontDeskUser] = useState({
    userId: '',
    name: '',
    email: '',
    profilePic: '',
  });
  const [loadingFrontDeskData, setLoadingFrontDeskData] = useState(true);

  useEffect(() => {
    const loadFrontDeskData = async () => {
      setLoadingFrontDeskData(true);

      const storedUserId = sessionStorage.getItem('userId');
      const storedUsername = sessionStorage.getItem('username');
      const storedEmail = sessionStorage.getItem('email');
      const storedProfilePic = sessionStorage.getItem('profilePic');

      if (storedUserId && storedUsername && storedEmail) {
        setFrontDeskUser({
          userId: storedUserId,
          name: storedUsername,
          email: storedEmail,
          profilePic: storedProfilePic || 'http://localhost:2004/default-frontdesk.png',
        });
      } else {
        window.location.href = '/login';
      }
      setLoadingFrontDeskData(false);
    };
    loadFrontDeskData();
  }, []);

  // NEW: useEffect to scroll to the top when the segment changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSegment]);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/login';
  };

  const handleProfilePicChange = (file) => {
    const newPicUrl = URL.createObjectURL(file);
    setFrontDeskUser((prev) => ({ ...prev, profilePic: newPicUrl }));
    console.log('Profile picture changed locally. (Front Desk)');
  };

  const handleNavigationChange = (segment) => {
    if (segment.startsWith('doctor-details/')) {
      const doctorId = segment.split('/')[1];
      setSelectedDoctorId(doctorId);
      setSelectedPatientId(null);
      setCurrentSegment('doctor-details');
    } else if (segment.startsWith('book-appointment/')) {
      const doctorId = segment.split('/')[1];
      setSelectedDoctorId(doctorId);
      setSelectedPatientId(null);
      setCurrentSegment('book-appointment');
    } else if (segment.startsWith('book-appointment-for-patient/')) {
      const patientId = segment.split('/')[1];
      setSelectedPatientId(patientId);
      setSelectedDoctorId(null);
      setCurrentSegment('book-appointment-for-patient');
    }
    else {
      setSelectedDoctorId(null);
      setSelectedPatientId(null);
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
          navigation={FRONT_DESK_NAVIGATION}
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
      onClick: () => handleNavigate(''),
    }}
        >
          <DashboardLayout
            sx={{ flex: 1, p: 0, m: 0, height: '100%' }}
            slots={{
              drawerContent: () => (
                <FrontDeskNavigationMenu
                  currentSegment={currentSegment}
                  onNavigate={handleNavigationChange}
                />
              ),
              toolbarAccount: () => (
                <FrontDeskProfileMenu
                  user={frontDeskUser}
                  onLogout={handleLogout}
                  onProfilePicChange={handleProfilePicChange}
                  loading={loadingFrontDeskData}
                  onNavigate={handleNavigationChange}
                />
              ),
            }}
          >
            <FrontDeskDashboardPageContent
              currentSegment={currentSegment}
              loading={loadingFrontDeskData}
              frontDeskUser={frontDeskUser}
              selectedDoctorId={selectedDoctorId}
              selectedPatientId={selectedPatientId}
              onNavigate={handleNavigationChange}
            />
          </DashboardLayout>
        </AppProvider>
      </Box>
    </ThemeProvider>
  );
};

FrontDeskDashboard.propTypes = {
  // No props used, component manages its own state and session data
};

export default FrontDeskDashboard;
