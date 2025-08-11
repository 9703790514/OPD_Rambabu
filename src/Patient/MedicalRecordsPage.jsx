import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Grid,
  Fade,
  Zoom,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import BiotechIcon from '@mui/icons-material/Biotech';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Define a custom Material-UI theme for a clean and modern medical aesthetic
const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
    h4: { fontWeight: 900, fontSize: '2.5rem', letterSpacing: '-0.05em' },
    h5: { fontWeight: 800, fontSize: '1.8rem' },
    h6: { fontWeight: 700, fontSize: '1.4rem' },
    body1: { fontSize: '1.05rem', lineHeight: 1.7 },
    body2: { fontSize: '0.95rem', lineHeight: 1.6 },
  },
  palette: {
    primary: { main: '#0077b6', light: '#48a9e0', dark: '#005f93' }, // Professional blue
    secondary: { main: '#48cae4', light: '#7be1ff', dark: '#37a5be' }, // Calming lighter blue
    success: { main: '#00b400', light: '#33d433', dark: '#008b00' }, // Green for success
    error: { main: '#e63946' }, // Red for errors
    info: { main: '#0096c7' }, // Blue for info icons
    background: { default: '#f0f4f8', paper: '#ffffff' }, // Subtle light grey background
    text: { primary: '#2d3748', secondary: '#718096' },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          transition: 'box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.3s',
          '&:hover': {
            boxShadow: '0 12px 36px rgba(0,0,0,0.12)',
            transform: 'translateY(-2px)',
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
          padding: '10px 24px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
          },
        },
      },
    },
  },
});

const StyledHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  fontSize: 'clamp(2rem, 5vw, 3rem)',
  letterSpacing: '-0.05em',
  color: theme.palette.primary.main,
  position: 'relative',
  display: 'inline-block',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -10,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60%',
    height: 4,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 2,
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.background.default,
  },
}));

