// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import {
//   Box,
//   Typography,
//   Avatar,
//   Menu,
//   MenuItem,
//   IconButton,
//   Tooltip,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   createTheme,
//   ThemeProvider,
//   CircularProgress,
//   TextField,
//   Button,
//   Alert,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from '@mui/material';

// import DashboardIcon from '@mui/icons-material/Dashboard';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import ContactMailIcon from '@mui/icons-material/ContactMail';
// import LogoutIcon from '@mui/icons-material/Logout';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import SaveIcon from '@mui/icons-material/Save';
// import EditIcon from '@mui/icons-material/Edit';

// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';

// // Import Billing Desk specific page components
// import BillingDeskDashboardOverview from './BillingDeskDashboardOverview';
// import BillingDeskInvoicing from './BillingDeskInvoicing';
// import BillingDeskPatientAccounts from './BillingDeskPatientAccounts';
// import BillingDeskReports from './BillingDeskReports';
// import BillingDeskSettings from './BillingDeskSettings';
// import BillingDashboard from './BillingDashboard';
// import BillingDeskContactUs from './BillingDeskContactUs';

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
//     : 'BD';
//   return {
//     sx: { bgcolor: stringToColor(name || 'Default Billing Desk User') },
//     children: initials,
//   };
// }

// // --- Navigation items for Billing Desk Dashboard ---
// const BILLING_DESK_NAVIGATION = [
//   { kind: 'header', title: 'Billing Desk Navigation' },
//   { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
//   { segment: 'invoicing', title: 'Invoices', icon: <ReceiptLongIcon /> },
//   { segment: 'generate-bill', title: 'Generate Bill', icon: <AddCircleOutlineIcon /> },
//   { segment: 'patient-accounts', title: 'Patient Accounts', icon: <AccountBalanceWalletIcon /> },
//   { segment: 'reports', title: 'Reports', icon: <BarChartIcon /> },
//   { segment: 'contact-us', title: 'Contact Us', icon: <ContactMailIcon /> },
// ];

// // --- Custom Material-UI Theme (reused for consistency) ---
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

// // --- NEW: UpdateProfileDialog Component ---
// function UpdateProfileDialog({ user, open, onClose, onSave, isSaving }) {
//   const [editableUsername, setEditableUsername] = useState(user.name || '');
//   const [editableEmail, setEditableEmail] = useState(user.email || '');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmNewPassword, setConfirmNewPassword] = useState('');
//   const [saveStatus, setSaveStatus] = useState(null); // 'success', 'error', null
//   const [passwordError, setPasswordError] = useState('');

//   // Update editable fields when user prop changes or dialog opens
//   useEffect(() => {
//     setEditableUsername(user.name || '');
//     setEditableEmail(user.email || '');
//     setNewPassword(''); // Clear password fields on open/user change
//     setConfirmNewPassword('');
//     setSaveStatus(null);
//     setPasswordError('');
//   }, [user, open]);

//   const handleSaveClick = async () => {
//     setSaveStatus(null);
//     setPasswordError('');

//     // Password validation
//     if (newPassword && newPassword !== confirmNewPassword) {
//       setPasswordError('New password and confirm password do not match.');
//       return;
//     }
//     if (newPassword && newPassword.length < 6) { // Example: minimum password length
//       setPasswordError('Password must be at least 6 characters long.');
//       return;
//     }

//     const result = await onSave(editableUsername, editableEmail, newPassword);

//     if (result.success) {
//       setSaveStatus('success');
//       // Optionally close dialog after a short delay on success
//       setTimeout(onClose, 1500);
//     } else {
//       setSaveStatus('error');
//     }
//   };

//   const isFormUnchanged =
//     editableUsername === user.name &&
//     editableEmail === user.email &&
//     !newPassword; // Form is unchanged if no new password is entered either

