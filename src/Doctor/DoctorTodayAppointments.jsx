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
    Divider,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import ScienceIcon from '@mui/icons-material/Science';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import HealingIcon from '@mui/icons-material/Healing';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import BiotechIcon from '@mui/icons-material/Biotech';

// Mock data for demonstration
const mockAppointments = [
    {
        id: '689431e519d35f4ac02fc611',
        patientId: '6891d96dbeeb29d2e096f10a',
        doctorId: '6883742864d9b4574f963fba',
        appointmentDate: '2025-08-07',
        appointmentTime: '2025-08-07T10:00:00Z',
        roomNumber: '101A',
        reasonForVisit: 'Routine check-up',
        status: 'Scheduled',
        medicalRecordId: 'mr_12345',
    },
    {
        id: '689431e519d35f4ac02fc612',
        patientId: '6891d96dbeeb29d2e096f10b',
        doctorId: '6883742864d9b4574f963fba',
        appointmentDate: '2025-08-07',
        appointmentTime: '2025-08-07T11:00:00Z',
        roomNumber: '102B',
        reasonForVisit: 'Follow-up consultation',
        status: 'Confirmed',
        medicalRecordId: 'mr_12346',
    },
    {
        id: '689431e519d35f4ac02fc613',
        patientId: '6891d96dbeeb29d2e096f10c',
        doctorId: '6883742864d9b4574f963fba',
        appointmentDate: '2025-08-07',
        appointmentTime: '2025-08-07T13:30:00Z',
        roomNumber: '103C',
        reasonForVisit: 'Annual physical',
        status: 'Pending',
        medicalRecordId: null,
    },
    {
        id: '689431e519d35f4ac02fc614',
        patientId: '6891d96dbeeb29d2e096f10d',
        doctorId: '6883742864d9b4574f963fba',
        appointmentDate: '2025-08-06', // Old appointment to show only today's
        appointmentTime: '2025-08-06T10:00:00Z',
        roomNumber: '104D',
        reasonForVisit: 'Check-up',
        status: 'Completed',
        medicalRecordId: 'mr_12347',
    },
];

const mockMedicalRecords = {
    'mr_12345': {
        id: 'mr_12345',
        patientId: '6891d96dbeeb29d2e096f10a',
        appointmentId: '689431e519d35f4ac02fc611',
        chiefComplaint: 'Sore throat and cough',
        diagnosis: 'Common cold',
        treatmentPlan: 'Rest, fluids, and over-the-counter medication',
        notes: 'Patient responded well to initial examination. Advised to return if symptoms worsen.',
        recordDate: '2025-08-07',
    },
    'mr_12346': {
        id: 'mr_12346',
        patientId: '6891d96dbeeb29d2e096f10b',
        appointmentId: '689431e519d35f4ac02fc612',
        chiefComplaint: 'Follow-up on blood pressure',
        diagnosis: 'Hypertension, controlled',
        treatmentPlan: 'Continue current medication. Re-evaluate in 3 months.',
        notes: 'Blood pressure readings are stable. Patient is compliant with medication regimen.',
        recordDate: '2025-08-07',
    },
    'mr_12347': {
        id: 'mr_12347',
        patientId: '6891d96dbeeb29d2e096f10d',
        appointmentId: '689431e519d35f4ac02fc614',
        chiefComplaint: 'Rash on left arm',
        diagnosis: 'Allergic reaction',
        treatmentPlan: 'Prescribed topical cream and advised to avoid potential allergens.',
        notes: 'Rash is mild, no signs of infection.',
        recordDate: '2025-08-06',
    },
};

/**
 * DoctorTodayAppointments component displays a list of a doctor's appointments for the current day.
 * It allows the doctor to view detailed medical records or complete an appointment.
 */
const DoctorTodayAppointments = ({ doctorUser, onViewMedicalRecords, onNavigate }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formattedTodayDate, setFormattedTodayDate] = useState('');
    const [updatingAppointmentId, setUpdatingAppointmentId] = useState(null);

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

        // Simulate fetching data with mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        const todayAppointments = mockAppointments.filter(
            (app) => app.appointmentDate === currentFormattedDate
        );
        setAppointments(todayAppointments);
        setLoading(false);
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

    /**
     * Handles the click event for viewing medical records.
     * @param {object} appointment - The full appointment object.
     */
    const handleViewMedicalRecords = (appointment) => {
        console.log(`Viewing medical records for Appointment ID: ${appointment.id}`);
        onViewMedicalRecords(appointment);
    };

    const handleCompleteAppointment = async (appointmentId) => {
        setUpdatingAppointmentId(appointmentId);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAppointments(prevAppointments =>
            prevAppointments.map(app =>
                app.id === appointmentId ? { ...app, status: 'Completed' } : app
            )
        );
        setUpdatingAppointmentId(null);
    };

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', width: '100%' }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ mb: 1, fontWeight: 'bold', color: 'primary.dark' }}>
                Today's Appointments
            </Typography>
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
                                        <Box component="span" sx={{ fontWeight: 'bold' }}>Patient ID: {row.patientId || 'N/A'}</Box>
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
                                    {row.medicalRecordId && (
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="secondary"
                                            onClick={() => handleViewMedicalRecords(row)}
                                        >
                                            View Medical Records
                                        </Button>
                                    )}
                                    {row.status !== 'Completed' && row.status !== 'Cancelled' && (
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="primary"
                                            onClick={() => handleCompleteAppointment(row.id)}
                                            disabled={updatingAppointmentId === row.id}
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
    }).isRequired,
    onViewMedicalRecords: PropTypes.func.isRequired,
};

