// // // import React, { useState, useEffect } from 'react';
// // // import PropTypes from 'prop-types';
// // // import {
// // //   Box, Typography, Paper, TextField, Button,
// // //   FormControl, InputLabel, Select, MenuItem,
// // //   Snackbar, Alert, CircularProgress,
// // //   IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Divider,
// // //   Grid // Ensure Grid is imported
// // // } from '@mui/material';
// // // import AddIcon from '@mui/icons-material/Add';
// // // import SaveIcon from '@mui/icons-material/Save';
// // // import ClearIcon from '@mui/icons-material/Clear';
// // // import DeleteIcon from '@mui/icons-material/Delete';
// // // // AttachMoneyIcon is imported but not used, can be removed if not needed

// // // const BillingDeskGenerateBill = ({ billingDeskUser }) => {
// // //   const initialBillState = {
// // //     patientId: '',
// // //     totalAmount: 0,
// // //     amountPaid: '',
// // //     balanceDue: '',
// // //     billDate: new Date().toISOString().slice(0, 10),
// // //     dueDate: '',
// // //     paymentMethod: '',
// // //     transactionId: '',
// // //     issuedByUserId: billingDeskUser?.userId || '',
// // //     billDocumentUrl: '',
// // //     appointmentId: '',
// // //     billItems: [],
// // //   };

// // //   const initialBillItemState = {
// // //     description: '',
// // //     quantity: 1,
// // //     unitPrice: '',
// // //     serviceDate: new Date().toISOString().slice(0, 10),
// // //     notes: '',
// // //   };

// // //   const [billData, setBillData] = useState(initialBillState);
// // //   const [currentBillItem, setCurrentBillItem] = useState(initialBillItemState);
// // //   const [submitting, setSubmitting] = useState(false);
// // //   const [snackbarOpen, setSnackbarOpen] = useState(false);
// // //   const [snackbarMessage, setSnackbarMessage] = useState('');
// // //   const [snackbarSeverity, setSnackbarSeverity] = useState('success');

// // //   // --- New states for fetching bill items ---
// // //   const [availableBillItems, setAvailableBillItems] = useState([]);
// // //   const [loadingAvailableItems, setLoadingAvailableItems] = useState(true);
// // //   const [fetchItemsError, setFetchItemsError] = useState(null);
// // //   const [selectedExistingItemId, setSelectedExistingItemId] = useState(''); // To manage dropdown selection
// // //   // ------------------------------------------

// // //   // Effect to pre-fill issuedByUserId and reset form on user change or mount
// // //   useEffect(() => {
// // //     setBillData(prev => ({
// // //       ...prev,
// // //       issuedByUserId: billingDeskUser?.userId || '',
// // //       billDate: new Date().toISOString().slice(0, 10),
// // //     }));
// // //   }, [billingDeskUser]);

// // //   // Effect to calculate totalAmount and balanceDue
// // //   useEffect(() => {
// // //     const calculatedTotalAmount = billData.billItems.reduce((sum, item) => {
// // //       const itemQuantity = parseFloat(item.quantity);
// // //       const itemUnitPrice = parseFloat(item.unitPrice);
// // //       return sum + (isNaN(itemQuantity) || isNaN(itemUnitPrice) ? 0 : itemQuantity * itemUnitPrice);
// // //     }, 0);

// // //     const paid = parseFloat(billData.amountPaid);
// // //     const calculatedBalanceDue = calculatedTotalAmount - (isNaN(paid) ? 0 : paid);

// // //     setBillData(prev => ({
// // //       ...prev,
// // //       totalAmount: calculatedTotalAmount.toFixed(2),
// // //       balanceDue: calculatedBalanceDue.toFixed(2),
// // //     }));
// // //   }, [billData.billItems, billData.amountPaid]);

// // //   // --- New useEffect to fetch all available bill items ---
// // //   useEffect(() => {
// // //     const fetchAllBillItems = async () => {
// // //       try {
// // //         setLoadingAvailableItems(true);
// // //         setFetchItemsError(null);
// // //         const response = await fetch('http://localhost:2009/api/bill-items');
// // //         if (!response.ok) {
// // //           throw new Error(`Failed to fetch bill items: ${response.status} ${response.statusText}`);
// // //         }
// // //         const data = await response.json();
// // //         setAvailableBillItems(data);
// // //       } catch (error) {
// // //         console.error("Error fetching available bill items:", error);
// // //         setFetchItemsError(error.message);
// // //         setSnackbarMessage(`Error loading existing items: ${error.message}`);
// // //         setSnackbarSeverity('error');
// // //         setSnackbarOpen(true);
// // //       } finally {
// // //         setLoadingAvailableItems(false);
// // //       }
// // //     };

// // //     fetchAllBillItems();
// // //   }, []); // Empty dependency array means this runs once on mount
// // //   // --------------------------------------------------------

// // //   const handleBillChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setBillData(prev => ({ ...prev, [name]: value }));
// // //   };

// // //   const handleBillItemChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setCurrentBillItem(prev => ({ ...prev, [name]: value }));
// // //     // If user starts typing, clear existing selection
// // //     if (name !== 'serviceDate' && name !== 'notes') { // Allow changing date/notes without clearing selection
// // //         setSelectedExistingItemId('');
// // //     }
// // //   };

// // //   // --- New handler for selecting an existing bill item ---
// // //   const handleExistingItemSelect = (e) => {
// // //     const selectedId = e.target.value;
// // //     setSelectedExistingItemId(selectedId); // Update the dropdown's value

// // //     if (selectedId === '') {
// // //       setCurrentBillItem(initialBillItemState); // Clear if "None" is selected
// // //       return;
// // //     }

// // //     const selectedItem = availableBillItems.find(item => item.id === selectedId);
// // //     if (selectedItem) {
// // //       // Populate currentBillItem with details from the selected item
// // //       setCurrentBillItem({
// // //         description: selectedItem.description || '',
// // //         quantity: selectedItem.quantity || 1, // Default quantity to 1 if not present
// // //         unitPrice: selectedItem.unitPrice || '',
// // //         serviceDate: selectedItem.serviceDate ? new Date(selectedItem.serviceDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
// // //         notes: selectedItem.notes || '',
// // //       });
// // //     }
// // //   };
// // //   // --------------------------------------------------------

// // //   const handleAddBillItem = () => {
// // //     // Basic validation for bill item
// // //     if (!currentBillItem.description || isNaN(parseFloat(currentBillItem.quantity)) || isNaN(parseFloat(currentBillItem.unitPrice)) || parseFloat(currentBillItem.quantity) <= 0 || parseFloat(currentBillItem.unitPrice) <= 0) {
// // //       setSnackbarMessage('Please fill in valid Description, Quantity, and Unit Price for the bill item.');
// // //       setSnackbarSeverity('error');
// // //       setSnackbarOpen(true);
// // //       return;
// // //     }

// // //     setBillData(prev => ({
// // //       ...prev,
// // //       billItems: [...prev.billItems, { ...currentBillItem, tempId: Date.now() + Math.random() }], // Add tempId for unique key
// // //     }));
// // //     setCurrentBillItem(initialBillItemState); // Reset item form
// // //     setSelectedExistingItemId(''); // Reset dropdown
// // //     setSnackbarMessage('Bill item added.');
// // //     setSnackbarSeverity('info');
// // //     setSnackbarOpen(true);
// // //   };

// // //   const handleRemoveBillItem = (tempIdToRemove) => {
// // //     setBillData(prev => ({
// // //       ...prev,
// // //       billItems: prev.billItems.filter(item => item.tempId !== tempIdToRemove),
// // //     }));
// // //     setSnackbarMessage('Bill item removed.');
// // //     setSnackbarSeverity('info');
// // //     setSnackbarOpen(true);
// // //   };

// // //   const handleClearForm = () => {
// // //     setBillData(initialBillState);
// // //     setCurrentBillItem(initialBillItemState);
// // //     setSelectedExistingItemId(''); // Clear dropdown too
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setSubmitting(true);
// // //     setSnackbarOpen(false);

// // //     // Client-side validation for main bill details
// // //     if (!billData.patientId || !billData.billDate || !billData.dueDate) {
// // //       setSnackbarMessage('Please fill in all required bill details: Patient ID, Bill Date, Due Date.');
// // //       setSnackbarSeverity('error');
// // //       setSnackbarOpen(true);
// // //       setSubmitting(false);
// // //       return;
// // //     }

// // //     if (billData.billItems.length === 0) {
// // //       setSnackbarMessage('Please add at least one bill item.');
// // //       setSnackbarSeverity('error');
// // //       setSnackbarOpen(true);
// // //       setSubmitting(false);
// // //       return;
// // //     }

// // //     // Prepare main bill data for API
// // //     const mainBillToCreate = {
// // //       patientId: billData.patientId,
// // //       billDate: billData.billDate,
// // //       totalAmount: parseFloat(billData.totalAmount), // Use calculated total
// // //       amountPaid: parseFloat(billData.amountPaid || 0),
// // //       balanceDue: parseFloat(billData.balanceDue || 0),
// // //       paymentMethod: billData.paymentMethod || null,
// // //       transactionId: billData.transactionId || null,
// // //       issuedByUserId: billData.issuedByUserId,
// // //       billDocumentUrl: billData.billDocumentUrl || null,
// // //       dueDate: billData.dueDate,
// // //       appointmentId: billData.appointmentId || null,
// // //     };

// // //     try {
// // //       // 1. Create the main bill
// // //       const billResponse = await fetch('http://localhost:2009/api/bills', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify(mainBillToCreate),
// // //       });

// // //       if (!billResponse.ok) {
// // //         const errorData = await billResponse.json();
// // //         throw new Error(errorData.message || `Failed to create main bill: ${billResponse.status} ${billResponse.statusText}`);
// // //       }

// // //       const createdBill = await billResponse.json();
// // //       // IMPORTANT: Adjust this line based on what your Spring Boot /api/bills POST endpoint returns as the bill ID.
// // //       // If it returns a MongoDB _id, it might be `createdBill.id` or `createdBill._id`.
// // //       // If it's a generated `billId` (e.g., auto-incremented), use that field name.
// // //       // For this example, I'll assume it returns a field called `id` for MongoDB's _id.
// // //       const newBillId = createdBill.id; // Adjust this if your ID field is named differently (e.g., createdBill.billId)

// // //       // 2. Create each bill item linked to the new billId
// // //       const billItemsPromises = billData.billItems.map(async (item) => {
// // //         const itemToCreate = {
// // //           billId: newBillId, // Link to the newly created main bill
// // //           description: item.description,
// // //           quantity: parseFloat(item.quantity),
// // //           unitPrice: parseFloat(item.unitPrice),
// // //           serviceDate: item.serviceDate,
// // //           notes: item.notes || null,
// // //           appointmentId: billData.appointmentId || null, // Use main bill's appointmentId for item
// // //         };

// // //         const itemResponse = await fetch('http://localhost:2009/api/bill-items', {
// // //           method: 'POST',
// // //           headers: {
// // //             'Content-Type': 'application/json',
// // //           },
// // //           body: JSON.stringify(itemToCreate),
// // //         });

// // //         if (!itemResponse.ok) {
// // //           const errorItemData = await itemResponse.json();
// // //           console.error(`Failed to create bill item for billId ${newBillId}:`, errorItemData);
// // //           return { success: false, item, error: errorItemData.message };
// // //         }
// // //         return { success: true, item: await itemResponse.json() };
// // //       });

// // //       const billItemsResults = await Promise.all(billItemsPromises);

// // //       const failedItems = billItemsResults.filter(res => !res.success);

// // //       if (failedItems.length > 0) {
// // //         setSnackbarMessage(`Bill created, but ${failedItems.length} item(s) failed to add. Check console for details.`);
// // //         setSnackbarSeverity('warning');
// // //       } else {
// // //         setSnackbarMessage('Bill and all items generated successfully!');
// // //         setSnackbarSeverity('success');
// // //       }
// // //       setSnackbarOpen(true);
// // //       handleClearForm(); // Clear form after successful submission
// // //     } catch (err) {
// // //       console.error('Overall error generating bill:', err);
// // //       setSnackbarMessage(`Error generating bill: ${err.message}`);
// // //       setSnackbarSeverity('error');
// // //       setSnackbarOpen(true);
// // //     } finally {
// // //       setSubmitting(false);
// // //     }
// // //   };

// // //   const handleSnackbarClose = (event, reason) => {
// // //     if (reason === 'clickaway') {
// // //       return;
// // //     }
// // //     setSnackbarOpen(false);
// // //   };

// // //   return (
// // //     <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 900, mx: 'auto', width: '100%' }}>
// // //       <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.dark' }}>
// // //         Generate New Bill
// // //       </Typography>

// // //       <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, background: 'linear-gradient(145deg, #ffffff, #f0f2f5)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
// // //         <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 3 }}>
// // //           {/* Main Bill Details */}
// // //           <Typography variant="h6" sx={{ mb: 1, color: 'primary.main', gridColumn: 'span 2' }}>Bill Details</Typography>
// // //           <Grid container spacing={3}>
// // //             <Grid item xs={12} sm={6}>
// // //               <TextField
// // //                 label="Patient ID"
// // //                 name="patientId"
// // //                 value={billData.patientId}
// // //                 onChange={handleBillChange}
// // //                 fullWidth
// // //                 required
// // //                 variant="outlined"
// // //               />
// // //             </Grid>
// // //             <Grid item xs={12} sm={6}>
// // //               <TextField
// // //                 label="Appointment ID (Optional)"
// // //                 name="appointmentId"
// // //                 value={billData.appointmentId}
// // //                 onChange={handleBillChange}
// // //                 fullWidth
// // //                 variant="outlined"
// // //               />
// // //             </Grid>
// // //             <Grid item xs={12} sm={6}>
// // //               <TextField
// // //                 label="Amount Paid (₹)"
// // //                 name="amountPaid"
// // //                 type="number"
// // //                 value={billData.amountPaid}
// // //                 onChange={handleBillChange}
// // //                 fullWidth
// // //                 inputProps={{ step: "0.01" }}
// // //                 variant="outlined"
// // //               />
// // //             </Grid>
// // //             <Grid item xs={12} sm={6}>
// // //               <TextField
// // //                 label="Total Amount (₹)"
// // //                 name="totalAmount"
// // //                 value={billData.totalAmount}
// // //                 fullWidth
// // //                 variant="outlined"
// // //                 InputProps={{ readOnly: true }}
// // //                 sx={{ bgcolor: '#e0f7fa' }}
// // //               />
// // //             </Grid>
// // //             <Grid item xs={12} sm={6}>
// // //               <TextField
// // //                 label="Balance Due (₹)"
// // //                 name="balanceDue"
// // //                 value={billData.balanceDue}
// // //                 fullWidth
// // //                 variant="outlined"
// // //                 InputProps={{ readOnly: true }}
// // //                 sx={{ bgcolor: '#ffe0b2' }}
// // //               />
// // //             </Grid>
// // //             <Grid item xs={12} sm={6}>
// // //               <TextField
// // //                 label="Bill Date"
// // //                 name="billDate"
// // //                 type="date"
// // //                 value={billData.billDate}
// // //                 onChange={handleBillChange}
// // //                 fullWidth
// // //                 required
// // //                 InputLabelProps={{ shrink: true }}
// // //                 variant="outlined"
// // //               />
// // //             </Grid>
// // //             <Grid item xs={12} sm={6}>
// // //               <TextField
// // //                 label="Due Date"
// // //                 name="dueDate"
// // //                 type="date"
// // //                 value={billData.dueDate}
// // //                 onChange={handleBillChange}
// // //                 fullWidth
// // //                 required
// // //                 InputLabelProps={{ shrink: true }}
// // //                 variant="outlined"
// // //               />
// // //             </Grid>
// // //             <Grid item xs={12} sm={6}>
// // //               <FormControl fullWidth variant="outlined">
// // //                 <InputLabel>Payment Method</InputLabel>
// // //                 <Select
// // //                   label="Payment Method"
// // //                   name="paymentMethod"
// // //                   value={billData.paymentMethod}
// // //                   onChange={handleBillChange}
// // //                 >
// // //                   <MenuItem value=""><em>None</em></MenuItem>
// // //                   <MenuItem value="Credit Card">Credit Card</MenuItem>
// // //                   <MenuItem value="Debit Card">Debit Card</MenuItem>
// // //                   <MenuItem value="Cash">Cash</MenuItem>
// // //                   <MenuItem value="Net Banking">Net Banking</MenuItem>
// // //                   <MenuItem value="UPI">UPI</MenuItem>
// // //                   <MenuItem value="Cheque">Cheque</MenuItem>
// // //                 </Select>
// // //               </FormControl>
// // //             </Grid>
// // //             <Grid item xs={12} sm={6}>
// // //               <TextField
// // //                 label="Transaction ID (Optional)"
// // //                 name="transactionId"
// // //                 value={billData.transactionId}
// // //                 onChange={handleBillChange}
// // //                 fullWidth
// // //                 variant="outlined"
// // //               />
// // //             </Grid>
// // //             <Grid item xs={12} sm={6}>
// // //               <TextField
// // //                 label="Issued By User ID"
// // //                 name="issuedByUserId"
// // //                 value={billData.issuedByUserId}
// // //                 fullWidth
// // //                 variant="outlined"
// // //                 InputProps={{ readOnly: true }}
// // //               />
// // //             </Grid>
// // //             <Grid item xs={12} sm={6}>
// // //               <TextField
// // //                 label="Bill Document URL (Optional)"
// // //                 name="billDocumentUrl"
// // //                 type="url"
// // //                 value={billData.billDocumentUrl}
// // //                 onChange={handleBillChange}
// // //                 fullWidth
// // //                 variant="outlined"
// // //               />
// // //             </Grid>
// // //           </Grid>

// // //           <Divider sx={{ my: 4, gridColumn: 'span 2' }}>
// // //             <Typography variant="h6" color="text.secondary">Bill Items</Typography>
// // //           </Divider>

// // //           {/* Add New Bill Item Form */}
// // //           <Grid container spacing={2} sx={{ mb: 3 }}>
// // //             <Grid item xs={12}>
// // //               <FormControl fullWidth variant="outlined" disabled={loadingAvailableItems}>
// // //                 <InputLabel id="select-existing-item-label">Select Existing Item</InputLabel>
// // //                 <Select
// // //                   labelId="select-existing-item-label"
// // //                   id="select-existing-item"
// // //                   value={selectedExistingItemId}
// // //                   onChange={handleExistingItemSelect}
// // //                   label="Select Existing Item"
// // //                 >
// // //                   <MenuItem value="">
// // //                     <em>{loadingAvailableItems ? 'Loading items...' : 'Select or Add New Item'}</em>
// // //                   </MenuItem>
// // //                   {fetchItemsError && (
// // //                     <MenuItem disabled>Error loading items: {fetchItemsError}</MenuItem>
// // //                   )}
// // //                   {availableBillItems.map((item) => (
// // //                     <MenuItem key={item.id} value={item.id}>
// // //                       {item.description} (₹{item.unitPrice})
// // //                     </MenuItem>
// // //                   ))}
// // //                 </Select>
// // //               </FormControl>
// // //             </Grid>
// // //             <Grid item xs={12} sm={6}>
// // //               <TextField
// // //                 label="Item Description"
// // //                 name="description"
// // //                 value={currentBillItem.description}
// // //                 onChange={handleBillItemChange}
// // //                 fullWidth
// // //                 variant="outlined"
// // //               />
// // //             </Grid>
// // //             <Grid item xs={6} sm={3}>
// // //               <TextField
// // //                 label="Quantity"
// // //                 name="quantity"
// // //                 type="number"
// // //                 value={currentBillItem.quantity}
// // //                 onChange={handleBillItemChange}
// // //                 fullWidth
// // //                 inputProps={{ min: 1 }}
// // //                 variant="outlined"
// // //               />
// // //             </Grid>
// // //             <Grid item xs={6} sm={3}>
// // //               <TextField
// // //                 label="Unit Price (₹)"
// // //                 name="unitPrice"
// // //                 type="number"
// // //                 value={currentBillItem.unitPrice}
// // //                 onChange={handleBillItemChange}
// // //                 fullWidth
// // //                 inputProps={{ step: "0.01", min: 0 }}
// // //                 variant="outlined"
// // //               />
// // //             </Grid>
// // //             <Grid item xs={12} sm={6}>
// // //               <TextField
// // //                 label="Service Date"
// // //                 name="serviceDate"
// // //                 type="date"
// // //                 value={currentBillItem.serviceDate}
// // //                 onChange={handleBillItemChange}
// // //                 fullWidth
// // //                 InputLabelProps={{ shrink: true }}
// // //                 variant="outlined"
// // //               />
// // //             </Grid>
// // //             <Grid item xs={12} sm={6}>
// // //               <TextField
// // //                 label="Notes (Item Specific)"
// // //                 name="notes"
// // //                 value={currentBillItem.notes}
// // //                 onChange={handleBillItemChange}
// // //                 fullWidth
// // //                 variant="outlined"
// // //               />
// // //             </Grid>
// // //             <Grid item xs={12}>
// // //               <Button
// // //                 variant="outlined"
// // //                 color="primary"
// // //                 startIcon={<AddIcon />}
// // //                 onClick={handleAddBillItem}
// // //                 fullWidth
// // //               >
// // //                 Add Item to Bill
// // //               </Button>
// // //             </Grid>
// // //           </Grid>

