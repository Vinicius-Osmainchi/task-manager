import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const ThemeToggle = ({ children }) => {
  const { theme } = useContext(AppContext);

  const darkTheme = createTheme({
    palette: {
      mode: theme,
      background: {
        default: theme === 'light' ? '#9e9e9e' : '#2F4F4F',
        paper: theme === 'light' ? '#bdbdbd' : '#1C1C1C',
      },
      primary: {
        main: theme === 'light' ? '#001e3c' : '#42a5f5'
      }
    },
  });

  document.documentElement.style.setProperty('--bar-bgcolor', theme === 'light' ? '#bdbdbd' : '#1C1C1C');
  document.documentElement.style.setProperty('--bar-color', theme === 'light' ? '#001e3c' : '#42a5f5');

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeToggle;
