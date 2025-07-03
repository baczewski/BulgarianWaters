import React from 'react';
import WaterMap from './components/water-map';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './services/apollo-client';
import { CssBaseline, Box, Typography, Container } from '@mui/material';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <CssBaseline />
      <Box sx={{ backgroundColor: '#f0f4f8', minHeight: '100vh', pt: 1.5 }}>
        <Container maxWidth="xl">
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{
              fontWeight: 'bold',
              color: '#2c3e50',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
            }}
          >
            Bulgarian Water Resources Explorer
          </Typography>
          <WaterMap />
        </Container>
      </Box>
    </ApolloProvider>
  );
}

export default App;
