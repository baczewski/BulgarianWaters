import React from 'react';
import WaterMap from './components/water-map';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './services/apollo-client';
import { CssBaseline, Box, Container, Paper } from '@mui/material';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <CssBaseline />
      <Box sx={{ backgroundColor: '#f0f4f8', minHeight: '100vh', py: 4 }}>
        <WaterMap />
      </Box>
    </ApolloProvider>
  );
}

export default App;
