import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const NurseSchedule = ({ nurse }) => { // Accept nurse prop
  // Static data for demonstration
  const scheduleData = [
    {
      id: 1,
      date: '2025-07-28',
      time: '08:00 AM - 09:00 AM',
      task: 'Patient Vitals Check',
      patient: 'John Doe',
      room: '201A',
      status: 'Completed',
    },
    {
      id: 2,
      date: '2025-07-28',
      time: '09:30 AM - 10:00 AM',
      task: 'Medication Administration',
      patient: 'Jane Smith',
      room: '203B',
      status: 'Pending',
    },
    {
      id: 3,
      date: '2025-07-28',
      time: '11:00 AM - 12:00 PM',
      task: 'Assist with Physical Therapy',
      patient: 'Robert Johnson',
      room: 'Rehab Gym',
      status: 'Pending',
    },
    {
      id: 4,
      date: '2025-07-29',
      time: '07:00 AM - 08:00 AM',
      task: 'Shift Handover',
      patient: 'N/A',
      room: 'Nurse Station',
      status: 'Scheduled',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'Pending': return 'warning';
      case 'Scheduled': return 'info';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', width: '100%' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.dark' }}>
        My Schedule & Tasks
      </Typography>

      <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, background: 'linear-gradient(145deg, #ffffff, #f0f2f5)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
          Today's Schedule
        </Typography>

        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="nurse schedule table">
            <TableHead>
              <TableRow sx={{ bgcolor: '#e3f2fd' }}>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Time</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Task</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Patient</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Room/Location</TableCell>
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
                  <TableCell>{row.task}</TableCell>
                  <TableCell><PersonIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />{row.patient}</TableCell>
                  <TableCell><LocationOnIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />{row.room}</TableCell>
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
          This table displays your daily tasks and appointments.
        </Typography>
      </Box>
    </Box>
  );
};

NurseSchedule.propTypes = {
  nurse: PropTypes.shape({
    userId: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    profilePic: PropTypes.string,
  }),
};

export default NurseSchedule;
