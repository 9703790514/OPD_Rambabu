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
// //   CircularProgress,
// //   Alert,
// //   Stack,
// //   Grid,
// //   TextField, // Added for input fields
// //   Button,    // Added for action buttons
// //   FormControl, // Added for Select
// //   InputLabel,  // Added for Select
// //   Select,      // Added for Select
// //   MenuItem,    // Added for Select
// //   IconButton,  // Added for remove buttons
// //   List,        // Added for displaying lists
// //   ListItem,    // Added for displaying lists
// //   ListItemText, // Added for displaying lists
// //   Snackbar,    // Added for feedback messages
// //   Divider,     // Added Divider import
// // } from '@mui/material';
// // import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// // import AccessTimeIcon from '@mui/icons-material/AccessTime';
// // import EventNoteIcon from '@mui/icons-material/EventNote';
// // import LocationOnIcon from '@mui/icons-material/LocationOn';
// // import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
// // import PersonIcon from '@mui/icons-material/Person';
// // import WorkIcon from '@mui/icons-material/Work';
// // import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Icon for adding
// // import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'; // Icon for removing
// // import SaveIcon from '@mui/icons-material/Save'; // Icon for saving

// // // Helper function to format Instant (ISO string) to HH:MM (24-hour format)
// // const formatInstantToHHMM = (isoString) => {
// //   if (!isoString) return '';
// //   const date = new Date(isoString);
// //   return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
// // };

// // const DoctorMySchedule = ({ doctorUser }) => {
// //   const [doctorDetails, setDoctorDetails] = useState(null);
// //   const [scheduleData, setScheduleData] = useState([]); // Flattened schedule for display
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // States for schedule management (raw data from backend)
// //   const [doctorAvailabilityId, setDoctorAvailabilityId] = useState(null); // MongoDB _id for the availability document
// //   const [dailyAvailability, setDailyAvailability] = useState([]); // Stores { day: 'MONDAY', slots: [{startTime: Instant, endTime: Instant}], breakSlots: [{startTime: Instant, endTime: Instant}] }
// //   const [leaveDates, setLeaveDates] = useState([]); // Stores ISO date strings for full-day leaves

// //   // States for adding new slots/breaks/leaves
// //   const [selectedDayForSlot, setSelectedDayForSlot] = useState('');
// //   const [newSlotStartTime, setNewSlotStartTime] = useState('');
// //   const [newSlotEndTime, setNewSlotEndTime] = useState('');
// //   const [newBreakStartTime, setNewBreakStartTime] = useState('');
// //   const [newBreakEndTime, setNewBreakEndTime] = useState('');
// //   const [newLeaveDate, setNewLeaveDate] = useState('');

// //   // States for saving feedback
// //   const [savingAvailability, setSavingAvailability] = useState(false);
// //   const [availabilitySaveStatus, setAvailabilitySaveStatus] = useState(null); // 'success', 'error'

// //   // Define days of the week for consistent sorting
// //   const DAYS_OF_WEEK = [
// //     'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'
// //   ];

// //   // Function to fetch both doctor details and schedule data
// //   const fetchData = async () => {
// //     if (!doctorUser || !doctorUser.userId) {
// //       setError("Doctor user ID (custom ID) is not available.");
// //       setLoading(false);
// //       return;
// //     }

// //     setLoading(true);
// //     setError(null);

// //     const doctorCustomId = doctorUser.userId; // This is the custom ID from session storage

// //     try {
// //       // 1. Fetch Doctor Details using customId
// //       const doctorDetailsApiUrl = `http://localhost:2005/api/doctors/customId/${doctorCustomId}`;
// //       console.log("Fetching doctor details from:", doctorDetailsApiUrl);
// //       const doctorDetailsResponse = await fetch(doctorDetailsApiUrl);

// //       if (!doctorDetailsResponse.ok) {
// //         const errorText = await doctorDetailsResponse.text();
// //         throw new Error(`Failed to fetch doctor details: ${doctorDetailsResponse.status} - ${errorText}`);
// //       }
// //       const doctorData = await doctorDetailsResponse.json();
// //       setDoctorDetails(doctorData);
// //       console.log("Doctor details fetched successfully:", doctorData);

// //       // Extract MongoDB _id from the fetched doctor data
// //       const doctorMongoId = doctorData.id; // Assuming the MongoDB _id is mapped to 'id' field in your Doctor entity

// //       if (!doctorMongoId) {
// //         throw new Error("Could not retrieve MongoDB ID for the doctor.");
// //       }

// //       // 2. Fetch Doctor Availability using the MongoDB _id
// //       const doctorAvailabilityApiUrl = `http://localhost:2005/api/doctor-availabilities/byDoctorId/${doctorMongoId}`;
// //       console.log("Fetching schedule data from:", doctorAvailabilityApiUrl);
// //       const doctorAvailabilityResponse = await fetch(doctorAvailabilityApiUrl);

// //       let availabilityData = null;
// //       if (doctorAvailabilityResponse.ok) {
// //         availabilityData = await doctorAvailabilityResponse.json();
// //         setDoctorAvailabilityId(availabilityData.id); // Set the availability document's _id
// //         // Map backend TimeRange objects to a format suitable for internal state
// //         setDailyAvailability(availabilityData.dailySlots ? availabilityData.dailySlots.map(day => ({
// //           day: day.day,
// //           slots: day.slots || [],
// //           breakSlots: day.breakSlots || []
// //         })) : []);
// //         setLeaveDates(availabilityData.leaveDates || []);
// //       } else if (doctorAvailabilityResponse.status === 404) {
// //         // No existing availability, initialize empty
// //         setDoctorAvailabilityId(null);
// //         setDailyAvailability([]);
// //         setLeaveDates([]);
// //         console.log("No existing availability found for this doctor. Starting fresh.");
// //       } else {
// //         const errorText = await doctorAvailabilityResponse.text();
// //         throw new Error(`Failed to fetch schedule data: ${doctorAvailabilityResponse.status} - ${errorText}`);
// //       }

// //       const rawDailySlots = availabilityData ? availabilityData.dailySlots || [] : [];
// //       const rawLeaveDates = availabilityData ? availabilityData.leaveDates || [] : [];

// //       const flattenedSchedule = [];

// //       // Process consultation slots
// //       rawDailySlots.forEach(daySlot => {
// //         if (daySlot.slots && Array.isArray(daySlot.slots)) {
// //           daySlot.slots.forEach(timeRange => { // 'timeRange' is the TimeRange object {startTime: Instant, endTime: Instant}
// //             const formattedStartTime = formatInstantToHHMM(timeRange.startTime);
// //             const formattedEndTime = formatInstantToHHMM(timeRange.endTime);
// //             flattenedSchedule.push({
// //               id: `${daySlot.day}-consultation-${timeRange.startTime}-${timeRange.endTime}`,
// //               day: daySlot.day,
// //               time: `${formattedStartTime} - ${formattedEndTime}`, // Store formatted string
// //               type: 'Consultation',
// //               activity: 'Patient Consultation',
// //               location: 'Clinic Room', // Default location
// //               status: 'Scheduled', // Default status
// //             });
// //           });
// //         }
// //         // Process break slots
// //         if (daySlot.breakSlots && Array.isArray(daySlot.breakSlots)) {
// //           daySlot.breakSlots.forEach(timeRange => { // 'timeRange' is the TimeRange object
// //             const formattedStartTime = formatInstantToHHMM(timeRange.startTime);
// //             const formattedEndTime = formatInstantToHHMM(timeRange.endTime);
// //             flattenedSchedule.push({
// //               id: `${daySlot.day}-break-${timeRange.startTime}-${timeRange.endTime}`,
// //               day: daySlot.day,
// //               time: `${formattedStartTime} - ${formattedEndTime}`, // Store formatted string
// //               type: 'Break',
// //               activity: 'Break Time',
// //               location: 'N/A', // Breaks usually don't have a specific room
// //               status: 'Flexible', // Breaks are typically flexible or planned
// //             });
// //           });
// //         }
// //       });

// //       // Add leave dates as special entries in the schedule
// //       if (rawLeaveDates.length > 0) {
// //         rawLeaveDates.forEach(leaveDate => {
// //           flattenedSchedule.push({
// //             id: `leave-${leaveDate}`,
// //             day: 'Leave', // Or the actual day of the week for the leave date
// //             date: new Date(leaveDate).toLocaleDateString(), // Format date for display
// //             time: 'All Day',
// //             type: 'Leave',
// //             activity: 'Doctor on Leave',
// //             location: 'N/A',
// //             status: 'Cancelled',
// //           });
// //         });
// //       }

// //       // Sort the schedule by day of the week, then by time
// //       flattenedSchedule.sort((a, b) => {
// //         // Handle "Leave" as a special case for sorting, perhaps at the end or beginning
// //         if (a.type === 'Leave' && b.type !== 'Leave') return 1;
// //         if (a.type !== 'Leave' && b.type === 'Leave') return -1;
// //         if (a.type === 'Leave' && b.type === 'Leave') return a.date.localeCompare(b.date);

// //         const dayOrderA = DAYS_OF_WEEK.indexOf(a.day);
// //         const dayOrderB = DAYS_OF_WEEK.indexOf(b.day);

// //         if (dayOrderA !== dayOrderB) {
// //           return dayOrderA - dayOrderB;
// //         }

// //         const timeA = a.time.split(' - ')[0];
// //         const timeB = b.time.split(' - ')[0];
// //         return timeA.localeCompare(timeB);
// //       });

// //       setScheduleData(flattenedSchedule);
// //       console.log("Flattened and sorted schedule data:", flattenedSchedule);

// //     } catch (err) {
// //       console.error("Error fetching data:", err);
// //       setError(err.message || "Failed to load doctor details or schedule.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Fetch data when the component mounts or doctorUser.userId changes
// //   useEffect(() => {
// //     fetchData();
// //   }, [doctorUser.userId]);

// //   const getStatusColor = (status, type) => {
// //     if (type === 'Break') return 'warning';
// //     if (type === 'Leave') return 'error';
// //     switch (status) {
// //       case 'Scheduled': return 'primary';
// //       case 'Completed': return 'success';
// //       case 'Flexible': return 'info';
// //       case 'Cancelled': return 'error';
// //       default: return 'default';
// //     }
// //   };

// //   const getIconForType = (type) => {
// //     switch (type) {
// //       case 'Consultation': return <EventNoteIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />;
// //       case 'Break': return <PauseCircleFilledIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />;
// //       case 'Leave': return <CalendarTodayIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />;
// //       default: return null;
// //     }
// //   };

// //   // --- Schedule Management Functions ---
// //   const createInstantFromTime = (dateString, timeString) => {
// //     if (!dateString || !timeString) return null;
// //     // Assuming dateString is 'YYYY-MM-DD' (e.g., from leaveDates)
// //     // For daily slots, we use a fixed arbitrary date like '1970-01-01'
// //     const baseDate = dateString === 'All Day' ? '1970-01-01' : dateString; // Use a fixed date for time-only slots
// //     return new Date(`${baseDate}T${timeString}:00.000Z`).toISOString(); // Return ISO string
// //   };

// //   const handleAddSlot = () => {
// //     if (!selectedDayForSlot || !newSlotStartTime || !newSlotEndTime) {
// //       setAvailabilitySaveStatus('error');
// //       alert('Please select a day and enter both start and end times for the slot.');
// //       return;
// //     }

// //     // Create TimeRange objects with Instant ISO strings
// //     const newTimeRange = {
// //       startTime: createInstantFromTime('1970-01-01', newSlotStartTime),
// //       endTime: createInstantFromTime('1970-01-01', newSlotEndTime),
// //     };

// //     setDailyAvailability((prevAvailability) => {
// //       const existingDayIndex = prevAvailability.findIndex(
// //         (item) => item.day === selectedDayForSlot
// //       );

// //       if (existingDayIndex !== -1) {
// //         const updatedDailyAvailability = [...prevAvailability];
// //         const existingDay = { ...updatedDailyAvailability[existingDayIndex] };
// //         // Check for duplicate slot based on start and end time
// //         if (!existingDay.slots.some(s => s.startTime === newTimeRange.startTime && s.endTime === newTimeRange.endTime)) {
// //           existingDay.slots = [...existingDay.slots, newTimeRange].sort((a, b) => a.startTime.localeCompare(b.startTime));
// //           updatedDailyAvailability[existingDayIndex] = existingDay;
// //           return updatedDailyAvailability;
// //         }
// //       } else {
// //         return [...prevAvailability, { day: selectedDayForSlot, slots: [newTimeRange], breakSlots: [] }];
// //       }
// //       return prevAvailability;
// //     });

// //     setNewSlotStartTime('');
// //     setNewSlotEndTime('');
// //     setSelectedDayForSlot(''); // Reset day selection after adding
// //     setAvailabilitySaveStatus('success');
// //   };

// //   const handleRemoveSlot = (day, slotToRemove) => {
// //     setDailyAvailability((prevAvailability) =>
// //       prevAvailability
// //         .map((item) =>
// //           item.day === day
// //             ? { ...item, slots: item.slots.filter((slot) => !(slot.startTime === slotToRemove.startTime && slot.endTime === slotToRemove.endTime)) }
// //             : item
// //         )
// //         .filter((item) => item.slots.length > 0 || item.breakSlots.length > 0) // Keep day if it has breaks
// //     );
// //     setAvailabilitySaveStatus('success');
// //   };

// //   const handleAddBreak = () => {
// //     if (!selectedDayForSlot || !newBreakStartTime || !newBreakEndTime) {
// //       setAvailabilitySaveStatus('error');
// //       alert('Please select a day and enter both start and end times for the break.');
// //       return;
// //     }

// //     const newTimeRange = {
// //       startTime: createInstantFromTime('1970-01-01', newBreakStartTime),
// //       endTime: createInstantFromTime('1970-01-01', newBreakEndTime),
// //     };

// //     setDailyAvailability((prevAvailability) => {
// //       const existingDayIndex = prevAvailability.findIndex(
// //         (item) => item.day === selectedDayForSlot
// //       );

// //       if (existingDayIndex !== -1) {
// //         const updatedDailyAvailability = [...prevAvailability];
// //         const existingDay = { ...updatedDailyAvailability[existingDayIndex] };
// //         if (!existingDay.breakSlots.some(b => b.startTime === newTimeRange.startTime && b.endTime === newTimeRange.endTime)) {
// //           existingDay.breakSlots = [...existingDay.breakSlots, newTimeRange].sort((a, b) => a.startTime.localeCompare(b.startTime));
// //           updatedDailyAvailability[existingDayIndex] = existingDay;
// //           return updatedDailyAvailability;
// //         }
// //       } else {
// //         return [...prevAvailability, { day: selectedDayForSlot, slots: [], breakSlots: [newTimeRange] }];
// //       }
// //       return prevAvailability;
// //     });

