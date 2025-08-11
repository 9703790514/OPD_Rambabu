import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  CircularProgress,
  Alert,
  Link,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';

const BillingDeskContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success', 'error', null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    // Simulate API call
    try {
      // In a real application, you would send this data to your backend API
      // Example:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      // if (!response.ok) {
      //   throw new Error('Failed to send message');
      // }

      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
      console.log('Contact form submitted:', formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' }); // Clear form
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, width: '100%', maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.dark' }}>
        Contact Sarvotham's Spine Care
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Contact Information Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
              Get in Touch
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOnIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="body1">
                  123 Spine Care Road, Health City, Bengaluru, Karnataka, India - 560001
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PhoneIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="body1">
                  +91 98765 43210
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmailIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="body1">
                  <Link href="mailto:support@sarvothamspinecare.com" color="inherit" underline="hover">
                    support@sarvothamspinecare.com
                  </Link>
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 'bold', color: 'text.primary' }}>
                Find Us on Map
              </Typography>
              <Link
                href="https://www.google.com/maps/search/Sarvotham's+Spine+Care+Bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: 'block', mt: 1 }}
              >
                <img
                  src="https://placehold.co/600x300/E0F2F7/000000?text=Map+Placeholder"
                  alt="Map Location"
                  style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x300/E0F2F7/000000?text=Map+Unavailable"; }}
                />
              </Link>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Click on the map to open in Google Maps
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Contact Form Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
              Send Us a Message
            </Typography>
            <form onSubmit={handleSubmit} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <TextField
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                label="Your Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                label="Your Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                fullWidth
                margin="normal"
                multiline
                rows={4}
                required
                variant="outlined"
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                disabled={loading}
                sx={{ mt: 'auto', py: 1.5, fontSize: '1.1rem' }} // Push to bottom
              >
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
              {status === 'success' && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  Your message has been sent successfully!
                </Alert>
              )}
              {status === 'error' && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  Failed to send message. Please try again.
                </Alert>
              )}
            </form>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6, opacity: 0.7, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          We look forward to hearing from you. Our team will get back to you as soon as possible.
        </Typography>
      </Box>
    </Box>
  );
};

export default BillingDeskContactUs;
