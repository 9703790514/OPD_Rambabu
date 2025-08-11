import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button,
  CircularProgress // Import CircularProgress for loading indicator
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PaymentIcon from '@mui/icons-material/Payment';
import PersonIcon from '@mui/icons-material/Person';

const BillingDeskPatientAccounts = ({ billingDeskUser }) => {
  // State to hold dynamic patient accounts data
  const [patientAccountsData, setPatientAccountsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientAccounts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('http://localhost:2008/api/patients');
        if (!response.ok) {
          throw new Error(`Failed to fetch patient data: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();

        // Log the fetched raw patient data to the console
        console.log("Fetched raw patient data:", data);

        // Map fetched data to the required structure for patient accounts
        // Assuming each fetched patient has at least 'id', 'first_name', 'last_name'
        // And we'll simulate 'currentBalance', 'lastActivity', 'status' for now
        const mappedData = data.map((patient, index) => ({
          id: patient.id, // Use the actual patient ID from the backend
          patientId: patient.customId ? `P-${String(patient.customId).padStart(3, '0')}` : `P-N/A`, // Use customId if available
          patientName: `${patient.first_name || ''} ${patient.last_name || ''}`.trim() || 'N/A',
          currentBalance: (index % 2 === 0) ? 0.00 : (Math.random() * 1000 + 100).toFixed(2), // Simulate balance
          lastActivity: `2025-07-${28 - (index % 5)} (Invoice)`, // Simulate last activity
          status: (index % 3 === 0) ? 'Clear' : (index % 3 === 1 ? 'Outstanding' : 'Overdue'), // Simulate status
        }));
        setPatientAccountsData(mappedData);
      } catch (err) {
        console.error("Error fetching patient accounts:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientAccounts();
  }, []); // Empty dependency array means this effect runs once on mount

  const getStatusColor = (status) => {
    switch (status) {
      case 'Clear': return 'success';
      case 'Outstanding': return 'info';
      case 'Overdue': return 'error';
      default: return 'default';
    }
  };

  const handleViewAccountHistory = (patientId) => {
    console.log(`View account history for Patient ID: ${patientId}`);
    // Implement logic to view detailed account history
  };

  const handleProcessPayment = (patientId) => {
    console.log(`Process payment for Patient ID: ${patientId}`);
    // Implement logic to initiate payment processing for this patient
  };

  if (loading) {
    return (
      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', width: '100%', textAlign: 'center' }}>
        <CircularProgress sx={{ mt: 5 }} />
        <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
          Loading patient accounts...
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
          Failed to load patient account data. Please try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', width: '100%' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.dark' }}>
        Patient Accounts
      </Typography>

      <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, background: 'linear-gradient(145deg, #ffffff, #f0f2f5)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
          Overview of Patient Balances
        </Typography>

        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="patient accounts table">
            <TableHead>
              <TableRow sx={{ bgcolor: '#e3f2fd' }}>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Patient ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Patient Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Current Balance</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Last Activity</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patientAccountsData.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}
                >
                  <TableCell component="th" scope="row">
                    {row.patientId}
                  </TableCell>
                  <TableCell><PersonIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />{row.patientName}</TableCell>
                  <TableCell>₹{row.currentBalance}</TableCell>
                  <TableCell>{row.lastActivity}</TableCell>
                  <TableCell>
                    <Chip label={row.status} color={getStatusColor(row.status)} size="small" />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<VisibilityIcon />}
                      onClick={() => handleViewAccountHistory(row.id)}
                      sx={{ mr: 1 }}
                    >
                      View History
                    </Button>
                    {parseFloat(row.currentBalance) > 0 && ( // Only show "Process Payment" if there's a balance
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<PaymentIcon />}
                        onClick={() => handleProcessPayment(row.id)}
                      >
                        Process Payment
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box sx={{ mt: 6, opacity: 0.7, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          View patient account balances, payment history, and financial statements.
        </Typography>
      </Box>
    </Box>
  );
};

BillingDeskPatientAccounts.propTypes = {
  billingDeskUser: PropTypes.shape({
    userId: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    profilePic: PropTypes.string,
  }),
};

export default BillingDeskPatientAccounts;
