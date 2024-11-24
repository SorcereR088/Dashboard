import React from 'react';
import { Box, useTheme, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useGetUsersQuery } from '../../state/api';
import Header from '../../components/Header';

const Users = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetUsersQuery();

  // Define the columns for the DataGrid
  const columns = [
    {
      field: 'user_id',
      headerName: 'ID',
      flex: 0.4,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'user_name',
      headerName: 'Name',
      flex: 1,
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'user_email',
      headerName: 'Email',
      flex: 1.5,
      headerAlign: 'left',
      align: 'left',
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      {/* Page Header */}
      <Header title="Users" subtitle="List of users/clients" />

      {/* DataGrid Container */}
      <Box
        mt="40px"
        height="75vh"
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: '8px',
          boxShadow: theme.shadows[3],
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: `1px solid ${theme.palette.divider}`,
            color: theme.palette.text.primary,
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
            fontWeight: 'bold',
            fontSize: '1rem',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: theme.palette.background.default,
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: theme.palette.background.paper,
            borderTop: `1px solid ${theme.palette.divider}`,
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
        {/* Conditional rendering for loading or DataGrid */}
        {isLoading ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <Typography variant="h6" color={theme.palette.text.secondary}>
              Loading users...
            </Typography>
          </Box>
        ) : (
          <DataGrid
            rows={data || []} // Use an empty array if no data is available
            columns={columns}
            getRowId={(row) => row.user_id}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableSelectionOnClick
          />
        )}
      </Box>
    </Box>
  );
};

export default Users;
