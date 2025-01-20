import React from 'react';
import AppRoutes from './routes';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// Create the theme with your custom primary color and typography settings
const theme = createTheme({
  palette: {
    primary: {
      main: "#2066b0", // Your custom primary color
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Custom font family for all text
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Apply to buttons as well
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Apply to typography components
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>  {/* Apply the theme here */}
      <CssBaseline /> {/* Ensure consistent baseline styling */}
      <AppRoutes /> {/* Your app's routes */}
    </ThemeProvider>
  );
}

export default App;
