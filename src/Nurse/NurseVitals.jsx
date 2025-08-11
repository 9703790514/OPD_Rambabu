import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
    Box, Typography, Paper, Button, Divider, List, ListItem, ListItemIcon, 
    ListItemText, TextField, CircularProgress, Alert, Grid, FormControl, 
    InputLabel, Select, MenuItem 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'; // For weight
import HeightIcon from '@mui/icons-material/Height'; // For height

// Mock data for demonstration purposes
const mockVitalsData = {
    "id": "6890f0513ae9f11e4c956b03",
    "appointmentId": "A1001",
    "patientId": "P001",
    "date": "2025-08-01T09:00:00.000+00:00",
    "vitals": {
        "bloodPressure": {
            "systolic": 118,
            "diastolic": 76,
            "unit": "mmHg"
        },
        "bloodSugar": {
            "value": 90,
            "unit": "mg/dL"
        },
        "pulseRate": 70,
        "respiratoryRate": 16,
        "temperature": {
            "value": 98.4,
            "unit": "F"
        },
        "oxygenSaturation": {
            "value": 97,
            "unit": "%"
        },
        "weightKg": 68,
        "heightCm": 170
    },
    "notes": "Stable vitals",
    "nurseId": "N100"
};

const VitalsDisplay = ({ appointment, onBack }) => {
    // State to hold the fetched vitals data, initialized with mock data.
    const [vitalsData, setVitalsData] = useState(mockVitalsData);
    // State to manage loading status.
    const [loading, setLoading] = useState(false);
    // State for any fetch/save errors.
    const [error, setError] = useState(null);
    // State to control if the form should be displayed for editing/adding.
    const [isEditing, setIsEditing] = useState(false);
    // State for form input fields.
    const [formData, setFormData] = useState({
        appointmentId: appointment.customId,
        patientId: appointment.patientId,
        date: new Date().toISOString(),
        vitals: {
            bloodPressure: { systolic: '', diastolic: '', unit: 'mmHg' },
            bloodSugar: { value: '', unit: 'mg/dL' },
            pulseRate: '',
            respiratoryRate: '',
            temperature: { value: '', unit: 'F' },
            oxygenSaturation: { value: '', unit: '%' },
            weightKg: '',
            heightCm: '',
        },
        notes: ''
    });

    useEffect(() => {
        // Simulate fetching data with a delay
        const fetchVitals = () => {
            setLoading(true);
            setError(null);
            setTimeout(() => {
                // We'll check for a specific appointment ID to simulate "not found"
                if (appointment.customId === "A1002") {
                    setVitalsData(null);
                    setIsEditing(true);
                } else {
                    setVitalsData(mockVitalsData);
                    // Pre-populate form data for editing
                    setFormData({
                        ...mockVitalsData,
                        vitals: {
                            ...mockVitalsData.vitals,
                            bloodPressure: {
                                ...mockVitalsData.vitals.bloodPressure,
                                systolic: mockVitalsData.vitals.bloodPressure.systolic || '',
                                diastolic: mockVitalsData.vitals.bloodPressure.diastolic || '',
                            }
                        }
                    });
                    setIsEditing(false); // Display data by default
                }
                setLoading(false);
            }, 1000);
        };

        if (appointment) {
            fetchVitals();
        }
    }, [appointment]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Handle nested state for vitals
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                vitals: {
                    ...prev.vitals,
                    [parent]: {
                        ...prev.vitals[parent],
                        [child]: value
                    }
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                vitals: {
                    ...prev.vitals,
                    [name]: value
                }
            }));
        }
    };

    // Handle form submission (add or update)
    const handleSave = () => {
        setLoading(true);
        setError(null);
        setTimeout(() => {
            // Simulate saving and updating the state with the new form data
            const newVitals = {
                ...formData,
                vitals: {
                    ...formData.vitals,
                    // Convert numeric strings back to numbers for vitals
                    bloodPressure: {
                        ...formData.vitals.bloodPressure,
                        systolic: Number(formData.vitals.bloodPressure.systolic),
                        diastolic: Number(formData.vitals.bloodPressure.diastolic),
                    },
                    bloodSugar: {
                        ...formData.vitals.bloodSugar,
                        value: Number(formData.vitals.bloodSugar.value),
                    },
                    pulseRate: Number(formData.vitals.pulseRate),
                    respiratoryRate: Number(formData.vitals.respiratoryRate),
                    temperature: {
                        ...formData.vitals.temperature,
                        value: Number(formData.vitals.temperature.value),
                    },
                    oxygenSaturation: {
                        ...formData.vitals.oxygenSaturation,
                        value: Number(formData.vitals.oxygenSaturation.value),
                    },
                    weightKg: Number(formData.vitals.weightKg),
                    heightCm: Number(formData.vitals.heightCm),
                }
            };
            setVitalsData(newVitals);
            setIsEditing(false); // Switch back to display mode
            setLoading(false);
        }, 1000);
    };

    if (!appointment) {
        return <Typography variant="h6" align="center">No appointment selected.</Typography>;
    }

    // Show loading spinner
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    // Show error message
    if (error) {
        return (
            <Box sx={{ p: 4, maxWidth: 960, mx: 'auto' }}>
                <Alert severity="error">Error: {error}</Alert>
            </Box>
        );
    }
    
    // Vitals Display View
    const renderVitalsView = () => (
        <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, background: 'linear-gradient(145deg, #ffffff, #f0f2f5)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
                Vitals for Appointment {appointment.customId}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
                Patient ID: {appointment.patientId}
            </Typography>

            <Divider sx={{ mb: 3 }} />
            
            {vitalsData ? (
                <List>
                    <ListItem>
                        <ListItemIcon><FavoriteIcon color="error" /></ListItemIcon>
                        <ListItemText primary="Pulse Rate" secondary={`${vitalsData.vitals.pulseRate} bpm`} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><BloodtypeIcon color="info" /></ListItemIcon>
                        <ListItemText primary="Blood Pressure" secondary={`${vitalsData.vitals.bloodPressure.systolic}/${vitalsData.vitals.bloodPressure.diastolic} ${vitalsData.vitals.bloodPressure.unit}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><ThermostatIcon color="warning" /></ListItemIcon>
                        <ListItemText primary="Temperature" secondary={`${vitalsData.vitals.temperature.value} °${vitalsData.vitals.temperature.unit}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><MonitorHeartIcon color="primary" /></ListItemIcon>
                        <ListItemText primary="Respiratory Rate" secondary={`${vitalsData.vitals.respiratoryRate} breaths/min`} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><BloodtypeIcon color="success" /></ListItemIcon>
                        <ListItemText primary="Blood Oxygen" secondary={`${vitalsData.vitals.oxygenSaturation.value}${vitalsData.vitals.oxygenSaturation.unit}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><FitnessCenterIcon color="action" /></ListItemIcon>
                        <ListItemText primary="Weight" secondary={`${vitalsData.vitals.weightKg} kg`} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><HeightIcon color="action" /></ListItemIcon>
                        <ListItemText primary="Height" secondary={`${vitalsData.vitals.heightCm} cm`} />
                    </ListItem>
                </List>
            ) : (
                <Typography align="center" color="text.secondary">
                    No vitals data found.
                </Typography>
            )}
            
            <Box sx={{ mt: 3 }}>
                <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
                    {vitalsData ? 'Edit Vitals' : 'Add Vitals'}
                </Button>
            </Box>
        </Paper>
    );

    // Vitals Edit/Add Form
    const renderVitalsForm = () => (
        <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, background: 'linear-gradient(145deg, #ffffff, #f0f2f5)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
                {vitalsData ? 'Edit Vitals' : 'Add New Vitals'}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
                Patient ID: {appointment.patientId}
            </Typography>
            
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Pulse Rate (bpm)"
                        name="pulseRate"
                        value={formData.vitals.pulseRate}
                        onChange={handleInputChange}
                        type="number"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Systolic Blood Pressure (mmHg)"
                        name="bloodPressure.systolic"
                        value={formData.vitals.bloodPressure.systolic}
                        onChange={handleInputChange}
                        type="number"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Diastolic Blood Pressure (mmHg)"
                        name="bloodPressure.diastolic"
                        value={formData.vitals.bloodPressure.diastolic}
                        onChange={handleInputChange}
                        type="number"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Blood Sugar (mg/dL)"
                        name="bloodSugar.value"
                        value={formData.vitals.bloodSugar.value}
                        onChange={handleInputChange}
                        type="number"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Temperature (°F)"
                        name="temperature.value"
                        value={formData.vitals.temperature.value}
                        onChange={handleInputChange}
                        type="number"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Respiratory Rate (breaths/min)"
                        name="respiratoryRate"
                        value={formData.vitals.respiratoryRate}
                        onChange={handleInputChange}
                        type="number"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Oxygen Saturation (%)"
                        name="oxygenSaturation.value"
                        value={formData.vitals.oxygenSaturation.value}
                        onChange={handleInputChange}
                        type="number"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Weight (kg)"
                        name="weightKg"
                        value={formData.vitals.weightKg}
                        onChange={handleInputChange}
                        type="number"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Height (cm)"
                        name="heightCm"
                        value={formData.vitals.heightCm}
                        onChange={handleInputChange}
                        type="number"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Notes"
                        name="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    />
                </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button variant="contained" color="success" onClick={handleSave}>
                    Save Vitals
                </Button>
                {vitalsData && (
                    <Button variant="outlined" color="info" onClick={() => setIsEditing(false)}>
                        Cancel
                    </Button>
                )}
            </Box>
        </Paper>
    );

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 960, mx: 'auto', width: '100%' }}>
            <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={onBack}
                sx={{ mb: 3 }}
            >
                Back to Appointments
            </Button>
            
            {isEditing ? renderVitalsForm() : renderVitalsView()}
        </Box>
    );
};

VitalsDisplay.propTypes = {
    appointment: PropTypes.object,
    onBack: PropTypes.func.isRequired,
};

export default VitalsDisplay;
