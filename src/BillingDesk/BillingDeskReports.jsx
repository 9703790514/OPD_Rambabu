import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Paper, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const BillingDeskReports = ({ billingDeskUser }) => {
  // Static data for available reports
  const reportsList = [
    {
      id: 1,
      name: 'Daily Revenue Report',
      description: 'Summary of total revenue collected, broken down by payment method for the current day.',
      icon: <AttachMoneyIcon color="primary" />,
    },
    {
      id: 2,
      name: 'Outstanding Invoices Report',
      description: 'Detailed list of all pending and overdue invoices with patient details and amounts.',
      icon: <ReceiptLongIcon color="secondary" />,
    },
    {
      id: 3,
      name: 'Patient Account Balances',
      description: 'Overview of all patient account balances, highlighting those with outstanding amounts.',
      icon: <AccountBalanceWalletIcon color="info" />,
    },
    {
      id: 4,
      name: 'Monthly Collections Report',
      description: 'Analysis of total collections over the past month, including trends and payment sources.',
      icon: <TrendingUpIcon color="success" />,
    },
    {
      id: 5,
      name: 'Service-wise Revenue Report',
      description: 'Revenue breakdown by medical service provided, identifying top-performing services.',
      icon: <BarChartIcon color="warning" />,
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 960, mx: 'auto', width: '100%' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.dark' }}>
        Financial Reports
      </Typography>

      <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, background: 'linear-gradient(145deg, #ffffff, #f0f2f5)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
          Available Reports
        </Typography>
        <List>
          {reportsList.map((report) => (
            <ListItem
              key={report.id}
              sx={{
                mb: 2,
                p: 2,
                bgcolor: '#e3f2fd',
                borderRadius: 2,
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                '&:hover': { bgcolor: '#cfe8fc', cursor: 'pointer' },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {report.icon}
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>{report.name}</Typography>}
                secondary={<Typography variant="body2" color="text.secondary">{report.description}</Typography>}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Box sx={{ mt: 6, opacity: 0.7, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Generate and analyze reports on revenue, collections, and outstanding balances to support financial operations.
        </Typography>
      </Box>
    </Box>
  );
};

BillingDeskReports.propTypes = {
  billingDeskUser: PropTypes.shape({
    userId: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    profilePic: PropTypes.string,
  }),
};

export default BillingDeskReports;