// // //           {/* List of Added Bill Items */}
// // //           {billData.billItems.length > 0 && (
// // //             <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2, border: '1px solid #e0e0e0', mt: 2 }}>
// // //               <Typography variant="subtitle1" sx={{ p: 2, bgcolor: '#f5f5f5', fontWeight: 'bold' }}>
// // //                 Items on this Bill ({billData.billItems.length})
// // //               </Typography>
// // //               {billData.billItems.map((item) => (
// // //                 <React.Fragment key={item.tempId}>
// // //                   <ListItem>
// // //                     <ListItemText
// // //                       primary={
// // //                         <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
// // //                           {item.description}
// // //                         </Typography>
// // //                       }
// // //                       secondary={
// // //                         <Box>
// // //                           <Typography variant="body2" color="text.secondary">
// // //                             Quantity: {item.quantity} | Unit Price: ₹{parseFloat(item.unitPrice).toFixed(2)}
// // //                           </Typography>
// // //                           <Typography variant="body2" color="text.secondary">
// // //                             Total: ₹{(parseFloat(item.quantity) * parseFloat(item.unitPrice)).toFixed(2)}
// // //                           </Typography>
// // //                           <Typography variant="body2" color="text.secondary">
// // //                             Service Date: {new Date(item.serviceDate).toLocaleDateString()}
// // //                           </Typography>
// // //                           {item.notes && (
// // //                             <Typography variant="body2" color="text.secondary">
// // //                               Notes: {item.notes}
// // //                             </Typography>
// // //                           )}
// // //                         </Box>
// // //                       }
// // //                     />
// // //                     <ListItemSecondaryAction>
// // //                       <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveBillItem(item.tempId)}>
// // //                         <DeleteIcon color="error" />
// // //                       </IconButton>
// // //                     </ListItemSecondaryAction>
// // //                   </ListItem>
// // //                   <Divider component="li" />
// // //                 </React.Fragment>
// // //               ))}
// // //             </List>
// // //           )}

// // //           {/* Form Actions */}
// // //           <Box sx={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
// // //             <Button
// // //               variant="outlined"
// // //               color="secondary"
// // //               startIcon={<ClearIcon />}
// // //               onClick={handleClearForm}
// // //               disabled={submitting}
// // //             >
// // //               Clear Form
// // //             </Button>
// // //             <Button
// // //               variant="contained"
// // //               color="primary"
// // //               startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
// // //               type="submit"
// // //               disabled={submitting}
// // //             >
// // //               {submitting ? 'Generating...' : 'Generate Bill'}
// // //             </Button>
// // //           </Box>
// // //         </Box>
// // //       </Paper>

// // //       <Snackbar
// // //         open={snackbarOpen}
// // //         autoHideDuration={6000}
// // //         onClose={handleSnackbarClose}
// // //         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
// // //       >
// // //         <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
// // //           {snackbarMessage}
// // //         </Alert>
// // //       </Snackbar>

// // //       <Box sx={{ mt: 6, opacity: 0.7, textAlign: 'center' }}>
// // //         <Typography variant="body2" color="text.secondary">
// // //           Fill in the details above and add bill items to create and record a new bill for a patient.
// // //         </Typography>
// // //       </Box>
// // //     </Box>
// // //   );
// // // };

// // // BillingDeskGenerateBill.propTypes = {
// // //   billingDeskUser: PropTypes.shape({
// // //     userId: PropTypes.string,
// // //     name: PropTypes.string,
// // //     email: PropTypes.string,
// // //     profilePic: PropTypes.string,
// // //   }),
// // // };

// // // export default BillingDeskGenerateBill;

// // import React, { useState, useEffect } from 'react';
// // import PropTypes from 'prop-types';
// // import {
// //   Box, Typography, Paper, TextField, Button,
// //   FormControl, InputLabel, Select, MenuItem,
// //   Snackbar, Alert, CircularProgress,
// //   IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Divider,
// //   Grid
// // } from '@mui/material';
// // import AddIcon from '@mui/icons-material/Add';
// // import SaveIcon from '@mui/icons-material/Save';
// // import ClearIcon from '@mui/icons-material/Clear';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import PaidIcon from '@mui/icons-material/Paid';
// // import ListIcon from '@mui/icons-material/List';
// // import InfoIcon from '@mui/icons-material/Info';
// // import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'; // Icon for 'Generate Another Bill'

// // // Import the new invoice display component
// // import BillInvoiceDisplay from './BillInvoiceDisplay'; // Adjust path if needed

// // const BillingDeskGenerateBill = ({ billingDeskUser }) => {
// //   const initialBillState = {
// //     patientId: '',
// //     totalAmount: 0,
// //     amountPaid: '',
// //     balanceDue: '',
// //     billDate: new Date().toISOString().slice(0, 10),
// //     dueDate: '',
// //     paymentMethod: '',
// //     transactionId: '',
// //     issuedByUserId: billingDeskUser?.userId || '',
// //     billDocumentUrl: '',
// //     appointmentId: '',
// //     billItems: [],
// //   };

// //   const initialBillItemState = {
// //     description: '',
// //     quantity: 1,
// //     unitPrice: '',
// //     serviceDate: new Date().toISOString().slice(0, 10),
// //     notes: '',
// //   };

// //   const [billData, setBillData] = useState(initialBillState);
// //   const [currentBillItem, setCurrentBillItem] = useState(initialBillItemState);
// //   const [submitting, setSubmitting] = useState(false);
// //   const [snackbarOpen, setSnackbarOpen] = useState(false);
// //   const [snackbarMessage, setSnackbarMessage] = useState('');
// //   const [snackbarSeverity, setSnackbarSeverity] = useState('success');

// //   const [availableBillItems, setAvailableBillItems] = useState([]);
// //   const [loadingAvailableItems, setLoadingAvailableItems] = useState(true);
// //   const [fetchItemsError, setFetchItemsError] = useState(null);
// //   const [selectedExistingItemId, setSelectedExistingItemId] = useState('');

// //   // --- NEW STATE: To store the generated bill for display ---
// //   const [generatedBill, setGeneratedBill] = useState(null);
// //   // --------------------------------------------------------

// //   // Effect to pre-fill issuedByUserId and reset form on user change or mount
// //   useEffect(() => {
// //     setBillData(prev => ({
// //       ...prev,
// //       issuedByUserId: billingDeskUser?.userId || '',
// //       billDate: new Date().toISOString().slice(0, 10),
// //     }));
// //   }, [billingDeskUser]);

// //   // Effect to calculate totalAmount and balanceDue
// //   useEffect(() => {
// //     const calculatedTotalAmount = billData.billItems.reduce((sum, item) => {
// //       const itemQuantity = parseFloat(item.quantity);
// //       const itemUnitPrice = parseFloat(item.unitPrice);
// //       return sum + (isNaN(itemQuantity) || isNaN(itemUnitPrice) ? 0 : itemQuantity * itemUnitPrice);
// //     }, 0);

// //     const paid = parseFloat(billData.amountPaid);
// //     const calculatedBalanceDue = calculatedTotalAmount - (isNaN(paid) ? 0 : paid);

// //     setBillData(prev => ({
// //       ...prev,
// //       totalAmount: calculatedTotalAmount.toFixed(2),
// //       balanceDue: calculatedBalanceDue.toFixed(2),
// //     }));
// //   }, [billData.billItems, billData.amountPaid]);

// //   // Effect to fetch all available bill items
// //   useEffect(() => {
// //     const fetchAllBillItems = async () => {
// //       try {
// //         setLoadingAvailableItems(true);
// //         setFetchItemsError(null);
// //         const response = await fetch('http://localhost:2009/api/bill-items');
// //         if (!response.ok) {
// //           throw new Error(`Failed to fetch bill items: ${response.status} ${response.statusText}`);
// //         }
// //         const data = await response.json();
// //         setAvailableBillItems(data);
// //       } catch (error) {
// //         console.error("Error fetching available bill items:", error);
// //         setFetchItemsError(error.message);
// //         setSnackbarMessage(`Error loading existing items: ${error.message}`);
// //         setSnackbarSeverity('error');
// //         setSnackbarOpen(true);
// //       } finally {
// //         setLoadingAvailableItems(false);
// //       }
// //     };

// //     fetchAllBillItems();
// //   }, []);

// //   const handleBillChange = (e) => {
// //     const { name, value } = e.target;
// //     setBillData(prev => ({ ...prev, [name]: value }));
// //   };

// //   const handleBillItemChange = (e) => {
// //     const { name, value } = e.target;
// //     setCurrentBillItem(prev => ({ ...prev, [name]: value }));
// //     // If user starts typing, clear existing selection
// //     if (name !== 'serviceDate' && name !== 'notes') {
// //       setSelectedExistingItemId('');
// //     }
// //   };

// //   const handleExistingItemSelect = (e) => {
// //     const selectedId = e.target.value;
// //     setSelectedExistingItemId(selectedId);

// //     if (selectedId === '') {
// //       setCurrentBillItem(initialBillItemState);
// //       return;
// //     }

// //     const selectedItem = availableBillItems.find(item => item.id === selectedId);
// //     if (selectedItem) {
// //       setCurrentBillItem({
// //         description: selectedItem.description || '',
// //         quantity: selectedItem.quantity || 1,
// //         unitPrice: selectedItem.unitPrice || '',
// //         serviceDate: selectedItem.serviceDate ? new Date(selectedItem.serviceDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
// //         notes: selectedItem.notes || '',
// //       });
// //     }
// //   };

// //   const handleAddBillItem = () => {
// //     if (!currentBillItem.description || isNaN(parseFloat(currentBillItem.quantity)) || isNaN(parseFloat(currentBillItem.unitPrice)) || parseFloat(currentBillItem.quantity) <= 0 || parseFloat(currentBillItem.unitPrice) <= 0) {
// //       setSnackbarMessage('Please fill in valid Description, Quantity, and Unit Price for the bill item.');
// //       setSnackbarSeverity('error');
// //       setSnackbarOpen(true);
// //       return;
// //     }

// //     setBillData(prev => ({
// //       ...prev,
// //       billItems: [...prev.billItems, { ...currentBillItem, tempId: Date.now() + Math.random() }],
// //     }));
// //     setCurrentBillItem(initialBillItemState);
// //     setSelectedExistingItemId('');
// //     setSnackbarMessage('Bill item added.');
// //     setSnackbarSeverity('info');
// //     setSnackbarOpen(true);
// //   };

// //   const handleRemoveBillItem = (tempIdToRemove) => {
// //     setBillData(prev => ({
// //       ...prev,
// //       billItems: prev.billItems.filter(item => item.tempId !== tempIdToRemove),
// //     }));
// //     setSnackbarMessage('Bill item removed.');
// //     setSnackbarSeverity('info');
// //     setSnackbarOpen(true);
// //   };

// //   const handleClearForm = () => {
// //     setBillData(initialBillState);
// //     setCurrentBillItem(initialBillItemState);
// //     setSelectedExistingItemId('');
// //     setGeneratedBill(null); // Clear generated bill when clearing form
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setSubmitting(true);
// //     setSnackbarOpen(false);

// //     if (!billData.patientId || !billData.billDate || !billData.dueDate) {
// //       setSnackbarMessage('Please fill in all required bill details: Patient ID, Bill Date, Due Date.');
// //       setSnackbarSeverity('error');
// //       setSnackbarOpen(true);
// //       setSubmitting(false);
// //       return;
// //     }

// //     if (billData.billItems.length === 0) {
// //       setSnackbarMessage('Please add at least one bill item.');
// //       setSnackbarSeverity('error');
// //       setSnackbarOpen(true);
// //       setSubmitting(false);
// //       return;
// //     }

// //     const mainBillToCreate = {
// //       patientId: billData.patientId,
// //       billDate: billData.billDate,
// //       totalAmount: parseFloat(billData.totalAmount),
// //       amountPaid: parseFloat(billData.amountPaid || 0),
// //       balanceDue: parseFloat(billData.balanceDue || 0),
// //       paymentMethod: billData.paymentMethod || null,
// //       transactionId: billData.transactionId || null,
// //       issuedByUserId: billData.issuedByUserId,
// //       billDocumentUrl: billData.billDocumentUrl || null,
// //       dueDate: billData.dueDate,
// //       appointmentId: billData.appointmentId || null,
// //     };

// //     let createdMainBill = null;

// //     try {
// //       // 1. Create the main bill
// //       const billResponse = await fetch('http://localhost:2009/api/bills', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(mainBillToCreate),
// //       });

// //       if (!billResponse.ok) {
// //         const errorData = await billResponse.json();
// //         throw new Error(errorData.message || `Failed to create main bill: ${billResponse.status} ${billResponse.statusText}`);
// //       }

// //       createdMainBill = await billResponse.json();
// //       const newBillId = createdMainBill.id; // Assuming 'id' is the MongoDB _id

// //       // 2. Create each bill item linked to the new billId
// //       const billItemsToPersist = billData.billItems.map(item => ({
// //         billId: newBillId,
// //         description: item.description,
// //         quantity: parseFloat(item.quantity),
// //         unitPrice: parseFloat(item.unitPrice),
// //         serviceDate: item.serviceDate,
// //         notes: item.notes || null,
// //         appointmentId: billData.appointmentId || null,
// //       }));

// //       const itemCreationPromises = billItemsToPersist.map(async (itemToCreate) => {
// //         const itemResponse = await fetch('http://localhost:2009/api/bill-items', {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify(itemToCreate),
// //         });

// //         if (!itemResponse.ok) {
// //           const errorItemData = await itemResponse.json();
// //           console.error(`Failed to create bill item for billId ${newBillId}:`, errorItemData);
// //           throw new Error(errorItemData.message || `Failed to create item: ${itemToCreate.description}`);
// //         }
// //         return itemResponse.json(); // Return the created item from backend
// //       });

// //       const createdItems = await Promise.all(itemCreationPromises);

// //       // --- IMPORTANT: Set the generatedBill state with full details ---
// //       setGeneratedBill({
// //         ...createdMainBill,
// //         billItems: createdItems, // Attach the newly created items
// //       });
// //       // -------------------------------------------------------------

