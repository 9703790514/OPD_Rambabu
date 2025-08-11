// // import React, { useState, useEffect } from 'react';
// // import PropTypes from 'prop-types';
// // import Box from '@mui/material/Box';
// // import Typography from '@mui/material/Typography';
// // import Avatar from '@mui/material/Avatar';
// // import Menu from '@mui/material/Menu';
// // import MenuItem from '@mui/material/MenuItem';
// // import IconButton from '@mui/material/IconButton';
// // import Tooltip from '@mui/material/Tooltip';
// // import List from '@mui/material/List';
// // import ListItemButton from '@mui/material/ListItemButton';
// // import ListItemIcon from '@mui/material/ListItemIcon';
// // import ListItemText from '@mui/material/ListItemText';
// // import { createTheme, ThemeProvider } from '@mui/material/styles';
// // import HomeIcon from '@mui/icons-material/Home';
// // import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
// // import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// // import BuildIcon from '@mui/icons-material/Build';
// // import ContactMailIcon from '@mui/icons-material/ContactMail';
// // import LogoutIcon from '@mui/icons-material/Logout';
// // import CircularProgress from '@mui/material/CircularProgress';
// // import { AppProvider } from '@toolpad/core/AppProvider';
// // import { DashboardLayout } from '@toolpad/core/DashboardLayout';

// // // Importing other page components
// // import HomePage from './HomePage';
// // import MyHealthPage from './MyHealthPage';
// // import MyBillsPage from './MyBillsPage';
// // import ServicesPage from './ServicesPage';
// // import ContactPage from './ContactPage';

// // // Utility to generate a consistent color from a string for avatar background
// // function stringToColor(string) {
// //   let hash = 0;
// //   for (let i = 0; i < string.length; i += 1) {
// //     hash = string.charCodeAt(i) + ((hash << 5) - hash);
// //   }
// //   let color = '#';
// //   for (let i = 0; i < 3; i += 1) {
// //     const value = (hash >> (i * 8)) & 0xff;
// //     color += `00${value.toString(16)}`.slice(-2);
// //   }
// //   return color;
// // }

// // // Utility to create Avatar props with initials fallback
// // function stringAvatar(name) {
// //   const initials = name
// //     ? name.split(' ').map(n => n[0]).join('').toUpperCase()
// //     : 'US'; // Default for undefined name
// //   return {
// //     sx: {
// //       bgcolor: stringToColor(name || 'Default User'),
// //     },
// //     children: initials,
// //   };
// // }

// // // --- Navigation items ---
// // const NAVIGATION = [
// //   { kind: 'header', title: 'Navigation' },
// //   { segment: 'home', title: 'Home', icon: <HomeIcon /> },
// //   { segment: 'my-health', title: 'My Health', icon: <HealthAndSafetyIcon /> },
// //   { segment: 'my-bills', title: 'My Bills', icon: <ReceiptLongIcon /> },
// //   { segment: 'services', title: 'Services', icon: <BuildIcon /> },
// //   { segment: 'contact', title: 'Contact', icon: <ContactMailIcon /> },
// // ];

// // // --- Theme ---
// // const theme = createTheme({
// //   palette: {
// //     mode: 'light',
// //     primary: { main: '#1976d2', contrastText: '#fff' },
// //     secondary: { main: '#388e3c' },
// //     background: { default: '#f5f7fa', paper: '#ffffff' },
// //     error: { main: '#d32f2f' },
// //     text: { primary: '#202124', secondary: '#5f6368' },
// //   },
// //   typography: {
// //     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
// //     h6: { fontWeight: 600, fontSize: '1.25rem' },
// //     body1: { fontSize: '1rem' },
// //   },
// //   components: {
// //     MuiTypography: { styleOverrides: { root: { lineHeight: 1.5 } } },
// //   },
// // });

// // // --- Profile Menu ---
// // function ProfileMenu({ patient, onLogout, onProfilePicChange, loading }) {
// //   const [anchorEl, setAnchorEl] = useState(null);

// //   const handleOpen = (event) => setAnchorEl(event.currentTarget);
// //   const handleClose = () => setAnchorEl(null);

// //   const handleProfilePicChange = (event) => {
// //     if (event.target.files && event.target.files[0]) {
// //       onProfilePicChange(event.target.files[0]);
// //       handleClose();
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40 }}>
// //         <CircularProgress size={24} color="inherit" />
// //       </Box>
// //     );
// //   }

// //   return (
// //     <>
// //       <Tooltip title="Open Profile Menu">
// //         <IconButton
// //           onClick={handleOpen}
// //           size="small"
// //           sx={{ ml: 2 }}
// //           aria-controls={anchorEl ? 'profile-menu' : undefined}
// //           aria-haspopup="true"
// //           aria-expanded={anchorEl ? 'true' : undefined}
// //         >
// //           {patient.profilePic ? (
// //             <Avatar alt={patient.name} src={patient.profilePic} sx={{ width: 40, height: 40 }} />
// //           ) : (
// //             <Avatar {...stringAvatar(patient.name)} sx={{ width: 40, height: 40 }} />
// //           )}
// //         </IconButton>
// //       </Tooltip>
// //       <Menu
// //         anchorEl={anchorEl}
// //         id="profile-menu"
// //         open={Boolean(anchorEl)}
// //         onClose={handleClose}
// //         onClick={handleClose}
// //         PaperProps={{
// //           elevation: 4,
// //           sx: {
// //             mt: 1.5,
// //             minWidth: 240,
// //             p: 2,
// //             boxShadow: 'rgb(0 0 0 / 0.2) 0px 2px 8px',
// //           },
// //         }}
// //         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
// //         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
// //       >
// //         <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// //           {patient.profilePic ? (
// //             <Avatar alt={patient.name} src={patient.profilePic} sx={{ width: 64, height: 64, mr: 2 }} />
// //           ) : (
// //             <Avatar {...stringAvatar(patient.name)} sx={{ width: 64, height: 64, mr: 2 }} />
// //           )}
// //           <Box>
// //             <Typography variant="h6" noWrap>{patient.name}</Typography>
// //             <Typography variant="body2" color="text.secondary" noWrap>{patient.email}</Typography>
// //           </Box>
// //         </Box>
// //         <MenuItem>
// //           <label htmlFor="upload-profile-pic" style={{ cursor: 'pointer', width: '100%' }}>
// //             Change Profile Picture
// //           </label>
// //           <input
// //             id="upload-profile-pic"
// //             type="file"
// //             accept="image/*"
// //             onChange={handleProfilePicChange}
// //             style={{ display: 'none' }}
// //           />
// //         </MenuItem>
// //         <MenuItem onClick={onLogout}>
// //           <LogoutIcon fontSize="small" sx={{ mr: 1, color: '#d32f2f' }} />
// //           Logout
// //         </MenuItem>
// //       </Menu>
// //     </>
// //   );
// // }

// // ProfileMenu.propTypes = {
// //   patient: PropTypes.shape({
// //     name: PropTypes.string.isRequired,
// //     email: PropTypes.string.isRequired,
// //     profilePic: PropTypes.string,
// //   }).isRequired,
// //   onLogout: PropTypes.func.isRequired,
// //   onProfilePicChange: PropTypes.func.isRequired,
// //   loading: PropTypes.bool,
// // };

// // // --- Content Renderer ---
// // function DashboardPageContent({ currentSegment, loading }) {
// //   let pageTitle = '';
// //   let pageDescription = '';
// //   let pageContent = null;

// //   if (loading) {
// //     return (
// //       <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center', width: '100%' }}>
// //         <CircularProgress />
// //       </Box>
// //     );
// //   }

// //   switch (currentSegment) {
// //     case 'home':
// //       pageContent = <HomePage />;
// //       break;
// //     case 'my-health':
// //       pageContent = <MyHealthPage />;
// //       break;
// //     case 'my-bills':
// //       pageContent = <MyBillsPage />;
// //       break;
// //     case 'services':
// //       pageContent = <ServicesPage />;
// //       break;
// //     case 'contact':
// //       pageContent = <ContactPage />;
// //       break;
// //     default:
// //       pageTitle = 'Page Not Found';
// //       pageDescription = 'The page you are looking for does not exist.';
// //       pageContent = (
// //         <Box sx={{ mt: 4, textAlign: 'center' }}>
// //           <Typography variant="h5" gutterBottom>404 - Page Not Found</Typography>
// //           <Typography variant="body1">
// //             Sorry, the page you are looking for doesn't exist.
// //           </Typography>
// //         </Box>
// //       );
// //   }

// //   return (
// //     <Box
// //       sx={{
// //         py: 6,
// //         px: { xs: 2, sm: 3 },
// //         width: '100%',
// //         maxWidth: 960,
// //         mx: 'auto',
// //         display: 'flex',
// //         flexDirection: 'column',
// //         alignItems: 'center',
// //         bgcolor: '#fff',
// //         borderRadius: 2,
// //         boxShadow: '0 1px 3px rgb(0 0 0 / 0.1), 0 1px 2px rgb(0 0 0 / 0.06)',
// //         overflowX: 'hidden',
// //       }}
// //     >
// //       {pageTitle && <Typography variant="h4" gutterBottom>{pageTitle}</Typography>}
// //       {pageDescription && <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, textAlign: 'center' }}>
// //         {pageDescription}
// //       </Typography>}
// //       {pageContent}
// //     </Box>
// //   );
// // }

// // DashboardPageContent.propTypes = {
// //   currentSegment: PropTypes.string.isRequired,
// //   loading: PropTypes.bool,
// // };

// // // --- Sidebar Navigation ---
// // function SidebarNavigation({ currentSegment, onNavigate }) {
// //   return (
// //     <List sx={{ width: 240, bgcolor: 'background.paper' }}>
// //       {NAVIGATION.map((item, idx) =>
// //         item.kind === 'header' ? (
// //           <Typography
// //             key={idx}
// //             variant="subtitle2"
// //             sx={{ p: 2, color: 'text.secondary', userSelect: 'none' }}
// //           >
// //             {item.title}
// //           </Typography>
// //         ) : (
// //           <ListItemButton
// //             key={item.segment}
// //             selected={currentSegment === item.segment}
// //             onClick={() => onNavigate(item.segment)}
// //           >
// //             <ListItemIcon>{item.icon}</ListItemIcon>
// //             <ListItemText primary={item.title} />
// //           </ListItemButton>
// //         )
// //       )}
// //     </List>
// //   );
// // }

// // SidebarNavigation.propTypes = {
// //   currentSegment: PropTypes.string.isRequired,
// //   onNavigate: PropTypes.func.isRequired,
// // };

// // // --- PatientDashboard Component ---
// // export const PatientDashboard = () => {
// //   const [currentSegment, setCurrentSegment] = useState('home');
// //   const [patient, setPatient] = useState({
// //     name: '',
// //     email: '',
// //     profilePic: '',
// //   });
// //   const [loadingPatientData, setLoadingPatientData] = useState(true);

// //   useEffect(() => {
// //     const loadPatientData = async () => {
// //       setLoadingPatientData(true);
// //       // CORRECTED: Retrieve 'userId' from storage, not '_id'
// //       const storedUserId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
// //       const storedUsername = localStorage.getItem('username') || sessionStorage.getItem('username');
// //       const storedEmail = localStorage.getItem('email') || sessionStorage.getItem('email');

// //       if (storedUserId && storedUsername && storedEmail) {
// //         let profileImageUrl = null;
// //         try {
// //           // Attempt to fetch user image from the user service using the stored userId
// //           // Ensure this URL is correct for your user service
// //           // Assuming http://localhost:2002/api/users/custom-id/ expects the MongoDB _id
// //           const userResponse = await fetch(`http://localhost:2002/api/users/custom-id/${storedUserId}`);
// //           if (userResponse.ok) {
// //             const userData = await userResponse.json();
// //             profileImageUrl = userData.image || null;
// //           } else {
// //             console.warn(`Could not fetch user image for userId ${storedUserId}: ${userResponse.status} ${userResponse.statusText}`);
// //           }
// //         } catch (fetchError) {
// //           console.error('Error fetching user profile image:', fetchError);
// //         }

// //         setPatient({
// //           name: storedUsername,
// //           email: storedEmail,
// //           profilePic: profileImageUrl || 'http://localhost:2004/default-profile.png', // Fallback to a default image
// //         });
// //       } else {
// //         console.warn('User data not found in storage. Redirecting to login or showing default.');
// //         // You might want to navigate to the login page here if the user is not authenticated
// //         // For example: navigate('/login'); (requires importing useNavigate from react-router-dom)
// //       }
// //       setLoadingPatientData(false);
// //     };

// //     loadPatientData();
// //   }, []);

// //   const handleLogout = () => {
// //     localStorage.clear();
// //     sessionStorage.clear();
// //     window.location.href = '/login';
// //   };

// //   const handleProfilePicChange = (file) => {
// //     const newPicUrl = URL.createObjectURL(file);
// //     setPatient((prev) => ({ ...prev, profilePic: newPicUrl }));
// //     alert('Profile picture updated locally. Implement server upload!');
// //   };

// //   const handleNavigate = (segment) => {
// //     const normalizedSegment = segment.startsWith('/') ? segment.slice(1) : segment;
// //     setCurrentSegment(normalizedSegment);
// //   };

// //   return (
// //     <ThemeProvider theme={theme}>
// //       <AppProvider
// //         navigation={NAVIGATION}
// //         router={{
// //           pathname: currentSegment,
// //           navigate: handleNavigate,
// //         }}
// //         theme={theme}
// //         branding={{ title: "Sarvotham's Spine Care" }}
// //       >
// //         <DashboardLayout
// //           slots={{
// //             drawerContent: () => (
// //               <SidebarNavigation currentSegment={currentSegment} onNavigate={handleNavigate} />
// //             ),
// //             toolbarAccount: () => (
// //               <ProfileMenu
// //                 patient={patient}
// //                 onLogout={handleLogout}
// //                 onProfilePicChange={handleProfilePicChange}
// //                 loading={loadingPatientData}
// //               />
// //             ),
// //           }}
// //         >
// //           <DashboardPageContent currentSegment={currentSegment} loading={loadingPatientData} />
// //         </DashboardLayout>
// //       </AppProvider>
// //     </ThemeProvider>
// //   );
// // };

// // export default PatientDashboard;



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
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import HomeIcon from '@mui/icons-material/Home';
// import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import BuildIcon from '@mui/icons-material/Build';
// import ContactMailIcon from '@mui/icons-material/ContactMail';
// import LogoutIcon from '@mui/icons-material/Logout';
// import CircularProgress from '@mui/material/CircularProgress';
// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';

// // Import your page components here
// import HomePage from './HomePage';
// import MyHealthPage from './MyHealthPage';
// import MyBillsPage from './MyBillsPage';
// import ServicesPage from './ServicesPage';
// import ContactPage from './ContactPage';

// // Utility functions for avatar color and initials
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

// function stringAvatar(name) {
//   const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'US';
//   return { sx: { bgcolor: stringToColor(name || 'Default User') }, children: initials };
// }

// const NAVIGATION = [
//   { kind: 'header', title: 'Navigation' },
//   { segment: 'home', title: 'Home', icon: <HomeIcon /> },
//   { segment: 'my-health', title: 'My Health', icon: <HealthAndSafetyIcon /> },
//   { segment: 'my-bills', title: 'My Bills', icon: <ReceiptLongIcon /> },
//   { segment: 'services', title: 'Services', icon: <BuildIcon /> },
//   { segment: 'contact', title: 'Contact', icon: <ContactMailIcon /> },
// ];

// const theme = createTheme({
//   palette: {
//     mode: 'light',
//     primary: { main: '#1976d2', contrastText: '#fff' },
//     secondary: { main: '#388e3c' },
//     background: { default: '#f5f7fa', paper: '#fff' },
//     error: { main: '#d32f2f' },
//     text: { primary: '#202124', secondary: '#5f6368' },
//   },
//   typography: { fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', h6: { fontWeight: 600, fontSize: '1.25rem' }, body1: { fontSize: '1rem' } },
//   components: { MuiTypography: { styleOverrides: { root: { lineHeight: 1.5 } } } },
// });

// function ProfileMenu({ patient, onLogout, onProfilePicChange, loading }) {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const handleOpen = (e) => setAnchorEl(e.currentTarget);
//   const handleClose = () => setAnchorEl(null);
//   const handleProfilePicChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       onProfilePicChange(e.target.files[0]);
//       handleClose();
//     }
//   };

//   if (loading) return <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40 }}><CircularProgress size={24} color="inherit" /></Box>;

//   return (
//     <>
//       <Tooltip title="Open Profile Menu">
//         <IconButton onClick={handleOpen} size="small" sx={{ ml: 2 }} aria-controls={anchorEl ? 'profile-menu' : undefined} aria-haspopup="true" aria-expanded={anchorEl ? 'true' : undefined}>
//           {patient.profilePic ? <Avatar alt={patient.name} src={patient.profilePic} sx={{ width: 40, height: 40 }} /> : <Avatar {...stringAvatar(patient.name)} sx={{ width: 40, height: 40 }} />}
//         </IconButton>
//       </Tooltip>

//       <Menu anchorEl={anchorEl} id="profile-menu" open={Boolean(anchorEl)} onClose={handleClose} onClick={handleClose}
//             PaperProps={{ elevation: 4, sx: { mt: 1.5, minWidth: 240, p: 2, boxShadow: 'rgb(0 0 0 / 0.2) 0px 2px 8px' } }}
//             transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//             anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//           {patient.profilePic ? <Avatar alt={patient.name} src={patient.profilePic} sx={{ width: 64, height: 64, mr: 2 }} /> : <Avatar {...stringAvatar(patient.name)} sx={{ width: 64, height: 64, mr: 2 }} />}
//           <Box>
//             <Typography variant="h6" noWrap>{patient.name}</Typography>
//             <Typography variant="body2" color="text.secondary" noWrap>{patient.email}</Typography>
//           </Box>
//         </Box>
//         <MenuItem>
//           <label htmlFor="upload-profile-pic" style={{ cursor: 'pointer', width: '100%' }}>Change Profile Picture</label>
//           <input id="upload-profile-pic" type="file" accept="image/*" onChange={handleProfilePicChange} style={{ display: 'none' }} />
//         </MenuItem>
//         <MenuItem onClick={onLogout}>
//           <LogoutIcon fontSize="small" sx={{ mr: 1, color: '#d32f2f' }} /> Logout
//         </MenuItem>
//       </Menu>
//     </>
//   );
// }

// ProfileMenu.propTypes = {
//   patient: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     profilePic: PropTypes.string,
//   }).isRequired,
//   onLogout: PropTypes.func.isRequired,
//   onProfilePicChange: PropTypes.func.isRequired,
//   loading: PropTypes.bool,
// };

// function DashboardPageContent({ currentSegment, loading }) {
//   if (loading) return <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center', width: '100%' }}><CircularProgress /></Box>;

//   switch (currentSegment) {
//     case 'home': return <HomePage />;
//     case 'my-health': return <MyHealthPage />;
//     case 'my-bills': return <MyBillsPage />;
//     case 'services': return <ServicesPage />;
//     case 'contact': return <ContactPage />;
//     default:
//       return (
//         <Box sx={{ mt: 4, textAlign: 'center' }}>
//           <Typography variant="h5" gutterBottom>404 - Page Not Found</Typography>
//           <Typography variant="body1">Sorry, the page you are looking for doesn't exist.</Typography>
//         </Box>
//       );
//   }
// }

// DashboardPageContent.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   loading: PropTypes.bool,
// };

// function SidebarNavigation({ currentSegment, onNavigate }) {
//   return (
//     <List sx={{ width: 240, bgcolor: 'background.paper' }}>
//       {NAVIGATION.map((item, idx) =>
//         item.kind === 'header' ? (
//           <Typography key={idx} variant="subtitle2" sx={{ p: 2, color: 'text.secondary', userSelect: 'none' }}>{item.title}</Typography>
//         ) : (
//           <ListItemButton key={item.segment} selected={currentSegment === item.segment} onClick={() => onNavigate(item.segment)}>
//             <ListItemIcon>{item.icon}</ListItemIcon>
//             <ListItemText primary={item.title} />
//           </ListItemButton>
//         )
//       )}
//     </List>
//   );
// }

// SidebarNavigation.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   onNavigate: PropTypes.func.isRequired,
// };

// export const PatientDashboard = () => {
//   const [currentSegment, setCurrentSegment] = useState('home');
//   const [patient, setPatient] = useState({ name: '', email: '', profilePic: '' });
//   const [loadingPatientData, setLoadingPatientData] = useState(true);

//   useEffect(() => {
//     const loadPatientData = () => {
//       setLoadingPatientData(true);
//       const storedUserId = sessionStorage.getItem('userId');
//       const storedUsername = sessionStorage.getItem('username');
//       const storedEmail = sessionStorage.getItem('email');
//       const storedProfilePic = sessionStorage.getItem('profilePic');

//       if (storedUserId && storedUsername && storedEmail) {
//         console.log('Logged-in user details:', {
//           userId: storedUserId,
//           username: storedUsername,
//           email: storedEmail,
//           profilePic: storedProfilePic,
//         });

//         setPatient({
//           name: storedUsername,
//           email: storedEmail,
//           profilePic: storedProfilePic || 'http://localhost:2004/default-profile.png',
//         });
//       } else {
//         console.warn('User data not found in storage. Redirecting to login.');
//         window.location.href = '/login';
//       }
//       setLoadingPatientData(false);
//     };
//     loadPatientData();
//   }, []);