//   return (
//     <Dialog open={open} onClose={onClose} aria-labelledby="update-profile-dialog-title">
//       <DialogTitle id="update-profile-dialog-title">Update Profile Details</DialogTitle>
//       <DialogContent dividers>
//         <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//           User ID: {user.userId} (cannot be changed)
//         </Typography>
//         <TextField
//           label="Username"
//           variant="outlined"
//           fullWidth
//           size="small"
//           value={editableUsername}
//           onChange={(e) => setEditableUsername(e.target.value)}
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           label="Email"
//           variant="outlined"
//           fullWidth
//           size="small"
//           type="email"
//           value={editableEmail}
//           onChange={(e) => setEditableEmail(e.target.value)}
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           label="New Password (optional)"
//           variant="outlined"
//           fullWidth
//           size="small"
//           type="password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           error={!!passwordError}
//           helperText={passwordError}
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           label="Confirm New Password"
//           variant="outlined"
//           fullWidth
//           size="small"
//           type="password"
//           value={confirmNewPassword}
//           onChange={(e) => setConfirmNewPassword(e.target.value)}
//           error={!!passwordError}
//           helperText={passwordError}
//           sx={{ mb: 2 }}
//         />

//         {saveStatus === 'success' && (
//           <Alert severity="success" sx={{ mt: 1 }}>Profile updated successfully!</Alert>
//         )}
//         {saveStatus === 'error' && (
//           <Alert severity="error" sx={{ mt: 1 }}>Failed to update profile. Please try again.</Alert>
//         )}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="secondary" disabled={isSaving}>
//           Cancel
//         </Button>
//         <Button
//           onClick={handleSaveClick}
//           color="primary"
//           variant="contained"
//           disabled={isSaving || isFormUnchanged || !!passwordError}
//           startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
//         >
//           {isSaving ? 'Saving...' : 'Save Changes'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

// UpdateProfileDialog.propTypes = {
//   user: PropTypes.shape({
//     userId: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//   }).isRequired,
//   open: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   onSave: PropTypes.func.isRequired,
//   isSaving: PropTypes.bool.isRequired,
// };

// // --- Profile Menu Component ---
// function BillingDeskProfileMenu({ user, onLogout, onProfilePicChange, onUpdateProfile, loading }) {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const [openUpdateDialog, setOpenUpdateDialog] = useState(false); // State for the new dialog

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

//   const handleOpenUpdateDialog = () => {
//     setOpenUpdateDialog(true);
//     handleClose(); // Close the main profile menu when opening the dialog
//   };

//   const handleCloseUpdateDialog = () => {
//     setOpenUpdateDialog(false);
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
//             boxShadow: 'rgb(0 0 0 / 0.2) 0px 2px 8px',
//           },
//         }}
//         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//       >
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, pb: 1, borderBottom: '1px solid #eee' }}>
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

//         {/* New: Update Profile button */}
//         <MenuItem onClick={handleOpenUpdateDialog}>
//           <EditIcon fontSize="small" sx={{ mr: 1 }} />
//           Update Profile
//         </MenuItem>

//         <MenuItem sx={{ mt: 1 }}>
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

//       {/* The Update Profile Dialog */}
//       <UpdateProfileDialog
//         user={user}
//         open={openUpdateDialog}
//         onClose={handleCloseUpdateDialog}
//         onSave={onUpdateProfile}
//         isSaving={loading}
//       />
//     </>
//   );
// }

// BillingDeskProfileMenu.propTypes = {
//   user: PropTypes.shape({
//     userId: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     profilePic: PropTypes.string,
//   }).isRequired,
//   onLogout: PropTypes.func.isRequired,
//   onProfilePicChange: PropTypes.func.isRequired,
//   onUpdateProfile: PropTypes.func.isRequired,
//   loading: PropTypes.bool,
// };

