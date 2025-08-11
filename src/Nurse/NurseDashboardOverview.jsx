import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import WarningIcon from '@mui/icons-material/Warning';

const NurseDashboardOverview = () => {
  // Static data for demonstration
  const stats = [
    { label: 'Assigned Patients', value: 15, icon: <PeopleIcon color="primary" sx={{ fontSize: 40 }} /> },
    { label: 'Upcoming Appointments', value: 8, icon: <EventAvailableIcon color="secondary" sx={{ fontSize: 40 }} /> },
    { label: 'Critical Alerts', value: 2, icon: <WarningIcon color="error" sx={{ fontSize: 40 }} /> },
  ];

  const recentActivities = [
    { id: 1, text: 'Administered medication to Patient A', time: '10 mins ago' },
    { id: 2, text: 'Updated vitals for Patient B', time: '30 mins ago' },
    { id: 3, text: 'Assisted with Patient C discharge', time: '1 hour ago' },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', width: '100%' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.dark' }}>
        Nurse Dashboard Overview
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
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
          Recent Activities
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
          This overview provides a snapshot of key nursing responsibilities and alerts.
        </Typography>
      </Box>
    </Box>
  );
};

export default NurseDashboardOverview;
