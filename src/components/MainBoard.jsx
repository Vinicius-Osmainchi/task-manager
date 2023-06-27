import React from 'react';
import { Paper } from '@mui/material';

const MainBoard = ({ children }) => {
  const classes = {
    mainBoard: {
      display: 'flex',
      justifyContent: 'center',
      minWidth: '98.8vw',
      width: 'fit-content',
      margin: 1,
      py: 1,
      px: 3,
    },
  };

  return (
    <Paper elevation={3} sx={classes.mainBoard}>
      {children}
    </Paper>
  );
};

export default MainBoard;