// //     setNewBreakStartTime('');
// //     setNewBreakEndTime('');
// //     setSelectedDayForSlot('');
// //     setAvailabilitySaveStatus('success');
// //   };

// //   const handleRemoveBreak = (day, breakToRemove) => {
// //     setDailyAvailability((prevAvailability) =>
// //       prevAvailability
// //         .map((item) =>
// //           item.day === day
// //             ? { ...item, breakSlots: item.breakSlots.filter((b) => !(b.startTime === breakToRemove.startTime && b.endTime === breakToRemove.endTime)) }
// //             : item
// //         )
// //         .filter((item) => item.slots.length > 0 || item.breakSlots.length > 0) // Keep day if it has slots
// //     );
// //     setAvailabilitySaveStatus('success');
// //   };

// //   const handleAddLeaveDate = () => {
// //     if (!newLeaveDate) {
// //       setAvailabilitySaveStatus('error');
// //       alert('Please select a date for leave.');
// //       return;
// //     }
// //     // Convert newLeaveDate (YYYY-MM-DD) to ISO string for backend (Instant)
// //     const leaveInstant = new Date(`${newLeaveDate}T00:00:00.000Z`).toISOString();

// //     if (leaveDates.includes(leaveInstant)) {
// //       setAvailabilitySaveStatus('error');
// //       alert('This leave date already exists.');
// //       return;
// //     }
// //     setLeaveDates((prevDates) => [...prevDates, leaveInstant].sort());
// //     setNewLeaveDate('');
// //     setAvailabilitySaveStatus('success');
// //   };

// //   const handleRemoveLeaveDate = (dateToRemove) => {
// //     setLeaveDates((prevDates) => prevDates.filter((date) => date !== dateToRemove));
// //     setAvailabilitySaveStatus('success');
// //   };

// //   const handleSaveAvailability = async () => {
// //     setSavingAvailability(true);
// //     setAvailabilitySaveStatus(null);

// //     const payload = {
// //       doctorId: doctorDetails.id, // Use MongoDB _id for DoctorAvailability
// //       dailySlots: dailyAvailability,
// //       leaveDates: leaveDates,
// //     };

// //     console.log('Attempting to save doctor availability:', payload);

// //     try {
// //       let response;
// //       if (doctorAvailabilityId) {
// //         // Update existing availability
// //         response = await fetch(`http://localhost:2005/api/doctor-availabilities/${doctorAvailabilityId}`, {
// //           method: 'PUT',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify(payload),
// //         });
// //       } else {
// //         // Create new availability
// //         response = await fetch('http://localhost:2005/api/doctor-availabilities', {
// //           method: 'POST',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify(payload),
// //         });
// //       }

// //       if (!response.ok) {
// //         const errorText = await response.text();
// //         throw new Error(`Failed to save availability: ${response.status} - ${errorText}`);
// //       }

// //       const result = await response.json();
// //       setDoctorAvailabilityId(result.id); // Update with new ID if created
// //       setAvailabilitySaveStatus('success');
// //       console.log('Doctor availability saved successfully:', result);
// //       // Re-fetch data to update the displayed schedule table
// //       fetchData();

// //     } catch (err) {
// //       console.error('Error saving availability:', err);
// //       setAvailabilitySaveStatus('error');
// //       // Using alert for critical errors, Snackbar for minor feedback
// //       alert(`Error saving availability: ${err.message}`);
// //     } finally {
// //       setSavingAvailability(false);
// //     }
// //   };

// //   const handleCloseSnackbar = (event, reason) => {
// //     if (reason === 'clickaway') return;
// //     setAvailabilitySaveStatus(null);
// //   };
// //   // --- End Schedule Management Functions ---

// //   return (
// //     <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', width: '100%' }}>
// //       <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.dark' }}>
// //         My Schedule
// //       </Typography>

// //       {loading && (
// //         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', flexDirection: 'column' }}>
// //           <CircularProgress sx={{ mb: 2 }} />
// //           <Typography variant="h6">Loading Doctor Data...</Typography>
// //         </Box>
// //       )}

// //       {error && (
// //         <Alert severity="error" sx={{ mb: 3 }}>
// //           {error}
// //         </Alert>
// //       )}

// //       {!loading && !error && (
// //         <>
// //           {doctorDetails && (
// //             <Paper elevation={4} sx={{ p: { xs: 2, md: 3 }, mb: 4, borderRadius: 3, background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
// //               <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.dark' }}>
// //                 Doctor Details
// //               </Typography>
// //               <Grid container spacing={2}>
// //                 <Grid item xs={12} sm={6}>
// //                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //                     <PersonIcon color="primary" sx={{ mr: 1 }} />
// //                     <Typography variant="body1">
// //                       **Name:** {doctorDetails.firstName} {doctorDetails.lastName}
// //                     </Typography>
// //                   </Box>
// //                 </Grid>
// //                 <Grid item xs={12} sm={6}>
// //                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //                     <WorkIcon color="primary" sx={{ mr: 1 }} />
// //                     <Typography variant="body1">
// //                       **Specialization:** {doctorDetails.specialization}
// //                     </Typography>
// //                   </Box>
// //                 </Grid>
// //                 <Grid item xs={12} sm={6}>
// //                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //                     <Typography variant="body1">
// //                       **Custom ID:** {doctorDetails.customId || 'N/A'}
// //                     </Typography>
// //                   </Box>
// //                 </Grid>
// //                 <Grid item xs={12} sm={6}>
// //                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //                     <Typography variant="body1">
// //                       **Email:** {doctorDetails.email || 'N/A'}
// //                     </Typography>
// //                   </Box>
// //                 </Grid>
// //                 <Grid item xs={12} sm={6}>
// //                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //                     <Typography variant="body1">
// //                       **Contact:** {doctorDetails.contactNumber || 'N/A'}
// //                     </Typography>
// //                   </Box>
// //                 </Grid>
// //               </Grid>
// //             </Paper>
// //           )}

// //           {/* --- Manage Doctor Availability Section --- */}
// //           <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, mb: 4, borderRadius: 3, background: 'linear-gradient(145deg, #ffffff, #f0f2f5)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
// //             <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
// //               Manage My Availability
// //             </Typography>

// //             <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2, bgcolor: '#f5f7fa' }}>
// //               <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
// //                 Daily Consultation Slots
// //               </Typography>
// //               <Grid container spacing={2} alignItems="center">
// //                 <Grid item xs={12} sm={4}>
// //                   <FormControl fullWidth size="small">
// //                     <InputLabel id="day-select-label">Day of Week</InputLabel>
// //                     <Select
// //                       labelId="day-select-label"
// //                       id="day-select"
// //                       value={selectedDayForSlot}
// //                       label="Day of Week"
// //                       onChange={(e) => setSelectedDayForSlot(e.target.value)}
// //                     >
// //                       <MenuItem value=""><em>Select Day</em></MenuItem>
// //                       {DAYS_OF_WEEK.map((day) => (
// //                         <MenuItem key={day} value={day}>{day}</MenuItem>
// //                       ))}
// //                     </Select>
// //                   </FormControl>
// //                 </Grid>
// //                 <Grid item xs={6} sm={3}>
// //                   <TextField
// //                     label="Start Time"
// //                     type="time"
// //                     fullWidth
// //                     size="small"
// //                     value={newSlotStartTime}
// //                     onChange={(e) => setNewSlotStartTime(e.target.value)}
// //                     InputLabelProps={{ shrink: true }}
// //                   />
// //                 </Grid>
// //                 <Grid item xs={6} sm={3}>
// //                   <TextField
// //                     label="End Time"
// //                     type="time"
// //                     fullWidth
// //                     size="small"
// //                     value={newSlotEndTime}
// //                     onChange={(e) => setNewSlotEndTime(e.target.value)}
// //                     InputLabelProps={{ shrink: true }}
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12} sm={2}>
// //                   <Button
// //                     variant="contained"
// //                     color="primary"
// //                     startIcon={<AddCircleOutlineIcon />}
// //                     onClick={handleAddSlot}
// //                     fullWidth
// //                     size="small"
// //                   >
// //                     Add Slot
// //                   </Button>
// //                 </Grid>
// //               </Grid>

// //               <List sx={{ mt: 2 }}>
// //                 {dailyAvailability.length === 0 ? (
// //                   <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
// //                     No daily slots set.
// //                   </Typography>
// //                 ) : (
// //                   dailyAvailability.map((dayData) => (
// //                     <Box key={dayData.day} sx={{ mb: 1, borderBottom: '1px dashed #e0e0e0', pb: 1 }}>
// //                       <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 0.5, color: 'primary.dark' }}>
// //                         {dayData.day}:
// //                       </Typography>
// //                       <Stack direction="row" flexWrap="wrap" spacing={1}>
// //                         {dayData.slots.map((slot, index) => (
// //                           <Chip
// //                             key={`${dayData.day}-slot-${index}`} // Use index as part of key for uniqueness
// //                             label={`${formatInstantToHHMM(slot.startTime)} - ${formatInstantToHHMM(slot.endTime)}`}
// //                             onDelete={() => handleRemoveSlot(dayData.day, slot)}
// //                             deleteIcon={<RemoveCircleOutlineIcon />}
// //                             color="info"
// //                             variant="outlined"
// //                             size="small"
// //                             sx={{ mb: 1 }}
// //                           />
// //                         ))}
// //                       </Stack>
// //                       {dayData.breakSlots && dayData.breakSlots.length > 0 && (
// //                         <Box sx={{ mt: 1 }}>
// //                           <Typography variant="caption" color="text.secondary" display="block">Breaks:</Typography>
// //                           <Stack direction="row" flexWrap="wrap" spacing={1}>
// //                             {dayData.breakSlots.map((bSlot, index) => (
// //                               <Chip
// //                                 key={`${dayData.day}-break-${index}`} // Use index as part of key for uniqueness
// //                                 label={`${formatInstantToHHMM(bSlot.startTime)} - ${formatInstantToHHMM(bSlot.endTime)}`}
// //                                 onDelete={() => handleRemoveBreak(dayData.day, bSlot)}
// //                                 deleteIcon={<RemoveCircleOutlineIcon />}
// //                                 color="warning"
// //                                 variant="outlined"
// //                                 size="small"
// //                                 sx={{ mb: 1 }}
// //                               />
// //                             ))}
// //                           </Stack>
// //                         </Box>
// //                       )}
// //                     </Box>
// //                   ))
// //                 )}
// //               </List>

// //               <Divider sx={{ my: 3 }} />
// //               <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
// //                 Add Daily Break Times
// //               </Typography>
// //               <Grid container spacing={2} alignItems="center">
// //                 <Grid item xs={12} sm={4}>
// //                   <FormControl fullWidth size="small">
// //                     <InputLabel id="day-select-break-label">Day of Week (for Break)</InputLabel>
// //                     <Select
// //                       labelId="day-select-break-label"
// //                       id="day-select-break"
// //                       value={selectedDayForSlot}
// //                       label="Day of Week (for Break)"
// //                       onChange={(e) => setSelectedDayForSlot(e.target.value)}
// //                     >
// //                       <MenuItem value=""><em>Select Day</em></MenuItem>
// //                       {DAYS_OF_WEEK.map((day) => (
// //                         <MenuItem key={day} value={day}>{day}</MenuItem>
// //                       ))}
// //                     </Select>
// //                   </FormControl>
// //                 </Grid>
// //                 <Grid item xs={6} sm={3}>
// //                   <TextField
// //                     label="Break Start Time"
// //                     type="time"
// //                     fullWidth
// //                     size="small"
// //                     value={newBreakStartTime}
// //                     onChange={(e) => setNewBreakStartTime(e.target.value)}
// //                     InputLabelProps={{ shrink: true }}
// //                   />
// //                 </Grid>
// //                 <Grid item xs={6} sm={3}>
// //                   <TextField
// //                     label="Break End Time"
// //                     type="time"
// //                     fullWidth
// //                     size="small"
// //                     value={newBreakEndTime}
// //                     onChange={(e) => setNewBreakEndTime(e.target.value)}
// //                     InputLabelProps={{ shrink: true }}
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12} sm={2}>
// //                   <Button
// //                     variant="contained"
// //                     color="warning"
// //                     startIcon={<AddCircleOutlineIcon />}
// //                     onClick={handleAddBreak}
// //                     fullWidth
// //                     size="small"
// //                   >
// //                     Add Break
// //                   </Button>
// //                 </Grid>
// //               </Grid>
// //             </Paper>

// //             <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2, bgcolor: '#f5f7fa' }}>
// //               <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
// //                 Doctor Leave Dates
// //               </Typography>
// //               <Grid container spacing={2} alignItems="center">
// //                 <Grid item xs={12} sm={8}>
// //                   <TextField
// //                     label="Leave Date"
// //                     type="date"
// //                     fullWidth
// //                     size="small"
// //                     value={newLeaveDate}
// //                     onChange={(e) => setNewLeaveDate(e.target.value)}
// //                     InputLabelProps={{ shrink: true }}
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12} sm={4}>
// //                   <Button
// //                     variant="contained"
// //                     color="primary"
// //                     startIcon={<AddCircleOutlineIcon />}
// //                     onClick={handleAddLeaveDate}
// //                     fullWidth
// //                     size="small"
// //                   >
// //                     Add Leave
// //                   </Button>
// //                 </Grid>
// //               </Grid>

// //               <List sx={{ mt: 2 }}>
// //                 {leaveDates.length === 0 ? (
// //                   <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
// //                     No leave dates set.
// //                   </Typography>
// //                 ) : (
// //                   leaveDates.map((date, index) => (
// //                     <ListItem
// //                       key={date + index} // Use index as part of key for uniqueness
// //                       secondaryAction={
// //                         <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveLeaveDate(date)}>
// //                           <RemoveCircleOutlineIcon color="error" />
// //                         </IconButton>
// //                       }
// //                       sx={{ borderBottom: '1px dashed #e0e0e0', mb: 1 }}
// //                     >
// //                       <ListItemText primary={new Date(date).toLocaleDateString()} />
// //                     </ListItem>
// //                   ))
// //                 )}
// //               </List>
// //             </Paper>

// //             <Button
// //               variant="contained"
// //               color="secondary"
// //               startIcon={savingAvailability ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
// //               onClick={handleSaveAvailability}
// //               disabled={savingAvailability || !doctorDetails || !doctorDetails.id}
// //               fullWidth
// //               sx={{ py: 1.5, fontSize: '1.1rem', fontWeight: 'bold' }}
// //             >
// //               {savingAvailability ? 'Saving Availability...' : 'Save My Availability'}
// //             </Button>
// //           </Paper>
// //           {/* --- End Manage Doctor Availability Section --- */}