// // --- Content for the Dashboard Pages (adapted for Billing Desk) ---
// function BillingDeskDashboardPageContent({ currentSegment, loading, billingDeskUser }) {
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
//     case 'dashboard': return <BillingDeskDashboardOverview billingDeskUser={billingDeskUser} />;
//     case 'invoicing': return <BillingDeskInvoicing billingDeskUser={billingDeskUser} />;
//     case 'generate-bill': return <BillingDashboard billingDeskUser={billingDeskUser} />;
//     case 'patient-accounts': return <BillingDeskPatientAccounts billingDeskUser={billingDeskUser} />;
//     case 'reports': return <BillingDeskReports billingDeskUser={billingDeskUser} />;
//     case 'contact-us':
//       return <BillingDeskContactUs billingDeskUser={billingDeskUser} />;
//     case 'settings':
//       return <BillingDeskSettings billingDeskUser={billingDeskUser} />;
//     default:
//       return (
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             bgcolor: '#fff',
//             borderRadius: 2,
//             boxShadow:
//               '0 1px 3px rgb(0 0 0 / 0.1), 0 1px 2px rgb(0 0 0 / 0.06)',
//             p: 3,
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

// BillingDeskDashboardPageContent.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   loading: PropTypes.bool,
//   billingDeskUser: PropTypes.shape({
//     userId: PropTypes.string,
//     name: PropTypes.string,
//     email: PropTypes.string,
//     profilePic: PropTypes.string,
//   }),
// };

// // --- Navigation Sidebar Component ---
// function BillingDeskNavigationMenu({ currentSegment, onNavigate }) {
//   return (
//     <Box sx={{ width: 240, bgcolor: 'background.paper', height: '100vh', borderRight: 1, borderColor: 'divider' }}>
//       <List component="nav" aria-label="billing desk navigation">
//         {BILLING_DESK_NAVIGATION.map((item, index) => {
//           if (item.kind === 'header') {
//             return (
//               <Typography key={index} variant="subtitle1" sx={{ mt: 2, mb: 1, px: 2, fontWeight: 'bold' }}>
//                 {item.title}
//               </Typography>
//             );
//           }
//           return (
//             <ListItemButton
//               key={item.segment}
//               selected={currentSegment === item.segment}
//               onClick={() => onNavigate(item.segment)}
//             >
//               <ListItemIcon>{item.icon}</ListItemIcon>
//               <ListItemText primary={item.title} />
//             </ListItemButton>
//           );
//         })}
//       </List>
//       <Divider />
//     </Box>
//   );
// }

// BillingDeskNavigationMenu.propTypes = {
//   currentSegment: PropTypes.string.isRequired,
//   onNavigate: PropTypes.func.isRequired,
// };

// // --- Main Billing Desk Dashboard Component ---
// export const BillingDeskDashboard = () => {
//   const [currentSegment, setCurrentSegment] = useState('dashboard');
//   const [billingDeskUser, setBillingDeskUser] = useState({
//     userId: '',
//     name: '',
//     email: '',
//     profilePic: '',
//     // Add customId and password_hash to state if you need them on the frontend
//     // customId: null,
//     // password_hash: '', // Store the hash if you need to pass it back
//   });
//   const [loadingBillingDeskData, setLoadingBillingDeskData] = useState(true);

//   useEffect(() => {
//     const loadBillingDeskData = async () => {
//       setLoadingBillingDeskData(true);

//       const storedUserId = sessionStorage.getItem('userId');
//       const storedUsername = sessionStorage.getItem('username');
//       const storedEmail = sessionStorage.getItem('email');
//       const storedProfilePic = sessionStorage.getItem('profilePic');
//       // Retrieve other stored fields if needed
//       // const storedCustomId = sessionStorage.getItem('customId');
//       // const storedPasswordHash = sessionStorage.getItem('password_hash');

//       if (storedUserId && storedUsername && storedEmail) {
//         const userData = {
//           userId: storedUserId,
//           name: storedUsername,
//           email: storedEmail,
//           profilePic: storedProfilePic || 'http://localhost:2004/default-billing.png',
//           // customId: storedCustomId ? parseInt(storedCustomId) : null,
//           // password_hash: storedPasswordHash || '',
//         };
//         setBillingDeskUser(userData);
//         console.log('Logged-in Billing Desk User Details:', userData);
//       } else {
//         // Redirect to login if user data is not found
//         window.location.href = '/login';
//       }
//       setLoadingBillingDeskData(false);
//     };
//     loadBillingDeskData();
//   }, []);

