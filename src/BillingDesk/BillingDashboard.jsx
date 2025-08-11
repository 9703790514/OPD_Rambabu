import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, CircularProgress, Alert, Button, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

// Import the sub-components
import AppointmentCard from './AppointmentCard';
import BillingDeskGenerateBill from './BillingDeskGenerateBill';
import BillInvoiceDisplay from './BillInvoiceDisplay';

const BillingDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [generatedBillData, setGeneratedBillData] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('http://localhost:2010/api/appointments');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAppointments(data);
        setFilteredAppointments(data);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
        setError(`Failed to load appointments: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredAppointments(appointments);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = appointments.filter(appointment =>
        (appointment.id?.toString().toLowerCase().includes(lowercasedQuery)) ||
        (appointment.patientId?.toString().toLowerCase().includes(lowercasedQuery)) ||
        (appointment.doctorId?.toString().toLowerCase().includes(lowercasedQuery))
      );
      setFilteredAppointments(filtered);
    }
  }, [searchQuery, appointments]);

  const handleAppointmentSelect = (appointment) => {
    setSelectedAppointment(appointment);
    setGeneratedBillData(null);
  };

  const handleBackToAppointments = () => {
    setSelectedAppointment(null);
    setGeneratedBillData(null);
  };

  const handleBillGenerated = (billData) => {
    setGeneratedBillData(billData);
    setSelectedAppointment(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Loading Appointments...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button onClick={handleBackToAppointments} sx={{ mt: 2 }} startIcon={<ArrowBackIcon />}>
          Back to Appointments
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', width: '100%' }}>
      {generatedBillData ? (
        <Box>
          <BillInvoiceDisplay bill={generatedBillData} />
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBackToAppointments}
              startIcon={<ArrowBackIcon />}
              sx={{ px: 4, py: 1.5 }}
            >
              Generate Another Bill / View Appointments
            </Button>
          </Box>
        </Box>
      ) : selectedAppointment ? (
        <Box>
          <Button
            onClick={handleBackToAppointments}
            sx={{ mb: 2 }}
            startIcon={<ArrowBackIcon />}
            variant="outlined"
          >
            Back to Appointments
          </Button>
          <BillingDeskGenerateBill
            appointment={selectedAppointment}
            onBillGenerated={handleBillGenerated}
            onCancel={handleBackToAppointments}
          />
        </Box>
      ) : (
        <>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{ mb: 4, fontWeight: 'bold', color: 'primary.dark', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}
          >
            <EventAvailableIcon sx={{ fontSize: 'inherit' }} /> Select Appointment for Billing
          </Typography>
          
          <Box sx={{ mb: 4, width: { xs: '100%', md: '50%' }, mx: 'auto' }}>
            <TextField
              fullWidth
              label="Search by Appointment ID, Patient ID, or Doctor ID"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>

          <Grid container spacing={3}>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <Grid item xs={12} sm={6} md={4} key={appointment.id}>
                  <AppointmentCard
                    appointment={appointment}
                    onClick={handleAppointmentSelect}
                  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="h6" color="text.secondary" align="center">
                  {searchQuery ? "No matching appointments found." : "No upcoming appointments found."}
                </Typography>
              </Grid>
            )}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default BillingDashboard;