// //       setSnackbarMessage('Bill and all items generated successfully!');
// //       setSnackbarSeverity('success');
// //       setSnackbarOpen(true);
// //       // No need to clear form here, as we transition to invoice display
// //     } catch (err) {
// //       console.error('Overall error generating bill:', err);
// //       setSnackbarMessage(`Error generating bill: ${err.message}`);
// //       setSnackbarSeverity('error');
// //       setSnackbarOpen(true);
// //       setGeneratedBill(null); // Ensure generatedBill is null on error
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   const handleSnackbarClose = (event, reason) => {
// //     if (reason === 'clickaway') {
// //       return;
// //     }
// //     setSnackbarOpen(false);
// //   };

// //   // Function to reset and show the form again
// //   const handleGenerateAnotherBill = () => {
// //     handleClearForm(); // This will clear the form data and setGeneratedBill(null)
// //   };

// //   return (
// //     <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 900, mx: 'auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
// //       {generatedBill ? (
// //         // --- Display the invoice if a bill has been generated ---
// //         <Box>
// //           <BillInvoiceDisplay bill={generatedBill} />
// //           <Box sx={{ mt: 4, textAlign: 'center' }}>
// //             <Button
// //               variant="contained"
// //               color="primary"
// //               startIcon={<AssignmentTurnedInIcon />}
// //               onClick={handleGenerateAnotherBill}
// //               sx={{ px: 4, py: 1.5 }}
// //             >
// //               Generate Another Bill
// //             </Button>
// //           </Box>
// //         </Box>
// //       ) : (
// //         // --- Otherwise, display the bill generation form ---
// //         <>
// //           <Typography variant="h4" gutterBottom align="center" sx={{
// //             mb: 2,
// //             fontWeight: 'bold',
// //             color: 'primary.dark',
// //             textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
// //           }}>
// //             <PaidIcon sx={{ fontSize: 'inherit', verticalAlign: 'middle', mr: 1 }} /> Generate New Bill
// //           </Typography>

// //           <Paper elevation={8} sx={{
// //             p: { xs: 3, md: 5 },
// //             borderRadius: 3,
// //             background: 'linear-gradient(145deg, #ffffff, #f0f2f5)',
// //             boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
// //             border: '1px solid #e0e0e0'
// //           }}>
// //             <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
// //               {/* Bill Details Section */}
// //               <Box>
// //                 <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>Bill Details</Typography>
// //                 <Grid container spacing={3}>
// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       label="Patient ID"
// //                       name="patientId"
// //                       value={billData.patientId}
// //                       onChange={handleBillChange}
// //                       fullWidth
// //                       required
// //                       variant="outlined"
// //                       size="small"
// //                     />
// //                   </Grid>
// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       label="Appointment ID (Optional)"
// //                       name="appointmentId"
// //                       value={billData.appointmentId}
// //                       onChange={handleBillChange}
// //                       fullWidth
// //                       variant="outlined"
// //                       size="small"
// //                     />
// //                   </Grid>
// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       label="Amount Paid (₹)"
// //                       name="amountPaid"
// //                       type="number"
// //                       value={billData.amountPaid}
// //                       onChange={handleBillChange}
// //                       fullWidth
// //                       inputProps={{ step: "0.01" }}
// //                       variant="outlined"
// //                       size="small"
// //                     />
// //                   </Grid>
// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       label="Total Amount (₹)"
// //                       name="totalAmount"
// //                       value={billData.totalAmount}
// //                       fullWidth
// //                       variant="outlined"
// //                       InputProps={{ readOnly: true, startAdornment: <PaidIcon sx={{ color: 'success.main' }} /> }}
// //                       sx={{ bgcolor: '#e8f5e9' }}
// //                       size="small"
// //                     />
// //                   </Grid>
// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       label="Balance Due (₹)"
// //                       name="balanceDue"
// //                       value={billData.balanceDue}
// //                       fullWidth
// //                       variant="outlined"
// //                       InputProps={{ readOnly: true, startAdornment: <PaidIcon sx={{ color: 'error.main' }} /> }}
// //                       sx={{ bgcolor: '#ffebee' }}
// //                       size="small"
// //                     />
// //                   </Grid>
// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       label="Bill Date"
// //                       name="billDate"
// //                       type="date"
// //                       value={billData.billDate}
// //                       onChange={handleBillChange}
// //                       fullWidth
// //                       required
// //                       InputLabelProps={{ shrink: true }}
// //                       variant="outlined"
// //                       size="small"
// //                     />
// //                   </Grid>
// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       label="Due Date"
// //                       name="dueDate"
// //                       type="date"
// //                       value={billData.dueDate}
// //                       onChange={handleBillChange}
// //                       fullWidth
// //                       required
// //                       InputLabelProps={{ shrink: true }}
// //                       variant="outlined"
// //                       size="small"
// //                     />
// //                   </Grid>
// //                   <Grid item xs={12} sm={6}>
// //                     <FormControl fullWidth variant="outlined" size="small">
// //                       <InputLabel>Payment Method</InputLabel>
// //                       <Select
// //                         label="Payment Method"
// //                         name="paymentMethod"
// //                         value={billData.paymentMethod}
// //                         onChange={handleBillChange}
// //                       >
// //                         <MenuItem value=""><em>None</em></MenuItem>
// //                         <MenuItem value="Credit Card">Credit Card</MenuItem>
// //                         <MenuItem value="Debit Card">Debit Card</MenuItem>
// //                         <MenuItem value="Cash">Cash</MenuItem>
// //                         <MenuItem value="Net Banking">Net Banking</MenuItem>
// //                         <MenuItem value="UPI">UPI</MenuItem>
// //                         <MenuItem value="Cheque">Cheque</MenuItem>
// //                       </Select>
// //                     </FormControl>
// //                   </Grid>
// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       label="Transaction ID (Optional)"
// //                       name="transactionId"
// //                       value={billData.transactionId}
// //                       onChange={handleBillChange}
// //                       fullWidth
// //                       variant="outlined"
// //                       size="small"
// //                     />
// //                   </Grid>
// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       label="Issued By User ID"
// //                       name="issuedByUserId"
// //                       value={billData.issuedByUserId}
// //                       fullWidth
// //                       variant="outlined"
// //                       InputProps={{ readOnly: true }}
// //                       size="small"
// //                     />
// //                   </Grid>
// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       label="Bill Document URL (Optional)"
// //                       name="billDocumentUrl"
// //                       type="url"
// //                       value={billData.billDocumentUrl}
// //                       onChange={handleBillChange}
// //                       fullWidth
// //                       variant="outlined"
// //                       size="small"
// //                     />
// //                   </Grid>
// //                 </Grid>
// //               </Box>

// //               <Divider sx={{ my: 2 }}>
// //                 <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 'bold' }}>Bill Items</Typography>
// //               </Divider>

// //               {/* Add New Bill Item Form */}
// //               <Box>
// //                 <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.primary' }}>Add Item Details</Typography>
// //                 <Grid container spacing={2}>
// //                   <Grid item xs={12}>
// //                     <FormControl fullWidth variant="outlined" size="small" disabled={loadingAvailableItems}>
// //                       <InputLabel id="select-existing-item-label">Select Existing Item</InputLabel>
// //                       <Select
// //                         labelId="select-existing-item-label"
// //                         id="select-existing-item"
// //                         value={selectedExistingItemId}
// //                         onChange={handleExistingItemSelect}
// //                         label="Select Existing Item"
// //                       >
// //                         <MenuItem value="">
// //                           <em>{loadingAvailableItems ? 'Loading items...' : 'Select or Add New Item'}</em>
// //                         </MenuItem>
// //                         {fetchItemsError && (
// //                           <MenuItem disabled>Error loading items: {fetchItemsError}</MenuItem>
// //                         )}
// //                         {availableBillItems.map((item) => (
// //                           <MenuItem key={item.id} value={item.id}>
// //                             {item.description} (₹{parseFloat(item.unitPrice).toFixed(2)})
// //                           </MenuItem>
// //                         ))}
// //                       </Select>
// //                     </FormControl>
// //                   </Grid>
// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       label="Item Description"
// //                       name="description"
// //                       value={currentBillItem.description}
// //                       onChange={handleBillItemChange}
// //                       fullWidth
// //                       variant="outlined"
// //                       size="small"
// //                     />
// //                   </Grid>
// //                   <Grid item xs={6} sm={3}>
// //                     <TextField
// //                       label="Quantity"
// //                       name="quantity"
// //                       type="number"
// //                       value={currentBillItem.quantity}
// //                       onChange={handleBillItemChange}
// //                       fullWidth
// //                       inputProps={{ min: 1 }}
// //                       variant="outlined"
// //                       size="small"
// //                     />
// //                   </Grid>
// //                   <Grid item xs={6} sm={3}>
// //                     <TextField
// //                       label="Unit Price (₹)"
// //                       name="unitPrice"
// //                       type="number"
// //                       value={currentBillItem.unitPrice}
// //                       onChange={handleBillItemChange}
// //                       fullWidth
// //                       inputProps={{ step: "0.01", min: 0 }}
// //                       variant="outlined"
// //                       size="small"
// //                     />
// //                   </Grid>
// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       label="Service Date"
// //                       name="serviceDate"
// //                       type="date"
// //                       value={currentBillItem.serviceDate}
// //                       onChange={handleBillItemChange}
// //                       fullWidth
// //                       InputLabelProps={{ shrink: true }}
// //                       variant="outlined"
// //                       size="small"
// //                     />
// //                   </Grid>
// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       label="Notes (Item Specific)"
// //                       name="notes"
// //                       value={currentBillItem.notes}
// //                       onChange={handleBillItemChange}
// //                       fullWidth
// //                       variant="outlined"
// //                       size="small"
// //                     />
// //                   </Grid>
// //                   <Grid item xs={12}>
// //                     <Button
// //                       variant="contained"
// //                       color="secondary"
// //                       startIcon={<AddIcon />}
// //                       onClick={handleAddBillItem}
// //                       fullWidth
// //                       sx={{ py: 1.5, mt: 1 }}
// //                     >
// //                       Add Item to Bill
// //                     </Button>
// //                   </Grid>
// //                 </Grid>
// //               </Box>

// //               {/* List of Added Bill Items */}
// //               {billData.billItems.length > 0 && (
// //                 <Paper elevation={4} sx={{
// //                   width: '100%',
// //                   bgcolor: 'background.paper',
// //                   borderRadius: 2,
// //                   border: '1px solid #e0e0e0',
// //                   mt: 2,
// //                   overflow: 'hidden'
// //                 }}>
// //                   <Typography variant="h6" sx={{
// //                     p: 2,
// //                     bgcolor: 'primary.light',
// //                     color: 'primary.contrastText',
// //                     fontWeight: 'bold',
// //                     display: 'flex',
// //                     alignItems: 'center',
// //                     gap: 1
// //                   }}>
// //                     <ListIcon /> Items on this Bill ({billData.billItems.length})
// //                   </Typography>
// //                   <List disablePadding>
// //                     {billData.billItems.map((item, index) => (
// //                       <React.Fragment key={item.tempId}>
// //                         <ListItem sx={{ py: 1.5, px: 2 }}>
// //                           <ListItemText
// //                             primary={
// //                               <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
// //                                 {item.description}
// //                               </Typography>
// //                             }
// //                             secondary={
// //                               <Box component="span">
// //                                 <Typography variant="body2" color="text.secondary">
// //                                   Quantity: {item.quantity} | Unit Price: ₹{parseFloat(item.unitPrice).toFixed(2)}
// //                                 </Typography>
// //                                 <Typography variant="body2" color="text.secondary">
// //                                   **Total: ₹{(parseFloat(item.quantity) * parseFloat(item.unitPrice)).toFixed(2)}**
// //                                 </Typography>
// //                                 <Typography variant="body2" color="text.secondary">
// //                                   Service Date: {new Date(item.serviceDate).toLocaleDateString()}
// //                                 </Typography>
// //                                 {item.notes && (
// //                                   <Typography variant="body2" color="text.secondary">
// //                                     Notes: {item.notes}
// //                                   </Typography>
// //                                 )}
// //                               </Box>
// //                             }
// //                           />
// //                           <ListItemSecondaryAction>
// //                             <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveBillItem(item.tempId)}>
// //                               <DeleteIcon color="error" />
// //                             </IconButton>
// //                           </ListItemSecondaryAction>
// //                         </ListItem>
// //                         {index < billData.billItems.length - 1 && <Divider component="li" />}
// //                       </React.Fragment>
// //                     ))}
// //                   </List>
// //                 </Paper>
// //               )}

// //               {/* Form Actions */}
// //               <Box sx={{
// //                 display: 'flex',
// //                 justifyContent: 'flex-end',
// //                 gap: 2,
// //                 mt: 3,
// //                 pt: 2,
// //                 borderTop: '1px solid #e0e0e0'
// //               }}>
// //                 <Button
// //                   variant="outlined"
// //                   color="secondary"
// //                   startIcon={<ClearIcon />}
// //                   onClick={handleClearForm}
// //                   disabled={submitting}
// //                   sx={{ px: 3, py: 1.2 }}
// //                 >
// //                   Clear Form
// //                 </Button>
// //                 <Button
// //                   variant="contained"
// //                   color="primary"
// //                   startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
// //                   type="submit"
// //                   disabled={submitting}
// //                   sx={{ px: 3, py: 1.2 }}
// //                 >
// //                   {submitting ? 'Generating...' : 'Generate Bill'}
// //                 </Button>
// //               </Box>
// //             </Box>
// //           </Paper>

// //           <Box sx={{ mt: 2, opacity: 0.6, textAlign: 'center' }}>
// //             <Typography variant="body2" color="text.secondary">
// //               <InfoIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
// //               Fill in the details above and add bill items to create and record a new bill for a patient.
// //             </Typography>
// //           </Box>
// //         </>
// //       )}

// //       <Snackbar
// //         open={snackbarOpen}
// //         autoHideDuration={6000}
// //         onClose={handleSnackbarClose}
// //         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
// //       >
// //         <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
// //           {snackbarMessage}
// //         </Alert>
// //       </Snackbar>
// //     </Box>
// //   );
// // };

// // BillingDeskGenerateBill.propTypes = {
// //   billingDeskUser: PropTypes.shape({
// //     userId: PropTypes.string,
// //     name: PropTypes.string,
// //     email: PropTypes.string,
// //     profilePic: PropTypes.string,
// //   }),
// // };

// // export default BillingDeskGenerateBill;

// // import React, { useState, useEffect, useRef } from 'react';
// // import PropTypes from 'prop-types';
// // import {
// //   Box, Typography, Paper, TextField, Button,
// //   FormControl, InputLabel, Select, MenuItem,
// //   Snackbar, Alert, CircularProgress,
// //   IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Divider,
// //   Grid
// // } from '@mui/material';
// // import AddIcon from '@mui/icons-material/Add';
// // import SaveIcon from '@mui/icons-material/Save';
// // import ClearIcon from '@mui/icons-material/Clear';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import PaidIcon from '@mui/icons-material/Paid';
// // import ListIcon from '@mui/icons-material/List';
// // import InfoIcon from '@mui/icons-material/Info';
// // import DownloadIcon from '@mui/icons-material/Download';
// // import UploadFileIcon from '@mui/icons-material/UploadFile'; // New icon for upload

// // // Import jsPDF for client-side PDF generation
// // import jsPDF from 'jspdf';
// // // Optional: If you want better table formatting, install and import jspdf-autotable
// // // import 'jspdf-autotable'; // Ensure you have installed this: npm install jspdf jspdf-autotable

// // const BillingDeskGenerateBill = ({
// //   billingDeskUser,
// //   initialPatientId,
// //   initialAppointmentId,
// //   onBillGenerated, // Callback prop
// //   onCancel // Callback prop
// // }) => {
// //   const initialBillState = {
// //     patientId: initialPatientId || '',
// //     totalAmount: 0,
// //     amountPaid: '',
// //     balanceDue: '',
// //     billDate: new Date().toISOString().slice(0, 10),
// //     dueDate: '',
// //     paymentMethod: '',
// //     transactionId: '',
// //     issuedByUserId: billingDeskUser?.userId || '',
// //     billDocumentUrl: '', // This will be set after a successful upload
// //     appointmentId: initialAppointmentId || '',
// //     billItems: [],
// //   };

// //   const initialBillItemState = {
// //     description: '',
// //     quantity: 1,
// //     unitPrice: '',
// //     serviceDate: new Date().toISOString().slice(0, 10),
// //     notes: '',
// //   };

// //   const [billData, setBillData] = useState(initialBillState);
// //   const [currentBillItem, setCurrentBillItem] = useState(initialBillItemState);
// //   const [submitting, setSubmitting] = useState(false);
// //   const [snackbarOpen, setSnackbarOpen] = useState(false);
// //   const [snackbarMessage, setSnackbarMessage] = useState('');
// //   const [snackbarSeverity, setSnackbarSeverity] = useState('success');

// //   const [availableBillItems, setAvailableBillItems] = useState([]);
// //   const [loadingAvailableItems, setLoadingAvailableItems] = useState(true);
// //   const [fetchItemsError, setFetchItemsError] = useState(null);
// //   const [selectedExistingItemId, setSelectedExistingItemId] = useState('');

// //   const [uploadingPdf, setUploadingPdf] = useState(false); // New state for PDF upload progress
// //   const [uploadedFileName, setUploadedFileName] = useState(''); // To display the name of the uploaded file
// //   const fileInputRef = useRef(null); // Ref for the hidden file input element

// //   // Effect to pre-fill issuedByUserId and reset form on user change or mount
// //   useEffect(() => {
// //     // Re-initialize the form state based on initial props when they change
// //     setBillData({
// //       patientId: initialPatientId || '',
// //       totalAmount: 0,
// //       amountPaid: '',
// //       balanceDue: '',
// //       billDate: new Date().toISOString().slice(0, 10),
// //       dueDate: '',
// //       paymentMethod: '',
// //       transactionId: '',
// //       issuedByUserId: billingDeskUser?.userId || '',
// //       billDocumentUrl: '', // Reset URL on component mount/prop change
// //       appointmentId: initialAppointmentId || '',
// //       billItems: [],
// //     });
// //     setCurrentBillItem(initialBillItemState);
// //     setSelectedExistingItemId('');
// //     setUploadedFileName(''); // Clear uploaded file name
// //   }, [billingDeskUser, initialPatientId, initialAppointmentId]);

// //   // Effect to calculate totalAmount and balanceDue (remains the same)
// //   useEffect(() => {
// //     const calculatedTotalAmount = billData.billItems.reduce((sum, item) => {
// //       const itemQuantity = parseFloat(item.quantity);
// //       const itemUnitPrice = parseFloat(item.unitPrice);
// //       return sum + (isNaN(itemQuantity) || isNaN(itemUnitPrice) ? 0 : itemQuantity * itemUnitPrice);
// //     }, 0);

// //     const paid = parseFloat(billData.amountPaid);
// //     const calculatedBalanceDue = calculatedTotalAmount - (isNaN(paid) ? 0 : paid);

// //     setBillData(prev => ({
// //       ...prev,
// //       totalAmount: calculatedTotalAmount.toFixed(2),
// //       balanceDue: calculatedBalanceDue.toFixed(2),
// //     }));
// //   }, [billData.billItems, billData.amountPaid]);

// //   // Effect to fetch all available bill items (remains the same)
// //   useEffect(() => {
// //     const fetchAllBillItems = async () => {
// //       try {
// //         setLoadingAvailableItems(true);
// //         setFetchItemsError(null);
// //         // Using a more generic endpoint name for existing items
// //         // IMPORTANT: Ensure your backend has an endpoint for this.
// //         // Example: If using Spring Boot, add a @GetMapping("/api/available-bill-items")
// //         const response = await fetch('http://localhost:2009/api/bill-items');
// //         if (!response.ok) {
// //           // This will catch HTTP errors like 404, 500 etc.
// //           const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
// //           throw new Error(`Failed to fetch bill items: ${response.status} ${response.statusText} - ${errorData.message}`);
// //         }
// //         const data = await response.json();
// //         setAvailableBillItems(data);
// //       } catch (error) {
// //         console.error("Error fetching available bill items:", error);
// //         setFetchItemsError(error.message);
// //         setSnackbarMessage(`Error loading existing items: ${error.message}`);
// //         setSnackbarSeverity('error');
// //         setSnackbarOpen(true);
// //       } finally {
// //         setLoadingAvailableItems(false);
// //       }
// //     };

// //     fetchAllBillItems();
// //   }, []);

// //   const handleBillChange = (e) => {
// //     const { name, value } = e.target;
// //     setBillData(prev => ({ ...prev, [name]: value }));
// //   };

// //   const handleBillItemChange = (e) => {
// //     const { name, value } = e.target;
// //     setCurrentBillItem(prev => ({ ...prev, [name]: value }));
// //     if (name !== 'serviceDate' && name !== 'notes') {
// //       setSelectedExistingItemId('');
// //     }
// //   };

// //   const handleExistingItemSelect = (e) => {
// //     const selectedId = e.target.value;
// //     setSelectedExistingItemId(selectedId);

// //     if (selectedId === '') {
// //       setCurrentBillItem(initialBillItemState);
// //       return;
// //     }

// //     const selectedItem = availableBillItems.find(item => item.id === selectedId);
// //     if (selectedItem) {
// //       setCurrentBillItem({
// //         description: selectedItem.description || '',
// //         quantity: selectedItem.quantity || 1,
// //         unitPrice: selectedItem.unitPrice || '',
// //         serviceDate: selectedItem.serviceDate ? new Date(selectedItem.serviceDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
// //         notes: selectedItem.notes || '',
// //       });
// //     }
// //   };

// //   const handleAddBillItem = () => {
// //     if (!currentBillItem.description || isNaN(parseFloat(currentBillItem.quantity)) || isNaN(parseFloat(currentBillItem.unitPrice)) || parseFloat(currentBillItem.quantity) <= 0 || parseFloat(currentBillItem.unitPrice) <= 0) {
// //       setSnackbarMessage('Please fill in valid Description, Quantity, and Unit Price for the bill item.');
// //       setSnackbarSeverity('error');
// //       setSnackbarOpen(true);
// //       return;
// //     }

// //     setBillData(prev => ({
// //       ...prev,
// //       billItems: [...prev.billItems, { ...currentBillItem, tempId: Date.now() + Math.random() }],
// //     }));
// //     setCurrentBillItem(initialBillItemState);
// //     setSelectedExistingItemId('');
// //     setSnackbarMessage('Bill item added.');
// //     setSnackbarSeverity('info');
// //     setSnackbarOpen(true);
// //   };

// //   const handleRemoveBillItem = (tempIdToRemove) => {
// //     setBillData(prev => ({
// //       ...prev,
// //       billItems: prev.billItems.filter(item => item.tempId !== tempIdToRemove),
// //     }));
// //     setSnackbarMessage('Bill item removed.');
// //     setSnackbarSeverity('info');
// //     setSnackbarOpen(true);
// //   };

// //   const handleClearForm = () => {
// //     setBillData({
// //       patientId: initialPatientId || '',
// //       totalAmount: 0,
// //       amountPaid: '',
// //       balanceDue: '',
// //       billDate: new Date().toISOString().slice(0, 10),
// //       dueDate: '',
// //       paymentMethod: '',
// //       transactionId: '',
// //       issuedByUserId: billingDeskUser?.userId || '',
// //       billDocumentUrl: '', // Reset to empty on clear
// //       appointmentId: initialAppointmentId || '',
// //       billItems: [],
// //     });
// //     setCurrentBillItem(initialBillItemState);
// //     setSelectedExistingItemId('');
// //     setUploadedFileName(''); // Clear uploaded file name on form clear
// //   };

// //   // --- PDF Generation Function (for client-side download) ---
// //   const generateBillPdf = (billDetails, items) => {
// //     if (items.length === 0) {
// //       setSnackbarMessage('Please add at least one bill item before generating the PDF.');
// //       setSnackbarSeverity('warning');
// //       setSnackbarOpen(true);
// //       return;
// //     }

// //     const doc = new jsPDF();
// //     let yPos = 20;
// //     const margin = 15;
// //     const lineSpacing = 7;
// //     const itemStartCol = 15;
// //     const qtyCol = 80;
// //     const unitPriceCol = 100;
// //     const totalCol = 130;
// //     const maxDescriptionWidth = 60; // Max width for description column for wrapping

// //     doc.setFontSize(24);
// //     doc.text("Healthcare Bill", 105, yPos, { align: "center" });
// //     yPos += 15;

// //     doc.setFontSize(10);
// //     doc.setTextColor(100);
// //     doc.text(`Generated by: ${billDetails.issuedByUserId || 'N/A'}`, margin, yPos);
// //     doc.text(`Date: ${new Date().toLocaleDateString()}`, 195, yPos, { align: "right" });
// //     yPos += lineSpacing;

// //     doc.setTextColor(0); // Black color
// //     doc.setFontSize(12);
// //     doc.text("Bill Items:", margin, yPos);
// //     yPos += lineSpacing;

// //     // Table Header
// //     doc.setFontSize(10);
// //     doc.setFont(undefined, 'bold');
// //     doc.text("Description", itemStartCol, yPos);
// //     doc.text("Qty", qtyCol, yPos);
// //     doc.text("Unit Price (₹)", unitPriceCol, yPos);
// //     doc.text("Total (₹)", totalCol, yPos);
// //     doc.setFont(undefined, 'normal');
// //     yPos += lineSpacing - 2;
// //     doc.line(margin, yPos, 200 - margin, yPos); // Line under header
// //     yPos += lineSpacing;

// //     // Bill Items
// //     items.forEach(item => {
// //       const itemTotal = (parseFloat(item.quantity) * parseFloat(item.unitPrice)).toFixed(2);

// //       // Check for page break before adding item
// //       if (yPos > 280) { // Approx end of page
// //         doc.addPage();
// //         yPos = margin; // Reset yPos for new page
// //         doc.setFontSize(12);
// //         doc.text("Bill Items (Continued):", margin, yPos);
// //         yPos += lineSpacing;
// //         doc.setFontSize(10);
// //         doc.setFont(undefined, 'bold');
// //         doc.text("Description", itemStartCol, yPos);
// //         doc.text("Qty", qtyCol, yPos);
// //         doc.text("Unit Price (₹)", unitPriceCol, yPos);
// //         doc.text("Total (₹)", totalCol, yPos);
// //         doc.setFont(undefined, 'normal');
// //         yPos += lineSpacing - 2;
// //         doc.line(margin, yPos, 200 - margin, yPos);
// //         yPos += lineSpacing;
// //       }

// //       const descriptionLines = doc.splitTextToSize(item.description, maxDescriptionWidth);
// //       doc.text(descriptionLines, itemStartCol, yPos);
// //       doc.text(item.quantity.toString(), qtyCol, yPos);
// //       doc.text(parseFloat(item.unitPrice).toFixed(2), unitPriceCol, yPos);
// //       doc.text(itemTotal, totalCol, yPos);

// //       yPos += (descriptionLines.length * lineSpacing) + 2; // Adjust yPos for wrapped text
// //       doc.setFontSize(8);
// //       doc.setTextColor(150);
// //       doc.text(`Service Date: ${new Date(item.serviceDate).toLocaleDateString()}`, itemStartCol, yPos);
// //       if (item.notes) {
// //         const notesLines = doc.splitTextToSize(`Notes: ${item.notes}`, maxDescriptionWidth + 40); // Wider for notes
// //         doc.text(notesLines, itemStartCol, yPos + 4);
// //         yPos += (notesLines.length * 4) + 4;
// //       }
// //       doc.setTextColor(0);
// //       doc.setFontSize(10);
// //       yPos += lineSpacing;
// //     });

// //     yPos += lineSpacing;
// //     doc.line(margin, yPos, 200 - margin, yPos); // Line before totals
// //     yPos += lineSpacing;

// //     doc.setFontSize(12);
// //     doc.setFont(undefined, 'bold');
// //     doc.text(`Total Amount: ₹${billDetails.totalAmount}`, margin, yPos);
// //     yPos += lineSpacing;
// //     doc.text(`Amount Paid: ₹${parseFloat(billDetails.amountPaid || 0).toFixed(2)}`, margin, yPos);
// //     yPos += lineSpacing;
// //     doc.text(`Balance Due: ₹${parseFloat(billDetails.balanceDue || 0).toFixed(2)}`, margin, yPos);
// //     doc.setFont(undefined, 'normal');
// //     yPos += lineSpacing * 2;

// //     if (billDetails.paymentMethod) {
// //       doc.setFontSize(10);
// //       doc.text(`Payment Method: ${billDetails.paymentMethod}`, margin, yPos);
// //       yPos += lineSpacing;
// //     }
// //     if (billDetails.transactionId) {
// //       doc.text(`Transaction ID: ${billDetails.transactionId}`, margin, yPos);
// //       yPos += lineSpacing;
// //     }

// //     // Disclaimer/Footer
// //     doc.setFontSize(8);
// //     doc.setTextColor(120);
// //     doc.text("This is an electronically generated bill and may not require a signature.", margin, 290, { align: 'left' });
// //     doc.text("Thank you for your business!", 200 - margin, 290, { align: 'right' });

// //     // Save the PDF directly to the user's device
// //     doc.save(`bill_${billDetails.patientId || 'unknown'}_${new Date().getTime()}.pdf`);
// //     setSnackbarMessage('Bill PDF generated and downloaded! Please now upload it using the "Upload Bill Document" button.');
// //     setSnackbarSeverity('success');
// //     setSnackbarOpen(true);
// //   };

// //   // --- Handle File Input Change (for uploading PDF) ---
// //   const handleFileChange = async (event) => {
// //     const file = event.target.files[0];
// //     if (file) {
// //       if (file.type !== 'application/pdf') {
// //         setSnackbarMessage('Please upload a PDF file.');
// //         setSnackbarSeverity('error');
// //         setSnackbarOpen(true);
// //         return;
// //       }

// //       setUploadingPdf(true);
// //       setSnackbarOpen(false); // Close any existing snackbar

// //       const formData = new FormData();
// //       formData.append('billDocument', file); // 'billDocument' must match the field name in Spring Boot's @RequestParam

// //       try {
// //         // Corrected URL: /api/bills/upload-document
// //         const response = await fetch('http://localhost:2009/api/bills/upload-document', {
// //           method: 'POST',
// //           body: formData, // No Content-Type header needed for FormData; browser sets it correctly
// //         });

// //         if (!response.ok) {
// //           const errorData = await response.json().catch(() => ({ message: 'No endpoint or server error.' }));
// //           throw new Error(errorData.message || `Failed to upload file: ${response.status} ${response.statusText}`);
// //         }

// //         const data = await response.json();
// //         setBillData(prev => ({
// //           ...prev,
// //           billDocumentUrl: data.fileUrl, // Set the URL received from the backend
// //         }));
// //         setUploadedFileName(file.name); // Store file name for display
// //         setSnackbarMessage('Bill document uploaded successfully!');
// //         setSnackbarSeverity('success');
// //         setSnackbarOpen(true);
// //       } catch (error) {
// //         console.error('Error uploading bill document:', error);
// //         setSnackbarMessage(`Error uploading document: ${error.message}`);
// //         setSnackbarSeverity('error');
// //         setSnackbarOpen(true);
// //       } finally {
// //         setUploadingPdf(false);
// //         // Clear the input to allow re-uploading the same file if needed
// //         event.target.value = '';
// //       }
// //     }
// //   };

// //   // --- Modified handleSubmit function ---
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setSubmitting(true);
// //     setSnackbarOpen(false);

// //     if (!billData.patientId || !billData.billDate || !billData.dueDate) {
// //       setSnackbarMessage('Please fill in all required bill details: Patient ID, Bill Date, Due Date.');
// //       setSnackbarSeverity('error');
// //       setSnackbarOpen(true);
// //       setSubmitting(false);
// //       return;
// //     }

// //     if (billData.billItems.length === 0) {
// //       setSnackbarMessage('Please add at least one bill item.');
// //       setSnackbarSeverity('error');
// //       setSnackbarOpen(true);
// //       setSubmitting(false);
// //       return;
// //     }

// //     // Prepare the main bill data for persistence
// //     const mainBillToCreate = {
// //       patientId: billData.patientId,
// //       billDate: billData.billDate,
// //       totalAmount: parseFloat(billData.totalAmount),
// //       amountPaid: parseFloat(billData.amountPaid || 0),
// //       balanceDue: parseFloat(billData.balanceDue || 0),
// //       paymentMethod: billData.paymentMethod || null,
// //       transactionId: billData.transactionId || null,
// //       issuedByUserId: billData.issuedByUserId,
// //       billDocumentUrl: billData.billDocumentUrl || null, // Use the uploaded URL
// //       dueDate: billData.dueDate,
// //       appointmentId: billData.appointmentId || null,
// //     };

// //     let createdMainBill = null;

// //     try {
// //       const billResponse = await fetch('http://localhost:2009/api/bills', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(mainBillToCreate),
// //       });

// //       if (!billResponse.ok) {
// //         const errorData = await billResponse.json();
// //         throw new Error(errorData.message || `Failed to create main bill: ${billResponse.status} ${billResponse.statusText}`);
// //       }

// //       createdMainBill = await billResponse.json();
// //       const newBillId = createdMainBill.id; // This will be the String UUID from MongoDB

// //       // Persist each bill item, linking to the newly created bill
// //       // NOTE: You'll need a separate endpoint for bill items if you're saving them individually
// //       // This part assumes your backend handles bill item creation separately and links them.
// //       const billItemsToPersist = billData.billItems.map(item => ({
// //         billId: newBillId, // Sending the String UUID here
// //         description: item.description,
// //         quantity: parseFloat(item.quantity),
// //         unitPrice: parseFloat(item.unitPrice),
// //         serviceDate: item.serviceDate,
// //         notes: item.notes || null,
// //         appointmentId: billData.appointmentId || null, // Sending String UUID here if present
// //       }));

// //       // This part assumes a /api/bill-items endpoint
// //       const itemCreationPromises = billItemsToPersist.map(async (itemToCreate) => {
// //         const itemResponse = await fetch('http://localhost:2009/api/bill-items', {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify(itemToCreate),
// //         });

// //         if (!itemResponse.ok) {
// //           const errorItemData = await itemResponse.json();
// //           console.error(`Failed to create bill item for billId ${newBillId}:`, errorItemData);
// //           throw new Error(errorItemData.message || `Failed to create item: ${itemToCreate.description}`);
// //         }
// //         return itemResponse.json();
// //       });

// //       const createdItems = await Promise.all(itemCreationPromises);

// //       // Construct the full bill data including the items
// //       const fullBillData = {
// //         ...createdMainBill,
// //         billItems: createdItems,
// //       };

// //       // Call the onBillGenerated callback provided by the parent, passing the full data
// //       if (onBillGenerated) {
// //         onBillGenerated(fullBillData);
// //       }

// //       setSnackbarMessage('Bill and all items generated successfully!');
// //       setSnackbarSeverity('success');
// //       setSnackbarOpen(true);
// //       // Form is not cleared here; it's up to parent to decide what to show next
// //     } catch (err) {
// //       console.error('Overall error generating bill:', err);
// //       setSnackbarMessage(`Error generating bill: ${err.message}`);
// //       setSnackbarSeverity('error');
// //       setSnackbarOpen(true);
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   const handleSnackbarClose = (event, reason) => {
// //     if (reason === 'clickaway') {
// //       return;
// //     }
// //     setSnackbarOpen(false);
// //   };

// //   return (
// //     <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 900, mx: 'auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
// //       <>
// //         <Typography variant="h4" gutterBottom align="center" sx={{
// //           mb: 2,
// //           fontWeight: 'bold',
// //           color: 'primary.dark',
// //           textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
// //         }}>
// //           <PaidIcon sx={{ fontSize: 'inherit', verticalAlign: 'middle', mr: 1 }} /> Generate New Bill
// //         </Typography>

// //         <Paper elevation={8} sx={{
// //           p: { xs: 3, md: 5 },
// //           borderRadius: 3,
// //           background: 'linear-gradient(145deg, #ffffff, #f0f2f5)',
// //           boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
// //           border: '1px solid #e0e0e0'
// //         }}>
// //           <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>

// //             {/* Bill Item Addition Section - Moved Up */}
// //             <Box>
// //               <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>1. Add Bill Items</Typography>
// //               <Grid container spacing={2}>
// //                 <Grid item xs={12}>
// //                   <FormControl fullWidth variant="outlined" size="small" disabled={loadingAvailableItems}>
// //                     <InputLabel id="select-existing-item-label">Select Existing Item</InputLabel>
// //                     <Select
// //                       labelId="select-existing-item-label"
// //                       id="select-existing-item"
// //                       value={selectedExistingItemId}
// //                       onChange={handleExistingItemSelect}
// //                       label="Select Existing Item"
// //                     >
// //                       <MenuItem value="">
// //                         <em>{loadingAvailableItems ? 'Loading items...' : 'Select or Add New Item'}</em>
// //                       </MenuItem>
// //                       {fetchItemsError && (
// //                         <MenuItem disabled>Error loading items: {fetchItemsError}</MenuItem>
// //                       )}
// //                       {availableBillItems.map((item) => (
// //                         <MenuItem key={item.id} value={item.id}>
// //                           {item.description} (₹{parseFloat(item.unitPrice).toFixed(2)})
// //                         </MenuItem>
// //                       ))}
// //                     </Select>
// //                   </FormControl>
// //                 </Grid>
// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="Item Description"
// //                     name="description"
// //                     value={currentBillItem.description}
// //                     onChange={handleBillItemChange}
// //                     fullWidth
// //                     variant="outlined"
// //                     size="small"
// //                     required
// //                   />
// //                 </Grid>
// //                 <Grid item xs={6} sm={3}>
// //                   <TextField
// //                     label="Quantity"
// //                     name="quantity"
// //                     type="number"
// //                     value={currentBillItem.quantity}
// //                     onChange={handleBillItemChange}
// //                     fullWidth
// //                     inputProps={{ min: 1 }}
// //                     variant="outlined"
// //                     size="small"
// //                     required
// //                   />
// //                 </Grid>
// //                 <Grid item xs={6} sm={3}>
// //                   <TextField
// //                     label="Unit Price (₹)"
// //                     name="unitPrice"
// //                     type="number"
// //                     value={currentBillItem.unitPrice}
// //                     onChange={handleBillItemChange}
// //                     fullWidth
// //                     inputProps={{ step: "0.01", min: 0 }}
// //                     variant="outlined"
// //                     size="small"
// //                     required
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="Service Date"
// //                     name="serviceDate"
// //                     type="date"
// //                     value={currentBillItem.serviceDate}
// //                     onChange={handleBillItemChange}
// //                     fullWidth
// //                     InputLabelProps={{ shrink: true }}
// //                     variant="outlined"
// //                     size="small"
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="Notes (Item Specific)"
// //                     name="notes"
// //                     value={currentBillItem.notes}
// //                     onChange={handleBillItemChange}
// //                     fullWidth
// //                     variant="outlined"
// //                     size="small"
// //                     multiline
// //                     rows={1}
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12}>
// //                   <Button
// //                     variant="contained"
// //                     color="secondary"
// //                     startIcon={<AddIcon />}
// //                     onClick={handleAddBillItem}
// //                     fullWidth
// //                     sx={{ py: 1.5, mt: 1 }}
// //                   >
// //                     Add Item to Bill
// //                   </Button>
// //                 </Grid>
// //               </Grid>
// //             </Box>

// //             {/* List of Added Bill Items */}
// //             {billData.billItems.length > 0 && (
// //               <Paper elevation={4} sx={{
// //                 width: '100%',
// //                 bgcolor: 'background.paper',
// //                 borderRadius: 2,
// //                 border: '1px solid #e0e0e0',
// //                 mt: 2,
// //                 overflow: 'hidden'
// //               }}>
// //                 <Typography variant="h6" sx={{
// //                   p: 2,
// //                   bgcolor: 'primary.light',
// //                   color: 'primary.contrastText',
// //                   fontWeight: 'bold',
// //                   display: 'flex',
// //                   alignItems: 'center',
// //                   gap: 1
// //                 }}>
// //                   <ListIcon /> Items on this Bill ({billData.billItems.length})
// //                 </Typography>
// //                 <List disablePadding>
// //                   {billData.billItems.map((item, index) => (
// //                     <React.Fragment key={item.tempId}>
// //                       <ListItem sx={{ py: 1.5, px: 2 }}>
// //                         <ListItemText
// //                           primary={
// //                             <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
// //                               {item.description}
// //                             </Typography>
// //                           }
// //                           secondary={
// //                             // FIX: Changed inner Typography components to render as 'span'
// //                             <Box component="span">
// //                               <Typography variant="body2" color="text.secondary" component="span" display="block">
// //                                 Quantity: {item.quantity} | Unit Price: ₹{parseFloat(item.unitPrice).toFixed(2)}
// //                               </Typography>
// //                               <Typography variant="body2" color="text.secondary" component="span" display="block">
// //                                 **Total: ₹{(parseFloat(item.quantity) * parseFloat(item.unitPrice)).toFixed(2)}**
// //                               </Typography>
// //                               <Typography variant="body2" color="text.secondary" component="span" display="block">
// //                                 Service Date: {new Date(item.serviceDate).toLocaleDateString()}
// //                               </Typography>
// //                               {item.notes && (
// //                                 <Typography variant="body2" color="text.secondary" component="span" display="block">
// //                                   Notes: {item.notes}
// //                                 </Typography>
// //                               )}
// //                             </Box>
// //                           }
// //                         />
// //                         <ListItemSecondaryAction>
// //                           <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveBillItem(item.tempId)}>
// //                             <DeleteIcon color="error" />
// //                           </IconButton>
// //                         </ListItemSecondaryAction>
// //                       </ListItem>
// //                       {index < billData.billItems.length - 1 && <Divider component="li" />}
// //                     </React.Fragment>
// //                   ))}
// //                 </List>
// //               </Paper>
// //             )}

// //             <Divider sx={{ my: 2 }}>
// //               <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 'bold' }}>Bill Generation & Details</Typography>
// //             </Divider>

// //             {/* PDF Generation Button - Placed after Bill Items */}
// //             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
// //               <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>2. Generate PDF</Typography>
// //               <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
// //                 After adding all bill items, click below to generate and download the PDF.
// //               </Typography>
// //               <Button
// //                 variant="outlined"
// //                 color="primary"
// //                 startIcon={<DownloadIcon />}
// //                 onClick={() => generateBillPdf(billData, billData.billItems)}
// //                 disabled={billData.billItems.length === 0 || submitting || uploadingPdf}
// //                 sx={{ px: 4, py: 1.5, fontSize: '1rem' }}
// //               >
// //                 Generate & Download Bill PDF
// //               </Button>
// //             </Box>

// //             {/* Main Bill Details Section - After PDF Generation Step */}
// //             <Box sx={{ mt: 3 }}>
// //               <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>3. Final Bill Details & Submission</Typography>
// //               <Grid container spacing={3}>
// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="Patient ID"
// //                     name="patientId"
// //                     value={billData.patientId}
// //                     onChange={handleBillChange}
// //                     fullWidth
// //                     required
// //                     variant="outlined"
// //                     size="small"
// //                     InputProps={{ readOnly: !!initialPatientId }}
// //                     helperText="Required"
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="Appointment ID (Optional)"
// //                     name="appointmentId"
// //                     value={billData.appointmentId}
// //                     onChange={handleBillChange}
// //                     fullWidth
// //                     variant="outlined"
// //                     size="small"
// //                     InputProps={{ readOnly: !!initialAppointmentId }}
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="Amount Paid (₹)"
// //                     name="amountPaid"
// //                     type="number"
// //                     value={billData.amountPaid}
// //                     onChange={handleBillChange}
// //                     fullWidth
// //                     inputProps={{ step: "0.01" }}
// //                     variant="outlined"
// //                     size="small"
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="Total Amount (₹)"
// //                     name="totalAmount"
// //                     value={billData.totalAmount}
// //                     fullWidth
// //                     variant="outlined"
// //                     InputProps={{ readOnly: true, startAdornment: <PaidIcon sx={{ color: 'success.main' }} /> }}
// //                     sx={{ bgcolor: '#e8f5e9' }}
// //                     size="small"
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="Balance Due (₹)"
// //                     name="balanceDue"
// //                     value={billData.balanceDue}
// //                     fullWidth
// //                     variant="outlined"
// //                     InputProps={{ readOnly: true, startAdornment: <PaidIcon sx={{ color: 'error.main' }} /> }}
// //                     sx={{ bgcolor: '#ffebee' }}
// //                     size="small"
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="Bill Date"
// //                     name="billDate"
// //                     type="date"
// //                     value={billData.billDate}
// //                     onChange={handleBillChange}
// //                     fullWidth
// //                     required
// //                     InputLabelProps={{ shrink: true }}
// //                     variant="outlined"
// //                     size="small"
// //                     helperText="Required"
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="Due Date"
// //                     name="dueDate"
// //                     type="date"
// //                     value={billData.dueDate}
// //                     onChange={handleBillChange}
// //                     fullWidth
// //                     required
// //                     InputLabelProps={{ shrink: true }}
// //                     variant="outlined"
// //                     size="small"
// //                     helperText="Required"
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12} sm={6}>
// //                   <FormControl fullWidth variant="outlined" size="small">
// //                     <InputLabel>Payment Method</InputLabel>
// //                     <Select
// //                       label="Payment Method"
// //                       name="paymentMethod"
// //                       value={billData.paymentMethod}
// //                       onChange={handleBillChange}
// //                     >
// //                       <MenuItem value=""><em>None</em></MenuItem>
// //                       <MenuItem value="Credit Card">Credit Card</MenuItem>
// //                       <MenuItem value="Debit Card">Debit Card</MenuItem>
// //                       <MenuItem value="Cash">Cash</MenuItem>
// //                       <MenuItem value="Net Banking">Net Banking</MenuItem>
// //                       <MenuItem value="UPI">UPI</MenuItem>
// //                       <MenuItem value="Cheque">Cheque</MenuItem>
// //                     </Select>
// //                   </FormControl>
// //                 </Grid>
// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="Transaction ID (Optional)"
// //                     name="transactionId"
// //                     value={billData.transactionId}
// //                     onChange={handleBillChange}
// //                     fullWidth
// //                     variant="outlined"
// //                     size="small"
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="Issued By User ID"
// //                     name="issuedByUserId"
// //                     value={billData.issuedByUserId}
// //                     fullWidth
// //                     variant="outlined"
// //                     InputProps={{ readOnly: true }}
// //                     size="small"
// //                   />
// //                 </Grid>
// //                 {/* Bill Document Upload Section */}
// //                 <Grid item xs={12} sm={6}>
// //                   <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
// //                     Upload Bill Document (PDF)
// //                   </Typography>
// //                   <Button
// //                     variant="outlined"
// //                     component="label" // This makes the button trigger the file input
// //                     startIcon={uploadingPdf ? <CircularProgress size={20} color="inherit" /> : <UploadFileIcon />}
// //                     disabled={uploadingPdf || submitting}
// //                     sx={{ py: 1.2, width: '100%' }}
// //                   >
// //                     {uploadingPdf ? 'Uploading...' : 'Choose File'}
// //                     <input
// //                       type="file"
// //                       hidden
// //                       accept=".pdf" // Only accept PDF files
// //                       onChange={handleFileChange}
// //                       ref={fileInputRef} // Attach ref
// //                     />
// //                   </Button>
// //                   {uploadedFileName && (
// //                     <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
// //                       Selected: {uploadedFileName}
// //                     </Typography>
// //                   )}
// //                   {billData.billDocumentUrl && (
// //                     <Typography variant="caption" color="text.primary" sx={{ mt: 0.5, display: 'block' }}>
// //                       URL: <a href={billData.billDocumentUrl} target="_blank" rel="noopener noreferrer">{billData.billDocumentUrl.substring(0, 40)}...</a>
// //                     </Typography>
// //                   )}
// //                   {!billData.billDocumentUrl && !uploadedFileName && (
// //                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
// //                        (No file uploaded)
// //                      </Typography>
// //                   )}
// //                   <TextField
// //                     label="Bill Document URL"
// //                     name="billDocumentUrl"
// //                     type="url"
// //                     value={billData.billDocumentUrl}
// //                     onChange={handleBillChange} // Allows manual paste as fallback
// //                     fullWidth
// //                     variant="outlined"
// //                     size="small"
// //                     sx={{ mt: 1 }}
// //                     helperText="URL automatically populated after upload, or paste manually."
// //                     InputProps={{
// //                         readOnly: uploadingPdf, // Make read-only during upload
// //                         endAdornment: billData.billDocumentUrl && (
// //                             <IconButton
// //                                 onClick={() => setBillData(prev => ({ ...prev, billDocumentUrl: '' }))}
// //                                 size="small"
// //                                 disabled={uploadingPdf}
// //                             >
// //                                 <ClearIcon fontSize="small" />
// //                             </IconButton>
// //                         )
// //                     }}
// //                   />
// //                 </Grid>
// //               </Grid>
// //             </Box>

