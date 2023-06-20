import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import React, { useState } from 'react';

const ThemeToggle = ({ children, theme }) => {
  

  const darkTheme = createTheme({
    palette: {
      mode: theme,
      background: {
        default: theme === 'light' ? '#FAEBD7' : '#2F4F4F',
        paper: theme === 'light' ? '#FFDAB9' : '#1C1C1C',
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeToggle;
