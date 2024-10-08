import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Assuming App is a .jsx file
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppContextProvider } from './contexts/ContextAPI.jsx'; // Assuming this is a .jsx file

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

// Render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