// //           {scheduleData.length === 0 ? (
// //             <Alert severity="info" sx={{ mb: 3 }}>
// //               No schedule entries found for this doctor.
// //             </Alert>
// //           ) : (
// //             <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, background: 'linear-gradient(145deg, #ffffff, #f0f2f5)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
// //               <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
// //                 Upcoming Activities
// //               </Typography>

// //               <TableContainer>
// //                 <Table sx={{ minWidth: 650 }} aria-label="doctor schedule table">
// //                   <TableHead>
// //                     <TableRow sx={{ bgcolor: '#e3f2fd' }}>
// //                       <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Day/Date</TableCell>
// //                       <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Time</TableCell>
// //                       <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Type</TableCell>
// //                       <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Activity</TableCell>
// //                       <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Location</TableCell>
// //                       <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Status</TableCell>
// //                     </TableRow>
// //                   </TableHead>
// //                   <TableBody>
// //                     {scheduleData.map((row) => (
// //                       <TableRow
// //                         key={row.id}
// //                         sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}
// //                       >
// //                         <TableCell component="th" scope="row">
// //                           {row.type === 'Leave' ? (
// //                             <>
// //                               <CalendarTodayIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
// //                               {row.date || 'N/A'}
// //                             </>
// //                           ) : (
// //                             <>
// //                               <CalendarTodayIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
// //                               {row.day || 'N/A'}
// //                             </>
// //                           )}
// //                         </TableCell>
// //                         <TableCell><AccessTimeIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />{row.time || 'N/A'}</TableCell>
// //                         <TableCell>
// //                           <Chip
// //                             label={row.type || 'N/A'}
// //                             color={row.type === 'Break' ? 'warning' : (row.type === 'Leave' ? 'error' : 'primary')}
// //                             size="small"
// //                             icon={getIconForType(row.type)}
// //                           />
// //                         </TableCell>
// //                         <TableCell>{row.activity || 'N/A'}</TableCell>
// //                         <TableCell><LocationOnIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />{row.location || 'N/A'}</TableCell>
// //                         <TableCell>
// //                           <Chip label={row.status || 'Unknown'} color={getStatusColor(row.status, row.type)} size="small" />
// //                         </TableCell>
// //                       </TableRow>
// //                     ))}
// //                   </TableBody>
// //                 </Table>
// //               </TableContainer>
// //             </Paper>
// //           )}
// //         </>
// //       )}

// //       <Box sx={{ mt: 6, opacity: 0.7, textAlign: 'center' }}>
// //         <Typography variant="body2" color="text.secondary">
// //           View and manage your personal work schedule and availability.
// //         </Typography>
// //       </Box>

// //       {/* Snackbar for submission feedback */}
// //       <Snackbar
// //         open={Boolean(availabilitySaveStatus)}
// //         autoHideDuration={6000}
// //         onClose={handleCloseSnackbar}
// //         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
// //       >
// //         <Alert
// //           onClose={handleCloseSnackbar}
// //           severity={availabilitySaveStatus === 'success' ? 'success' : 'error'}
// //           variant="filled"
// //           sx={{ borderRadius: 3 }}
// //         >
// //           {availabilitySaveStatus === 'success' ? 'Availability saved successfully!' :
// //            `Error saving availability: ${error || 'Please check console for details.'}`}
// //         </Alert>
// //       </Snackbar>
// //     </Box>
// //   );
// // };

// // DoctorMySchedule.propTypes = {
// //   doctorUser: PropTypes.shape({
// //     userId: PropTypes.string, // This is now expected to be the customId
// //     name: PropTypes.string,
// //     email: PropTypes.string,
// //     profilePic: PropTypes.string,
// //   }),
// // };

// // export default DoctorMySchedule;
// // // import React, { useState, useEffect } from 'react';
// // // import PropTypes from 'prop-types';
// // // import {
// // //   Box,
// // //   Typography,
// // //   Paper,
// // //   Table,
// // //   TableBody,
// // //   TableCell,
// // //   TableContainer,
// // //   TableHead,
// // //   TableRow,
// // //   Chip,
// // //   CircularProgress,
// // //   Alert,
// // //   Stack,
// // //   Grid,
// // //   TextField,
// // //   Button,
// // //   FormControl,
// // //   InputLabel,
// // //   Select,
// // //   MenuItem,
// // //   IconButton,
// // //   List,
// // //   ListItem,
// // //   ListItemText,
// // //   Snackbar,
// // //   Divider,
// // //   Avatar,
// // //   Card,
// // //   CardContent,
// // //   CardHeader,
// // //   Tooltip,
// // //   Fade,
// // //   useTheme,
// // // } from '@mui/material';
// // // import {
// // //   CalendarToday as CalendarTodayIcon,
// // //   AccessTime as AccessTimeIcon,
// // //   EventNote as EventNoteIcon,
// // //   LocationOn as LocationOnIcon,
// // //   PauseCircleFilled as PauseCircleFilledIcon,
// // //   Person as PersonIcon,
// // //   Work as WorkIcon,
// // //   AddCircleOutline as AddCircleOutlineIcon,
// // //   RemoveCircleOutline as RemoveCircleOutlineIcon,
// // //   Save as SaveIcon,
// // //   Email as EmailIcon,
// // //   Phone as PhoneIcon,
// // //   MedicalServices as MedicalServicesIcon,
// // // } from '@mui/icons-material';

// // // // Helper function to format Instant (ISO string) to HH:MM (24-hour format)
// // // const formatInstantToHHMM = (isoString) => {
// // //   if (!isoString) return '';
// // //   const date = new Date(isoString);
// // //   return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
// // // };

// // // const DoctorMySchedule = ({ doctorUser }) => {
// // //   const theme = useTheme();
// // //   const [doctorDetails, setDoctorDetails] = useState(null);
// // //   const [scheduleData, setScheduleData] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   // States for schedule management
// // //   const [doctorAvailabilityId, setDoctorAvailabilityId] = useState(null);
// // //   const [dailyAvailability, setDailyAvailability] = useState([]);
// // //   const [leaveDates, setLeaveDates] = useState([]);

// // //   // States for adding new slots/breaks/leaves
// // //   const [selectedDayForSlot, setSelectedDayForSlot] = useState('');
// // //   const [newSlotStartTime, setNewSlotStartTime] = useState('');
// // //   const [newSlotEndTime, setNewSlotEndTime] = useState('');
// // //   const [newBreakStartTime, setNewBreakStartTime] = useState('');
// // //   const [newBreakEndTime, setNewBreakEndTime] = useState('');
// // //   const [newLeaveDate, setNewLeaveDate] = useState('');

// // //   // States for saving feedback
// // //   const [savingAvailability, setSavingAvailability] = useState(false);
// // //   const [availabilitySaveStatus, setAvailabilitySaveStatus] = useState(null);

// // //   // Define days of the week for consistent sorting
// // //   const DAYS_OF_WEEK = [
// // //     'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'
// // //   ];

// // //   // ... [keep all your existing functions like fetchData, handleAddSlot, etc. exactly the same]

// // //   const getStatusColor = (status, type) => {
// // //     if (type === 'Break') return 'warning';
// // //     if (type === 'Leave') return 'error';
// // //     switch (status) {
// // //       case 'Scheduled': return 'primary';
// // //       case 'Completed': return 'success';
// // //       case 'Flexible': return 'info';
// // //       case 'Cancelled': return 'error';
// // //       default: return 'default';
// // //     }
// // //   };

// // //   const getIconForType = (type) => {
// // //     switch (type) {
// // //       case 'Consultation': return <EventNoteIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />;
// // //       case 'Break': return <PauseCircleFilledIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />;
// // //       case 'Leave': return <CalendarTodayIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />;
// // //       default: return null;
// // //     }
// // //   };



// // //   return (
// // //     <Box sx={{ 
// // //       p: { xs: 2, md: 4 }, 
// // //       maxWidth: 1400, 
// // //       mx: 'auto', 
// // //       width: '100%',
// // //       background: theme.palette.mode === 'light' ? '#f5f7fa' : theme.palette.background.default,
// // //       minHeight: '100vh'
// // //     }}>
// // //       <Typography 
// // //         variant="h4" 
// // //         gutterBottom 
// // //         align="center" 
// // //         sx={{ 
// // //           mb: 4, 
// // //           fontWeight: 'bold', 
// // //           color: 'primary.main',
// // //           textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
// // //           position: 'relative',
// // //           '&:after': {
// // //             content: '""',
// // //             display: 'block',
// // //             width: '80px',
// // //             height: '4px',
// // //             background: theme.palette.primary.main,
// // //             margin: '16px auto 0',
// // //             borderRadius: '2px'
// // //           }
// // //         }}
// // //       >
// // //         My Schedule
// // //       </Typography>

// // //       {loading && (
// // //         <Box sx={{ 
// // //           display: 'flex', 
// // //           justifyContent: 'center', 
// // //           alignItems: 'center', 
// // //           height: '300px', 
// // //           flexDirection: 'column',
// // //           background: 'rgba(255,255,255,0.8)',
// // //           borderRadius: 4,
// // //           boxShadow: theme.shadows[2]
// // //         }}>
// // //           <CircularProgress size={60} thickness={4} sx={{ mb: 3, color: 'primary.main' }} />
// // //           <Typography variant="h6" color="text.secondary">
// // //             Loading Doctor Data...
// // //           </Typography>
// // //         </Box>
// // //       )}

// // //       {error && (
// // //         <Alert 
// // //           severity="error" 
// // //           sx={{ 
// // //             mb: 3,
// // //             borderRadius: 2,
// // //             boxShadow: theme.shadows[1]
// // //           }}
// // //         >
// // //           {error}
// // //         </Alert>
// // //       )}

// // //       {!loading && !error && (
// // //         <>
// // //           {doctorDetails && (
// // //             <Card 
// // //               elevation={4} 
// // //               sx={{ 
// // //                 mb: 4, 
// // //                 borderRadius: 3,
// // //                 background: theme.palette.mode === 'light' 
// // //                   ? 'linear-gradient(135deg, #e3f2fd, #bbdefb)' 
// // //                   : theme.palette.background.paper,
// // //                 boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
// // //                 borderLeft: `4px solid ${theme.palette.primary.main}`
// // //               }}
// // //             >
// // //               <CardHeader
// // //                 avatar={
// // //                   <Avatar 
// // //                     src={doctorUser.profilePic} 
// // //                     sx={{ 
// // //                       width: 60, 
// // //                       height: 60,
// // //                       boxShadow: theme.shadows[3]
// // //                     }}
// // //                   >
// // //                     {doctorDetails.firstName.charAt(0)}{doctorDetails.lastName.charAt(0)}
// // //                   </Avatar>
// // //                 }
// // //                 title={
// // //                   <Typography variant="h5" component="div">
// // //                     Dr. {doctorDetails.firstName} {doctorDetails.lastName}
// // //                   </Typography>
// // //                 }
// // //                 subheader={
// // //                   <Typography variant="body2" color="text.secondary">
// // //                     {doctorDetails.specialization}
// // //                   </Typography>
// // //                 }
// // //                 sx={{
// // //                   pb: 0,
// // //                   '& .MuiCardHeader-content': {
// // //                     overflow: 'hidden'
// // //                   }
// // //                 }}
// // //               />
// // //               <CardContent>
// // //                 <Grid container spacing={2}>
// // //                   <Grid item xs={12} sm={6} md={3}>
// // //                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// // //                       <MedicalServicesIcon color="primary" sx={{ mr: 1.5, fontSize: '1.2rem' }} />
// // //                       <Typography variant="body1">
// // //                         <strong>ID:</strong> {doctorDetails.customId || 'N/A'}
// // //                       </Typography>
// // //                     </Box>
// // //                   </Grid>
// // //                   <Grid item xs={12} sm={6} md={3}>
// // //                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// // //                       <EmailIcon color="primary" sx={{ mr: 1.5, fontSize: '1.2rem' }} />
// // //                       <Typography variant="body1">
// // //                         <strong>Email:</strong> {doctorDetails.email || 'N/A'}
// // //                       </Typography>
// // //                     </Box>
// // //                   </Grid>
// // //                   <Grid item xs={12} sm={6} md={3}>
// // //                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// // //                       <PhoneIcon color="primary" sx={{ mr: 1.5, fontSize: '1.2rem' }} />
// // //                       <Typography variant="body1">
// // //                         <strong>Contact:</strong> {doctorDetails.contactNumber || 'N/A'}
// // //                       </Typography>
// // //                     </Box>
// // //                   </Grid>
// // //                 </Grid>
// // //               </CardContent>
// // //             </Card>
// // //           )}

// // //           {/* --- Manage Doctor Availability Section --- */}
// // //           <Fade in={!loading} timeout={800}>
// // //             <Card 
// // //               elevation={6} 
// // //               sx={{ 
// // //                 mb: 4, 
// // //                 borderRadius: 3, 
// // //                 background: theme.palette.mode === 'light' 
// // //                   ? 'linear-gradient(145deg, #ffffff, #f8fafc)' 
// // //                   : theme.palette.background.paper,
// // //                 boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
// // //                 border: theme.palette.mode === 'light' ? '1px solid #e0e0e0' : '1px solid #333'
// // //               }}
// // //             >
// // //               <CardContent>
// // //                 <Typography 
// // //                   variant="h5" 
// // //                   gutterBottom 
// // //                   sx={{ 
// // //                     fontWeight: 'bold', 
// // //                     color: 'primary.main', 
// // //                     mb: 3,
// // //                     display: 'flex',
// // //                     alignItems: 'center'
// // //                   }}
// // //                 >
// // //                   <EventNoteIcon sx={{ mr: 1.5, fontSize: '1.8rem' }} />
// // //                   Manage My Availability
// // //                 </Typography>