/**
 * DoctorMedicalRecordsPage component displays the details of a single medical record
 * and its associated appointment.
 */
const DoctorMedicalRecordsPage = ({ medicalRecordId, selectedAppointment, onBack }) => {
    const [medicalRecord, setMedicalRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecord = async () => {
            if (!medicalRecordId) {
                setError("Medical Record ID is not available.");
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            // Simulate fetching medical record with mock data
            await new Promise(resolve => setTimeout(resolve, 1000));
            const record = mockMedicalRecords[medicalRecordId];

            if (record) {
                setMedicalRecord(record);
            } else {
                setError("Medical record not found.");
            }
            setLoading(false);
        };

        fetchRecord();
    }, [medicalRecordId]);

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
                Medical Record Details
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

            {!loading && !error && medicalRecord && (
                <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, background: 'linear-gradient(145deg, #ffffff, #f0f2f5)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
                    {/* Display Appointment Details */}
                    {selectedAppointment && (
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h5" gutterBottom sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
                                Associated Appointment
                            </Typography>
                            <List disablePadding>
                                <ListItem>
                                    <ListItemText
                                        primary="Patient ID"
                                        secondary={selectedAppointment.patientId || 'N/A'}
                                        primaryTypographyProps={{ fontWeight: 'bold' }}
                                    />
                                </ListItem>
                                <Divider component="li" />
                                <ListItem>
                                    <ListItemText
                                        primary="Date"
                                        secondary={selectedAppointment.appointmentDate || 'N/A'}
                                        primaryTypographyProps={{ fontWeight: 'bold' }}
                                    />
                                </ListItem>
                                <Divider component="li" />
                                <ListItem>
                                    <ListItemText
                                        primary="Time"
                                        secondary={selectedAppointment.appointmentTime ? new Date(selectedAppointment.appointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                                        primaryTypographyProps={{ fontWeight: 'bold' }}
                                    />
                                </ListItem>
                                <Divider component="li" />
                                <ListItem>
                                    <ListItemText
                                        primary="Reason for Visit"
                                        secondary={selectedAppointment.reasonForVisit || 'N/A'}
                                        primaryTypographyProps={{ fontWeight: 'bold' }}
                                    />
                                </ListItem>
                                <Divider component="li" />
                                <ListItem>
                                    <ListItemText
                                        primary="Room"
                                        secondary={selectedAppointment.roomNumber || 'N/A'}
                                        primaryTypographyProps={{ fontWeight: 'bold' }}
                                    />
                                </ListItem>
                            </List>
                        </Box>
                    )}
                    <Divider sx={{ my: 3 }} />

                    {/* Display Medical Record Details */}
                    <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
                        Record Overview
                    </Typography>
                    <List>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary={
                                    <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <MedicalInformationIcon sx={{ mr: 1, color: 'info.main' }} />
                                        Record ID: {medicalRecord.id || 'N/A'}
                                    </Typography>
                                }
                                secondary={
                                    <Box>
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
    selectedAppointment: PropTypes.object,
    onBack: PropTypes.func.isRequired,
};

/**
 * Main App component to manage the state and display different pages.
 */
const App = () => {
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const handleViewMedicalRecords = (appointment) => {
        setSelectedAppointment(appointment);
    };

    const handleBackToAppointments = () => {
        setSelectedAppointment(null);
    };

    // This is a placeholder for the logged-in doctor's user object.
    const mockDoctorUser = {
        userId: 'doctor-123',
        name: 'Dr. Jane Doe',
        email: 'jane.doe@hospital.com',
    };

    return (
        <Box sx={{ p: 4, bgcolor: '#f0f2f5', minHeight: '100vh' }}>
            {selectedAppointment ? (
                <DoctorMedicalRecordsPage
                    medicalRecordId={selectedAppointment.medicalRecordId}
                    selectedAppointment={selectedAppointment}
                    onBack={handleBackToAppointments}
                />
            ) : (
                <DoctorTodayAppointments
                    doctorUser={mockDoctorUser}
                    onViewMedicalRecords={handleViewMedicalRecords}
                />
            )}
        </Box>
    );
};

export default App;
