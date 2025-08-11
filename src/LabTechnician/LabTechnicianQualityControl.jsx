import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const LabTechnicianQualityControl = ({ labTechnician }) => {
  // Static data for demonstration
  const qcData = [
    {
      id: 1,
      qcId: 'QC-2025-001',
      testType: 'Blood Glucose',
      date: '2025-07-28',
      result: 'Pass',
      analyst: 'David Lee',
      status: 'Completed',
    },
    {
      id: 2,
      qcId: 'QC-2025-002',
      testType: 'Cholesterol Panel',
      date: '2025-07-27',
      result: 'Fail',
      analyst: 'Sarah Chen',
      status: 'Action Required',
    },
    {
      id: 3,
      qcId: 'QC-2025-003',
      testType: 'Urinalysis',
      date: '2025-07-26',
      result: 'Pass',
      analyst: 'David Lee',
      status: 'Completed',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'Action Required': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return <CheckCircleOutlineIcon fontSize="small" />;
      case 'Action Required': return <ErrorOutlineIcon fontSize="small" />;
      default: return null;
    }
  };

  const handleAddQcEntry = () => {
    console.log('Add New QC Entry clicked!');
    // Implement logic to open a form for adding a new QC entry
  };

  const handleReviewAction = (qcId) => {
    console.log(`Review action for QC ID: ${qcId}`);
    // Implement logic to review and resolve QC issues
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', width: '100%' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.dark' }}>
        Quality Control & Assurance
      </Typography>

      <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, background: 'linear-gradient(145deg, #ffffff, #f0f2f5)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Quality Control Log
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleAddQcEntry}
            sx={{ py: 1, px: 2, fontWeight: 'bold' }}
          >
            Add New QC Entry
          </Button>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="quality control table">
            <TableHead>
              <TableRow sx={{ bgcolor: '#e3f2fd' }}>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>QC ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Test Type</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Result</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Analyst</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {qcData.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}
                >
                  <TableCell component="th" scope="row">
                    {row.qcId}
                  </TableCell>
                  <TableCell>{row.testType}</TableCell>
                  <TableCell><CalendarTodayIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />{row.date}</TableCell>
                  <TableCell>{row.result}</TableCell>
                  <TableCell>{row.analyst}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      color={getStatusColor(row.status)}
                      size="small"
                      icon={getStatusIcon(row.status)}
                    />
                  </TableCell>
                  <TableCell>
                    {row.status === 'Action Required' && (
                      <Button
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={() => handleReviewAction(row.id)}
                      >
                        Review
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
          Perform quality control checks and ensure adherence to laboratory standards and regulations.
        </Typography>
      </Box>
    </Box>
  );
};

LabTechnicianQualityControl.propTypes = {
  labTechnician: PropTypes.shape({
    userId: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    profilePic: PropTypes.string,
  }),
};

export default LabTechnicianQualityControl;
