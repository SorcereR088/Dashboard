import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  useMediaQuery,
  useTheme,
  CircularProgress,
  CardMedia,
  Button,
  Stack,
} from '@mui/material';
import { useGetPropertyQuery } from '../../state/api';
import Header from '../../components/Header';

const Property = () => {
  const { data, isLoading } = useGetPropertyQuery();
  const theme = useTheme();
  const isNonMobile = useMediaQuery('(min-width: 1000px)');

  const getImagePath = (imageName) =>
    `/src/assets/images/Properties/${imageName}`; // Adjust based on your setup

  const handleAction = (action, propertyId) => {
    console.log(`${action} for property ${propertyId}`);
    // Handle accept, reject, or report actions (e.g., API calls)
  };

  return (
    <Box m="1rem">
      {/* Header */}
      <Header title="Properties" subtitle="View all available properties" />

      {/* Loading State */}
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="60vh"
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <Grid
          container
          spacing={3}
          justifyContent={isNonMobile ? 'flex-start' : 'center'}
        >
          {data?.map((property) => (
            <Grid item key={property.property_id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: '15px',
                  boxShadow: 8,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)', // Hover effect
                    boxShadow: 12,
                  },
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                {/* Display the first image */}
                {property.images?.length > 0 && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={getImagePath(property.images[0])} // Use getImagePath function
                    alt={property.property_name}
                    sx={{
                      borderTopLeftRadius: '15px',
                      borderTopRightRadius: '15px',
                    }}
                    onError={(e) => {
                      // Fallback for missing images
                      e.target.src = '/src/assets/images/placeholder.jpg';
                    }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1, padding: '1.5rem' }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {property.property_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" my="0.5rem">
                    {property.description}
                  </Typography>
                  {/* Removed color="primary" from price for previous style */}
                  <Typography variant="body1" fontWeight="bold">
                    Price: ${parseFloat(property.price).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Hosted by: <strong>{property.host_name}</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Host Email: {property.host_email}
                  </Typography>
                </CardContent>

                {/* Action Buttons */}
                <Stack direction="row" spacing={1} p={2}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleAction('Accept', property.property_id)}
                    fullWidth
                    sx={{
                      borderRadius: '20px',
                      '&:hover': {
                        backgroundColor: theme.palette.success.dark,
                      },
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleAction('Reject', property.property_id)}
                    fullWidth
                    sx={{
                      borderRadius: '20px',
                      '&:hover': {
                        backgroundColor: theme.palette.error.dark,
                      },
                    }}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => handleAction('Report', property.property_id)}
                    fullWidth
                    sx={{
                      borderRadius: '20px',
                      '&:hover': {
                        backgroundColor: theme.palette.warning.light,
                      },
                    }}
                  >
                    Report
                  </Button>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Property;
