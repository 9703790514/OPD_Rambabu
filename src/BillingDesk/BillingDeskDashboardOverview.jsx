import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Paper, Grid, Card, CardContent, CircularProgress, Alert } from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaidIcon from '@mui/icons-material/Paid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { formatDistanceToNow, parseISO } from 'date-fns';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const BillingDeskDashboardOverview = ({ billingDeskUser }) => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('http://localhost:2009/api/bills');

        if (!response.ok) {
          const errorBody = await response.text();
          throw new Error(`Failed to fetch bills: ${response.status} ${response.statusText} - ${errorBody}`);
        }

        const data = await response.json();
        setBills(data);
      } catch (err) {
        console.error("Error fetching bills for dashboard:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  // Calculate dynamic statistics based on the 'bills' state
  const totalBillsGenerated = bills.length;
  const totalAmountBilled = bills.reduce((sum, bill) => sum + (bill.totalAmount || 0), 0);
  const totalAmountReceived = bills.reduce((sum, bill) => sum + (bill.amountPaid || 0), 0);
  const totalOutstandingPayments = bills.reduce((sum, bill) => sum + (bill.balanceDue || 0), 0);
  const numberOfPendingInvoices = bills.filter(bill => bill.balanceDue > 0).length;
  const numberOfPaidBills = bills.filter(bill => bill.balanceDue === 0 && bill.totalAmount > 0).length;

  // Dynamically generate recent billing activities from fetched data
  const recentBillingActivities = bills
    .filter(bill => bill.updatedAt || bill.createdAt)
    .map(bill => {
      const dateString = bill.updatedAt || bill.createdAt;
      const timestamp = parseISO(dateString);
      
      let text = '';
      if (bill.balanceDue === 0 && bill.totalAmount > 0) {
        text = `Payment received for Bill ${bill.billId || bill.id} (Patient: ${bill.patientId})`;
      } else {
        text = `New bill generated for Patient ${bill.patientId} (Bill ID: ${bill.billId || bill.id})`;
      }

      return {
        id: bill.id,
        text: text,
        time: formatDistanceToNow(timestamp, { addSuffix: true }),
        timestamp: timestamp,
      };
    })
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 5);

  const stats = [
    {
      label: 'Total Bills Generated',
      value: totalBillsGenerated,
      icon: <ReceiptLongIcon color="primary" sx={{ fontSize: 40 }} />,
    },
    {
      label: 'Total Amount Billed',
      value: `₹${totalAmountBilled.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: <AccountBalanceWalletIcon color="secondary" sx={{ fontSize: 40 }} />,
    },
    {
      label: 'Total Amount Received',
      value: `₹${totalAmountReceived.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: <CurrencyRupeeIcon color="success" sx={{ fontSize: 40 }} />,
    },
    {
      label: 'Outstanding Payments',
      value: `₹${totalOutstandingPayments.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: <ScheduleIcon color="error" sx={{ fontSize: 40 }} />,
    },
    {
      label: 'Pending Invoices',
      value: numberOfPendingInvoices,
      icon: <ReceiptLongIcon color="warning" sx={{ fontSize: 40 }} />,
    },
    {
      label: 'Bills Marked Paid',
      value: numberOfPaidBills,
      icon: <CheckCircleOutlineIcon color="info" sx={{ fontSize: 40 }} />,
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>Loading billing data...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', width: '100%', textAlign: 'center' }}>
        <Alert severity="error" sx={{ mt: 10 }}>
          <Typography variant="h6">Error: {error}</Typography>
          <Typography variant="body1">Failed to load billing data. Please check the server connection and try again.</Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', width: '100%' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.dark' }}>
        Billing Desk Dashboard Overview
      </Typography>

      <Grid container spacing={4} justifyContent="center" columns={{ xs: 4, sm: 8, md: 12 }}>
        {stats.map((stat, index) => (
          <Grid item xs={4} sm={4} md={3} key={index}>
            <Card elevation={6} sx={{ borderRadius: 3, p: 2, textAlign: 'center', background: 'linear-gradient(145deg, #f0f2f5, #ffffff)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
              <CardContent>
                {stat.icon}
                <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold', color: 'text.primary' }}>
                  {stat.value}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper elevation={6} sx={{ mt: 6, p: { xs: 2, md: 4 }, borderRadius: 3, background: 'linear-gradient(145deg, #ffffff, #f0f2f5)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
          Recent Billing Activities
        </Typography>
        {recentBillingActivities.length > 0 ? (
          recentBillingActivities.map((activity) => (
            <Box key={activity.id} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee', '&:last-child': { borderBottom: 'none', mb: 0 } }}>
              <Typography variant="body1" color="text.primary">
                {activity.text}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {activity.time}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">No recent billing activities.</Typography>
        )}
      </Paper>

      <Box sx={{ mt: 6, opacity: 0.7, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          This overview provides key financial and billing metrics for the billing desk.
        </Typography>
      </Box>
    </Box>
  );
};

BillingDeskDashboardOverview.propTypes = {
  billingDeskUser: PropTypes.shape({
    userId: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    profilePic: PropTypes.string,
  }),
};

export default BillingDeskDashboardOverview;