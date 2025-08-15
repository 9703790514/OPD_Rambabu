import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'; // Icon for Room

const DoctorTodayAppointments = ({ doctorUser, onViewMedicalRecords }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formattedTodayDate, setFormattedTodayDate] = useState('');
  const [updatingAppointmentId, setUpdatingAppointmentId] = useState(null); // New state to track which appointment is being updated

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
      // Step 1: Fetch the doctor's details using the customId
      const doctorResponse = await fetch(`http://localhost:2005/api/doctors/customId/${doctorUser.userId}`);
      if (!doctorResponse.ok) {
        throw new Error(`Failed to fetch doctor details: ${doctorResponse.status}`);
      }
      const doctorDetails = await doctorResponse.json();
      const doctorMongoId = doctorDetails.id; // Use the 'id' field from the response

      console.log("Fetched doctor's MongoDB ID:", doctorMongoId);
      console.log("Fetching appointments for date:", currentFormattedDate);

      // Step 2: Use the fetched _id to get today's appointments
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
        console.log("Today's Appointments fetched successfully:", data);
      }
    } catch (err) {
      console.error("Error fetching today's appointments:", err);
      setError(err.message || "Failed to load today's appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorAndAppointments();
  }, [doctorUser.userId]);

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
  
  // New function to handle completing an appointment
  const handleCompleteAppointment = async (appointmentId) => {
    setUpdatingAppointmentId(appointmentId); // Set loading state for this specific button
    try {
      // API call to update the appointment status to 'Completed'
      const response = await fetch(`http://localhost:2010/api/appointments/${appointmentId}/status`, {
        method: 'PATCH', // Or 'PUT' depending on your API
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
  
      // Re-fetch appointments to update the UI with the new status
      fetchDoctorAndAppointments(); // Re-calling the main fetch function to refresh the data
  
    } catch (err) {
      console.error("Error completing appointment:", err);
      // Optionally, you could set a component-level error state here
    } finally {
      setUpdatingAppointmentId(null); // Reset loading state
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', width: '100%' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 1, fontWeight: 'bold', color: 'primary.dark' }}>
        Today's Appointments
      </Typography>
      {/* ADDED DATE DISPLAY HERE */}
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
          {appointments.map((row) => (
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
                  {/* View Medical Records button - only show if medicalRecordId exists */}
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
                  {/* New Complete button - only show if status is not 'Completed' */}
                  {row.status !== 'Completed' && row.status !== 'Cancelled' && (
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      onClick={() => handleCompleteAppointment(row.id)}
                      disabled={updatingAppointmentId === row.id} // Disable button while updating
                      sx={{ ml: 1 }}
                    >
                      {updatingAppointmentId === row.id ? <CircularProgress size={24} /> : 'Complete'}
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
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
  }),
  onViewMedicalRecords: PropTypes.func.isRequired,
};

export default DoctorTodayAppointments;