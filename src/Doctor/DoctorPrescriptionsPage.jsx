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
  TextField,
  Chip,
  Grid,
  useTheme,
  Slide,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import ScienceIcon from '@mui/icons-material/Science';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

// Custom hook to debounce a value
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const DoctorPrescriptionsPage = ({ medicalRecordId, onBack }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [prescriptionType, setPrescriptionType] = useState('Medicine');
  const theme = useTheme();

  const [localPrescription, setLocalPrescription] = useState({
    prescriptionType: 'Medicine',
    medicationName: '',
    dosage: '',
    frequency: '',
    route: '',
    testName: '',
    instructions: '',
    startDate: new Date().toISOString().slice(0, 10),
    endDate: '',
    notes: '',
    medicalRecordId: medicalRecordId,
  });

  const [newPrescription, setNewPrescription] = useState(localPrescription);
  const debouncedLocalPrescription = useDebounce(localPrescription, 500);

  useEffect(() => {
    setNewPrescription(debouncedLocalPrescription);
  }, [debouncedLocalPrescription]);

  const prescribedByDoctorId = 'doctor-123';

  /**
   * Fetches prescriptions from the backend based on the medical record ID.
   */
  const fetchPrescriptions = async () => {
    if (!medicalRecordId) {
      setError("Medical Record ID is not available for fetching prescriptions.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:2006/api/prescriptions/medical/${medicalRecordId}`);
      if (!response.ok) {
        // Handle 404 specifically for a clear "No prescriptions" message
        if (response.status === 404) {
          setPrescriptions([]); // Clear old prescriptions if none are found
          setLoading(false);
          return;
        }
        const errorText = await response.text();
        throw new Error(`Failed to fetch prescriptions: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      setPrescriptions(data);
    } catch (err) {
      console.error("Error fetching prescriptions:", err);
      setPrescriptions([]); // Clear old prescriptions on any fetch error
      setError(err.message || "Failed to load prescriptions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, [medicalRecordId]);

  const handleOpenForm = (type) => {
    setIsFormOpen(true);
    setPrescriptionType(type);
    const newState = {
      prescriptionType: type,
      medicationName: '',
      dosage: '',
      frequency: '',
      route: '',
      testName: '',
      instructions: '',
      startDate: new Date().toISOString().slice(0, 10),
      endDate: '',
      notes: '',
      medicalRecordId: medicalRecordId,
    };
    setLocalPrescription(newState);
    setNewPrescription(newState);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    const initialState = {
      prescriptionType: 'Medicine',
      medicationName: '',
      dosage: '',
      frequency: '',
      route: '',
      testName: '',
      instructions: '',
      startDate: new Date().toISOString().slice(0, 10),
      endDate: '',
      notes: '',
      medicalRecordId: medicalRecordId,
    };
    setNewPrescription(initialState);
    setLocalPrescription(initialState);
    setPrescriptionType('Medicine');
  };

  const handleLocalFormChange = (e) => {
    const { name, value } = e.target;
    setLocalPrescription(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddPrescription = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    setError(null);

    const formattedPrescription = {
      ...newPrescription,
      startDate: newPrescription.startDate ? `${newPrescription.startDate}T00:00:00` : null,
      endDate: newPrescription.endDate ? `${newPrescription.endDate}T00:00:00` : null,
      prescribedByDoctorId: prescribedByDoctorId,
      prescriptionDate: new Date().toISOString(),
      medicalRecordId: medicalRecordId,
    };

    try {
      const response = await fetch('http://localhost:2006/api/prescriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedPrescription),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add prescription: ${response.status} - ${errorText}`);
      }

      fetchPrescriptions();
      handleCloseForm();
    } catch (err) {
      console.error("Error adding new prescription:", err);
      setError(err.message || "Failed to add prescription.");
    } finally {
      setIsAdding(false);
    }
  };

  const renderPrescriptionDetails = (prescription) => {
    if (prescription.prescriptionType === 'Medicine') {
      return (
        <Box>
          <Typography component="span" variant="body2" color="text.primary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
            Dosage: **{prescription.dosage || 'N/A'}** - Frequency: **{prescription.frequency || 'N/A'}**
          </Typography>
          <Typography component="span" variant="body2" color="text.primary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <DirectionsRunIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
            Route: **{prescription.route || 'N/A'}**
          </Typography>
        </Box>
      );
    } else if (prescription.prescriptionType === 'Test') {
      return (
        <Box>
          <Typography component="span" variant="body2" color="text.primary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <MedicalInformationIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
            Test Name: **{prescription.medicationName || 'N/A'}**
          </Typography>
          <Typography component="span" variant="body2" color="text.primary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <DescriptionIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
            Instructions: **{prescription.notes || 'N/A'}**
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 900, mx: 'auto', width: '100%' }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={onBack}
        sx={{ mb: 3 }}
      >
        Back to Medical Record Details
      </Button>

      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.dark' }}>
        Prescriptions for Medical Record: {medicalRecordId || 'N/A'}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setIsFormOpen(true)}
          disabled={isFormOpen}
        >
          Create New Prescription
        </Button>
      </Box>

      {isFormOpen && (
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2, justifyContent: 'flex-end' }}>
            <Button
              variant={prescriptionType === 'Medicine' ? 'contained' : 'outlined'}
              color="info"
              startIcon={<LocalPharmacyIcon />}
              onClick={() => handleOpenForm('Medicine')}
            >
              Add Medicine
            </Button>
            <Button
              variant={prescriptionType === 'Test' ? 'contained' : 'outlined'}
              color="success"
              startIcon={<ScienceIcon />}
              onClick={() => handleOpenForm('Test')}
            >
              Add Test
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleCloseForm}
              disabled={isAdding}
            >
              Cancel
            </Button>
          </Box>

          <Slide direction="up" in={isFormOpen} mountOnEnter unmountOnExit>
            <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, background: theme.palette.background.paper, boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
              <Typography variant="h5" sx={{ mb: 3 }}>
                Add New {prescriptionType} Prescription
              </Typography>
              <form onSubmit={handleAddPrescription}>
                <Box sx={{ minHeight: 350 }}>
                  {prescriptionType === 'Medicine' ? (
                    <>
                      <TextField
                        autoFocus
                        margin="dense"
                        name="medicationName"
                        label="Medication Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={localPrescription.medicationName}
                        onChange={handleLocalFormChange}
                        required
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        margin="dense"
                        name="dosage"
                        label="Dosage"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={localPrescription.dosage}
                        onChange={handleLocalFormChange}
                        required
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        margin="dense"
                        name="frequency"
                        label="Frequency"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={localPrescription.frequency}
                        onChange={handleLocalFormChange}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        margin="dense"
                        name="route"
                        label="Route"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={localPrescription.route}
                        onChange={handleLocalFormChange}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        margin="dense"
                        name="notes"
                        label="Additional Notes"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={localPrescription.notes}
                        onChange={handleLocalFormChange}
                        sx={{ mb: 2 }}
                      />
                    </>
                  ) : (
                    <>
                      <TextField
                        autoFocus
                        margin="dense"
                        name="medicationName"
                        label="Test Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={localPrescription.medicationName}
                        onChange={handleLocalFormChange}
                        required
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        margin="dense"
                        name="notes"
                        label="Instructions for Test"
                        type="text"
                        fullWidth
                        multiline
                        rows={2}
                        variant="outlined"
                        value={localPrescription.notes}
                        onChange={handleLocalFormChange}
                        sx={{ mb: 2 }}
                      />
                    </>
                  )}
                </Box>
                <TextField
                  margin="dense"
                  name="startDate"
                  label="Start Date"
                  type="date"
                  fullWidth
                  variant="outlined"
                  value={localPrescription.startDate}
                  onChange={handleLocalFormChange}
                  InputLabelProps={{ shrink: true }}
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="dense"
                  name="endDate"
                  label="End Date"
                  type="date"
                  fullWidth
                  variant="outlined"
                  value={localPrescription.endDate}
                  onChange={handleLocalFormChange}
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                  <Button onClick={handleCloseForm} disabled={isAdding}>Cancel</Button>
                  <Button type="submit" variant="contained" color="primary" disabled={isAdding}>
                    {isAdding ? <CircularProgress size={24} /> : 'Add Prescription'}
                  </Button>
                </Box>
              </form>
            </Paper>
          </Slide>
        </Box>
      )}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ ml: 2 }}>Loading Prescriptions...</Typography>
        </Box>
      )}

      {/* Corrected logic for showing "No prescriptions found" */}
      {!loading && (error || prescriptions.length === 0) && (
        <Alert severity={error ? "error" : "info"} sx={{ mb: 3 }}>
          {error || "No prescriptions found for this medical record."}
        </Alert>
      )}

      {!loading && !error && prescriptions.length > 0 && (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
          <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, background: theme.palette.background.paper, boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: theme.palette.primary.main }}>
              Prescription List
            </Typography>
            <List>
              {prescriptions.map((prescription, index) => (
                <React.Fragment key={prescription.id || index}>
                  <ListItem alignItems="flex-start" sx={{ mb: 2 }}>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          {prescription.prescriptionType === 'Medicine' ? (
                            <LocalPharmacyIcon sx={{ mr: 1, color: theme.palette.info.main }} />
                          ) : (
                            <ScienceIcon sx={{ mr: 1, color: theme.palette.success.main }} />
                          )}
                          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                            {prescription.prescriptionType === 'Medicine'
                              ? `Medication: ${prescription.medicationName || 'N/A'}`
                              : `Lab Test: ${prescription.medicationName || 'N/A'}`
                            }
                          </Typography>
                          <Chip
                            label={prescription.prescriptionType === 'Medicine' ? 'Medicine' : 'Test'}
                            color={prescription.prescriptionType === 'Medicine' ? 'info' : 'success'}
                            size="small"
                            sx={{ ml: 2, fontWeight: 600 }}
                          />
                        </Box>
                      }
                      secondary={
                        <Grid container spacing={1} sx={{ mt: 1 }}>
                          <Grid item xs={12}>
                            {renderPrescriptionDetails(prescription)}
                          </Grid>
                          <Grid item xs={12}>
                            <Typography component="span" variant="body2" color="text.primary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                              <CalendarMonthIcon fontSize="small" sx={{ mr: 1 }} />
                              Start Date: **{prescription.startDate ? new Date(prescription.startDate).toLocaleDateString() : 'N/A'}**
                            </Typography>
                            <Typography component="span" variant="body2" color="text.primary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                              <CalendarMonthIcon fontSize="small" sx={{ mr: 1 }} />
                              End Date: **{prescription.endDate ? new Date(prescription.endDate).toLocaleDateString() : 'N/A'}**
                            </Typography>
                            <Typography component="span" variant="body2" color="text.primary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                              <DescriptionIcon fontSize="small" sx={{ mr: 1 }} />
                              Notes: **{prescription.notes || 'No notes provided'}**
                            </Typography>
                            <Typography component="span" variant="body2" color="text.secondary" sx={{ mt: 1, display: 'block', fontStyle: 'italic' }}>
                              Prescribed by Doctor ID: {prescription.prescribedByDoctorId || 'N/A'} on {prescription.prescriptionDate ? new Date(prescription.prescriptionDate).toLocaleDateString() : 'N/A'}
                            </Typography>
                          </Grid>
                        </Grid>
                      }
                    />
                  </ListItem>
                  {index < prescriptions.length - 1 && <Divider component="li" variant="inset" sx={{ my: 2 }} />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Slide>
      )}
    </Box>
  );
};

DoctorPrescriptionsPage.propTypes = {
  medicalRecordId: PropTypes.string,
  onBack: PropTypes.func.isRequired,
};

export default DoctorPrescriptionsPage;