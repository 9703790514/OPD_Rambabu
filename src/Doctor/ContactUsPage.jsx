import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const ContactUsPage = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom component="h1">
        Contact Us
      </Typography>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
            <Typography variant="h5" gutterBottom>
              Get in Touch
            </Typography>
            <Typography variant="body1" paragraph>
              We are here to answer any questions you may have about our services. Feel free to reach out to us, and we'll get back to you as soon as possible.
            </Typography>
            <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Your Name"
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Your Email"
                margin="normal"
                variant="outlined"
                type="email"
              />
              <TextField
                fullWidth
                label="Subject"
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Your Message"
                margin="normal"
                variant="outlined"
                multiline
                rows={4}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 3 }}
              >
                Send Message
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
            <Typography variant="h5" gutterBottom>
              Clinic Information
            </Typography>
            <Stack spacing={2} sx={{ mt: 3 }}>
              <Box display="flex" alignItems="center">
                <LocationOnIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="body1">
                  123 Spine Lane, Health City, CA 90210
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <PhoneIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="body1">
                  +1 (555) 123-4567
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <EmailIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="body1">
                  contact@sarvothamspinecare.com
                </Typography>
              </Box>
              <Box display="flex" alignItems="flex-start">
                <CalendarMonthIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
                <Box>
                  <Typography variant="body1" component="div">
                    **Working Hours:**
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Monday - Friday: 9:00 AM - 5:00 PM
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Saturday: 9:00 AM - 1:00 PM
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sunday: Closed
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactUsPage;