//   const handleLogout = () => {
//     sessionStorage.clear();
//     window.location.href = '/login';
//   };

//   const handleProfilePicChange = (file) => {
//     const newPicUrl = URL.createObjectURL(file);
//     setPatient((prev) => ({ ...prev, profilePic: newPicUrl }));
//     alert('Profile picture updated locally. Implement server upload!');
//   };

//   const handleNavigate = (segment) => {
//     const normalizedSegment = segment.startsWith('/') ? segment.slice(1) : segment;
//     setCurrentSegment(normalizedSegment);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <AppProvider navigation={NAVIGATION} router={{ pathname: currentSegment, navigate: handleNavigate }} theme={theme} branding={{ title: "Sarvotham's Spine Care" }}>
//         <DashboardLayout slots={{
//           drawerContent: () => <SidebarNavigation currentSegment={currentSegment} onNavigate={handleNavigate} />,
//           toolbarAccount: () => <ProfileMenu patient={patient} onLogout={handleLogout} onProfilePicChange={handleProfilePicChange} loading={loadingPatientData} />,
//         }}>
//           <DashboardPageContent currentSegment={currentSegment} loading={loadingPatientData} />
//         </DashboardLayout>
//       </AppProvider>
//     </ThemeProvider>
//   );
// };

// export default PatientDashboard;
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
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import HomeIcon from '@mui/icons-material/Home';
// import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import BuildIcon from '@mui/icons-material/Build';
// import ContactMailIcon from '@mui/icons-material/ContactMail';
// import LogoutIcon from '@mui/icons-material/Logout';
// import CircularProgress from '@mui/material/CircularProgress';
// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';

// // Import your page components here
// import HomePage from './HomePage';
// import MyHealthPage from './MyHealthPage';  // <-- receives patient as prop
// import MyBillsPage from './MyBillsPage';
// import ServicesPage from './ServicesPage';
// import ContactPage from './ContactPage';

// // Utility functions for avatar color and initials
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

// function stringAvatar(name) {
//   const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'US';
//   return { sx: { bgcolor: stringToColor(name || 'Default User') }, children: initials };
// }

// const NAVIGATION = [
//   { kind: 'header', title: 'Navigation' },
//   { segment: 'home', title: 'Home', icon: <HomeIcon /> },
//   { segment: 'my-health', title: 'My Health', icon: <HealthAndSafetyIcon /> },
//   { segment: 'my-bills', title: 'My Bills', icon: <ReceiptLongIcon /> },
//   { segment: 'services', title: 'Services', icon: <BuildIcon /> },
//   { segment: 'contact', title: 'Contact', icon: <ContactMailIcon /> },
// ];

// const theme = createTheme({
//   palette: {
//     mode: 'light',
//     primary: { main: '#1976d2', contrastText: '#fff' },
//     secondary: { main: '#388e3c' },
//     background: { default: '#f5f7fa', paper: '#fff' },
//     error: { main: '#d32f2f' },
//     text: { primary: '#202124', secondary: '#5f6368' },
//   },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     h6: { fontWeight: 600, fontSize: '1.25rem' },
//     body1: { fontSize: '1rem' },
//   },
//   components: { MuiTypography: { styleOverrides: { root: { lineHeight: 1.5 } } } },
// });

// function ProfileMenu({ patient, onLogout, onProfilePicChange, loading }) {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const handleOpen = (e) => setAnchorEl(e.currentTarget);
//   const handleClose = () => setAnchorEl(null);
//   const handleProfilePicChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       onProfilePicChange(e.target.files[0]);
//       handleClose();
//     }
//   };

//   if (loading)
//     return (
//       <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40 }}>
//         <CircularProgress size={24} color="inherit" />
//       </Box>
//     );

//   return (
//     <>
//       <Tooltip title="Open Profile Menu">
//         <IconButton
//           onClick={handleOpen}
//           size="small"
//           sx={{ ml: 2 }}
//           aria-controls={anchorEl ? 'profile-menu' : undefined}
//           aria-haspopup="true"
//           aria-expanded={anchorEl ? 'true' : undefined}
//         >
//           {patient.profilePic ? (
//             <Avatar alt={patient.name} src={patient.profilePic} sx={{ width: 40, height: 40 }} />
//           ) : (
//             <Avatar {...stringAvatar(patient.name)} sx={{ width: 40, height: 40 }} />
//           )}
//         </IconButton>
//       </Tooltip>

//       <Menu
//         anchorEl={anchorEl}
//         id="profile-menu"
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//         onClick={handleClose}
//         PaperProps={{
//           elevation: 4,
//           sx: {
//             mt: 1.5,
//             minWidth: 240,
//             p: 2,
//             boxShadow: 'rgb(0 0 0 / 0.2) 0px 2px 8px',
//           },
//         }}
//         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//       >
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//           {patient.profilePic ? (
//             <Avatar alt={patient.name} src={patient.profilePic} sx={{ width: 64, height: 64, mr: 2 }} />
//           ) : (
//             <Avatar {...stringAvatar(patient.name)} sx={{ width: 64, height: 64, mr: 2 }} />
//           )}
//           <Box>
//             <Typography variant="h6" noWrap>
//               {patient.name}
//             </Typography>
//             <Typography variant="body2" color="text.secondary" noWrap>
//               {patient.email}
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
//             onChange={handleProfilePicChange}
//             style={{ display: 'none' }}
//           />
//         </MenuItem>
//         <MenuItem onClick={onLogout}>
//           <LogoutIcon fontSize="small" sx={{ mr: 1, color: '#d32f2f' }} /> Logout
//         </MenuItem>
//       </Menu>
//     </>
//   );
// }

// ProfileMenu.propTypes = {
//   patient: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     profilePic: PropTypes.string,
//   }).isRequired,
//   onLogout: PropTypes.func.isRequired,
//   onProfilePicChange: PropTypes.func.isRequired,
//   loading: PropTypes.bool,
// };

// function DashboardPageContent({ currentSegment, loading, patient }) {
//   if (loading)
//     return (
//       <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center', width: '100%' }}>
//         <CircularProgress />
//       </Box>
//     );

//   switch (currentSegment) {
//     case 'home':
//       return <HomePage />;
//     case 'my-health':
//       return <MyHealthPage patient={patient} />; // Pass patient prop here
//     case 'my-bills':
//       return <MyBillsPage />;
//     case 'services':
//       return <ServicesPage />;
//     case 'contact':
//       return <ContactPage />;
//     default:
//       return (
//         <Box sx={{ mt: 4, textAlign: 'center' }}>
//           <Typography variant="h5" gutterBottom>
//             404 - Page Not Found
//           </Typography>
//           <Typography variant="body1">Sorry, the page you are looking for doesn't exist.</Typography>
//         </Box>
//       );
//   }
// }

// DashboardPageContent.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   loading: PropTypes.bool,
//   patient: PropTypes.shape({
//     name: PropTypes.string,
//     email: PropTypes.string,
//     profilePic: PropTypes.string,
//   }),
// };

// function SidebarNavigation({ currentSegment, onNavigate }) {
//   return (
//     <List sx={{ width: 240, bgcolor: 'background.paper' }}>
//       {NAVIGATION.map((item, idx) =>
//         item.kind === 'header' ? (
//           <Typography key={idx} variant="subtitle2" sx={{ p: 2, color: 'text.secondary', userSelect: 'none' }}>
//             {item.title}
//           </Typography>
//         ) : (
//           <ListItemButton key={item.segment} selected={currentSegment === item.segment} onClick={() => onNavigate(item.segment)}>
//             <ListItemIcon>{item.icon}</ListItemIcon>
//             <ListItemText primary={item.title} />
//           </ListItemButton>
//         )
//       )}
//     </List>
//   );
// }

// SidebarNavigation.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   onNavigate: PropTypes.func.isRequired,
// };

// export const PatientDashboard = () => {
//   const [currentSegment, setCurrentSegment] = useState('home');
//   const [patient, setPatient] = useState({ name: '', email: '', profilePic: '' });
//   const [loadingPatientData, setLoadingPatientData] = useState(true);

//   useEffect(() => {
//     const loadPatientData = async () => {
//       setLoadingPatientData(true);

//       // Assuming the user data is stored in sessionStorage after login
//       const storedUserId = sessionStorage.getItem('userId');
//       const storedUsername = sessionStorage.getItem('username');
//       const storedEmail = sessionStorage.getItem('email');
//       const storedProfilePic = sessionStorage.getItem('profilePic');

//       if (storedUserId && storedUsername && storedEmail) {
//         console.log('Logged-in user details:', {
//           userId: storedUserId,
//           username: storedUsername,
//           email: storedEmail,
//           profilePic: storedProfilePic,
//         });

//         setPatient({
//           name: storedUsername,
//           email: storedEmail,
//           profilePic: storedProfilePic || 'http://localhost:2004/default-profile.png',
//           userId: storedUserId, // add if needed for MyHealthPage
//         });
//       } else {
//         console.warn('User data not found in storage. Redirecting to login.');
//         window.location.href = '/login';
//       }

//       setLoadingPatientData(false);
//     };

//     loadPatientData();
//   }, []);

//   const handleLogout = () => {
//     sessionStorage.clear();
//     window.location.href = '/login';
//   };

//   const handleProfilePicChange = (file) => {
//     const newPicUrl = URL.createObjectURL(file);
//     setPatient((prev) => ({ ...prev, profilePic: newPicUrl }));
//     alert('Profile picture updated locally. Implement server upload!');
//   };

//   const handleNavigate = (segment) => {
//     const normalizedSegment = segment.startsWith('/') ? segment.slice(1) : segment;
//     setCurrentSegment(normalizedSegment);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <AppProvider
//         navigation={NAVIGATION}
//         router={{
//           pathname: currentSegment,
//           navigate: handleNavigate,
//         }}
//         theme={theme}
//         branding={{ title: "Sarvotham's Spine Care" }}
//       >
//         <DashboardLayout
//           slots={{
//             drawerContent: () => <SidebarNavigation currentSegment={currentSegment} onNavigate={handleNavigate} />,
//             toolbarAccount: () => (
//               <ProfileMenu patient={patient} onLogout={handleLogout} onProfilePicChange={handleProfilePicChange} loading={loadingPatientData} />
//             ),
//           }}
//         >
//           <DashboardPageContent currentSegment={currentSegment} loading={loadingPatientData} patient={patient} />
//         </DashboardLayout>
//       </AppProvider>
//     </ThemeProvider>
//   );
// };

// export default PatientDashboard;
// PatientDashboard.jsx

// PatientDashboard.jsx

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
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// import HomeIcon from '@mui/icons-material/Home';
// import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import BuildIcon from '@mui/icons-material/Build';
// import ContactMailIcon from '@mui/icons-material/ContactMail';
// import LogoutIcon from '@mui/icons-material/Logout';
// import CircularProgress from '@mui/material/CircularProgress';

// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';

// // Import your page components here
// import HomePage from './HomePage';
// import MyHealthPage from './MyHealthPage'; // expects patient prop
// import MyBillsPage from './MyBillsPage';
// import ServicesPage from './ServicesPage';
// import ContactPage from './ContactPage';

// // Utility: Generate consistent avatar background color from string
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

// // Utility: Generate avatar initials and styles
// function stringAvatar(name) {
//   const initials = name
//     ? name
//         .split(' ')
//         .map(n => n[0])
//         .join('')
//         .toUpperCase()
//     : 'US';
//   return {
//     sx: { bgcolor: stringToColor(name || 'Default User') },
//     children: initials,
//   };
// }

// const NAVIGATION = [
//   { kind: 'header', title: 'Navigation' },
//   { segment: 'home', title: 'Home', icon: <HomeIcon /> },
//   { segment: 'my-health', title: 'My Health', icon: <HealthAndSafetyIcon /> },
//   { segment: 'my-bills', title: 'My Bills', icon: <ReceiptLongIcon /> },
//   { segment: 'services', title: 'Services', icon: <BuildIcon /> },
//   { segment: 'contact', title: 'Contact', icon: <ContactMailIcon /> },
// ];

// const theme = createTheme({
//   palette: {
//     mode: 'light',
//     primary: { main: '#1976d2', contrastText: '#fff' },
//     secondary: { main: '#388e3c' },
//     background: { default: '#f5f7fa', paper: '#fff' },
//     error: { main: '#d32f2f' },
//     text: { primary: '#202124', secondary: '#5f6368' },
//   },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     h6: { fontWeight: 600, fontSize: '1.25rem' },
//     body1: { fontSize: '1rem' },
//   },
//   components: {
//     MuiTypography: {
//       styleOverrides: {
//         root: { lineHeight: 1.5 },
//       },
//     },
//   },
// });

// function ProfileMenu({ patient, onLogout, onProfilePicChange, loading }) {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const handleOpen = e => setAnchorEl(e.currentTarget);
//   const handleClose = () => setAnchorEl(null);

//   const handleProfilePicChange = e => {
//     if (e.target.files && e.target.files[0]) {
//       onProfilePicChange(e.target.files[0]);
//       handleClose();
//     }
//   };

//   if (loading)
//     return (
//       <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40 }}>
//         <CircularProgress size={24} color="inherit" />
//       </Box>
//     );

//   return (
//     <>
//       <Tooltip title="Open Profile Menu">
//         <IconButton
//           onClick={handleOpen}
//           size="small"
//           sx={{ ml: 2 }}
//           aria-controls={anchorEl ? 'profile-menu' : undefined}
//           aria-haspopup="true"
//           aria-expanded={anchorEl ? 'true' : undefined}
//         >
//           {patient.profilePic ? (
//             <Avatar alt={patient.name} src={patient.profilePic} sx={{ width: 40, height: 40 }} />
//           ) : (
//             <Avatar {...stringAvatar(patient.name)} sx={{ width: 40, height: 40 }} />
//           )}
//         </IconButton>
//       </Tooltip>

//       <Menu
//         anchorEl={anchorEl}
//         id="profile-menu"
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//         onClick={handleClose}
//         PaperProps={{
//           elevation: 4,
//           sx: { mt: 1.5, minWidth: 240, p: 2, boxShadow: 'rgb(0 0 0 / 0.2) 0px 2px 8px' },
//         }}
//         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//       >
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//           {patient.profilePic ? (
//             <Avatar alt={patient.name} src={patient.profilePic} sx={{ width: 64, height: 64, mr: 2 }} />
//           ) : (
//             <Avatar {...stringAvatar(patient.name)} sx={{ width: 64, height: 64, mr: 2 }} />
//           )}
//           <Box>
//             <Typography variant="h6" noWrap>
//               {patient.name}
//             </Typography>
//             <Typography variant="body2" color="text.secondary" noWrap>
//               {patient.email}
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
//             onChange={handleProfilePicChange}
//             style={{ display: 'none' }}
//           />
//         </MenuItem>
//         <MenuItem onClick={onLogout}>
//           <LogoutIcon fontSize="small" sx={{ mr: 1, color: '#d32f2f' }} /> Logout
//         </MenuItem>
//       </Menu>
//     </>
//   );
// }

// ProfileMenu.propTypes = {
//   patient: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     profilePic: PropTypes.string,
//   }).isRequired,
//   onLogout: PropTypes.func.isRequired,
//   onProfilePicChange: PropTypes.func.isRequired,
//   loading: PropTypes.bool,
// };

// function DashboardPageContent({ currentSegment, loading, patient }) {
//   if (loading)
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

//   switch (currentSegment) {
//     case 'home':
//       return <HomePage />;
//     case 'my-health':
//       return <MyHealthPage patient={patient} />;
//     case 'my-bills':
//       return <MyBillsPage />;
//     case 'services':
//       return <ServicesPage />;
//     case 'contact':
//       return <ContactPage />;
//     default:
//       return (
//         <Box
//           sx={{
//             mt: 0,
//             p: 0,
//             m: 0,
//             width: '100%',
//             height: '100%',
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <Typography variant="h5" gutterBottom>
//             404 - Page Not Found
//           </Typography>
//           <Typography variant="body1">Sorry, the page you are looking for doesn't exist.</Typography>
//         </Box>
//       );
//   }
// }

// DashboardPageContent.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   loading: PropTypes.bool,
//   patient: PropTypes.shape({
//     name: PropTypes.string,
//     email: PropTypes.string,
//     profilePic: PropTypes.string,
//   }),
// };

// function SidebarNavigation({ currentSegment, onNavigate }) {
//   return (
//     <List sx={{ width: 240, bgcolor: 'background.paper' }}>
//       {NAVIGATION.map((item, idx) =>
//         item.kind === 'header' ? (
//           <Typography key={idx} variant="subtitle2" sx={{ p: 2, color: 'text.secondary', userSelect: 'none' }}>
//             {item.title}
//           </Typography>
//         ) : (
//           <ListItemButton
//             key={item.segment}
//             selected={currentSegment === item.segment}
//             onClick={() => onNavigate(item.segment)}
//           >
//             <ListItemIcon>{item.icon}</ListItemIcon>
//             <ListItemText primary={item.title} />
//           </ListItemButton>
//         ),
//       )}
//     </List>
//   );
// }

// SidebarNavigation.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   onNavigate: PropTypes.func.isRequired,
// };

// const PatientDashboard = () => {
//   const [currentSegment, setCurrentSegment] = useState('home');
//   const [patient, setPatient] = useState({ name: '', email: '', profilePic: '', userId: '' });
//   const [loadingPatientData, setLoadingPatientData] = useState(true);

//   useEffect(() => {
//     const loadPatientData = async () => {
//       setLoadingPatientData(true);

//       const storedUserId = sessionStorage.getItem('userId');
//       const storedUsername = sessionStorage.getItem('username');
//       const storedEmail = sessionStorage.getItem('email');
//       const storedProfilePic = sessionStorage.getItem('profilePic');

//       if (storedUserId && storedUsername && storedEmail) {
//         setPatient({
//           name: storedUsername,
//           email: storedEmail,
//           profilePic: storedProfilePic || 'http://localhost:2004/default-profile.png',
//           userId: storedUserId,
//         });
//       } else {
//         window.location.href = '/login';
//       }
//       setLoadingPatientData(false);
//     };
//     loadPatientData();
//   }, []);

//   const handleLogout = () => {
//     sessionStorage.clear();
//     window.location.href = '/login';
//   };

//   const handleProfilePicChange = file => {
//     const newPicUrl = URL.createObjectURL(file);
//     setPatient(prev => ({ ...prev, profilePic: newPicUrl }));
//     alert('Profile picture updated locally. Implement server upload!');
//   };

//   const handleNavigate = segment => {
//     // Normalize segment string and update currentSegment
//     const normalizedSegment = segment.startsWith('/') ? segment.slice(1) : segment;
//     setCurrentSegment(normalizedSegment);
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
//           navigation={NAVIGATION}
//           router={{ pathname: currentSegment, navigate: handleNavigate }}
//           theme={theme}
//           branding={{ title: "Sarvotham's Spine Care" }}
//         >
//           <DashboardLayout
//             sx={{ flex: 1, p: 0, m: 0, height: '100%' }}
//             slots={{
//               drawerContent: () => (
//                 <SidebarNavigation currentSegment={currentSegment} onNavigate={handleNavigate} />
//               ),
//               toolbarAccount: () => (
//                 <ProfileMenu
//                   patient={patient}
//                   onLogout={handleLogout}
//                   onProfilePicChange={handleProfilePicChange}
//                   loading={loadingPatientData}
//                 />
//               ),
//             }}
//           >
//             <DashboardPageContent currentSegment={currentSegment} loading={loadingPatientData} patient={patient} />
//           </DashboardLayout>
//         </AppProvider>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default PatientDashboard;
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
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// import HomeIcon from '@mui/icons-material/Home';
// import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import BuildIcon from '@mui/icons-material/Build';
// import ContactMailIcon from '@mui/icons-material/ContactMail';
// import LogoutIcon from '@mui/icons-material/Logout';
// import CircularProgress from '@mui/material/CircularProgress';

// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';

// // Import your page components here
// import HomePage from './HomePage';
// import MyHealthPage from './MyHealthPage'; // expects patient prop
// import MyBillsPage from './MyBillsPage';
// import ServicesPage from './ServicesPage';
// import ContactPage from './ContactPage';

// // Utility: Generate consistent avatar background color from string
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

// // Utility: Generate avatar initials and styles
// function stringAvatar(name) {
//   const initials = name
//     ? name
//         .split(' ')
//         .map(n => n[0])
//         .join('')
//         .toUpperCase()
//     : 'US';
//   return {
//     sx: { bgcolor: stringToColor(name || 'Default User') },
//     children: initials,
//   };
// }

// const NAVIGATION = [
//   { kind: 'header', title: 'Navigation' },
//   { segment: 'home', title: 'Home', icon: <HomeIcon /> },
//   { segment: 'my-health', title: 'My Health', icon: <HealthAndSafetyIcon /> },
//   { segment: 'my-bills', title: 'My Bills', icon: <ReceiptLongIcon /> },
//   { segment: 'services', title: 'Services', icon: <BuildIcon /> },
//   { segment: 'contact', title: 'Contact', icon: <ContactMailIcon /> },
// ];

// const theme = createTheme({
//   palette: {
//     mode: 'light',
//     primary: { main: '#1976d2', contrastText: '#fff' },
//     secondary: { main: '#388e3c' },
//     background: { default: '#f5f7fa', paper: '#fff' },
//     error: { main: '#d32f2f' },
//     text: { primary: '#202124', secondary: '#5f6368' },
//   },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     h6: { fontWeight: 600, fontSize: '1.25rem' },
//     body1: { fontSize: '1rem' },
//   },
//   components: {
//     MuiTypography: {
//       styleOverrides: {
//         root: { lineHeight: 1.5 },
//       },
//     },
//   },
// });

