import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Typography, Paper, Grid, Card, CardContent, CircularProgress, Button, Chip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MedicationIcon from '@mui/icons-material/Medication';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';
import ScienceIcon from '@mui/icons-material/Science';
import AssignmentIcon from '@mui/icons-material/Assignment';

const LabTechnicianPrescriptions = ({ medicalRecordId, onBack }) => {
  const [labTests, setLabTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      if (!medicalRecordId) {
        setError("Medical Record ID is missing. Cannot fetch prescriptions.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`http://localhost:2006/api/prescriptions/medical/${medicalRecordId}`);

        if (response.status === 204 || response.headers.get('content-length') === '0') {
          console.log(`No prescriptions found for medical record ID: ${medicalRecordId} (204 No Content).`);
          setLabTests([]);
          setLoading(false);
          return;
        }

        if (!response.ok) {
          const errorBody = await response.text();
          throw new Error(`Failed to fetch prescriptions: ${response.status} ${response.statusText} - ${errorBody}`);
        }

        const text = await response.text();
        let data = [];
        try {
          data = text ? JSON.parse(text) : [];
        } catch (jsonError) {
          console.error("Error parsing JSON response for prescriptions:", jsonError);
          throw new Error("Invalid JSON response from server.");
        }

        // Filter for only 'Test' prescriptions
        const tests = data.filter(prescription => prescription.prescriptionType === 'Test');
        console.log(`Fetched and filtered lab tests for medical record ID: ${medicalRecordId}:`, tests);
        setLabTests(tests);

      } catch (err) {
        console.error("Error fetching prescriptions:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, [medicalRecordId]);

  if (loading) {
    return (
      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', width: '100%', textAlign: 'center' }}>
        <CircularProgress sx={{ mt: 5 }} />
        <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
          Loading lab test orders...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', width: '100%', textAlign: 'center' }}>
        <Typography variant="h6" color="error" sx={{ mt: 5 }}>
          Error: {error}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          Failed to load lab test orders. Please try again later.
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{ mt: 3 }}
        >
          Back to Medical Records
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', width: '100%' }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={onBack}
        sx={{ mb: 4, px: 3, py: 1.2, fontWeight: 600, textTransform: 'none' }}
      >
        Back to Medical Records
      </Button>

      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.dark' }}>
        Lab Tests for Medical Record ID: {medicalRecordId}
      </Typography>

      {labTests.length === 0 ? (
        <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, background: 'linear-gradient(145deg, #ffffff, #f0f2f5)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No lab tests found for this medical record.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Lab test orders will appear here if issued.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {labTests.map((prescription) => (
            <Grid item xs={12} sm={6} md={4} key={prescription.id}>
              <Card elevation={6} sx={{
                borderRadius: 3,
                p: 2,
                background: 'linear-gradient(145deg, #ffffff, #f0f2f5)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    <ScienceIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                    {prescription.medicationName || 'N/A'}
                  </Typography>
                  <Chip
                    label="Test Order"
                    color="primary"
                    size="small"
                    sx={{ mb: 1.5, fontWeight: 'bold' }}
                  />
                  <Box sx={{ mb: 1.5 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
                      <strong>Prescription Date:</strong> {new Date(prescription.prescriptionDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                      <AssignmentIcon fontSize="small" sx={{ mr: 1 }} />
                      <strong>Instructions:</strong> {prescription.notes || 'N/A'}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ mt: 6, opacity: 0.7, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Detailed lab test orders for the selected medical record.
        </Typography>
      </Box>
    </Box>
  );
};

LabTechnicianPrescriptions.propTypes = {
  medicalRecordId: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default LabTechnicianPrescriptions;