//   const handleLogout = () => {
//     sessionStorage.clear();
//     window.location.href = '/login';
//   };

//   const handleProfilePicChange = async (file) => {
//     const newPicUrl = URL.createObjectURL(file);
//     setBillingDeskUser((prev) => ({ ...prev, profilePic: newPicUrl }));
//     console.log('Profile picture changed locally. (Billing Desk)');
//     // In a real app, you would upload the file to a server and update the user's profilePic URL in the backend.
//   };

//   // Function to handle updating user profile details
//   const handleUpdateProfile = async (updatedUsername, updatedEmail, newPassword) => {
//     setLoadingBillingDeskData(true);
//     try {
//       const userId = billingDeskUser.userId;
//       if (!userId) {
//         throw new Error("User ID not found for profile update.");
//       }

//       // --- STEP 1: Fetch current user data to get all existing fields ---
//       let currentUserData = {};
//       try {
//         const fetchResponse = await fetch(`http://localhost:2009/api/users/${userId}`);
//         if (!fetchResponse.ok) {
//           const errorText = await fetchResponse.text();
//           throw new Error(`Failed to fetch current user data: ${fetchResponse.status} - ${errorText}`);
//         }
//         currentUserData = await fetchResponse.json();
//       } catch (fetchError) {
//         console.error("Error fetching current user data before update:", fetchError);
//         return { success: false, message: "Could not retrieve existing user data for update. Please ensure the user ID is valid." };
//       }

//       // --- STEP 2: Prepare the payload for the PUT request ---
//       const payload = {
//         ...currentUserData, // Start with existing data (e.g., customId, other fields)
//         id: userId, // Ensure ID is explicitly set
//         username: updatedUsername,
//         email: updatedEmail,
//         // Conditionally include new password or existing hash
//         // IMPORTANT: Backend MUST hash this plain text password
//         password_hash: newPassword ? newPassword : currentUserData.password_hash,
//         // Include other fields from currentUserData if your backend expects a full object
//         // e.g., phone_number: currentUserData.phone_number, role_id: currentUserData.role_id, etc.
//       };

//       // Remove any fields from payload that should not be sent or are not part of your User entity for update
//       delete payload.profilePic; // Assuming profilePic is only frontend display
//       delete payload._id; // MongoDB's internal ID, often not needed in the payload for PUT

//       console.log("Sending update payload:", payload);