// //             {/* Form Actions */}
// //             <Box sx={{
// //               display: 'flex',
// //               justifyContent: 'flex-end',
// //               gap: 2,
// //               mt: 3,
// //               pt: 2,
// //               borderTop: '1px solid #e0e0e0'
// //             }}>
// //               {onCancel && (
// //                 <Button
// //                   variant="outlined"
// //                   color="error"
// //                   startIcon={<ClearIcon />}
// //                   onClick={onCancel}
// //                   disabled={submitting || uploadingPdf}
// //                   sx={{ px: 3, py: 1.2 }}
// //                 >
// //                   Cancel
// //                 </Button>
// //               )}
// //               <Button
// //                 variant="outlined"
// //                 color="secondary"
// //                 startIcon={<ClearIcon />}
// //                 onClick={handleClearForm}
// //                 disabled={submitting || uploadingPdf}
// //                 sx={{ px: 3, py: 1.2 }}
// //               >
// //                 Clear Form
// //               </Button>
// //               <Button
// //                 variant="contained"
// //                 color="primary"
// //                 startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
// //                 type="submit"
// //                 disabled={submitting || uploadingPdf} // Disable submit during file upload
// //                 sx={{ px: 3, py: 1.2 }}
// //               >
// //                 {submitting ? 'Submitting Bill...' : 'Submit Bill'}
// //               </Button>
// //             </Box>
// //           </Box>
// //         </Paper>

