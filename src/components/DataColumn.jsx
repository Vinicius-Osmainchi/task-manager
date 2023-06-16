import { Box, IconButton, Paper, Typography } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import React from 'react';

const DataColumn = ({ children, title, background }) => {
  const editColumnHandler = (event) => {
    console.log(event.target);
  };

  return (
    <Paper sx={{ mx: 1, mb: 1, background, minWidth: 270, minHeight: 240, maxWidth: 270 }} elevation={3}>
      <Typography sx={{ my: 1 }} align="center" variant="h5">
        {title}
      </Typography>
      <Box sx={{display:'flex', justifyContent:'end', mt:-5.5}}>
      <IconButton  onClick={editColumnHandler}>
        <EditTwoToneIcon  fontSize='small' />
      </IconButton>
      </Box>
      {children}
    </Paper>
  );
};

export default DataColumn;