// function ProfileMenu({ patient, onLogout, onProfilePicChange, loading }) {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const handleOpen = e => setAnchorEl(e.currentTarget);
//   const handleClose = () => setAnchorEl(null);

//   const handleProfilePicChange = e => {
//     if (e.target.files && e.target.files[0]) {
//       onProfilePicChange(e.target.files[0]);
//       handleClose();
//     }
//   };

//   if (loading)
//     return (
//       <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40 }}>
//         <CircularProgress size={24} color="inherit" />
//       </Box>
//     );

//   return (
//     <>
//       <Tooltip title="Open Profile Menu">
//         <IconButton
//           onClick={handleOpen}
//           size="small"
//           sx={{ ml: 2 }}
//           aria-controls={anchorEl ? 'profile-menu' : undefined}
//           aria-haspopup="true"
//           aria-expanded={anchorEl ? 'true' : undefined}
//         >
//           {patient.profilePic ? (
//             <Avatar alt={patient.name} src={patient.profilePic} sx={{ width: 40, height: 40 }} />
//           ) : (
//             <Avatar {...stringAvatar(patient.name)} sx={{ width: 40, height: 40 }} />
//           )}
//         </IconButton>
//       </Tooltip>

//       <Menu
//         anchorEl={anchorEl}
//         id="profile-menu"
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//         onClick={handleClose}
//         PaperProps={{
//           elevation: 4,
//           sx: { mt: 1.5, minWidth: 240, p: 2, boxShadow: 'rgb(0 0 0 / 0.2) 0px 2px 8px' },
//         }}
//         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//       >
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//           {patient.profilePic ? (
//             <Avatar alt={patient.name} src={patient.profilePic} sx={{ width: 64, height: 64, mr: 2 }} />
//           ) : (
//             <Avatar {...stringAvatar(patient.name)} sx={{ width: 64, height: 64, mr: 2 }} />
//           )}
//           <Box>
//             <Typography variant="h6" noWrap>
//               {patient.name}
//             </Typography>
//             <Typography variant="body2" color="text.secondary" noWrap>
//               {patient.email}
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
//             onChange={handleProfilePicChange}
//             style={{ display: 'none' }}
//           />
//         </MenuItem>
//         <MenuItem onClick={onLogout}>
//           <LogoutIcon fontSize="small" sx={{ mr: 1, color: '#d32f2f' }} /> Logout
//         </MenuItem>
//       </Menu>
//     </>
//   );
// }

// ProfileMenu.propTypes = {
//   patient: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     profilePic: PropTypes.string,
//   }).isRequired,
//   onLogout: PropTypes.func.isRequired,
//   onProfilePicChange: PropTypes.func.isRequired,
//   loading: PropTypes.bool,
// };

// function DashboardPageContent({ currentSegment, loading, patient }) {
//   if (loading)
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

//   switch (currentSegment) {
//     case 'home':
//       return <HomePage patient={patient} />; {/* Pass patient prop to HomePage */}
//     case 'my-health':
//       return <MyHealthPage patient={patient} />;
//     case 'my-bills':
//       return <MyBillsPage />;
//     case 'services':
//       return <ServicesPage />;
//     case 'contact':
//       return <ContactPage />;
//     default:
//       return (
//         <Box
//           sx={{
//             mt: 0,
//             p: 0,
//             m: 0,
//             width: '100%',
//             height: '100%',
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <Typography variant="h5" gutterBottom>
//             404 - Page Not Found
//           </Typography>
//           <Typography variant="body1">Sorry, the page you are looking for doesn't exist.</Typography>
//         </Box>
//       );
//   }
// }

// DashboardPageContent.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   loading: PropTypes.bool,
//   patient: PropTypes.shape({
//     name: PropTypes.string,
//     email: PropTypes.string,
//     profilePic: PropTypes.string,
//     userId: PropTypes.string, // Added userId to propTypes
//   }),
// };

// function SidebarNavigation({ currentSegment, onNavigate }) {
//   return (
//     <List sx={{ width: 240, bgcolor: 'background.paper' }}>
//       {NAVIGATION.map((item, idx) =>
//         item.kind === 'header' ? (
//           <Typography key={idx} variant="subtitle2" sx={{ p: 2, color: 'text.secondary', userSelect: 'none' }}>
//             {item.title}
//           </Typography>
//         ) : (
//           <ListItemButton
//             key={item.segment}
//             selected={currentSegment === item.segment}
//             onClick={() => onNavigate(item.segment)}
//           >
//             <ListItemIcon>{item.icon}</ListItemIcon>
//             <ListItemText primary={item.title} />
//           </ListItemButton>
//         ),
//       )}
//     </List>
//   );
// }

// SidebarNavigation.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   onNavigate: PropTypes.func.isRequired,
// };

// const PatientDashboard = () => {
//   const [currentSegment, setCurrentSegment] = useState('home');
//   const [patient, setPatient] = useState({ name: '', email: '', profilePic: '', userId: '' });
//   const [loadingPatientData, setLoadingPatientData] = useState(true);

//   useEffect(() => {
//     const loadPatientData = async () => {
//       setLoadingPatientData(true);

//       const storedUserId = sessionStorage.getItem('userId');
//       const storedUsername = sessionStorage.getItem('username');
//       const storedEmail = sessionStorage.getItem('email');
//       const storedProfilePic = sessionStorage.getItem('profilePic');

//       if (storedUserId && storedUsername && storedEmail) {
//         setPatient({
//           name: storedUsername,
//           email: storedEmail,
//           profilePic: storedProfilePic || 'http://localhost:2004/default-profile.png',
//           userId: storedUserId,
//         });
//       } else {
//         window.location.href = '/login';
//       }
//       setLoadingPatientData(false);
//     };
//     loadPatientData();
//   }, []);

//   const handleLogout = () => {
//     sessionStorage.clear();
//     window.location.href = '/login';
//   };

//   const handleProfilePicChange = file => {
//     const newPicUrl = URL.createObjectURL(file);
//     setPatient(prev => ({ ...prev, profilePic: newPicUrl }));
//     alert('Profile picture updated locally. Implement server upload!');
//   };

//   const handleNavigate = segment => {
//     // Normalize segment string and update currentSegment
//     const normalizedSegment = segment.startsWith('/') ? segment.slice(1) : segment;
//     setCurrentSegment(normalizedSegment);
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
//           navigation={NAVIGATION}
//           router={{ pathname: currentSegment, navigate: handleNavigate }}
//           theme={theme}
//           branding={{ title: "Sarvotham's Spine Care" }}
//         >
//           <DashboardLayout
//             sx={{ flex: 1, p: 0, m: 0, height: '100%' }}
//             slots={{
//               drawerContent: () => (
//                 <SidebarNavigation currentSegment={currentSegment} onNavigate={handleNavigate} />
//               ),
//               toolbarAccount: () => (
//                 <ProfileMenu
//                   patient={patient}
//                   onLogout={handleLogout}
//                   onProfilePicChange={handleProfilePicChange}
//                   loading={loadingPatientData}
//                 />
//               ),
//             }}
//           >
//             <DashboardPageContent currentSegment={currentSegment} loading={loadingPatientData} patient={patient} />
//           </DashboardLayout>
//         </AppProvider>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default PatientDashboard;



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
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import CircularProgress from '@mui/material/CircularProgress';

// import HomeIcon from '@mui/icons-material/Home';
// import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import BuildIcon from '@mui/icons-material/Build';
// import ContactMailIcon from '@mui/icons-material/ContactMail';
// import LogoutIcon from '@mui/icons-material/Logout';

// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';

// import HomePage from './HomePage';
// import MyHealthPage from './MyHealthPage';
// import MyBillsPage from './MyBillsPage';
// import ServicesPage from './ServicesPage';
// import ContactPage from './ContactPage';


// // Utility function to generate consistent avatar background color
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

// // Utility to generate avatar initials with colored background
// function stringAvatar(name) {
//   const initials = name
//     ? name
//         .split(' ')
//         .map((n) => n[0])
//         .join('')
//         .toUpperCase()
//     : 'US';
//   return {
//     sx: { bgcolor: stringToColor(name || 'Default User') },
//     children: initials,
//   };
// }

// // Define navigation items with segments, titles and icons
// const NAVIGATION = [
//   { kind: 'header', title: 'Navigation' },
//   { segment: 'home', title: 'Home', icon: <HomeIcon /> },
//   { segment: 'my-health', title: 'My Health', icon: <HealthAndSafetyIcon /> },
//   { segment: 'my-bills', title: 'My Bills', icon: <ReceiptLongIcon /> },
//   { segment: 'services', title: 'Services', icon: <BuildIcon /> },
//   { segment: 'contact', title: 'Contact', icon: <ContactMailIcon /> },
// ];

// // Material-UI theme for consistency in colors and typography
// const theme = createTheme({
//   palette: {
//     mode: 'light',
//     primary: { main: '#1976d2', contrastText: '#fff' },
//     secondary: { main: '#388e3c' },
//     background: { default: '#f5f7fa', paper: '#fff' },
//     error: { main: '#d32f2f' },
//     text: { primary: '#202124', secondary: '#5f6368' },
//   },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     h6: { fontWeight: 600, fontSize: '1.25rem' },
//     body1: { fontSize: '1rem' },
//   },
//   components: {
//     MuiTypography: {
//       styleOverrides: {
//         root: { lineHeight: 1.5 },
//       },
//     },
//   },
// });

// // Profile menu component with logout and profile pic change
// function ProfileMenu({ patient, onLogout, onProfilePicChange, loading }) {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);

//   const handleOpen = (e) => setAnchorEl(e.currentTarget);
//   const handleClose = () => setAnchorEl(null);

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
//           {patient.profilePic ? (
//             <Avatar alt={patient.name} src={patient.profilePic} sx={{ width: 40, height: 40 }} />
//           ) : (
//             <Avatar {...stringAvatar(patient.name)} sx={{ width: 40, height: 40 }} />
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
//           sx: { mt: 1.5, minWidth: 240, p: 2, boxShadow: 'rgba(0,0,0,0.2) 0px 2px 8px' },
//         }}
//         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//       >
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//           {patient.profilePic ? (
//             <Avatar alt={patient.name} src={patient.profilePic} sx={{ width: 64, height: 64, mr: 2 }} />
//           ) : (
//             <Avatar {...stringAvatar(patient.name)} sx={{ width: 64, height: 64, mr: 2 }} />
//           )}
//           <Box>
//             <Typography variant="h6" noWrap>
//               {patient.name}
//             </Typography>
//             <Typography variant="body2" color="text.secondary" noWrap>
//               {patient.email}
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
//         <MenuItem onClick={onLogout} sx={{ color: 'error.main' }}>
//           <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
//           Logout
//         </MenuItem>
//       </Menu>
//     </>
//   );
// }

// ProfileMenu.propTypes = {
//   patient: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     profilePic: PropTypes.string,
//   }).isRequired,
//   onLogout: PropTypes.func.isRequired,
//   onProfilePicChange: PropTypes.func.isRequired,
//   loading: PropTypes.bool,
// };

// // Main page content renderer based on current segment
// function DashboardPageContent({ currentSegment, loading, patient }) {
//   if (loading)
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

//   switch (currentSegment) {
//     case 'home':
//       return <HomePage patient={patient} />;
//     case 'my-health':
//       return <MyHealthPage patient={patient} />;
//     case 'my-bills':
//       return <MyBillsPage patient={patient} />;
//     case 'services':
//       return <ServicesPage />;
//     case 'contact':
//       return <ContactPage />;
//     default:
//       return (
//         <Box
//           sx={{
//             mt: 0,
//             p: 0,
//             m: 0,
//             width: '100%',
//             height: '100%',
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <Typography variant="h5" gutterBottom>
//             404 - Page Not Found
//           </Typography>
//           <Typography variant="body1">Sorry, the page you are looking for doesn't exist.</Typography>
//         </Box>
//       );
//   }
// }

// DashboardPageContent.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   loading: PropTypes.bool,
//   patient: PropTypes.shape({
//     name: PropTypes.string,
//     email: PropTypes.string,
//     profilePic: PropTypes.string,
//     userId: PropTypes.string,
//   }),
// };

// // Sidebar navigation listing all segments
// function SidebarNavigation({ currentSegment, onNavigate }) {
//   return (
//     <List sx={{ width: 240, bgcolor: 'background.paper' }}>
//       {NAVIGATION.map((item, idx) =>
//         item.kind === 'header' ? (
//           <Typography key={idx} variant="subtitle2" sx={{ p: 2, color: 'text.secondary', userSelect: 'none' }}>
//             {item.title}
//           </Typography>
//         ) : (
//           <ListItemButton key={item.segment} selected={currentSegment === item.segment} onClick={() => onNavigate(item.segment)}>
//             <ListItemIcon>{item.icon}</ListItemIcon>
//             <ListItemText primary={item.title} />
//           </ListItemButton>
//         )
//       )}
//     </List>
//   );
// }

// SidebarNavigation.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   onNavigate: PropTypes.func.isRequired,
// };

// // Main dashboard component tying everything
// const PatientDashboard = () => {
//   const [currentSegment, setCurrentSegment] = useState('home');
//   const [patient, setPatient] = useState({ name: '', email: '', profilePic: '', userId: '' });
//   const [loadingPatientData, setLoadingPatientData] = useState(true);

//   useEffect(() => {
//     const loadPatientData = async () => {
//       setLoadingPatientData(true);

//       const storedUserId = sessionStorage.getItem('userId');
//       const storedUsername = sessionStorage.getItem('username');
//       const storedEmail = sessionStorage.getItem('email');
//       const storedProfilePic = sessionStorage.getItem('profilePic');

//       if (storedUserId && storedUsername && storedEmail) {
//         setPatient({
//           name: storedUsername,
//           email: storedEmail,
//           profilePic: storedProfilePic || 'http://localhost:2004/default-profile.png',
//           userId: storedUserId,
//         });
//       } else {
//         window.location.href = '/login';
//       }
//       setLoadingPatientData(false);
//     };
//     loadPatientData();
//   }, []);

//   const handleLogout = () => {
//     sessionStorage.clear();
//     window.location.href = '/login';
//   };

//   const handleProfilePicChange = (file) => {
//     const newPicUrl = URL.createObjectURL(file);
//     setPatient((prev) => ({ ...prev, profilePic: newPicUrl }));
//     alert('Profile picture updated locally. Implement server upload!');
//   };

//   const handleNavigate = (segment) => {
//     const normalizedSegment = segment.startsWith('/') ? segment.slice(1) : segment;
//     setCurrentSegment(normalizedSegment);
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
//           navigation={NAVIGATION}
//           router={{ pathname: currentSegment, navigate: handleNavigate }}
//           theme={theme}
//           branding={{ title: "Sarvotham's Spine Care" }}
//         >
//           <DashboardLayout
//             sx={{ flex: 1, p: 0, m: 0, height: '100%' }}
//             slots={{
//               drawerContent: () => <SidebarNavigation currentSegment={currentSegment} onNavigate={handleNavigate} />,
//               toolbarAccount: () => (
//                 <ProfileMenu
//                   patient={patient}
//                   onLogout={handleLogout}
//                   onProfilePicChange={handleProfilePicChange}
//                   loading={loadingPatientData}
//                 />
//               ),
//             }}
//           >
//             <DashboardPageContent currentSegment={currentSegment} loading={loadingPatientData} patient={patient} />
//           </DashboardLayout>
//         </AppProvider>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default PatientDashboard;

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
//  import HomeIcon from '@mui/icons-material/Home';

// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import CircularProgress from '@mui/material/CircularProgress';
// import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';

// import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import BuildIcon from '@mui/icons-material/Build';
// import ContactMailIcon from '@mui/icons-material/ContactMail';
// import LogoutIcon from '@mui/icons-material/Logout';

// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';

// import HomePage from './HomePage';
// import MyHealthPage from './MyHealthPage';
// import MyBillsPage from './MyBillsPage';
// import ServicesPage from './ServicesPage';
// import ContactPage from './ContactPage';

// // Utility function to generate consistent avatar background color
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

// // Utility to generate avatar initials with colored background
// function stringAvatar(name) {
//   const initials = name
//     ? name
//       .split(' ')
//       .map((n) => n[0])
//       .join('')
//       .toUpperCase()
//     : 'US';
//   return {
//     sx: { bgcolor: stringToColor(name || 'Default User') },
//     children: initials,
//   };
// }

// // Define navigation items with segments, titles and icons
// const NAVIGATION = [
//   { kind: 'header', title: 'Navigation' },
//   { segment: 'home', title: 'Home', icon: <HomeIcon /> },
//   { segment: 'my-health', title: 'My Health', icon: <HealthAndSafetyIcon /> },
//   { segment: 'my-bills', title: 'My Bills', icon: <ReceiptLongIcon /> },
//   { segment: 'services', title: 'Services', icon: <BuildIcon /> },
//   { segment: 'contact', title: 'Contact', icon: <ContactMailIcon /> },
// ];

// // Material-UI theme for consistency in colors and typography
// const theme = createTheme({
//   palette: {
//     mode: 'light',
//     primary: { main: '#1976d2', contrastText: '#fff' },
//     secondary: { main: '#388e3c' },
//     background: { default: '#f5f7fa', paper: '#fff' },
//     error: { main: '#d32f2f' },
//     text: { primary: '#202124', secondary: '#5f6368' },
//   },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     h6: { fontWeight: 600, fontSize: '1.25rem' },
//     body1: { fontSize: '1rem' },
//   },
//   components: {
//     MuiTypography: {
//       styleOverrides: {
//         root: { lineHeight: 1.5 },
//       },
//     },
//   },
// });

// // Profile menu component with logout and profile pic change
// function ProfileMenu({ patient, onLogout, onProfilePicChange, loading }) {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);

//   const handleOpen = (e) => setAnchorEl(e.currentTarget);
//   const handleClose = () => setAnchorEl(null);

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
//           {patient.profilePic ? (
//             <Avatar alt={patient.name} src={patient.profilePic} sx={{ width: 40, height: 40 }} />
//           ) : (
//             <Avatar {...stringAvatar(patient.name)} sx={{ width: 40, height: 40 }} />
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
//           sx: { mt: 1.5, minWidth: 240, p: 2, boxShadow: 'rgba(0,0,0,0.2) 0px 2px 8px' },
//         }}
//         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//       >
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//           {patient.profilePic ? (
//             <Avatar alt={patient.name} src={patient.profilePic} sx={{ width: 64, height: 64, mr: 2 }} />
//           ) : (
//             <Avatar {...stringAvatar(patient.name)} sx={{ width: 64, height: 64, mr: 2 }} />
//           )}
//           <Box>
//             <Typography variant="h6" noWrap>
//               {patient.name}
//             </Typography>
//             <Typography variant="body2" color="text.secondary" noWrap>
//               {patient.email}
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
//         <MenuItem onClick={onLogout} sx={{ color: 'error.main' }}>
//           <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
//           Logout
//         </MenuItem>
//       </Menu>
//     </>
//   );
// }

// ProfileMenu.propTypes = {
//   patient: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     profilePic: PropTypes.string,
//   }).isRequired,
//   onLogout: PropTypes.func.isRequired,
//   onProfilePicChange: PropTypes.func.isRequired,
//   loading: PropTypes.bool,
// };

// // Main page content renderer based on current segment
// function DashboardPageContent({ currentSegment, loading, patient, onNavigate }) {
//   if (loading)
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

//   switch (currentSegment) {
//     case 'branding-landing':
//     case '': // This case now handles the root path
//       return (
//         <Box sx={{ flexGrow: 1, p: 4, bgcolor: '#f5f7fa' }}>
//           <Box sx={{ textAlign: 'center', mb: 6 }}>
//             <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
//               Welcome to Sarvotham's Spine Care
//             </Typography>
//             <Typography variant="h6" color="text.secondary">
//               Your journey to a healthier spine starts here. We are dedicated to providing the best care for our patients.
//             </Typography>
//           </Box>

//           {/* Patient-focused section */}
//           <Box sx={{ my: 6 }}>
//             <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
//               Your Patient Experience
//             </Typography>
//             <Typography variant="body1" sx={{ mb: 4 }}>
//               We are committed to making your experience with us as comfortable and efficient as possible. From scheduling appointments to managing your health records, our portal provides you with the tools you need to take control of your health. Our team is always here to support you every step of the way.
//             </Typography>
//             <Grid container spacing={4} justifyContent="center">
//               <Grid item xs={12} sm={6} md={3}>
//                 <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
//                   <CardMedia
//                     component="img"
//                     height="180"
//                     image="https://placehold.co/600x400/1e88e5/ffffff?text=Secure+Records"
//                     alt="Secure Medical Records"
//                   />
//                   <CardContent sx={{ flexGrow: 1 }}>
//                     <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
//                       Secure Records
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Access your medical records and lab results securely and confidentially at any time.
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
//                   <CardMedia
//                     component="img"
//                     height="180"
//                     image="https://placehold.co/600x400/43a047/ffffff?text=Easy+Appointments"
//                     alt="Easy Appointment Scheduling"
//                   />
//                   <CardContent sx={{ flexGrow: 1 }}>
//                     <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
//                       Easy Appointments
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Schedule, view, or cancel your appointments with a few simple clicks.
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             </Grid>
//           </Box>

