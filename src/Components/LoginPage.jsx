// import React, { useState } from 'react';
// import './LoginPage.css';
// import { Link, useNavigate } from 'react-router-dom';

// export const LoginPage = () => {
//   const navigate = useNavigate();

//   // Form state
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError('');

//     if (!email || !password) {
//       setError('Please enter both email and password.');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:2003/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email, password })
//       });

//       if (response.ok) {
//         const data = await response.json();

//         // Save token and user info, based on "remember me"
//         if (rememberMe) {
//           localStorage.setItem('authToken', data.token);
//           localStorage.setItem('username', data.username);
//           localStorage.setItem('role', data.role);
//           localStorage.setItem('userId', data.userId);
//           localStorage.setItem('email', data.email);
//         } else {
//           sessionStorage.setItem('authToken', data.token);
//           sessionStorage.setItem('username', data.username);
//           sessionStorage.setItem('role', data.role);
//           sessionStorage.setItem('userId', data.userId);
//           sessionStorage.setItem('email', data.email);
//         }

//         // Navigate to dashboard
//         navigate(data.dashboardUrl);
//       } else {
//         const errorText = await response.text();
//         setError(errorText || 'Login failed. Please try again.');
//       }
//     } catch (err) {
//       setError('Network error. Please try again later.');
//       console.error('Login error:', err);
//     }
//   };

//   return (
//     <div className="login-page-container">
//       <div className="login-card">
//         <div className="login-header">
//           <div className="app-logo">SSC</div>
//           <h2>Welcome Back!</h2>
//           <p>Login to access your Sarvotham's Spine Care account.</p>
//         </div>

//         <form className="login-form" onSubmit={handleSubmit}>
//           {error && <div className="error-message">{error}</div>}

//           <div className="form-group">
//             <label htmlFor="email">Email Address</label>
//             <input
//               type="email"
//               id="email"
//               placeholder="your.email@example.com"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               autoComplete="email"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Enter your password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               autoComplete="current-password"
//             />
//           </div>

//           <div className="form-options">
//             <div className="remember-me">
//               <input
//                 type="checkbox"
//                 id="rememberMe"
//                 checked={rememberMe}
//                 onChange={(e) => setRememberMe(e.target.checked)}
//               />
//               <label htmlFor="rememberMe">Remember me</label>
//             </div>
//             <a href="#forgot-password" className="forgot-password">Forgot Password?</a>
//           </div>

//           <button type="submit" className="login-button">
//             <i className="fas fa-sign-in-alt"></i> Login
//           </button>
//         </form>

//         <div className="register-link">
//           Don't have an account? <Link to="/register">Register here</Link>
//         </div>
//       </div>
//     </div>
//   );
// };
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './LoginPage.css';

// export const LoginPage = () => {
//   const navigate = useNavigate();

//   // Form state
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError('');

//     if (!email || !password) {
//       setError('Please enter both email and password.');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:2003/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       if (response.ok) {
//         const data = await response.json();

//         // Always store in sessionStorage only (no localStorage)
//         sessionStorage.setItem('authToken', data.token);
//         sessionStorage.setItem('username', data.username);
//         sessionStorage.setItem('role', data.role);
//         sessionStorage.setItem('userId', data.userId);
//         sessionStorage.setItem('email', data.email);
//         sessionStorage.setItem('profilePic', data.profilePic || '');

//         // Navigate to dashboard
//         navigate(data.dashboardUrl);
//       } else {
//         const errorText = await response.text();
//         setError(errorText || 'Login failed. Please try again.');
//       }
//     } catch (err) {
//       setError('Network error. Please try again later.');
//       console.error('Login error:', err);
//     }
//   };

//   return (
//     <div className="login-page-container">
//       <div className="login-card">
//         <div className="login-header">
//           <div className="app-logo">SSC</div>
//           <h2>Welcome Back!</h2>
//           <p>Login to access your Sarvotham's Spine Care account.</p>
//         </div>

//         <form className="login-form" onSubmit={handleSubmit}>
//           {error && <div className="error-message">{error}</div>}

//           <div className="form-group">
//             <label htmlFor="email">Email Address</label>
//             <input
//               type="email"
//               id="email"
//               placeholder="your.email@example.com"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               autoComplete="email"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Enter your password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               autoComplete="current-password"
//             />
//           </div>

//           <button type="submit" className="login-button">
//             <i className="fas fa-sign-in-alt"></i> Login
//           </button>
//         </form>

//         <div className="register-link">
//           Don't have an account? <Link to="/register">Register here</Link>
//         </div>
//       </div>
//     </div>
//   );
// };
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Container,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { styled } from '@mui/system';

// Define a theme for consistency
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2', contrastText: '#fff' },
    secondary: { main: '#388e3c' },
    background: { default: '#f5f7fa', paper: '#fff' },
    error: { main: '#d32f2f' },
    text: { primary: '#202124', secondary: '#5f6368' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: { fontWeight: 600, fontSize: '1.5rem' },
    body1: { fontSize: '1rem' },
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  maxWidth: '450px',
  width: '100%',
}));

const FormContainer = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:2003/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('authToken', data.token);
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('role', data.role);
        sessionStorage.setItem('userId', data.userId);
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('profilePic', data.profilePic || '');

        navigate(data.dashboardUrl);
      } else {
        const errorText = await response.text();
        setError(errorText || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'background.default',
        }}
      >
        <Container component="main" maxWidth="sm">
          <StyledPaper elevation={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <img
                src="https://imgs.search.brave.com/I3lfsdq9k6y3txb8rAS9ukU5dwws1WPVNNQq7NQEIXI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9ibHVlLW1lZGlj/YWwtZW1lcmdlbmN5/LXN0YXItbGlmZS13/aXRoLXdoaXRlLWNh/ZHVjZXVzLW1lZGlj/YWwtc3ltYm9sLXdo/aXRlLWJhY2tncm91/bmQtM2QtcmVuZGVy/aW5nXzQ3NjYxMi0x/NTA1NC5qcGc_c2Vt/dD1haXNfaHlicmlk/Jnc9NzQw"
                alt="Sarvotham Spine Care"
                style={{ height: '50px', marginRight: '10px' }}
              />
              <Typography component="h1" variant="h5" color="primary">
                Sarvotham's Spine Care
              </Typography>
            </Box>

            <FormContainer onSubmit={handleSubmit}>
              {error && (
                <Typography color="error" variant="body2" align="center">
                  {error}
                </Typography>
              )}

              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                id="email"
                type="email"
                placeholder="your.email@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                disabled={loading}
              />

              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                disabled={loading}
              />

              {/* Forgot Password link */}
              <Typography
                variant="body2"
                align="right"
                sx={{ cursor: 'pointer', color: 'primary.main', mb: 1 }}
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?
              </Typography>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 1, py: 1.5 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
              </Button>
            </FormContainer>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link to="/register" style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
                  Register here
                </Link>
              </Typography>
            </Box>
          </StyledPaper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;
