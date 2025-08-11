import React, { useState, useEffect } from 'react'; // Import useEffect
import PropTypes from 'prop-types';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, FormControl, InputLabel, Select,
  CircularProgress // Import CircularProgress for loading state
} from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // For Paid status
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'; // For Outstanding status
import CancelIcon from '@mui/icons-material/Cancel'; // For Cancelled/Overdue (if applicable)
import SaveIcon from '@mui/icons-material/Save';

const BillingDeskInvoicing = ({ billingDeskUser }) => {
  const [bills, setBills] = useState([]); // State to store fetched bills
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // State for new invoice dialog
  const [openNewInvoiceDialog, setOpenNewInvoiceDialog] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    patientId: '', // Changed from patientName to patientId to match API
    totalAmount: '', // Changed from amount to totalAmount
    billDate: '', // Changed from issueDate to billDate
    dueDate: '',
    status: 'Outstanding', // Default status for new invoices (can be adjusted)
    amountPaid: '', // New field for new invoice form
    balanceDue: '', // New field for new invoice form
    paymentMethod: '',
    transactionId: '',
    issuedByUserId: billingDeskUser?.userId || '', // Pre-fill with logged-in user ID
    billDocumentUrl: ''
  });

  // Effect to fetch bills from the API
  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Clear any previous errors

        const response = await fetch('http://localhost:2009/api/bills');

        if (!response.ok) {
          const errorBody = await response.text();
          throw new Error(`Failed to fetch bills: ${response.status} ${response.statusText} - ${errorBody}`);
        }

        const data = await response.json();
        console.log("Fetched bills data:", data);
        setBills(data); // Set the fetched data to state
      } catch (err) {
        console.error("Error fetching bills:", err);
        setError(err.message); // Store the error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchBills();
  }, []); // Empty dependency array means this effect runs once on component mount

  // Helper function to determine status based on balanceDue and dueDate
  const getBillStatus = (bill) => {
    if (bill.balanceDue > 0) {
      // You might want to add logic here to check if dueDate is passed
      // to differentiate between 'Outstanding' and 'Overdue'
      const today = new Date();
      const dueDate = new Date(bill.dueDate);
      if (dueDate < today) {
        return 'Overdue';
      }
      return 'Outstanding';
    }
    return 'Paid';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'success';
      case 'Outstanding': return 'warning';
      case 'Overdue': return 'error';
      case 'Draft': return 'info'; // For new invoices
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Paid': return <CheckCircleIcon fontSize="small" />;
      case 'Outstanding': return <HourglassEmptyIcon fontSize="small" />;
      case 'Overdue': return <CancelIcon fontSize="small" />;
      case 'Draft': return <HourglassEmptyIcon fontSize="small" />;
      default: return null;
    }
  };

  const handleCreateInvoice = () => {
    // Reset newInvoice state for a fresh form, pre-filling user ID
    setNewInvoice({
      patientId: '',
      totalAmount: '',
      billDate: new Date().toISOString().slice(0, 10), // Default to today
      dueDate: '',
      status: 'Outstanding', // Default status
      amountPaid: '',
      balanceDue: '',
      paymentMethod: '',
      transactionId: '',
      issuedByUserId: billingDeskUser?.userId || '',
      billDocumentUrl: ''
    });
    setOpenNewInvoiceDialog(true);
  };

  const handleCloseNewInvoiceDialog = () => {
    setOpenNewInvoiceDialog(false);
    // Form reset handled in handleCreateInvoice for clarity
  };

  const handleNewInvoiceChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveNewInvoice = async () => {
    // Basic frontend validation
    if (!newInvoice.patientId || !newInvoice.totalAmount || !newInvoice.billDate || !newInvoice.dueDate) {
      alert('Please fill all required fields: Patient ID, Amount, Issue Date, Due Date.');
      return;
    }

    // Convert amount fields to numbers
    const invoiceToSave = {
      ...newInvoice,
      totalAmount: parseFloat(newInvoice.totalAmount),
      amountPaid: parseFloat(newInvoice.amountPaid || 0), // Default to 0 if empty
      balanceDue: parseFloat(newInvoice.balanceDue || 0), // Default to 0 if empty
      // Ensure billDate is sent in YYYY-MM-DDTHH:MM:SSZ format if backend expects LocalDateTime/Instant
      // For now, assuming backend can handle YYYY-MM-DD for LocalDate or just the date part of LocalDateTime
      // If backend expects LocalDateTime, you'd do:
      // billDate: `${newInvoice.billDate}T00:00:00Z`,
      // createdAt: new Date().toISOString(), // Add createdAt/updatedAt if not handled by backend
      // updatedAt: new Date().toISOString()
    };

    // --- API Integration Placeholder for New Invoice ---
    // In a real application, you would send this 'invoiceToSave' object to your backend API
    // For example:
    /*
    try {
      const response = await fetch('http://localhost:2009/api/bills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceToSave),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Failed to save invoice: ${response.status} - ${errorBody}`);
      }
      const savedBill = await response.json();
      setBills((prev) => [...prev, savedBill]); // Add the newly saved bill from backend
      handleCloseNewInvoiceDialog();
    } catch (err) {
      console.error("Error saving new invoice:", err);
      alert(`Error saving invoice: ${err.message}`); // Use a better UI for errors
    }
    */

    // For now, still adding to local state for demonstration without backend POST
    const newId = bills.length > 0 ? Math.max(...bills.map(b => b.billId || 0)) + 1 : 1; // Use billId for logical ID
    const newUniqueId = `local-${Date.now()}`; // Unique ID for React key
    const invoiceToAddLocally = {
      ...invoiceToSave,
      id: newUniqueId, // Use a unique string for React key
      billId: newId, // Use a numerical billId for display
    };
    setBills((prev) => [...prev, invoiceToAddLocally]);
    console.log('New Invoice Saved (locally):', invoiceToAddLocally);
    handleCloseNewInvoiceDialog();
  };

  const handleEditInvoice = (billId) => {
    console.log(`Edit invoice ID: ${billId}`);
    // --- API Integration Placeholder for Edit Invoice ---
    // In a real application, you would fetch the invoice details, populate a form,
    // allow edits, and then send a PUT/PATCH request to your backend.
  };

  const handleSendInvoice = (billId) => {
    console.log(`Send invoice ID: ${billId}`);
    // --- API Integration Placeholder for Send Invoice ---
    // In a real application, you would send a request to your backend
    // to update the invoice status to 'Sent' and trigger any sending logic.
    setBills(prevBills =>
      prevBills.map(bill =>
        bill.billId === billId ? { ...bill, status: 'Sent' } : bill
      )
    );
  };

  // --- Render Loading/Error or Content ---
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>Loading invoices...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', width: '100%', textAlign: 'center' }}>
        <Typography variant="h6" color="error" sx={{ mt: 10 }}>Error: {error}</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>Failed to load invoices. Please check the server connection.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', width: '100%' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.dark' }}>
        Invoicing Management
      </Typography>

      <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, background: 'linear-gradient(145deg, #ffffff, #f0f2f5)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            All Invoices
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreateInvoice}
            sx={{ py: 1, px: 2, fontWeight: 'bold' }}
          >
            Create New Invoice
          </Button>
        </Box>

        {bills.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <ReceiptLongIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">No invoices found.</Typography>
            <Typography variant="body2" color="text.secondary">Click "Create New Invoice" to add one.</Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table sx={{ minWidth: 800 }} aria-label="invoices table">
              <TableHead>
                <TableRow sx={{ bgcolor: '#e3f2fd' }}>
                  <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Bill ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Patient ID</TableCell> {/* Changed to Patient ID */}
                  <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Total Amount</TableCell> {/* Changed to Total Amount */}
                  <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Amount Paid</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Balance Due</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Bill Date</TableCell> {/* Changed to Bill Date */}
                  <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Due Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bills.map((bill) => {
                  const status = getBillStatus(bill); // Dynamically determine status
                  return (
                    <TableRow
                      key={bill.id} // Use bill.id from API for key
                      sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}
                    >
                      <TableCell component="th" scope="row">
                        {bill.billId}
                      </TableCell>
                      <TableCell>{bill.patientId}</TableCell> {/* Display patientId */}
                      <TableCell>₹{bill.totalAmount ? bill.totalAmount.toFixed(2) : '0.00'}</TableCell>
                      <TableCell>₹{bill.amountPaid ? bill.amountPaid.toFixed(2) : '0.00'}</TableCell>
                      <TableCell>₹{bill.balanceDue ? bill.balanceDue.toFixed(2) : '0.00'}</TableCell>
                      <TableCell>{new Date(bill.billDate).toLocaleDateString()}</TableCell> {/* Format date */}
                      <TableCell>{new Date(bill.dueDate).toLocaleDateString()}</TableCell> {/* Format date */}
                      <TableCell>
                        <Chip
                          label={status}
                          color={getStatusColor(status)}
                          size="small"
                          icon={getStatusIcon(status)}
                        />
                      </TableCell>
                      <TableCell>
                        {(status === 'Outstanding' || status === 'Overdue' || status === 'Draft') && (
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<EditIcon />}
                            onClick={() => handleEditInvoice(bill.billId)} // Use billId for actions
                            sx={{ mr: 1 }}
                          >
                            Edit
                          </Button>
                        )}
                        {(status === 'Outstanding' || status === 'Draft') && (
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<SendIcon />}
                            onClick={() => handleSendInvoice(bill.billId)} // Use billId for actions
                          >
                            Send
                          </Button>
                        )}
                         {bill.billDocumentUrl && (
                            <Button
                                variant="text"
                                size="small"
                                href={bill.billDocumentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ ml: 1, textTransform: 'none' }}
                            >
                                View Document
                            </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Box sx={{ mt: 6, opacity: 0.7, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Create, manage, and send invoices for patient services.
        </Typography>
      </Box>

      {/* New Invoice Dialog */}
      <Dialog open={openNewInvoiceDialog} onClose={handleCloseNewInvoiceDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', pb: 1.5 }}>
          <Typography variant="h6" fontWeight="bold">
            Create New Invoice
          </Typography>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <TextField
            autoFocus
            margin="dense"
            name="patientId" // Changed to patientId
            label="Patient ID"
            type="text"
            fullWidth
            variant="outlined"
            value={newInvoice.patientId}
            onChange={handleNewInvoiceChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="totalAmount" // Changed to totalAmount
            label="Total Amount (₹)"
            type="number"
            fullWidth
            variant="outlined"
            value={newInvoice.totalAmount}
            onChange={handleNewInvoiceChange}
            required
            inputProps={{ step: "0.01" }}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="amountPaid"
            label="Amount Paid (₹)"
            type="number"
            fullWidth
            variant="outlined"
            value={newInvoice.amountPaid}
            onChange={handleNewInvoiceChange}
            inputProps={{ step: "0.01" }}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="balanceDue"
            label="Balance Due (₹)"
            type="number"
            fullWidth
            variant="outlined"
            value={newInvoice.balanceDue}
            onChange={handleNewInvoiceChange}
            inputProps={{ step: "0.01" }}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="billDate" // Changed to billDate
            label="Bill Date"
            type="date"
            fullWidth
            variant="outlined"
            value={newInvoice.billDate}
            onChange={handleNewInvoiceChange}
            InputLabelProps={{ shrink: true }}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="dueDate"
            label="Due Date"
            type="date"
            fullWidth
            variant="outlined"
            value={newInvoice.dueDate}
            onChange={handleNewInvoiceChange}
            InputLabelProps={{ shrink: true }}
            required
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth variant="outlined" margin="dense" sx={{ mb: 2 }}>
            <InputLabel id="payment-method-label">Payment Method</InputLabel>
            <Select
              labelId="payment-method-label"
              name="paymentMethod"
              value={newInvoice.paymentMethod}
              onChange={handleNewInvoiceChange}
              label="Payment Method"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="Credit Card">Credit Card</MenuItem>
              <MenuItem value="Debit Card">Debit Card</MenuItem>
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Net Banking">Net Banking</MenuItem>
              <MenuItem value="UPI">UPI</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="transactionId"
            label="Transaction ID"
            type="text"
            fullWidth
            variant="outlined"
            value={newInvoice.transactionId}
            onChange={handleNewInvoiceChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="issuedByUserId"
            label="Issued By User ID"
            type="text"
            fullWidth
            variant="outlined"
            value={newInvoice.issuedByUserId}
            onChange={handleNewInvoiceChange}
            disabled // This field is pre-filled and should not be editable
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="billDocumentUrl"
            label="Bill Document URL (Optional)"
            type="url"
            fullWidth
            variant="outlined"
            value={newInvoice.billDocumentUrl}
            onChange={handleNewInvoiceChange}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseNewInvoiceDialog} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveNewInvoice} variant="contained" color="primary" startIcon={<SaveIcon />}>
            Save Invoice
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

BillingDeskInvoicing.propTypes = {
  billingDeskUser: PropTypes.shape({
    userId: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    profilePic: PropTypes.string,
  }),
};

export default BillingDeskInvoicing;