import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import HealingIcon from '@mui/icons-material/Healing';
import FavoriteIcon from '@mui/icons-material/Favorite'; // Heart Rate
import ThermostatIcon from '@mui/icons-material/Thermostat'; // Temperature
import OpacityIcon from '@mui/icons-material/Opacity'; // Blood Pressure
import AirIcon from '@mui/icons-material/Air'; // Respiratory Rate

const NurseVitals = ({ nurse }) => {
  // Static data for demonstration
  const vitalsData = [
    {
      id: 1,
      patient: 'John Doe',
      date: '2025-07-28',
      time: '10:00 AM',
      temperature: '37.2 °C',
      heartRate: '78 bpm',
      bloodPressure: '120/80 mmHg',
      respiratoryRate: '16 breaths/min',
      notes: 'Patient resting comfortably.',
      status: 'Normal',
    },
    {
      id: 2,
      patient: 'Jane Smith',
      date: '2025-07-28',
      time: '11:00 AM',
      temperature: '38.5 °C',
      heartRate: '95 bpm',
      bloodPressure: '135/88 mmHg',
      respiratoryRate: '22 breaths/min',
      notes: 'Slightly elevated temperature, mild cough.',
      status: 'Elevated',
    },
    {
      id: 3,
      patient: 'Robert Johnson',
      date: '2025-07-28',
      time: '09:30 AM',
      temperature: '36.8 °C',
      heartRate: '70 bpm',
      bloodPressure: '110/70 mmHg',
      respiratoryRate: '14 breaths/min',
      notes: 'No new concerns.',
      status: 'Normal',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Normal': return 'success';
      case 'Elevated': return 'warning';
      case 'Critical': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', width: '100%' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.dark' }}>
        Vitals & Observations
      </Typography>

      <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, background: 'linear-gradient(145deg, #ffffff, #f0f2f5)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
          Patient Vitals Log
        </Typography>

        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="patient vitals table">
            <TableHead>
              <TableRow sx={{ bgcolor: '#e3f2fd' }}>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Patient</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Time</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Temp</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>HR</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>BP</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>RR</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Notes</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vitalsData.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}
                >
                  <TableCell>{row.patient}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  <TableCell><ThermostatIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />{row.temperature}</TableCell>
                  <TableCell><FavoriteIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />{row.heartRate}</TableCell>
                  <TableCell><OpacityIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />{row.bloodPressure}</TableCell>
                  <TableCell><AirIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />{row.respiratoryRate}</TableCell>
                  <TableCell>{row.notes}</TableCell>
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
          This table displays patient vital signs and observations.
        </Typography>
      </Box>
    </Box>
  );
};

NurseVitals.propTypes = {
  nurse: PropTypes.shape({
    userId: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    profilePic: PropTypes.string,
  }),
};

export default NurseVitals;