//           {/* Services-focused section */}
//           <Box sx={{ my: 6 }}>
//             <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
//               Our Expert Services
//             </Typography>
//             <Typography variant="body1" sx={{ mb: 4 }}>
//               We specialize in a comprehensive range of spine care services, from diagnosis and treatment to rehabilitation. Our team of specialists uses state-of-the-art technology to provide personalized and effective care for various spinal conditions.
//             </Typography>
//             <Grid container spacing={4} justifyContent="center">
//               <Grid item xs={12} sm={6} md={3}>
//                 <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
//                   <CardMedia
//                     component="img"
//                     height="180"
//                     image="https://placehold.co/600x400/ffb300/202124?text=Diagnostic+Imaging"
//                     alt="Diagnostic Imaging"
//                   />
//                   <CardContent sx={{ flexGrow: 1 }}>
//                     <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
//                       Diagnostic Imaging
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Advanced imaging techniques for accurate and precise diagnosis of spine issues.
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
//                   <CardMedia
//                     component="img"
//                     height="180"
//                     image="https://placehold.co/600x400/e53935/ffffff?text=Physical+Therapy"
//                     alt="Physical Therapy"
//                   />
//                   <CardContent sx={{ flexGrow: 1 }}>
//                     <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
//                       Physical Therapy
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Customized rehabilitation programs to restore function and reduce pain.
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//       );
    
//     case 'home':
//       return <HomePage patient={patient} />;
//     case 'my-health':
//       return <MyHealthPage patient={patient} onNavigate={onNavigate} />;
//     case 'my-bills':
//       return <MyBillsPage patient={patient} />;
//     case 'services':
//       return <ServicesPage />;
//     case 'contact':
//       return <ContactPage />;
//     default:
//       return (
//         <Box
//           sx={{
//             mt: 0,
//             p: 0,
//             m: 0,
//             width: '100%',
//             height: '100%',
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <Typography variant="h5" gutterBottom>
//             404 - Page Not Found
//           </Typography>
//           <Typography variant="body1">Sorry, the page you are looking for doesn't exist.</Typography>
//         </Box>
//       );
//   }
// }

// DashboardPageContent.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   loading: PropTypes.bool,
//   patient: PropTypes.shape({
//     name: PropTypes.string,
//     email: PropTypes.string,
//     profilePic: PropTypes.string,
//     userId: PropTypes.string,
//   }),
//   onNavigate: PropTypes.func.isRequired,
// };

// // Sidebar navigation listing all segments
// function SidebarNavigation({ currentSegment, onNavigate }) {
//   return (
//     <List sx={{ width: 240, bgcolor: 'background.paper' }}>
//       {NAVIGATION.map((item, idx) =>
//         item.kind === 'header' ? (
//           <Typography key={idx} variant="subtitle2" sx={{ p: 2, color: 'text.secondary', userSelect: 'none' }}>
//             {item.title}
//           </Typography>
//         ) : (
//           <ListItemButton key={item.segment} selected={currentSegment === item.segment} onClick={() => onNavigate(item.segment)}>
//             <ListItemIcon>{item.icon}</ListItemIcon>
//             <ListItemText primary={item.title} />
//           </ListItemButton>
//         )
//       )}
//     </List>
//   );
// }

// SidebarNavigation.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   onNavigate: PropTypes.func.isRequired,
// };

// // Main dashboard component tying everything
// const PatientDashboard = () => {
//   const [currentSegment, setCurrentSegment] = useState('');
//   const [patient, setPatient] = useState({ name: '', email: '', profilePic: '', userId: '' });
//   const [loadingPatientData, setLoadingPatientData] = useState(true);

//   useEffect(() => {
//     const loadPatientData = async () => {
//       setLoadingPatientData(true);

//       const storedUserId = sessionStorage.getItem('userId');
//       const storedUsername = sessionStorage.getItem('username');
//       const storedEmail = sessionStorage.getItem('email');
//       const storedProfilePic = sessionStorage.getItem('profilePic');

//       if (storedUserId && storedUsername && storedEmail) {
//         setPatient({
//           name: storedUsername,
//           email: storedEmail,
//           profilePic: storedProfilePic || 'http://localhost:2004/default-profile.png',
//           userId: storedUserId,
//         });
//       } else {
//         window.location.href = '/login';
//       }
//       setLoadingPatientData(false);
//     };
//     loadPatientData();
//   }, []);

//   const handleLogout = () => {
//     sessionStorage.clear();
//     window.location.href = '/login';
//   };

//   const handleProfilePicChange = (file) => {
//     const newPicUrl = URL.createObjectURL(file);
//     setPatient((prev) => ({ ...prev, profilePic: newPicUrl }));
//     alert('Profile picture updated locally. Implement server upload!');
//   };

//   const handleNavigate = (segment) => {
//     const normalizedSegment = segment.startsWith('/') ? segment.slice(1) : segment;
//     setCurrentSegment(normalizedSegment);
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
//           navigation={NAVIGATION}
//           router={{ pathname: currentSegment, navigate: handleNavigate }}
//           theme={theme}
//           branding={{
//             title: "Sarvotham's Spine Care",
//             onClick: () => handleNavigate(''), // This now correctly navigates to the empty string route
//           }}
//         >
//           <DashboardLayout
//             sx={{ flex: 1, p: 0, m: 0, height: '100%' }}
//             slots={{
//               drawerContent: () => <SidebarNavigation currentSegment={currentSegment} onNavigate={handleNavigate} />,
//               toolbarAccount: () => (
//                 <ProfileMenu
//                   patient={patient}
//                   onLogout={handleLogout}
//                   onProfilePicChange={handleProfilePicChange}
//                   loading={loadingPatientData}
//                 />
//               ),
//             }}
//           >
//             <DashboardPageContent currentSegment={currentSegment} loading={loadingPatientData} patient={patient} onNavigate={handleNavigate} />
//           </DashboardLayout>
//         </AppProvider>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default PatientDashboard;
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
// import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';

// import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import BuildIcon from '@mui/icons-material/Build';
// import ContactMailIcon from '@mui/icons-material/ContactMail';
// import LogoutIcon from '@mui/icons-material/Logout';

// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';

// // Import your page components here
// import HomePage from './HomePage';
// import MyHealthPage from './MyHealthPage';
// import MyBillsPage from './MyBillsPage';
// import ServicesPage from './ServicesPage';
// import ContactPage from './ContactPage';

// // Import the ProfileMenu component created separately
// import ProfileMenu from './ProfileMenu'; // Adjust path as needed

// // Utility function to consistently generate color based on a string
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

// // Utility to generate avatar initials and style
// function stringAvatar(name) {
//   const initials = name
//     ? name
//         .split(' ')
//         .map((n) => n[0])
//         .join('')
//         .toUpperCase()
//     : 'US';
//   return {
//     sx: { bgcolor: stringToColor(name || 'Default User') },
//     children: initials,
//   };
// }

// // Navigation configuration
// const NAVIGATION = [
//   { kind: 'header', title: 'Navigation' },
//   { segment: 'home', title: 'Home', icon: <HealthAndSafetyIcon /> },
//   { segment: 'my-health', title: 'My Health', icon: <HealthAndSafetyIcon /> },
//   { segment: 'my-bills', title: 'My Bills', icon: <ReceiptLongIcon /> },
//   { segment: 'services', title: 'Services', icon: <BuildIcon /> },
//   { segment: 'contact', title: 'Contact', icon: <ContactMailIcon /> },
// ];

// // Material-UI theme setup
// const theme = createTheme({
//   palette: {
//     mode: 'light',
//     primary: { main: '#1976d2', contrastText: '#fff' },
//     secondary: { main: '#388e3c' },
//     background: { default: '#f5f7fa', paper: '#fff' },
//     error: { main: '#d32f2f' },
//     text: { primary: '#202124', secondary: '#5f6368' },
//   },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     h6: { fontWeight: 600, fontSize: '1.25rem' },
//     body1: { fontSize: '1rem' },
//   },
//   components: {
//     MuiTypography: { styleOverrides: { root: { lineHeight: 1.5 } } },
//   },
// });

// // Sidebar navigation component
// function SidebarNavigation({ currentSegment, onNavigate }) {
//   return (
//     <List sx={{ width: 240, bgcolor: 'background.paper' }}>
//       {NAVIGATION.map((item, idx) =>
//         item.kind === 'header' ? (
//           <Typography
//             key={idx}
//             variant="subtitle2"
//             sx={{ p: 2, color: 'text.secondary', userSelect: 'none' }}
//           >
//             {item.title}
//           </Typography>
//         ) : (
//           <ListItemButton
//             key={item.segment}
//             selected={currentSegment === item.segment}
//             onClick={() => onNavigate(item.segment)}
//           >
//             <ListItemIcon>{item.icon}</ListItemIcon>
//             <ListItemText primary={item.title} />
//           </ListItemButton>
//         )
//       )}
//     </List>
//   );
// }

// SidebarNavigation.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   onNavigate: PropTypes.func.isRequired,
// };

// // Page content rendering based on current selected segment
// function DashboardPageContent({ currentSegment, loading, patient, onNavigate }) {
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
//     case 'branding-landing':
//     case '':
//       return (
//         <Box sx={{ flexGrow: 1, p: 4, bgcolor: '#f5f7fa' }}>
//           <Box sx={{ textAlign: 'center', mb: 6 }}>
//             <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
//               Welcome to Sarvotham's Spine Care
//             </Typography>
//             <Typography variant="h6" color="text.secondary">
//               Your journey to a healthier spine starts here. We are dedicated to providing the best care for our patients.
//             </Typography>
//           </Box>
//           {/* Optional branding or landing content */}
//         </Box>
//       );
//     case 'home':
//       return <HomePage patient={patient} />;
//     case 'my-health':
//       return <MyHealthPage patient={patient} onNavigate={onNavigate} />;
//     case 'my-bills':
//       return <MyBillsPage patient={patient} />;
//     case 'services':
//       return <ServicesPage />;
//     case 'contact':
//       return <ContactPage />;
//     default:
//       return (
//         <Box
//           sx={{
//             mt: 0,
//             p: 0,
//             m: 0,
//             width: '100%',
//             height: '100%',
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <Typography variant="h5" gutterBottom>
//             404 - Page Not Found
//           </Typography>
//           <Typography variant="body1">Sorry, the page you are looking for doesn't exist.</Typography>
//         </Box>
//       );
//   }
// }

// DashboardPageContent.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   loading: PropTypes.bool,
//   patient: PropTypes.shape({
//     name: PropTypes.string,
//     email: PropTypes.string,
//     profilePic: PropTypes.string,
//   }),
//   onNavigate: PropTypes.func.isRequired,
// };

// // Main PatientDashboard component
// const PatientDashboard = () => {
//   const [currentSegment, setCurrentSegment] = useState('');
//   const [patient, setPatient] = useState({
//     name: '',
//     email: '',
//     profilePic: '',
//     userId: '',
//     phone_number: '',
//   });
//   const [loadingPatientData, setLoadingPatientData] = useState(true);

//   // Load patient data from sessionStorage on mount
//   useEffect(() => {
//     const loadPatientData = async () => {
//       setLoadingPatientData(true);

//       const storedUserId = sessionStorage.getItem('userId');
//       const storedUsername = sessionStorage.getItem('username');
//       const storedEmail = sessionStorage.getItem('email');
//       const storedProfilePic = sessionStorage.getItem('profilePic');
//       const storedPhoneNumber = sessionStorage.getItem('phoneNumber');

//       if (storedUserId && storedUsername && storedEmail) {
//         setPatient({
//           name: storedUsername,
//           email: storedEmail,
//           profilePic: storedProfilePic || 'http://localhost:2004/default-profile.png',
//           userId: storedUserId,
//           phoneNumber: storedPhoneNumber || 'N/A',
//         });
//       } else {
//         // Redirect if no patient data found
//         window.location.href = '/login';
//       }

//       setLoadingPatientData(false);
//     };

//     loadPatientData();
//   }, []);

//   // Logout handler
//   const handleLogout = () => {
//     sessionStorage.clear();
//     window.location.href = '/login';
//   };

//   // Profile picture change handler with local preview update
//   const handleProfilePicChange = (file) => {
//     const newPicUrl = URL.createObjectURL(file);
//     setPatient((prev) => ({ ...prev, profilePic: newPicUrl }));
//     alert('Profile picture updated locally. Implement server upload!');
//   };

//   // Navigation handler
//   const handleNavigate = (segment) => {
//     const normalizedSegment = segment.startsWith('/') ? segment.slice(1) : segment;
//     setCurrentSegment(normalizedSegment);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box
//         sx={{ width: '100vw', height: '100vh', p: 0, m: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
//       >
//         <AppProvider
//           navigation={NAVIGATION}
//           router={{ pathname: currentSegment, navigate: handleNavigate }}
//           theme={theme}
//           branding={{
//             title: "Sarvotham's Spine Care",
//             onClick: () => handleNavigate(''),
//           }}
//         >
//           <DashboardLayout
//             sx={{ flex: 1, p: 0, m: 0, height: '100%' }}
//             slots={{
//               drawerContent: () => <SidebarNavigation currentSegment={currentSegment} onNavigate={handleNavigate} />,
//               toolbarAccount: () => (
//                 <ProfileMenu
//                   patient={patient}
//                   onLogout={handleLogout}
//                   onProfilePicChange={handleProfilePicChange}
//                   loading={loadingPatientData}
//                 />
//               ),
//             }}
//           >
//             <DashboardPageContent
//               currentSegment={currentSegment}
//               loading={loadingPatientData}
//               patient={patient}
//               onNavigate={handleNavigate}
//             />
//           </DashboardLayout>
//         </AppProvider>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default PatientDashboard;
// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import CircularProgress from '@mui/material/CircularProgress';

// import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import BuildIcon from '@mui/icons-material/Build';
// import ContactMailIcon from '@mui/icons-material/ContactMail';

// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';

// import ProfileMenu from './ProfileMenu';             // Import ProfileMenu component
// import MyHealthPage from './MyHealthPage';           // Import your MyHealthPage component
// import MedicalRecordsPage from './MedicalRecordsPage'; // Import MedicalRecordsPage
// import HomePage from './HomePage';
// import MyBillsPage from './MyBillsPage';
// import ServicesPage from './ServicesPage';
// import ContactPage from './ContactPage';

// const NAVIGATION = [
//   { kind: 'header', title: 'Navigation' },
//   { segment: 'home', title: 'Home', icon: <HealthAndSafetyIcon /> },
//   { segment: 'my-health', title: 'My Health', icon: <HealthAndSafetyIcon /> },
//   { segment: 'my-bills', title: 'My Bills', icon: <ReceiptLongIcon /> },
//   { segment: 'services', title: 'Services', icon: <BuildIcon /> },
//   { segment: 'contact', title: 'Contact', icon: <ContactMailIcon /> },
// ];

// const theme = createTheme({
//   palette: {
//     mode: 'light',
//     primary: { main: '#1976d2', contrastText: '#fff' },
//     secondary: { main: '#388e3c' },
//     background: { default: '#f5f7fa', paper: '#fff' },
//     error: { main: '#d32f2f' },
//     text: { primary: '#202124', secondary: '#5f6368' },
//   },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     h6: { fontWeight: 600, fontSize: '1.25rem' },
//     body1: { fontSize: '1rem' },
//   },
//   components: {
//     MuiTypography: { styleOverrides: { root: { lineHeight: 1.5 } } },
//   },
// });

// // Sidebar navigation component
// function SidebarNavigation({ currentSegment, onNavigate }) {
//   return (
//     <List sx={{ width: 240, bgcolor: 'background.paper' }}>
//       {NAVIGATION.map((item, idx) =>
//         item.kind === 'header' ? (
//           <Typography key={idx} variant="subtitle2" sx={{ p: 2, color: 'text.secondary', userSelect: 'none' }}>
//             {item.title}
//           </Typography>
//         ) : (
//           <ListItemButton key={item.segment} selected={currentSegment === item.segment} onClick={() => onNavigate(item.segment)}>
//             <ListItemIcon>{item.icon}</ListItemIcon>
//             <ListItemText primary={item.title} />
//           </ListItemButton>
//         )
//       )}
//     </List>
//   );
// }
// SidebarNavigation.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   onNavigate: PropTypes.func.isRequired,
// };

// function DashboardPageContent({ currentSegment, loading, patient, onNavigate, onViewMedicalRecords }) {
//   if (loading) {
//     return (
//       <Box sx={{ width: '100%', height: '100%', minHeight: '100vh', minWidth: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   switch (currentSegment) {
//     case 'branding-landing':
//     case '':
//       return (
//         <Box sx={{ flexGrow: 1, p: 4, bgcolor: '#f5f7fa' }}>
//           <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
//             Welcome to Sarvotham's Spine Care
//           </Typography>
//           <Typography variant="h6" color="text.secondary">
//             Your journey to a healthier spine starts here. We are dedicated to providing the best care for our patients.
//           </Typography>
//           {/* add other landing page content here */}
//         </Box>
//       );
//     case 'home':
//       return <HomePage patient={patient} />;
//     case 'my-health':
//       return <MyHealthPage patient={patient} onNavigate={onNavigate} onViewMedicalRecords={onViewMedicalRecords} />;
//     case 'my-bills':
//       return <MyBillsPage patient={patient} />;
//     case 'services':
//       return <ServicesPage />;
//     case 'contact':
//       return <ContactPage />;
//     default:
//       return (
//         <Box sx={{ mt: 0, p: 0, m: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//           <Typography variant="h5" gutterBottom>
//             404 - Page Not Found
//           </Typography>
//           <Typography variant="body1">Sorry, the page you are looking for doesn't exist.</Typography>
//         </Box>
//       );
//   }
// }
// DashboardPageContent.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   loading: PropTypes.bool,
//   patient: PropTypes.shape({
//     name: PropTypes.string,
//     email: PropTypes.string,
//     profilePic: PropTypes.string,
//   }),
//   onNavigate: PropTypes.func.isRequired,
//   onViewMedicalRecords: PropTypes.func,
// };

// const PatientDashboard = () => {
//   const [currentSegment, setCurrentSegment] = React.useState('my-health');
//   const [patient, setPatient] = React.useState({
//     name: '',
//     email: '',
//     profilePic: '',
//     userId: '',
//     phoneNumber: '',
//   });
//   const [loadingPatientData, setLoadingPatientData] = React.useState(true);

//   // Track selected medical record id for detail page navigation
//   const [selectedMedicalRecordId, setSelectedMedicalRecordId] = React.useState(null);

//   useEffect(() => {
//     (async () => {
//       setLoadingPatientData(true);
//       const storedUserId = sessionStorage.getItem('userId');
//       const storedUsername = sessionStorage.getItem('username');
//       const storedEmail = sessionStorage.getItem('email');
//       const storedProfilePic = sessionStorage.getItem('profilePic');
//       const storedPhoneNumber = sessionStorage.getItem('phoneNumber');

//       if (storedUserId && storedUsername && storedEmail) {
//         setPatient({
//           name: storedUsername,
//           email: storedEmail,
//           profilePic: storedProfilePic || 'http://localhost:2004/default-profile.png',
//           userId: storedUserId,
//           phoneNumber: storedPhoneNumber || 'N/A',
//         });
//       } else {
//         window.location.href = '/login';
//       }
//       setLoadingPatientData(false);
//     })();
//   }, []);

//   const handleLogout = () => {
//     sessionStorage.clear();
//     window.location.href = '/login';
//   };

//   const handleProfilePicChange = (file) => {
//     const newPicUrl = URL.createObjectURL(file);
//     setPatient((prev) => ({ ...prev, profilePic: newPicUrl }));
//     alert('Profile picture updated locally. Implement server upload!');
//   };

//   const handleNavigate = (segment) => {
//     if (segment !== 'medical-records') {
//       setSelectedMedicalRecordId(null); // clear selected record on segment change
//     }
//     const normalizedSegment = segment.startsWith('/') ? segment.slice(1) : segment;
//     setCurrentSegment(normalizedSegment);
//   };

//   // Called by MyHealthPage when user clicks to view medical record
//   const handleViewMedicalRecords = (medicalRecordId) => {
//     setSelectedMedicalRecordId(medicalRecordId);
//     setCurrentSegment('medical-records');
//   };

//   // Called when user clicks back button from medical record detail
//   const handleBackFromMedicalRecords = () => {
//     setSelectedMedicalRecordId(null);
//     setCurrentSegment('my-health');
//   };

//   // Render either MedicalRecordsPage or regular DashboardPageContent
//   const renderPageContent = () => {
//     if (loadingPatientData) {
//       return (
//         <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <CircularProgress />
//         </Box>
//       );
//     }

//     if (currentSegment === 'medical-records' && selectedMedicalRecordId) {
//       return (
//         <MedicalRecordsPage
//           medicalRecordId={selectedMedicalRecordId}
//           onBack={handleBackFromMedicalRecords}
//           onNavigate={handleNavigate}
//         />
//       );
//     }