// // //                 <Card 
// // //                   elevation={0} 
// // //                   sx={{ 
// // //                     p: 3, 
// // //                     mb: 3, 
// // //                     borderRadius: 2, 
// // //                     bgcolor: theme.palette.mode === 'light' ? '#f8fafc' : '#1e1e1e',
// // //                     border: theme.palette.mode === 'light' ? '1px solid #e0e0e0' : '1px solid #333'
// // //                   }}
// // //                 >
// // //                   <Typography 
// // //                     variant="h6" 
// // //                     gutterBottom 
// // //                     sx={{ 
// // //                       fontWeight: 'bold', 
// // //                       color: 'text.primary',
// // //                       display: 'flex',
// // //                       alignItems: 'center'
// // //                     }}
// // //                   >
// // //                     <AccessTimeIcon sx={{ mr: 1, color: 'info.main' }} />
// // //                     Daily Consultation Slots
// // //                   </Typography>
// // //                   <Grid container spacing={2} alignItems="center">
// // //                     <Grid item xs={12} sm={4}>
// // //                       <FormControl fullWidth size="small">
// // //                         <InputLabel id="day-select-label">Day of Week</InputLabel>
// // //                         <Select
// // //                           labelId="day-select-label"
// // //                           id="day-select"
// // //                           value={selectedDayForSlot}
// // //                           label="Day of Week"
// // //                           onChange={(e) => setSelectedDayForSlot(e.target.value)}
// // //                           sx={{ background: theme.palette.background.paper }}
// // //                         >
// // //                           <MenuItem value=""><em>Select Day</em></MenuItem>
// // //                           {DAYS_OF_WEEK.map((day) => (
// // //                             <MenuItem key={day} value={day}>{day}</MenuItem>
// // //                           ))}
// // //                         </Select>
// // //                       </FormControl>
// // //                     </Grid>
// // //                     <Grid item xs={6} sm={3}>
// // //                       <Tooltip title="Start time for consultation slot">
// // //                         <TextField
// // //                           label="Start Time"
// // //                           type="time"
// // //                           fullWidth
// // //                           size="small"
// // //                           value={newSlotStartTime}
// // //                           onChange={(e) => setNewSlotStartTime(e.target.value)}
// // //                           InputLabelProps={{ shrink: true }}
// // //                           sx={{ background: theme.palette.background.paper }}
// // //                         />
// // //                       </Tooltip>
// // //                     </Grid>
// // //                     <Grid item xs={6} sm={3}>
// // //                       <Tooltip title="End time for consultation slot">
// // //                         <TextField
// // //                           label="End Time"
// // //                           type="time"
// // //                           fullWidth
// // //                           size="small"
// // //                           value={newSlotEndTime}
// // //                           onChange={(e) => setNewSlotEndTime(e.target.value)}
// // //                           InputLabelProps={{ shrink: true }}
// // //                           sx={{ background: theme.palette.background.paper }}
// // //                         />
// // //                       </Tooltip>
// // //                     </Grid>
// // //                     <Grid item xs={12} sm={2}>
// // //                       <Button
// // //                         variant="contained"
// // //                         color="primary"
// // //                         startIcon={<AddCircleOutlineIcon />}
// // //                         onClick={handleAddSlot}
// // //                         fullWidth
// // //                         size="small"
// // //                         sx={{
// // //                           height: '40px',
// // //                           boxShadow: theme.shadows[1],
// // //                           '&:hover': {
// // //                             boxShadow: theme.shadows[3]
// // //                           }
// // //                         }}
// // //                       >
// // //                         Add Slot
// // //                       </Button>
// // //                     </Grid>
// // //                   </Grid>

// // //                   <List sx={{ mt: 2 }}>
// // //                     {dailyAvailability.length === 0 ? (
// // //                       <Typography 
// // //                         variant="body2" 
// // //                         color="text.secondary" 
// // //                         sx={{ 
// // //                           textAlign: 'center', 
// // //                           py: 2,
// // //                           fontStyle: 'italic'
// // //                         }}
// // //                       >
// // //                         No daily slots set. Add your consultation hours above.
// // //                       </Typography>
// // //                     ) : (
// // //                       dailyAvailability.map((dayData) => (
// // //                         <Box 
// // //                           key={dayData.day} 
// // //                           sx={{ 
// // //                             mb: 1, 
// // //                             borderBottom: `1px dashed ${theme.palette.divider}`, 
// // //                             pb: 1 
// // //                           }}
// // //                         >
// // //                           <Typography 
// // //                             variant="subtitle2" 
// // //                             fontWeight="bold" 
// // //                             sx={{ 
// // //                               mb: 0.5, 
// // //                               color: 'primary.dark',
// // //                               display: 'flex',
// // //                               alignItems: 'center'
// // //                             }}
// // //                           >
// // //                             <CalendarTodayIcon sx={{ mr: 0.5, fontSize: '1rem' }} />
// // //                             {dayData.day}:
// // //                           </Typography>
// // //                           <Stack direction="row" flexWrap="wrap" spacing={1} sx={{ mt: 1 }}>
// // //                             {dayData.slots.map((slot, index) => (
// // //                               <Tooltip 
// // //                                 key={`${dayData.day}-slot-${index}`}
// // //                                 title={`Consultation hours on ${dayData.day}`}
// // //                                 arrow
// // //                               >
// // //                                 <Chip
// // //                                   label={`${formatInstantToHHMM(slot.startTime)} - ${formatInstantToHHMM(slot.endTime)}`}
// // //                                   onDelete={() => handleRemoveSlot(dayData.day, slot)}
// // //                                   deleteIcon={<RemoveCircleOutlineIcon />}
// // //                                   color="info"
// // //                                   variant="outlined"
// // //                                   size="small"
// // //                                   sx={{ 
// // //                                     mb: 1,
// // //                                     '& .MuiChip-deleteIcon': {
// // //                                       color: theme.palette.error.main
// // //                                     }
// // //                                   }}
// // //                                 />
// // //                               </Tooltip>
// // //                             ))}
// // //                           </Stack>
// // //                           {dayData.breakSlots && dayData.breakSlots.length > 0 && (
// // //                             <Box sx={{ mt: 1 }}>
// // //                               <Typography 
// // //                                 variant="caption" 
// // //                                 color="text.secondary" 
// // //                                 display="block"
// // //                                 sx={{ display: 'flex', alignItems: 'center' }}
// // //                               >
// // //                                 <PauseCircleFilledIcon sx={{ fontSize: '0.9rem', mr: 0.5 }} />
// // //                                 Breaks:
// // //                               </Typography>
// // //                               <Stack direction="row" flexWrap="wrap" spacing={1} sx={{ mt: 0.5 }}>
// // //                                 {dayData.breakSlots.map((bSlot, index) => (
// // //                                   <Tooltip 
// // //                                     key={`${dayData.day}-break-${index}`}
// // //                                     title={`Break time on ${dayData.day}`}
// // //                                     arrow
// // //                                   >
// // //                                     <Chip
// // //                                       label={`${formatInstantToHHMM(bSlot.startTime)} - ${formatInstantToHHMM(bSlot.endTime)}`}
// // //                                       onDelete={() => handleRemoveBreak(dayData.day, bSlot)}
// // //                                       deleteIcon={<RemoveCircleOutlineIcon />}
// // //                                       color="warning"
// // //                                       variant="outlined"
// // //                                       size="small"
// // //                                       sx={{ 
// // //                                         mb: 1,
// // //                                         '& .MuiChip-deleteIcon': {
// // //                                           color: theme.palette.error.main
// // //                                         }
// // //                                       }}
// // //                                     />
// // //                                   </Tooltip>
// // //                                 ))}
// // //                               </Stack>
// // //                             </Box>
// // //                           )}
// // //                         </Box>
// // //                       ))
// // //                     )}
// // //                   </List>

// // //                   <Divider 
// // //                     sx={{ 
// // //                       my: 3,
// // //                       borderColor: theme.palette.divider,
// // //                       borderBottomWidth: 1
// // //                     }} 
// // //                   />
// // //                   <Typography 
// // //                     variant="h6" 
// // //                     gutterBottom 
// // //                     sx={{ 
// // //                       fontWeight: 'bold', 
// // //                       color: 'text.primary',
// // //                       display: 'flex',
// // //                       alignItems: 'center'
// // //                     }}
// // //                   >
// // //                     <PauseCircleFilledIcon sx={{ mr: 1, color: 'warning.main' }} />
// // //                     Add Daily Break Times
// // //                   </Typography>
// // //                   <Grid container spacing={2} alignItems="center">
// // //                     <Grid item xs={12} sm={4}>
// // //                       <FormControl fullWidth size="small">
// // //                         <InputLabel id="day-select-break-label">Day of Week</InputLabel>
// // //                         <Select
// // //                           labelId="day-select-break-label"
// // //                           id="day-select-break"
// // //                           value={selectedDayForSlot}
// // //                           label="Day of Week"
// // //                           onChange={(e) => setSelectedDayForSlot(e.target.value)}
// // //                           sx={{ background: theme.palette.background.paper }}
// // //                         >
// // //                           <MenuItem value=""><em>Select Day</em></MenuItem>
// // //                           {DAYS_OF_WEEK.map((day) => (
// // //                             <MenuItem key={day} value={day}>{day}</MenuItem>
// // //                           ))}
// // //                         </Select>
// // //                       </FormControl>
// // //                     </Grid>
// // //                     <Grid item xs={6} sm={3}>
// // //                       <Tooltip title="Start time for break">
// // //                         <TextField
// // //                           label="Break Start Time"
// // //                           type="time"
// // //                           fullWidth
// // //                           size="small"
// // //                           value={newBreakStartTime}
// // //                           onChange={(e) => setNewBreakStartTime(e.target.value)}
// // //                           InputLabelProps={{ shrink: true }}
// // //                           sx={{ background: theme.palette.background.paper }}
// // //                         />
// // //                       </Tooltip>
// // //                     </Grid>
// // //                     <Grid item xs={6} sm={3}>
// // //                       <Tooltip title="End time for break">
// // //                         <TextField
// // //                           label="Break End Time"
// // //                           type="time"
// // //                           fullWidth
// // //                           size="small"
// // //                           value={newBreakEndTime}
// // //                           onChange={(e) => setNewBreakEndTime(e.target.value)}
// // //                           InputLabelProps={{ shrink: true }}
// // //                           sx={{ background: theme.palette.background.paper }}
// // //                         />
// // //                       </Tooltip>
// // //                     </Grid>
// // //                     <Grid item xs={12} sm={2}>
// // //                       <Button
// // //                         variant="contained"
// // //                         color="warning"
// // //                         startIcon={<AddCircleOutlineIcon />}
// // //                         onClick={handleAddBreak}
// // //                         fullWidth
// // //                         size="small"
// // //                         sx={{
// // //                           height: '40px',
// // //                           boxShadow: theme.shadows[1],
// // //                           '&:hover': {
// // //                             boxShadow: theme.shadows[3]
// // //                           }
// // //                         }}
// // //                       >
// // //                         Add Break
// // //                       </Button>
// // //                     </Grid>
// // //                   </Grid>
// // //                 </Card>

// // //                 <Card 
// // //                   elevation={0} 
// // //                   sx={{ 
// // //                     p: 3, 
// // //                     mb: 3, 
// // //                     borderRadius: 2, 
// // //                     bgcolor: theme.palette.mode === 'light' ? '#f8fafc' : '#1e1e1e',
// // //                     border: theme.palette.mode === 'light' ? '1px solid #e0e0e0' : '1px solid #333'
// // //                   }}
// // //                 >
// // //                   <Typography 
// // //                     variant="h6" 
// // //                     gutterBottom 
// // //                     sx={{ 
// // //                       fontWeight: 'bold', 
// // //                       color: 'text.primary',
// // //                       display: 'flex',
// // //                       alignItems: 'center'
// // //                     }}
// // //                   >
// // //                     <CalendarTodayIcon sx={{ mr: 1, color: 'error.main' }} />
// // //                     Doctor Leave Dates
// // //                   </Typography>
// // //                   <Grid container spacing={2} alignItems="center">
// // //                     <Grid item xs={12} sm={8}>
// // //                       <Tooltip title="Select date you'll be unavailable">
// // //                         <TextField
// // //                           label="Leave Date"
// // //                           type="date"
// // //                           fullWidth
// // //                           size="small"
// // //                           value={newLeaveDate}
// // //                           onChange={(e) => setNewLeaveDate(e.target.value)}
// // //                           InputLabelProps={{ shrink: true }}
// // //                           sx={{ background: theme.palette.background.paper }}
// // //                         />
// // //                       </Tooltip>
// // //                     </Grid>
// // //                     <Grid item xs={12} sm={4}>
// // //                       <Button
// // //                         variant="contained"
// // //                         color="primary"
// // //                         startIcon={<AddCircleOutlineIcon />}
// // //                         onClick={handleAddLeaveDate}
// // //                         fullWidth
// // //                         size="small"
// // //                         sx={{
// // //                           height: '40px',
// // //                           boxShadow: theme.shadows[1],
// // //                           '&:hover': {
// // //                             boxShadow: theme.shadows[3]
// // //                           }
// // //                         }}
// // //                       >
// // //                         Add Leave
// // //                       </Button>
// // //                     </Grid>
// // //                   </Grid>

// // //                   <List sx={{ mt: 2 }}>
// // //                     {leaveDates.length === 0 ? (
// // //                       <Typography 
// // //                         variant="body2" 
// // //                         color="text.secondary" 
// // //                         sx={{ 
// // //                           textAlign: 'center', 
// // //                           py: 2,
// // //                           fontStyle: 'italic'
// // //                         }}
// // //                       >
// // //                         No leave dates set. Add days you'll be unavailable.
// // //                       </Typography>
// // //                     ) : (
// // //                       leaveDates.map((date, index) => (
// // //                         <ListItem
// // //                           key={date + index}
// // //                           secondaryAction={
// // //                             <Tooltip title="Remove leave date">
// // //                               <IconButton 
// // //                                 edge="end" 
// // //                                 aria-label="delete" 
// // //                                 onClick={() => handleRemoveLeaveDate(date)}
// // //                                 sx={{ color: theme.palette.error.main }}
// // //                               >
// // //                                 <RemoveCircleOutlineIcon />
// // //                               </IconButton>
// // //                             </Tooltip>
// // //                           }
// // //                           sx={{ 
// // //                             borderBottom: `1px dashed ${theme.palette.divider}`, 
// // //                             mb: 1,
// // //                             '&:hover': {
// // //                               backgroundColor: theme.palette.action.hover
// // //                             }
// // //                           }}
// // //                         >
// // //                           <ListItemText 
// // //                             primary={
// // //                               <Typography sx={{ fontWeight: 'medium' }}>
// // //                                 {new Date(date).toLocaleDateString('en-US', { 
// // //                                   weekday: 'long', 
// // //                                   year: 'numeric', 
// // //                                   month: 'long', 
// // //                                   day: 'numeric' 
// // //                                 })}
// // //                               </Typography>
// // //                             } 
// // //                           />
// // //                         </ListItem>
// // //                       ))
// // //                     )}
// // //                   </List>
// // //                 </Card>