//       const response = await fetch(`http://localhost:2009/api/users/${userId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           // Add authorization header if your API requires it (e.g., 'Authorization': `Bearer ${yourAuthToken}`)
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Failed to update profile: ${response.status} - ${errorText}`);
//       }

//       const updatedUserFromApi = await response.json();
//       console.log('User profile updated successfully via API:', updatedUserFromApi);

//       // Update sessionStorage with new details
//       sessionStorage.setItem('username', updatedUserFromApi.username);
//       sessionStorage.setItem('email', updatedUserFromApi.email);
//       // If password_hash is returned and needed on frontend, update it
//       // sessionStorage.setItem('password_hash', updatedUserFromApi.password_hash);

//       // Update local state
//       setBillingDeskUser(prev => ({
//         ...prev,
//         name: updatedUserFromApi.username,
//         email: updatedUserFromApi.email,
//         // Update other fields if they are returned and needed in state
//         // password_hash: updatedUserFromApi.password_hash,
//       }));

//       return { success: true, message: "Profile updated successfully!" };

//     } catch (error) {
//       console.error('Error updating user profile:', error);
//       return { success: false, message: error.message || "An unexpected error occurred." };
//     } finally {
//       setLoadingBillingDeskData(false);
//     }
//   };


//   const handleNavigationChange = (segment) => {
//     const normalizedSegment = segment.startsWith('/') ? segment.slice(1) : segment;
//     console.log('Navigating to segment:', normalizedSegment);
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
//           navigation={BILLING_DESK_NAVIGATION}
//           router={{
//             pathname: currentSegment,
//             navigate: handleNavigationChange,
//           }}
//           theme={theme}
//           branding={{ title: "Sarvotham's Spine Care - Billing Desk" }}
//         >
//           <DashboardLayout
//             sx={{ flex: 1, p: 0, m: 0, height: '100%' }}
//             slots={{
//               drawerContent: () => (
//                 <BillingDeskNavigationMenu
//                   currentSegment={currentSegment}
//                   onNavigate={handleNavigationChange}
//                 />
//               ),
//               toolbarAccount: () => (
//                 <BillingDeskProfileMenu
//                   user={billingDeskUser}
//                   onLogout={handleLogout}
//                   onProfilePicChange={handleProfilePicChange}
//                   onUpdateProfile={handleUpdateProfile}
//                   loading={loadingBillingDeskData}
//                 />
//               ),
//             }}
//           >
//             <Box sx={{ p: 0, m: 0, height: '100%', width: '100%' }}>
//               <BillingDeskDashboardPageContent
//                 currentSegment={currentSegment}
//                 loading={loadingBillingDeskData}
//                 billingDeskUser={billingDeskUser}
//               />
//             </Box>
//           </DashboardLayout>
//         </AppProvider>
//       </Box>
//     </ThemeProvider>
//   );
// };

// BillingDeskDashboard.propTypes = {
// };

// export default BillingDeskDashboard;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  createTheme,
  ThemeProvider,
  CircularProgress,
  TextField,
  Button,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BarChartIcon from '@mui/icons-material/BarChart';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'; // New icon for Consultation Bill

import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';

// Import Billing Desk specific page components
import BillingDeskDashboardOverview from './BillingDeskDashboardOverview';
import BillingDeskInvoicing from './BillingDeskInvoicing';
import BillingDeskPatientAccounts from './BillingDeskPatientAccounts';
import BillingDeskReports from './BillingDeskReports';
import BillingDeskSettings from './BillingDeskSettings';
import BillingDashboard from './BillingDashboard';
import BillingDeskContactUs from './BillingDeskContactUs';

// Import the NEW Consultation Bill component
import BillingDeskConsultationBill from './BillingDeskConsultationBill';


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
    : 'BD';
  return {
    sx: { bgcolor: stringToColor(name || 'Default Billing Desk User') },
    children: initials,
  };
}

// --- Navigation items for Billing Desk Dashboard ---
const BILLING_DESK_NAVIGATION = [
  { kind: 'header', title: 'Billing Desk Navigation' },
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'invoicing', title: 'Invoices', icon: <ReceiptLongIcon /> },
  // ADDED 'Consultation Bill' button here
  { segment: 'consultation-bill', title: 'Consultation Bill', icon: <MedicalServicesIcon /> },
  { segment: 'generate-bill', title: 'Generate Bill', icon: <AddCircleOutlineIcon /> },
  { segment: 'patient-accounts', title: 'Patient Accounts', icon: <AccountBalanceWalletIcon /> },
  { segment: 'reports', title: 'Reports', icon: <BarChartIcon /> },
  { segment: 'contact-us', title: 'Contact Us', icon: <ContactMailIcon /> },
];

// --- Custom Material-UI Theme (reused for consistency) ---
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

// --- UpdateProfileDialog Component ---
function UpdateProfileDialog({ user, open, onClose, onSave, isSaving }) {
  const [editableUsername, setEditableUsername] = useState(user.name || '');
  const [editableEmail, setEditableEmail] = useState(user.email || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [saveStatus, setSaveStatus] = useState(null); // 'success', 'error', null
  const [passwordError, setPasswordError] = useState('');

  // Update editable fields when user prop changes or dialog opens
  useEffect(() => {
    setEditableUsername(user.name || '');
    setEditableEmail(user.email || '');
    setNewPassword(''); // Clear password fields on open/user change
    setConfirmNewPassword('');
    setSaveStatus(null);
    setPasswordError('');
  }, [user, open]);

  const handleSaveClick = async () => {
    setSaveStatus(null);
    setPasswordError('');

    // Password validation
    if (newPassword && newPassword !== confirmNewPassword) {
      setPasswordError('New password and confirm password do not match.');
      return;
    }
    if (newPassword && newPassword.length < 6) { // Example: minimum password length
      setPasswordError('Password must be at least 6 characters long.');
      return;
    }

    const result = await onSave(editableUsername, editableEmail, newPassword);

    if (result.success) {
      setSaveStatus('success');
      // Optionally close dialog after a short delay on success
      setTimeout(onClose, 1500);
    } else {
      setSaveStatus('error');
    }
  };

  const isFormUnchanged =
    editableUsername === user.name &&
    editableEmail === user.email &&
    !newPassword; // Form is unchanged if no new password is entered either

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="update-profile-dialog-title">
      <DialogTitle id="update-profile-dialog-title">Update Profile Details</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          User ID: {user.userId} (cannot be changed)
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          size="small"
          value={editableUsername}
          onChange={(e) => setEditableUsername(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          size="small"
          type="email"
          value={editableEmail}
          onChange={(e) => setEditableEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="New Password (optional)"
          variant="outlined"
          fullWidth
          size="small"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Confirm New Password"
          variant="outlined"
          fullWidth
          size="small"
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
          sx={{ mb: 2 }}
        />

        {saveStatus === 'success' && (
          <Alert severity="success" sx={{ mt: 1 }}>Profile updated successfully!</Alert>
        )}
        {saveStatus === 'error' && (
          <Alert severity="error" sx={{ mt: 1 }}>Failed to update profile. Please try again.</Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={isSaving}>
          Cancel
        </Button>
        <Button
          onClick={handleSaveClick}
          color="primary"
          variant="contained"
          disabled={isSaving || isFormUnchanged || !!passwordError}
          startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

UpdateProfileDialog.propTypes = {
  user: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
};

// --- Profile Menu Component ---
function BillingDeskProfileMenu({ user, onLogout, onProfilePicChange, onUpdateProfile, loading }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false); // State for the new dialog

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

  const handleOpenUpdateDialog = () => {
    setOpenUpdateDialog(true);
    handleClose(); // Close the main profile menu when opening the dialog
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
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
            boxShadow: 'rgb(0 0 0 / 0.2) 0px 2px 8px',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, pb: 1, borderBottom: '1px solid #eee' }}>
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

        {/* New: Update Profile button */}
        <MenuItem onClick={handleOpenUpdateDialog}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Update Profile
        </MenuItem>

        <MenuItem sx={{ mt: 1 }}>
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

      {/* The Update Profile Dialog */}
      <UpdateProfileDialog
        user={user}
        open={openUpdateDialog}
        onClose={handleCloseUpdateDialog}
        onSave={onUpdateProfile}
        isSaving={loading}
      />
    </>
  );
}

BillingDeskProfileMenu.propTypes = {
  user: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    profilePic: PropTypes.string,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
  onProfilePicChange: PropTypes.func.isRequired,
  onUpdateProfile: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

// --- Content for the Dashboard Pages (adapted for Billing Desk) ---
function BillingDeskDashboardPageContent({ currentSegment, loading, billingDeskUser }) {
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
    case 'dashboard': return <BillingDeskDashboardOverview billingDeskUser={billingDeskUser} />;
    case 'invoicing': return <BillingDeskInvoicing billingDeskUser={billingDeskUser} />;
    // ADDED a new case for the consultation bill page
    case 'consultation-bill': return <BillingDeskConsultationBill billingDeskUser={billingDeskUser} />;
    case 'generate-bill': return <BillingDashboard billingDeskUser={billingDeskUser} />;
    case 'patient-accounts': return <BillingDeskPatientAccounts billingDeskUser={billingDeskUser} />;
    case 'reports': return <BillingDeskReports billingDeskUser={billingDeskUser} />;
    case 'contact-us':
      return <BillingDeskContactUs billingDeskUser={billingDeskUser} />;
    case 'settings':
      return <BillingDeskSettings billingDeskUser={billingDeskUser} />;
    default:
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: '#fff',
            borderRadius: 2,
            boxShadow:
              '0 1px 3px rgb(0 0 0 / 0.1), 0 1px 2px rgb(0 0 0 / 0.06)',
            p: 3,
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

BillingDeskDashboardPageContent.propTypes = {
  currentSegment: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  billingDeskUser: PropTypes.shape({
    userId: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    profilePic: PropTypes.string,
  }),
};

// --- Navigation Sidebar Component ---
function BillingDeskNavigationMenu({ currentSegment, onNavigate }) {
  return (
    <Box sx={{ width: 240, bgcolor: 'background.paper', height: '100vh', borderRight: 1, borderColor: 'divider' }}>
      <List component="nav" aria-label="billing desk navigation">
        {BILLING_DESK_NAVIGATION.map((item, index) => {
          if (item.kind === 'header') {
            return (
              <Typography key={index} variant="subtitle1" sx={{ mt: 2, mb: 1, px: 2, fontWeight: 'bold' }}>
                {item.title}
              </Typography>
            );
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
      <Divider />
    </Box>
  );
}

BillingDeskNavigationMenu.propTypes = {
  currentSegment: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

// --- Main Billing Desk Dashboard Component ---
export const BillingDeskDashboard = () => {
  const [currentSegment, setCurrentSegment] = useState('dashboard');
  const [billingDeskUser, setBillingDeskUser] = useState({
    userId: '',
    name: '',
    email: '',
    profilePic: '',
    // Add customId and password_hash to state if you need them on the frontend
    // customId: null,
    // password_hash: '', // Store the hash if you need to pass it back
  });
  const [loadingBillingDeskData, setLoadingBillingDeskData] = useState(true);

  useEffect(() => {
    const loadBillingDeskData = async () => {
      setLoadingBillingDeskData(true);

      const storedUserId = sessionStorage.getItem('userId');
      const storedUsername = sessionStorage.getItem('username');
      const storedEmail = sessionStorage.getItem('email');
      const storedProfilePic = sessionStorage.getItem('profilePic');
      // Retrieve other stored fields if needed
      // const storedCustomId = sessionStorage.getItem('customId');
      // const storedPasswordHash = sessionStorage.getItem('password_hash');

      if (storedUserId && storedUsername && storedEmail) {
        const userData = {
          userId: storedUserId,
          name: storedUsername,
          email: storedEmail,
          profilePic: storedProfilePic || 'http://localhost:2004/default-billing.png',
          // customId: storedCustomId ? parseInt(storedCustomId) : null,
          // password_hash: storedPasswordHash || '',
        };
        setBillingDeskUser(userData);
        console.log('Logged-in Billing Desk User Details:', userData);
      } else {
        // Redirect to login if user data is not found
        window.location.href = '/login';
      }
      setLoadingBillingDeskData(false);
    };
    loadBillingDeskData();
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/login';
  };

  const handleProfilePicChange = async (file) => {
    const newPicUrl = URL.createObjectURL(file);
    setBillingDeskUser((prev) => ({ ...prev, profilePic: newPicUrl }));
    console.log('Profile picture changed locally. (Billing Desk)');
    // In a real app, you would upload the file to a server and update the user's profilePic URL in the backend.
  };

  // Function to handle updating user profile details
  const handleUpdateProfile = async (updatedUsername, updatedEmail, newPassword) => {
    setLoadingBillingDeskData(true);
    try {
      const userId = billingDeskUser.userId;
      if (!userId) {
        throw new Error("User ID not found for profile update.");
      }

      // --- STEP 1: Fetch current user data to get all existing fields ---
      let currentUserData = {};
      try {
        const fetchResponse = await fetch(`http://localhost:2009/api/users/${userId}`);
        if (!fetchResponse.ok) {
          const errorText = await fetchResponse.text();
          throw new Error(`Failed to fetch current user data: ${fetchResponse.status} - ${errorText}`);
        }
        currentUserData = await fetchResponse.json();
      } catch (fetchError) {
        console.error("Error fetching current user data before update:", fetchError);
        return { success: false, message: "Could not retrieve existing user data for update. Please ensure the user ID is valid." };
      }

      // --- STEP 2: Prepare the payload for the PUT request ---
      const payload = {
        ...currentUserData, // Start with existing data (e.g., customId, other fields)
        id: userId, // Ensure ID is explicitly set
        username: updatedUsername,
        email: updatedEmail,
        // Conditionally include new password or existing hash
        // IMPORTANT: Backend MUST hash this plain text password
        password_hash: newPassword ? newPassword : currentUserData.password_hash,
        // Include other fields from currentUserData if your backend expects a full object
        // e.g., phone_number: currentUserData.phone_number, role_id: currentUserData.role_id, etc.
      };

      // Remove any fields from payload that should not be sent or are not part of your User entity for update
      delete payload.profilePic; // Assuming profilePic is only frontend display
      delete payload._id; // MongoDB's internal ID, often not needed in the payload for PUT

      console.log("Sending update payload:", payload);

      const response = await fetch(`http://localhost:2009/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if your API requires it (e.g., 'Authorization': `Bearer ${yourAuthToken}`)
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update profile: ${response.status} - ${errorText}`);
      }

      const updatedUserFromApi = await response.json();
      console.log('User profile updated successfully via API:', updatedUserFromApi);

      // Update sessionStorage with new details
      sessionStorage.setItem('username', updatedUserFromApi.username);
      sessionStorage.setItem('email', updatedUserFromApi.email);
      // If password_hash is returned and needed on frontend, update it
      // sessionStorage.setItem('password_hash', updatedUserFromApi.password_hash);

      // Update local state
      setBillingDeskUser(prev => ({
        ...prev,
        name: updatedUserFromApi.username,
        email: updatedUserFromApi.email,
        // Update other fields if they are returned and needed in state
        // password_hash: updatedUserFromApi.password_hash,
      }));

      return { success: true, message: "Profile updated successfully!" };

    } catch (error) {
      console.error('Error updating user profile:', error);
      return { success: false, message: error.message || "An unexpected error occurred." };
    } finally {
      setLoadingBillingDeskData(false);
    }
  };


  const handleNavigationChange = (segment) => {
    const normalizedSegment = segment.startsWith('/') ? segment.slice(1) : segment;
    console.log('Navigating to segment:', normalizedSegment);
    setCurrentSegment(normalizedSegment);
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
          navigation={BILLING_DESK_NAVIGATION}
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
    }}        >
          <DashboardLayout
            sx={{ flex: 1, p: 0, m: 0, height: '100%' }}
            slots={{
              drawerContent: () => (
                <BillingDeskNavigationMenu
                  currentSegment={currentSegment}
                  onNavigate={handleNavigationChange}
                />
              ),
              toolbarAccount: () => (
                <BillingDeskProfileMenu
                  user={billingDeskUser}
                  onLogout={handleLogout}
                  onProfilePicChange={handleProfilePicChange}
                  onUpdateProfile={handleUpdateProfile}
                  loading={loadingBillingDeskData}
                />
              ),
            }}
          >
            <Box sx={{ p: 0, m: 0, height: '100%', width: '100%' }}>
              <BillingDeskDashboardPageContent
                currentSegment={currentSegment}
                loading={loadingBillingDeskData}
                billingDeskUser={billingDeskUser}
              />
            </Box>
          </DashboardLayout>
        </AppProvider>
      </Box>
    </ThemeProvider>
  );
};

BillingDeskDashboard.propTypes = {
};

export default BillingDeskDashboard;
