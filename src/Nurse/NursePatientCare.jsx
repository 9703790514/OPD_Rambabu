import React, { useState, useEffect } from 'react';
import { 
    Box, Typography, Paper, List, ListItem, ListItemText, ListItemAvatar, 
    Avatar, Divider, Chip, CircularProgress, Alert, Button, ListItemIcon
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RoomIcon from '@mui/icons-material/Room';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaidIcon from '@mui/icons-material/Paid';

const APPOINTMENTS_API_URL = 'http://localhost:2010/api/appointments';
const BILLS_API_BASE_URL = 'http://localhost:2009/api/bills/appointments';
const BILL_TYPE = 'Consultation';

const formatDateToISO = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const NursePatientCare = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
    const [billData, setBillData] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch(APPOINTMENTS_API_URL);
                if (!response.ok) {
                    throw new Error('Failed to fetch appointments');
                }
                const data = await response.json();
                const todayDateString = formatDateToISO(new Date());

                const todayAppointments = data.filter(appointment => 
                    appointment.appointmentDate === todayDateString
                );

                setAppointments(todayAppointments);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    useEffect(() => {
        const fetchBillData = async () => {
            if (!selectedAppointmentId) return;

            setLoading(true);
            setError(null);
            setBillData(null);

            try {
                const response = await fetch(`${BILLS_API_BASE_URL}/${selectedAppointmentId}/type/${BILL_TYPE}`);

                if (!response.ok) {
                    if (response.status === 204) {
                        setBillData(null);
                        setError(`No ${BILL_TYPE} bill found for this appointment.`);
                        return;
                    }
                    throw new Error(`Failed to fetch bill data with status: ${response.status}`);
                }

                const text = await response.text();
                if (!text) {
                    setBillData(null);
                    setError(`No ${BILL_TYPE} bill found for this appointment.`);
                    return;
                }

                const data = JSON.parse(text);

                if (data && data.length > 0) {
                    setBillData(data[0]);
                } else {
                    setBillData(null);
                    setError(`No ${BILL_TYPE} bill found for this appointment.`);
                }
            } catch (err) {
                setBillData(null);
                setError(`Could not process bill data: ${err.message}`);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBillData();
    }, [selectedAppointmentId]);

    const handleAppointmentClick = (appointmentId) => {
        setSelectedAppointmentId(appointmentId);
    };

    const handleBack = () => {
        setSelectedAppointmentId(null);
        setBillData(null);
        setError(null);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error && !selectedAppointmentId) {
        return (
            <Box sx={{ p: 4, maxWidth: 960, mx: 'auto' }}>
                <Alert severity="error">Error: {error}</Alert>
            </Box>
        );
    }

    if (selectedAppointmentId) {
        if (error) {
            return (
                <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 960, mx: 'auto' }}>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={handleBack}
                        sx={{ mb: 3 }}
                    >
                        Back to Appointments
                    </Button>
                    <Alert severity="error">
                        {error}
                    </Alert>
                </Box>
            );
        }

        return (
            <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 960, mx: 'auto', width: '100%' }}>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBack}
                    sx={{ mb: 3 }}
                >
                    Back to Appointments
                </Button>

                <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, background: 'linear-gradient(145deg, #ffffff, #f0f2f5)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main', display: 'flex', alignItems: 'center' }}>
                        <ReceiptIcon sx={{ mr: 1 }} />
                        {BILL_TYPE} Bill Details
                    </Typography>
                    
                    {billData ? (
                        <List>
                            <ListItem>
                                <ListItemIcon><EventNoteIcon color="action" /></ListItemIcon>
                                <ListItemText primary="Appointment ID" secondary={billData.appointmentId} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><PersonIcon color="action" /></ListItemIcon>
                                <ListItemText primary="Patient ID" secondary={billData.patientId} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><ReceiptIcon color="action" /></ListItemIcon>
                                <ListItemText primary="Bill ID" secondary={billData.billId} />
                            </ListItem>
                            <Divider sx={{ my: 2 }} />
                            <ListItem>
                                <ListItemIcon><AttachMoneyIcon color="success" /></ListItemIcon>
                                <ListItemText primary="Total Amount" secondary={`$${billData.totalAmount}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><PaidIcon color="primary" /></ListItemIcon>
                                <ListItemText primary="Amount Paid" secondary={`$${billData.amountPaid}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><AccountBalanceWalletIcon color="warning" /></ListItemIcon>
                                <ListItemText primary="Balance Due" secondary={`$${billData.balanceDue}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><CreditCardIcon color="info" /></ListItemIcon>
                                <ListItemText primary="Payment Method" secondary={billData.paymentMode} />
                            </ListItem>
                            <Divider sx={{ my: 2 }} />
                            <ListItem>
                                <ListItemIcon><AccessTimeIcon color="action" /></ListItemIcon>
                                <ListItemText primary="Bill Date" secondary={new Date(billData.billDate).toLocaleDateString()} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><LocalHospitalIcon color="action" /></ListItemIcon>
                                <ListItemText primary="Issued By" secondary={`User ID: ${billData.issuedByUserId}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><PaymentIcon color="action" /></ListItemIcon>
                                <ListItemText primary="Transaction ID" secondary={billData.transactionId} />
                            </ListItem>
                        </List>
                    ) : (
                        <Typography align="center" color="text.secondary" sx={{ mt: 2 }}>
                            No bill has been paid for this appointment.
                        </Typography>
                    )}
                </Paper>
            </Box>
        );
    }

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 960, mx: 'auto', width: '100%' }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.dark' }}>
                Today's Appointments
            </Typography>

            <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, background: 'linear-gradient(145deg, #ffffff, #f0f2f5)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
                    Scheduled for Today
                </Typography>
                <List>
                    {appointments.length > 0 ? (
                        appointments.map((appointment, index) => (
                            <React.Fragment key={appointment.id}>
                                <ListItem 
                                    alignItems="flex-start" 
                                    sx={{ py: 2, cursor: 'pointer', '&:hover': { bgcolor: '#f5f5f5' } }}
                                    onClick={() => handleAppointmentClick(appointment.id)}
                                >
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: 'primary.main', width: 60, height: 60, border: '2px solid #1976d2' }}>
                                            <EventNoteIcon fontSize="large" />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                                                Appointment ID: {appointment.id} <Chip label={appointment.status} size="small" color={appointment.status === 'Completed' ? 'success' : 'warning'} sx={{ ml: 1 }} />
                                            </Typography>
                                        }
                                        secondary={
                                            <Box>
                                                <Typography sx={{ display: 'block' }} component="span" variant="body2" color="text.secondary">
                                                    <AccessTimeIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} /> Date: {appointment.appointmentDate} at {new Date(appointment.appointmentTime).toLocaleTimeString()}
                                                </Typography>
                                                <Typography sx={{ display: 'block' }} component="span" variant="body2" color="text.secondary">
                                                    <LocalHospitalIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} /> Reason: {appointment.reasonForVisit}
                                                </Typography>
                                                <Typography sx={{ display: 'block' }} component="span" variant="body2" color="text.secondary">
                                                    <RoomIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} /> Room: {appointment.roomNumber}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                </ListItem>
                                {index < appointments.length - 1 && <Divider variant="inset" component="li" />}
                            </React.Fragment>
                        ))
                    ) : (
                        <Typography align="center" color="text.secondary">
                            No appointments found for today.
                        </Typography>
                    )}
                </List>
            </Paper>

            <Box sx={{ mt: 6, opacity: 0.7, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    Click on any appointment to view its detailed consultation bill.
                </Typography>
            </Box>
        </Box>
    );
};

export default NursePatientCare;