// // //                 <Button
// // //                   variant="contained"
// // //                   color="secondary"
// // //                   startIcon={savingAvailability ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
// // //                   onClick={handleSaveAvailability}
// // //                   disabled={savingAvailability || !doctorDetails || !doctorDetails.id}
// // //                   fullWidth
// // //                   sx={{ 
// // //                     py: 1.5, 
// // //                     fontSize: '1.1rem', 
// // //                     fontWeight: 'bold',
// // //                     borderRadius: 2,
// // //                     boxShadow: theme.shadows[2],
// // //                     '&:hover': {
// // //                       boxShadow: theme.shadows[4],
// // //                       transform: 'translateY(-1px)'
// // //                     },
// // //                     transition: 'all 0.2s ease-in-out',
// // //                     height: '48px'
// // //                   }}
// // //                 >
// // //                   {savingAvailability ? 'Saving Availability...' : 'Save My Availability'}
// // //                 </Button>
// // //               </CardContent>
// // //             </Card>
// // //           </Fade>

// // //           {scheduleData.length === 0 ? (
// // //             <Alert 
// // //               severity="info" 
// // //               sx={{ 
// // //                 mb: 3,
// // //                 borderRadius: 2,
// // //                 boxShadow: theme.shadows[1]
// // //               }}
// // //             >
// // //               No schedule entries found for this doctor.
// // //             </Alert>
// // //           ) : (
// // //             <Fade in={!loading} timeout={1000}>
// // //               <Card 
// // //                 elevation={6} 
// // //                 sx={{ 
// // //                   borderRadius: 3,
// // //                   background: theme.palette.mode === 'light' 
// // //                     ? 'linear-gradient(145deg, #ffffff, #f8fafc)' 
// // //                     : theme.palette.background.paper,
// // //                   boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
// // //                   border: theme.palette.mode === 'light' ? '1px solid #e0e0e0' : '1px solid #333'
// // //                 }}
// // //               >
// // //                 <CardContent>
// // //                   <Typography 
// // //                     variant="h5" 
// // //                     gutterBottom 
// // //                     sx={{ 
// // //                       mb: 3, 
// // //                       fontWeight: 'bold', 
// // //                       color: 'primary.main',
// // //                       display: 'flex',
// // //                       alignItems: 'center'
// // //                     }}
// // //                   >
// // //                     <EventNoteIcon sx={{ mr: 1.5, fontSize: '1.8rem' }} />
// // //                     Upcoming Activities
// // //                   </Typography>

// // //                   <TableContainer>
// // //                     <Table sx={{ minWidth: 650 }} aria-label="doctor schedule table">
// // //                       <TableHead>
// // //                         <TableRow sx={{ 
// // //                           bgcolor: theme.palette.mode === 'light' ? '#e3f2fd' : '#1e3a8a',
// // //                           '& th': {
// // //                             fontWeight: 'bold',
// // //                             fontSize: '0.95rem'
// // //                           }
// // //                         }}>
// // //                           <TableCell sx={{ color: theme.palette.mode === 'light' ? 'primary.dark' : 'common.white' }}>
// // //                             <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // //                               <CalendarTodayIcon sx={{ mr: 1, fontSize: '1rem' }} />
// // //                               Day/Date
// // //                             </Box>
// // //                           </TableCell>
// // //                           <TableCell sx={{ color: theme.palette.mode === 'light' ? 'primary.dark' : 'common.white' }}>
// // //                             <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // //                               <AccessTimeIcon sx={{ mr: 1, fontSize: '1rem' }} />
// // //                               Time
// // //                             </Box>
// // //                           </TableCell>
// // //                           <TableCell sx={{ color: theme.palette.mode === 'light' ? 'primary.dark' : 'common.white' }}>Type</TableCell>
// // //                           <TableCell sx={{ color: theme.palette.mode === 'light' ? 'primary.dark' : 'common.white' }}>Activity</TableCell>
// // //                           <TableCell sx={{ color: theme.palette.mode === 'light' ? 'primary.dark' : 'common.white' }}>
// // //                             <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // //                               <LocationOnIcon sx={{ mr: 1, fontSize: '1rem' }} />
// // //                               Location
// // //                             </Box>
// // //                           </TableCell>
// // //                           <TableCell sx={{ color: theme.palette.mode === 'light' ? 'primary.dark' : 'common.white' }}>Status</TableCell>
// // //                         </TableRow>
// // //                       </TableHead>
// // //                       <TableBody>
// // //                         {scheduleData.map((row) => (
// // //                           <TableRow
// // //                             key={row.id}
// // //                             sx={{ 
// // //                               '&:last-child td, &:last-child th': { border: 0 }, 
// // //                               '&:nth-of-type(odd)': { 
// // //                                 backgroundColor: theme.palette.mode === 'light' ? '#f9f9f9' : '#1a1a1a'
// // //                               },
// // //                               '&:hover': {
// // //                                 backgroundColor: theme.palette.mode === 'light' ? '#f0f4f8' : '#2d2d2d'
// // //                               }
// // //                             }}
// // //                           >
// // //                             <TableCell component="th" scope="row">
// // //                               <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // //                                 {getIconForType(row.type)}
// // //                                 {row.type === 'Leave' ? row.date || 'N/A' : row.day || 'N/A'}
// // //                               </Box>
// // //                             </TableCell>
// // //                             <TableCell>
// // //                               <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // //                                 <AccessTimeIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
// // //                                 {row.time || 'N/A'}
// // //                               </Box>
// // //                             </TableCell>
// // //                             <TableCell>
// // //                               <Chip
// // //                                 label={row.type || 'N/A'}
// // //                                 color={row.type === 'Break' ? 'warning' : (row.type === 'Leave' ? 'error' : 'primary')}
// // //                                 size="small"
// // //                                 sx={{
// // //                                   fontWeight: 'medium',
// // //                                   minWidth: '80px'
// // //                                 }}
// // //                               />
// // //                             </TableCell>
// // //                             <TableCell>{row.activity || 'N/A'}</TableCell>
// // //                             <TableCell>
// // //                               <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // //                                 <LocationOnIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
// // //                                 {row.location || 'N/A'}
// // //                               </Box>
// // //                             </TableCell>
// // //                             <TableCell>
// // //                               <Chip 
// // //                                 label={row.status || 'Unknown'} 
// // //                                 color={getStatusColor(row.status, row.type)} 
// // //                                 size="small" 
// // //                                 sx={{
// // //                                   fontWeight: 'medium'
// // //                                 }}
// // //                               />
// // //                             </TableCell>
// // //                           </TableRow>
// // //                         ))}
// // //                       </TableBody>
// // //                     </Table>
// // //                   </TableContainer>
// // //                 </CardContent>
// // //               </Card>
// // //             </Fade>
// // //           )}
// // //         </>
// // //       )}

      

// // //       <Box sx={{ 
// // //         mt: 6, 
// // //         opacity: 0.7, 
// // //         textAlign: 'center',
// // //         p: 2,
// // //         borderRadius: 2,
// // //         background: theme.palette.mode === 'light' ? 'rgba(227,242,253,0.5)' : 'rgba(25,50,100,0.3)'
// // //       }}>
// // //         <Typography variant="body2" color="text.secondary">
// // //           View and manage your personal work schedule and availability.
// // //         </Typography>
// // //       </Box>

// // //       {/* Snackbar for submission feedback */}
// // //       <Snackbar
// // //         open={Boolean(availabilitySaveStatus)}
// // //         autoHideDuration={6000}
// // //         onClose={handleCloseSnackbar}
// // //         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
// // //         TransitionComponent={Fade}
// // //       >
// // //         <Alert
// // //           onClose={handleCloseSnackbar}
// // //           severity={availabilitySaveStatus === 'success' ? 'success' : 'error'}
// // //           variant="filled"
// // //           sx={{ 
// // //             borderRadius: 2,
// // //             boxShadow: theme.shadows[6],
// // //             alignItems: 'center',
// // //             '& .MuiAlert-icon': {
// // //               alignItems: 'center'
// // //             }
// // //           }}
// // //           iconMapping={{
// // //             success: <SaveIcon fontSize="inherit" />,
// // //             error: <SaveIcon fontSize="inherit" />
// // //           }}
// // //         >
// // //           {availabilitySaveStatus === 'success' ? 'Availability saved successfully!' :
// // //            `Error saving availability: ${error || 'Please check console for details.'}`}
// // //         </Alert>
// // //       </Snackbar>
// // //     </Box>
// // //   );
// // // };

// // // DoctorMySchedule.propTypes = {
// // //   doctorUser: PropTypes.shape({
// // //     userId: PropTypes.string,
// // //     name: PropTypes.string,
// // //     email: PropTypes.string,
// // //     profilePic: PropTypes.string,
// // //   }),
// // // };


// // // export default DoctorMySchedule;



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
//   CircularProgress,
//   Alert,
//   Stack,
//   Grid,
//   TextField,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   IconButton,
//   List,
//   ListItem,
//   ListItemText,
//   Snackbar,
//   Divider,
// } from '@mui/material';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import EventNoteIcon from '@mui/icons-material/EventNote';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
// import PersonIcon from '@mui/icons-material/Person';
// import WorkIcon from '@mui/icons-material/Work';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
// import SaveIcon from '@mui/icons-material/Save';

// // Helper function to format Instant (ISO string) to HH:MM (24-hour format)
// const formatInstantToHHMM = (isoString) => {
//   if (!isoString) return '';
//   const date = new Date(isoString);
//   // Ensure the date is treated as UTC to prevent timezone issues with fixed times
//   const hours = String(date.getUTCHours()).padStart(2, '0');
//   const minutes = String(date.getUTCMinutes()).padStart(2, '0');
//   return `${hours}:${minutes}`;
// };

// const DoctorMySchedule = ({ doctorUser }) => {
//   const [doctorDetails, setDoctorDetails] = useState(null);
//   const [scheduleData, setScheduleData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // States for schedule management (raw data from backend)
//   const [doctorAvailabilityId, setDoctorAvailabilityId] = useState(null);
//   const [dailyAvailability, setDailyAvailability] = useState([]);
//   const [leaveDates, setLeaveDates] = useState([]);

//   // States for adding new slots/breaks/leaves
//   const [selectedDayForSlot, setSelectedDayForSlot] = useState('');
//   const [newSlotStartTime, setNewSlotStartTime] = useState('');
//   const [newSlotEndTime, setNewSlotEndTime] = useState('');
//   const [newBreakStartTime, setNewBreakStartTime] = useState('');
//   const [newBreakEndTime, setNewBreakEndTime] = useState('');
//   const [newLeaveDate, setNewLeaveDate] = useState('');

//   // States for saving feedback
//   const [savingAvailability, setSavingAvailability] = useState(false);
//   const [availabilitySaveStatus, setAvailabilitySaveStatus] = useState(null); // 'success', 'error'
//   const [appointmentUpdateStatus, setAppointmentUpdateStatus] = useState(null); // 'success', 'error', 'loading'

//   const DAYS_OF_WEEK = [
//     'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'
//   ];

//   const fetchData = async () => {
//     if (!doctorUser || !doctorUser.userId) {
//       setError("Doctor user ID (custom ID) is not available.");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     const doctorCustomId = doctorUser.userId;

//     try {
//       // 1. Fetch Doctor Details using customId
//       const doctorDetailsApiUrl = `http://localhost:2005/api/doctors/customId/${doctorCustomId}`;
//       const doctorDetailsResponse = await fetch(doctorDetailsApiUrl);
//       if (!doctorDetailsResponse.ok) {
//         const errorText = await doctorDetailsResponse.text();
//         throw new Error(`Failed to fetch doctor details: ${doctorDetailsResponse.status} - ${errorText}`);
//       }
//       const doctorData = await doctorDetailsResponse.json();
//       setDoctorDetails(doctorData);

//       const doctorMongoId = doctorData.id;
//       if (!doctorMongoId) {
//         throw new Error("Could not retrieve MongoDB ID for the doctor.");
//       }

//       // 2. Fetch Doctor Availability using the MongoDB _id
//       const doctorAvailabilityApiUrl = `http://localhost:2005/api/doctor-availabilities/byDoctorId/${doctorMongoId}`;
//       const doctorAvailabilityResponse = await fetch(doctorAvailabilityApiUrl);

//       let availabilityData = null;
//       if (doctorAvailabilityResponse.ok) {
//         availabilityData = await doctorAvailabilityResponse.json();
//         setDoctorAvailabilityId(availabilityData.id);
//         setDailyAvailability(availabilityData.dailySlots ? availabilityData.dailySlots.map(day => ({
//           day: day.day,
//           slots: day.slots || [],
//           breakSlots: day.breakSlots || []
//         })) : []);
//         setLeaveDates(availabilityData.leaveDates || []);
//       } else if (doctorAvailabilityResponse.status === 404) {
//         setDoctorAvailabilityId(null);
//         setDailyAvailability([]);
//         setLeaveDates([]);
//       } else {
//         const errorText = await doctorAvailabilityResponse.text();
//         throw new Error(`Failed to fetch schedule data: ${doctorAvailabilityResponse.status} - ${errorText}`);
//       }

//       const rawDailySlots = availabilityData ? availabilityData.dailySlots || [] : [];
//       const rawLeaveDates = availabilityData ? availabilityData.leaveDates || [] : [];
//       const flattenedSchedule = [];

//       rawDailySlots.forEach(daySlot => {
//         if (daySlot.slots && Array.isArray(daySlot.slots)) {
//           daySlot.slots.forEach(timeRange => {
//             const formattedStartTime = formatInstantToHHMM(timeRange.startTime);
//             const formattedEndTime = formatInstantToHHMM(timeRange.endTime);
//             flattenedSchedule.push({
//               id: `${daySlot.day}-consultation-${timeRange.startTime}-${timeRange.endTime}`,
//               day: daySlot.day,
//               time: `${formattedStartTime} - ${formattedEndTime}`,
//               type: 'Consultation',
//               activity: 'Patient Consultation',
//               location: 'Clinic Room',
//               status: 'Scheduled',
//             });
//           });
//         }
//         if (daySlot.breakSlots && Array.isArray(daySlot.breakSlots)) {
//           daySlot.breakSlots.forEach(timeRange => {
//             const formattedStartTime = formatInstantToHHMM(timeRange.startTime);
//             const formattedEndTime = formatInstantToHHMM(timeRange.endTime);
//             flattenedSchedule.push({
//               id: `${daySlot.day}-break-${timeRange.startTime}-${timeRange.endTime}`,
//               day: daySlot.day,
//               time: `${formattedStartTime} - ${formattedEndTime}`,
//               type: 'Break',
//               activity: 'Break Time',
//               location: 'N/A',
//               status: 'Flexible',
//             });
//           });
//         }
//       });

//       if (rawLeaveDates.length > 0) {
//         rawLeaveDates.forEach(leaveDate => {
//           flattenedSchedule.push({
//             id: `leave-${leaveDate}`,
//             day: 'Leave',
//             date: new Date(leaveDate).toLocaleDateString(),
//             time: 'All Day',
//             type: 'Leave',
//             activity: 'Doctor on Leave',
//             location: 'N/A',
//             status: 'Cancelled',
//           });
//         });
//       }