//     return (
//       <DashboardPageContent
//         currentSegment={currentSegment}
//         loading={loadingPatientData}
//         patient={patient}
//         onNavigate={handleNavigate}
//         onViewMedicalRecords={handleViewMedicalRecords}
//       />
//     );
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ width: '100vw', height: '100vh', p: 0, m: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
//         <AppProvider
//           navigation={NAVIGATION}
//           router={{ pathname: currentSegment, navigate: handleNavigate }}
//           theme={theme}
//           branding={{ title: "Sarvotham's Spine Care", onClick: () => handleNavigate('') }}
//         >
//           <DashboardLayout
//             sx={{ flex: 1, p: 0, m: 0, height: '100%' }}
//             slots={{
//               drawerContent: () => <SidebarNavigation currentSegment={currentSegment} onNavigate={handleNavigate} />,
//               toolbarAccount: () => (
//                 <ProfileMenu
//                   patient={patient}
//                   onLogout={handleLogout}
//                   onProfilePicChange={handleProfilePicChange}
//                   loading={loadingPatientData}
//                 />
//               ),
//             }}
//           >
//             {renderPageContent()}
//           </DashboardLayout>
//         </AppProvider>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default PatientDashboard;
// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import CircularProgress from '@mui/material/CircularProgress';

// import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import BuildIcon from '@mui/icons-material/Build';
// import ContactMailIcon from '@mui/icons-material/ContactMail';

// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';

// import ProfileMenu from './ProfileMenu';
// import MyHealthPage from './MyHealthPage';
// import MedicalRecordsPage from './MedicalRecordsPage'; // Ensure this is correctly imported
// import HomePage from './HomePage';
// import MyBillsPage from './MyBillsPage';
// import ServicesPage from './ServicesPage';
// import ContactPage from './ContactPage';


// // Navigation configuration
// const NAVIGATION = [
//   { kind: 'header', title: 'Navigation' },
//   { segment: 'home', title: 'Home', icon: <HealthAndSafetyIcon /> },
//   { segment: 'my-health', title: 'My Health', icon: <HealthAndSafetyIcon /> },
//   { segment: 'my-bills', title: 'My Bills', icon: <ReceiptLongIcon /> },
//   { segment: 'services', title: 'Services', icon: <BuildIcon /> },
//   { segment: 'contact', title: 'Contact', icon: <ContactMailIcon /> },
// ];

// // Material-UI theme setup
// const theme = createTheme({
//   palette: {
//     mode: 'light',
//     primary: { main: '#1976d2', contrastText: '#fff' },
//     secondary: { main: '#388e3c' },
//     background: { default: '#f5f7fa', paper: '#fff' },
//     error: { main: '#d32f2f' },
//     text: { primary: '#202124', secondary: '#5f6368' },
//   },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     h6: { fontWeight: 600, fontSize: '1.25rem' },
//     body1: { fontSize: '1rem' },
//   },
//   components: {
//     MuiTypography: { styleOverrides: { root: { lineHeight: 1.5 } } },
//   },
// });

// // Sidebar navigation
// function SidebarNavigation({ currentSegment, onNavigate }) {
//   return (
//     <List sx={{ width: 240, bgcolor: 'background.paper' }}>
//       {NAVIGATION.map((item, idx) =>
//         item.kind === 'header' ? (
//           <Typography
//             key={idx}
//             variant="subtitle2"
//             sx={{ p: 2, color: 'text.secondary', userSelect: 'none' }}
//           >
//             {item.title}
//           </Typography>
//         ) : (
//           <ListItemButton
//             key={item.segment}
//             selected={currentSegment === item.segment}
//             onClick={() => onNavigate(item.segment)}
//           >
//             <ListItemIcon>{item.icon}</ListItemIcon>
//             <ListItemText primary={item.title} />
//           </ListItemButton>
//         )
//       )}
//     </List>
//   );
// }

// SidebarNavigation.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   onNavigate: PropTypes.func.isRequired,
// };

// // Page content renderer
// function DashboardPageContent({ currentSegment, loading, patient, onNavigate, onViewMedicalRecords }) {
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
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }
//   switch (currentSegment) {
//     case 'branding-landing':
//     case '':
//       return (
//         <Box sx={{ flexGrow: 1, p: 4, bgcolor: '#f5f7fa' }}>
//           <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
//             Welcome to Sarvotham's Spine Care
//           </Typography>
//           <Typography variant="h6" color="text.secondary">
//             Your journey to a healthier spine starts here. We are dedicated to providing the best care for our patients.
//           </Typography>
//         </Box>
//       );
//     case 'home':
//       return <HomePage patient={patient} />;
//     case 'my-health':
//       // Pass down onViewMedicalRecords callback here
//       return <MyHealthPage patient={patient} onNavigate={onNavigate} onViewMedicalRecords={onViewMedicalRecords} />;
//     case 'my-bills':
//       return <MyBillsPage patient={patient} />;
//     case 'services':
//       return <ServicesPage />;
//     case 'contact':
//       return <ContactPage />;
//     default:
//       return (
//         <Box
//           sx={{
//             mt: 0,
//             p: 0,
//             m: 0,
//             width: '100%',
//             height: '100%',
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <Typography variant="h5" gutterBottom>
//             404 - Page Not Found
//           </Typography>
//           <Typography variant="body1">Sorry, the page you are looking for doesn't exist.</Typography>
//         </Box>
//       );
//   }
// }

// DashboardPageContent.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   loading: PropTypes.bool,
//   patient: PropTypes.shape({
//     name: PropTypes.string,
//     email: PropTypes.string,
//     profilePic: PropTypes.string,
//   }),
//   onNavigate: PropTypes.func.isRequired,
//   onViewMedicalRecords: PropTypes.func,
// };

// const PatientDashboard = () => {
//   const [currentSegment, setCurrentSegment] = useState('my-health');
//   const [patient, setPatient] = useState({
//     name: '',
//     email: '',
//     profilePic: '',
//     userId: '',
//     phoneNumber: '',
//   });
//   const [loadingPatientData, setLoadingPatientData] = useState(true);

//   // Track selected medical record ID for navigation to detail page
//   const [selectedMedicalRecordId, setSelectedMedicalRecordId] = useState(null);

//   useEffect(() => {
//     (async () => {
//       setLoadingPatientData(true);
//       const storedUserId = sessionStorage.getItem('userId');
//       const storedUsername = sessionStorage.getItem('username');
//       const storedEmail = sessionStorage.getItem('email');
//       const storedProfilePic = sessionStorage.getItem('profilePic');
//       const storedPhoneNumber = sessionStorage.getItem('phoneNumber');

//       if (storedUserId && storedUsername && storedEmail) {
//         setPatient({
//           name: storedUsername,
//           email: storedEmail,
//           profilePic: storedProfilePic || 'http://localhost:2004/default-profile.png',
//           userId: storedUserId,
//           phoneNumber: storedPhoneNumber || 'N/A',
//         });
//       } else {
//         window.location.href = '/login';
//       }
//       setLoadingPatientData(false);
//     })();
//   }, []);

//   const handleLogout = () => {
//     sessionStorage.clear();
//     window.location.href = '/login';
//   };

//   const handleProfilePicChange = (file) => {
//     const newPicUrl = URL.createObjectURL(file);
//     setPatient((prev) => ({ ...prev, profilePic: newPicUrl }));
//     alert('Profile picture updated locally. Implement server upload!');
//   };

//   const handleNavigate = (segment) => {
//     if (segment !== 'medical-records') {
//       setSelectedMedicalRecordId(null); // Reset selected record if navigating away
//     }
//     const normalizedSegment = segment.startsWith('/') ? segment.slice(1) : segment;
//     setCurrentSegment(normalizedSegment);
//   };

//   // Called by MyHealthPage when "View Medical Records" button clicked
//   const handleViewMedicalRecords = (medicalRecordId) => {
//     setSelectedMedicalRecordId(medicalRecordId);
//     setCurrentSegment('medical-records');
//   };

//   // For back navigation from MedicalRecordsPage to MyHealthPage
//   const handleBackFromMedicalRecords = () => {
//     setSelectedMedicalRecordId(null);
//     setCurrentSegment('my-health');
//   };

//   // Content rendering logic - handles MedicalRecordsPage or dashboard content
//   const renderPageContent = () => {
//     if (loadingPatientData) {
//       return (
//         <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <CircularProgress />
//         </Box>
//       );
//     }

//     if (currentSegment === 'medical-records' && selectedMedicalRecordId) {
//       return (
//         <MedicalRecordsPage
//           medicalRecordId={selectedMedicalRecordId}
//           onBack={handleBackFromMedicalRecords}
//           onNavigate={handleNavigate} // To allow navigation from MedicalRecordsPage internally
//         />
//       );
//     }

//     return (
//       <DashboardPageContent
//         currentSegment={currentSegment}
//         loading={loadingPatientData}
//         patient={patient}
//         onNavigate={handleNavigate}
//         onViewMedicalRecords={handleViewMedicalRecords} // Pass callback to enable navigation
//       />
//     );
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ width: '100vw', height: '100vh', p: 0, m: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
//         <AppProvider
//           navigation={NAVIGATION}
//           router={{ pathname: currentSegment, navigate: handleNavigate }}
//           theme={theme}
//           branding={{ title: "Sarvotham's Spine Care", onClick: () => handleNavigate('') }}
//         >
//           <DashboardLayout
//             sx={{ flex: 1, p: 0, m: 0, height: '100%' }}
//             slots={{
//               drawerContent: () => <SidebarNavigation currentSegment={currentSegment} onNavigate={handleNavigate} />,
//               toolbarAccount: () => (
//                 <ProfileMenu
//                   patient={patient}
//                   onLogout={handleLogout}
//                   onProfilePicChange={handleProfilePicChange}
//                   loading={loadingPatientData}
//                 />
//               ),
//             }}
//           >
//             {renderPageContent()}
//           </DashboardLayout>
//         </AppProvider>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default PatientDashboard;
// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import CircularProgress from '@mui/material/CircularProgress';

// import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import BuildIcon from '@mui/icons-material/Build';
// import ContactMailIcon from '@mui/icons-material/ContactMail';

// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';

// import ProfileMenu from './ProfileMenu';
// import MyHealthPage from './MyHealthPage';
// import MedicalRecordsPage from './MedicalRecordsPage';
// import PrescriptionsPage from './PrescriptionsPage';
// import LabReportsPage from './LabReportsPage';

// import HomePage from './HomePage';
// import MyBillsPage from './MyBillsPage';
// import ServicesPage from './ServicesPage';
// import ContactPage from './ContactPage';

// // Navigation configuration
// const NAVIGATION = [
//   { kind: 'header', title: 'Navigation' },
//   { segment: 'home', title: 'Home', icon: <HealthAndSafetyIcon /> },
//   { segment: 'my-health', title: 'My Health', icon: <HealthAndSafetyIcon /> },
//   { segment: 'my-bills', title: 'My Bills', icon: <ReceiptLongIcon /> },
//   { segment: 'services', title: 'Services', icon: <BuildIcon /> },
//   { segment: 'contact', title: 'Contact', icon: <ContactMailIcon /> },
// ];

// // Material-UI theme setup
// const theme = createTheme({
//   palette: {
//     mode: 'light',
//     primary: { main: '#1976d2', contrastText: '#fff' },
//     secondary: { main: '#388e3c' },
//     background: { default: '#f5f7fa', paper: '#fff' },
//     error: { main: '#d32f2f' },
//     text: { primary: '#202124', secondary: '#5f6368' },
//   },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     h6: { fontWeight: 600, fontSize: '1.25rem' },
//     body1: { fontSize: '1rem' },
//   },
//   components: {
//     MuiTypography: { styleOverrides: { root: { lineHeight: 1.5 } } },
//   },
// });

// // Simple Error Boundary for catching render errors
// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false, errorInfo: null };
//   }
//   static getDerivedStateFromError(error) {
//     return { hasError: true, errorInfo: error.toString() };
//   }
//   componentDidCatch(error, errorInfo) {
//     console.error("ErrorBoundary caught an error:", error, errorInfo);
//   }
//   render() {
//     if (this.state.hasError) {
//       return (
//         <Box sx={{ p: 4, color: 'error.main', textAlign: 'center' }}>
//           <Typography variant="h5" gutterBottom>Error occurred loading this section.</Typography>
//           <Typography>{this.state.errorInfo}</Typography>
//         </Box>
//       );
//     }
//     return this.props.children;
//   }
// }

// ErrorBoundary.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// function SidebarNavigation({ currentSegment, onNavigate }) {
//   console.log('[SidebarNavigation] currentSegment:', currentSegment);
//   return (
//     <List sx={{ width: 240, bgcolor: 'background.paper' }}>
//       {NAVIGATION.map((item, idx) =>
//         item.kind === 'header' ? (
//           <Typography key={idx} variant="subtitle2" sx={{ p: 2, color: 'text.secondary', userSelect: 'none' }}>
//             {item.title}
//           </Typography>
//         ) : (
//           <ListItemButton key={item.segment} selected={currentSegment === item.segment} onClick={() => {
//             console.log(`[SidebarNavigation] Navigate to: ${item.segment}`);
//             onNavigate(item.segment);
//           }}>
//             <ListItemIcon>{item.icon}</ListItemIcon>
//             <ListItemText primary={item.title} />
//           </ListItemButton>
//         )
//       )}
//     </List>
//   );
// }

// SidebarNavigation.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   onNavigate: PropTypes.func.isRequired,
// };

