import React from 'react';
import { Paper, Typography } from '@mui/material';

const MainBoard = ({ children }) => {

  
  const classes = {
    mainBoard: {
      display: 'flex',
      minWidth: '99vw',
      width: 'fit-content',
      margin: 1,
      py: 1,
      px: 3,
    },
  };

  return (
    <>
      <Typography sx={{ my: 2,}} align="center" variant="h4">
        Task Manager
      </Typography>
      <Paper elevation={3} sx={classes.mainBoard}>
        {children}
      </Paper>
    </>
  );
};

export default MainBoard;