//       flattenedSchedule.sort((a, b) => {
//         if (a.type === 'Leave' && b.type !== 'Leave') return 1;
//         if (a.type !== 'Leave' && b.type === 'Leave') return -1;
//         if (a.type === 'Leave' && b.type === 'Leave') return a.date.localeCompare(b.date);
//         const dayOrderA = DAYS_OF_WEEK.indexOf(a.day);
//         const dayOrderB = DAYS_OF_WEEK.indexOf(b.day);
//         if (dayOrderA !== dayOrderB) {
//           return dayOrderA - dayOrderB;
//         }
//         const timeA = a.time.split(' - ')[0];
//         const timeB = b.time.split(' - ')[0];
//         return timeA.localeCompare(timeB);
//       });

//       setScheduleData(flattenedSchedule);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//       setError(err.message || "Failed to load doctor details or schedule.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [doctorUser.userId]);

//   const getStatusColor = (status, type) => {
//     if (type === 'Break') return 'warning';
//     if (type === 'Leave') return 'error';
//     switch (status) {
//       case 'Scheduled': return 'primary';
//       case 'Completed': return 'success';
//       case 'Flexible': return 'info';
//       case 'Cancelled': return 'error';
//       default: return 'default';
//     }
//   };

//   const getIconForType = (type) => {
//     switch (type) {
//       case 'Consultation': return <EventNoteIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />;
//       case 'Break': return <PauseCircleFilledIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />;
//       case 'Leave': return <CalendarTodayIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />;
//       default: return null;
//     }
//   };

//   // --- Schedule Management Functions ---
//   const createInstantFromTime = (dateString, timeString) => {
//     if (!dateString || !timeString) return null;
//     const baseDate = dateString === 'All Day' ? '1970-01-01' : dateString;
//     return new Date(`${baseDate}T${timeString}:00.000Z`).toISOString();
//   };

//   const handleAddSlot = () => {
//     if (!selectedDayForSlot || !newSlotStartTime || !newSlotEndTime) {
//       setAvailabilitySaveStatus('error');
//       return;
//     }
//     const newTimeRange = {
//       startTime: createInstantFromTime('1970-01-01', newSlotStartTime),
//       endTime: createInstantFromTime('1970-01-01', newSlotEndTime),
//     };
//     setDailyAvailability((prevAvailability) => {
//       const existingDayIndex = prevAvailability.findIndex(
//         (item) => item.day === selectedDayForSlot
//       );
//       if (existingDayIndex !== -1) {
//         const updatedDailyAvailability = [...prevAvailability];
//         const existingDay = { ...updatedDailyAvailability[existingDayIndex] };
//         if (!existingDay.slots.some(s => s.startTime === newTimeRange.startTime && s.endTime === newTimeRange.endTime)) {
//           existingDay.slots = [...existingDay.slots, newTimeRange].sort((a, b) => a.startTime.localeCompare(b.startTime));
//           updatedDailyAvailability[existingDayIndex] = existingDay;
//           return updatedDailyAvailability;
//         }
//       } else {
//         return [...prevAvailability, { day: selectedDayForSlot, slots: [newTimeRange], breakSlots: [] }];
//       }
//       return prevAvailability;
//     });
//     setNewSlotStartTime('');
//     setNewSlotEndTime('');
//     setSelectedDayForSlot('');
//     setAvailabilitySaveStatus('success');
//   };

//   const handleRemoveSlot = (day, slotToRemove) => {
//     setDailyAvailability((prevAvailability) =>
//       prevAvailability
//         .map((item) =>
//           item.day === day
//             ? { ...item, slots: item.slots.filter((slot) => !(slot.startTime === slotToRemove.startTime && slot.endTime === slotToRemove.endTime)) }
//             : item
//         )
//         .filter((item) => item.slots.length > 0 || item.breakSlots.length > 0)
//     );
//     setAvailabilitySaveStatus('success');
//   };

//   const handleAddBreak = () => {
//     if (!selectedDayForSlot || !newBreakStartTime || !newBreakEndTime) {
//       setAvailabilitySaveStatus('error');
//       return;
//     }
//     const newTimeRange = {
//       startTime: createInstantFromTime('1970-01-01', newBreakStartTime),
//       endTime: createInstantFromTime('1970-01-01', newBreakEndTime),
//     };
//     setDailyAvailability((prevAvailability) => {
//       const existingDayIndex = prevAvailability.findIndex(
//         (item) => item.day === selectedDayForSlot
//       );
//       if (existingDayIndex !== -1) {
//         const updatedDailyAvailability = [...prevAvailability];
//         const existingDay = { ...updatedDailyAvailability[existingDayIndex] };
//         if (!existingDay.breakSlots.some(b => b.startTime === newTimeRange.startTime && b.endTime === newTimeRange.endTime)) {
//           existingDay.breakSlots = [...existingDay.breakSlots, newTimeRange].sort((a, b) => a.startTime.localeCompare(b.startTime));
//           updatedDailyAvailability[existingDayIndex] = existingDay;
//           return updatedDailyAvailability;
//         }
//       } else {
//         return [...prevAvailability, { day: selectedDayForSlot, slots: [], breakSlots: [newTimeRange] }];
//       }
//       return prevAvailability;
//     });
//     setNewBreakStartTime('');
//     setNewBreakEndTime('');
//     setSelectedDayForSlot('');
//     setAvailabilitySaveStatus('success');
//   };

//   const handleRemoveBreak = (day, breakToRemove) => {
//     setDailyAvailability((prevAvailability) =>
//       prevAvailability
//         .map((item) =>
//           item.day === day
//             ? { ...item, breakSlots: item.breakSlots.filter((b) => !(b.startTime === breakToRemove.startTime && b.endTime === breakToRemove.endTime)) }
//             : item
//         )
//         .filter((item) => item.slots.length > 0 || item.breakSlots.length > 0)
//     );
//     setAvailabilitySaveStatus('success');
//   };

//   const handleAddLeaveDate = () => {
//     if (!newLeaveDate) {
//       setAvailabilitySaveStatus('error');
//       return;
//     }
//     const leaveInstant = new Date(`${newLeaveDate}T00:00:00.000Z`).toISOString();
//     if (leaveDates.includes(leaveInstant)) {
//       setAvailabilitySaveStatus('error');
//       return;
//     }
//     setLeaveDates((prevDates) => [...prevDates, leaveInstant].sort());
//     setNewLeaveDate('');
//     setAvailabilitySaveStatus('success');
//   };

//   const handleRemoveLeaveDate = (dateToRemove) => {
//     setLeaveDates((prevDates) => prevDates.filter((date) => date !== dateToRemove));
//     setAvailabilitySaveStatus('success');
//   };

//   const updateAppointments = async (doctorId, leaveDates, dailyAvailability) => {
//     setAppointmentUpdateStatus('loading');
//     try {
//       const payload = {
//         doctorId: doctorId,
//         leaveDates: leaveDates,
//         dailySlots: dailyAvailability,
//       };

//       const response = await fetch('http://localhost:2005/api/appointments/update-on-schedule-change', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Failed to update appointments: ${response.status} - ${errorText}`);
//       }

//       console.log('Appointments updated successfully.');
//       setAppointmentUpdateStatus('success');
//     } catch (err) {
//       console.error('Error updating appointments:', err);
//       setAppointmentUpdateStatus('error');
//     }
//   };

//   const handleSaveAvailability = async () => {
//     setSavingAvailability(true);
//     setAvailabilitySaveStatus(null);
//     setAppointmentUpdateStatus(null);

//     const payload = {
//       doctorId: doctorDetails.id,
//       dailySlots: dailyAvailability,
//       leaveDates: leaveDates,
//     };

