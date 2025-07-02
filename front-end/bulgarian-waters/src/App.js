import React from 'react';
import WaterMap from './components/water-map.js';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './services/apollo-client.js';

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#f0f4f8',
    minHeight: '100vh',
  },
  mapContainer: {
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    border: '2px solid #ccc',
  }
};

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <div style={styles.pageContainer}>
        <div style={styles.mapContainer}>
          <WaterMap />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