// //         <Box sx={{ mt: 2, opacity: 0.6, textAlign: 'center' }}>
// //           <Typography variant="body2" color="text.secondary">
// //             <InfoIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
// //             Follow the steps: 1. Add bill items. 2. Generate and download the PDF. 3. Upload the generated PDF and fill in remaining bill details, then submit.
// //           </Typography>
// //         </Box>
// //       </>
// //       <Snackbar
// //         open={snackbarOpen}
// //         autoHideDuration={6000}
// //         onClose={handleSnackbarClose}
// //         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
// //       >
// //         <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
// //           {snackbarMessage}
// //         </Alert>
// //       </Snackbar>
// //     </Box>
// //   );
// // };

// // BillingDeskGenerateBill.propTypes = {
// //   billingDeskUser: PropTypes.shape({
// //     userId: PropTypes.string,
// //     name: PropTypes.string,
// //     email: PropTypes.string,
// //     profilePic: PropTypes.string,
// //   }),
// //   initialPatientId: PropTypes.string,
// //   initialAppointmentId: PropTypes.string,
// //   onBillGenerated: PropTypes.func,
// //   onCancel: PropTypes.func,
// // };

// // export default BillingDeskGenerateBill;


// // import React, { useState, useEffect, useRef } from 'react';
// // import PropTypes from 'prop-types';
// // import {
// //   Box, Typography, Paper, TextField, Button,
// //   FormControl, InputLabel, Select, MenuItem,
// //   Snackbar, Alert, CircularProgress,
// //   IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Divider,
// //   Grid
// // } from '@mui/material';
// // import AddIcon from '@mui/icons-material/Add';
// // import SaveIcon from '@mui/icons-material/Save';
// // import ClearIcon from '@mui/icons-material/Clear';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import PaidIcon from '@mui/icons-material/Paid';
// // import ListIcon from '@mui/icons-material/List';
// // import InfoIcon from '@mui/icons-material/Info';

// // const BillingDeskGenerateBill = ({
// //   billingDeskUser,
// //   initialPatientId,
// //   initialAppointmentId,
// //   onBillGenerated,
// //   onCancel
// // }) => {
// //   const initialBillState = {
// //     patientId: initialPatientId || '',
// //     totalAmount: 0,
// //     amountPaid: '',
// //     balanceDue: '',
// //     billDate: new Date().toISOString().slice(0, 10),
// //     dueDate: '',
// //     paymentMethod: '',
// //     transactionId: '',
// //     issuedByUserId: billingDeskUser?.userId || '',
// //     appointmentId: initialAppointmentId || '',
// //     billItems: [],
// //   };

// //   const initialBillItemState = {
// //     description: '',
// //     quantity: 1,
// //     unitPrice: '',
// //     serviceDate: new Date().toISOString().slice(0, 10),
// //     notes: '',
// //   };

// //   const [billData, setBillData] = useState(initialBillState);
// //   const [currentBillItem, setCurrentBillItem] = useState(initialBillItemState);
// //   const [submitting, setSubmitting] = useState(false);
// //   const [snackbarOpen, setSnackbarOpen] = useState(false);
// //   const [snackbarMessage, setSnackbarMessage] = useState('');
// //   const [snackbarSeverity, setSnackbarSeverity] = useState('success');

// //   const [availableBillItems, setAvailableBillItems] = useState([]);
// //   const [loadingAvailableItems, setLoadingAvailableItems] = useState(true);
// //   const [fetchItemsError, setFetchItemsError] = useState(null);
// //   const [selectedExistingItemId, setSelectedExistingItemId] = useState('');

// //   useEffect(() => {
// //     setBillData({
// //       patientId: initialPatientId || '',
// //       totalAmount: 0,
// //       amountPaid: '',
// //       balanceDue: '',
// //       billDate: new Date().toISOString().slice(0, 10),
// //       dueDate: '',
// //       paymentMethod: '',
// //       transactionId: '',
// //       issuedByUserId: billingDeskUser?.userId || '',
// //       appointmentId: initialAppointmentId || '',
// //       billItems: [],
// //     });
// //     setCurrentBillItem(initialBillItemState);
// //     setSelectedExistingItemId('');
// //   }, [billingDeskUser, initialPatientId, initialAppointmentId]);

// //   useEffect(() => {
// //     const calculatedTotalAmount = billData.billItems.reduce((sum, item) => {
// //       const itemQuantity = parseFloat(item.quantity);
// //       const itemUnitPrice = parseFloat(item.unitPrice);
// //       return sum + (isNaN(itemQuantity) || isNaN(itemUnitPrice) ? 0 : itemQuantity * itemUnitPrice);
// //     }, 0);

// //     const paid = parseFloat(billData.amountPaid);
// //     const calculatedBalanceDue = calculatedTotalAmount - (isNaN(paid) ? 0 : paid);

// //     setBillData(prev => ({
// //       ...prev,
// //       totalAmount: calculatedTotalAmount.toFixed(2),
// //       balanceDue: calculatedBalanceDue.toFixed(2),
// //     }));
// //   }, [billData.billItems, billData.amountPaid]);

// //   useEffect(() => {
// //     const fetchAllBillItems = async () => {
// //       try {
// //         setLoadingAvailableItems(true);
// //         setFetchItemsError(null);
// //         const response = await fetch('http://localhost:2009/api/bill-items');
// //         if (!response.ok) {
// //           const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
// //           throw new Error(`Failed to fetch bill items: ${response.status} ${response.statusText} - ${errorData.message}`);
// //         }
// //         const data = await response.json();
// //         setAvailableBillItems(data);
// //       } catch (error) {
// //         console.error("Error fetching available bill items:", error);
// //         setFetchItemsError(error.message);
// //         setSnackbarMessage(`Error loading existing items: ${error.message}`);
// //         setSnackbarSeverity('error');
// //         setSnackbarOpen(true);
// //       } finally {
// //         setLoadingAvailableItems(false);
// //       }
// //     };

// //     fetchAllBillItems();
// //   }, []);

// //   const handleBillChange = (e) => {
// //     const { name, value } = e.target;
// //     setBillData(prev => ({ ...prev, [name]: value }));
// //   };

// //   const handleBillItemChange = (e) => {
// //     const { name, value } = e.target;
// //     setCurrentBillItem(prev => ({ ...prev, [name]: value }));
// //     if (name !== 'serviceDate' && name !== 'notes') {
// //       setSelectedExistingItemId('');
// //     }
// //   };

// //   const handleExistingItemSelect = (e) => {
// //     const selectedId = e.target.value;
// //     setSelectedExistingItemId(selectedId);

// //     if (selectedId === '') {
// //       setCurrentBillItem(initialBillItemState);
// //       return;
// //     }

// //     const selectedItem = availableBillItems.find(item => item.id === selectedId);
// //     if (selectedItem) {
// //       setCurrentBillItem({
// //         description: selectedItem.description || '',
// //         quantity: selectedItem.quantity || 1,
// //         unitPrice: selectedItem.unitPrice || '',
// //         serviceDate: selectedItem.serviceDate ? new Date(selectedItem.serviceDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
// //         notes: selectedItem.notes || '',
// //       });
// //     }
// //   };

// //   const handleAddBillItem = () => {
// //     if (!currentBillItem.description || isNaN(parseFloat(currentBillItem.quantity)) || isNaN(parseFloat(currentBillItem.unitPrice)) || parseFloat(currentBillItem.quantity) <= 0 || parseFloat(currentBillItem.unitPrice) <= 0) {
// //       setSnackbarMessage('Please fill in valid Description, Quantity, and Unit Price for the bill item.');
// //       setSnackbarSeverity('error');
// //       setSnackbarOpen(true);
// //       return;
// //     }

// //     setBillData(prev => ({
// //       ...prev,
// //       billItems: [...prev.billItems, { ...currentBillItem, tempId: Date.now() + Math.random() }],
// //     }));
// //     setCurrentBillItem(initialBillItemState);
// //     setSelectedExistingItemId('');
// //     setSnackbarMessage('Bill item added.');
// //     setSnackbarSeverity('info');
// //     setSnackbarOpen(true);
// //   };

// //   const handleRemoveBillItem = (tempIdToRemove) => {
// //     setBillData(prev => ({
// //       ...prev,
// //       billItems: prev.billItems.filter(item => item.tempId !== tempIdToRemove),
// //     }));
// //     setSnackbarMessage('Bill item removed.');
// //     setSnackbarSeverity('info');
// //     setSnackbarOpen(true);
// //   };

// //   const handleClearForm = () => {
// //     setBillData({
// //       patientId: initialPatientId || '',
// //       totalAmount: 0,
// //       amountPaid: '',
// //       balanceDue: '',
// //       billDate: new Date().toISOString().slice(0, 10),
// //       dueDate: '',
// //       paymentMethod: '',
// //       transactionId: '',
// //       issuedByUserId: billingDeskUser?.userId || '',
// //       appointmentId: initialAppointmentId || '',
// //       billItems: [],
// //     });
// //     setCurrentBillItem(initialBillItemState);
// //     setSelectedExistingItemId('');
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setSubmitting(true);
// //     setSnackbarOpen(false);

// //     if (!billData.patientId || !billData.billDate || !billData.dueDate) {
// //       setSnackbarMessage('Please fill in all required bill details: Patient ID, Bill Date, Due Date.');
// //       setSnackbarSeverity('error');
// //       setSnackbarOpen(true);
// //       setSubmitting(false);
// //       return;
// //     }

// //     if (billData.billItems.length === 0) {
// //       setSnackbarMessage('Please add at least one bill item.');
// //       setSnackbarSeverity('error');
// //       setSnackbarOpen(true);
// //       setSubmitting(false);
// //       return;
// //     }

// //     const mainBillToCreate = {
// //       patientId: billData.patientId,
// //       billDate: billData.billDate,
// //       totalAmount: parseFloat(billData.totalAmount),
// //       amountPaid: parseFloat(billData.amountPaid || 0),
// //       balanceDue: parseFloat(billData.balanceDue || 0),
// //       paymentMethod: billData.paymentMethod || null,
// //       transactionId: billData.transactionId || null,
// //       issuedByUserId: billData.issuedByUserId,
// //       dueDate: billData.dueDate,
// //       appointmentId: billData.appointmentId || null,
// //     };

// //     let createdMainBill = null;

// //     try {
// //       const billResponse = await fetch('http://localhost:2009/api/bills', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(mainBillToCreate),
// //       });

// //       if (!billResponse.ok) {
// //         const errorData = await billResponse.json();
// //         throw new Error(errorData.message || `Failed to create main bill: ${billResponse.status} ${billResponse.statusText}`);
// //       }

// //       createdMainBill = await billResponse.json();
// //       const newBillId = createdMainBill.id;

// //       const billItemsToPersist = billData.billItems.map(item => ({
// //         billId: newBillId,
// //         description: item.description,
// //         quantity: parseFloat(item.quantity),
// //         unitPrice: parseFloat(item.unitPrice),
// //         serviceDate: item.serviceDate,
// //         notes: item.notes || null,
// //         appointmentId: billData.appointmentId || null,
// //       }));

// //       const itemCreationPromises = billItemsToPersist.map(async (itemToCreate) => {
// //         const itemResponse = await fetch('http://localhost:2009/api/bill-items', {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify(itemToCreate),
// //         });

// //         if (!itemResponse.ok) {
// //           const errorItemData = await itemResponse.json().catch(() => ({ message: `Unknown error creating item: ${itemToCreate.description}` }));
// //           console.error(`Failed to create bill item for billId ${newBillId}:`, errorItemData);
// //           throw new Error(errorItemData.message || `Failed to create item: ${itemToCreate.description}`);
// //         }
// //         return itemResponse.json();
// //       });

// //       const createdItems = await Promise.all(itemCreationPromises);

// //       const fullBillData = {
// //         ...createdMainBill,
// //         billItems: createdItems,
// //       };

// //       if (onBillGenerated) {
// //         onBillGenerated(fullBillData);
// //       }

// //       setSnackbarMessage('Bill and all items generated successfully!');
// //       setSnackbarSeverity('success');
// //       setSnackbarOpen(true);
// //     } catch (err) {
// //       console.error('Overall error generating bill:', err);
// //       setSnackbarMessage(`Error generating bill: ${err.message}`);
// //       setSnackbarSeverity('error');
// //       setSnackbarOpen(true);
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   const handleSnackbarClose = (event, reason) => {
// //     if (reason === 'clickaway') {
// //       return;
// //     }
// //     setSnackbarOpen(false);
// //   };

// //   return (
// //     <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 900, mx: 'auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
// //       <>
// //         <Typography variant="h4" gutterBottom align="center" sx={{
// //           mb: 2,
// //           fontWeight: 'bold',
// //           color: 'primary.dark',
// //           textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
// //         }}>
// //           <PaidIcon sx={{ fontSize: 'inherit', verticalAlign: 'middle', mr: 1 }} /> Generate New Bill
// //         </Typography>

// //         <Paper elevation={8} sx={{
// //           p: { xs: 3, md: 5 },
// //           borderRadius: 3,
// //           background: 'linear-gradient(145deg, #ffffff, #f0f2f5)',
// //           boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
// //           border: '1px solid #e0e0e0'
// //         }}>
// //           <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>

// //             {/* Bill Item Addition Section */}
// //             <Box>
// //               <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>1. Add Bill Items</Typography>
// //               <Grid container spacing={2}>
// //                 <Grid item xs={12}>
// //                   <FormControl fullWidth variant="outlined" size="small" disabled={loadingAvailableItems}>
// //                     <InputLabel id="select-existing-item-label">Select Existing Item</InputLabel>
// //                     <Select
// //                       labelId="select-existing-item-label"
// //                       id="select-existing-item"
// //                       value={selectedExistingItemId}
// //                       onChange={handleExistingItemSelect}
// //                       label="Select Existing Item"
// //                     >
// //                       <MenuItem value="">
// //                         <em>{loadingAvailableItems ? 'Loading items...' : 'Select or Add New Item'}</em>
// //                       </MenuItem>
// //                       {fetchItemsError && (
// //                         <MenuItem disabled>Error loading items: {fetchItemsError}</MenuItem>
// //                       )}
// //                       {availableBillItems.map((item) => (
// //                         <MenuItem key={item.id} value={item.id}>
// //                           {item.description} (₹{parseFloat(item.unitPrice).toFixed(2)})
// //                         </MenuItem>
// //                       ))}
// //                     </Select>
// //                   </FormControl>
// //                 </Grid>
// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="Item Description"
// //                     name="description"
// //                     value={currentBillItem.description}
// //                     onChange={handleBillItemChange}
// //                     fullWidth
// //                     variant="outlined"
// //                     size="small"
// //                     required
// //                   />
// //                 </Grid>
// //                 <Grid item xs={6} sm={3}>
// //                   <TextField
// //                     label="Quantity"
// //                     name="quantity"
// //                     type="number"
// //                     value={currentBillItem.quantity}
// //                     onChange={handleBillItemChange}
// //                     fullWidth
// //                     inputProps={{ min: 1 }}
// //                     variant="outlined"
// //                     size="small"
// //                     required
// //                   />
// //                 </Grid>
// //                 <Grid item xs={6} sm={3}>
// //                   <TextField
// //                     label="Unit Price (₹)"
// //                     name="unitPrice"
// //                     type="number"
// //                     value={currentBillItem.unitPrice}
// //                     onChange={handleBillItemChange}
// //                     fullWidth
// //                     inputProps={{ step: "0.01", min: 0 }}
// //                     variant="outlined"
// //                     size="small"
// //                     required
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="Service Date"
// //                     name="serviceDate"
// //                     type="date"
// //                     value={currentBillItem.serviceDate}
// //                     onChange={handleBillItemChange}
// //                     fullWidth
// //                     InputLabelProps={{ shrink: true }}
// //                     variant="outlined"
// //                     size="small"
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="Notes (Item Specific)"
// //                     name="notes"
// //                     value={currentBillItem.notes}
// //                     onChange={handleBillItemChange}
// //                     fullWidth
// //                     variant="outlined"
// //                     size="small"
// //                     multiline
// //                     rows={1}
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12}>
// //                   <Button
// //                     variant="contained"
// //                     color="secondary"
// //                     startIcon={<AddIcon />}
// //                     onClick={handleAddBillItem}
// //                     fullWidth
// //                     sx={{ py: 1.5, mt: 1 }}
// //                   >
// //                     Add Item to Bill
// //                   </Button>
// //                 </Grid>
// //               </Grid>
// //             </Box>

// //             {/* List of Added Bill Items */}
// //             {billData.billItems.length > 0 && (
// //               <Paper elevation={4} sx={{
// //                 width: '100%',
// //                 bgcolor: 'background.paper',
// //                 borderRadius: 2,
// //                 border: '1px solid #e0e0e0',
// //                 mt: 2,
// //                 overflow: 'hidden'
// //               }}>
// //                 <Typography variant="h6" sx={{
// //                   p: 2,
// //                   bgcolor: 'primary.light',
// //                   color: 'primary.contrastText',
// //                   fontWeight: 'bold',
// //                   display: 'flex',
// //                   alignItems: 'center',
// //                   gap: 1
// //                 }}>
// //                   <ListIcon /> Items on this Bill ({billData.billItems.length})
// //                 </Typography>
// //                 <List disablePadding>
// //                   {billData.billItems.map((item, index) => (
// //                     <React.Fragment key={item.tempId}>
// //                       <ListItem sx={{ py: 1.5, px: 2 }}>
// //                         <ListItemText
// //                           primary={
// //                             <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
// //                               {item.description}
// //                             </Typography>
// //                           }
// //                           secondary={
// //                             <Box component="span">
// //                               <Typography variant="body2" color="text.secondary" component="span" display="block">
// //                                 Quantity: {item.quantity} | Unit Price: ₹{parseFloat(item.unitPrice).toFixed(2)}
// //                               </Typography>
// //                               <Typography variant="body2" color="text.secondary" component="span" display="block">
// //                                 **Total: ₹{(parseFloat(item.quantity) * parseFloat(item.unitPrice)).toFixed(2)}**
// //                               </Typography>
// //                               <Typography variant="body2" color="text.secondary" component="span" display="block">
// //                                 Service Date: {new Date(item.serviceDate).toLocaleDateString()}
// //                               </Typography>
// //                               {item.notes && (
// //                                 <Typography variant="body2" color="text.secondary" component="span" display="block">
// //                                   Notes: {item.notes}
// //                                 </Typography>
// //                               )}
// //                             </Box>
// //                           }
// //                         />
// //                         <ListItemSecondaryAction>
// //                           <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveBillItem(item.tempId)}>
// //                             <DeleteIcon color="error" />
// //                           </IconButton>
// //                         </ListItemSecondaryAction>
// //                       </ListItem>
// //                       {index < billData.billItems.length - 1 && <Divider component="li" />}
// //                     </React.Fragment>
// //                   ))}
// //                 </List>
// //               </Paper>
// //             )}

// //             <Divider sx={{ my: 2 }}>
// //               <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 'bold' }}>Final Bill Details</Typography>
// //             </Divider>