// function DashboardPageContent({ currentSegment, loading, patient, onNavigate, onViewMedicalRecords }) {
//   console.log('[DashboardPageContent] Rendering for segment:', currentSegment);
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
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   switch (currentSegment) {
//     case 'branding-landing':
//     case '':
//       return (
//         <Box sx={{ flexGrow: 1, p: 4, bgcolor: '#f5f7fa' }}>
//           <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
//             Welcome to Sarvotham's Spine Care
//           </Typography>
//           <Typography variant="h6" color="text.secondary">
//             Your journey to a healthier spine starts here. We are dedicated to providing the best care for our patients.
//           </Typography>
//         </Box>
//       );
//     case 'home':
//       return <HomePage patient={patient} />;
//     case 'my-health':
//       return <MyHealthPage patient={patient} onNavigate={onNavigate} onViewMedicalRecords={onViewMedicalRecords} />;
//     case 'my-bills':
//       return <MyBillsPage patient={patient} />;
//     case 'services':
//       return <ServicesPage />;
//     case 'contact':
//       return <ContactPage />;
//     default:
//       return (
//         <Box
//           sx={{
//             mt: 0,
//             p: 0,
//             m: 0,
//             width: '100%',
//             height: '100%',
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <Typography variant="h5" gutterBottom>
//             404 - Page Not Found
//           </Typography>
//           <Typography variant="body1">Sorry, the page you are looking for doesn't exist.</Typography>
//         </Box>
//       );
//   }
// }

// DashboardPageContent.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   loading: PropTypes.bool,
//   patient: PropTypes.shape({
//     name: PropTypes.string,
//     email: PropTypes.string,
//     profilePic: PropTypes.string,
//   }),
//   onNavigate: PropTypes.func.isRequired,
//   onViewMedicalRecords: PropTypes.func,
// };

// const PatientDashboard = () => {
//   const [currentSegment, setCurrentSegment] = useState('my-health');
//   const [patient, setPatient] = useState({
//     name: '',
//     email: '',
//     profilePic: '',
//     userId: '',
//     phoneNumber: '',
//   });
//   const [loadingPatientData, setLoadingPatientData] = useState(true);

//   const [selectedMedicalRecordId, setSelectedMedicalRecordId] = useState(null);

//   useEffect(() => {
//     console.log('[PatientDashboard] Loading patient data from sessionStorage');
//     (async () => {
//       setLoadingPatientData(true);
//       try {
//         const storedUserId = sessionStorage.getItem('userId');
//         const storedUsername = sessionStorage.getItem('username');
//         const storedEmail = sessionStorage.getItem('email');
//         const storedProfilePic = sessionStorage.getItem('profilePic');
//         const storedPhoneNumber = sessionStorage.getItem('phoneNumber');

//         console.log('[PatientDashboard] Retrieved user data:', { storedUserId, storedUsername, storedEmail });

//         if (storedUserId && storedUsername && storedEmail) {
//           setPatient({
//             name: storedUsername,
//             email: storedEmail,
//             profilePic: storedProfilePic || 'http://localhost:2004/default-profile.png',
//             userId: storedUserId,
//             phoneNumber: storedPhoneNumber || 'N/A',
//           });
//         } else {
//           console.warn('[PatientDashboard] User data incomplete, redirecting to login');
//           window.location.href = '/login';
//         }
//       } catch (err) {
//         console.error('[PatientDashboard] Error loading patient data:', err);
//       } finally {
//         setLoadingPatientData(false);
//       }
//     })();
//   }, []);

//   const handleLogout = () => {
//     console.log('[PatientDashboard] logout triggered: clearing session and redirecting');
//     sessionStorage.clear();
//     window.location.href = '/login';
//   };

//   const handleProfilePicChange = (file) => {
//     console.log('[PatientDashboard] Profile picture change requested:', file);
//     const newPicUrl = URL.createObjectURL(file);
//     setPatient((prev) => ({ ...prev, profilePic: newPicUrl }));
//     alert('Profile picture updated locally. Implement server upload if desired!');
//   };

//   const handleNavigate = (segment) => {
//     console.log('[PatientDashboard] Navigate called with segment:', segment);
//     // Clear selected record if navigating away from detailed pages
//     if (!segment.startsWith('medical-records') && !segment.startsWith('prescriptions') && !segment.startsWith('lab-reports')) {
//       console.log('[PatientDashboard] Clearing selectedMedicalRecordId');
//       setSelectedMedicalRecordId(null);
//     }
//     const normalizedSegment = segment.startsWith('/') ? segment.slice(1) : segment;
//     setCurrentSegment(normalizedSegment);
//   };

//   const handleViewMedicalRecords = (medicalRecordId) => {
//     console.log('[PatientDashboard] View Medical Records for ID:', medicalRecordId);
//     setSelectedMedicalRecordId(medicalRecordId);
//     setCurrentSegment('medical-records');
//   };

//   const handleBackFromMedicalRecords = () => {
//     console.log('[PatientDashboard] Back from medical records');
//     setSelectedMedicalRecordId(null);
//     setCurrentSegment('my-health');
//   };

//   const renderPageContent = () => {
//     console.log('[PatientDashboard] renderPageContent. currentSegment:', currentSegment, 'selectedMedicalRecordId:', selectedMedicalRecordId);

//     if (loadingPatientData) {
//       return (
//         <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <CircularProgress />
//         </Box>
//       );
//     }

//     if (currentSegment.startsWith('prescriptions/')) {
//       const recordId = currentSegment.split('/')[1];
//       console.log('[PatientDashboard] Rendering PrescriptionsPage for recordId:', recordId);
//       return <PrescriptionsPage medicalRecordId={recordId} onBack={() => setCurrentSegment('medical-records')} />;
//     }

//     if (currentSegment.startsWith('lab-reports/')) {
//       const recordId = currentSegment.split('/')[1];
//       console.log('[PatientDashboard] Rendering LabReportsPage for recordId:', recordId);
//       return <LabReportsPage medicalRecordId={recordId} onBack={() => setCurrentSegment('medical-records')} />;
//     }

//     if (currentSegment === 'medical-records' && selectedMedicalRecordId) {
//       console.log('[PatientDashboard] Rendering MedicalRecordsPage for recordId:', selectedMedicalRecordId);
//       return (
//         <MedicalRecordsPage
//           medicalRecordId={selectedMedicalRecordId}
//           onBack={handleBackFromMedicalRecords}
//           onNavigate={handleNavigate}
//         />
//       );
//     }

//     console.log('[PatientDashboard] Rendering DashboardPageContent for segment:', currentSegment);
//     return (
//       <DashboardPageContent
//         currentSegment={currentSegment}
//         loading={loadingPatientData}
//         patient={patient}
//         onNavigate={handleNavigate}
//         onViewMedicalRecords={handleViewMedicalRecords}
//       />
//     );
//   };

//   return (
//     <ErrorBoundary>
//       <ThemeProvider theme={theme}>
//         <Box sx={{ width: '100vw', height: '100vh', p: 0, m: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
//           <AppProvider
//             navigation={NAVIGATION}
//             router={{ pathname: currentSegment, navigate: handleNavigate }}
//             theme={theme}
//             branding={{ title: "Sarvotham's Spine Care", onClick: () => handleNavigate('') }}
//           >
//             <DashboardLayout
//               sx={{ flex: 1, p: 0, m: 0, height: '100%' }}
//               slots={{
//                 drawerContent: () => <SidebarNavigation currentSegment={currentSegment} onNavigate={handleNavigate} />,
//                 toolbarAccount: () => (
//                   <ProfileMenu
//                     patient={patient}
//                     onLogout={handleLogout}
//                     onProfilePicChange={handleProfilePicChange}
//                     loading={loadingPatientData}
//                   />
//                 ),
//               }}
//             >
//               {renderPageContent()}
//             </DashboardLayout>
//           </AppProvider>
//         </Box>
//       </ThemeProvider>
//     </ErrorBoundary>
//   );
// };

// export default PatientDashboard;
// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import CircularProgress from '@mui/material/CircularProgress';

// import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
// import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
// import ContactMailIcon from '@mui/icons-material/ContactMail';
// import HomeIcon from '@mui/icons-material/Home';

// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';

// import ProfileMenu from './ProfileMenu';
// import MyHealthPage from './MyHealthPage';
// import MedicalRecordsPage from './MedicalRecordsPage';
// import PrescriptionsPage from './PrescriptionsPage';
// import LabReportsPage from './LabReportsPage';

// import HomePage from './HomePage';
// import MyBillsPage from './MyBillsPage';
// import ServicesPage from './ServicesPage';
// import ContactPage from './ContactPage';

// // Navigation configuration with updated icons and no header
// const NAVIGATION = [
//   { segment: 'home', title: 'Home', icon: <HomeIcon /> },
//   { segment: 'my-health', title: 'My Health', icon: <MedicalServicesIcon /> },
//   { segment: 'my-bills', title: 'My Bills', icon: <AccountBalanceWalletIcon /> },
//   { segment: 'services', title: 'Services', icon: <MiscellaneousServicesIcon /> },
//   { segment: 'contact', title: 'Contact', icon: <ContactMailIcon /> },
// ];

// // Material-UI theme setup
// const theme = createTheme({
//   palette: {
//     mode: 'light',
//     primary: { main: '#1976d2', contrastText: '#fff' },
//     secondary: { main: '#388e3c' },
//     background: { default: '#f5f7fa', paper: '#fff' },
//     error: { main: '#d32f2f' },
//     text: { primary: '#202124', secondary: '#5f6368' },
//   },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     h6: { fontWeight: 600, fontSize: '1.25rem' },
//     body1: { fontSize: '1rem' },
//   },
//   components: {
//     MuiTypography: { styleOverrides: { root: { lineHeight: 1.5 } } },
//   },
// });

// // Simple Error Boundary for catching render errors
// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false, errorInfo: null };
//   }
//   static getDerivedStateFromError(error) {
//     return { hasError: true, errorInfo: error.toString() };
//   }
//   componentDidCatch(error, errorInfo) {
//     console.error("ErrorBoundary caught an error:", error, errorInfo);
//   }
//   render() {
//     if (this.state.hasError) {
//       return (
//         <Box sx={{ p: 4, color: 'error.main', textAlign: 'center' }}>
//           <Typography variant="h5" gutterBottom>Error occurred loading this section.</Typography>
//           <Typography>{this.state.errorInfo}</Typography>
//         </Box>
//       );
//     }
//     return this.props.children;
//   }
// }

// ErrorBoundary.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// function SidebarNavigation({ currentSegment, onNavigate }) {
//   console.log('[SidebarNavigation] currentSegment:', currentSegment);
//   return (
//     <List sx={{ width: 240, bgcolor: 'background.paper' }}>
//       {NAVIGATION.map((item, idx) =>
//         item.kind === 'header' ? (
//           <Typography key={idx} variant="subtitle2" sx={{ p: 2, color: 'text.secondary', userSelect: 'none' }}>
//             {item.title}
//           </Typography>
//         ) : (
//           <ListItemButton key={item.segment} selected={currentSegment === item.segment} onClick={() => {
//             console.log(`[SidebarNavigation] Navigate to: ${item.segment}`);
//             onNavigate(item.segment);
//           }}>
//             <ListItemIcon>{item.icon}</ListItemIcon>
//             <ListItemText primary={item.title} />
//           </ListItemButton>
//         )
//       )}
//     </List>
//   );
// }

// SidebarNavigation.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   onNavigate: PropTypes.func.isRequired,
// };

// function DashboardPageContent({ currentSegment, loading, patient, onNavigate, onViewMedicalRecords }) {
//   console.log('[DashboardPageContent] Rendering for segment:', currentSegment);
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
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   switch (currentSegment) {
//     case 'branding-landing':
//     case '':
//       return (
//         <Box sx={{ flexGrow: 1, p: 4, bgcolor: '#f5f7fa' }}>
//           <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
//             Welcome to Sarvotham's Spine Care
//           </Typography>
//           <Typography variant="h6" color="text.secondary">
//             Your journey to a healthier spine starts here. We are dedicated to providing the best care for our patients.
//           </Typography>
//         </Box>
//       );
//     case 'home':
//       return <HomePage patient={patient} />;
//     case 'my-health':
//       return <MyHealthPage patient={patient} onNavigate={onNavigate} onViewMedicalRecords={onViewMedicalRecords} />;
//     case 'my-bills':
//       return <MyBillsPage patient={patient} />;
//     case 'services':
//       return <ServicesPage />;
//     case 'contact':
//       return <ContactPage />;
//     default:
//       return (
//         <Box
//           sx={{
//             mt: 0,
//             p: 0,
//             m: 0,
//             width: '100%',
//             height: '100%',
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <Typography variant="h5" gutterBottom>
//             404 - Page Not Found
//           </Typography>
//           <Typography variant="body1">Sorry, the page you are looking for doesn't exist.</Typography>
//         </Box>
//       );
//   }
// }

// DashboardPageContent.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   loading: PropTypes.bool,
//   patient: PropTypes.shape({
//     name: PropTypes.string,
//     email: PropTypes.string,
//     profilePic: PropTypes.string,
//   }),
//   onNavigate: PropTypes.func.isRequired,
//   onViewMedicalRecords: PropTypes.func,
// };

// // Custom Header Component to show both image and title
// const CustomHeader = ({ onNavigate }) => (
//   <Box
//     sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
//     onClick={() => onNavigate('')}
//   >
//     <img
//       src="https://static.vecteezy.com/system/resources/previews/011/640/711/non_2x/simple-modern-hospital-logo-with-healthcare-medical-template-vector.jpg"
//       alt="Sarvotham Spine Care"
//       style={{ height: '40px', marginRight: '10px' }}
//     />
//     <Typography
//       variant="h6"
//       component="div"
//       sx={{ flexGrow: 1, fontWeight: 'bold', color: 'text.primary', display: { xs: 'none', md: 'block' } }}
//     >
//       Sarvotham Spine Care
//     </Typography>
//   </Box>
// );

// CustomHeader.propTypes = {
//   onNavigate: PropTypes.func.isRequired,
// };

// const PatientDashboard = () => {
//   // The initial state is now an empty string, so the welcome message will render first.
//   const [currentSegment, setCurrentSegment] = useState('');
//   const [patient, setPatient] = useState({
//     name: '',
//     email: '',
//     profilePic: '',
//     userId: '',
//     phoneNumber: '',
//   });
//   const [loadingPatientData, setLoadingPatientData] = useState(true);

//   const [selectedMedicalRecordId, setSelectedMedicalRecordId] = useState(null);

//   useEffect(() => {
//     console.log('[PatientDashboard] Loading patient data from sessionStorage');
//     (async () => {
//       setLoadingPatientData(true);
//       try {
//         const storedUserId = sessionStorage.getItem('userId');
//         const storedUsername = sessionStorage.getItem('username');
//         const storedEmail = sessionStorage.getItem('email');
//         const storedProfilePic = sessionStorage.getItem('profilePic');
//         const storedPhoneNumber = sessionStorage.getItem('phoneNumber');

//         console.log('[PatientDashboard] Retrieved user data:', { storedUserId, storedUsername, storedEmail });

//         if (storedUserId && storedUsername && storedEmail) {
//           setPatient({
//             name: storedUsername,
//             email: storedEmail,
//             profilePic: storedProfilePic || 'http://localhost:2004/default-profile.png',
//             userId: storedUserId,
//             phoneNumber: storedPhoneNumber || 'N/A',
//           });
//         } else {
//           console.warn('[PatientDashboard] User data incomplete, redirecting to login');
//           window.location.href = '/login';
//         }
//       } catch (err) {
//         console.error('[PatientDashboard] Error loading patient data:', err);
//       } finally {
//         setLoadingPatientData(false);
//       }
//     })();
//   }, []);

//   const handleLogout = () => {
//     console.log('[PatientDashboard] logout triggered: clearing session and redirecting');
//     sessionStorage.clear();
//     window.location.href = '/login';
//   };

//   const handleProfilePicChange = (file) => {
//     console.log('[PatientDashboard] Profile picture change requested:', file);
//     const newPicUrl = URL.createObjectURL(file);
//     setPatient((prev) => ({ ...prev, profilePic: newPicUrl }));
//     alert('Profile picture updated locally. Implement server upload if desired!');
//   };

//   const handleNavigate = (segment) => {
//     console.log('[PatientDashboard] Navigate called with segment:', segment);
//     // Clear selected record if navigating away from detailed pages
//     if (!segment.startsWith('medical-records') && !segment.startsWith('prescriptions') && !segment.startsWith('lab-reports')) {
//       console.log('[PatientDashboard] Clearing selectedMedicalRecordId');
//       setSelectedMedicalRecordId(null);
//     }
//     const normalizedSegment = segment.startsWith('/') ? segment.slice(1) : segment;
//     setCurrentSegment(normalizedSegment);
//   };

//   const handleViewMedicalRecords = (medicalRecordId) => {
//     console.log('[PatientDashboard] View Medical Records for ID:', medicalRecordId);
//     setSelectedMedicalRecordId(medicalRecordId);
//     setCurrentSegment('medical-records');
//   };

//   const handleBackFromMedicalRecords = () => {
//     console.log('[PatientDashboard] Back from medical records');
//     setSelectedMedicalRecordId(null);
//     setCurrentSegment('my-health');
//   };

//   const renderPageContent = () => {
//     console.log('[PatientDashboard] renderPageContent. currentSegment:', currentSegment, 'selectedMedicalRecordId:', selectedMedicalRecordId);

//     if (loadingPatientData) {
//       return (
//         <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <CircularProgress />
//         </Box>
//       );
//     }

//     if (currentSegment.startsWith('prescriptions/')) {
//       const recordId = currentSegment.split('/')[1];
//       console.log('[PatientDashboard] Rendering PrescriptionsPage for recordId:', recordId);
//       return <PrescriptionsPage medicalRecordId={recordId} onBack={() => setCurrentSegment('medical-records')} />;
//     }

//     if (currentSegment.startsWith('lab-reports/')) {
//       const recordId = currentSegment.split('/')[1];
//       console.log('[PatientDashboard] Rendering LabReportsPage for recordId:', recordId);
//       return <LabReportsPage medicalRecordId={recordId} onBack={() => setCurrentSegment('medical-records')} />;
//     }

//     if (currentSegment === 'medical-records' && selectedMedicalRecordId) {
//       console.log('[PatientDashboard] Rendering MedicalRecordsPage for recordId:', selectedMedicalRecordId);
//       return (
//         <MedicalRecordsPage
//           medicalRecordId={selectedMedicalRecordId}
//           onBack={handleBackFromMedicalRecords}
//           onNavigate={handleNavigate}
//         />
//       );
//     }

//     console.log('[PatientDashboard] Rendering DashboardPageContent for segment:', currentSegment);
//     return (
//       <DashboardPageContent
//         currentSegment={currentSegment}
//         loading={loadingPatientData}
//         patient={patient}
//         onNavigate={handleNavigate}
//         onViewMedicalRecords={handleViewMedicalRecords}
//       />
//     );
//   };

//   return (
//     <ErrorBoundary>
//       <ThemeProvider theme={theme}>
//         <Box sx={{ width: '100vw', height: '100vh', p: 0, m: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
//         <AppProvider
//   navigation={NAVIGATION}
//   router={{ pathname: currentSegment, navigate: handleNavigate }}
//   theme={theme}
//   branding={{
//     title: "Sarvotham Spine Care",
//     onClick: () => handleNavigate(''),
//   }}
// >
//             <DashboardLayout
//               sx={{ flex: 1, p: 0, m: 0, height: '100%' }}
//               slots={{
//                 drawerContent: () => <SidebarNavigation currentSegment={currentSegment} onNavigate={handleNavigate} />,
//                 toolbarAccount: () => (
//                   <ProfileMenu
//                     patient={patient}
//                     onLogout={handleLogout}
//                     onProfilePicChange={handleProfilePicChange}
//                     loading={loadingPatientData}
//                   />
//                 ),
//                 // Use the custom component for the header title
//                 toolbarTitle: () => <CustomHeader onNavigate={handleNavigate} />,
//               }}
//             >
//               {renderPageContent()}
//             </DashboardLayout>
//           </AppProvider>
//         </Box>
//       </ThemeProvider>
//     </ErrorBoundary>
//   );
// };

// export default PatientDashboard;


// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import CircularProgress from '@mui/material/CircularProgress';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper'; // Added Paper for a nice, elevated look
// import Button from '@mui/material/Button'; // Added Button for a call-to-action

// import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
// import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
// import ContactMailIcon from '@mui/icons-material/ContactMail';
// import HomeIcon from '@mui/icons-material/Home';
// import AssignmentIcon from '@mui/icons-material/Assignment'; // New icon
// import LocalHospitalIcon from '@mui/icons-material/LocalHospital'; // New icon

// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';

// import ProfileMenu from './ProfileMenu';
// import MyHealthPage from './MyHealthPage';
// import MedicalRecordsPage from './MedicalRecordsPage';
// import PrescriptionsPage from './PrescriptionsPage';
// import LabReportsPage from './LabReportsPage';

// import HomePage from './HomePage';
// import MyBillsPage from './MyBillsPage';
// import ServicesPage from './ServicesPage';
// import ContactPage from './ContactPage';

// // Navigation configuration with updated icons and no header
// const NAVIGATION = [
//   { segment: 'home', title: 'Home', icon: <HomeIcon /> },
//   { segment: 'my-health', title: 'My Health', icon: <MedicalServicesIcon /> },
//   { segment: 'my-bills', title: 'My Bills', icon: <AccountBalanceWalletIcon /> },
//   { segment: 'services', title: 'Services', icon: <MiscellaneousServicesIcon /> },
//   { segment: 'contact', title: 'Contact', icon: <ContactMailIcon /> },
// ];

// // Material-UI theme setup
// const theme = createTheme({
//   palette: {
//     mode: 'light',
//     primary: { main: '#1976d2', contrastText: '#fff' },
//     secondary: { main: '#388e3c' },
//     background: { default: '#f5f7fa', paper: '#fff' },
//     error: { main: '#d32f2f' },
//     text: { primary: '#202124', secondary: '#5f6368' },
//   },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     h6: { fontWeight: 600, fontSize: '1.25rem' },
//     body1: { fontSize: '1rem' },
//   },
//   components: {
//     MuiTypography: { styleOverrides: { root: { lineHeight: 1.5 } } },
//   },
// });

// // Simple Error Boundary for catching render errors
// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false, errorInfo: null };
//   }
//   static getDerivedStateFromError(error) {
//     return { hasError: true, errorInfo: error.toString() };
//   }
//   componentDidCatch(error, errorInfo) {
//     console.error("ErrorBoundary caught an error:", error, errorInfo);
//   }
//   render() {
//     if (this.state.hasError) {
//       return (
//         <Box sx={{ p: 4, color: 'error.main', textAlign: 'center' }}>
//           <Typography variant="h5" gutterBottom>Error occurred loading this section.</Typography>
//           <Typography>{this.state.errorInfo}</Typography>
//         </Box>
//       );
//     }
//     return this.props.children;
//   }
// }

// ErrorBoundary.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// function SidebarNavigation({ currentSegment, onNavigate }) {
//   console.log('[SidebarNavigation] currentSegment:', currentSegment);
//   return (
//     <List sx={{ width: 240, bgcolor: 'background.paper' }}>
//       {NAVIGATION.map((item, idx) =>
//         item.kind === 'header' ? (
//           <Typography key={idx} variant="subtitle2" sx={{ p: 2, color: 'text.secondary', userSelect: 'none' }}>
//             {item.title}
//           </Typography>
//         ) : (
//           <ListItemButton key={item.segment} selected={currentSegment === item.segment} onClick={() => {
//             console.log(`[SidebarNavigation] Navigate to: ${item.segment}`);
//             onNavigate(item.segment);
//           }}>
//             <ListItemIcon>{item.icon}</ListItemIcon>
//             <ListItemText primary={item.title} />
//           </ListItemButton>
//         )
//       )}
//     </List>
//   );
// }

// SidebarNavigation.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   onNavigate: PropTypes.func.isRequired,
// };

// function DashboardPageContent({ currentSegment, loading, patient, onNavigate, onViewMedicalRecords }) {
//   console.log('[DashboardPageContent] Rendering for segment:', currentSegment);
//   if (loading) {
//     return (
//       <Box
//         sx={{
//           width: '100%',
//           height: '100%',
//           minHeight: '100vh',
//           minWidth: '100vw',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   switch (currentSegment) {
//     case 'branding-landing':
//     case '':
//       return (
//         <Box sx={{ flexGrow: 1, p: 4, bgcolor: '#f5f7fa', overflowY: 'auto' }}>
//           {/* Welcome Banner Section */}
//           <Paper elevation={3} sx={{ p: 4, mb: 4, textAlign: 'center', bgcolor: '#e3f2fd' }}>
//             <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
//               Welcome to Sarvotham's Spine Care
//             </Typography>
//             <Typography variant="h6" color="text.secondary">
//               Your journey to a healthier spine starts here. We are dedicated to providing the best care for our patients.
//             </Typography>
//             <Button variant="contained" sx={{ mt: 3 }} onClick={() => onNavigate('contact')}>
//               Book an Appointment
//             </Button>
//           </Paper>
//           
//           <Divider sx={{ my: 4 }} />

//           {/* Mission & Services Cards */}
//           <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3 }}>
//             Our Commitment to You
//           </Typography>
//           <Grid container spacing={4} sx={{ mb: 4 }}>
//             <Grid item xs={12} md={6}>
//               <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//                 <CardMedia
//                   component="img"
//                   height="250"
//                   image="https://media.gettyimages.com/id/1312706413/photo/modern-hospital-building.jpg?s=612x612&w=gi&k=20&c=1-EC4Mxf--5u4ItDIzrIOrduXlbKRnbx9xWWtiifrDo="
//                   alt="Doctor and patient consultation"
//                 />
//                 <CardContent sx={{ flexGrow: 1 }}>
//                   <Typography gutterBottom variant="h5" component="div">
//                     Our Mission
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     We are committed to providing compassionate, comprehensive, and state-of-the-art spine care. Our goal is to improve the quality of life for every patient through personalized treatment plans and a holistic approach to health and wellness.
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//                 <CardMedia
//                   component="img"
//                   height="250"
//                   image="https://thumbs.dreamstime.com/b/hospital-building-modern-parking-lot-59693686.jpg"
//                   alt="Spinal cord model"
//                 />
//                 <CardContent sx={{ flexGrow: 1 }}>
//                   <Typography gutterBottom variant="h5" component="div">
//                     Advanced Services
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     We offer a wide range of services, including advanced diagnostics, non-surgical treatments like physical therapy and injections, and minimally invasive surgical procedures. Our expert team ensures you receive the most effective care tailored to your needs.
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//           
//           <Divider sx={{ my: 4 }} />
//           
//           {/* Quick Links Section */}
//           <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3 }}>
//             Quick Actions
//           </Typography>
//           <Grid container spacing={3} justifyContent="center" sx={{ mb: 4 }}>
//             <Grid item xs={12} sm={6} md={3}>
//               <Paper elevation={2} sx={{ p: 2, textAlign: 'center', '&:hover': { bgcolor: 'primary.light' }, cursor: 'pointer' }} onClick={() => onNavigate('my-health')}>
//                 <LocalHospitalIcon color="primary" sx={{ fontSize: 40 }} />
//                 <Typography variant="h6">My Health</Typography>
//                 <Typography variant="body2" color="text.secondary">View your health overview.</Typography>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <Paper elevation={2} sx={{ p: 2, textAlign: 'center', '&:hover': { bgcolor: 'primary.light' }, cursor: 'pointer' }} onClick={() => onNavigate('my-bills')}>
//                 <AccountBalanceWalletIcon color="primary" sx={{ fontSize: 40 }} />
//                 <Typography variant="h6">My Bills</Typography>
//                 <Typography variant="body2" color="text.secondary">Review your billing history.</Typography>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <Paper elevation={2} sx={{ p: 2, textAlign: 'center', '&:hover': { bgcolor: 'primary.light' }, cursor: 'pointer' }} onClick={() => onNavigate('contact')}>
//                 <ContactMailIcon color="primary" sx={{ fontSize: 40 }} />
//                 <Typography variant="h6">Contact Us</Typography>
//                 <Typography variant="body2" color="text.secondary">Get in touch with our team.</Typography>
//               </Paper>
//             </Grid>
//           </Grid>

//           <Divider sx={{ my: 4 }} />

//           {/* FAQ Section */}
//           <Box>
//             <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
//               Frequently Asked Questions (FAQ)
//             </Typography>
//             <Accordion>
//               <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                 <Typography variant="subtitle1">What types of spine conditions do you treat?</Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography>
//                   We treat a variety of conditions, including herniated discs, spinal stenosis, sciatica, scoliosis, and degenerative disc disease. Our comprehensive approach ensures we address both simple and complex cases.
//                 </Typography>
//               </AccordionDetails>
//             </Accordion>
//             <Accordion>
//               <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                 <Typography variant="subtitle1">How can I book an appointment?</Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography>
//                   You can book an appointment by navigating to the "Contact" page and filling out the form, or by calling our clinic directly at the number provided.
//                 </Typography>
//               </AccordionDetails>
//             </Accordion>
//             <Accordion>
//               <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                 <Typography variant="subtitle1">Do you accept my insurance?</Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography>
//                   We work with most major insurance providers. Please contact our billing department to verify your specific coverage. You can find their details on the "Contact" page.
//                 </Typography>
//               </AccordionDetails>
//             </Accordion>
//           </Box>
//         </Box>
//       );
//     case 'home':
//       return <HomePage patient={patient} />;
//     case 'my-health':
//       return <MyHealthPage patient={patient} onNavigate={onNavigate} onViewMedicalRecords={onViewMedicalRecords} />;
//     case 'my-bills':
//       return <MyBillsPage patient={patient} />;
//     case 'services':
//       return <ServicesPage />;
//     case 'contact':
//       return <ContactPage />;
//     default:
//       return (
//         <Box
//           sx={{
//             mt: 0,
//             p: 0,
//             m: 0,
//             width: '100%',
//             height: '100%',
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <Typography variant="h5" gutterBottom>
//             404 - Page Not Found
//           </Typography>
//           <Typography variant="body1">Sorry, the page you are looking for doesn't exist.</Typography>
//         </Box>
//       );
//   }
// }

// DashboardPageContent.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   loading: PropTypes.bool,
//   patient: PropTypes.shape({
//     name: PropTypes.string,
//     email: PropTypes.string,
//     profilePic: PropTypes.string,
//   }),
//   onNavigate: PropTypes.func.isRequired,
//   onViewMedicalRecords: PropTypes.func,
// };

// // Custom Header Component to show both image and title
// const CustomHeader = ({ onNavigate }) => (
//   <Box
//     sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
//     onClick={() => onNavigate('')}
//   >
//     <img
//       src="https://static.vecteezy.com/system/resources/previews/011/640/711/non_2x/simple-modern-hospital-logo-with-healthcare-medical-template-vector.jpg"
//       alt="Sarvotham Spine Care"
//       style={{ height: '40px', marginRight: '10px' }}
//     />
//     <Typography
//       variant="h6"
//       component="div"
//       sx={{ flexGrow: 1, fontWeight: 'bold', color: 'text.primary', display: { xs: 'none', md: 'block' } }}
//     >
//       Sarvotham Spine Care
//     </Typography>
//   </Box>
// );

// CustomHeader.propTypes = {
//   onNavigate: PropTypes.func.isRequired,
// };

// const PatientDashboard = () => {
//   // The initial state is now an empty string, so the welcome message will render first.
//   const [currentSegment, setCurrentSegment] = useState('');
//   const [patient, setPatient] = useState({
//     name: '',
//     email: '',
//     profilePic: '',
//     userId: '',
//     phoneNumber: '',
//   });
//   const [loadingPatientData, setLoadingPatientData] = useState(true);

//   const [selectedMedicalRecordId, setSelectedMedicalRecordId] = useState(null);

//   useEffect(() => {
//     console.log('[PatientDashboard] Loading patient data from sessionStorage');
//     (async () => {
//       setLoadingPatientData(true);
//       try {
//         const storedUserId = sessionStorage.getItem('userId');
//         const storedUsername = sessionStorage.getItem('username');
//         const storedEmail = sessionStorage.getItem('email');
//         const storedProfilePic = sessionStorage.getItem('profilePic');
//         const storedPhoneNumber = sessionStorage.getItem('phoneNumber');

//         console.log('[PatientDashboard] Retrieved user data:', { storedUserId, storedUsername, storedEmail });

//         if (storedUserId && storedUsername && storedEmail) {
//           setPatient({
//             name: storedUsername,
//             email: storedEmail,
//             profilePic: storedProfilePic || 'http://localhost:2004/default-profile.png',
//             userId: storedUserId,
//             phoneNumber: storedPhoneNumber || 'N/A',
//           });
//         } else {
//           console.warn('[PatientDashboard] User data incomplete, redirecting to login');
//           window.location.href = '/login';
//         }
//       } catch (err) {
//         console.error('[PatientDashboard] Error loading patient data:', err);
//       } finally {
//         setLoadingPatientData(false);
//       }
//     })();
//   }, []);

//   const handleLogout = () => {
//     console.log('[PatientDashboard] logout triggered: clearing session and redirecting');
//     sessionStorage.clear();
//     window.location.href = '/login';
//   };

//   const handleProfilePicChange = (base64String) => {
//     console.log('[PatientDashboard] Profile picture change requested:', base64String);
//     setPatient((prev) => ({ ...prev, profilePic: base64String }));
//   };
 
//   const handleNavigate = (segment) => {
//     console.log('[PatientDashboard] Navigate called with segment:', segment);
//     // Clear selected record if navigating away from detailed pages
//     if (!segment.startsWith('medical-records') && !segment.startsWith('prescriptions') && !segment.startsWith('lab-reports')) {
//       console.log('[PatientDashboard] Clearing selectedMedicalRecordId');
//       setSelectedMedicalRecordId(null);
//     }
//     const normalizedSegment = segment.startsWith('/') ? segment.slice(1) : segment;
//     setCurrentSegment(normalizedSegment);
//   };

//   const handleViewMedicalRecords = (medicalRecordId) => {
//     console.log('[PatientDashboard] View Medical Records for ID:', medicalRecordId);
//     setSelectedMedicalRecordId(medicalRecordId);
//     setCurrentSegment('medical-records');
//   };

//   const handleBackFromMedicalRecords = () => {
//     console.log('[PatientDashboard] Back from medical records');
//     setSelectedMedicalRecordId(null);
//     setCurrentSegment('my-health');
//   };

//   const renderPageContent = () => {
//     console.log('[PatientDashboard] renderPageContent. currentSegment:', currentSegment, 'selectedMedicalRecordId:', selectedMedicalRecordId);

//     if (loadingPatientData) {
//       return (
//         <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <CircularProgress />
//         </Box>
//       );
//     }

//     if (currentSegment.startsWith('prescriptions/')) {
//       const recordId = currentSegment.split('/')[1];
//       console.log('[PatientDashboard] Rendering PrescriptionsPage for recordId:', recordId);
//       return <PrescriptionsPage medicalRecordId={recordId} onBack={() => setCurrentSegment('medical-records')} />;
//     }

//     if (currentSegment.startsWith('lab-reports/')) {
//       const recordId = currentSegment.split('/')[1];
//       console.log('[PatientDashboard] Rendering LabReportsPage for recordId:', recordId);
//       return <LabReportsPage medicalRecordId={recordId} onBack={() => setCurrentSegment('medical-records')} />;
//     }

//     if (currentSegment === 'medical-records' && selectedMedicalRecordId) {
//       console.log('[PatientDashboard] Rendering MedicalRecordsPage for recordId:', selectedMedicalRecordId);
//       return (
//         <MedicalRecordsPage
//           medicalRecordId={selectedMedicalRecordId}
//           onBack={handleBackFromMedicalRecords}
//           onNavigate={handleNavigate}
//         />
//       );
//     }

//     console.log('[PatientDashboard] Rendering DashboardPageContent for segment:', currentSegment);
//     return (
//       <DashboardPageContent
//         currentSegment={currentSegment}
//         loading={loadingPatientData}
//         patient={patient}
//         onNavigate={handleNavigate}
//         onViewMedicalRecords={handleViewMedicalRecords}
//       />
//     );
//   };

//   return (
//     <ErrorBoundary>
//       <ThemeProvider theme={theme}>
//           
//         <Box sx={{ width: '100vw', height: '100vh', p: 0, m: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
//         <AppProvider
//     navigation={NAVIGATION}
//     router={{ pathname: currentSegment, navigate: handleNavigate }}
//     theme={theme}

// branding={{
//     title: "Sarvotham Spine Care",
//     onClick: () => handleNavigate(''),
//   }}
//   >
//             <DashboardLayout
//               sx={{ flex: 1, p: 0, m: 0, height: '100%' }}
//               slots={{
//                 drawerContent: () => <SidebarNavigation currentSegment={currentSegment} onNavigate={handleNavigate} />,
//                 toolbarAccount: () => (
//                   <ProfileMenu
//                     patient={patient}
//                     onLogout={handleLogout}
//                     onProfilePicChange={handleProfilePicChange}
//                     loading={loadingPatientData}
//                   />
//                 ),
//                 // Use the custom component for the header title
//                 toolbarTitle: () => <CustomHeader onNavigate={handleNavigate} />,
//               }}
//             >
//               {renderPageContent()}
//             </DashboardLayout>
//           </AppProvider>
//         </Box>
//       </ThemeProvider>
//     </ErrorBoundary>
//   );
// };

// export default PatientDashboard;


// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import CircularProgress from '@mui/material/CircularProgress';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper'; // Added Paper for a nice, elevated look
// import Button from '@mui/material/Button'; // Added Button for a call-to-action

// import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
// import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
// import ContactMailIcon from '@mui/icons-material/ContactMail';
// import HomeIcon from '@mui/icons-material/Home';
// import AssignmentIcon from '@mui/icons-material/Assignment'; // New icon
// import LocalHospitalIcon from '@mui/icons-material/LocalHospital'; // New icon

// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';

// import ProfileMenu from './ProfileMenu';
// import MyHealthPage from './MyHealthPage';
// import MedicalRecordsPage from './MedicalRecordsPage';
// import PrescriptionsPage from './PrescriptionsPage';
// import LabReportsPage from './LabReportsPage';
// import './PatientDashboard.css';
// import HomePage from './HomePage';
// import MyBillsPage from './MyBillsPage';
// import ServicesPage from './ServicesPage';
// import ContactPage from './ContactPage';

// // Navigation configuration with updated icons and no header
// const NAVIGATION = [
//   { segment: 'home', title: 'Home', icon: <HomeIcon /> },
//   { segment: 'my-health', title: 'My Health', icon: <MedicalServicesIcon /> },
//   { segment: 'my-bills', title: 'My Bills', icon: <AccountBalanceWalletIcon /> },
//   { segment: 'services', title: 'Services', icon: <MiscellaneousServicesIcon /> },
//   { segment: 'contact', title: 'Contact', icon: <ContactMailIcon /> },
// ];

// // Material-UI theme setup
// const theme = createTheme({
//   palette: {
//     mode: 'light',
//     primary: { main: '#1976d2', contrastText: '#fff' },
//     secondary: { main: '#388e3c' },
//     background: { default: '#f5f7fa', paper: '#fff' },
//     error: { main: '#d32f2f' },
//     text: { primary: '#202124', secondary: '#5f6368' },
//   },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     h6: { fontWeight: 600, fontSize: '1.25rem' },
//     body1: { fontSize: '1rem' },
//   },
//   components: {
//     MuiTypography: { styleOverrides: { root: { lineHeight: 1.5 } } },
//   },
// });

// // Simple Error Boundary for catching render errors
// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false, errorInfo: null };
//   }
//   static getDerivedStateFromError(error) {
//     return { hasError: true, errorInfo: error.toString() };
//   }
//   componentDidCatch(error, errorInfo) {
//     console.error("ErrorBoundary caught an error:", error, errorInfo);
//   }
//   render() {
//     if (this.state.hasError) {
//       return (
//         <Box sx={{ p: 4, color: 'error.main', textAlign: 'center' }}>
//           <Typography variant="h5" gutterBottom>Error occurred loading this section.</Typography>
//           <Typography>{this.state.errorInfo}</Typography>
//         </Box>
//       );
//     }
//     return this.props.children;
//   }
// }

// ErrorBoundary.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// function SidebarNavigation({ currentSegment, onNavigate }) {
//   console.log('[SidebarNavigation] currentSegment:', currentSegment);
//   return (
//     <List sx={{ width: 0, bgcolor: 'background.paper' }}>
//       {NAVIGATION.map((item, idx) =>
//         item.kind === 'header' ? (
//           <Typography key={idx} variant="subtitle2" sx={{ p: 2, color: 'text.secondary', userSelect: 'none' }}>
//             {item.title}
//           </Typography>
//         ) : (
//           <ListItemButton key={item.segment} selected={currentSegment === item.segment} onClick={() => {
//             console.log(`[SidebarNavigation] Navigate to: ${item.segment}`);
//             onNavigate(item.segment);
//           }}>
//             <ListItemIcon>{item.icon}</ListItemIcon>
//             <ListItemText primary={item.title} />
//           </ListItemButton>
//         )
//       )}
//     </List>
//   );
// }

// SidebarNavigation.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   onNavigate: PropTypes.func.isRequired,
// };

// function DashboardPageContent({ currentSegment, loading, patient, onNavigate, onViewMedicalRecords }) {
//   console.log('[DashboardPageContent] Rendering for segment:', currentSegment);
//   if (loading) {
//     return (
//       <Box
//         sx={{
//           width: '0%',
//           height: '0%',
//           minHeight: '100vh',
//           minWidth: '100vw',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   switch (currentSegment) {
//     case 'branding-landing':
//     case '':
//       return (
//         <Box sx={{ flexGrow: 1, p: 4, bgcolor: '#f5f7fa', overflowY: 'auto' }}>
//           {/* Welcome Banner Section */}
//           <Paper elevation={3} sx={{ p: 4, mb: 4, textAlign: 'center', bgcolor: '#e3f2fd' }}>
//             <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
//               Welcome to Sarvotham's Spine Care
//             </Typography>
//             <Typography variant="h6" color="text.secondary">
//               Your journey to a healthier spine starts here. We are dedicated to providing the best care for our patients.
//             </Typography>
//             <Button variant="contained" sx={{ mt: 3 }} onClick={() => onNavigate('contact')}>
//               Book an Appointment
//             </Button>
//           </Paper>

//           <Divider sx={{ my: 4 }} />

//           {/* Mission & Services Cards */}
//           <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3 }}>
//             Our Commitment to You
//           </Typography>
//           <Grid container spacing={4} sx={{ mb: 4 }}>
//             <Grid item xs={12} md={6}>
//               <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//                 <CardMedia
//                   component="img"
//                   height="250"
//                   image="https://imgs.search.brave.com/9z7aalDXvsKMs6ZFcLgNRlIb-gTBt7hb4a8a4YvtwZU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTEz/MDkyMjIwNC9waG90/by9ob3NwaXRhbC1i/ZWQtY29ycmlkb3It/bm9ib2R5LWxhbmRz/Y2FwZS1mb3JtYXQu/d2VicD9hPTEmYj0x/JnM9NjEyeDYxMiZ3/PTAmaz0yMCZjPTd0/RXJPVldJaHpoU3Zu/VkQ5VXZtMHBWQ0pL/YUpqdHNvek9LZjZR/emNpVkU9"
//                   alt="Doctor and patient consultation"
//                 />
//                 <CardContent sx={{ flexGrow: 1 }}>
//                   <Typography gutterBottom variant="h5" component="div">
//                     Our Mission
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     We are committed to providing compassionate, comprehensive, and state-of-the-art spine care. Our goal is to improve the quality of life for every patient through personalized treatment plans and a holistic approach to health and wellness.
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//                 <CardMedia
//                   component="img"
//                   height="250"
//                   image="https://imgs.search.brave.com/V-vwzncjMJdY2hyIG20hjJ7dJwQxd-tICcLcFguWzFU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zZGst/aW1hZ2UyLnMzLmFw/LXNvdXRoLTEuYW1h/em9uYXdzLmNvbS9z/bWFsbF9Ob2lkYV9C/dWlsZGluZ182YmY3/MDU3NGI0LmpmaWY"
//                   alt="Spinal cord model"
//                 />
//                 <CardContent sx={{ flexGrow: 1 }}>
//                   <Typography gutterBottom variant="h5" component="div">
//                     Advanced Services
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     We offer a wide range of services, including advanced diagnostics, non-surgical treatments like physical therapy and injections, and minimally invasive surgical procedures. Our expert team ensures you receive the most effective care tailored to your needs.
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>

//           <Divider sx={{ my: 4 }} />

//           {/* Quick Links Section */}
//           <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3 }}>
//             Quick Actions
//           </Typography>
//           <Grid container spacing={3} justifyContent="center" sx={{ mb: 4 }}>
//             <Grid item xs={12} sm={6} md={3}>
//               <Paper elevation={2} sx={{ p: 2, textAlign: 'center', '&:hover': { bgcolor: 'primary.light' }, cursor: 'pointer' }} onClick={() => onNavigate('my-health')}>
//                 <LocalHospitalIcon color="primary" sx={{ fontSize: 40 }} />
//                 <Typography variant="h6">My Health</Typography>
//                 <Typography variant="body2" color="text.secondary">View your health overview.</Typography>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <Paper elevation={2} sx={{ p: 2, textAlign: 'center', '&:hover': { bgcolor: 'primary.light' }, cursor: 'pointer' }} onClick={() => onNavigate('my-bills')}>
//                 <AccountBalanceWalletIcon color="primary" sx={{ fontSize: 40 }} />
//                 <Typography variant="h6">My Bills</Typography>
//                 <Typography variant="body2" color="text.secondary">Review your billing history.</Typography>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <Paper elevation={2} sx={{ p: 2, textAlign: 'center', '&:hover': { bgcolor: 'primary.light' }, cursor: 'pointer' }} onClick={() => onNavigate('contact')}>
//                 <ContactMailIcon color="primary" sx={{ fontSize: 40 }} />
//                 <Typography variant="h6">Contact Us</Typography>
//                 <Typography variant="body2" color="text.secondary">Get in touch with our team.</Typography>
//               </Paper>
//             </Grid>
//           </Grid>

//           <Divider sx={{ my: 4 }} />

//           {/* FAQ Section */}
//           <Box>
//             <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
//               Frequently Asked Questions (FAQ)
//             </Typography>
//             <Accordion>
//               <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                 <Typography variant="subtitle1">What types of spine conditions do you treat?</Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography>
//                   We treat a variety of conditions, including herniated discs, spinal stenosis, sciatica, scoliosis, and degenerative disc disease. Our comprehensive approach ensures we address both simple and complex cases.
//                 </Typography>
//               </AccordionDetails>
//             </Accordion>
//             <Accordion>
//               <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                 <Typography variant="subtitle1">How can I book an appointment?</Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography>
//                   You can book an appointment by navigating to the "Contact" page and filling out the form, or by calling our clinic directly at the number provided.
//                 </Typography>
//               </AccordionDetails>
//             </Accordion>
//             <Accordion>
//               <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                 <Typography variant="subtitle1">Do you accept my insurance?</Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography>
//                   We work with most major insurance providers. Please contact our billing department to verify your specific coverage. You can find their details on the "Contact" page.
//                 </Typography>
//               </AccordionDetails>
//             </Accordion>
//           </Box>
//         </Box>
//       );
//     case 'home':
//       return <HomePage patient={patient} />;
//     case 'my-health':
//       return <MyHealthPage patient={patient} onNavigate={onNavigate} onViewMedicalRecords={onViewMedicalRecords} />;
//     case 'my-bills':
//       return <MyBillsPage patient={patient} />;
//     case 'services':
//       return <ServicesPage />;
//     case 'contact':
//       return <ContactPage />;
//     default:
//       return (
//         <Box
//           sx={{
//             mt: 0,
//             p: 0,
//             m: 0,
//             width: '100%',
//             height: '100%',
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <Typography variant="h5" gutterBottom>
//             404 - Page Not Found
//           </Typography>
//           <Typography variant="body1">Sorry, the page you are looking for doesn't exist.</Typography>
//         </Box>
//       );
//   }
// }

// DashboardPageContent.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   loading: PropTypes.bool,
//   patient: PropTypes.shape({
//     name: PropTypes.string,
//     email: PropTypes.string,
//     profilePic: PropTypes.string,
//   }),
//   onNavigate: PropTypes.func.isRequired,
//   onViewMedicalRecords: PropTypes.func,
// };

// // Custom Header Component to show both image and title
// const CustomHeader = ({ onNavigate }) => (
//   <Box
//     sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
//     onClick={() => onNavigate('')}
//   >
//     <img
//       src="https://imgs.search.brave.com/srz2pFGVJKd8v0use2RG82Xv1K4W-GTPkTsfWDKshFk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9mcGlt/YWdlcy53aXRoZmxv/YXRzLmNvbS9hY3R1/YWwvNjQ3ZDgxYzFl/YWRhNDEwMDAxYWQ4/YzJmLmpwZWc"
//       alt="Sarvotham Spine Care"
//       style={{ height: '40px', marginRight: '10px' }}
//     />
//     <Typography
//       variant="h6"
//       component="div"
//       sx={{ flexGrow: 1, fontWeight: 'bold', color: 'text.primary', display: { xs: 'none', md: 'block' } }}
//     >
//       Sarvotham Spine Care
//     </Typography>
//   </Box>
// );

// CustomHeader.propTypes = {
//   onNavigate: PropTypes.func.isRequired,
// };

// const PatientDashboard = () => {
//   // The initial state is now an empty string, so the welcome message will render first.
//   const [currentSegment, setCurrentSegment] = useState('');
//   const [patient, setPatient] = useState({
//     name: '',
//     email: '',
//     profilePic: '',
//     userId: '',
//     phoneNumber: '',
//   });
//   const [loadingPatientData, setLoadingPatientData] = useState(true);

//   // Corrected state to hold both IDs
//   const [selectedMedicalRecord, setSelectedMedicalRecord] = useState({
//     medicalRecordId: null,
//     appointmentId: null
//   });

//   useEffect(() => {
//     console.log('[PatientDashboard] Loading patient data from sessionStorage');
//     (async () => {
//       setLoadingPatientData(true);
//       try {
//         const storedUserId = sessionStorage.getItem('userId');
//         const storedUsername = sessionStorage.getItem('username');
//         const storedEmail = sessionStorage.getItem('email');
//         const storedProfilePic = sessionStorage.getItem('profilePic');
//         const storedPhoneNumber = sessionStorage.getItem('phoneNumber');

//         console.log('[PatientDashboard] Retrieved user data:', { storedUserId, storedUsername, storedEmail });

//         if (storedUserId && storedUsername && storedEmail) {
//           setPatient({
//             name: storedUsername,
//             email: storedEmail,
//             profilePic: storedProfilePic || 'http://localhost:2004/default-profile.png',
//             userId: storedUserId,
//             phoneNumber: storedPhoneNumber || 'N/A',
//           });
//         } else {
//           console.warn('[PatientDashboard] User data incomplete, redirecting to login');
//           window.location.href = '/login';
//         }
//       } catch (err) {
//         console.error('[PatientDashboard] Error loading patient data:', err);
//       } finally {
//         setLoadingPatientData(false);
//       }
//     })();
//   }, []);

//   const handleLogout = () => {
//     console.log('[PatientDashboard] logout triggered: clearing session and redirecting');
//     sessionStorage.clear();
//     window.location.href = '/login';
//   };

//   const handleProfilePicChange = (base64String) => {
//     console.log('[PatientDashboard] Profile picture change requested:', base64String);
//     setPatient((prev) => ({ ...prev, profilePic: base64String }));
//   };
  
//   const handleNavigate = (segment) => {
//     console.log('[PatientDashboard] Navigate called with segment:', segment);
//     // Clear selected record if navigating away from detailed pages
//     if (!segment.startsWith('medical-records') && !segment.startsWith('prescriptions') && !segment.startsWith('lab-reports')) {
//       console.log('[PatientDashboard] Clearing selectedMedicalRecordId and appointmentId');
//       setSelectedMedicalRecord({ medicalRecordId: null, appointmentId: null });
//     }
//     const normalizedSegment = segment.startsWith('/') ? segment.slice(1) : segment;
//     setCurrentSegment(normalizedSegment);
//   };

//   // Corrected function to accept both IDs
//   const handleViewMedicalRecords = (medicalRecordId, appointmentId) => {
//     console.log('[PatientDashboard] View Medical Records for ID:', medicalRecordId, 'and Appointment ID:', appointmentId);
//     setSelectedMedicalRecord({ medicalRecordId, appointmentId });
//     setCurrentSegment('medical-records');
//   };

//   const handleBackFromMedicalRecords = () => {
//     console.log('[PatientDashboard] Back from medical records');
//     setSelectedMedicalRecord({ medicalRecordId: null, appointmentId: null });
//     setCurrentSegment('my-health');
//   };

//   const renderPageContent = () => {
//     console.log('[PatientDashboard] renderPageContent. currentSegment:', currentSegment, 'selectedMedicalRecordId:', selectedMedicalRecord.medicalRecordId, 'selectedAppointmentId:', selectedMedicalRecord.appointmentId);

//     if (loadingPatientData) {
//       return (
//         <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <CircularProgress />
//         </Box>
//       );
//     }

//     if (currentSegment.startsWith('prescriptions/')) {
//       const recordId = currentSegment.split('/')[1];
//       console.log('[PatientDashboard] Rendering PrescriptionsPage for recordId:', recordId);
//       return <PrescriptionsPage medicalRecordId={recordId} onBack={() => setCurrentSegment('medical-records')} />;
//     }

//     if (currentSegment.startsWith('lab-reports/')) {
//       const recordId = currentSegment.split('/')[1];
//       console.log('[PatientDashboard] Rendering LabReportsPage for recordId:', recordId);
//       return <LabReportsPage medicalRecordId={recordId} onBack={() => setCurrentSegment('medical-records')} />;
//     }

//     if (currentSegment === 'medical-records' && selectedMedicalRecord.medicalRecordId) {
//       console.log('[PatientDashboard] Rendering MedicalRecordsPage for recordId:', selectedMedicalRecord.medicalRecordId, 'and appointmentId:', selectedMedicalRecord.appointmentId);
//       return (
//         <MedicalRecordsPage
//           medicalRecordId={selectedMedicalRecord.medicalRecordId}
//           appointmentId={selectedMedicalRecord.appointmentId} // Corrected: Pass the appointmentId
//           onBack={handleBackFromMedicalRecords}
//           onNavigate={handleNavigate}
//         />
//       );
//     }

//     console.log('[PatientDashboard] Rendering DashboardPageContent for segment:', currentSegment);
//     return (
//       <DashboardPageContent
//         currentSegment={currentSegment}
//         loading={loadingPatientData}
//         patient={patient}
//         onNavigate={handleNavigate}
//         onViewMedicalRecords={handleViewMedicalRecords}
//       />
//     );
//   };

//   return (
//     <ErrorBoundary>
//       <ThemeProvider theme={theme}>
          
//         <Box sx={{ width: '100vw', height: '100vh', p: 0, m: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
//         <AppProvider
//     navigation={NAVIGATION}
//     router={{ pathname: currentSegment, navigate: handleNavigate }}
//     theme={theme}
//     branding={{
//       title: "Sarvotham Spine Care",
//       logo: (
//         <img
//           src="https://imgs.search.brave.com/I3lfsdq9k6y3txb8rAS9ukU5dwws1WPVNNQq7NQEIXI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9ibHVlLW1lZGlj/YWwtZW1lcmdlbmN5/LXN0YXItbGlmZS13/aXRoLXdoaXRlLWNh/ZHVjZXVzLW1lZGlj/YWwtc3ltYm9sLXdo/aXRlLWJhY2tncm91/bmQtM2QtcmVuZGVy/aW5nXzQ3NjYxMi0x/NTA1NC5qcGc_c2Vt/dD1haXNfaHlicmlk/Jnc9NzQw"
//           alt="Hospital Logo"
//           style={{ height: '40px' }}
//         />
//       ),
//       onClick: () => handleNavigate(''),
//     }}
//   >
//           <DashboardLayout
//             sx={{ flex: 1, p: 0, m: 0, height: '100%' }}
//             slots={{
//               drawerContent: () => <SidebarNavigation currentSegment={currentSegment} onNavigate={handleNavigate} />,
//               toolbarAccount: () => (
//                 <ProfileMenu
//                   patient={patient}
//                   onLogout={handleLogout}
//                   onProfilePicChange={handleProfilePicChange}
//                   loading={loadingPatientData}
//                 />
//               ),
//               // Use the custom component for the header title
//               toolbarTitle: () => <CustomHeader onNavigate={handleNavigate} />,
//             }}
//           >
//             {renderPageContent()}
//           </DashboardLayout>
//           </AppProvider>
//         </Box>
//       </ThemeProvider>
//     </ErrorBoundary>
//   );
// };

// export default PatientDashboard;

// src/components/PatientDashboard.js (Updated)

// src/Patient/PatientDashboard.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import ProfileMenu from './ProfileMenu';
import MyHealthPage from './MyHealthPage';
import MedicalRecordsPage from './MedicalRecordsPage';
import PrescriptionsPage from './PrescriptionsPage';
import LabReportsPage from './LabReportsPage';
import HomePage from './HomePage';
import MyBillsPage from './MyBillsPage';
import ServicesPage from './ServicesPage';
import ContactPage from './ContactPage';
import EditProfilePage from './EditProfilePage';
import './PatientDashboard.css';

// Navigation configuration with the new "Edit Profile" button
const NAVIGATION = [
  { segment: 'home', title: 'Home', icon: <HomeIcon /> },
  { segment: 'my-health', title: 'My Health', icon: <MedicalServicesIcon /> },
  { segment: 'my-bills', title: 'My Bills', icon: <AccountBalanceWalletIcon /> },
  { segment: 'services', title: 'Services', icon: <MiscellaneousServicesIcon /> },
  { segment: 'contact', title: 'Contact', icon: <ContactMailIcon /> },
  { segment: 'edit-profile', title: 'Edit Profile', icon: <SettingsIcon /> },
];

// Material-UI theme setup
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2', contrastText: '#fff' },
    secondary: { main: '#388e3c' },
    background: { default: '#f5f7fa', paper: '#fff' },
    error: { main: '#d32f2f' },
    text: { primary: '#202124', secondary: '#5f6368' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: { fontWeight: 600, fontSize: '1.25rem' },
    body1: { fontSize: '1rem' },
  },
  components: {
    MuiTypography: { styleOverrides: { root: { lineHeight: 1.5 } } },
  },
});

