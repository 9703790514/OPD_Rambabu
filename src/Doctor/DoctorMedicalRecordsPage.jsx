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
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ScienceIcon from '@mui/icons-material/Science';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import HealingIcon from '@mui/icons-material/Healing';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'; // Icon for Prescription
import BiotechIcon from '@mui/icons-material/Biotech'; // Icon for Lab Reports

const DoctorMedicalRecordsPage = ({ medicalRecordId, onBack, onNavigate }) => { // Added onNavigate prop
  const [medicalRecord, setMedicalRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedicalRecord = async () => {
      if (!medicalRecordId) {
        setError("Medical Record ID is not available for fetching medical records.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      console.log(`Fetching medical record for ID: ${medicalRecordId} from http://localhost:2006/api/medical-records/${medicalRecordId}`);

      try {
        const response = await fetch(`http://localhost:2006/api/medical-records/${medicalRecordId}`);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch medical record: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        setMedicalRecord(data);
        console.log("Medical Record fetched successfully:", data);
      } catch (err) {
        console.error("Error fetching medical record:", err);
        setError(err.message || "Failed to load medical record.");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalRecord();
  }, [medicalRecordId]);

  const handleViewPrescription = () => {
    console.log(`Navigating to Prescription for Medical Record ID: ${medicalRecordId}`);
    onNavigate(`prescriptions-detail/${medicalRecordId}`); // Navigate to prescriptions page
  };

  const handleViewLabReports = () => {
    console.log(`Navigating to Lab Reports for Medical Record ID: ${medicalRecordId}`);
    onNavigate(`diagnostic-tests-detail/${medicalRecordId}`); // Navigate to diagnostic tests page
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 900, mx: 'auto', width: '100%' }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={onBack}
        sx={{ mb: 3 }}
      >
        Back to Appointments
      </Button>

      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.dark' }}>
        Medical Record Details: {medicalRecordId || 'N/A'}
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ ml: 2 }}>Loading Medical Record...</Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && !medicalRecord && (
        <Alert severity="info" sx={{ mb: 3 }}>
          No medical record found for this ID.
        </Alert>
      )}

      {!loading && !error && medicalRecord && (
        <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, background: 'linear-gradient(145deg, #ffffff, #f0f2f5)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
            Record Overview
          </Typography>
          <List>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <EventNoteIcon sx={{ mr: 1, color: 'info.main' }} />
                      Record ID: {medicalRecord.id || 'N/A'} {medicalRecord.customId ? `(Custom ID: ${medicalRecord.customId})` : ''}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography component="span" variant="body2" color="text.primary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <PersonIcon fontSize="small" sx={{ mr: 1 }} />
                        Patient ID: {medicalRecord.patientId || 'N/A'}
                      </Typography>
                      <Typography component="span" variant="body2" color="text.primary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <AssignmentIcon fontSize="small" sx={{ mr: 1 }} />
                        Chief Complaint: {medicalRecord.chiefComplaint || 'N/A'}
                      </Typography>
                      <Typography component="span" variant="body2" color="text.primary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <ScienceIcon fontSize="small" sx={{ mr: 1 }} />
                        Diagnosis: {medicalRecord.diagnosis || 'No diagnosis provided'}
                      </Typography>
                      <Typography component="span" variant="body2" color="text.primary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <HealingIcon fontSize="small" sx={{ mr: 1 }} />
                        Treatment Plan: {medicalRecord.treatmentPlan || 'No treatment plan details'}
                      </Typography>
                      <Typography component="span" variant="body2" color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
                        <DescriptionIcon fontSize="small" sx={{ mr: 1 }} />
                        Notes: {medicalRecord.notes || 'No notes provided'}
                      </Typography>
                      <Typography component="span" variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Recorded on: {medicalRecord.recordDate ? new Date(medicalRecord.recordDate).toLocaleDateString() : 'N/A'}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
          </List>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}> {/* Button Container */}
            <Button
              variant="contained"
              color="primary"
              startIcon={<ReceiptLongIcon />}
              onClick={handleViewPrescription}
              sx={{ py: 1, px: 2, fontWeight: 'bold', borderRadius: 2 }}
            >
              Prescription
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<BiotechIcon />}
              onClick={handleViewLabReports}
              sx={{ py: 1, px: 2, fontWeight: 'bold', borderRadius: 2 }}
            >
              Lab Reports
            </Button>
          </Box>
        </Paper>
      )}

      <Box sx={{ mt: 6, opacity: 0.7, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Detailed medical history for the selected patient.
        </Typography>
      </Box>
    </Box>
  );
};

DoctorMedicalRecordsPage.propTypes = {
  medicalRecordId: PropTypes.string,
  onBack: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired, // Added propType for onNavigate
};

export default DoctorMedicalRecordsPage;