// //             {/* Main Bill Details Section */}
// //             <Box sx={{ mt: 3 }}>
// //               <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>2. Bill Details & Submission</Typography>
// //               <Grid container spacing={3}>
// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="Patient ID"
// //                     name="patientId"
// //                     value={billData.patientId}
// //                     onChange={handleBillChange}
// //                     fullWidth
// //                     required
// //                     variant="outlined"
// //                     size="small"
// //                     InputProps={{ readOnly: !!initialPatientId }}
// //                     helperText="Required"
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="Appointment ID (Optional)"
// //                     name="appointmentId"
// //                     value={billData.appointmentId}
// //                     onChange={handleBillChange}
// //                     fullWidth
// //                     variant="outlined"
// //                     size="small"
// //                     InputProps={{ readOnly: !!initialAppointmentId }}
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="Amount Paid (₹)"
// //                     name="amountPaid"
// //                     type="number"
// //                     value={billData.amountPaid}
// //                     onChange={handleBillChange}
// //                     fullWidth
// //                     inputProps={{ step: "0.01" }}
// //                     variant="outlined"
// //                     size="small"
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="Total Amount (₹)"
// //                     name="totalAmount"
// //                     value={billData.totalAmount}
// //                     fullWidth
// //                     variant="outlined"
// //                     InputProps={{ readOnly: true, startAdornment: <PaidIcon sx={{ color: 'success.main' }} /> }}
// //                     sx={{ bgcolor: '#e8f5e9' }}
// //                     size="small"
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="Balance Due (₹)"
// //                     name="balanceDue"
// //                     value={billData.balanceDue}
// //                     fullWidth
// //                     variant="outlined"
// //                     InputProps={{ readOnly: true, startAdornment: <PaidIcon sx={{ color: 'error.main' }} /> }}
// //                     sx={{ bgcolor: '#ffebee' }}
// //                     size="small"
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="Bill Date"
// //                     name="billDate"
// //                     type="date"
// //                     value={billData.billDate}
// //                     onChange={handleBillChange}
// //                     fullWidth
// //                     required
// //                     InputLabelProps={{ shrink: true }}
// //                     variant="outlined"
// //                     size="small"
// //                     helperText="Required"
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="Due Date"
// //                     name="dueDate"
// //                     type="date"
// //                     value={billData.dueDate}
// //                     onChange={handleBillChange}
// //                     fullWidth
// //                     required
// //                     InputLabelProps={{ shrink: true }}
// //                     variant="outlined"
// //                     size="small"
// //                     helperText="Required"
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12} sm={6}>
// //                   <FormControl fullWidth variant="outlined" size="small">
// //                     <InputLabel>Payment Method</InputLabel>
// //                     <Select
// //                       label="Payment Method"
// //                       name="paymentMethod"
// //                       value={billData.paymentMethod}
// //                       onChange={handleBillChange}
// //                     >
// //                       <MenuItem value=""><em>None</em></MenuItem>
// //                       <MenuItem value="Credit Card">Credit Card</MenuItem>
// //                       <MenuItem value="Debit Card">Debit Card</MenuItem>
// //                       <MenuItem value="Cash">Cash</MenuItem>
// //                       <MenuItem value="Net Banking">Net Banking</MenuItem>
// //                       <MenuItem value="UPI">UPI</MenuItem>
// //                       <MenuItem value="Cheque">Cheque</MenuItem>
// //                     </Select>
// //                   </FormControl>
// //                 </Grid>
// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="Transaction ID (Optional)"
// //                     name="transactionId"
// //                     value={billData.transactionId}
// //                     onChange={handleBillChange}
// //                     fullWidth
// //                     variant="outlined"
// //                     size="small"
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="Issued By User ID"
// //                     name="issuedByUserId"
// //                     value={billData.issuedByUserId}
// //                     fullWidth
// //                     variant="outlined"
// //                     InputProps={{ readOnly: true }}
// //                     size="small"
// //                   />
// //                 </Grid>
// //               </Grid>
// //             </Box>

// //             {/* Form Actions */}
// //             <Box sx={{
// //               display: 'flex',
// //               justifyContent: 'flex-end',
// //               gap: 2,
// //               mt: 3,
// //               pt: 2,
// //               borderTop: '1px solid #e0e0e0'
// //             }}>
// //               {onCancel && (
// //                 <Button
// //                   variant="outlined"
// //                   color="error"
// //                   startIcon={<ClearIcon />}
// //                   onClick={onCancel}
// //                   disabled={submitting}
// //                   sx={{ px: 3, py: 1.2 }}
// //                 >
// //                   Cancel
// //                 </Button>
// //               )}
// //               <Button
// //                 variant="outlined"
// //                 color="secondary"
// //                 startIcon={<ClearIcon />}
// //                 onClick={handleClearForm}
// //                 disabled={submitting}
// //                 sx={{ px: 3, py: 1.2 }}
// //               >
// //                 Clear Form
// //               </Button>
// //               <Button
// //                 variant="contained"
// //                 color="primary"
// //                 startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
// //                 type="submit"
// //                 disabled={submitting}
// //                 sx={{ px: 3, py: 1.2 }}
// //               >
// //                 {submitting ? 'Submitting Bill...' : 'Submit Bill'}
// //               </Button>
// //             </Box>
// //           </Box>
// //         </Paper>

// //         <Box sx={{ mt: 2, opacity: 0.6, textAlign: 'center' }}>
// //           <Typography variant="body2" color="text.secondary">
// //             <InfoIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
// //             Follow the steps: 1. Add bill items. 2. Fill in remaining bill details, then submit.
// //           </Typography>
// //         </Box>
// //       </>
// //       <Snackbar
// //         open={snackbarOpen}
// //         autoHideDuration={6000}
// //         onClose={handleSnackbarClose}
// //         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
// //       >
// //         <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
// //           {snackbarMessage}
// //         </Alert>
// //       </Snackbar>
// //     </Box>
// //   );
// // };

// // BillingDeskGenerateBill.propTypes = {
// //   billingDeskUser: PropTypes.shape({
// //     userId: PropTypes.string,
// //     name: PropTypes.string,
// //     email: PropTypes.string,
// //     profilePic: PropTypes.string,
// //   }),
// //   initialPatientId: PropTypes.string,
// //   initialAppointmentId: PropTypes.string,
// //   onBillGenerated: PropTypes.func,
// //   onCancel: PropTypes.func,
// // };

// // export default BillingDeskGenerateBill;




// // import React, { useState, useEffect } from 'react';
// // import {
// //   Box,
// //   Typography,
// //   Paper,
// //   Button,
// //   List,
// //   ListItem,
// //   ListItemText,
// //   Divider,
// //   Alert,
// //   CircularProgress,
// //   TextField,
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   MenuItem,
// //   IconButton,
// //   Grid,
// //   Modal,
// // } from '@mui/material';

// // import { jsPDF } from 'jspdf';
// // import autoTable from 'jspdf-autotable';

// // import ListIcon from '@mui/icons-material/List';
// // import DownloadIcon from '@mui/icons-material/Download';
// // import AddIcon from '@mui/icons-material/Add';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import VisibilityIcon from '@mui/icons-material/Visibility';

// // // Register the autotable plugin with jsPDF (must be done once)
// // autoTable(jsPDF.API);

// // const style = {
// //   position: 'absolute',
// //   top: '50%',
// //   left: '50%',
// //   transform: 'translate(-50%, -50%)',
// //   width: '80%',
// //   height: '80vh',
// //   bgcolor: 'background.paper',
// //   border: '2px solid #000',
// //   boxShadow: 24,
// //   p: 4,
// // };

// // const BillingDeskGenerateBill = () => {
// //   const [billItems, setBillItems] = useState([]);
// //   const [isGenerating, setIsGenerating] = useState(false);
// //   const [availableBillItems, setAvailableBillItems] = useState([]);
// //   const [loadingAvailableItems, setLoadingAvailableItems] = useState(true);
// //   const [fetchItemsError, setFetchItemsError] = useState(null);
// //   const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
// //   const [modalOpen, setModalOpen] = useState(false);

// //   const [currentBillItem, setCurrentBillItem] = useState({
// //     description: '',
// //     quantity: 1,
// //     unitPrice: '',
// //   });

// //   const [selectedExistingItemId, setSelectedExistingItemId] = useState('');

// //   // Fetch available bill items on mount
// //   useEffect(() => {
// //     const fetchAllBillItems = async () => {
// //       try {
// //         setLoadingAvailableItems(true);
// //         const response = await fetch('http://localhost:2009/api/bill-items');
// //         if (!response.ok) {
// //           throw new Error(`Failed to fetch bill items: ${response.status} ${response.statusText}`);
// //         }
// //         const data = await response.json();
// //         setAvailableBillItems(data);
// //       } catch (error) {
// //         console.error("Error fetching available bill items:", error);
// //         setFetchItemsError(error.message);
// //       } finally {
// //         setLoadingAvailableItems(false);
// //       }
// //     };
// //     fetchAllBillItems();
// //   }, []);

// //   // Handle selection from existing bill items dropdown
// //   const handleExistingItemSelect = (e) => {
// //     const selectedId = e.target.value;
// //     setSelectedExistingItemId(selectedId);
// //     if (selectedId === '') {
// //       setCurrentBillItem({ description: '', quantity: 1, unitPrice: '' });
// //       return;
// //     }
// //     const selectedItem = availableBillItems.find(item => item.id === selectedId);
// //     if (selectedItem) {
// //       setCurrentBillItem({
// //         description: selectedItem.description,
// //         quantity: selectedItem.quantity || 1,
// //         unitPrice: selectedItem.unitPrice,
// //       });
// //     }
// //   };

// //   // Handle form input changes
// //   const handleBillItemChange = (e) => {
// //     const { name, value } = e.target;
// //     setCurrentBillItem(prev => ({ ...prev, [name]: value }));
// //     if (name === 'description' && selectedExistingItemId) {
// //       setSelectedExistingItemId('');
// //     }
// //   };

// //   // Add current bill item to billItems list
// //   const handleAddBillItem = () => {
// //     const { description, quantity, unitPrice } = currentBillItem;
// //     if (!description || isNaN(parseFloat(quantity)) || isNaN(parseFloat(unitPrice)) || parseFloat(quantity) <= 0 || parseFloat(unitPrice) <= 0) {
// //       alert('Please fill in valid Description, Quantity, and Unit Price for the bill item.');
// //       return;
// //     }
// //     const newItem = {
// //       ...currentBillItem,
// //       id: Date.now().toString(),
// //       quantity: parseFloat(quantity),
// //       unitPrice: parseFloat(unitPrice),
// //     };
// //     setBillItems(prev => [...prev, newItem]);
// //     setCurrentBillItem({ description: '', quantity: 1, unitPrice: '' });
// //     setSelectedExistingItemId('');
// //   };

// //   // Remove bill item by ID
// //   const handleRemoveBillItem = (idToRemove) => {
// //     setBillItems(prev => prev.filter(item => item.id !== idToRemove));
// //   };

// //   // Calculate total amount
// //   const totalAmount = billItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);

// //   // Generate PDF document
// //   const generateBillPdf = () => {
// //     if (billItems.length === 0) {
// //       alert('Please add bill items before generating a PDF.');
// //       return null;
// //     }
// //     setIsGenerating(true);
// //     try {
// //       const doc = new jsPDF();
// //       doc.setFontSize(22);
// //       doc.text('Bill Invoice', 14, 20);

// //       doc.setFontSize(12);
// //       doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);
// //       doc.text('Patient ID: 12345', 14, 36);

// //       const tableColumns = ["ID", "Description", "Quantity", "Unit Price (₹)", "Total (₹)"];
// //       const tableRows = billItems.map(item => [
// //         item.id,
// //         item.description,
// //         item.quantity,
// //         item.unitPrice.toFixed(2),
// //         (item.unitPrice * item.quantity).toFixed(2),
// //       ]);

// //       doc.autoTable({
// //         startY: 50,
// //         head: [tableColumns],
// //         body: tableRows,
// //         styles: { fontSize: 10, cellPadding: 3, valign: 'middle', halign: 'center' },
// //         headStyles: { fillColor: '#3f51b5', textColor: 255, fontStyle: 'bold' },
// //         alternateRowStyles: { fillColor: '#f5f5f5' },
// //         columnStyles: {
// //           0: { cellWidth: 15 },
// //           1: { halign: 'left' },
// //           2: { cellWidth: 20 },
// //           3: { cellWidth: 25 },
// //           4: { cellWidth: 25 },
// //         },
// //       });

// //       const finalY = doc.autoTable.previous?.finalY || 50;
// //       doc.setFontSize(12);
// //       doc.text(`Total Amount: ₹${totalAmount.toFixed(2)}`, 14, finalY + 15);
// //       doc.text('Thank you for your business!', 14, finalY + 25);

// //       setIsGenerating(false);
// //       return doc;
// //     } catch (error) {
// //       console.error("Error generating PDF:", error);
// //       alert('Failed to generate PDF. Please try again.');
// //       setIsGenerating(false);
// //       return null;
// //     }
// //   };

// //   // Preview generated PDF in modal iframe
// //   const handlePreviewPdf = () => {
// //     const doc = generateBillPdf();
// //     if (doc) {
// //       const pdfBlobUrl = doc.output('bloburl');
// //       setPdfPreviewUrl(pdfBlobUrl);
// //       setModalOpen(true);
// //     }
// //   };

// //   // Download PDF file
// //   const handleDownloadPdf = () => {
// //     const doc = generateBillPdf();
// //     if (doc) {
// //       doc.save(`bill_invoice_${new Date().toISOString().slice(0, 10)}.pdf`);
// //     }
// //   };

// //   // Close PDF preview modal and revoke Blob URL
// //   const handleModalClose = () => {
// //     setModalOpen(false);
// //     if (pdfPreviewUrl) {
// //       URL.revokeObjectURL(pdfPreviewUrl);
// //       setPdfPreviewUrl(null);
// //     }
// //   };

// //   return (
// //     <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 800, mx: 'auto' }}>
// //       <Paper elevation={8} sx={{
// //         p: { xs: 3, md: 5 },
// //         borderRadius: 3,
// //         background: 'linear-gradient(145deg, #ffffff, #f0f2f5)',
// //         boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
// //         border: '1px solid #e0e0e0'
// //       }}>
// //         <Typography variant="h4" gutterBottom align="center" sx={{
// //           mb: 3,
// //           fontWeight: 'bold',
// //           color: 'primary.dark',
// //           textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
// //         }}>
// //           <ListIcon sx={{ fontSize: 'inherit', verticalAlign: 'middle', mr: 1 }} /> Generate Bill
// //         </Typography>

// //         <Divider sx={{ my: 2 }}>
// //           <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 'bold' }}>Add Bill Items</Typography>
// //         </Divider>

// //         {/* Add Bill Item Form */}
// //         <Box sx={{ mb: 4 }}>
// //           <Grid container spacing={2} alignItems="center">
// //             <Grid item xs={12}>
// //               <FormControl fullWidth variant="outlined" size="small" disabled={loadingAvailableItems}>
// //                 <InputLabel id="select-existing-item-label">Select Existing Item</InputLabel>
// //                 <Select
// //                   labelId="select-existing-item-label"
// //                   id="select-existing-item"
// //                   value={selectedExistingItemId}
// //                   onChange={handleExistingItemSelect}
// //                   label="Select Existing Item"
// //                 >
// //                   <MenuItem value="">
// //                     <em>{loadingAvailableItems ? 'Loading items...' : 'Select or Add New Item'}</em>
// //                   </MenuItem>
// //                   {fetchItemsError && (
// //                     <MenuItem disabled>Error loading items: {fetchItemsError}</MenuItem>
// //                   )}
// //                   {availableBillItems.map((item) => (
// //                     <MenuItem key={item.id} value={item.id}>
// //                       {item.description} (₹{parseFloat(item.unitPrice).toFixed(2)})
// //                     </MenuItem>
// //                   ))}
// //                 </Select>
// //               </FormControl>
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <TextField
// //                 label="Description"
// //                 name="description"
// //                 value={currentBillItem.description}
// //                 onChange={handleBillItemChange}
// //                 fullWidth
// //                 variant="outlined"
// //                 size="small"
// //                 required
// //               />
// //             </Grid>
// //             <Grid item xs={6} sm={3}>
// //               <TextField
// //                 label="Quantity"
// //                 name="quantity"
// //                 type="number"
// //                 value={currentBillItem.quantity}
// //                 onChange={handleBillItemChange}
// //                 fullWidth
// //                 inputProps={{ min: 1 }}
// //                 variant="outlined"
// //                 size="small"
// //                 required
// //               />
// //             </Grid>
// //             <Grid item xs={6} sm={3}>
// //               <TextField
// //                 label="Unit Price (₹)"
// //                 name="unitPrice"
// //                 type="number"
// //                 value={currentBillItem.unitPrice}
// //                 onChange={handleBillItemChange}
// //                 fullWidth
// //                 inputProps={{ step: "0.01", min: 0 }}
// //                 variant="outlined"
// //                 size="small"
// //                 required
// //               />
// //             </Grid>
// //             <Grid item xs={12}>
// //               <Button
// //                 variant="contained"
// //                 color="secondary"
// //                 startIcon={<AddIcon />}
// //                 onClick={handleAddBillItem}
// //                 fullWidth
// //                 sx={{ py: 1.5 }}
// //               >
// //                 Add Item to Bill
// //               </Button>
// //             </Grid>
// //           </Grid>
// //         </Box>

// //         {/* Bill Items List */}
// //         <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
// //           Current Bill Items ({billItems.length})
// //         </Typography>
// //         {billItems.length > 0 ? (
// //           <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2, mb: 3 }}>
// //             {billItems.map((item, index) => (
// //               <React.Fragment key={item.id}>
// //                 <ListItem sx={{ py: 1.5 }}>
// //                   <ListItemText
// //                     primary={
// //                       <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
// //                         {item.description}
// //                       </Typography>
// //                     }
// //                     secondary={
// //                       <Typography variant="body2" color="text.secondary">
// //                         Quantity: {item.quantity} | Unit Price: ₹{item.unitPrice.toFixed(2)} | Total: ₹{(item.unitPrice * item.quantity).toFixed(2)}
// //                       </Typography>
// //                     }
// //                   />
// //                   <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveBillItem(item.id)}>
// //                     <DeleteIcon color="error" />
// //                   </IconButton>
// //                 </ListItem>
// //                 {index < billItems.length - 1 && <Divider component="li" />}
// //               </React.Fragment>
// //             ))}
// //           </List>
// //         ) : (
// //           <Alert severity="info" sx={{ mb: 3 }}>
// //             <Typography variant="body1">No items in the bill. Add an item using the form above.</Typography>
// //           </Alert>
// //         )}

// //         {/* Footer with total and PDF buttons */}
// //         <Box sx={{
// //           display: 'flex',
// //           justifyContent: 'space-between',
// //           alignItems: 'center',
// //           mt: 2,
// //           pb: 2,
// //           borderTop: '1px solid #e0e0e0',
// //           pt: 2,
// //         }}>
// //           <Typography variant="h6" color="text.primary">
// //             Grand Total: ₹{totalAmount.toFixed(2)}
// //           </Typography>
// //           <Box sx={{ display: 'flex', gap: 1 }}>
// //             <Button
// //               variant="outlined"
// //               color="primary"
// //               startIcon={<VisibilityIcon />}
// //               onClick={handlePreviewPdf}
// //               disabled={isGenerating || billItems.length === 0}
// //             >
// //               Preview
// //             </Button>
// //             <Button
// //               variant="contained"
// //               color="primary"
// //               startIcon={isGenerating ? <CircularProgress size={20} color="inherit" /> : <DownloadIcon />}
// //               onClick={handleDownloadPdf}
// //               disabled={isGenerating || billItems.length === 0}
// //               sx={{ px: 3, py: 1.2 }}
// //             >
// //               {isGenerating ? 'Generating...' : 'Download PDF'}
// //             </Button>
// //           </Box>
// //         </Box>
// //       </Paper>

// //       {/* PDF Preview Modal */}
// //       <Modal
// //         open={modalOpen}
// //         onClose={handleModalClose}
// //         aria-labelledby="pdf-preview-modal-title"
// //         aria-describedby="pdf-preview-modal-description"
// //       >
// //         <Box sx={style}>
// //           <Typography id="pdf-preview-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
// //             PDF Preview
// //           </Typography>
// //           <Box sx={{ height: '85%', overflow: 'hidden' }}>
// //             {pdfPreviewUrl ? (
// //               <iframe
// //                 src={pdfPreviewUrl}
// //                 title="PDF Preview"
// //                 width="100%"
// //                 height="100%"
// //                 style={{ border: 'none' }}
// //               />
// //             ) : (
// //               <Typography>Loading PDF preview...</Typography>
// //             )}
// //           </Box>
// //           <Box sx={{ mt: 2, textAlign: 'right' }}>
// //             <Button onClick={handleModalClose} variant="outlined">
// //               Close Preview
// //             </Button>
// //           </Box>
// //         </Box>
// //       </Modal>
// //     </Box>
// //   );
// // };

// // export default BillingDeskGenerateBill;
// import React, { useState, useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
// import {
//   Box, Typography, Paper, TextField, Button,
//   FormControl, InputLabel, Select, MenuItem,
//   Snackbar, Alert, CircularProgress,
//   IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Divider,
//   Grid
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import SaveIcon from '@mui/icons-material/Save';
// import ClearIcon from '@mui/icons-material/Clear';
// import DeleteIcon from '@mui/icons-material/Delete';
// import PaidIcon from '@mui/icons-material/Paid';
// import ListIcon from '@mui/icons-material/List';
// import InfoIcon from '@mui/icons-material/Info';
// import DownloadIcon from '@mui/icons-material/Download';
// import UploadFileIcon from '@mui/icons-material/UploadFile';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const BillingDeskGenerateBill = ({
//   billingDeskUser,
//   initialPatientId,
//   initialAppointmentId,
//   onBillGenerated,
//   onCancel
// }) => {
//   const initialBillState = {
//     patientId: initialPatientId || '',
//     totalAmount: 0,
//     amountPaid: '',
//     balanceDue: '',
//     billDate: new Date().toISOString().slice(0, 10),
//     dueDate: '',
//     paymentMethod: '',
//     transactionId: '',
//     issuedByUserId: billingDeskUser?.userId || '',
//     billDocumentUrl: '',
//     appointmentId: initialAppointmentId || '',
//     billItems: [],
//   };