// Main Medical Records Page Component
const MedicalRecordsPage = ({ medicalRecordId, appointmentId, onBack, onNavigate }) => {
  const [medicalRecord, setMedicalRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Console log both the medical record ID and the appointment ID for debugging
    console.log("Viewing Medical Record ID:", medicalRecordId);
    console.log("Associated Appointment ID:", appointmentId);

    const fetchMedicalRecord = async () => {
      if (!medicalRecordId) {
        setError("Medical Record ID is not available.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:2006/api/medical-records/${medicalRecordId}`);
        if (!response.ok) {
          if (response.status === 404) {
            setMedicalRecord(null);
            return;
          }
          const errorText = await response.text();
          throw new Error(`Failed to fetch medical record: ${response.status} - ${errorText}`);
        }
        const data = await response.json();
        setMedicalRecord(data);
      } catch (err) {
        setError(err.message || "Failed to load medical record.");
      } finally {
        setLoading(false);
      }
    };
    fetchMedicalRecord();
  }, [medicalRecordId]);

  const handleViewPrescription = () => {
    if (onNavigate) {
      onNavigate(`prescriptions/${medicalRecordId}`);
    }
  };

  const handleViewLabReports = () => {
    if (onNavigate) {
      onNavigate(`lab-reports/${medicalRecordId}`);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          p: { xs: 2, md: 4 },
          bgcolor: 'background.default',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ maxWidth: 900, mx: 'auto', width: '100%' }}>
          <Fade in timeout={500}>
            <Box sx={{ mb: 3 }}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<ArrowBackIcon />}
                onClick={onBack}
                sx={{
                  mb: 3,
                  boxShadow: 'none',
                  '&:hover': { boxShadow: '0 4px 8px rgba(0,0,0,0.1)' },
                }}
              >
                Back to Appointments
              </Button>
            </Box>
          </Fade>

          <Fade in timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <StyledHeader variant="h4" component="h1" gutterBottom>
                Medical Record Details
              </StyledHeader>
              <Typography variant="body1" color="text.secondary">
                Viewing details for record ID: **{medicalRecordId || 'N/A'}**
              </Typography>
            </Box>
          </Fade>

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <CircularProgress color="primary" />
              <Typography variant="h6" sx={{ ml: 2, color: 'text.secondary' }}>
                Loading Medical Record...
              </Typography>
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {!loading && !error && !medicalRecord && (
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body1">
                No medical record found for this appointment.
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                The doctor may not have created a record yet. Please check back later.
              </Typography>
            </Alert>
          )}

          {!loading && !error && medicalRecord && (
            <Zoom in={true} timeout={600}>
              <Paper
                elevation={6}
                sx={{
                  p: { xs: 2, md: 4 },
                  background: 'linear-gradient(145deg, #ffffff, #f0f4f8)',
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
                  Record Overview
                </Typography>
                <List disablePadding>
                  <StyledListItem alignItems="flex-start">
                    <ListItemText
                      primary={
                        <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                          <EventNoteIcon sx={{ mr: 1, color: 'info.main' }} />
                          Record ID: {medicalRecord._id || 'N/A'}
                        </Typography>
                      }
                      secondary={medicalRecord.customId ? `(Custom ID: ${medicalRecord.customId})` : ''}
                    />
                  </StyledListItem>
                  <Divider component="li" variant="inset" />
                  <StyledListItem alignItems="flex-start">
                    <ListItemText
                      primary={<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Chief Complaint</Typography>}
                      secondary={<Typography component="span" variant="body2" color="text.primary">{medicalRecord.chiefComplaint || 'N/A'}</Typography>}
                    />
                  </StyledListItem>
                  <Divider component="li" variant="inset" />
                  <StyledListItem alignItems="flex-start">
                    <ListItemText
                      primary={<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Diagnosis</Typography>}
                      secondary={<Typography component="span" variant="body2" color="text.primary">{medicalRecord.diagnosis || 'No diagnosis provided'}</Typography>}
                    />
                  </StyledListItem>
                  <Divider component="li" variant="inset" />
                  <StyledListItem alignItems="flex-start">
                    <ListItemText
                      primary={<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Treatment Plan</Typography>}
                      secondary={<Typography component="span" variant="body2" color="text.primary">{medicalRecord.treatmentPlan || 'No treatment plan details'}</Typography>}
                    />
                  </StyledListItem>
                  <Divider component="li" variant="inset" />
                  <StyledListItem alignItems="flex-start">
                    <ListItemText
                      primary={<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Notes</Typography>}
                      secondary={<Typography component="span" variant="body2" color="text.primary">{medicalRecord.notes || 'No notes provided'}</Typography>}
                    />
                  </StyledListItem>
                  <Divider component="li" variant="inset" />
                  <StyledListItem>
                    <ListItemText
                      primary={<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Patient ID</Typography>}
                      secondary={<Typography component="span" variant="body2" color="text.primary">{medicalRecord.patientId || 'N/A'}</Typography>}
                    />
                  </StyledListItem>
                  <StyledListItem>
                    <ListItemText
                      primary={<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Recorded On</Typography>}
                      secondary={<Typography component="span" variant="body2" color="text.primary">{medicalRecord.recordDate ? new Date(medicalRecord.recordDate).toLocaleDateString() : 'N/A'}</Typography>}
                    />
                  </StyledListItem>
                </List>

                <Grid container spacing={2} sx={{ mt: 3, justifyContent: 'center' }}>
                  <Grid item>
                    <Button variant="contained" color="primary" startIcon={<ReceiptLongIcon />} onClick={handleViewPrescription}>
                      Prescription
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="secondary" startIcon={<BiotechIcon />} onClick={handleViewLabReports}>
                      Lab Reports
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Zoom>
          )}

          <Fade in timeout={1500}>
            <Box sx={{ mt: 6, opacity: 0.7, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Detailed medical history for the selected patient.
              </Typography>
            </Box>
          </Fade>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

MedicalRecordsPage.propTypes = {
  medicalRecordId: PropTypes.string,
  appointmentId: PropTypes.string,
  onBack: PropTypes.func.isRequired,
  onNavigate: PropTypes.func,
};

export default MedicalRecordsPage;