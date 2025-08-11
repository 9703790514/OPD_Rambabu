import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Button, Box, Chip, Stack, styled } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

// Custom styled Card to add a colored border based on status
const StyledCard = styled(Card)(({ theme, status }) => ({
  width: '100%',
  cursor: 'pointer',
  transition: 'transform 0.3s, box-shadow 0.3s',
  borderLeft: `5px solid ${status === 'Scheduled' ? theme.palette.success.main : theme.palette.warning.main}`,
  '&:hover': {
    boxShadow: theme.shadows[6],
    transform: 'translateY(-5px)',
  },
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

// Helper component for icon and text
const InfoItem = ({ icon, label, value }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    {icon}
    <Typography variant="body2" color="text.secondary">
      {label}: <Typography component="span" variant="body2" color="text.primary" sx={{ fontWeight: 'bold' }}>{value}</Typography>
    </Typography>
  </Box>
);

const AppointmentCard = ({ appointment, onClick }) => {
  const appointmentDate = new Date(appointment.appointmentDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const appointmentTime = appointment.appointmentTime && appointment.appointmentTime !== "1970-01-01T00:00:00Z"
    ? new Date(`2000-01-01T${appointment.appointmentTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    : 'Not specified';
    
  const statusColor = appointment.status === 'Scheduled' ? 'success' : 'warning';

  return (
    <StyledCard onClick={() => onClick(appointment)} status={appointment.status}>
      <CardContent>
        <Stack spacing={1.5}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" component="div" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
              Appointment #{appointment.customId}
            </Typography>
            <Chip
              label={appointment.status}
              color={statusColor}
              size="small"
              sx={{ fontWeight: 'bold' }}
            />
          </Box>
          
          <Stack spacing={1}>
            <InfoItem 
              icon={<PersonIcon color="action" fontSize="small" />}
              label="Patient ID"
              value={appointment.patientId}
            />
            <InfoItem
              icon={<MedicalInformationIcon color="action" fontSize="small" />}
              label="Doctor ID"
              value={appointment.doctorId}
            />
            <InfoItem
              icon={<EventIcon color="action" fontSize="small" />}
              label="Date"
              value={appointmentDate}
            />
            <InfoItem
              icon={<AccessTimeIcon color="action" fontSize="small" />}
              label="Time"
              value={appointmentTime}
            />
          </Stack>
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
            Reason: {appointment.reasonForVisit || "Not specified"}
          </Typography>
        </Stack>
      </CardContent>
      <Box sx={{ p: 2, pt: 0, textAlign: 'right' }}>
        <Button 
          variant="contained" 
          color="primary"
          size="small" 
          onClick={(e) => {
            e.stopPropagation(); // Prevents the Card's onClick from firing
            onClick(appointment);
          }}
        >
          Generate Bill
        </Button>
      </Box>
    </StyledCard>
  );
};

AppointmentCard.propTypes = {
  appointment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    customId: PropTypes.number,
    patientId: PropTypes.string.isRequired,
    doctorId: PropTypes.number.isRequired,
    appointmentDate: PropTypes.string.isRequired,
    appointmentTime: PropTypes.string,
    reasonForVisit: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AppointmentCard;