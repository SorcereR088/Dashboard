import React from 'react';
import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useGetTransactionsQuery } from '../../state/api';
import Header from '../../components/Header';

const Transactions = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetTransactionsQuery();

  // Columns for the DataGrid, with value formatting
  const columns = [
    { field: 'transaction_id', headerName: 'Transaction ID', width: 150, editable: false },
    { field: 'user_name', headerName: 'User Name', width: 200 },
    { field: 'property_name', headerName: 'Property Name', width: 200 },
    { 
      field: 'amount', 
      headerName: 'Amount ($)', 
      width: 180, 
      valueFormatter: (params) => {
        // Convert the amount to number before formatting
        const amount = parseFloat(params.value);
        return !isNaN(amount) 
          ? amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
          : 'N/A'; // Show 'N/A' for invalid values
      }
    },
    { 
      field: 'transaction_date', 
      headerName: 'Transaction Date', 
      width: 220,
      valueFormatter: (params) => {
        // Parse the date string to a valid Date object and format it
        const date = new Date(params.value);
        return !isNaN(date.getTime()) 
          ? date.toLocaleString() 
          : 'N/A'; // Show 'N/A' for invalid or empty date values
      }
    }
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Transactions" subtitle="List of all transactions" />
      <div style={{ height: 600, width: '100%' }}>k
        <DataGrid
          rows={data || []} // Ensure the data is passed correctly, empty array if no data
          columns={columns}
          pageSize={5} // Set the page size to limit the number of rows per page
          loading={isLoading} // Display a loading state while data is being fetched
          disableSelectionOnClick // Disable selection when clicking on a row
          getRowId={(row) => row.transaction_id} // Specify how to get the unique id from each row
        />
      </div>
    </Box>
  );
};

export default Transactions;
