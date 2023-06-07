import { Paper, Typography } from '@mui/material';
import React from 'react';

const DataColumn = ({children, title, background}) => {
    
    return (
        <Paper sx={{ mx: 1, mb: 1, background, minWidth: 270, maxWidth: 270 }} elevation={3}>
            <Typography sx={{my:1}} align='center' variant='h5'>{title}</Typography>
          {children}
      </Paper>
    );
};

export default DataColumn;