//     try {
//       let response;
//       if (doctorAvailabilityId) {
//         response = await fetch(`http://localhost:2005/api/doctor-availabilities/${doctorAvailabilityId}`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(payload),
//         });
//       } else {
//         response = await fetch('http://localhost:2005/api/doctor-availabilities', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(payload),
//         });
//       }

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Failed to save availability: ${response.status} - ${errorText}`);
//       }

//       const result = await response.json();
//       setDoctorAvailabilityId(result.id);
//       setAvailabilitySaveStatus('success');
//       console.log('Doctor availability saved successfully:', result);

//       // --- NEW LOGIC: Call a separate API to update appointments after saving availability ---
//       await updateAppointments(doctorDetails.id, leaveDates, dailyAvailability);

//       fetchData(); // Re-fetch data to update the displayed schedule table
//     } catch (err) {
//       console.error('Error saving availability:', err);
//       setAvailabilitySaveStatus('error');
//     } finally {
//       setSavingAvailability(false);
//     }
//   };

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === 'clickaway') return;
//     setAvailabilitySaveStatus(null);
//     setAppointmentUpdateStatus(null);
//   };
//   // --- End Schedule Management Functions ---

//   return (
//     <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', width: '100%' }}>
//       <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.dark' }}>
//         My Schedule
//       </Typography>

//       {loading && (
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', flexDirection: 'column' }}>
//           <CircularProgress sx={{ mb: 2 }} />
//           <Typography variant="h6">Loading Doctor Data...</Typography>
//         </Box>
//       )}

//       {error && (
//         <Alert severity="error" sx={{ mb: 3 }}>
//           {error}
//         </Alert>
//       )}

//       {!loading && !error && (
//         <>
//           {doctorDetails && (
//             <Paper elevation={4} sx={{ p: { xs: 2, md: 3 }, mb: 4, borderRadius: 3, background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
//               <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.dark' }}>
//                 Doctor Details
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <PersonIcon color="primary" sx={{ mr: 1 }} />
//                     <Typography variant="body1">
//                       <strong>Name:</strong> {doctorDetails.firstName} {doctorDetails.lastName}
//                     </Typography>
//                   </Box>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <WorkIcon color="primary" sx={{ mr: 1 }} />
//                     <Typography variant="body1">
//                       <strong>Specialization:</strong> {doctorDetails.specialization}
//                     </Typography>
//                   </Box>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <Typography variant="body1">
//                       <strong>Custom ID:</strong> {doctorDetails.customId || 'N/A'}
//                     </Typography>
//                   </Box>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <Typography variant="body1">
//                       <strong>Email:</strong> {doctorDetails.email || 'N/A'}
//                     </Typography>
//                   </Box>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <Typography variant="body1">
//                       <strong>Contact:</strong> {doctorDetails.contactNumber || 'N/A'}
//                     </Typography>
//                   </Box>
//                 </Grid>
//               </Grid>
//             </Paper>
//           )}

//           <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, mb: 4, borderRadius: 3, background: 'linear-gradient(145deg, #ffffff, #f0f2f5)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
//             <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
//               Manage My Availability
//             </Typography>

//             <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2, bgcolor: '#f5f7fa' }}>
//               <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
//                 Daily Consultation Slots
//               </Typography>
//               <Grid container spacing={2} alignItems="center">
//                 <Grid item xs={12} sm={4}>
//                   <FormControl fullWidth size="small">
//                     <InputLabel id="day-select-label">Day of Week</InputLabel>
//                     <Select
//                       labelId="day-select-label"
//                       id="day-select"
//                       value={selectedDayForSlot}
//                       label="Day of Week"
//                       onChange={(e) => setSelectedDayForSlot(e.target.value)}
//                     >
//                       <MenuItem value=""><em>Select Day</em></MenuItem>
//                       {DAYS_OF_WEEK.map((day) => (
//                         <MenuItem key={day} value={day}>{day}</MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={6} sm={3}>
//                   <TextField
//                     label="Start Time"
//                     type="time"
//                     fullWidth
//                     size="small"
//                     value={newSlotStartTime}
//                     onChange={(e) => setNewSlotStartTime(e.target.value)}
//                     InputLabelProps={{ shrink: true }}
//                   />
//                 </Grid>
//                 <Grid item xs={6} sm={3}>
//                   <TextField
//                     label="End Time"
//                     type="time"
//                     fullWidth
//                     size="small"
//                     value={newSlotEndTime}
//                     onChange={(e) => setNewSlotEndTime(e.target.value)}
//                     InputLabelProps={{ shrink: true }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={2}>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     startIcon={<AddCircleOutlineIcon />}
//                     onClick={handleAddSlot}
//                     fullWidth
//                     size="small"
//                   >
//                     Add Slot
//                   </Button>
//                 </Grid>
//               </Grid>

//               <List sx={{ mt: 2 }}>
//                 {dailyAvailability.length === 0 ? (
//                   <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
//                     No daily slots set.
//                   </Typography>
//                 ) : (
//                   dailyAvailability.map((dayData) => (
//                     <Box key={dayData.day} sx={{ mb: 1, borderBottom: '1px dashed #e0e0e0', pb: 1 }}>
//                       <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 0.5, color: 'primary.dark' }}>
//                         {dayData.day}:
//                       </Typography>
//                       <Stack direction="row" flexWrap="wrap" spacing={1}>
//                         {dayData.slots.map((slot, index) => (
//                           <Chip
//                             key={`${dayData.day}-slot-${index}`}
//                             label={`${formatInstantToHHMM(slot.startTime)} - ${formatInstantToHHMM(slot.endTime)}`}
//                             onDelete={() => handleRemoveSlot(dayData.day, slot)}
//                             deleteIcon={<RemoveCircleOutlineIcon />}
//                             color="info"
//                             variant="outlined"
//                             size="small"
//                             sx={{ mb: 1 }}
//                           />
//                         ))}
//                       </Stack>
//                       {dayData.breakSlots && dayData.breakSlots.length > 0 && (
//                         <Box sx={{ mt: 1 }}>
//                           <Typography variant="caption" color="text.secondary" display="block">Breaks:</Typography>
//                           <Stack direction="row" flexWrap="wrap" spacing={1}>
//                             {dayData.breakSlots.map((bSlot, index) => (
//                               <Chip
//                                 key={`${dayData.day}-break-${index}`}
//                                 label={`${formatInstantToHHMM(bSlot.startTime)} - ${formatInstantToHHMM(bSlot.endTime)}`}
//                                 onDelete={() => handleRemoveBreak(dayData.day, bSlot)}
//                                 deleteIcon={<RemoveCircleOutlineIcon />}
//                                 color="warning"
//                                 variant="outlined"
//                                 size="small"
//                                 sx={{ mb: 1 }}
//                               />
//                             ))}
//                           </Stack>
//                         </Box>
//                       )}
//                     </Box>
//                   ))
//                 )}
//               </List>

//               <Divider sx={{ my: 3 }} />
//               <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
//                 Add Daily Break Times
//               </Typography>
//               <Grid container spacing={2} alignItems="center">
//                 <Grid item xs={12} sm={4}>
//                   <FormControl fullWidth size="small">
//                     <InputLabel id="day-select-break-label">Day of Week (for Break)</InputLabel>
//                     <Select
//                       labelId="day-select-break-label"
//                       id="day-select-break"
//                       value={selectedDayForSlot}
//                       label="Day of Week (for Break)"
//                       onChange={(e) => setSelectedDayForSlot(e.target.value)}
//                     >
//                       <MenuItem value=""><em>Select Day</em></MenuItem>
//                       {DAYS_OF_WEEK.map((day) => (
//                         <MenuItem key={day} value={day}>{day}</MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={6} sm={3}>
//                   <TextField
//                     label="Break Start Time"
//                     type="time"
//                     fullWidth
//                     size="small"
//                     value={newBreakStartTime}
//                     onChange={(e) => setNewBreakStartTime(e.target.value)}
//                     InputLabelProps={{ shrink: true }}
//                   />
//                 </Grid>
//                 <Grid item xs={6} sm={3}>
//                   <TextField
//                     label="Break End Time"
//                     type="time"
//                     fullWidth
//                     size="small"
//                     value={newBreakEndTime}
//                     onChange={(e) => setNewBreakEndTime(e.target.value)}
//                     InputLabelProps={{ shrink: true }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={2}>
//                   <Button
//                     variant="contained"
//                     color="warning"
//                     startIcon={<AddCircleOutlineIcon />}
//                     onClick={handleAddBreak}
//                     fullWidth
//                     size="small"
//                   >
//                     Add Break
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Paper>

//             <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2, bgcolor: '#f5f7fa' }}>
//               <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
//                 Doctor Leave Dates
//               </Typography>
//               <Grid container spacing={2} alignItems="center">
//                 <Grid item xs={12} sm={8}>
//                   <TextField
//                     label="Leave Date"
//                     type="date"
//                     fullWidth
//                     size="small"
//                     value={newLeaveDate}
//                     onChange={(e) => setNewLeaveDate(e.target.value)}
//                     InputLabelProps={{ shrink: true }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={4}>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     startIcon={<AddCircleOutlineIcon />}
//                     onClick={handleAddLeaveDate}
//                     fullWidth
//                     size="small"
//                   >
//                     Add Leave
//                   </Button>
//                 </Grid>
//               </Grid>

//               <List sx={{ mt: 2 }}>
//                 {leaveDates.length === 0 ? (
//                   <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
//                     No leave dates set.
//                   </Typography>
//                 ) : (
//                   leaveDates.map((date, index) => (
//                     <ListItem
//                       key={date + index}
//                       secondaryAction={
//                         <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveLeaveDate(date)}>
//                           <RemoveCircleOutlineIcon color="error" />
//                         </IconButton>
//                       }
//                       sx={{ borderBottom: '1px dashed #e0e0e0', mb: 1 }}
//                     >
//                       <ListItemText primary={new Date(date).toLocaleDateString()} />
//                     </ListItem>
//                   ))
//                 )}
//               </List>
//             </Paper>

//             <Button
//               variant="contained"
//               color="secondary"
//               startIcon={
//                 savingAvailability || appointmentUpdateStatus === 'loading'
//                   ? <CircularProgress size={20} color="inherit" />
//                   : <SaveIcon />
//               }
//               onClick={handleSaveAvailability}
//               disabled={savingAvailability || !doctorDetails || !doctorDetails.id}
//               fullWidth
//               sx={{ py: 1.5, fontSize: '1.1rem', fontWeight: 'bold' }}
//             >
//               {savingAvailability || appointmentUpdateStatus === 'loading' ? 'Saving Schedule...' : 'Save My Availability'}
//             </Button>
//           </Paper>

//           {scheduleData.length === 0 ? (
//             <Alert severity="info" sx={{ mb: 3 }}>
//               No schedule entries found for this doctor.
//             </Alert>
//           ) : (
//             <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, background: 'linear-gradient(145deg, #ffffff, #f0f2f5)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
//               <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
//                 Upcoming Activities
//               </Typography>

//               <TableContainer>
//                 <Table sx={{ minWidth: 650 }} aria-label="doctor schedule table">
//                   <TableHead>
//                     <TableRow sx={{ bgcolor: '#e3f2fd' }}>
//                       <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Day/Date</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Time</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Type</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Activity</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Location</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Status</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {scheduleData.map((row) => (
//                       <TableRow
//                         key={row.id}
//                         sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}
//                       >
//                         <TableCell component="th" scope="row">
//                           {row.type === 'Leave' ? (
//                             <>
//                               <CalendarTodayIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
//                               {row.date || 'N/A'}
//                             </>
//                           ) : (
//                             <>
//                               <CalendarTodayIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
//                               {row.day || 'N/A'}
//                             </>
//                           )}
//                         </TableCell>
//                         <TableCell><AccessTimeIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />{row.time || 'N/A'}</TableCell>
//                         <TableCell>
//                           <Chip
//                             label={row.type || 'N/A'}
//                             color={row.type === 'Break' ? 'warning' : (row.type === 'Leave' ? 'error' : 'primary')}
//                             size="small"
//                             icon={getIconForType(row.type)}
//                           />
//                         </TableCell>
//                         <TableCell>{row.activity || 'N/A'}</TableCell>
//                         <TableCell><LocationOnIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />{row.location || 'N/A'}</TableCell>
//                         <TableCell>
//                           <Chip label={row.status || 'Unknown'} color={getStatusColor(row.status, row.type)} size="small" />
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Paper>
//           )}
//         </>
//       )}

//       <Box sx={{ mt: 6, opacity: 0.7, textAlign: 'center' }}>
//         <Typography variant="body2" color="text.secondary">
//           View and manage your personal work schedule and availability.
//         </Typography>
//       </Box>

//       <Snackbar
//         open={Boolean(availabilitySaveStatus)}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={availabilitySaveStatus === 'success' ? 'success' : 'error'}
//           variant="filled"
//           sx={{ borderRadius: 3 }}
//         >
//           {availabilitySaveStatus === 'success' ? 'Availability saved successfully!' :
//             `Error saving availability: ${error || 'Please check console for details.'}`}
//         </Alert>
//       </Snackbar>

//       <Snackbar
//         open={Boolean(appointmentUpdateStatus)}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={appointmentUpdateStatus === 'success' ? 'success' : 'error'}
//           variant="filled"
//           sx={{ borderRadius: 3 }}
//         >
//           {appointmentUpdateStatus === 'success' ? 'Appointments updated successfully!' :
//             `Error updating appointments. Please contact support.`}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// DoctorMySchedule.propTypes = {
//   doctorUser: PropTypes.shape({
//     userId: PropTypes.string,
//     name: PropTypes.string,
//     email: PropTypes.string,
//     profilePic: PropTypes.string,
//   }),
// };

// export default DoctorMySchedule;


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
  CircularProgress,
  Alert,
  Stack,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Divider,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import SaveIcon from '@mui/icons-material/Save';

// Helper function to format Instant (ISO string) to HH:MM (24-hour format)
const formatInstantToHHMM = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  // Ensure the date is treated as UTC to prevent timezone issues with fixed times
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

const DoctorMySchedule = ({ doctorUser }) => {
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for schedule management (raw data from backend)
  const [doctorAvailabilityId, setDoctorAvailabilityId] = useState(null);
  const [dailyAvailability, setDailyAvailability] = useState([]);
  const [leaveDates, setLeaveDates] = useState([]);

  // States for adding new slots/breaks/leaves
  const [selectedDayForSlot, setSelectedDayForSlot] = useState('');
  const [newSlotStartTime, setNewSlotStartTime] = useState('');
  const [newSlotEndTime, setNewSlotEndTime] = useState('');
  const [newBreakStartTime, setNewBreakStartTime] = useState('');
  const [newBreakEndTime, setNewBreakEndTime] = useState('');
  const [newLeaveDate, setNewLeaveDate] = useState('');

  // States for saving feedback
  const [savingAvailability, setSavingAvailability] = useState(false);
  const [availabilitySaveStatus, setAvailabilitySaveStatus] = useState(null); // 'success', 'error'
  const [appointmentUpdateStatus, setAppointmentUpdateStatus] = useState(null); // 'success', 'error', 'loading'

  const DAYS_OF_WEEK = [
    'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'
  ];

  const fetchData = async () => {
    if (!doctorUser || !doctorUser.userId) {
      setError("Doctor user ID (custom ID) is not available.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    const doctorCustomId = doctorUser.userId;

    try {
      // 1. Fetch Doctor Details using customId from the Doctor microservice
      const doctorDetailsApiUrl = `http://localhost:2005/api/doctors/customId/${doctorCustomId}`;
      const doctorDetailsResponse = await fetch(doctorDetailsApiUrl);
      if (!doctorDetailsResponse.ok) {
        const errorText = await doctorDetailsResponse.text();
        throw new Error(`Failed to fetch doctor details: ${doctorDetailsResponse.status} - ${errorText}`);
      }
      const doctorData = await doctorDetailsResponse.json();
      setDoctorDetails(doctorData);

      const doctorMongoId = doctorData.id;
      if (!doctorMongoId) {
        throw new Error("Could not retrieve MongoDB ID for the doctor.");
      }

      // 2. Fetch Doctor Availability using the MongoDB _id from the Availability microservice
      const doctorAvailabilityApiUrl = `http://localhost:2005/api/doctor-availabilities/byDoctorId/${doctorMongoId}`;
      const doctorAvailabilityResponse = await fetch(doctorAvailabilityApiUrl);

      let availabilityData = null;
      if (doctorAvailabilityResponse.ok) {
        availabilityData = await doctorAvailabilityResponse.json();
        setDoctorAvailabilityId(availabilityData.id);
        setDailyAvailability(availabilityData.dailySlots ? availabilityData.dailySlots.map(day => ({
          day: day.day,
          slots: day.slots || [],
          breakSlots: day.breakSlots || []
        })) : []);
        setLeaveDates(availabilityData.leaveDates || []);
      } else if (doctorAvailabilityResponse.status === 404) {
        setDoctorAvailabilityId(null);
        setDailyAvailability([]);
        setLeaveDates([]);
      } else {
        const errorText = await doctorAvailabilityResponse.text();
        throw new Error(`Failed to fetch schedule data: ${doctorAvailabilityResponse.status} - ${errorText}`);
      }

      const rawDailySlots = availabilityData ? availabilityData.dailySlots || [] : [];
      const rawLeaveDates = availabilityData ? availabilityData.leaveDates || [] : [];
      const flattenedSchedule = [];

      rawDailySlots.forEach(daySlot => {
        if (daySlot.slots && Array.isArray(daySlot.slots)) {
          daySlot.slots.forEach(timeRange => {
            const formattedStartTime = formatInstantToHHMM(timeRange.startTime);
            const formattedEndTime = formatInstantToHHMM(timeRange.endTime);
            flattenedSchedule.push({
              id: `${daySlot.day}-consultation-${timeRange.startTime}-${timeRange.endTime}`,
              day: daySlot.day,
              time: `${formattedStartTime} - ${formattedEndTime}`,
              type: 'Consultation',
              activity: 'Patient Consultation',
              location: 'Clinic Room',
              status: 'Scheduled',
            });
          });
        }
        if (daySlot.breakSlots && Array.isArray(daySlot.breakSlots)) {
          daySlot.breakSlots.forEach(timeRange => {
            const formattedStartTime = formatInstantToHHMM(timeRange.startTime);
            const formattedEndTime = formatInstantToHHMM(timeRange.endTime);
            flattenedSchedule.push({
              id: `${daySlot.day}-break-${timeRange.startTime}-${timeRange.endTime}`,
              day: daySlot.day,
              time: `${formattedStartTime} - ${formattedEndTime}`,
              type: 'Break',
              activity: 'Break Time',
              location: 'N/A',
              status: 'Flexible',
            });
          });
        }
      });

      if (rawLeaveDates.length > 0) {
        rawLeaveDates.forEach(leaveDate => {
          flattenedSchedule.push({
            id: `leave-${leaveDate}`,
            day: 'Leave',
            date: new Date(leaveDate).toLocaleDateString(),
            time: 'All Day',
            type: 'Leave',
            activity: 'Doctor on Leave',
            location: 'N/A',
            status: 'Cancelled',
          });
        });
      }

      flattenedSchedule.sort((a, b) => {
        if (a.type === 'Leave' && b.type !== 'Leave') return 1;
        if (a.type !== 'Leave' && b.type === 'Leave') return -1;
        if (a.type === 'Leave' && b.type === 'Leave') return a.date.localeCompare(b.date);
        const dayOrderA = DAYS_OF_WEEK.indexOf(a.day);
        const dayOrderB = DAYS_OF_WEEK.indexOf(b.day);
        if (dayOrderA !== dayOrderB) {
          return dayOrderA - dayOrderB;
        }
        const timeA = a.time.split(' - ')[0];
        const timeB = b.time.split(' - ')[0];
        return timeA.localeCompare(timeB);
      });

      setScheduleData(flattenedSchedule);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message || "Failed to load doctor details or schedule.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [doctorUser.userId]);

  const getStatusColor = (status, type) => {
    if (type === 'Break') return 'warning';
    if (type === 'Leave') return 'error';
    switch (status) {
      case 'Scheduled': return 'primary';
      case 'Completed': return 'success';
      case 'Flexible': return 'info';
      case 'Cancelled': return 'error';
      default: return 'default';
    }
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'Consultation': return <EventNoteIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />;
      case 'Break': return <PauseCircleFilledIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />;
      case 'Leave': return <CalendarTodayIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />;
      default: return null;
    }
  };

  // --- Schedule Management Functions ---
  const createInstantFromTime = (dateString, timeString) => {
    if (!dateString || !timeString) return null;
    const baseDate = dateString === 'All Day' ? '1970-01-01' : dateString;
    return new Date(`${baseDate}T${timeString}:00.000Z`).toISOString();
  };

  const handleAddSlot = () => {
    if (!selectedDayForSlot || !newSlotStartTime || !newSlotEndTime) {
      setAvailabilitySaveStatus('error');
      return;
    }
    const newTimeRange = {
      startTime: createInstantFromTime('1970-01-01', newSlotStartTime),
      endTime: createInstantFromTime('1970-01-01', newSlotEndTime),
    };
    setDailyAvailability((prevAvailability) => {
      const existingDayIndex = prevAvailability.findIndex(
        (item) => item.day === selectedDayForSlot
      );
      if (existingDayIndex !== -1) {
        const updatedDailyAvailability = [...prevAvailability];
        const existingDay = { ...updatedDailyAvailability[existingDayIndex] };
        if (!existingDay.slots.some(s => s.startTime === newTimeRange.startTime && s.endTime === newTimeRange.endTime)) {
          existingDay.slots = [...existingDay.slots, newTimeRange].sort((a, b) => a.startTime.localeCompare(b.startTime));
          updatedDailyAvailability[existingDayIndex] = existingDay;
          return updatedDailyAvailability;
        }
      } else {
        return [...prevAvailability, { day: selectedDayForSlot, slots: [newTimeRange], breakSlots: [] }];
      }
      return prevAvailability;
    });
    setNewSlotStartTime('');
    setNewSlotEndTime('');
    setSelectedDayForSlot('');
    setAvailabilitySaveStatus('success');
  };

  const handleRemoveSlot = (day, slotToRemove) => {
    setDailyAvailability((prevAvailability) =>
      prevAvailability
        .map((item) =>
          item.day === day
            ? { ...item, slots: item.slots.filter((slot) => !(slot.startTime === slotToRemove.startTime && slot.endTime === slotToRemove.endTime)) }
            : item
        )
        .filter((item) => item.slots.length > 0 || item.breakSlots.length > 0)
    );
    setAvailabilitySaveStatus('success');
  };

  const handleAddBreak = () => {
    if (!selectedDayForSlot || !newBreakStartTime || !newBreakEndTime) {
      setAvailabilitySaveStatus('error');
      return;
    }
    const newTimeRange = {
      startTime: createInstantFromTime('1970-01-01', newBreakStartTime),
      endTime: createInstantFromTime('1970-01-01', newBreakEndTime),
    };
    setDailyAvailability((prevAvailability) => {
      const existingDayIndex = prevAvailability.findIndex(
        (item) => item.day === selectedDayForSlot
      );
      if (existingDayIndex !== -1) {
        const updatedDailyAvailability = [...prevAvailability];
        const existingDay = { ...updatedDailyAvailability[existingDayIndex] };
        if (!existingDay.breakSlots.some(b => b.startTime === newTimeRange.startTime && b.endTime === newTimeRange.endTime)) {
          existingDay.breakSlots = [...existingDay.breakSlots, newTimeRange].sort((a, b) => a.startTime.localeCompare(b.startTime));
          updatedDailyAvailability[existingDayIndex] = existingDay;
          return updatedDailyAvailability;
        }
      } else {
        return [...prevAvailability, { day: selectedDayForSlot, slots: [], breakSlots: [newTimeRange] }];
      }
      return prevAvailability;
    });
    setNewBreakStartTime('');
    setNewBreakEndTime('');
    setSelectedDayForSlot('');
    setAvailabilitySaveStatus('success');
  };

  const handleRemoveBreak = (day, breakToRemove) => {
    setDailyAvailability((prevAvailability) =>
      prevAvailability
        .map((item) =>
          item.day === day
            ? { ...item, breakSlots: item.breakSlots.filter((b) => !(b.startTime === breakToRemove.startTime && b.endTime === breakToRemove.endTime)) }
            : item
        )
        .filter((item) => item.slots.length > 0 || item.breakSlots.length > 0)
    );
    setAvailabilitySaveStatus('success');
  };

  const handleAddLeaveDate = () => {
    if (!newLeaveDate) {
      setAvailabilitySaveStatus('error');
      return;
    }
    const leaveInstant = new Date(`${newLeaveDate}T00:00:00.000Z`).toISOString();
    if (leaveDates.includes(leaveInstant)) {
      setAvailabilitySaveStatus('error');
      return;
    }
    setLeaveDates((prevDates) => [...prevDates, leaveInstant].sort());
    setNewLeaveDate('');
    setAvailabilitySaveStatus('success');
  };

  const handleRemoveLeaveDate = (dateToRemove) => {
    setLeaveDates((prevDates) => prevDates.filter((date) => date !== dateToRemove));
    setAvailabilitySaveStatus('success');
  };

  const updateAppointments = async (doctorId, leaveDates, dailyAvailability) => {
    setAppointmentUpdateStatus('loading');
    try {
      const payload = {
        doctorId: doctorId,
        leaveDates: leaveDates,
        dailySlots: dailyAvailability,
      };

      // Use port 2010 for appointments microservice
      const response = await fetch('http://localhost:2010/api/appointments/update-on-schedule-change', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update appointments: ${response.status} - ${errorText}`);
      }

      console.log('Appointments updated successfully.');
      setAppointmentUpdateStatus('success');
    } catch (err) {
      console.error('Error updating appointments:', err);
      setAppointmentUpdateStatus('error');
    }
  };

  const handleSaveAvailability = async () => {
    setSavingAvailability(true);
    setAvailabilitySaveStatus(null);
    setAppointmentUpdateStatus(null);

    const payload = {
      doctorId: doctorDetails.id,
      dailySlots: dailyAvailability,
      leaveDates: leaveDates,
    };

    try {
      let response;
      // Use port 2005 for doctor-availability microservice
      if (doctorAvailabilityId) {
        response = await fetch(`http://localhost:2005/api/doctor-availabilities/${doctorAvailabilityId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch('http://localhost:2005/api/doctor-availabilities', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to save availability: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      setDoctorAvailabilityId(result.id);
      setAvailabilitySaveStatus('success');
      console.log('Doctor availability saved successfully:', result);

      // Call a separate API to update appointments after saving availability
      await updateAppointments(doctorDetails.id, leaveDates, dailyAvailability);

      fetchData(); // Re-fetch data to update the displayed schedule table
    } catch (err) {
      console.error('Error saving availability:', err);
      setAvailabilitySaveStatus('error');
    } finally {
      setSavingAvailability(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setAvailabilitySaveStatus(null);
    setAppointmentUpdateStatus(null);
  };
  // --- End Schedule Management Functions ---

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', width: '100%' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.dark' }}>
        My Schedule
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', flexDirection: 'column' }}>
          <CircularProgress sx={{ mb: 2 }} />
          <Typography variant="h6">Loading Doctor Data...</Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <>
          {doctorDetails && (
            <Paper elevation={4} sx={{ p: { xs: 2, md: 3 }, mb: 4, borderRadius: 3, background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.dark' }}>
                Doctor Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PersonIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="body1">
                      <strong>Name:</strong> {doctorDetails.firstName} {doctorDetails.lastName}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <WorkIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="body1">
                      <strong>Specialization:</strong> {doctorDetails.specialization}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1">
                      <strong>Custom ID:</strong> {doctorDetails.customId || 'N/A'}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1">
                      <strong>Email:</strong> {doctorDetails.email || 'N/A'}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1">
                      <strong>Contact:</strong> {doctorDetails.contactNumber || 'N/A'}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          )}

          <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, mb: 4, borderRadius: 3, background: 'linear-gradient(145deg, #ffffff, #f0f2f5)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
              Manage My Availability
            </Typography>

            <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2, bgcolor: '#f5f7fa' }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                Daily Consultation Slots
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="day-select-label">Day of Week</InputLabel>
                    <Select
                      labelId="day-select-label"
                      id="day-select"
                      value={selectedDayForSlot}
                      label="Day of Week"
                      onChange={(e) => setSelectedDayForSlot(e.target.value)}
                    >
                      <MenuItem value=""><em>Select Day</em></MenuItem>
                      {DAYS_OF_WEEK.map((day) => (
                        <MenuItem key={day} value={day}>{day}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    label="Start Time"
                    type="time"
                    fullWidth
                    size="small"
                    value={newSlotStartTime}
                    onChange={(e) => setNewSlotStartTime(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    label="End Time"
                    type="time"
                    fullWidth
                    size="small"
                    value={newSlotEndTime}
                    onChange={(e) => setNewSlotEndTime(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={handleAddSlot}
                    fullWidth
                    size="small"
                  >
                    Add Slot
                  </Button>
                </Grid>
              </Grid>

              <List sx={{ mt: 2 }}>
                {dailyAvailability.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                    No daily slots set.
                  </Typography>
                ) : (
                  dailyAvailability.map((dayData) => (
                    <Box key={dayData.day} sx={{ mb: 1, borderBottom: '1px dashed #e0e0e0', pb: 1 }}>
                      <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 0.5, color: 'primary.dark' }}>
                        {dayData.day}:
                      </Typography>
                      <Stack direction="row" flexWrap="wrap" spacing={1}>
                        {dayData.slots.map((slot, index) => (
                          <Chip
                            key={`${dayData.day}-slot-${index}`}
                            label={`${formatInstantToHHMM(slot.startTime)} - ${formatInstantToHHMM(slot.endTime)}`}
                            onDelete={() => handleRemoveSlot(dayData.day, slot)}
                            deleteIcon={<RemoveCircleOutlineIcon />}
                            color="info"
                            variant="outlined"
                            size="small"
                            sx={{ mb: 1 }}
                          />
                        ))}
                      </Stack>
                      {dayData.breakSlots && dayData.breakSlots.length > 0 && (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="caption" color="text.secondary" display="block">Breaks:</Typography>
                          <Stack direction="row" flexWrap="wrap" spacing={1}>
                            {dayData.breakSlots.map((bSlot, index) => (
                              <Chip
                                key={`${dayData.day}-break-${index}`}
                                label={`${formatInstantToHHMM(bSlot.startTime)} - ${formatInstantToHHMM(bSlot.endTime)}`}
                                onDelete={() => handleRemoveBreak(dayData.day, bSlot)}
                                deleteIcon={<RemoveCircleOutlineIcon />}
                                color="warning"
                                variant="outlined"
                                size="small"
                                sx={{ mb: 1 }}
                              />
                            ))}
                          </Stack>
                        </Box>
                      )}
                    </Box>
                  ))
                )}
              </List>

              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                Add Daily Break Times
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="day-select-break-label">Day of Week (for Break)</InputLabel>
                    <Select
                      labelId="day-select-break-label"
                      id="day-select-break"
                      value={selectedDayForSlot}
                      label="Day of Week (for Break)"
                      onChange={(e) => setSelectedDayForSlot(e.target.value)}
                    >
                      <MenuItem value=""><em>Select Day</em></MenuItem>
                      {DAYS_OF_WEEK.map((day) => (
                        <MenuItem key={day} value={day}>{day}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    label="Break Start Time"
                    type="time"
                    fullWidth
                    size="small"
                    value={newBreakStartTime}
                    onChange={(e) => setNewBreakStartTime(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    label="Break End Time"
                    type="time"
                    fullWidth
                    size="small"
                    value={newBreakEndTime}
                    onChange={(e) => setNewBreakEndTime(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button
                    variant="contained"
                    color="warning"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={handleAddBreak}
                    fullWidth
                    size="small"
                  >
                    Add Break
                  </Button>
                </Grid>
              </Grid>
            </Paper>

            <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2, bgcolor: '#f5f7fa' }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                Doctor Leave Dates
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={8}>
                  <TextField
                    label="Leave Date"
                    type="date"
                    fullWidth
                    size="small"
                    value={newLeaveDate}
                    onChange={(e) => setNewLeaveDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={handleAddLeaveDate}
                    fullWidth
                    size="small"
                  >
                    Add Leave
                  </Button>
                </Grid>
              </Grid>

              <List sx={{ mt: 2 }}>
                {leaveDates.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                    No leave dates set.
                  </Typography>
                ) : (
                  leaveDates.map((date, index) => (
                    <ListItem
                      key={date + index}
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveLeaveDate(date)}>
                          <RemoveCircleOutlineIcon color="error" />
                        </IconButton>
                      }
                      sx={{ borderBottom: '1px dashed #e0e0e0', mb: 1 }}
                    >
                      <ListItemText primary={new Date(date).toLocaleDateString()} />
                    </ListItem>
                  ))
                )}
              </List>
            </Paper>

            <Button
              variant="contained"
              color="secondary"
              startIcon={
                savingAvailability || appointmentUpdateStatus === 'loading'
                  ? <CircularProgress size={20} color="inherit" />
                  : <SaveIcon />
              }
              onClick={handleSaveAvailability}
              disabled={savingAvailability || !doctorDetails || !doctorDetails.id}
              fullWidth
              sx={{ py: 1.5, fontSize: '1.1rem', fontWeight: 'bold' }}
            >
              {savingAvailability || appointmentUpdateStatus === 'loading' ? 'Saving Schedule...' : 'Save My Availability'}
            </Button>
          </Paper>

          {scheduleData.length === 0 ? (
            <Alert severity="info" sx={{ mb: 3 }}>
              No schedule entries found for this doctor.
            </Alert>
          ) : (
            <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, background: 'linear-gradient(145deg, #ffffff, #f0f2f5)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
                Upcoming Activities
              </Typography>

              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="doctor schedule table">
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#e3f2fd' }}>
                      <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Day/Date</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Time</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Type</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Activity</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Location</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {scheduleData.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.type === 'Leave' ? (
                            <>
                              <CalendarTodayIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                              {row.date || 'N/A'}
                            </>
                          ) : (
                            <>
                              <CalendarTodayIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                              {row.day || 'N/A'}
                            </>
                          )}
                        </TableCell>
                        <TableCell><AccessTimeIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />{row.time || 'N/A'}</TableCell>
                        <TableCell>
                          <Chip
                            label={row.type || 'N/A'}
                            color={row.type === 'Break' ? 'warning' : (row.type === 'Leave' ? 'error' : 'primary')}
                            size="small"
                            icon={getIconForType(row.type)}
                          />
                        </TableCell>
                        <TableCell>{row.activity || 'N/A'}</TableCell>
                        <TableCell><LocationOnIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />{row.location || 'N/A'}</TableCell>
                        <TableCell>
                          <Chip label={row.status || 'Unknown'} color={getStatusColor(row.status, row.type)} size="small" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}
        </>
      )}

      <Box sx={{ mt: 6, opacity: 0.7, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          View and manage your personal work schedule and availability.
        </Typography>
      </Box>

      <Snackbar
        open={Boolean(availabilitySaveStatus)}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={availabilitySaveStatus === 'success' ? 'success' : 'error'}
          variant="filled"
          sx={{ borderRadius: 3 }}
        >
          {availabilitySaveStatus === 'success' ? 'Availability saved successfully!' :
            `Error saving availability: ${error || 'Please check console for details.'}`}
        </Alert>
      </Snackbar>

      <Snackbar
        open={Boolean(appointmentUpdateStatus)}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={appointmentUpdateStatus === 'success' ? 'success' : 'error'}
          variant="filled"
          sx={{ borderRadius: 3 }}
        >
          {appointmentUpdateStatus === 'success' ? 'Appointments updated successfully!' :
            `Error updating appointments. Please contact support.`}
        </Alert>
      </Snackbar>
    </Box>
  );
};

DoctorMySchedule.propTypes = {
  doctorUser: PropTypes.shape({
    userId: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    profilePic: PropTypes.string,
  }),
};

export default DoctorMySchedule;