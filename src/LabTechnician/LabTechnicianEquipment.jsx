import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button } from '@mui/material';
import BiotechIcon from '@mui/icons-material/Biotech';
import BuildIcon from '@mui/icons-material/Build'; // Maintenance icon
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // Date icon
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const LabTechnicianEquipment = ({ labTechnician }) => {
  // Static data for demonstration
  const equipmentData = [
    {
      id: 1,
      name: 'Automated Hematology Analyzer',
      serialNumber: 'HA-2023-001',
      lastCalibration: '2025-06-15',
      nextMaintenance: '2025-09-15',
      status: 'Operational',
    },
    {
      id: 2,
      name: 'Clinical Chemistry Analyzer',
      serialNumber: 'CA-2023-002',
      lastCalibration: '2025-07-01',
      nextMaintenance: '2025-08-01',
      status: 'Maintenance Due',
    },
    {
      id: 3,
      name: 'Microscope (Compound)',
      serialNumber: 'MIC-2023-003',
      lastCalibration: '2024-12-10',
      nextMaintenance: '2025-12-10',
      status: 'Operational',
    },
    {
      id: 4,
      name: 'Centrifuge (High-Speed)',
      serialNumber: 'CEN-2023-004',
      lastCalibration: '2025-07-20',
      nextMaintenance: '2025-10-20',
      status: 'Operational',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Operational': return 'success';
      case 'Maintenance Due': return 'warning';
      case 'Out of Service': return 'error';
      default: return 'default';
    }
  };

  const handleScheduleMaintenance = (equipmentId) => {
    console.log(`Schedule maintenance for equipment ID: ${equipmentId}`);
    // Implement logic to schedule maintenance
  };

  const handleAddEquipment = () => {
    console.log('Add New Equipment clicked!');
    // Implement logic to open a form for adding new equipment
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', width: '100%' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.dark' }}>
        Equipment Management
      </Typography>

      <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, background: 'linear-gradient(145deg, #ffffff, #f0f2f5)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Lab Equipment List
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleAddEquipment}
            sx={{ py: 1, px: 2, fontWeight: 'bold' }}
          >
            Add New Equipment
          </Button>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="lab equipment table">
            <TableHead>
              <TableRow sx={{ bgcolor: '#e3f2fd' }}>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Equipment Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Serial Number</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Last Calibration</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Next Maintenance</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {equipmentData.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}
                >
                  <TableCell component="th" scope="row">
                    <BiotechIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />{row.name}
                  </TableCell>
                  <TableCell>{row.serialNumber}</TableCell>
                  <TableCell><CalendarTodayIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />{row.lastCalibration}</TableCell>
                  <TableCell><CalendarTodayIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />{row.nextMaintenance}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      color={getStatusColor(row.status)}
                      size="small"
                      icon={row.status === 'Operational' ? <CheckCircleIcon fontSize="small" /> : <WarningIcon fontSize="small" />}
                    />
                  </TableCell>
                  <TableCell>
                    {row.status === 'Maintenance Due' && (
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<BuildIcon />}
                        onClick={() => handleScheduleMaintenance(row.id)}
                      >
                        Schedule Maint.
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
          Monitor, calibrate, and maintain laboratory equipment to ensure accuracy and reliability.
        </Typography>
      </Box>
    </Box>
  );
};

LabTechnicianEquipment.propTypes = {
  labTechnician: PropTypes.shape({
    userId: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    profilePic: PropTypes.string,
  }),
};

export default LabTechnicianEquipment;
