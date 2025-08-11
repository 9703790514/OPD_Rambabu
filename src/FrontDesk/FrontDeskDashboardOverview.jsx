import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Paper, Grid, Card, CardContent } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const FrontDeskDashboardOverview = ({ frontDeskUser }) => {
  // Static data for demonstration
  const stats = [
    { label: 'Patients Checked In Today', value: 35, icon: <PeopleIcon color="primary" sx={{ fontSize: 40 }} /> },
    { label: 'Upcoming Appointments', value: 12, icon: <EventAvailableIcon color="secondary" sx={{ fontSize: 40 }} /> },
    { label: 'Pending Payments', value: 8, icon: <CurrencyRupeeIcon color="error" sx={{ fontSize: 40 }} /> },
    { label: 'Average Wait Time', value: '15 min', icon: <AccessTimeIcon color="info" sx={{ fontSize: 40 }} /> },
  ];

  const recentActivities = [
    { id: 1, text: 'Checked in Patient: John Doe (Appt. with Dr. Smith)', time: '10 mins ago' },
    { id: 2, text: 'Scheduled new appointment for Jane Smith', time: '30 mins ago' },
    { id: 3, text: 'Processed payment for Invoice #FD-001', time: '1 hour ago' },
    { id: 4, text: 'Registered new patient: Alice Wonderland', time: '2 hours ago' },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', width: '100%' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.dark' }}>
        Front Desk Dashboard Overview
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
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
          Recent Front Desk Activities
        </Typography>
        {recentActivities.length > 0 ? (
          recentActivities.map((activity) => (
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
          <Typography variant="body1" color="text.secondary">No recent activities.</Typography>
        )}
      </Paper>

      <Box sx={{ mt: 6, opacity: 0.7, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          This overview provides a snapshot of key front desk operations and alerts.
        </Typography>
      </Box>
    </Box>
  );
};

FrontDeskDashboardOverview.propTypes = {
  frontDeskUser: PropTypes.shape({
    userId: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    profilePic: PropTypes.string,
  }),
};

export default FrontDeskDashboardOverview;