// Simple Error Boundary for catching render errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, errorInfo: error.toString() };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 4, color: 'error.main', textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>Error occurred loading this section.</Typography>
          <Typography>{this.state.errorInfo}</Typography>
        </Box>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

function SidebarNavigation({ currentSegment, onNavigate }) {
  console.log('[SidebarNavigation] currentSegment:', currentSegment);
  return (
    <List sx={{ width: 0, bgcolor: 'background.paper' }}>
      {NAVIGATION.map((item, idx) =>
        item.kind === 'header' ? (
          <Typography key={idx} variant="subtitle2" sx={{ p: 2, color: 'text.secondary', userSelect: 'none' }}>
            {item.title}
          </Typography>
        ) : (
          <ListItemButton key={item.segment} selected={currentSegment === item.segment} onClick={() => {
            console.log(`[SidebarNavigation] Navigate to: ${item.segment}`);
            onNavigate(item.segment);
          }}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        )
      )}
    </List>
  );
}

SidebarNavigation.propTypes = {
  currentSegment: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

function DashboardPageContent({ currentSegment, loading, patient, onNavigate, onViewMedicalRecords, onSaveProfile }) {
  console.log('[DashboardPageContent] Rendering for segment:', currentSegment);
  if (loading) {
    return (
      <Box
        sx={{
          width: '0%',
          height: '0%',
          minHeight: '100vh',
          minWidth: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  switch (currentSegment) {
    case 'branding-landing':
    case '':
      return (
        <Box sx={{ flexGrow: 1, p: 4, bgcolor: '#f5f7fa', overflowY: 'auto' }}>
          {/* Welcome Banner Section */}
          <Paper elevation={3} sx={{ p: 4, mb: 4, textAlign: 'center', bgcolor: '#e3f2fd' }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              Welcome to Sarvotham's Spine Care
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Your journey to a healthier spine starts here. We are dedicated to providing the best care for our patients.
            </Typography>
            <Button variant="contained" sx={{ mt: 3 }} onClick={() => onNavigate('contact')}>
              Book an Appointment
            </Button>
          </Paper>

          <Divider sx={{ my: 4 }} />

          {/* Mission & Services Cards */}
          <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3 }}>
            Our Commitment to You
          </Typography>
          <Grid container spacing={4} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="250"
                  image="https://imgs.search.brave.com/9z7aalDXvsKMs6ZFcLgNRlIb-gTBt7hb4a8a4YvtwZU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTEz/MDkyMjIwNC9waG90/by9ob3NwaXRhbC1i/ZWQtY29ycmlkb3It/bm9ib2R5LWxhbmRz/Y2FwZS1mb3JtYXQu/d2VicD9hPTEmYj0x/JnM9NjEyeDYxMiZ3/PTAmaz0yMCZjPTd0/RXJPVldJaHpoU3Zu/VkQ5VXZtMHBWQ0pL/YUpqdHNvek9LZjZR/emNpVkU9"
                  alt="Doctor and patient consultation"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Our Mission
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    We are committed to providing compassionate, comprehensive, and state-of-the-art spine care. Our goal is to improve the quality of life for every patient through personalized treatment plans and a holistic approach to health and wellness.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="250"
                  image="https://imgs.search.brave.com/V-vwzncjMJdY2hyIG20hjJ7dJwQxd-tICcLcFguWzFU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zZGst/aW1hZ2UyLnMzLmFw/LXNvdXRoLTEuYW1h/em9uYXdzLmNvbS9z/bWFsbF9Ob2lkYV9C/dWlsZGluZ182YmY3/MDU3NGI0LmpmaWY"
                  alt="Spinal cord model"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Advanced Services
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    We offer a wide range of services, including advanced diagnostics, non-surgical treatments like physical therapy and injections, and minimally invasive surgical procedures. Our expert team ensures you receive the most effective care tailored to your needs.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          {/* Quick Links Section */}
          <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3 }}>
            Quick Actions
          </Typography>
          <Grid container spacing={3} justifyContent="center" sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={2} sx={{ p: 2, textAlign: 'center', '&:hover': { bgcolor: 'primary.light' }, cursor: 'pointer' }} onClick={() => onNavigate('my-health')}>
                <LocalHospitalIcon color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h6">My Health</Typography>
                <Typography variant="body2" color="text.secondary">View your health overview.</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={2} sx={{ p: 2, textAlign: 'center', '&:hover': { bgcolor: 'primary.light' }, cursor: 'pointer' }} onClick={() => onNavigate('my-bills')}>
                <AccountBalanceWalletIcon color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h6">My Bills</Typography>
                <Typography variant="body2" color="text.secondary">Review your billing history.</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={2} sx={{ p: 2, textAlign: 'center', '&:hover': { bgcolor: 'primary.light' }, cursor: 'pointer' }} onClick={() => onNavigate('contact')}>
                <ContactMailIcon color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h6">Contact Us</Typography>
                <Typography variant="body2" color="text.secondary">Get in touch with our team.</Typography>
              </Paper>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          {/* FAQ Section */}
          <Box>
            <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
              Frequently Asked Questions (FAQ)
            </Typography>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">What types of spine conditions do you treat?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  We treat a variety of conditions, including herniated discs, spinal stenosis, sciatica, scoliosis, and degenerative disc disease. Our comprehensive approach ensures we address both simple and complex cases.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">How can I book an appointment?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  You can book an appointment by navigating to the "Contact" page and filling out the form, or by calling our clinic directly at the number provided.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Do you accept my insurance?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  We work with most major insurance providers. Please contact our billing department to verify your specific coverage. You can find their details on the "Contact" page.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      );
    case 'home':
      return <HomePage patient={patient} />;
    case 'my-health':
      return <MyHealthPage patient={patient} onNavigate={onNavigate} onViewMedicalRecords={onViewMedicalRecords} />;
    case 'my-bills':
      return <MyBillsPage patient={patient} />;
    case 'services':
      return <ServicesPage />;
    case 'contact':
      return <ContactPage patient={patient} />;
   // src/Patient/PatientDashboard.jsx (modified snippet)
// ...
case 'edit-profile':
  // The patient prop contains the userId
  return <EditProfilePage patient={patient} userId={patient._id} onBack={() => onNavigate('home')} onSave={onSaveProfile} />;
// ...
      return (
        <Box
          sx={{
            mt: 0,
            p: 0,
            m: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" gutterBottom>
            404 - Page Not Found
          </Typography>
          <Typography variant="body1">Sorry, the page you are looking for doesn't exist.</Typography>
        </Box>
      );
  }
}

DashboardPageContent.propTypes = {
  currentSegment: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  patient: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    profilePic: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
  onNavigate: PropTypes.func.isRequired,
  onViewMedicalRecords: PropTypes.func,
  onSaveProfile: PropTypes.func.isRequired,
};

// Custom Header Component to show both image and title
const CustomHeader = ({ onNavigate }) => (
  <Box
    sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
    onClick={() => onNavigate('')}
  >
    <img
      src="https://imgs.search.brave.com/srz2pFGVJKd8v0use2RG82Xv1K4W-GTPkTsfWDKshFk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9mcGlt/YWdlcy53aXRoZmxv/YXRzLmNvbS9hY3R1/YWwvNjQ3ZDgxYzFl/YWRhNDEwMDAxYWQ4/YzJmLmpwZWc"
      alt="Sarvotham Spine Care"
      style={{ height: '40px', marginRight: '10px' }}
    />
    <Typography
      variant="h6"
      component="div"
      sx={{ flexGrow: 1, fontWeight: 'bold', color: 'text.primary', display: { xs: 'none', md: 'block' } }}
    >
      Sarvotham Spine Care
    </Typography>
  </Box>
);

CustomHeader.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

const PatientDashboard = () => {
  const [currentSegment, setCurrentSegment] = useState('');
  const [patient, setPatient] = useState({
    name: '',
    email: '',
    profilePic: '',
    userId: '',
    phoneNumber: '',
  });
  const [loadingPatientData, setLoadingPatientData] = useState(true);

  const [selectedMedicalRecord, setSelectedMedicalRecord] = useState({
    medicalRecordId: null,
    appointmentId: null
  });

  useEffect(() => {
    console.log('[PatientDashboard] Loading patient data from sessionStorage');
    (async () => {
      setLoadingPatientData(true);
      try {
        const storedUserId = sessionStorage.getItem('userId');
        const storedUsername = sessionStorage.getItem('username');
        const storedEmail = sessionStorage.getItem('email');
        const storedProfilePic = sessionStorage.getItem('profilePic');
        const storedPhoneNumber = sessionStorage.getItem('phoneNumber');

        console.log('[PatientDashboard] Retrieved user data:', { storedUserId, storedUsername, storedEmail });

        if (storedUserId && storedUsername && storedEmail) {
          setPatient({
            name: storedUsername,
            email: storedEmail,
            profilePic: storedProfilePic || 'http://localhost:2004/default-profile.png',
            userId: storedUserId,
            phoneNumber: storedPhoneNumber || 'N/A',
          });
        } else {
          console.warn('[PatientDashboard] User data incomplete, redirecting to login');
          window.location.href = '/login';
        }
      } catch (err) {
        console.error('[PatientDashboard] Error loading patient data:', err);
      } finally {
        setLoadingPatientData(false);
      }
    })();
  }, []);

  const handleLogout = () => {
    console.log('[PatientDashboard] logout triggered: clearing session and redirecting');
    sessionStorage.clear();
    window.location.href = '/login';
  };

  const handleProfilePicChange = (base64String) => {
    console.log('[PatientDashboard] Profile picture change requested:', base64String);
    setPatient((prev) => ({ ...prev, profilePic: base64String }));
  };

  const handleSaveProfile = (updatedData) => {
    console.log('[PatientDashboard] Saving profile data:', updatedData);
    setPatient((prev) => ({
      ...prev,
      name: updatedData.name,
      email: updatedData.email,
      phoneNumber: updatedData.phoneNumber,
    }));
    // In a real app, you'd also save this to sessionStorage and the backend
  };

  const handleNavigate = (segment) => {
    console.log('[PatientDashboard] Navigate called with segment:', segment);
    if (!segment.startsWith('medical-records') && !segment.startsWith('prescriptions') && !segment.startsWith('lab-reports')) {
      console.log('[PatientDashboard] Clearing selectedMedicalRecordId and appointmentId');
      setSelectedMedicalRecord({ medicalRecordId: null, appointmentId: null });
    }
    const normalizedSegment = segment.startsWith('/') ? segment.slice(1) : segment;
    setCurrentSegment(normalizedSegment);
  };

  const handleViewMedicalRecords = (medicalRecordId, appointmentId) => {
    console.log('[PatientDashboard] View Medical Records for ID:', medicalRecordId, 'and Appointment ID:', appointmentId);
    setSelectedMedicalRecord({ medicalRecordId, appointmentId });
    setCurrentSegment('medical-records');
  };

  const handleBackFromMedicalRecords = () => {
    console.log('[PatientDashboard] Back from medical records');
    setSelectedMedicalRecord({ medicalRecordId: null, appointmentId: null });
    setCurrentSegment('my-health');
  };

  const renderPageContent = () => {
    console.log('[PatientDashboard] renderPageContent. currentSegment:', currentSegment, 'selectedMedicalRecordId:', selectedMedicalRecord.medicalRecordId, 'selectedAppointmentId:', selectedMedicalRecord.appointmentId);

    if (loadingPatientData) {
      return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      );
    }

    if (currentSegment.startsWith('prescriptions/')) {
      const recordId = currentSegment.split('/')[1];
      console.log('[PatientDashboard] Rendering PrescriptionsPage for recordId:', recordId);
      return <PrescriptionsPage medicalRecordId={recordId} onBack={() => setCurrentSegment('medical-records')} />;
    }

    if (currentSegment.startsWith('lab-reports/')) {
      const recordId = currentSegment.split('/')[1];
      console.log('[PatientDashboard] Rendering LabReportsPage for recordId:', recordId);
      return <LabReportsPage medicalRecordId={recordId} onBack={() => setCurrentSegment('medical-records')} />;
    }

    if (currentSegment === 'medical-records' && selectedMedicalRecord.medicalRecordId) {
      console.log('[PatientDashboard] Rendering MedicalRecordsPage for recordId:', selectedMedicalRecord.medicalRecordId, 'and appointmentId:', selectedMedicalRecord.appointmentId);
      return (
        <MedicalRecordsPage
          medicalRecordId={selectedMedicalRecord.medicalRecordId}
          appointmentId={selectedMedicalRecord.appointmentId}
          onBack={handleBackFromMedicalRecords}
          onNavigate={handleNavigate}
        />
      );
    }

    console.log('[PatientDashboard] Rendering DashboardPageContent for segment:', currentSegment);
    return (
      <DashboardPageContent
        currentSegment={currentSegment}
        loading={loadingPatientData}
        patient={patient}
        onNavigate={handleNavigate}
        onViewMedicalRecords={handleViewMedicalRecords}
        onSaveProfile={handleSaveProfile}
      />
    );
  };

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <Box sx={{ width: '100vw', height: '100vh', p: 0, m: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <AppProvider
            navigation={NAVIGATION}
            router={{ pathname: currentSegment, navigate: handleNavigate }}
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
                drawerContent: () => <SidebarNavigation currentSegment={currentSegment} onNavigate={handleNavigate} />,
                toolbarAccount: () => (
                  <ProfileMenu
                    patient={patient}
                    onLogout={handleLogout}
                    onProfilePicChange={handleProfilePicChange}
                    loading={loadingPatientData}
                    onNavigate={handleNavigate}
                  />
                ),
                toolbarTitle: () => <CustomHeader onNavigate={handleNavigate} />,
              }}
            >
              {renderPageContent()}
            </DashboardLayout>
          </AppProvider>
        </Box>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default PatientDashboard;