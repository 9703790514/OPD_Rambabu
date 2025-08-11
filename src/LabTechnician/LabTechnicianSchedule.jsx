import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ScienceIcon from '@mui/icons-material/Science';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const LabTechnicianSchedule = ({ labTechnician }) => {
  // Static data for demonstration
  const scheduleData = [
    {
      id: 1,
      date: '2025-07-28',
      time: '08:00 AM - 10:00 AM',
      task: 'Blood Sample Processing',
      location: 'Hematology Lab',
      status: 'In Progress',
    },
    {
      id: 2,
      date: '2025-07-28',
      time: '10:30 AM - 12:00 PM',
      task: 'Urine Analysis Batch Run',
      location: 'Urinalysis Section',
      status: 'Pending',
    },
    {
      id: 3,
      date: '2025-07-28',
      time: '01:00 PM - 02:00 PM',
      task: 'Equipment Calibration (Centrifuge)',
      location: 'Equipment Room',
      status: 'Scheduled',
    },
    {
      id: 4,
      date: '2025-07-29',
      time: '09:00 AM - 11:00 AM',
      task: 'Microbiology Culture Setup',
      location: 'Microbiology Lab',
      status: 'Scheduled',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress': return 'warning';
      case 'Pending': return 'info';
      case 'Scheduled': return 'primary';
      case 'Completed': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', width: '100%' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.dark' }}>
        My Lab Schedule
      </Typography>

      <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, background: 'linear-gradient(145deg, #ffffff, #f0f2f5)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
          Daily Tasks & Appointments
        </Typography>

        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="lab technician schedule table">
            <TableHead>
              <TableRow sx={{ bgcolor: '#e3f2fd' }}>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Time</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Task</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scheduleData.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}
                >
                  <TableCell component="th" scope="row">
                    {row.date}
                  </TableCell>
                  <TableCell><AccessTimeIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />{row.time}</TableCell>
                  <TableCell><ScienceIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />{row.task}</TableCell>
                  <TableCell><LocationOnIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />{row.location}</TableCell>
                  <TableCell>
                    <Chip label={row.status} color={getStatusColor(row.status)} size="small" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box sx={{ mt: 6, opacity: 0.7, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          View and manage your daily lab tasks and testing schedule.
        </Typography>
      </Box>
    </Box>
  );
};

LabTechnicianSchedule.propTypes = {
  labTechnician: PropTypes.shape({
    userId: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    profilePic: PropTypes.string,
  }),
};

export default LabTechnicianSchedule;