//   const initialBillItemState = {
//     description: '',
//     quantity: 1,
//     unitPrice: '',
//     serviceDate: new Date().toISOString().slice(0, 10),
//     notes: '',
//   };

//   const [billData, setBillData] = useState(initialBillState);
//   const [currentBillItem, setCurrentBillItem] = useState(initialBillItemState);
//   const [submitting, setSubmitting] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');

//   const [availableBillItems, setAvailableBillItems] = useState([]);
//   const [loadingAvailableItems, setLoadingAvailableItems] = useState(true);
//   const [fetchItemsError, setFetchItemsError] = useState(null);
//   const [selectedExistingItemId, setSelectedExistingItemId] = useState('');

//   const [uploadingPdf, setUploadingPdf] = useState(false);
//   const [uploadedFileName, setUploadedFileName] = useState('');
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     setBillData({
//       patientId: initialPatientId || '',
//       totalAmount: 0,
//       amountPaid: '',
//       balanceDue: '',
//       billDate: new Date().toISOString().slice(0, 10),
//       dueDate: '',
//       paymentMethod: '',
//       transactionId: '',
//       issuedByUserId: billingDeskUser?.userId || '',
//       billDocumentUrl: '',
//       appointmentId: initialAppointmentId || '',
//       billItems: [],
//     });
//     setCurrentBillItem(initialBillItemState);
//     setSelectedExistingItemId('');
//     setUploadedFileName('');
//   }, [billingDeskUser, initialPatientId, initialAppointmentId]);

//   useEffect(() => {
//     const calculatedTotalAmount = billData.billItems.reduce((sum, item) => {
//       const itemQuantity = parseFloat(item.quantity);
//       const itemUnitPrice = parseFloat(item.unitPrice);
//       return sum + (isNaN(itemQuantity) || isNaN(itemUnitPrice) ? 0 : itemQuantity * itemUnitPrice);
//     }, 0);

//     const paid = parseFloat(billData.amountPaid);
//     const calculatedBalanceDue = calculatedTotalAmount - (isNaN(paid) ? 0 : paid);

//     setBillData(prev => ({
//       ...prev,
//       totalAmount: calculatedTotalAmount.toFixed(2),
//       balanceDue: calculatedBalanceDue.toFixed(2),
//     }));
//   }, [billData.billItems, billData.amountPaid]);

//   useEffect(() => {
//     const fetchAllBillItems = async () => {
//       try {
//         setLoadingAvailableItems(true);
//         setFetchItemsError(null);
//         const response = await fetch('http://localhost:2009/api/bill-items');
//         if (!response.ok) {
//           const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
//           throw new Error(`Failed to fetch bill items: ${response.status} ${response.statusText} - ${errorData.message}`);
//         }
//         const data = await response.json();
//         setAvailableBillItems(data);
//       } catch (error) {
//         console.error("Error fetching available bill items:", error);
//         setFetchItemsError(error.message);
//         setSnackbarMessage(`Error loading existing items: ${error.message}`);
//         setSnackbarSeverity('error');
//         setSnackbarOpen(true);
//       } finally {
//         setLoadingAvailableItems(false);
//       }
//     };
//     fetchAllBillItems();
//   }, []);

//   const handleBillChange = (e) => {
//     const { name, value } = e.target;
//     setBillData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleBillItemChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentBillItem(prev => ({ ...prev, [name]: value }));
//     if (name !== 'serviceDate' && name !== 'notes') {
//       setSelectedExistingItemId('');
//     }
//   };

//   const handleExistingItemSelect = (e) => {
//     const selectedId = e.target.value;
//     setSelectedExistingItemId(selectedId);
//     if (selectedId === '') {
//       setCurrentBillItem(initialBillItemState);
//       return;
//     }
//     const selectedItem = availableBillItems.find(item => item.id === selectedId);
//     if (selectedItem) {
//       setCurrentBillItem({
//         description: selectedItem.description || '',
//         quantity: selectedItem.quantity || 1,
//         unitPrice: selectedItem.unitPrice || '',
//         serviceDate: selectedItem.serviceDate ? new Date(selectedItem.serviceDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
//         notes: selectedItem.notes || '',
//       });
//     }
//   };

//   const handleAddBillItem = () => {
//     if (!currentBillItem.description || isNaN(parseFloat(currentBillItem.quantity)) || isNaN(parseFloat(currentBillItem.unitPrice)) || parseFloat(currentBillItem.quantity) <= 0 || parseFloat(currentBillItem.unitPrice) <= 0) {
//       setSnackbarMessage('Please fill in valid Description, Quantity, and Unit Price for the bill item.');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//       return;
//     }
//     setBillData(prev => ({
//       ...prev,
//       billItems: [...prev.billItems, { ...currentBillItem, tempId: Date.now() + Math.random() }],
//     }));
//     setCurrentBillItem(initialBillItemState);
//     setSelectedExistingItemId('');
//     setSnackbarMessage('Bill item added.');
//     setSnackbarSeverity('info');
//     setSnackbarOpen(true);
//   };

//   const handleRemoveBillItem = (tempIdToRemove) => {
//     setBillData(prev => ({
//       ...prev,
//       billItems: prev.billItems.filter(item => item.tempId !== tempIdToRemove),
//     }));
//     setSnackbarMessage('Bill item removed.');
//     setSnackbarSeverity('info');
//     setSnackbarOpen(true);
//   };

//   const handleClearForm = () => {
//     setBillData({
//       patientId: initialPatientId || '',
//       totalAmount: 0,
//       amountPaid: '',
//       balanceDue: '',
//       billDate: new Date().toISOString().slice(0, 10),
//       dueDate: '',
//       paymentMethod: '',
//       transactionId: '',
//       issuedByUserId: billingDeskUser?.userId || '',
//       billDocumentUrl: '',
//       id: '',
//       appointmentId: initialAppointmentId || '',
//       billItems: [],
//     });
//     setCurrentBillItem(initialBillItemState);
//     setSelectedExistingItemId('');
//     setUploadedFileName('');
//   };

//   const generateBillPdf = (billDetails, items) => {
//     if (items.length === 0) {
//       setSnackbarMessage('Please add at least one bill item before generating the PDF.');
//       setSnackbarSeverity('warning');
//       setSnackbarOpen(true);
//       return;
//     }
//     const doc = new jsPDF();
//     let yPos = 20;
//     const margin = 15;
//     const lineSpacing = 7;
//     const itemStartCol = 15;
//     const qtyCol = 80;
//     const unitPriceCol = 100;
//     const totalCol = 130;
//     const maxDescriptionWidth = 60;
//     doc.setFontSize(24);
//     doc.text("Healthcare Bill", 105, yPos, { align: "center" });
//     yPos += 15;
//     doc.setFontSize(10);
//     doc.setTextColor(100);
//     doc.text(`Generated by: ${billDetails.issuedByUserId || 'N/A'}`, margin, yPos);
//     doc.text(`Date: ${new Date().toLocaleDateString()}`, 195, yPos, { align: "right" });
//     yPos += lineSpacing;
//     doc.setTextColor(0);
//     doc.setFontSize(12);
//     doc.text("Bill Items:", margin, yPos);
//     yPos += lineSpacing;
//     doc.setFontSize(10);
//     doc.setFont(undefined, 'bold');
//     doc.text("Description", itemStartCol, yPos);
//     doc.text("Qty", qtyCol, yPos);
//     doc.text("Unit Price (₹)", unitPriceCol, yPos);
//     doc.text("Total (₹)", totalCol, yPos);
//     doc.setFont(undefined, 'normal');
//     yPos += lineSpacing - 2;
//     doc.line(margin, yPos, 200 - margin, yPos);
//     yPos += lineSpacing;
//     items.forEach(item => {
//       const itemTotal = (parseFloat(item.quantity) * parseFloat(item.unitPrice)).toFixed(2);
//       if (yPos > 280) {
//         doc.addPage();
//         yPos = margin;
//         doc.setFontSize(12);
//         doc.text("Bill Items (Continued):", margin, yPos);
//         yPos += lineSpacing;
//         doc.setFontSize(10);
//         doc.setFont(undefined, 'bold');
//         doc.text("Description", itemStartCol, yPos);
//         doc.text("Qty", qtyCol, yPos);
//         doc.text("Unit Price (₹)", unitPriceCol, yPos);
//         doc.text("Total (₹)", totalCol, yPos);
//         doc.setFont(undefined, 'normal');
//         yPos += lineSpacing - 2;
//         doc.line(margin, yPos, 200 - margin, yPos);
//         yPos += lineSpacing;
//       }
//       const descriptionLines = doc.splitTextToSize(item.description, maxDescriptionWidth);
//       doc.text(descriptionLines, itemStartCol, yPos);
//       doc.text(item.quantity.toString(), qtyCol, yPos);
//       doc.text(parseFloat(item.unitPrice).toFixed(2), unitPriceCol, yPos);
//       doc.text(itemTotal, totalCol, yPos);
//       yPos += (descriptionLines.length * lineSpacing) + 2;
//       doc.setFontSize(8);
//       doc.setTextColor(150);
//       doc.text(`Service Date: ${new Date(item.serviceDate).toLocaleDateString()}`, itemStartCol, yPos);
//       if (item.notes) {
//         const notesLines = doc.splitTextToSize(`Notes: ${item.notes}`, maxDescriptionWidth + 40);
//         doc.text(notesLines, itemStartCol, yPos + 4);
//         yPos += (notesLines.length * 4) + 4;
//       }
//       doc.setTextColor(0);
//       doc.setFontSize(10);
//       yPos += lineSpacing;
//     });
//     yPos += lineSpacing;
//     doc.line(margin, yPos, 200 - margin, yPos);
//     yPos += lineSpacing;
//     doc.setFontSize(12);
//     doc.setFont(undefined, 'bold');
//     doc.text(`Total Amount: ₹${billDetails.totalAmount}`, margin, yPos);
//     yPos += lineSpacing;
//     doc.text(`Amount Paid: ₹${parseFloat(billDetails.amountPaid || 0).toFixed(2)}`, margin, yPos);
//     yPos += lineSpacing;
//     doc.text(`Balance Due: ₹${parseFloat(billDetails.balanceDue || 0).toFixed(2)}`, margin, yPos);
//     doc.setFont(undefined, 'normal');
//     yPos += lineSpacing * 2;
//     if (billDetails.paymentMethod) {
//       doc.setFontSize(10);
//       doc.text(`Payment Method: ${billDetails.paymentMethod}`, margin, yPos);
//       yPos += lineSpacing;
//     }
//     if (billDetails.transactionId) {
//       doc.text(`Transaction ID: ${billDetails.transactionId}`, margin, yPos);
//       yPos += lineSpacing;
//     }
//     doc.setFontSize(8);
//     doc.setTextColor(120);
//     doc.text("This is an electronically generated bill and may not require a signature.", margin, 290, { align: 'left' });
//     doc.text("Thank you for your business!", 200 - margin, 290, { align: 'right' });
//     doc.save(`bill_${billDetails.patientId || 'unknown'}_${new Date().getTime()}.pdf`);
//     setSnackbarMessage('Bill PDF generated and downloaded! Please now upload it using the "Upload Bill Document" button.');
//     setSnackbarSeverity('success');
//     setSnackbarOpen(true);
//   };

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       if (file.type !== 'application/pdf') {
//         setSnackbarMessage('Please upload a PDF file.');
//         setSnackbarSeverity('error');
//         setSnackbarOpen(true);
//         return;
//       }
//       setUploadingPdf(true);
//       setSnackbarOpen(false);
//       const formData = new FormData();
//       formData.append('billDocument', file);
//       try {
//         const response = await fetch('http://localhost:2009/api/bills/upload-document', {
//           method: 'POST',
//           body: formData,
//         });
//         if (!response.ok) {
//           const errorData = await response.json().catch(() => ({ message: 'No endpoint or server error.' }));
//           throw new Error(errorData.message || `Failed to upload file: ${response.status} ${response.statusText}`);
//         }
//         const data = await response.json();
//         setBillData(prev => ({
//           ...prev,
//           billDocumentUrl: data.fileUrl,
//         }));
//         setUploadedFileName(file.name);
//         setSnackbarMessage('Bill document uploaded successfully!');
//         setSnackbarSeverity('success');
//         setSnackbarOpen(true);
//       } catch (error) {
//         console.error('Error uploading bill document:', error);
//         setSnackbarMessage(`Error uploading document: ${error.message}`);
//         setSnackbarSeverity('error');
//         setSnackbarOpen(true);
//       } finally {
//         setUploadingPdf(false);
//         event.target.value = '';
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setSnackbarOpen(false);

//     if (!billData.patientId || !billData.billDate || !billData.dueDate) {
//       setSnackbarMessage('Please fill in all required bill details: Patient ID, Bill Date, Due Date.');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//       setSubmitting(false);
//       return;
//     }

//     if (billData.billItems.length === 0) {
//       setSnackbarMessage('Please add at least one bill item.');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//       setSubmitting(false);
//       return;
//     }

//     // This is the corrected payload
//     const mainBillToCreate = {
//       patientId: billData.patientId,
//       billDate: billData.billDate,
//       totalAmount: parseFloat(billData.totalAmount),
//       amountPaid: parseFloat(billData.amountPaid || 0),
//       balanceDue: parseFloat(billData.balanceDue || 0),
//       paymentMethod: billData.paymentMethod || null,
//       transactionId: billData.transactionId || null,
//       issuedByUserId: billData.issuedByUserId,
//       billDocumentUrl: billData.billDocumentUrl || null,
//       dueDate: billData.dueDate,
//       appointmentId: billData.appointmentId || null,
//       // The billItems array in the main bill payload is empty
//       // as per your request to not update the bill items collection.
//       billItems: [],
//     };

//     try {
//       const billResponse = await fetch('http://localhost:2009/api/bills', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(mainBillToCreate),
//       });

//       if (!billResponse.ok) {
//         const errorData = await billResponse.json();
//         throw new Error(errorData.message || `Failed to create main bill: ${billResponse.status} ${billResponse.statusText}`);
//       }

//       const createdMainBill = await billResponse.json();

//       if (onBillGenerated) {
//         onBillGenerated(createdMainBill);
//       }

//       setSnackbarMessage('Bill generated successfully! Bill items were used for calculation but not saved as separate entities.');
//       setSnackbarSeverity('success');
//       setSnackbarOpen(true);

//     } catch (err) {
//       console.error('Overall error generating bill:', err);
//       setSnackbarMessage(`Error generating bill: ${err.message}`);
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setSnackbarOpen(false);
//   };

//   return (
//     <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 900, mx: 'auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
//       <>
//         <Typography variant="h4" gutterBottom align="center" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.dark', textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>
//           <PaidIcon sx={{ fontSize: 'inherit', verticalAlign: 'middle', mr: 1 }} /> Generate New Bill
//         </Typography>
//         <Paper elevation={8} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, background: 'linear-gradient(145deg, #ffffff, #f0f2f5)', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', border: '1px solid #e0e0e0' }}>
//           <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
//             <Box>
//               <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>1. Add Bill Items</Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <FormControl fullWidth variant="outlined" size="small" disabled={loadingAvailableItems}>
//                     <InputLabel id="select-existing-item-label">Select Existing Item</InputLabel>
//                     <Select
//                       labelId="select-existing-item-label"
//                       id="select-existing-item"
//                       value={selectedExistingItemId}
//                       onChange={handleExistingItemSelect}
//                       label="Select Existing Item"
//                     >
//                       <MenuItem value="">
//                         <em>{loadingAvailableItems ? 'Loading items...' : 'Select or Add New Item'}</em>
//                       </MenuItem>
//                       {fetchItemsError && (
//                         <MenuItem disabled>Error loading items: {fetchItemsError}</MenuItem>
//                       )}
//                       {availableBillItems.map((item) => (
//                         <MenuItem key={item.id} value={item.id}>
//                           {item.description} (₹{parseFloat(item.unitPrice).toFixed(2)})
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Item Description"
//                     name="description"
//                     value={currentBillItem.description}
//                     onChange={handleBillItemChange}
//                     fullWidth
//                     variant="outlined"
//                     size="small"
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={6} sm={3}>
//                   <TextField
//                     label="Quantity"
//                     name="quantity"
//                     type="number"
//                     value={currentBillItem.quantity}
//                     onChange={handleBillItemChange}
//                     fullWidth
//                     inputProps={{ min: 1 }}
//                     variant="outlined"
//                     size="small"
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={6} sm={3}>
//                   <TextField
//                     label="Unit Price (₹)"
//                     name="unitPrice"
//                     type="number"
//                     value={currentBillItem.unitPrice}
//                     onChange={handleBillItemChange}
//                     fullWidth
//                     inputProps={{ step: "0.01", min: 0 }}
//                     variant="outlined"
//                     size="small"
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Service Date"
//                     name="serviceDate"
//                     type="date"
//                     value={currentBillItem.serviceDate}
//                     onChange={handleBillItemChange}
//                     fullWidth
//                     InputLabelProps={{ shrink: true }}
//                     variant="outlined"
//                     size="small"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Notes (Item Specific)"
//                     name="notes"
//                     value={currentBillItem.notes}
//                     onChange={handleBillItemChange}
//                     fullWidth
//                     variant="outlined"
//                     size="small"
//                     multiline
//                     rows={1}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Button
//                     variant="contained"
//                     color="secondary"
//                     startIcon={<AddIcon />}
//                     onClick={handleAddBillItem}
//                     fullWidth
//                     sx={{ py: 1.5, mt: 1 }}
//                   >
//                     Add Item to Bill
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Box>
//             {billData.billItems.length > 0 && (
//               <Paper elevation={4} sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2, border: '1px solid #e0e0e0', mt: 2, overflow: 'hidden' }}>
//                 <Typography variant="h6" sx={{ p: 2, bgcolor: 'primary.light', color: 'primary.contrastText', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <ListIcon /> Items on this Bill ({billData.billItems.length})
//                 </Typography>
//                 <List disablePadding>
//                   {billData.billItems.map((item, index) => (
//                     <React.Fragment key={item.tempId}>
//                       <ListItem sx={{ py: 1.5, px: 2 }}>
//                         <ListItemText
//                           primary={<Typography variant="body1" sx={{ fontWeight: 'bold' }}>{item.description}</Typography>}
//                           secondary={
//                             <Box component="span">
//                               <Typography variant="body2" color="text.secondary" component="span" display="block">
//                                 Quantity: {item.quantity} | Unit Price: ₹{parseFloat(item.unitPrice).toFixed(2)}
//                               </Typography>
//                               <Typography variant="body2" color="text.secondary" component="span" display="block">
//                                 **Total: ₹{(parseFloat(item.quantity) * parseFloat(item.unitPrice)).toFixed(2)}**
//                               </Typography>
//                               <Typography variant="body2" color="text.secondary" component="span" display="block">
//                                 Service Date: {new Date(item.serviceDate).toLocaleDateString()}
//                               </Typography>
//                               {item.notes && (
//                                 <Typography variant="body2" color="text.secondary" component="span" display="block">
//                                   Notes: {item.notes}
//                                 </Typography>
//                               )}
//                             </Box>
//                           }
//                         />
//                         <ListItemSecondaryAction>
//                           <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveBillItem(item.tempId)}>
//                             <DeleteIcon color="error" />
//                           </IconButton>
//                         </ListItemSecondaryAction>
//                       </ListItem>
//                       {index < billData.billItems.length - 1 && <Divider component="li" />}
//                     </React.Fragment>
//                   ))}
//                 </List>
//               </Paper>
//             )}
//             <Divider sx={{ my: 2 }}>
//               <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 'bold' }}>Bill Generation & Details</Typography>
//             </Divider>
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//               <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>2. Generate PDF</Typography>
//               <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                 After adding all bill items, click below to generate and download the PDF.
//               </Typography>
//               <Button
//                 variant="outlined"
//                 color="primary"
//                 startIcon={<DownloadIcon />}
//                 onClick={() => generateBillPdf(billData, billData.billItems)}
//                 disabled={billData.billItems.length === 0 || submitting || uploadingPdf}
//                 sx={{ px: 4, py: 1.5, fontSize: '1rem' }}
//               >
//                 Generate & Download Bill PDF
//               </Button>
//             </Box>
//             <Box sx={{ mt: 3 }}>
//               <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>3. Final Bill Details & Submission</Typography>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Patient ID"
//                     name="patientId"
//                     value={billData.patientId}
//                     onChange={handleBillChange}
//                     fullWidth
//                     required
//                     variant="outlined"
//                     size="small"
//                     InputProps={{ readOnly: !!initialPatientId }}
//                     helperText="Required"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Appointment ID (Optional)"
//                     name="appointmentId"
//                     value={billData.appointmentId}
//                     onChange={handleBillChange}
//                     fullWidth
//                     variant="outlined"
//                     size="small"
//                     InputProps={{ readOnly: !!initialAppointmentId }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Amount Paid (₹)"
//                     name="amountPaid"
//                     type="number"
//                     value={billData.amountPaid}
//                     onChange={handleBillChange}
//                     fullWidth
//                     inputProps={{ step: "0.01" }}
//                     variant="outlined"
//                     size="small"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Total Amount (₹)"
//                     name="totalAmount"
//                     value={billData.totalAmount}
//                     fullWidth
//                     variant="outlined"
//                     InputProps={{ readOnly: true, startAdornment: <PaidIcon sx={{ color: 'success.main' }} /> }}
//                     sx={{ bgcolor: '#e8f5e9' }}
//                     size="small"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Balance Due (₹)"
//                     name="balanceDue"
//                     value={billData.balanceDue}
//                     fullWidth
//                     variant="outlined"
//                     InputProps={{ readOnly: true, startAdornment: <PaidIcon sx={{ color: 'error.main' }} /> }}
//                     sx={{ bgcolor: '#ffebee' }}
//                     size="small"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Bill Date"
//                     name="billDate"
//                     type="date"
//                     value={billData.billDate}
//                     onChange={handleBillChange}
//                     fullWidth
//                     required
//                     InputLabelProps={{ shrink: true }}
//                     variant="outlined"
//                     size="small"
//                     helperText="Required"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Due Date"
//                     name="dueDate"
//                     type="date"
//                     value={billData.dueDate}
//                     onChange={handleBillChange}
//                     fullWidth
//                     required
//                     InputLabelProps={{ shrink: true }}
//                     variant="outlined"
//                     size="small"
//                     helperText="Required"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth variant="outlined" size="small">
//                     <InputLabel>Payment Method</InputLabel>
//                     <Select
//                       label="Payment Method"
//                       name="paymentMethod"
//                       value={billData.paymentMethod}
//                       onChange={handleBillChange}
//                     >
//                       <MenuItem value=""><em>None</em></MenuItem>
//                       <MenuItem value="Credit Card">Credit Card</MenuItem>
//                       <MenuItem value="Debit Card">Debit Card</MenuItem>
//                       <MenuItem value="Cash">Cash</MenuItem>
//                       <MenuItem value="Net Banking">Net Banking</MenuItem>
//                       <MenuItem value="UPI">UPI</MenuItem>
//                       <MenuItem value="Cheque">Cheque</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Transaction ID (Optional)"
//                     name="transactionId"
//                     value={billData.transactionId}
//                     onChange={handleBillChange}
//                     fullWidth
//                     variant="outlined"
//                     size="small"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Issued By User ID"
//                     name="issuedByUserId"
//                     value={billData.issuedByUserId}
//                     fullWidth
//                     variant="outlined"
//                     InputProps={{ readOnly: true }}
//                     size="small"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
//                     Upload Bill Document (PDF)
//                   </Typography>
//                   <Button
//                     variant="outlined"
//                     component="label"
//                     startIcon={uploadingPdf ? <CircularProgress size={20} color="inherit" /> : <UploadFileIcon />}
//                     disabled={uploadingPdf || submitting}
//                     sx={{ py: 1.2, width: '100%' }}
//                   >
//                     {uploadingPdf ? 'Uploading...' : 'Choose File'}
//                     <input
//                       type="file"
//                       hidden
//                       accept=".pdf"
//                       onChange={handleFileChange}
//                       ref={fileInputRef}
//                     />
//                   </Button>
//                   {uploadedFileName && (
//                     <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
//                       Selected: {uploadedFileName}
//                     </Typography>
//                   )}
//                   {billData.billDocumentUrl && (
//                     <Typography variant="caption" color="text.primary" sx={{ mt: 0.5, display: 'block' }}>
//                       URL: <a href={billData.billDocumentUrl} target="_blank" rel="noopener noreferrer">{billData.billDocumentUrl.substring(0, 40)}...</a>
//                     </Typography>
//                   )}
//                   {!billData.billDocumentUrl && !uploadedFileName && (
//                     <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
//                       (No file uploaded)
//                     </Typography>
//                   )}
//                   <TextField
//                     label="Bill Document URL"
//                     name="billDocumentUrl"
//                     type="url"
//                     value={billData.billDocumentUrl}
//                     onChange={handleBillChange}
//                     fullWidth
//                     variant="outlined"
//                     size="small"
//                     sx={{ mt: 1 }}
//                     helperText="URL automatically populated after upload, or paste manually."
//                     InputProps={{
//                       readOnly: uploadingPdf,
//                       endAdornment: billData.billDocumentUrl && (
//                         <IconButton
//                           onClick={() => setBillData(prev => ({ ...prev, billDocumentUrl: '' }))}
//                           size="small"
//                           disabled={uploadingPdf}
//                         >
//                           <ClearIcon fontSize="small" />
//                         </IconButton>
//                       )
//                     }}
//                   />
//                 </Grid>
//               </Grid>
//             </Box>
//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3, pt: 2, borderTop: '1px solid #e0e0e0' }}>
//               {onCancel && (
//                 <Button variant="outlined" color="error" startIcon={<ClearIcon />} onClick={onCancel} disabled={submitting || uploadingPdf} sx={{ px: 3, py: 1.2 }}>
//                   Cancel
//                 </Button>
//               )}
//               <Button variant="outlined" color="secondary" startIcon={<ClearIcon />} onClick={handleClearForm} disabled={submitting || uploadingPdf} sx={{ px: 3, py: 1.2 }}>
//                 Clear Form
//               </Button>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
//                 type="submit"
//                 disabled={submitting || uploadingPdf}
//                 sx={{ px: 3, py: 1.2 }}
//               >
//                 {submitting ? 'Submitting Bill...' : 'Submit Bill'}
//               </Button>
//             </Box>
//           </Box>
//         </Paper>
//         <Box sx={{ mt: 2, opacity: 0.6, textAlign: 'center' }}>
//           <Typography variant="body2" color="text.secondary">
//             <InfoIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
//             Follow the steps: 1. Add bill items. 2. Generate and download the PDF. 3. Upload the generated PDF and fill in remaining bill details, then submit.
//           </Typography>
//         </Box>
//       </>
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//       >
//         <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// BillingDeskGenerateBill.propTypes = {
//   billingDeskUser: PropTypes.shape({
//     userId: PropTypes.string,
//     name: PropTypes.string,
//     email: PropTypes.string,
//     profilePic: PropTypes.string,
//   }),
//   initialPatientId: PropTypes.string,
//   initialAppointmentId: PropTypes.string,
//   onBillGenerated: PropTypes.func,
//   onCancel: PropTypes.func,
// };

// export default BillingDeskGenerateBill;

import React, { useState, useEffect, useCallback, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './BillingDeskGenerateBill.css';

// Helper function to format numbers as Indian Rupees
const formatToINR = (number) => {
  if (number === null || number === undefined || isNaN(number)) {
    return '₹0.00';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(number);
};

// Helper function to generate a unique transaction ID
const generateTransactionId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `TRANS-${result}`;
};

const BillingDeskGenerateBill = ({ appointment }) => {
  const [patientDetails, setPatientDetails] = useState(null);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [billItemsData, setBillItemsData] = useState([]);
  const [billItemsLoading, setBillItemsLoading] = useState(true);
  const [billItemsError, setBillItemsError] = useState(null);
  
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);

  // New state variables for the form
  const [amountPaid, setAmountPaid] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [billDocumentFile, setBillDocumentFile] = useState(null);

  const pdfContentRef = useRef(null); 

  const consultationFee = doctorDetails?.consultationFee || 0;
  const serviceCharges = selectedItems.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);
  const subTotal = serviceCharges;
  const gstRate = 0.18; 
  const gstAmount = subTotal * gstRate;
  const totalAmount = subTotal + gstAmount;
  const balanceDue = totalAmount - amountPaid;

  const today = new Date().toISOString().split('T')[0];
  const currentTime = new Date().toISOString();

  useEffect(() => {
    // Generate a new transaction ID when the component mounts
    setTransactionId(generateTransactionId());
  }, []);

  useEffect(() => {
    if (appointment) {
      console.log('Received appointment object:', appointment);
    }
  }, [appointment]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [patientResponse, doctorResponse, billItemsResponse] = await Promise.all([
          fetch(`http://localhost:2008/api/patients/${appointment.patientId}`),
          fetch(`http://localhost:2005/api/doctors/${appointment.doctorId}`),
          fetch('http://localhost:2009/api/bill-items')
        ]);

        if (!patientResponse.ok) throw new Error(`Patient data fetch failed with status: ${patientResponse.status}`);
        if (!doctorResponse.ok) throw new Error(`Doctor data fetch failed with status: ${doctorResponse.status}`);
        if (!billItemsResponse.ok) throw new Error(`Bill items data fetch failed with status: ${billItemsResponse.status}`);

        const patientData = await patientResponse.json();
        const doctorData = await doctorResponse.json();
        const billItemsData = await billItemsResponse.json();

        setPatientDetails(patientData);
        setDoctorDetails(doctorData);
        setBillItemsData(billItemsData);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        setBillItemsLoading(false);
      }
    };

    if (appointment?.patientId && appointment?.doctorId) {
      fetchData();
    } else {
      setError("Patient or Doctor ID is missing.");
      setLoading(false);
      setBillItemsLoading(false);
    }
  }, [appointment]);

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      const filteredSuggestions = billItemsData.filter(item =>
        item.description.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [billItemsData]);

  const handleSelectSuggestion = useCallback((item) => {
    setSelectedItems(prevItems => {
      if (prevItems.find(selected => selected.id === item.id)) {
        return prevItems;
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
    setSearchTerm('');
    setSuggestions([]);
  }, []);

  const handleQuantityChange = useCallback((id, newQuantity) => {
    setSelectedItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  }, []);

  const handleRemoveItem = useCallback((id) => {
    setSelectedItems(prevItems => prevItems.filter(item => item.id !== id));
  }, []);

  const calculateTotal = useCallback(() => {
    return selectedItems.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);
  }, [selectedItems]);

  const handleGeneratePdf = async () => {
    if (!pdfContentRef.current) return;

    pdfContentRef.current.style.display = 'block';

    const originalWidth = pdfContentRef.current.style.width;
    const originalHeight = pdfContentRef.current.style.height;
    pdfContentRef.current.style.width = '210mm';
    pdfContentRef.current.style.height = 'auto';

    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const canvas = await html2canvas(pdfContentRef.current, {
        scale: 2, 
        useCORS: true 
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      const pdfBlob = pdf.output('blob');
      const url = URL.createObjectURL(pdfBlob);
      setPdfPreviewUrl(url); 
      // Set the bill document file name as a placeholder
      setBillDocumentFile({ name: `bill_${appointment?.id}.pdf` });
      setShowPdfModal(true);
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      setPdfPreviewUrl(null);
    } finally {
      pdfContentRef.current.style.display = 'none';
      pdfContentRef.current.style.width = originalWidth;
      pdfContentRef.current.style.height = originalHeight;
    }
  };

  const handleDownloadPdf = () => {
    if (pdfPreviewUrl) {
      const link = document.createElement('a');
      link.href = pdfPreviewUrl;
      link.download = `bill_${patientDetails?.first_name}_${appointment?.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const closePdfModal = () => {
    setShowPdfModal(false);
    setPdfPreviewUrl(null);
  };
  
  const handleFileChange = (e) => {
    setBillDocumentFile(e.target.files[0]);
  };
  
  const handleUploadBill = async () => {
    // Step 1: Validate required fields
    if (!appointment || !appointment.id || !patientDetails || !doctorDetails) {
      alert("Error: Appointment, patient, or doctor details are missing.");
      return;
    }
    if (!billDocumentFile) {
        alert("Please select a bill document file to upload.");
        return;
    }
    
    try {
      // Step 2: Upload the bill document first
      const formData = new FormData();
      formData.append("billDocument", billDocumentFile);
      
      const uploadResponse = await fetch('http://localhost:2009/api/bills/upload-document', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error(`File upload failed with status ${uploadResponse.status}`);
      }

      const uploadResult = await uploadResponse.json();
      const fileUrl = uploadResult.fileUrl;
      
      // Step 3: Construct the bill object for the main database entry
      const billToCreate = {
        patientId: appointment.patientId.toString(),
        appointmentId: appointment.id.toString(),
        billDate: today,
        totalAmount: totalAmount,
        amountPaid: parseFloat(amountPaid),
        balanceDue: parseFloat(balanceDue),
        paymentMethod: paymentMethod,
        transactionId: transactionId,
        issuedByUserId: "4", 
        billDocumentUrl: fileUrl,
        // CORRECTED: Use 'bill_items' to match the Java entity's @Field annotation
        bill_items: selectedItems.map(item => item.id),
        createdAt: currentTime,
        updatedAt: currentTime
      };

      // Step 4: Post the bill data to the /api/bills endpoint
      const billResponse = await fetch('http://localhost:2009/api/bills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(billToCreate),
      });

      if (!billResponse.ok) {
        throw new Error(`Bill creation failed with status ${billResponse.status}`);
      }

      const createdBill = await billResponse.json();
      alert(`Bill created successfully! Bill ID: ${createdBill.id}`);
      
      // Reset form states
      setAmountPaid(0);
      setPaymentMethod('');
      setBillDocumentFile(null);
      setTransactionId(generateTransactionId());
      setSelectedItems([]);
      
    } catch (err) {
      alert("Error uploading bill: " + err.message);
      console.error("Error uploading bill:", err);
    }
  };

  if (loading || billItemsLoading) return <p>Loading details...</p>;
  if (error || billItemsError) return <p>Error: {error || billItemsError}</p>;

  return (
    <div className="billing-container">
      {showPdfModal && (
        <div className="pdf-modal-overlay">
          <div className="pdf-modal-content">
            <div className="pdf-modal-header">
              <h3>PDF Preview</h3>
              <button className="pdf-modal-close" onClick={closePdfModal}>&times;</button>
            </div>
            <div className="pdf-modal-body">
              {pdfPreviewUrl ? (
                <iframe src={pdfPreviewUrl} title="PDF Preview" style={{ width: '100%', height: '100%', border: 'none' }}></iframe>
              ) : (
                <p>Preview not available.</p>
              )}
            </div>
            <div className="pdf-modal-footer">
              <button className="download-pdf-btn" onClick={handleDownloadPdf}>
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      <h2>Bill Generation</h2>
      
      <div className="details-card">
        <h3>Patient Details</h3>
        {patientDetails ? (
          <div>
            <p><strong>Name:</strong> {patientDetails.first_name} {patientDetails.last_name}</p>
            <p><strong>Date of Birth:</strong> {new Date(patientDetails.date_of_birth).toLocaleDateString()}</p>
            <p><strong>Contact:</strong> {patientDetails.contact_number}</p>
          </div>
        ) : <p>Patient details not found.</p>}
      </div>

      <div className="details-card">
        <h3>Doctor Details</h3>
        {doctorDetails ? (
          <div>
            <p><strong>Name:</strong> {doctorDetails.firstName} {doctorDetails.lastName}</p>
            <p><strong>Specialization:</strong> {doctorDetails.specialization}</p>
          </div>
        ) : <p>Doctor details not found.</p>}
      </div>

      <hr className="divider" />
      
      <div className="search-form">
        <label htmlFor="bill-item-search">Search Bill Item:</label>
        <input
          id="bill-item-search"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="e.g., Cardiology, X-Ray"
          autoComplete="off"
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map(item => (
              <li key={item.id} onClick={() => handleSelectSuggestion(item)}>
                {item.description} ({formatToINR(item.unitPrice)})
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bill-items-list">
        <h2>Selected Bill Items</h2>
        {selectedItems.length === 0 ? (
          <p>Start by searching and adding items.</p>
        ) : (
          <table className="bill-items-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map(item => (
                <tr key={item.id}>
                  <td>{item.description}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                    />
                  </td>
                  <td>{formatToINR(item.unitPrice)}</td>
                  <td>{formatToINR(item.quantity * item.unitPrice)}</td>
                  <td>
                    <button onClick={() => handleRemoveItem(item.id)} className="remove-btn">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3"></td>
                <td><strong>Total: {formatToINR(calculateTotal())}</strong></td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button className="generate-pdf-btn" onClick={handleGeneratePdf}>
          Generate PDF
        </button>
      </div>

      {/* New Bill Details Form */}
      <div className="bill-details-form" style={{ marginTop: '40px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>New Bill Details Form</h2>
        <form style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="amount_paid">amount_paid</label>
            <input
              type="number"
              id="amount_paid"
              value={amountPaid}
              onChange={(e) => setAmountPaid(e.target.value)}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="balance_due">balance_due</label>
            <input type="number" id="balance_due" value={balanceDue.toFixed(2)} readOnly style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f0f0f0' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="payment_method">payment_method</label>
            <select
              id="payment_method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="">Select Method</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Cash">Cash</option>
              <option value="Online Transfer">Online Transfer</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="bill_document_url">bill_document_url</label>
            <input
              type="file"
              id="bill_document_url"
              onChange={handleFileChange}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="bill_document_filename">Selected File</label>
            <input
              type="text"
              id="bill_document_filename"
              value={billDocumentFile ? billDocumentFile.name : ''}
              readOnly
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f0f0f0' }}
            />
          </div>
        </form>
        <button onClick={handleUploadBill} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Upload Bill
        </button>
      </div>

      {/* The hidden content to be converted to PDF */}
      <div ref={pdfContentRef} style={{ width: '210mm', minHeight: '297mm', padding: '10mm', fontSize: '10pt', fontFamily: 'Arial, sans-serif', display: 'none', color: '#333' }}>
        <div style={{ padding: '10mm', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
          <div className="pdf-header" style={{ textAlign: 'center', marginBottom: '20px', paddingBottom: '10px', borderBottom: '2px solid #0056b3' }}>
            <h1 style={{ fontSize: '18pt', margin: 0, color: '#0056b3' }}>Sarvotham Spine Care Hospital</h1>
            <p style={{ margin: '5px 0', color: '#555' }}>123 Health St, Wellness City, 560001</p>
            <p style={{ margin: '5px 0', color: '#555' }}>Phone: (080) 1234 5678 | Email: contact@sarvothamhospital.com</p>
          </div>

          <div className="pdf-bill-info" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', backgroundColor: '#f0f8ff', padding: '10px', borderRadius: '4px' }}>
            <p style={{ margin: 0, fontWeight: 'bold' }}>INVOICE/ MEDICAL BILL</p>
            <p style={{ margin: 0 }}><strong>Bill Date:</strong> {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          
          <div className="pdf-patient-info" style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
            <p style={{ margin: '0 0 5px 0' }}><strong>Patient:</strong> {patientDetails?.first_name} {patientDetails?.last_name}</p>
            <p style={{ margin: 0 }}><strong>Doctor:</strong> {doctorDetails?.firstName} {doctorDetails?.lastName}</p>
          </div>

          <table className="pdf-charges-table" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#e9f5ff' }}>
                <th style={{ padding: '12px', border: '1px solid #ccc', textAlign: 'left', color: '#0056b3' }}>Description</th>
                <th style={{ padding: '12px', border: '1px solid #ccc', textAlign: 'right', color: '#0056b3' }}>Amount ({formatToINR(0).slice(0, 1)})</th>
              </tr>
            </thead>
            <tbody>
              {/* Removed Consultation Fee row */}
              {selectedItems.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px', border: '1px solid #ccc' }}>{item.description} ({item.quantity} x {item.unitPrice})</td>
                  <td style={{ padding: '12px', border: '1px solid #ccc', textAlign: 'right' }}>{(item.quantity * item.unitPrice).toFixed(2)}</td>
                </tr>
              ))}
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px', border: '1px solid #ccc', fontWeight: 'bold', backgroundColor: '#f9f9f9' }}>GST (18%)</td>
                <td style={{ padding: '12px', border: '1px solid #ccc', textAlign: 'right', backgroundColor: '#f9f9f9' }}>{gstAmount.toFixed(2)}</td>
              </tr>
              <tr style={{ fontWeight: 'bold', backgroundColor: '#d9eaff', color: '#0056b3' }}>
                <td style={{ padding: '12px', border: '1px solid #ccc' }}>Total Amount</td>
                <td style={{ padding: '12px', border: '1px solid #ccc', textAlign: 'right' }}>{formatToINR(totalAmount).slice(1)}</td>
              </tr>
            </tbody>
          </table>
          
          <div className="pdf-payment-summary" style={{ textAlign: 'right', marginBottom: '20px', paddingRight: '12px' }}>
            <p style={{ margin: '5px 0' }}><strong>Amount Paid:</strong> {formatToINR(totalAmount)}</p>
            <p style={{ margin: '5px 0' }}><strong>Balance Due:</strong> {formatToINR(0)}</p>
          </div>

          <div className="pdf-footer" style={{ marginTop: '30px', textAlign: 'center', paddingTop: '15px', borderTop: '1px solid #ccc' }}>
            <p style={{ margin: 0, color: '#777' }}>Thank you for choosing Sarvotham Spine Care Hospital. We wish you a speedy recovery.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingDeskGenerateBill;